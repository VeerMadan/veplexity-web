# VePlexity Product & Ecosystem Inventory

> **Document Version:** 1.0.0  
> **Status:** Active / Source of Truth  
> **Ecosystem Base Domain:** https://www.veplexity.dev  
> **Commercial Bot Backend:** https://veplexity-bot.onrender.com  
> **PingPlex Bot Backend:** https://pingplex.onrender.com  

---

## 1. Public Website & Application Routes

| Route | Classification | Primary Purpose & Features | Auth Gating |
|---|---|---|---|
| `/` | Public Marketing | Brand landing page, ecosystem introduction, flagship projects, telemetry preview | None |
| `/discord-bot` | Public Directory | Dual-bot showcase directory (VePlexity and PingPlex), capability comparisons, direct install & explore CTAs | None |
| `/discord-bot/veplexity` | Public Product Page | Dedicated VePlexity bot showcase, verified status, 6-module highlights, interactive command simulator with live typing ("Aisi Tu" track spotlight), legal compliance directory, dual CTAs | None |
| `/discord-bot/veplexity/terms` | Public Legal | Codified standalone Terms of Service for VePlexity Commercial Bot (zero raw MD rendering) | None |
| `/discord-bot/veplexity/privacy` | Public Legal | Codified standalone Privacy Policy for VePlexity Commercial Bot | None |
| `/discord-bot/pingplex` | Public Product Page | Dedicated PingPlex creator bot showcase, multi-feed alert simulator, webhook dispatch documentation | None |
| `/discord-bot/pingplex/terms` | Public Legal | Codified standalone Terms of Service for PingPlex | None |
| `/discord-bot/pingplex/privacy` | Public Legal | Codified standalone Privacy Policy for PingPlex | None |
| `/dashboard` | Protected Gateway | Unified server dashboard selector; displays administered servers with bot installation status pills | Discord OAuth |
| `/discord-bots/veplexity/dashboard` | Application Shell | Dedicated full-screen VePlexity SaaS Management Console featuring 6 swappable dark themes, live Lavalink node telemetry, 6 studio tabs, Indian UPI + BMAC monetization | Resilient (Interactive Demo + Live OAuth) |
| `/discord-bots/veplexity/[guildId]` | Application Studio | Server-specific configuration console mapping real guild data, roles, channels, and persistence endpoints | Discord OAuth + Admin Perms |
| `/discord-bots/pingplex/dashboard` | Application Shell | Server selector and social alert overview for PingPlex bot | Discord OAuth |
| `/discord-bots/pingplex/[guildId]` | Application Studio | Social Alerts Studio with 1-click preset templates, test alert dispatch, webhook channel wiring | Discord OAuth + Admin Perms |
| `/news-wire` | Public Media | Platform announcements, changelog entries, version release notes | None |
| `/support` | Public Support | Help desk, official Discord server links, contact routing, community guidelines | None |
| `/contact` | Public Form | Direct inquiry and developer support form | None |
| `/terms` | Public Legal | Global terms of service for VePlexity Network | None |
| `/privacy` | Public Legal | Global privacy policy for VePlexity Network | None |
| `/labs` | Public R&D | Experimental software, native player demos, upcoming tools | None |
| `/invite` | OAuth Redirect | 302 Redirect to Discord Bot OAuth installation (`client_id=1556640364448714752`, `permissions=8`) | None |
| `/invite/pingplex` | OAuth Redirect | 302 Redirect to PingPlex Bot OAuth installation (`client_id=1559520031916687430`, `permissions=8`) | None |

---

## 2. Commercial Bot Commands Catalog

The commercial VePlexity bot (`bot.js`) operates with dual dispatch (Slash `/` commands and Prefix `.`, `?`, `!` commands):

