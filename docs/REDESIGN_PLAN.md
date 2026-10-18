# VePlexity Redesign & Production Engineering Plan

> **Directive Reference:** Section 2.C — Redesign Plan  
> **Target:** Complete ecosystem transformation preserving 100% of existing functionality while delivering a world-class, premium dark developer-platform experience.

---

## 1. Information Architecture & Route Topology

```
https://www.veplexity.dev
│
├── / (Home / Brand Overview)
│   ├── Ecosystem Navigation & Real-time Lavalink Telemetry
│   ├── Flagship Projects Deck (VePlexity Bot, PingPlex, Labs)
│   └── Performance Metrics & Audio Engine Showcase
│
├── /discord-bot (Premium Product Directory)
│   ├── Product 1: VePlexity Commercial Bot (All-in-One Infrastructure)
│   │   ├── Direct Actions: "Explore Bot" (/discord-bot/veplexity) & "Add to Server" (/invite)
│   │   └── Direct Link: "Dashboard Console" (/discord-bots/veplexity/dashboard)
│   ├── Product 2: PingPlex Creator Bot (Social Multi-Feed Webhooks)
│   │   ├── Direct Actions: "Explore Bot" (/discord-bot/pingplex) & "Add to Server" (/invite/pingplex)
│   │   └── Direct Link: "Dashboard Console" (/discord-bots/pingplex/dashboard)
│   └── Global Legal Directory (Terms & Privacy Links)
│
├── /discord-bot/veplexity (VePlexity Landing & Showcase)
│   ├── Unboxed High-Res Brand Logo with Verified App Badge
│   ├── Dual Action CTAs: "Add to Server" & "Launch Server Dashboard"
│   ├── 48kHz VOIP Lossless Audio Player (Spotlight on "Aisi Tu" by Tanvik x VeeRM)
│   ├── Interactive Discord Live Command Terminal Simulator
│   ├── 15 Core Modules Matrix Exploration
│   └── Codified Legal Policies (In-page + Standalone Links)
│
├── /dashboard (Unified Server Selection Gateway)
│   ├── Authenticated Discord Server List
│   ├── Server Search, Owner Badges, and Dual-Bot Presence Indicators
│   └── 1-Click Route to Server Dashboard
│
└── /discord-bots/veplexity/dashboard & /discord-bots/veplexity/[guildId]
    ├── Application Shell: Collapsible Sidebar, Server Switcher, Lavalink Status Pill
    ├── 6 Dark Theme Profiles (Blurple SaaS, Midnight Cyberpunk, Emerald Hacker, Sunset Amber, Nordic Frost, Monochrome Stealth)
    ├── Studio 1: Overview & Stats (Live Metrics, Quick Lossless Player, UPI/BMAC Monetization, 15 Modules Matrix)
    ├── Studio 2: 100+ Commands Catalog (Interactive Live Discord Visualizer)
    ├── Studio 3: Moderation Hub (Real-time Cases Table, Live Warn/Timeout/Kick/Ban Dispatch)
    ├── Studio 4: Studio Music DSP (7 Hardware Filters, Master Volume Limiter, 24/7 Retention Switch)
    ├── Studio 5: Economy & Tycoons (Net Worth Leaderboard, Streaks, Voice Farming)
    └── Studio 6: AutoMod & Config (Tactile Defense Toggles, Live Save & Toast Confirmation)
```

---

## 2. Design System Tokens & Aesthetic Standards

### 2.1 Palette & Surface Tokens
* **Base Canvas**: `#0B0B10` (Deep Developer OLED Slate)
* **Elevated Surfaces**: `#17151F` (Backdrop blur 16px, 1px border `#30283A`)
* **Secondary / Active Panels**: `#14121A`
* **Border Dividers**: `rgba(255, 255, 255, 0.08)` / `#30283A`
* **Primary Text**: `#F5F3FF`
* **Muted / Secondary Text**: `#A1A1AA`
* **Brand Accents**:
  * Brand Magenta: `#F052B5` / `#BD5FFF`
  * Brand Orange: `#FF6A00` / `#F97316`
  * Electric Gold (VIP): `#FFDD00`
  * Discord Blurple: `#5865F2`
  * Online Status Green: `#2ECC71` / `#10B981`

### 2.2 Design Rules & Ergonomics
1. **Zero Monolithic Bloat**: Clean, decoupled, modular state management.
2. **Resilient Non-Blocking UX**: Dashboard never crashes into empty skeletons on cold-starts; interactive fallback preview with 1-click Discord linking.
3. **Tactile Feedback**: Procedural Web Audio API sound synthesizers for toggles, clicks, and state changes (toggle pop, achievement chime, shield hum).
4. **Accessible Typography & Contrast**: Strict contrast ratios adhering to WCAG 2.1 AA standards.
5. **No Visual Fraud**: Metric indicators and uptime stats reflect verified backend capabilities; no fabricated numbers.

---

## 3. Server-Side Security & Authorization Hardening

1. **Permission Check on `/api/bot/guilds/[guildId]`**:
   * Inspect incoming user session via `auth()`.
   * Cross-reference target `guildId` against user's Discord guild list.
   * Verify that user owns the server or possesses `ADMINISTRATOR (0x8)` or `MANAGE_GUILD (0x20)` bitfield permissions.
   * Deny unauthorized access with `403 Forbidden` if permissions are insufficient, preventing IDOR vulnerability.
2. **Server-to-Server Proxy Security**:
   * Outgoing requests to Render bot backends pass header `x-api-key: [process.env.BOT_API_KEY]`.
   * Sensitive secrets never leak into client bundles.

---

## 4. Implementation & Verification Plan

1. **Backend Route Hardening**: Add guild-level permission verification in `app/api/bot/guilds/[guildId]/route.ts`.
2. **Unified Dashboard Synchronization**: Ensure `/dashboard`, `/discord-bots/veplexity/dashboard`, and `/discord-bots/veplexity/[guildId]` seamlessly interchange real guilds and demo previews.
3. **End-to-End Test & Build**: Execute `npx tsc --noEmit` and `npm run build` to confirm 0 compilation errors across all 26 routes.
4. **Git Version Control & Deployment Verification**: Commit verified updates and push to `origin main`.
