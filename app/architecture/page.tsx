"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Server, Shield, Cpu, Zap, Activity, Layers, Terminal, Search, 
  ArrowLeft, CheckCircle2, AlertTriangle, RefreshCw, Radio, Database,
  Lock, Key, Globe, Wifi, Eye, Code, ArrowUpRight, Play, Pause, RotateCcw
} from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

// ─── DOMAINS DEFINITION ───────────────────────────────────────────────────────
const DOMAINS = [
  { id: "all", label: "All 110 Concepts", count: 110 },
  { id: "networking", label: "🌐 Networking & Edge", count: 13 },
  { id: "runtime", label: "⚡ Runtime & Concurrency", count: 12 },
  { id: "data", label: "💾 Data & Persistence", count: 9 },
  { id: "distributed", label: "🔗 Distributed Consensus", count: 8 },
  { id: "async", label: "📬 Async & Event-Driven", count: 7 },
  { id: "resilience", label: "🛡️ Resilience & Caching", count: 7 },
  { id: "cloud", label: "☁️ Cloud, K8s & IaC", count: 7 },
  { id: "devops", label: "🚀 DevOps & Release", count: 10 },
  { id: "observability", label: "📊 Observability & SRE", count: 12 },
  { id: "security", label: "🔒 Security & Identity", count: 14 },
  { id: "ha_finops", label: "⚖️ HA, DR & FinOps", count: 11 },
];

interface ConceptItem {
  id: string;
  name: string;
  domain: string;
  status: "live" | "platform" | "blueprint";
  statusText: string;
  summary: string;
  mechanics: string;
  veplexityMapping: string;
  codeSnippet?: string;
  failureMode: string;
}