### 2.1 Audio & Music Studio Engine
* `/play <query>`: Lossless audio resolution with 48kHz VOIP DSP, YouTube/Spotify search, and local FLAC library fallback.
* `/pause` / `/resume`: Toggles playback pause state without losing buffer.
* `/skip`: Votes or forces track skip.
* `/stop`: Flushes voice queue, disconnects player, and resets DSP filters.
* `/volume <1-150>`: Hardware/software gain scaling up to 150% with peak limiting.
* `/queue`: Interactive paginated track queue viewer.
* `/np`: Rich embed showing current track, progress bar, audio specs, and requester.
* `/seek <timestamp>`: Jumps to exact position in streaming audio.
* `/filter <bassboost|8d|nightcore|vaporwave|karaoke|tremolo|clear>`: Real-time stackable DSP filters.
* `/autoplay`: Automatically queries related recommendations when queue finishes.
* `/247 <enable:bool>`: Locks bot in voice channel to prevent idle timeout disconnects.
* `/lyrics [song]`: Multi-page Genius lyrics retrieval.
* `/clear`: Wipes queue while keeping active stream playing.

### 2.2 AutoMod & Security Shield
* `/warn <user> [reason]`: Records moderator warning in database and dispatches DM notice.
* `/warnings <user>`: Inspects active and past warning log history.
* `/timeout <user> <duration> [reason]`: Discord native timeout isolation up to 28 days.
* `/untimeout <user>`: Revokes active timeout status.
* `/kick <user> [reason]`: Ejects member from server with audit log record.
* `/ban <user> [delete_days] [reason]`: Permanent guild ban with message prune.
* `/unban <userId>`: Revokes guild ban status.
* `.purge <amount>` / `/purge <amount>`: High-speed dual-engine bulk message deletion (up to 100 messages) with 5-second auto-clearing audit receipt.
* `/lock` / `/unlock`: Toggles `@everyone` `SendMessages` permissions in current channel.
* `/slowmode <seconds>`: Calibrates channel chat velocity limiter.

### 2.3 Community Engagement & Leveling
* `/rank [user]`: Generates dynamic custom Canvas rank card, level status, and XP bar.
* `/leaderboard [xp|cash]`: Top server leaderboard ranking.
* `/daily`: Claims daily currency reward and maintains consecutive streak counter.
* `/balance [user]`: Displays wallet and bank reserves.
* `/pay <user> <amount>`: Peer-to-peer virtual currency transfer.
* `/work`: Periodic earnings job mini-game.
* `/rob <user>`: Risk-based wallet steal mechanic with fine probability.

### 2.4 Server Utilities & Automation
* `/tempvc setup <hubChannel>`: Deploys dynamic Join-to-Create voice hubs that auto-create and auto-delete voice channels.
* `/reactionroles`: Deploys interactive self-assignable button or dropdown role menus.
* `/announce <channel> <title> <message>`: Dispatches styled announcement embeds with `@everyone`/`@here` support.
* `/gemini ask <prompt>`: Queries Google Gemini 2.5 Flash conversational model with guild contextual memory.
* `/serverinfo` / `/userinfo` / `/avatar`: Diagnostic server and member intelligence embeds.

---

## 3. The 15 Configurable Modules Matrix

1. **Welcome & Goodbye**: Custom welcome cards, join/leave channels, DM welcome, auto-assign default member roles.
2. **Reaction Roles & Menus**: Discord button and select menu role assignment without third-party bots.
3. **Message Builder & Embeds**: Custom embed creator with customizable colors, titles, descriptions, and pings.
4. **XP Leveling & Rank System**: Chat and voice time XP gain, custom rank cards, level-up celebration channel.
5. **Voice & Text Activity Rewards**: Milestone tracking for hours spent in voice channels and messages sent, unlocking tiered roles.
6. **Starboard (Hall of Fame)**: Automatic message pinning to dedicated starboard channel upon reaching star reaction threshold.
7. **Birthdays & Counting Games**: Counting channel enforcement and automated community birthday shoutouts.
8. **Server Boosters Appreciation**: Automatic public announcements and VIP perks when a member boosts the server.
9. **Custom Auto-Responders**: Automated keyword triggers (exact, contains, regex) with rich pre-configured responses.
10. **Auto-Mod Security Shield**: Real-time filters for Anti-Invite links, Anti-Spam velocity, Toxic bad words, Anti-Links, and Anti-Caps.
11. **Bot Masters & Moderator Roles**: Configuration of authorized moderator roles allowed to trigger admin commands.
12. **Audit & Logging Channels**: Granular channels for message edits, deletions, member joins/leaves, and mod actions.
13. **Music & DJ Audio (24/7)**: DJ role enforcement, default startup volume, 24/7 channel retention, and hardware DSP presets.
14. **Temporary Voice Hubs**: Dynamic join-to-create voice channels that automatically spawn and clean up when empty.
15. **Gemini AI Chatbot**: Channel binding, mode selection (Standard, Developer, Creative), and custom prompt persona.

