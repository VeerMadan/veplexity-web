const BOT_API_URL = process.env.BOT_API_URL || 'http://localhost:8081';
const BOT_API_KEY = process.env.BOT_API_KEY || 'veplexity_secret_123';

/**
 * Secure proxy helper to communicate with the VePlexity Commercial Bot API
 */
export async function fetchBotApi(path: string, options: RequestInit = {}) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${BOT_API_URL.replace(/\/$/, '')}${cleanPath}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-api-key': BOT_API_KEY,
    ...((options.headers as Record<string, string>) || {}),
  };

  const res = await fetch(url, {
    ...options,
    headers,
    signal: AbortSignal.timeout(10000),
    cache: 'no-store'
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => res.statusText);
    let parsedMessage = errorText;
    try {
      const json = JSON.parse(errorText);
      if (json.error) parsedMessage = json.error;
    } catch {}
    throw new Error(parsedMessage || `Bot API error: ${res.status}`);
  }

  return res.json();
}