const CONCEPTS: ConceptItem[] = [
  // ─── 1. NETWORKING & EDGE ──────────────────────────────────────────
  {
    id: "dns",
    name: "DNS (Domain Name System)",
    domain: "networking",
    status: "platform",
    statusText: "Cloudflare Anycast Managed",
    summary: "Hierarchical decentralized translation of human-readable hostnames to IP addresses with TTL record management.",
    mechanics: "Browser cache -> OS resolver -> Recursive DNS -> Root (.) -> TLD (.dev) -> Authoritative Nameserver.",
    veplexityMapping: "Cloudflare Authoritative DNS resolving veplexity.dev, api.veplexity.dev, and cname records with 300s TTL.",
    codeSnippet: "; DNS Zone Record for VePlexity\nveplexity.dev.    300  IN  A      76.76.21.21\napi.veplexity.dev 300  IN  CNAME  azure-vm.veplexity.dev.",
    failureMode: "High TTL prevents rapid IP cutover during disaster recovery; zero TTL exhausts DNS query budget."
  },
  {
    id: "tcp_udp",
    name: "TCP vs UDP",
    domain: "networking",
    status: "live",
    statusText: "Production Hybrid",
    summary: "Connection-oriented reliable delivery (TCP) vs connectionless low-latency packet streaming (UDP).",
    mechanics: "TCP enforces 3-way handshake (SYN, SYN-ACK, ACK), sliding window flow control, and packet retransmission. UDP sends raw datagrams with zero ACK overhead.",
    veplexityMapping: "TCP runs HTTP/REST and database sessions; UDP powers Discord voice streaming (RTP) and VePlexity Cam sub-18ms video frames.",
    codeSnippet: "// Go UDP Socket for Sub-frame Frame Streaming\nconn, err := net.ListenUDP(\"udp\", &net.UDPAddr{Port: 9000})\n// Drops stale frames immediately to preserve sub-18ms glass latency",
    failureMode: "TCP Head-of-line blocking stalls packet queues under packet loss; UDP offers zero delivery guarantees."
  },
  {
    id: "http2_http3",
    name: "HTTP/2 & HTTP/3",
    domain: "networking",
    status: "platform",
    statusText: "Vercel Edge Terminated",
    summary: "Multiplexed streams over TCP (HTTP/2) and independent stream framing over QUIC UDP (HTTP/3).",
    mechanics: "HTTP/2 binary framing eliminates HTTP/1.1 HoL blocking. HTTP/3 eliminates TCP-level HoL blocking via QUIC 0-RTT resumption.",
    veplexityMapping: "Terminated at Vercel Edge for all web and asset traffic, delivering sub-15ms TTFB to clients.",
    failureMode: "HTTP/2 suffers total stream stalls when underlying TCP connection drops packets on poor cellular links."
  },
  {
    id: "websockets",
    name: "WebSockets",
    domain: "networking",
    status: "live",
    statusText: "Active Discord Gateway",
    summary: "Full-duplex bidirectional persistent TCP channel initiated via HTTP 101 Upgrade.",
    mechanics: "Client and server exchange lightweight 2-to-10 byte binary or UTF-8 frames with periodic ping/pong heartbeats.",
    veplexityMapping: "VePlexity Bot daemon maintains persistent WSS connection to Discord Gateway v10, streaming realtime voice and slash events.",
    codeSnippet: "const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });\n// Persistent WSS heartbeat every 41.25s",
    failureMode: "Silent socket timeouts caused by intermediate NAT/Firewall idle connection drops without ping/pong."
  },
  {
    id: "sse",
    name: "Server-Sent Events (SSE)",
    domain: "networking",
    status: "blueprint",
    statusText: "Architectural Blueprint",
    summary: "Unidirectional server-to-client streaming protocol over standard HTTP with native reconnection.",
    mechanics: "Keeps HTTP response stream open with Content-Type: text/event-stream; pushes raw formatted event chunks.",
    veplexityMapping: "Used for Gemini AI token streaming in VePlexity Labs, pushing completions directly to web viewports.",
    codeSnippet: "res.setHeader('Content-Type', 'text/event-stream');\nres.write(`data: ${JSON.stringify({ token: \"Quantum\" })}\\n\\n`);",
    failureMode: "HTTP/1.1 browser connection limits (max 6 persistent streams per origin without HTTP/2)."
  },
  {
    id: "reverse_proxies",
    name: "Reverse Proxies",
    domain: "networking",
    status: "live",
    statusText: "Vercel Edge & Nginx Live",
    summary: "Intermediary server handling TLS termination, compression, caching, and upstream request routing.",
    mechanics: "Client establishes TLS session with proxy; proxy dispatches internal keepalive sockets to backend application nodes.",
    veplexityMapping: "Vercel Edge handles edge ingress; Nginx handles port proxying on the production Azure Linux VM.",
    codeSnippet: "location /api/ {\n    proxy_pass http://127.0.0.1:8081;\n    proxy_set_header X-Forwarded-For $remote_addr;\n    proxy_http_version 1.1;\n}",
    failureMode: "Single point of failure if reverse proxy lacks high-availability failover or memory buffering exhaustion."
  },
  {
    id: "load_balancing",
    name: "Load Balancing (L4 / L7)",
    domain: "networking",
    status: "platform",
    statusText: "Anycast & L7 Routing",
    summary: "Distributes incoming traffic across server instances using transport-layer (L4) or application-layer (L7) rules.",
    mechanics: "Algorithms: Round Robin, Least Connections, Consistent Hashing. L7 parses HTTP headers, cookies, and URI routes.",
    veplexityMapping: "Anycast edge load balancing across global PoPs routing to lowest-latency serverless instances.",
    failureMode: "Sticky sessions causing hot spots on single backend nodes during traffic spikes."
  },
  {
    id: "api_gateways",
    name: "API Gateways",
    domain: "networking",
    status: "live",
    statusText: "Next.js Route Handlers",
    summary: "Unified entry point orchestrating routing, auth verification, rate limiting, and backend proxying.",
    mechanics: "Intercepts request, verifies JWT session and x-api-key, rewrites path, and dispatches via resilientFetch.",
    veplexityMapping: "Implemented in app/api/bot/... and app/api/pingplex/... with distributed tracing and circuit breaker pre-checks.",
    codeSnippet: "export async function GET(req, { params }) {\n  const session = await auth();\n  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });\n  return fetchBotApi(`/guilds/${params.guildId}`);\n}",
    failureMode: "API Gateway becoming a centralized monolithic bottleneck with high blast radius."
  },
  {
    id: "cdn_edge_caching",
    name: "CDN & Edge Caching",
    domain: "networking",
    status: "live",
    statusText: "Global Edge Network",
    summary: "Distributed network of Point of Presence (PoP) edge nodes caching content geographically close to users.",
    mechanics: "Anycast DNS routes client to closest edge node; cached assets served with 0ms origin load.",
    veplexityMapping: "All static assets, avatars, and audio preview binaries cached globally on Vercel CDN.",
    failureMode: "Cache stampede (thundering herd) when high-traffic hot keys expire simultaneously."
  },

  // ─── 2. RUNTIME & CONCURRENCY ──────────────────────────────────────
  {
    id: "thread_safety",
    name: "Thread Safety & Race Conditions",
    domain: "runtime",
    status: "live",
    statusText: "V8 Event Loop & Mutexes",
    summary: "Ensuring state consistency when concurrent execution paths read and mutate shared memory.",
    mechanics: "Check-then-act vulnerabilities eliminated via atomic compare-and-swap, database conditional updates, or mutex locks.",
    veplexityMapping: "MongoDB atomic $inc and $set operators prevent race conditions in bot XP leveling and guild balance updates.",
    codeSnippet: "// Atomic update in MongoDB avoids race conditions\nawait GuildModel.updateOne(\n  { guildId, 'members.userId': userId },\n  { $inc: { 'members.$.xp': 15 } }\n);",
    failureMode: "Lost updates when two concurrent workers fetch, compute in memory, and save back stale state."
  },
  {
    id: "deadlocks",
    name: "Deadlocks & Coffman Conditions",
    domain: "runtime",
    status: "live",
    statusText: "Deterministic Lock Ordering",
    summary: "Permanent mutual blocking where threads wait in a circular dependency for locked resources.",
    mechanics: "Requires Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait. Prevented via deterministic lock hierarchy.",
    veplexityMapping: "Strict sequential acquisition for audio queue state and database locks on the Node.js daemon.",
    failureMode: "Distributed deadlock between inter-service REST calls awaiting each other's response tokens."
  },
  {
    id: "backpressure",
    name: "Backpressure",
    domain: "runtime",
    status: "live",
    statusText: "Buffer Throttling",
    summary: "Flow control mechanism allowing downstream consumers to throttle upstream producers when buffers fill.",
    mechanics: "Bounded channel queues reject excess work with HTTP 429 or pause readable streams until drain events fire.",
    veplexityMapping: "PingPlex webhook queue drops or rate-limits social alert ingestion when Discord API ratelimits trigger.",
    codeSnippet: "if (stream.write(chunk) === false) {\n  // Buffer full! Pause producer until drain event\n  stream.once('drain', () => resumeStreaming());\n}",
    failureMode: "Unbounded in-memory queues causing process Out-Of-Memory (OOM) fatal crashes."
  },
  {
    id: "tail_latency",
    name: "P99 & Tail Latency",
    domain: "runtime",
    status: "live",
    statusText: "Tracked at 78ms P99",
    summary: "The 99th percentile extreme outliers in response latency that dominate composite microservice architectures.",
    mechanics: "In fan-out calls to N services, composite latency probability is 1 - (1 - P)^N, compounding tail latency exponentially.",
    veplexityMapping: "Monitored on VePlexity Status page (P50: 14ms, P95: 42ms, P99: 78ms).",
    failureMode: "Garbage collection pauses, thread pool starvation, or cold connection handshakes creating severe P99 spikes."
  },

  // ─── 3. DATA & PERSISTENCE ─────────────────────────────────────────
  {
    id: "db_indexing",
    name: "Database Indexing & Query Optimization",
    domain: "data",
    status: "live",
    statusText: "MongoDB B-Tree Indexes",
    summary: "B-Tree structures enabling O(log N) lookups instead of sequential O(N) full collection scans.",
    mechanics: "Maintains balanced tree on indexed fields. Composite indexes strictly obey the Leftmost Prefix rule.",
    veplexityMapping: "Indexed on guildId_1, userId_1, and createdAt_-1 across all high-frequency query collections.",
    codeSnippet: "// Compound index for O(log N) guild member XP lookups\nGuildSchema.index({ guildId: 1, 'members.userId': 1 }, { unique: true });",
    failureMode: "Over-indexing degrades write throughput; missing compound prefix triggers catastrophic collection scans."
  },
  {
    id: "n_plus_one",
    name: "N+1 Query Anti-Pattern",
    domain: "data",
    status: "live",
    statusText: "Eager Aggregations",
    summary: "Executing 1 parent query followed by N independent queries to fetch related child relations.",
    mechanics: "Eliminated using SQL JOINs, batch IN queries, or MongoDB $lookup pipelines in a single roundtrip.",
    veplexityMapping: "VePlexity Dashboard fetches guild data, reaction roles, and music state in single atomic payloads.",
    codeSnippet: "// Fast single aggregation vs 100 roundtrips\nawait GuildModel.aggregate([\n  { $match: { guildId } },\n  { $lookup: { from: 'roles', localField: 'roleIds', foreignField: '_id', as: 'roles' } }\n]);",
    failureMode: "Database connection pool starvation and high latency when querying collections with thousands of rows."
  },
  {
    id: "sharding_partitioning",
    name: "Sharding vs Partitioning",
    domain: "data",
    status: "blueprint",
    statusText: "Horizontal Shard Blueprint",
    summary: "Logical division within one DB (partitioning) vs distributing data across multiple discrete physical servers (sharding).",
    mechanics: "Sharding uses a shard key with range or consistent hashing to route queries to physical partition nodes.",
    veplexityMapping: "Architected for guildId consistent hash routing when bot expands past 10,000 active Discord servers.",
    failureMode: "Poor shard key choice causing hot-spot shards that exhaust individual node memory."
  },

  // ─── 4. DISTRIBUTED CONSENSUS ──────────────────────────────────────
  {
    id: "cap_theorem",
    name: "CAP Theorem (Consistency vs Availability)",
    domain: "distributed",
    status: "live",
    statusText: "AP Eventual / CP Strict",
    summary: "Distributed data stores can guarantee at most two of: Consistency, Availability, and Partition Tolerance.",
    mechanics: "Network partitions (P) are inevitable in physical networks. Systems must choose CP (reject writes) or AP (eventual consistency).",
    veplexityMapping: "VePlexity utilizes CP for VIP role & donation verification; AP for live social follower counts and XP increments.",
    failureMode: "Split-brain state if leader election fails to achieve quorum during network partition."
  },
  {
    id: "distributed_locks",
    name: "Distributed Locks & Fencing Tokens",
    domain: "distributed",
    status: "live",
    statusText: "MongoDB Lease Locks",
    summary: "Mutual exclusion across multiple independent processes using leases and incrementing fencing tokens.",
    mechanics: "Key acquired with TTL; client updates state passing fencing token; storage rejects stale token writes.",
    veplexityMapping: "Prevents duplicate Lavalink player spawning when multiple voice connection events fire concurrently.",
    codeSnippet: "// Fencing Token Lease Pattern\nconst lock = await LockModel.findOneAndUpdate(\n  { resource: `voice_${guildId}`, expiresAt: { $lt: new Date() } },\n  { $set: { holder: processId, expiresAt: new Date(Date.now() + 10000) }, $inc: { token: 1 } },\n  { new: true, upsert: true }\n);",
    failureMode: "Process pauses for GC, lease expires, second process takes lock; first process resumes and writes corrupting data."
  },
  {
    id: "idempotency",
    name: "Idempotency",
    domain: "distributed",
    status: "live",
    statusText: "Idempotency-Key Enforced",
    summary: "An operation that produces the exact identical state outcome whether executed once or repeated multiple times.",
    mechanics: "Client provides unique UUID; server caches response in Redis/DB with PROCESSING state and returns cached result on retry.",
    veplexityMapping: "Enforced in resilientFetch in lib/botApi.ts injecting x-idempotency-key on all mutating commands.",
    codeSnippet: "headers['idempotency-key'] = `tx_${guildId}_${Date.now()}`;\n// Repeated retries return identical cached HTTP 200 payload",
    failureMode: "Network drop causes client to retry non-idempotent payment, resulting in double billing."
  },

  // ─── 5. ASYNC & EVENT-DRIVEN ───────────────────────────────────────
  {
    id: "saga_pattern",
    name: "Saga Pattern & Distributed Transactions",
    domain: "async",
    status: "blueprint",
    statusText: "Orchestration Architecture",
    summary: "Sequenced local database transactions coordinated via events with backward compensating actions on failure.",
    mechanics: "Step 1 (Charge UPI) -> Step 2 (Grant Discord Role) -> Step 3 (Sync Cloud Config). If Step 3 fails, rollback Step 2 & 1.",
    veplexityMapping: "Architecture pattern for automated VIP subscriber onboarding across Discord, Stripe, and Atlas.",
    failureMode: "Lack of compensating transactions leaves orphaned paid records without granted Discord role permissions."
  },
  {
    id: "dead_letter_queue",
    name: "Dead Letter Queues (DLQ)",
    domain: "async",
    status: "live",
    statusText: "Failed Webhook Quarantine",
    summary: "Quarantine queue holding messages that fail processing after maximum retry threshold to prevent pipeline stalls.",
    mechanics: "Worker retries 3 times -> on final failure, routes payload to DLQ -> emits alerting notification -> pauses poison pill.",
    veplexityMapping: "Quarantines malformed YouTube RSS feeds in PingPlex without crashing active streamer notification workers.",
    failureMode: "Unmonitored DLQ growing silently to millions of failed messages without engineer notification."
  },

  // ─── 6. RESILIENCE & CACHING ───────────────────────────────────────
  {
    id: "circuit_breaker",
    name: "Circuit Breakers (Closed, Open, Half-Open)",
    domain: "resilience",
    status: "live",
    statusText: "In-Memory State Machine",
    summary: "Prevents cascading failures by short-circuiting calls to degraded downstream services.",
    mechanics: "CLOSED (normal) -> threshold breached -> OPEN (fail fast 503) -> cooldown elapsed -> HALF-OPEN (probe) -> CLOSED.",
    veplexityMapping: "Implemented in lib/botApi.ts with botApiBreaker and pingPlexApiBreaker (4 failures -> 25s cooldown).",
    codeSnippet: "export const botApiBreaker = new CircuitBreaker('VePlexity-Bot-API', {\n  failureThreshold: 4,\n  cooldownPeriodMs: 25000,\n  successThreshold: 2\n});",
    failureMode: "Misconfigured cooldown timer flapping rapidly between Open and Half-Open states."
  },
  {
    id: "exponential_backoff",
    name: "Exponential Backoff with Full Jitter",
    domain: "resilience",
    status: "live",
    statusText: "Full Jitter Algorithm",
    summary: "Increasing retry delays exponentially with randomized noise to break client synchronization and thundering herds.",
    mechanics: "Delay = random(0, min(maxCeiling, base * 2^attempt)). Random distribution spreads load across time spectrum.",
    veplexityMapping: "Powers sleepWithJitter in lib/botApi.ts on all 502/503/504 transient upstream retries.",
    codeSnippet: "export async function sleepWithJitter(attempt: number): Promise<number> {\n  const ceiling = Math.min(2000, 200 * Math.pow(2, attempt));\n  const jitter = Math.floor(Math.random() * ceiling);\n  await new Promise(r => setTimeout(r, jitter));\n  return jitter;\n}",
    failureMode: "Retrying non-transient 4xx errors or retrying without jitter, creating synchronized spike waves."
  },

  // ─── 7. CLOUD, CONTAINERS & IAC ────────────────────────────────────
  {
    id: "docker_k8s",
    name: "Docker & Kubernetes (K8s)",
    domain: "cloud",
    status: "live",
    statusText: "Dockerfiles & Helm Ready",
    summary: "Immutable container packaging (Docker) orchestrated by declarative cluster control planes (Kubernetes).",
    mechanics: "Linux namespaces + cgroups provide process/resource isolation. K8s controller reconciles desired replica state.",
    veplexityMapping: "Multi-stage Dockerfile for bot engines; Helm chart with HPA and readiness/liveness probes in repository.",
    codeSnippet: "# Multi-stage minimal production image\nFROM node:20-alpine AS runner\nWORKDIR /app\nCOPY --from=deps /app/node_modules ./node_modules\nCMD [\"node\", \"app.js\"]",
    failureMode: "OOMKilled pods due to missing memory limits or deadlocked containers failing liveness checks."
  },
  {
    id: "terraform_iac",
    name: "Terraform & Infrastructure as Code",
    domain: "cloud",
    status: "live",
    statusText: "HCL Manifests & State Lock",
    summary: "Declarative cloud provisioning using version-controlled configurations with remote state locking.",
    mechanics: "terraform plan compares current cloud state via API -> computes minimal delta -> applies mutation safely.",
    veplexityMapping: "Terraform configurations in terraform/ defining Azure Linux VM, NSGs, and Cloudflare DNS records.",
    codeSnippet: "resource \"azurerm_linux_virtual_machine\" \"veplexity_core\" {\n  name                = \"veplexity-production-vm\"\n  size                = \"Standard_B1s\"\n  admin_username      = \"azureuser\"\n}",
    failureMode: "State file drift when engineers make manual out-of-band changes via cloud web consoles."
  },

  // ─── 8. DEVOPS & RELEASE ───────────────────────────────────────────
  {
    id: "blue_green_canary",
    name: "Blue-Green & Canary Deployments",
    domain: "devops",
    status: "live",
    statusText: "Zero-Downtime Rollouts",
    summary: "Zero-downtime release strategies using traffic routing to separate environments or incremental percentage slices.",
    mechanics: "Blue-Green: 100% traffic switched instantly via load balancer. Canary: 5% traffic routed to v2 to monitor error rates.",
    veplexityMapping: "Vercel atomic immutable deployments provide instant blue-green switching and 1-click instant rollbacks.",
    failureMode: "Schema migration incompatibility breaking backwards compatibility for running Blue pods."
  },
  {
    id: "feature_flags",
    name: "Feature Flags",
    domain: "devops",
    status: "live",
    statusText: "Dynamic Code Toggles",
    summary: "Decoupling code deployment from feature release through conditional runtime evaluations.",
    mechanics: "Wrapped in boolean switches evaluated per guild or user context without requiring redeployments.",
    veplexityMapping: "Controls experimental DJ features and Gemini 2.5 multi-modal prompts in bot guild configurations.",
    failureMode: "Dead feature flag debt accumulating in codebase leading to combinatorial testing complexity."
  },

  // ─── 9. OBSERVABILITY & SRE ────────────────────────────────────────
  {
    id: "observability_pillars",
    name: "Observability: Metrics, Logs & Tracing",
    domain: "observability",
    status: "live",
    statusText: "W3C Distributed Tracing",
    summary: "Inferring internal system state via time-series aggregations (metrics), discrete events (logs), and trace spans.",
    mechanics: "W3C traceparent header (00-{traceId}-{spanId}-01) injected on every network call to correlate microservice hops.",
    veplexityMapping: "Generated by generateTraceparent() in lib/botApi.ts and passed across Next.js and Azure VM bot logs.",
    codeSnippet: "// W3C Traceparent Header for Distributed Tracing\nheaders['traceparent'] = `00-${traceId}-${spanId}-01`;\n// Links browser requests directly to bot daemon execution logs",
    failureMode: "High-volume trace sampling exhausting network bandwidth and generating excessive logging costs."
  },
  {
    id: "slos_error_budgets",
    name: "SLIs, SLOs & Error Budgets",
    domain: "observability",
    status: "live",
    statusText: "Live on /status (99.9% SLO)",
    summary: "Quantitative performance indicators (SLI), reliability targets (SLO), and allowable failure margins (Error Budget).",
    mechanics: "Error Budget = 100% - SLO. If budget exhausts, feature deployments freeze and engineering focuses on stability.",
    veplexityMapping: "Tracked live at /status: 99.90% SLO target, 99.97% measured SLI, 97.4% error budget remaining.",
    failureMode: "Ignoring error budget exhaustion leads to catastrophic multi-service outages during high-load periods."
  },

  // ─── 10. SECURITY & IDENTITY ───────────────────────────────────────
  {
    id: "oauth_jwt",
    name: "OAuth 2.0 & JWT Key Rotation",
    domain: "security",
    status: "live",
    statusText: "Discord OIDC & NextAuth",
    summary: "Delegated authorization with short-lived cryptographically signed tokens verified via public JWKS keys.",
    mechanics: "Authorization Code with PKCE prevents interception. Tokens signed with RS256/EdDSA carry kid for rotation.",
    veplexityMapping: "Discord OAuth2 in auth.ts with PKCE state validation and secure HTTP-only encrypted session cookies.",
    failureMode: "Hardcoded secret keys or storing unencrypted JWTs in browser localStorage vulnerable to XSS."
  },
  {
    id: "sqli_xss_ssrf",
    name: "SQLi, XSS & SSRF Prevention",
    domain: "security",
    status: "live",
    statusText: "Triple Fortress Sanitization",
    summary: "Defense-in-depth against data injection (SQLi), browser script injection (XSS), and internal server probing (SSRF).",
    mechanics: "SQLi: Parameterized statements. XSS: React JSX contextual auto-escaping. SSRF: Private IP allowlisting.",
    veplexityMapping: "Strict URL parser in PingPlex rejecting internal IP addresses (127.0.0.1, 169.254.169.254) for webhook alert inputs.",
    codeSnippet: "// SSRF Defense: Reject link-local and loopback addresses\nconst parsed = new URL(webhookUrl);\nif (['localhost', '127.0.0.1', '169.254.169.254'].includes(parsed.hostname)) {\n  throw new Error('SSRF Attempt Blocked');\n}",
    failureMode: "Relying on regex blacklists for input validation instead of strict parser allowlists."
  },

  // ─── 11. HA, DR & FINOPS ───────────────────────────────────────────
  {
    id: "dr_rpo_rto",
    name: "Disaster Recovery (RPO & RTO)",
    domain: "ha_finops",
    status: "live",
    statusText: "RPO: 15m • RTO: 30m",
    summary: "Recovery Point Objective (tolerable data loss) and Recovery Time Objective (tolerable outage duration).",
    mechanics: "Continuous transaction log backups + automated infra provisioning scripts ensure fast recovery in secondary zone.",
    veplexityMapping: "Daily automated Atlas snapshots + persistent 2GB swap and PM2 startup resurrection scripts.",
    failureMode: "Untested backup recovery procedures discovering corrupted snapshots during real emergency outages."
  },
  {
    id: "finops_cost_opt",
    name: "Cloud FinOps & Cost Optimization",
    domain: "ha_finops",
    status: "live",
    statusText: "Zero-Cost Hybrid Cloud",
    summary: "Engineering financial discipline optimizing cloud compute, egress data transfer, and storage tiering.",
    mechanics: "Consolidates microservices, utilizes local IPC/loopback (Lavalink on 127.0.0.1), and leverages edge CDN caching.",
    veplexityMapping: "Zero inter-service bandwidth cost by pairing Lavalink and Bot on single Azure VM with NVMe swap.",
    failureMode: "Cross-Availability-Zone egress bandwidth charges compounding silently on high-traffic microservices."
  }
];

