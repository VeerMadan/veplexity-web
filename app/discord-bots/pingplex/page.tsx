"use client";

import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Server, Plus, RefreshCw, LogOut, CheckCircle2, ChevronRight, 
  Search, ArrowLeft, ExternalLink, Radio, Bell, Play, Video, 
  Share2, Sparkles, Terminal, Flame, MessageSquare, ShieldCheck, 
  Lock, Eye, Twitch, Youtube, Twitter, Copy, Check
} from "lucide-react";
import { DiscordLogo, BmcCupIcon } from "@/app/components/BrandIcons";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { dashboardAudio } from "@/lib/dashboardAudio";
import { ServerFlightCanvas, FlightRect, FlightGuildData } from "@/app/components/ServerRevealTransition";

interface GuildItem {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  botJoined: boolean;
  bots?: {
    veplexity: boolean;
    pingplex: boolean;
  };
  iconUrl: string | null;
}

interface CommandItem {
  name: string;
  category: "setup" | "management" | "roles" | "system";
  syntax: string;
  description: string;
  permissions?: string;
  badge?: string;
}

export default function PingPlexLandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Server management state
  const [guilds, setGuilds] = useState<GuildItem[]>([]);
  const [loadingGuilds, setLoadingGuilds] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pendingGuildId, setPendingGuildId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [serverSearch, setServerSearch] = useState("");
  const [serverFilter, setServerFilter] = useState<"all" | "active" | "uninvited">("all");
  const [serverError, setServerError] = useState<string | null>(null);
  const [flightRect, setFlightRect] = useState<FlightRect | null>(null);
  const [flightGuild, setFlightGuild] = useState<FlightGuildData | null>(null);

  // Interactive Simulator States
  const [selectedPlatform, setSelectedPlatform] = useState<"youtube" | "twitch" | "tiktok" | "twitter" | "reddit">("youtube");
  const [activePreset, setActivePreset] = useState<string>("hype");
  const [messageTemplate, setMessageTemplate] = useState<string>(
    "{role} 🚨 **{author}** just dropped something CRAZY! Go check it out: {url}"
  );
  const [pingRole, setPingRole] = useState<string>("@StreamSquad");
  const [copiedPreset, setCopiedPreset] = useState<string | null>(null);

  // Command Directory Search & Filter
  const [commandSearch, setCommandSearch] = useState("");
  const [commandCategory, setCommandCategory] = useState<string>("all");

  const presetTemplates = [
    {
      id: "hype",
      label: "🔥 Hype Alert",
      text: "{role} 🚨 **{author}** just dropped something CRAZY! Go check it out: {url}",
    },
    {
      id: "stream",
      label: "🎮 Stream Live",
      text: "{role} 🔴 **{author}** is now LIVE playing **{game}**! Come chill: {url}",
    },
    {
      id: "clean",
      label: "✨ Minimalist Clean",
      text: "{role} **{author}** • {title} \n{url}",
    },
    {
      id: "chill",
      label: "☕ Community Chill",
      text: "{role} New drop from **{author}**! Grab snacks and enjoy: {url}",
    },
  ];

  const commandsList: CommandItem[] = [
    { name: "/alert setup youtube", category: "setup", syntax: "/alert setup youtube <channel_url> <discord_channel>", description: "Subscribes Discord channel to YouTube video uploads, Shorts, and scheduled premiere alerts.", badge: "Real-time RSS" },
    { name: "/alert setup twitch", category: "setup", syntax: "/alert setup twitch <streamer_login> <discord_channel>", description: "Listens for live broadcast events via Twitch Webhooks with stream title, active game, and viewer previews.", badge: "Sub-Second" },
    { name: "/alert setup tiktok", category: "setup", syntax: "/alert setup tiktok <username> <discord_channel>", description: "Relays new TikTok videos into your community channel with direct short-form player link.", badge: "Zero Delay" },
    { name: "/alert setup twitter", category: "setup", syntax: "/alert setup twitter <handle> <discord_channel>", description: "Mirrors tweets and announcements from an X (Twitter) profile directly into server feed.", badge: "Live Sync" },
    { name: "/alert setup reddit", category: "setup", syntax: "/alert setup reddit <subreddit> <discord_channel> [filter]", description: "Monitors Reddit communities for new hot posts, discussion threads, and game patch notes.", badge: "Subreddit Monitor" },
    { name: "/alert list", category: "management", syntax: "/alert list", description: "Displays all configured feed monitors in the current Discord server with active status and channel IDs." },
    { name: "/alert test", category: "management", syntax: "/alert test <feed_id>", description: "Dispatches a simulated test webhook alert to verify permissions and message layout.", badge: "Instant Verify" },
    { name: "/alert remove", category: "management", syntax: "/alert remove <feed_id>", description: "Permanently removes a content monitor and stops webhook dispatches.", permissions: "Manage Channels" },
    { name: "/alert pingrole", category: "roles", syntax: "/alert pingrole <role>", description: "Configures targeted role mention (e.g. @StreamSquad) when creator uploads occur.", permissions: "Manage Guild" },
    { name: "/alert message", category: "roles", syntax: "/alert message <template>", description: "Customizes announcement message template with dynamic variables like {author}, {role}, {title}, and {url}.", badge: "Template Syntax" },
    { name: "/pingplex status", category: "system", syntax: "/pingplex status", description: "Queries PingPlex Render backend cluster health, webhook latency, and polling intervals." },
  ];

  const filteredCommands = commandsList.filter((cmd) => {
    const matchesCat = commandCategory === "all" || cmd.category === commandCategory;
    const matchesQuery = 
      cmd.name.toLowerCase().includes(commandSearch.toLowerCase()) ||
      cmd.syntax.toLowerCase().includes(commandSearch.toLowerCase()) ||
      cmd.description.toLowerCase().includes(commandSearch.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const fetchGuilds = async (showSpinner = true) => {
    try {
      if (showSpinner) setLoadingGuilds(true);
      else setIsRefreshing(true);
      setServerError(null);
      const res = await fetch("/api/user/guilds", { cache: "no-store" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to load servers");
      }
      const data = await res.json();
      setGuilds(data.guilds || []);
    } catch (err: any) {
      console.error("[PingPlexSelector] Error loading guilds:", err);
      if (showSpinner) setServerError(err.message || "Failed to connect to Discord API");
    } finally {
      if (showSpinner) setLoadingGuilds(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchGuilds(true);
    }
  }, [status]);

  const handleLaunchDashboardClick = () => {
    if (status !== "authenticated") {
      signIn("discord");
    } else {
      const el = document.getElementById("server-console");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleInviteBotToGuild = (guildId: string, guildName: string) => {
    setPendingGuildId(guildId);
    let attempts = 0;
    const interval = setInterval(async () => {
      attempts++;
      try {
        const res = await fetch("/api/user/guilds", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.guilds)) {
            setGuilds(data.guilds);
            const found = data.guilds.find((g: GuildItem) => g.id === guildId);
            if (found?.bots?.pingplex) {
              clearInterval(interval);
              setPendingGuildId(null);
              setToast(`PingPlex connected to ${guildName}!`);
              setTimeout(() => setToast(null), 5000);
            }
          }
        }
      } catch (e) {}

      if (attempts >= 16) {
        clearInterval(interval);
        setPendingGuildId(null);
      }
    }, 2500);
  };

  const handleManageServerFlight = (e: React.MouseEvent, guild: GuildItem) => {
    e.preventDefault();
    e.stopPropagation();
    dashboardAudio.playClick();

    const rect = e.currentTarget.getBoundingClientRect();
    const flightData: FlightGuildData = {
      id: guild.id,
      name: guild.name,
      iconUrl: guild.iconUrl,
      initials: guild.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .substring(0, 3)
        .toUpperCase(),
    };

    try {
      sessionStorage.setItem("vep_server_flight", JSON.stringify(flightData));
    } catch {}

    setFlightRect({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
    setFlightGuild(flightData);

    setTimeout(() => {
      router.push(`/discord-bots/pingplex/${guild.id}`);
    }, 520);
  };

  const visibleGuilds = guilds.filter((g) => {
    const matchesSearch = g.name.toLowerCase().includes(serverSearch.toLowerCase());
    const isJoined = Boolean(g.bots?.pingplex);
    if (serverFilter === "active") return matchesSearch && isJoined;
    if (serverFilter === "uninvited") return matchesSearch && !isJoined;
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#090510] text-zinc-100 flex flex-col font-sans selection:bg-fuchsia-500/30 relative">
      <Navbar />

      {/* Flight Canvas Transition */}
      {flightRect && flightGuild && (
        <ServerFlightCanvas startRect={flightRect} guild={flightGuild} />
      )}

      {/* Global Toast */}
      {toast && (
        <div className="fixed top-24 right-6 z-50 px-4 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20 relative z-10">
        
        {/* HERO SECTION */}
        <section className="relative pt-6 pb-12 sm:pb-20 border-b border-zinc-800/80">
          <div className="absolute -top-10 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-fuchsia-600/20 via-purple-600/15 to-rose-600/10 rounded-full blur-[150px] pointer-events-none" />

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-8">
            <Link href="/discord-bot" className="hover:text-white transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Discord Bots</span>
            </Link>
            <span>/</span>
            <span className="text-fuchsia-400 font-bold">PingPlex</span>
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12">
            
            {/* Left Column: Avatar + Pitch + Direct CTAs */}
            <div className="flex-1 space-y-6 text-center lg:text-left">
              
              {/* Badge + PFP Header Lockup */}
              <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
                <div className="relative group">
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-rose-600 opacity-75 blur group-hover:opacity-100 transition duration-500" />
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-2 border-fuchsia-500/60 shadow-2xl bg-[#160b22]">
                    <img 
                      src="/bots/pingplex-avatar.png" 
                      alt="PingPlex Official Avatar" 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "/vp-logo-icon.png";
                      }}
                    />
                    <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#090510]" title="Render Cloud Active" />
                  </div>
                </div>

                <div className="space-y-1.5 text-center sm:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/40 text-fuchsia-300 font-mono text-xs font-bold">
                    <Radio className="w-3.5 h-3.5 text-fuchsia-400" />
                    <span>CREATOR STREAM ALERTS • 100% FREE FEEDS</span>
                  </div>
                  <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
                    PINGPLEX
                  </h1>
                  <p className="text-xs font-mono text-zinc-400">
                    Application ID: <span className="text-zinc-200">1559520031916687430</span> • Render Engine Live
                  </p>
                </div>
              </div>

              {/* Subtitle / Intro */}
              <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed font-normal">
                The zero-delay creator alert engine for Discord communities. Deliver instantaneous, high-fidelity notifications for <strong>YouTube uploads &amp; shorts</strong>, <strong>Twitch live streams</strong>, <strong>TikTok videos</strong>, <strong>X (Twitter) posts</strong>, and <strong>Reddit threads</strong> — 100% free with unlimited feeds and custom mention presets.
              </p>

              {/* Feature Highlights Pills */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-1">
                {[
                  "Sub-Second Twitch Webhooks",
                  "YouTube Upload & Shorts Alerts",
                  "100% Free Unlimited Feeds",
                  "1-Click Message Presets",
                  "Custom Ping Roles (@StreamSquad)",
                  "Dedicated Render Cluster"
                ].map((pill, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300 font-semibold">
                    ✓ {pill}
                  </span>
                ))}
              </div>

              {/* Direct Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-3 justify-center lg:justify-start">
                <a
                  href="/invite/pingplex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-rose-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-black text-sm tracking-wide uppercase transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-fuchsia-600/25 active:scale-98 group"
                >
                  <DiscordLogo className="w-5 h-5" fill="#ffffff" />
                  <span>Add to Server</span>
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </a>

                <button
                  onClick={handleLaunchDashboardClick}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#140b20] hover:bg-[#1a0e2a] border border-fuchsia-500/30 hover:border-fuchsia-500/60 text-white font-black text-sm tracking-wide uppercase transition-all flex items-center justify-center gap-2.5 shadow-lg active:scale-98"
                >
                  <Server className="w-5 h-5 text-fuchsia-400" />
                  <span>{status === "authenticated" ? "Manage Feeds" : "Launch Studio"}</span>
                  <ChevronRight className="w-4 h-4 text-fuchsia-400" />
                </button>
              </div>

              {/* Legal Links Bar */}
              <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 justify-center lg:justify-start pt-2">
                <Link href="/discord-bot/pingplex/terms" className="hover:text-fuchsia-400 transition-colors underline flex items-center gap-1">
                  <span>Terms of Service</span>
                </Link>
                <span>•</span>
                <Link href="/discord-bot/pingplex/privacy" className="hover:text-fuchsia-400 transition-colors underline flex items-center gap-1">
                  <span>Privacy Policy</span>
                </Link>
                <span>•</span>
                <a href="#commands" className="hover:text-white transition-colors">
                  Alert Commands Reference ↓
                </a>
              </div>
            </div>

            {/* Right Column: Hero Live Interactive Discord Alert Simulator */}
            <div className="w-full lg:w-[480px] rounded-3xl bg-gradient-to-b from-[#180a22] to-[#0c0512] border border-fuchsia-500/30 p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-fuchsia-300">
                    DISCORD WEBHOOK SIMULATOR
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 font-bold">
                  Zero Delay
                </span>
              </div>

              {/* Platform Selector Pills */}
              <div className="flex items-center gap-1.5 py-4 overflow-x-auto">
                {(["youtube", "twitch", "tiktok", "twitter", "reddit"] as const).map((plat) => (
                  <button
                    key={plat}
                    onClick={() => {
                      dashboardAudio.playClick();
                      setSelectedPlatform(plat);
                    }}
                    className={`px-3 py-1 rounded-xl text-[11px] font-mono font-bold uppercase transition ${
                      selectedPlatform === plat
                        ? "bg-fuchsia-500 text-white shadow-md shadow-fuchsia-500/25"
                        : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {plat}
                  </button>
                ))}
              </div>

              {/* Simulated Discord Message */}
              <div className="p-4 rounded-2xl bg-[#2b2d31] border border-zinc-700/60 space-y-3 font-sans">
                {/* Author row */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-fuchsia-600 shrink-0">
                    <img src="/bots/pingplex-avatar.png" alt="PingPlex Bot" className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">PingPlex</span>
                      <span className="text-[9px] px-1 py-0.2 rounded bg-[#5865F2] text-white font-bold font-mono">
                        APP
                      </span>
                      <span className="text-[10px] text-zinc-400">Today at 8:42 PM</span>
                    </div>

                    {/* Announcement text with Role ping */}
                    <p className="text-xs text-zinc-200 leading-snug">
                      <span className="text-[#c9cdfb] bg-[#5865F2]/20 px-1 py-0.5 rounded font-semibold font-mono">
                        {pingRole}
                      </span>{" "}
                      {selectedPlatform === "youtube" && "🚨 **VePlexity Network** just uploaded a brand new video!"}
                      {selectedPlatform === "twitch" && "🔴 **VePlexity** is LIVE streaming GTA VI gameplay!"}
                      {selectedPlatform === "tiktok" && "🔥 New TikTok drop from **@veplexity**!"}
                      {selectedPlatform === "twitter" && "🐦 New tweet from **@VePlexityDev**:"}
                      {selectedPlatform === "reddit" && "🟠 New trending discussion in **r/gaming**!"}
                    </p>
                  </div>
                </div>

                {/* Embed Card */}
                <div className="ml-13 pl-3 border-l-4 border-fuchsia-500 bg-[#1e1f22] p-3 rounded-lg space-y-2 text-xs">
                  <span className="text-[10px] font-mono text-fuchsia-400 font-bold uppercase">
                    {selectedPlatform === "youtube" && "YouTube Upload • 1080p60"}
                    {selectedPlatform === "twitch" && "Twitch Live Broadcast • 4,280 Viewers"}
                    {selectedPlatform === "tiktok" && "TikTok Short Video"}
                    {selectedPlatform === "twitter" && "X Announcement"}
                    {selectedPlatform === "reddit" && "Reddit Thread"}
                  </span>
                  <p className="font-bold text-white text-sm">
                    {selectedPlatform === "youtube" && "Building the Future of Autonomous Discord Architecture"}
                    {selectedPlatform === "twitch" && "Late Night Community Gaming & Chat Vibing"}
                    {selectedPlatform === "tiktok" && "Behind the Scenes at VePlexity Network Labs"}
                    {selectedPlatform === "twitter" && "PingPlex Studio engine is officially deployed live on Render!"}
                    {selectedPlatform === "reddit" && "What makes modern Discord bots stand out in 2026?"}
                  </p>
                  <div className="h-28 w-full rounded-lg bg-zinc-800/80 overflow-hidden relative flex items-center justify-center text-zinc-500 font-mono text-[11px] border border-zinc-700">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span className="relative z-10 text-white font-bold flex items-center gap-1.5">
                      <Play className="w-4 h-4 fill-white" />
                      <span>Click to Watch Broadcast</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 1-CLICK PRESET TEMPLATES SHOWCASE */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-fuchsia-400 font-bold uppercase tracking-wider">
              1-CLICK MESSAGE CUSTOMIZER
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              INSTANT PRESET MESSAGE STYLES
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
              Select one-click formatting styles for your Discord stream announcements. Customize mention roles and dynamic variables with zero coding.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {presetTemplates.map((preset) => (
              <div
                key={preset.id}
                onClick={() => {
                  dashboardAudio.playClick();
                  setActivePreset(preset.id);
                  setMessageTemplate(preset.text);
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  activePreset === preset.id
                    ? "bg-fuchsia-950/30 border-fuchsia-500/80 shadow-lg shadow-fuchsia-600/20"
                    : "bg-[#0d0716] border-zinc-800/80 hover:border-zinc-700"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-black text-white">{preset.label}</span>
                    {activePreset === preset.id && (
                      <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-ping" />
                    )}
                  </div>
                  <p className="font-mono text-[11px] text-zinc-400 leading-relaxed bg-black/40 p-2.5 rounded-xl border border-zinc-800/60 break-words">
                    {preset.text}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(preset.text);
                    setCopiedPreset(preset.id);
                    setTimeout(() => setCopiedPreset(null), 2000);
                  }}
                  className="w-full py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300 hover:text-white flex items-center justify-center gap-1.5"
                >
                  {copiedPreset === preset.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Preset</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* COMMANDS REFERENCE SECTION */}
        <section id="commands" className="space-y-6 pt-10 border-t border-zinc-800/80">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-fuchsia-400 font-bold uppercase tracking-wider">
                COMMAND DIRECTORY
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                PINGPLEX SLASH COMMANDS
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400">
                Full reference for configuring YouTube, Twitch, TikTok, X, and Reddit stream monitors.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search commands (e.g. setup, youtube, twitch)..."
                value={commandSearch}
                onChange={(e) => setCommandSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-fuchsia-500/50"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Commands" },
              { id: "setup", label: "📡 Feed Setup" },
              { id: "management", label: "📋 Feed Management" },
              { id: "roles", label: "🔔 Mentions & Templates" },
              { id: "system", label: "⚙️ System & Health" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCommandCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  commandCategory === cat.id
                    ? "bg-fuchsia-600 text-white shadow-md shadow-fuchsia-600/20"
                    : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Commands Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredCommands.map((cmd, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#0d0716] border border-zinc-800/80 hover:border-fuchsia-500/40 transition-all flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-white group-hover:text-fuchsia-400 transition-colors">
                      {cmd.name}
                    </span>
                    {cmd.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-fuchsia-500/15 border border-fuchsia-500/30 text-fuchsia-300 font-bold">
                        {cmd.badge}
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-[11px] text-fuchsia-300/80 bg-black/40 p-1.5 rounded-lg border border-zinc-800/50">
                    {cmd.syntax}
                  </p>
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                    {cmd.description}
                  </p>
                </div>

                {cmd.permissions && (
                  <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                    <span>Perms:</span>
                    <span className="text-zinc-400 font-semibold">{cmd.permissions}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* INTEGRATED SERVER MANAGEMENT CONSOLE */}
        <section id="server-console" className="space-y-6 pt-10 border-t border-zinc-800/80 scroll-mt-24">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-mono text-fuchsia-400 font-bold uppercase tracking-wider">
              PINGPLEX STUDIO CONSOLE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              LAUNCH PINGPLEX ALERTS STUDIO
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Select your Discord server below to configure automated social webhooks, feed subscriptions, and notification templates.
            </p>
          </div>

          {/* Unauthenticated View */}
          {status !== "authenticated" ? (
            <div className="max-w-xl mx-auto p-8 rounded-3xl bg-gradient-to-b from-[#160b22] to-[#090510] border border-fuchsia-500/30 text-center space-y-6 shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-fuchsia-500/10 border-2 border-fuchsia-500/40 flex items-center justify-center text-fuchsia-400 mx-auto">
                <Radio className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white uppercase">Connect Your Discord Account</h3>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Authenticate with Discord to configure PingPlex across servers where you have <strong>Manage Server</strong> permissions.
                </p>
              </div>

              <button
                onClick={() => signIn("discord")}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-rose-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-black text-sm tracking-wide uppercase transition-all flex items-center justify-center gap-3 shadow-xl shadow-fuchsia-600/25 active:scale-98"
              >
                <DiscordLogo className="w-5 h-5" fill="#ffffff" />
                <span>Log In with Discord</span>
              </button>

              <p className="text-[11px] font-mono text-zinc-500">
                PingPlex only queries your server list to match eligible guilds. We never request message history or payment permissions.
              </p>
            </div>
          ) : (
            /* Authenticated Server Deck View */
            <div className="space-y-6 max-w-5xl mx-auto">
              {/* Filter & Refresh Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0e0716] border border-zinc-800">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search servers..."
                      value={serverSearch}
                      onChange={(e) => setServerSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-black border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-fuchsia-500/50"
                    />
                  </div>

                  <div className="flex gap-1 bg-black p-1 rounded-xl border border-zinc-800 text-xs">
                    {(["all", "active", "uninvited"] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setServerFilter(mode)}
                        className={`px-3 py-1 rounded-lg font-mono capitalize transition ${
                          serverFilter === mode ? "bg-fuchsia-600 text-white font-bold" : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => fetchGuilds(false)}
                    disabled={isRefreshing}
                    className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition disabled:opacity-50"
                    title="Refresh Servers"
                  >
                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
                  </button>

                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-rose-400 transition"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>

              {/* Guilds Grid */}
              {loadingGuilds ? (
                <div className="text-center py-16 space-y-3">
                  <div className="w-8 h-8 rounded-full border-2 border-fuchsia-500 border-t-transparent animate-spin mx-auto" />
                  <p className="text-xs font-mono text-zinc-400">Loading your Discord servers...</p>
                </div>
              ) : visibleGuilds.length === 0 ? (
                <div className="text-center py-12 p-8 rounded-2xl bg-[#0e0716] border border-zinc-800 space-y-2">
                  <p className="text-sm font-bold text-white">No servers matching criteria</p>
                  <p className="text-xs text-zinc-400">Ensure you have Manage Server permissions or clear your search query.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {visibleGuilds.map((guild) => {
                    const isJoined = Boolean(guild.bots?.pingplex);
                    return (
                      <div
                        key={guild.id}
                        className="p-5 rounded-2xl bg-[#0e0716] border border-zinc-800 hover:border-fuchsia-500/40 transition flex flex-col justify-between space-y-4 shadow-lg group"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden flex items-center justify-center font-bold text-sm text-zinc-400 shrink-0">
                            {guild.iconUrl ? (
                              <img src={guild.iconUrl} alt={guild.name} className="w-full h-full object-cover" />
                            ) : (
                              guild.name.substring(0, 2).toUpperCase()
                            )}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-white truncate group-hover:text-fuchsia-400 transition-colors">
                              {guild.name}
                            </h4>
                            <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
                              <span>ID: {guild.id.substring(0, 8)}...</span>
                              {guild.owner && <span className="text-fuchsia-400 font-bold">Owner</span>}
                            </div>
                          </div>
                        </div>

                        {/* Action CTA */}
                        {isJoined ? (
                          <button
                            onClick={(e) => handleManageServerFlight(e, guild)}
                            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white text-xs font-black transition flex items-center justify-between active:scale-98 shadow-md shadow-fuchsia-600/20"
                          >
                            <span>LAUNCH STUDIO</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        ) : (
                          <a
                            href={`https://discord.com/api/oauth2/authorize?client_id=1559520031916687430&permissions=8&scope=bot%20applications.commands&guild_id=${guild.id}&disable_guild_select=true`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleInviteBotToGuild(guild.id, guild.name)}
                            className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-black transition flex items-center justify-between active:scale-98"
                          >
                            <span>INVITE PINGPLEX</span>
                            <Plus className="w-4 h-4 text-fuchsia-400" />
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </section>

        {/* IN-PAGE LEGAL HIGHLIGHTS */}
        <section className="pt-10 border-t border-zinc-800/80">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0c0614] border border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-fuchsia-400" />
                <h4 className="text-base font-bold text-white uppercase">Official Terms of Service</h4>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                By adding PingPlex to your Discord guild or subscribing to creator feeds, you agree to comply with Discord Developer Terms of Service and third-party platform API guidelines.
              </p>
              <Link
                href="/discord-bot/pingplex/terms"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
              >
                <span>Read Full Terms of Service</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-purple-400" />
                <h4 className="text-base font-bold text-white uppercase">Privacy &amp; Data Protection</h4>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                PingPlex processes only public social channel identifiers and server webhook destinations. We never access private channel messages or personal community chatter.
              </p>
              <Link
                href="/discord-bot/pingplex/privacy"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-purple-400 hover:text-purple-300 transition-colors"
              >
                <span>Read Full Privacy Policy</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
