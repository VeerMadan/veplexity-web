// Production-Grade Resilience & Microservice Client
// Features: In-Memory Circuit Breaker, Exponential Backoff with Full Jitter,
// W3C Traceparent Distributed Tracing, and Idempotency Key Injection.

const BOT_API_URL = process.env.BOT_API_URL || 'http://localhost:8081';
const BOT_API_KEY = process.env.BOT_API_KEY || 'veplexity_secret_123';

export const PINGPLEX_API_URL = process.env.PINGPLEX_API_URL || 'https://pingplex.onrender.com';
const PINGPLEX_API_KEY = process.env.PINGPLEX_API_KEY || process.env.BOT_API_KEY || 'veplexity_secret_123';

// ─── 1. W3C DISTRIBUTED TRACING HELPER ──────────────────────────────────────────
export function generateTraceparent(): string {
  const version = '00';
  const traceId = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  const spanId = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  const flags = '01'; // sampled
  return `${version}-${traceId}-${spanId}-${flags}`;
}

// ─── 2. IN-MEMORY CIRCUIT BREAKER ─────────────────────────────────────────────
type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

interface CircuitBreakerConfig {
  failureThreshold: number; // consecutive failures to trip
  cooldownPeriodMs: number; // time to stay in OPEN before probing
  successThreshold: number; // successful probes needed in HALF_OPEN to close
}

class CircuitBreaker {
  public state: CircuitState = 'CLOSED';
  public failures: number = 0;
  public successes: number = 0;
  public lastStateChange: number = Date.now();
  public name: string;
  private config: CircuitBreakerConfig;

  constructor(name: string, config: CircuitBreakerConfig = { failureThreshold: 5, cooldownPeriodMs: 30000, successThreshold: 2 }) {
    this.name = name;
    this.config = config;
  }

  public canExecute(): boolean {
    const now = Date.now();
    if (this.state === 'OPEN') {
      if (now - this.lastStateChange > this.config.cooldownPeriodMs) {
        this.transitionTo('HALF_OPEN');
        return true;
      }
      return false;
    }
    return true;
  }

  public recordSuccess(): void {
    if (this.state === 'HALF_OPEN') {
      this.successes++;
      if (this.successes >= this.config.successThreshold) {
        this.transitionTo('CLOSED');
      }
    } else if (this.state === 'CLOSED') {
      this.failures = 0;
    }
  }

  public recordFailure(): void {
    this.failures++;
    this.lastStateChange = Date.now();
    if (this.state === 'HALF_OPEN' || this.failures >= this.config.failureThreshold) {
      this.transitionTo('OPEN');
    }
  }

  private transitionTo(newState: CircuitState): void {
    this.state = newState;
    this.lastStateChange = Date.now();
    if (newState === 'CLOSED') {
      this.failures = 0;
      this.successes = 0;
    }
  }

  public getStats() {
    return {
      name: this.name,
      state: this.state,
      failures: this.failures,
      successes: this.successes,
      lastStateChange: new Date(this.lastStateChange).toISOString(),
    };
  }
}

// Global circuit breaker instances
export const botApiBreaker = new CircuitBreaker('VePlexity-Bot-API', { failureThreshold: 4, cooldownPeriodMs: 25000, successThreshold: 2 });
export const pingPlexApiBreaker = new CircuitBreaker('PingPlex-Alert-API', { failureThreshold: 4, cooldownPeriodMs: 25000, successThreshold: 2 });

// ─── 3. EXPONENTIAL BACKOFF WITH FULL JITTER ──────────────────────────────────
export async function sleepWithJitter(attempt: number, baseMs: number = 200, maxMs: number = 2000): Promise<number> {
  const exponential = Math.min(maxMs, baseMs * Math.pow(2, attempt));
  // Full jitter: random sleep between 0 and exponential ceiling
  const jitteredSleep = Math.floor(Math.random() * exponential);
  await new Promise((resolve) => setTimeout(resolve, jitteredSleep));
  return jitteredSleep;
}

// ─── 4. ROBUST RESILIENT FETCH CLIENT ──────────────────────────────────────────
interface ResilientFetchOptions extends RequestInit {
  maxRetries?: number;
  circuitBreaker?: CircuitBreaker;
  idempotencyKey?: string;
}

export async function resilientFetch(url: string, options: ResilientFetchOptions = {}): Promise<any> {
  const {
    maxRetries = 2,
    circuitBreaker,
    idempotencyKey,
    ...fetchOptions
  } = options;

  // 1. Circuit Breaker Pre-check
  if (circuitBreaker && !circuitBreaker.canExecute()) {
    const err: any = new Error(`Circuit Breaker for '${circuitBreaker.name}' is OPEN. Requests blocked to prevent cascading failure.`);
    err.status = 503;
    err.circuitOpen = true;
    throw err;
  }

  // 2. Distributed Tracing & Idempotency Headers
  const traceparent = generateTraceparent();
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const headers: Record<string, string> = {
    'traceparent': traceparent,
    'x-request-id': requestId,
    ...(idempotencyKey ? { 'idempotency-key': idempotencyKey } : {}),
    ...((fetchOptions.headers as Record<string, string>) || {}),
  };

  let lastError: any = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      if (attempt > 0) {
        await sleepWithJitter(attempt);
      }

      const res = await fetch(url, {
        ...fetchOptions,
        headers,
        signal: AbortSignal.timeout(10000), // 10s strict timeout
        cache: 'no-store',
      });

      // Transient 5xx server errors warrant retry (502 Bad Gateway, 503 Unavailable, 504 Gateway Timeout)
      if (res.status === 502 || res.status === 503 || res.status === 504) {
        const errorText = await res.text().catch(() => res.statusText);
        throw new Error(`Transient Upstream Error (${res.status}): ${errorText}`);
      }

      if (!res.ok) {
        // Non-transient errors (4xx, 500 business logic) shouldn't be blindly retried
        const errorText = await res.text().catch(() => res.statusText);
        let parsedMessage = errorText;
        try {
          const json = JSON.parse(errorText);
          if (json.error) parsedMessage = json.error;
        } catch {}
        const err: any = new Error(parsedMessage || `API error: ${res.status}`);
        err.status = res.status;
        throw err;
      }

      // Success
      if (circuitBreaker) circuitBreaker.recordSuccess();
      return await res.json();
    } catch (err: any) {
      lastError = err;
      // Record failure on circuit breaker for 5xx or network drops
      if (!err.status || err.status >= 500) {
        if (circuitBreaker) circuitBreaker.recordFailure();
      }

      // If client-side error (4xx) or circuit tripped open, do not retry
      if (err.status && err.status >= 400 && err.status < 500) {
        throw err;
      }
    }
  }

  throw lastError;
}

// ─── 5. EXPORTED SERVICE CLIENTS ───────────────────────────────────────────────
export async function fetchBotApi(path: string, options: RequestInit = {}) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${BOT_API_URL.replace(/\/$/, '')}${cleanPath}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-api-key': BOT_API_KEY,
    ...((options.headers as Record<string, string>) || {}),
  };

  return resilientFetch(url, {
    ...options,
    headers,
    circuitBreaker: botApiBreaker,
    maxRetries: 2,
  });
}

export async function fetchPingPlexApi(path: string, options: RequestInit = {}) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${PINGPLEX_API_URL.replace(/\/$/, '')}${cleanPath}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-api-key': PINGPLEX_API_KEY,
    ...((options.headers as Record<string, string>) || {}),
  };

  return resilientFetch(url, {
    ...options,
    headers,
    circuitBreaker: pingPlexApiBreaker,
    maxRetries: 2,
  });
}