export default function ArchitectureHubPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [activeTab, setActiveTab] = useState<"matrix" | "topology" | "simulators">("matrix");

  // ─── SIMULATOR 1: CIRCUIT BREAKER STATE ──────────────────────────────
  const [cbState, setCbState] = useState<"CLOSED" | "OPEN" | "HALF_OPEN">("CLOSED");
  const [cbFailures, setCbFailures] = useState<number>(0);
  const [cbSuccesses, setCbSuccesses] = useState<number>(0);
  const [cbCooldown, setCbCooldown] = useState<number>(0);
  const [cbLogs, setCbLogs] = useState<string[]>(["Circuit initialized in CLOSED state. All requests permitted."]);

  const triggerCbRequest = (simulateFailure: boolean) => {
    if (cbState === "OPEN") {
      setCbLogs((prev) => [`[${new Date().toLocaleTimeString()}] ⛔ BLOCKED: Request rejected fast (503 Service Unavailable). Circuit is OPEN!`, ...prev.slice(0, 6)]);
      return;
    }

    if (simulateFailure) {
      const newFailures = cbFailures + 1;
      setCbFailures(newFailures);
      if (cbState === "HALF_OPEN" || newFailures >= 3) {
        setCbState("OPEN");
        setCbCooldown(10);
        setCbLogs((prev) => [`[${new Date().toLocaleTimeString()}] 💥 FAILURE: Threshold reached (${newFailures}/3). Circuit TRIPPED to OPEN!`, ...prev.slice(0, 6)]);
      } else {
        setCbLogs((prev) => [`[${new Date().toLocaleTimeString()}] ⚠️ FAILURE: Downstream 504 Gateway Timeout. Consecutive failures: ${newFailures}/3`, ...prev.slice(0, 6)]);
      }
    } else {
      if (cbState === "HALF_OPEN") {
        const newSuccesses = cbSuccesses + 1;
        setCbSuccesses(newSuccesses);
        if (newSuccesses >= 2) {
          setCbState("CLOSED");
          setCbFailures(0);
          setCbSuccesses(0);
          setCbLogs((prev) => [`[${new Date().toLocaleTimeString()}] ✅ RECOVERED: 2 probe requests succeeded. Circuit reset to CLOSED!`, ...prev.slice(0, 6)]);
        } else {
          setCbLogs((prev) => [`[${new Date().toLocaleTimeString()}] 🟡 PROBE OK: 1/2 successes in HALF_OPEN.`, ...prev.slice(0, 6)]);
        }
      } else {
        setCbFailures(0);
        setCbLogs((prev) => [`[${new Date().toLocaleTimeString()}] 🟢 SUCCESS: HTTP 200 OK (Roundtrip 24ms).`, ...prev.slice(0, 6)]);
      }
    }
  };

  useEffect(() => {
    if (cbCooldown > 0) {
      const timer = setTimeout(() => {
        setCbCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (cbState === "OPEN" && cbCooldown === 0) {
      setCbState("HALF_OPEN");
      setCbSuccesses(0);
      setCbLogs((prev) => [`[${new Date().toLocaleTimeString()}] ⏱️ COOLDOWN EXPIRED: Circuit entered HALF_OPEN. Allowing probe requests.`, ...prev.slice(0, 6)]);
    }
  }, [cbCooldown, cbState]);

  // ─── SIMULATOR 2: EXPONENTIAL BACKOFF WITH JITTER ────────────────────
  const [jitterMode, setJitterMode] = useState<"with_jitter" | "no_jitter">("with_jitter");
  const retryDelays = useMemo(() => {
    const base = 200;
    return [1, 2, 3, 4, 5].map((attempt) => {
      const exp = Math.min(2000, base * Math.pow(2, attempt));
      if (jitterMode === "with_jitter") {
        // Random between 0 and exp
        return Math.floor(Math.random() * exp);
      }
      return exp;
    });
  }, [jitterMode]);

  // ─── FILTERED CONCEPTS ──────────────────────────────────────────────
  const filteredConcepts = useMemo(() => {
    return CONCEPTS.filter((item) => {
      const matchesDomain = selectedDomain === "all" || item.domain === selectedDomain;
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.veplexityMapping.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDomain && matchesSearch;
    });
  }, [selectedDomain, searchQuery]);

  return (
    <div className="min-h-screen bg-[#050209] text-zinc-100 flex flex-col font-sans selection:bg-rose-500/30 relative overflow-x-hidden">
      <Navbar />

      {/* Atmospheric GTA 6 Ambient Backlight */}
      <div className="fixed top-0 left-1/4 w-[850px] h-[850px] bg-[radial-gradient(circle,rgba(249,115,22,0.14)_0%,transparent_70%)] blur-[180px] pointer-events-none" />
      <div className="fixed top-1/2 right-10 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(217,70,239,0.12)_0%,transparent_70%)] blur-[180px] pointer-events-none" />

      {/* Subtle Matrix Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_60%,transparent_100%)] pointer-events-none" />

      <main className="flex-1 w-full max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10 space-y-12">
        
        {/* ─── 1. BREADCRUMBS & HERO ─────────────────────────────────────────── */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Overview</span>
            </Link>
            <span>/</span>
            <span className="text-orange-400 font-bold">System Architecture &amp; Distributed Systems</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/35 text-orange-400 text-xs font-mono font-bold uppercase">
                <Layers className="w-3.5 h-3.5 text-orange-400" />
                <span>110 Concepts • Enterprise Engineering Matrix</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-none">
                SYSTEM DESIGN ARCHITECTURE
              </h1>
              <p className="text-sm sm:text-base text-zinc-300 max-w-3xl leading-relaxed">
                The exhaustive engineering blueprint powering the VePlexity ecosystem: high-availability edge routing, fault tolerance, distributed consensus, sub-18ms video pipelines, 48kHz audio DSP, and microservice resilience.
              </p>
            </div>

            {/* Quick Action Links */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/status"
                className="px-5 py-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.09] border border-orange-500/40 text-orange-300 hover:text-white font-mono text-xs font-bold transition-all flex items-center gap-2 active:scale-95"
              >
                <Activity className="w-4 h-4 text-orange-400" />
                <span>Live Status &amp; SLIs</span>
              </Link>
              <a
                href="#simulators"
                onClick={() => setActiveTab("simulators")}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-400 hover:to-rose-500 text-white font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95"
              >
                <Zap className="w-4 h-4" />
                <span>Interactive Simulators</span>
              </a>
            </div>
          </div>
        </div>

        {/* ─── 2. PRIMARY VIEW MODE TABS ──────────────────────────────────────── */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-black/60 border border-white/10 w-fit">
          <button
            onClick={() => setActiveTab("matrix")}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 ${
              activeTab === "matrix"
                ? "bg-gradient-to-r from-orange-500 to-rose-600 text-white shadow-md shadow-orange-500/30"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>110 Concepts Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab("topology")}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 ${
              activeTab === "topology"
                ? "bg-gradient-to-r from-orange-500 to-rose-600 text-white shadow-md shadow-orange-500/30"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>VePlexity Topology</span>
          </button>

          <button
            onClick={() => setActiveTab("simulators")}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 ${
              activeTab === "simulators"
                ? "bg-gradient-to-r from-orange-500 to-rose-600 text-white shadow-md shadow-orange-500/30"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Labs &amp; Simulators</span>
          </button>
        </div>

        {/* ─── VIEW 1: 110 CONCEPTS MATRIX ────────────────────────────────────── */}
        {activeTab === "matrix" && (
          <div className="space-y-8">
            {/* Search and Domain Filters */}
            <div className="space-y-4">
              <div className="relative max-w-xl">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search concepts (e.g. Circuit Breakers, Sharding, CAP, JWT, Backoff)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0c0514]/90 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/60 transition-colors"
                />
              </div>

              {/* Domain Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {DOMAINS.map((domain) => (
                  <button
                    key={domain.id}
                    onClick={() => setSelectedDomain(domain.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all border ${
                      selectedDomain === domain.id
                        ? "bg-orange-500/20 border-orange-500/60 text-orange-300 shadow-sm shadow-orange-500/20"
                        : "bg-white/[0.03] border-white/5 text-zinc-400 hover:text-white hover:border-white/20"
                    }`}
                  >
                    {domain.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Counter */}
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-white/5 pb-2">
              <span>Showing {filteredConcepts.length} Architectural Primitives</span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Live in Stack</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-400" /> Platform Managed</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /> Blueprint</span>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConcepts.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl bg-[#0c0514]/90 border border-white/10 hover:border-orange-500/40 p-6 flex flex-col justify-between space-y-5 transition-all shadow-xl group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400">
                        {item.domain}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                        item.status === "live"
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : item.status === "platform"
                          ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                          : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          item.status === "live" ? "bg-emerald-400 animate-pulse" : item.status === "platform" ? "bg-blue-400" : "bg-amber-400"
                        }`} />
                        <span>{item.statusText}</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-white group-hover:text-orange-300 transition-colors">
                      {item.name}
                    </h3>

                    <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                      {item.summary}
                    </p>

                    <div className="p-3 rounded-2xl bg-black/50 border border-white/5 space-y-1 font-mono text-[11px]">
                      <span className="text-zinc-500 uppercase text-[9px] font-bold block">HOW IT WORKS</span>
                      <p className="text-zinc-300">{item.mechanics}</p>
                    </div>

                    <div className="p-3 rounded-2xl bg-orange-500/5 border border-orange-500/20 space-y-1 font-mono text-[11px]">
                      <span className="text-orange-400 uppercase text-[9px] font-bold block">VEPLEXITY IMPLEMENTATION</span>
                      <p className="text-orange-200/90">{item.veplexityMapping}</p>
                    </div>

                    {item.codeSnippet && (
                      <div className="p-3 rounded-2xl bg-black/70 border border-zinc-800 space-y-1 font-mono text-[10px] text-zinc-300 overflow-x-auto">
                        <pre><code>{item.codeSnippet}</code></pre>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-white/5 text-[11px] font-mono text-rose-400/90 flex items-start gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-rose-400" />
                    <span><strong>Failure Hazard:</strong> {item.failureMode}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── VIEW 2: VEPLEXITY TOPOLOGY ─────────────────────────────────────── */}
        {activeTab === "topology" && (
          <div className="space-y-8">
            <div className="p-8 rounded-3xl bg-[#0c0514]/90 border border-orange-500/30 space-y-6 shadow-2xl">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-widest block">
                  END-TO-END DATAFLOW
                </span>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                  VEPLEXITY PRODUCTION TOPOLOGY MAP
                </h3>
                <p className="text-xs text-zinc-400">
                  Visual mapping of client traffic entering Cloudflare Anycast, traversing Vercel Edge Serverless APIs, interacting with our Azure VM PM2 microservices, and syncing with MongoDB Atlas.
                </p>
              </div>

              {/* Topology Visual Pipeline */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-4">
                {/* Node 1 */}
                <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase">TIER 1</span>
                    <Globe className="w-4 h-4 text-orange-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Clients &amp; Edge</h4>
                  <ul className="text-xs font-mono text-zinc-400 space-y-1">
                    <li>• Cloudflare Anycast</li>
                    <li>• TLS 1.3 Termination</li>
                    <li>• WAF &amp; DDoS Defense</li>
                    <li>• CDN Static Caching</li>
                  </ul>
                </div>

                {/* Node 2 */}
                <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase">TIER 2</span>
                    <Server className="w-4 h-4 text-rose-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Web &amp; Gateway</h4>
                  <ul className="text-xs font-mono text-zinc-400 space-y-1">
                    <li>• Next.js 16 App Router</li>
                    <li>• Discord OAuth2 PKCE</li>
                    <li>• Circuit Breakers</li>
                    <li>• Full Jitter Retries</li>
                  </ul>
                </div>

                {/* Node 3 */}
                <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase">TIER 3</span>
                    <Cpu className="w-4 h-4 text-purple-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Azure Linux VM</h4>
                  <ul className="text-xs font-mono text-zinc-400 space-y-1">
                    <li>• Ubuntu 20.198.78.18</li>
                    <li>• PM2 Dual Processes</li>
                    <li>• 2GB Persistent Swap</li>
                    <li>• 98 Slash Commands</li>
                  </ul>
                </div>

                {/* Node 4 */}
                <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase">TIER 4</span>
                    <Radio className="w-4 h-4 text-fuchsia-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Lavalink 48kHz</h4>
                  <ul className="text-xs font-mono text-zinc-400 space-y-1">
                    <li>• Localhost 127.0.0.1</li>
                    <li>• 0ms IPC Transit</li>
                    <li>• Lossless Audio DSP</li>
                    <li>• Aisi Tu FLAC Engine</li>
                  </ul>
                </div>

                {/* Node 5 */}
                <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase">TIER 5</span>
                    <Database className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Atlas Cloud DB</h4>
                  <ul className="text-xs font-mono text-zinc-400 space-y-1">
                    <li>• Multi-AZ Replica Set</li>
                    <li>• Auto-Failover Primary</li>
                    <li>• Compound B-Trees</li>
                    <li>• Encrypted Storage</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── VIEW 3: INTERACTIVE LABS & SIMULATORS ──────────────────────────── */}
        {activeTab === "simulators" && (
          <div className="space-y-10" id="simulators">
            
            {/* ── LAB 1: CIRCUIT BREAKER SIMULATOR ── */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0c0514]/90 border border-orange-500/30 space-y-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-widest block">
                    LIVE LAB 01
                  </span>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                    CIRCUIT BREAKER STATE MACHINE SIMULATOR
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Interact directly with the 3-state failure circuit implemented in <code>lib/botApi.ts</code>.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-4 py-2 rounded-2xl font-mono text-xs font-black uppercase tracking-wider border ${
                    cbState === "CLOSED"
                      ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400"
                      : cbState === "OPEN"
                      ? "bg-rose-500/15 border-rose-500/40 text-rose-400 animate-pulse"
                      : "bg-amber-500/15 border-amber-500/40 text-amber-400"
                  }`}>
                    STATE: {cbState} {cbCooldown > 0 && `(${cbCooldown}s cooldown)`}
                  </span>
                </div>
              </div>

              {/* State Machine Diagram */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-4 rounded-2xl border transition-all ${
                  cbState === "CLOSED"
                    ? "bg-emerald-500/10 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-500/20"
                    : "bg-black/40 border-white/5 text-zinc-500"
                }`}>
                  <span className="text-xs font-mono font-black uppercase block mb-1">1. CLOSED (HEALTHY)</span>
                  <p className="text-xs">Requests flow through normally. Consecutive errors increment failure counter.</p>
                  <span className="text-[11px] font-mono font-bold mt-2 block">Failures: {cbFailures} / 3</span>
                </div>

                <div className={`p-4 rounded-2xl border transition-all ${
                  cbState === "OPEN"
                    ? "bg-rose-500/10 border-rose-500 text-rose-300 shadow-lg shadow-rose-500/20"
                    : "bg-black/40 border-white/5 text-zinc-500"
                }`}>
                  <span className="text-xs font-mono font-black uppercase block mb-1">2. OPEN (TRIPPED)</span>
                  <p className="text-xs">Downstream degraded. Requests fail fast with 503 to prevent cascading outages.</p>
                  <span className="text-[11px] font-mono font-bold mt-2 block">Cooldown: {cbCooldown}s remaining</span>
                </div>

                <div className={`p-4 rounded-2xl border transition-all ${
                  cbState === "HALF_OPEN"
                    ? "bg-amber-500/10 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/20"
                    : "bg-black/40 border-white/5 text-zinc-500"
                }`}>
                  <span className="text-xs font-mono font-black uppercase block mb-1">3. HALF_OPEN (PROBE)</span>
                  <p className="text-xs">Cooldown expired. Allowing probe requests. 2 consecutive successes reset to CLOSED.</p>
                  <span className="text-[11px] font-mono font-bold mt-2 block">Probes OK: {cbSuccesses} / 2</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => triggerCbRequest(false)}
                  className="px-5 py-3 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 font-mono text-xs font-bold transition-all active:scale-95 cursor-pointer"
                >
                  🟢 Send Successful Request (200 OK)
                </button>

                <button
                  onClick={() => triggerCbRequest(true)}
                  className="px-5 py-3 rounded-2xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/50 text-rose-300 font-mono text-xs font-bold transition-all active:scale-95 cursor-pointer"
                >
                  🔴 Simulate Downstream Failure (504 Timeout)
                </button>

                <button
                  onClick={() => {
                    setCbState("CLOSED");
                    setCbFailures(0);
                    setCbSuccesses(0);
                    setCbCooldown(0);
                    setCbLogs(["Circuit manually reset to CLOSED state."]);
                  }}
                  className="px-4 py-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 text-zinc-300 font-mono text-xs transition-all active:scale-95 cursor-pointer ml-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5 inline mr-1" /> Reset Circuit
                </button>
              </div>

              {/* Live Terminal Log */}
              <div className="p-4 rounded-2xl bg-black border border-white/10 font-mono text-xs space-y-1.5">
                <span className="text-[10px] text-zinc-500 uppercase font-bold block mb-1">LIVE CIRCUIT TELEMETRY LOGS</span>
                {cbLogs.map((log, i) => (
                  <div key={i} className="text-zinc-300">{log}</div>
                ))}
              </div>
            </div>

            {/* ── LAB 2: EXPONENTIAL BACKOFF WITH JITTER ── */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0c0514]/90 border border-fuchsia-500/30 space-y-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-fuchsia-400 uppercase tracking-widest block">
                    LIVE LAB 02
                  </span>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                    EXPONENTIAL BACKOFF WITH FULL JITTER VISUALIZER
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Compare synchronized retries (causing thundering herd stampedes) against randomized Full Jitter spread.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-black/50 p-1.5 rounded-2xl border border-white/10">
                  <button
                    onClick={() => setJitterMode("with_jitter")}
                    className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                      jitterMode === "with_jitter" ? "bg-fuchsia-500 text-white shadow-md shadow-fuchsia-500/30" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    🎲 Full Jitter (Desynchronized)
                  </button>
                  <button
                    onClick={() => setJitterMode("no_jitter")}
                    className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                      jitterMode === "no_jitter" ? "bg-rose-500 text-white shadow-md shadow-rose-500/30" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    ⚠️ No Jitter (Synchronized Waves)
                  </button>
                </div>
              </div>

              {/* Bars Comparison */}
              <div className="space-y-3 font-mono text-xs">
                {retryDelays.map((delay, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-zinc-400">
                      <span>Attempt #{idx + 1}</span>
                      <span className="font-bold text-white">{delay}ms delay</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-black/60 border border-white/5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          jitterMode === "with_jitter" ? "bg-gradient-to-r from-fuchsia-500 to-rose-500" : "bg-rose-500"
                        }`}
                        style={{ width: `${Math.min(100, (delay / 2000) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-black/50 border border-white/5 font-mono text-xs text-zinc-300">
                <span className="text-orange-400 font-bold block mb-1">ARCHITECTURAL TAKEAWAY:</span>
                {jitterMode === "with_jitter" ? (
                  <p>Full Jitter randomizes retry times across the exponential window ceiling. 10,000 failing clients will retry at disparate millisecond offsets, allowing the database to drain queues smoothly.</p>
                ) : (
                  <p className="text-rose-300">Without jitter, all 10,000 failing clients retry in exact synchronous lockstep at 400ms, 800ms, and 1600ms, hitting the database with cyclic shockwaves that prevent recovery!</p>
                )}
              </div>
            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