---

## 4. Authentication, Authorization & Security Architecture

* **Provider**: NextAuth.js v5 with Discord OAuth2 Provider.
* **OAuth Scopes**: `identify`, `guilds`, `email`.
* **Session Persistence**: JWT session encrypted via `AUTH_SECRET`.
* **Client-to-Backend Authorization**:
  * Frontend API calls send request headers with authenticated NextAuth session cookie.
  * Next.js API route validates user session and permissions against Discord API (`https://discord.com/api/v10/users/@me/guilds`).
  * Required Permission Bitfields: `ADMINISTRATOR (0x8)` or `MANAGE_GUILD (0x20)` or `isOwner === true`.
  * Secure server-to-server proxy communication to bot backend via header `x-api-key: [process.env.BOT_API_KEY]`.
* **Zero Hardcoded Passwords**: All authorization is cryptographically verified against Discord OAuth and role permissions.

---

## 5. Persistence & Data Schemas

* **Bot Database**: JSON storage in `./data/storage.json` managed via `DatabaseService` (`src/services/database.js`).
* **Guild Configuration Schema (`guildConfigs[guildId]`)**:
  ```json
  {
    "modRoles": ["role_id_1", "role_id_2"],
    "djRole": "role_id_dj",
    "defaultVolume": 100,
    "stay247": true,
    "chatbotChannelId": "channel_id_ai",
    "autoMod": {
      "antiInvite": true,
      "antiSpam": true,
      "antiBadWords": true,
      "antiLinks": false,
      "antiCaps": false
    },
    "loggingChannels": {
      "messageEdit": "channel_id",
      "messageDelete": "channel_id",
      "modActions": "channel_id",
      "memberJoin": "channel_id",
      "memberLeave": "channel_id",
      "roleUpdate": "channel_id"
    },
    "suggestionsChannel": "channel_id_sugg",
    "leveling": {
      "enabled": true,
      "channelId": "channel_id_lvl",
      "message": "GG {user}, you reached Level {level}!",
      "xpRate": 1
    },
    "boosters": {
      "enabled": true,
      "channelId": "channel_id_boost",
      "roleId": "role_id_booster",
      "message": "🚀 Thank you {user} for boosting {server}!"
    },
    "reactionRoles": [],
    "autoResponders": [],
    "activityRewards": {
      "enabled": true,
      "voiceRewardsEnabled": true,
      "voiceMilestones": [],
      "textRewardsEnabled": true,
      "textMilestones": []
    }
  }
  ```

---

## 6. External Integrations & Infrastructure

1. **Discord Gateway v10**: Real-time websocket event engine with voice connection handling via `@discordjs/voice`.
2. **Lavalink Audio Node**: High-performance audio streaming daemon supporting 48kHz lossless VOIP transcoding.
3. **Google Gemini 2.5 API**: Multi-modal natural language API for conversational AI interactions.
4. **Render Cloud Platform**: Hosts `veplexity-bot` backend service (`https://veplexity-bot.onrender.com`) and `pingplex` service (`https://pingplex.onrender.com`).
5. **Production Web Domain**: `https://www.veplexity.dev` hosted with automated SSL and edge routing.
