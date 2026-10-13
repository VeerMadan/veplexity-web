"use client";

import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Server, Plus, RefreshCw, LogOut, CheckCircle2, ChevronRight, 
  Search, Shield, ArrowLeft, ExternalLink, Music, Award, Lock, 
  Users, Bot, Mic, Zap, Play, Pause, Volume2, Sparkles, Terminal,
  Sliders, MessageSquare, AlertTriangle, ShieldCheck, Heart, Radio,
  Copy, Check, Hash, Bell, User, Clock, AlertCircle
} from "lucide-react";
import { DiscordLogo, BmcCupIcon } from "@/app/components/BrandIcons";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { dashboardAudio } from "@/lib/dashboardAudio";
import { ServerFlightCanvas, FlightRect, FlightGuildData } from "@/app/components/ServerRevealTransition";
import { CardZoomRevealCanvas, ZoomRevealRect, ZoomRevealBotData } from "@/app/components/CardZoomRevealCanvas";

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

interface CommandSpec {
  name: string;
  category: "music" | "moderation" | "ai" | "xp" | "prefix" | "tempvc" | "utility";
  syntax: string;
  userCommand: string;
  description: string;
  permissions?: string;
  badge?: string;
  botResponse: {
    embedTitle: string;
    embedColor: string;
    embedDesc: string;
    fields?: Array<{ name: string; value: string; inline?: boolean }>;
    footer?: string;
    buttons?: string[];
    rankCardData?: {
      level: number;
      rank: number;
      currentXp: number;
      nextXp: number;
    };
  };
}

export default function VePlexityBotLandingPage() {
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
  
  // Flight transition states
  const [flightRect, setFlightRect] = useState<FlightRect | null>(null);
  const [flightGuild, setFlightGuild] = useState<FlightGuildData | null>(null);
  
  // Zoom Reveal for Launch Dashboard
  const [zoomRect, setZoomRect] = useState<ZoomRevealRect | null>(null);
  const [zoomBot, setZoomBot] = useState<ZoomRevealBotData | null>(null);

  // Command Explorer State
  const [selectedCommandIdx, setSelectedCommandIdx] = useState<number>(0);
  const [commandCategory, setCommandCategory] = useState<string>("all");
  const [commandSearch, setCommandSearch] = useState<string>("");
  const [copiedCmd, setCopiedCmd] = useState<boolean>(false);

  // Lossless Player state in Hero
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [bassBoost, setBassBoost] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(85);

  const commandSpecs: CommandSpec[] = [
    {
      name: "/play",
      category: "music",
      syntax: "/play <query_or_url>",
      userCommand: "/play query: Synthwave Sunset 2026",
      description: "Streams lossless audio directly into your current voice channel with hardware-accelerated 48kHz VOIP DSP.",
      badge: "48kHz Lossless",
      botResponse: {
        embedTitle: "🎵 Now Streaming in #music-lounge",
        embedColor: "#f97316",
        embedDesc: "**Track:** Synthwave Sunset 2026\n**Artist:** VePlexity Masters • **Duration:** 3:45\n**Status:** 24/7 Channel Lock Active • Buffer: 0ms",
        fields: [
          { name: "Requested By", value: "<@Veer>", inline: true },
          { name: "Audio DSP", value: "Bass Boost +12dB", inline: true },
          { name: "Volume", value: "85% Master", inline: true }
        ],
        footer: "VePlexity 48kHz Audio Engine • 24/7 Voice Retention",
        buttons: ["Pause ⏸️", "Skip ⏭️", "Loop 🔁", "Lyrics 📜"]
      }
    },
    {
      name: ".purge",
      category: "prefix",
      syntax: ".purge <amount>",
      userCommand: ".purge 25",
      description: "Instant rapid-fire message purge with dual-engine runner and 5-second auto-clearing feedback embed.",
      badge: "Dual-Engine",
      permissions: "Manage Messages",
      botResponse: {
        embedTitle: "🛡️ Channel Purge Completed",
        embedColor: "#f43f5e",
        embedDesc: "Successfully wiped **25 messages** from this channel.\n\n*This audit alert will automatically delete itself in 5 seconds to keep your chat clean.*",
        fields: [
          { name: "Moderator", value: "<@Veer>", inline: true },
          { name: "Channel", value: "#general-chat", inline: true },
          { name: "Filter", value: "All Messages", inline: true }
        ],
        footer: "VePlexity Defense Matrix • Instant Execution"
      }
    },
    {
      name: "/gemini ask",
      category: "ai",
      syntax: "/gemini ask <prompt>",
      userCommand: "/gemini ask prompt: Explain quantum computing in simple terms.",
      description: "Queries Google Gemini 2.5 multi-modal conversational intelligence with contextual reasoning and memory.",
      badge: "Gemini 2.5",
      botResponse: {
        embedTitle: "✨ Google Gemini Intelligence",
        embedColor: "#d946ef",
        embedDesc: "Quantum computers don't just calculate with normal 1s and 0s (bits). Instead, they use **qubits**, which can exist as both a 1 and a 0 at the same time—a phenomenon called **superposition**.\n\nThis lets a quantum computer test millions of possible solutions simultaneously, making problems like molecular simulation, route optimization, and code breaking exponentially faster than classical supercomputers.",
        fields: [
          { name: "Model", value: "Gemini 2.5 Flash", inline: true },
          { name: "Latency", value: "412ms", inline: true }
        ],
        footer: "Powered by Google Gemini Multi-Modal API"
      }
    },
    {
      name: "/rank",
      category: "xp",
      syntax: "/rank [user]",
      userCommand: "/rank user: @Veer",
      description: "Generates custom visual XP rank card displaying level, tier, and server leaderboard position.",
      badge: "Rich Visual",
      botResponse: {
        embedTitle: "🏆 Server XP Progression Card",
        embedColor: "#f97316",
        embedDesc: "Member: **Veer Madan**\nRole: **Server Founder & VIP Elite**",
        rankCardData: {
          level: 42,
          rank: 1,
          currentXp: 12450,
          nextXp: 15000
        },
        fields: [
          { name: "Leaderboard", value: "Rank #1 (Top 1%)", inline: true },
          { name: "Level", value: "Level 42", inline: true },
          { name: "Total XP", value: "12,450 / 15,000 XP", inline: true }
        ],
        footer: "VePlexity XP Leveling • Voice & Text Rewards"
      }
    },
    {
      name: "/ban",
      category: "moderation",
      syntax: "/ban <user> [reason] [purge_days]",
      userCommand: "/ban user: @RaidBot reason: Automated malicious link spam",
      description: "Bans a malicious member, purges previous message history, and stores indexed case audit logs.",
      badge: "100% Free",
      permissions: "Ban Members",
      botResponse: {
        embedTitle: "🔨 Member Banned — Case #492",
        embedColor: "#ef4444",
        embedDesc: "**Target:** `RaidBot#9921` (`148902847192841`)\n**Reason:** Automated malicious link spam\n**Purged Messages:** 7 days history wiped.",
        fields: [
          { name: "Moderator", value: "<@Veer>", inline: true },
          { name: "Action", value: "Permanent Guild Ban", inline: true }
        ],
        footer: "VePlexity ModLogs • Indexed Incident Storage"
      }
    },
    {
      name: "/tempvc",
      category: "tempvc",
      syntax: "/tempvc setup",
      userCommand: "/tempvc setup hub_channel: ➕ Join to Create",
      description: "Deploys automated join-to-create voice channels that spawn dynamically and self-delete when empty.",
      badge: "Dynamic Hub",
      permissions: "Manage Channels",
      botResponse: {
        embedTitle: "🎙️ Dynamic Temp Voice Hub Active",
        embedColor: "#10b981",
        embedDesc: "Hub channel **➕ Join to Create** is operational. Whenever a member joins, VePlexity creates a private temporary room with lock/limit controls.",
        fields: [
          { name: "Active Rooms", value: "🔊 Veer's Lounge (3/4)", inline: true },
          { name: "Auto-Cleanup", value: "Instant on empty", inline: true }
        ],
        footer: "VePlexity Voice Systems • Zero Clutter"
      }
    },
    {
      name: ".afk",
      category: "prefix",
      syntax: ".afk [reason]",
      userCommand: ".afk Coding new Next.js features",
      description: "Sets your AFK status and automatically replies with your note whenever someone mentions you in chat.",
      badge: "Dual-Engine",
      botResponse: {
        embedTitle: "💤 AFK Status Configured",
        embedColor: "#f59e0b",
        embedDesc: "You are now AFK: **Coding new Next.js features**.\nAnyone mentioning you will be politely notified.",
        footer: "Type any message in chat to remove AFK status."
      }
    },
    {
      name: "/247",
      category: "music",
      syntax: "/247 [toggle]",
      userCommand: "/247 toggle: ON",
      description: "Locks VePlexity Bot permanently inside your voice channel for uninterrupted 24/7 radio or lofi music.",
      badge: "Free 24/7",
      botResponse: {
        embedTitle: "🔁 24/7 Mode Enabled",
        embedColor: "#f97316",
        embedDesc: "VePlexity will remain connected to **#lofi-room** even when queue finishes or members disconnect.",
        fields: [
          { name: "Channel", value: "#lofi-room", inline: true },
          { name: "Auto-Reconnect", value: "Active (0ms delay)", inline: true }
        ],
        footer: "Lossless VOIP Streaming Nodes"
      }
    }
  ];

  const filteredCommands = commandSpecs.filter((cmd) => {
    const matchesCat = commandCategory === "all" || cmd.category === commandCategory;
    const matchesQuery = 
      cmd.name.toLowerCase().includes(commandSearch.toLowerCase()) ||
      cmd.syntax.toLowerCase().includes(commandSearch.toLowerCase()) ||
      cmd.description.toLowerCase().includes(commandSearch.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const activeCmd = commandSpecs[selectedCommandIdx] || commandSpecs[0];

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
      console.error("[VePlexitySelector] Error loading guilds:", err);
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

  const handleLaunchDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dashboardAudio.playClick();

    if (status !== "authenticated") {
      signIn("discord");
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      setZoomRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
      setZoomBot({
        name: "VePlexity Server Console",
        avatarUrl: "/bots/veplexity-avatar.png",
        tagline: "Launching Server Management Deck...",
        accentColor: "orange",
      });

      setTimeout(() => {
        setZoomRect(null);
        setZoomBot(null);
        const el = document.getElementById("server-console");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 480);
    }
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
      router.push(`/discord-bots/veplexity/${guild.id}`);
    }, 520);
  };

  const visibleGuilds = guilds.filter((g) => {
    const matchesSearch = g.name.toLowerCase().includes(serverSearch.toLowerCase());
    const isJoined = Boolean(g.bots?.veplexity);
    if (serverFilter === "active") return matchesSearch && isJoined;
    if (serverFilter === "uninvited") return matchesSearch && !isJoined;
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#07030a] text-zinc-100 flex flex-col font-sans selection:bg-rose-500/30 relative overflow-x-hidden">
      <Navbar />

      {/* Flight Canvas Transition into Specific Guild */}
      {flightRect && flightGuild && (
        <ServerFlightCanvas startRect={flightRect} guild={flightGuild} />
      )}

      {/* Zoom Reveal Overlay for Launch Dashboard */}
      {zoomRect && zoomBot && (
        <CardZoomRevealCanvas rect={zoomRect} bot={zoomBot} />
      )}

      {/* Ambient GTA 6 Sunset Glows */}
      <div className="fixed top-0 left-1/3 w-[600px] h-[600px] bg-gradient-to-br from-orange-600/15 via-rose-600/10 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed top-1/2 right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-fuchsia-600/15 via-purple-600/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-24 relative z-10">
        
        {/* ─── HERO INTRODUCTION SECTION ─────────────────────────────────── */}
        <section className="relative pt-4 pb-12 sm:pb-20 border-b border-zinc-800/80">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-8">
            <Link href="/discord-bot" className="hover:text-white transition-colors flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Discord Bots</span>
            </Link>
            <span>/</span>
            <span className="text-orange-400 font-bold">VePlexity Bot</span>
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12">
            
            {/* Left Column: Official Logo + Intro + Dual CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 space-y-6 text-center lg:text-left"
            >
              
              {/* Official Logo Header Lockup */}
              <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
                <div className="relative group">
                  <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-600 opacity-70 blur-xl group-hover:opacity-100 transition duration-500" />
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-2 border-orange-500/70 shadow-2xl bg-[#12081f] p-2 flex items-center justify-center">
                    <img 
                      src="/bots/veplexity-avatar.png" 
                      alt="VePlexity Official Logo" 
                      className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(249,115,22,0.6)] group-hover:scale-105 transition-transform"
                      onError={(e) => { e.currentTarget.src = "/vp-no-bg.png"; }}
                    />
                    <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#12081f]" title="24/7 Lossless Online" />
                  </div>
                </div>

                <div className="space-y-1.5 text-center sm:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-rose-500/20 border border-orange-500/40 text-orange-300 font-mono text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                    <span>VERIFIED DISCORD ALL-IN-ONE ENGINE</span>
                  </div>
                  <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
                    VEPLEXITY BOT
                  </h1>
                  <p className="text-xs font-mono text-zinc-400">
                    Application ID: <span className="text-zinc-200">1556640364448714752</span> • Version 2.0
                  </p>
                </div>
              </div>

              {/* Subtitle / Intro */}
              <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed font-normal">
                Elevate your Discord server with enterprise-grade community infrastructure. Featuring <strong>24/7 Lossless Audio DSP</strong>, <strong>Proactive AutoMod Defense</strong>, <strong>Google Gemini Multi-Modal AI</strong>, <strong>Custom XP Leveling Rank Cards</strong>, and <strong>Dynamic Temp Voice Hubs</strong> — 100% free with zero paywalls.
              </p>

              {/* Feature Highlights Pills */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-1">
                {[
                  "48kHz VOIP Lossless Audio",
                  "100% Free Moderation & Logs",
                  "Dual-Engine Rapid . / ? / ! Prefixes",
                  "XP Leveling & Rank Cards",
                  "Google Gemini 2.5 AI Assistant",
                  "Temp Join-to-Create Voice Hubs"
                ].map((pill, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300 font-semibold">
                    ✓ {pill}
                  </span>
                ))}
              </div>

              {/* Direct Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-3 justify-center lg:justify-start">
                <a
                  href="/invite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-600 hover:from-orange-400 hover:to-rose-500 text-white font-black text-sm tracking-wide uppercase transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-orange-500/25 active:scale-95 group"
                >
                  <DiscordLogo className="w-5 h-5" fill="#ffffff" />
                  <span>Add to Server</span>
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </a>

                <button
                  onClick={handleLaunchDashboardClick}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#140b20] hover:bg-[#1a0e2a] border border-orange-500/40 hover:border-orange-500/70 text-white font-black text-sm tracking-wide uppercase transition-all flex items-center justify-center gap-2.5 shadow-lg active:scale-95 cursor-pointer"
                >
                  <Server className="w-5 h-5 text-orange-400" />
                  <span>{status === "authenticated" ? "Launch Dashboard" : "Log In to Dashboard"}</span>
                  <ChevronRight className="w-4 h-4 text-orange-400" />
                </button>
              </div>

              {/* Legal Documents Direct Links */}
              <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 justify-center lg:justify-start pt-2">
                <Link href="/discord-bot/veplexity/terms" className="hover:text-orange-400 transition-colors underline flex items-center gap-1">
                  <span>Terms of Service</span>
                </Link>
                <span>•</span>
                <Link href="/discord-bot/veplexity/privacy" className="hover:text-orange-400 transition-colors underline flex items-center gap-1">
                  <span>Privacy Policy</span>
                </Link>
                <span>•</span>
                <a href="#command-console" className="hover:text-white transition-colors">
                  Interactive Command Visualizer ↓
                </a>
              </div>
            </motion.div>

            {/* Right Column: Hero Live Interactive Audio DSP Widget */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full lg:w-[460px] rounded-3xl bg-gradient-to-b from-[#180d26] to-[#0f0719] border border-orange-500/30 p-6 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange-300">
                    24/7 LOSSLESS VOIP DSP
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30 font-bold">
                  48kHz VOIP
                </span>
              </div>

              <div className="py-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/30 to-fuchsia-600/30 border border-orange-500/40 flex items-center justify-center text-orange-400 shrink-0">
                    <Music className={`w-8 h-8 ${isPlaying ? "animate-bounce" : ""}`} />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <p className="text-base font-bold text-white truncate">Synthwave Overdrive</p>
                    <p className="text-xs font-mono text-zinc-400">VePlexity DJ • 320kbps Master</p>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400">
                      <span>● 24/7 Voice Lock: ON</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-orange-500 to-rose-500" 
                      initial={{ width: "45%" }}
                      animate={{ width: isPlaying ? "72%" : "45%" }}
                      transition={{ duration: 1.5, repeat: isPlaying ? Infinity : 0, repeatType: "reverse" }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                    <span>2:18</span>
                    <span>3:45</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => {
                      dashboardAudio.playClick();
                      setIsPlaying(!isPlaying);
                    }}
                    className="p-3 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white shadow-lg shadow-orange-500/20 transition active:scale-95 flex items-center gap-2 text-xs font-bold"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                    <span>{isPlaying ? "Pause Stream" : "Play Stream"}</span>
                  </button>

                  <button
                    onClick={() => {
                      dashboardAudio.playClick();
                      setBassBoost(!bassBoost);
                    }}
                    className={`px-3.5 py-2.5 rounded-xl border text-xs font-mono font-bold transition flex items-center gap-1.5 ${
                      bassBoost
                        ? "bg-orange-500/20 border-orange-500/50 text-orange-300"
                        : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Bass Boost +12dB</span>
                  </button>
                </div>

                <div className="pt-2 flex items-center gap-3 bg-[#0c0614] p-3 rounded-xl border border-zinc-800">
                  <Volume2 className="w-4 h-4 text-orange-400 shrink-0" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-full accent-orange-500 h-1 bg-zinc-700 rounded-lg cursor-pointer"
                  />
                  <span className="text-xs font-mono text-zinc-300 w-8 text-right">{volume}%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── INTERACTIVE COMMAND CONSOLE & DISCORD BOT VISUALIZER ──────── */}
        <section id="command-console" className="space-y-6 pt-4 scroll-mt-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            className="text-center space-y-2 max-w-2xl mx-auto"
          >
            <span className="text-xs font-mono text-orange-400 font-bold uppercase tracking-wider">
              INTERACTIVE DISCORD SIMULATOR
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              COMMAND CONSOLE &amp; VISUALIZER
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Select any command from the sidebar below to render a live, high-fidelity visualization of VePlexity Bot executing inside Discord.
            </p>
          </motion.div>

          {/* Category Filter Pills with Reversible Scroll Animation */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto"
          >
            {[
              { id: "all", label: "All Commands" },
              { id: "music", label: "🎵 Lossless Audio" },
              { id: "moderation", label: "🛡️ AutoMod & Shield" },
              { id: "ai", label: "🤖 Gemini Multi-Modal" },
              { id: "xp", label: "🏆 XP Progression" },
              { id: "tempvc", label: "🎙️ Temp Voice Hub" },
              { id: "prefix", label: "⚡ Rapid Prefix (. / ?)" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  dashboardAudio.playClick();
                  setCommandCategory(cat.id);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  commandCategory === cat.id
                    ? "bg-gradient-to-r from-orange-500 to-rose-600 text-white shadow-md shadow-orange-500/20"
                    : "bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Workbench Grid: Left Scrollable Sidebar + Right Live Discord Chat Visualizer */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.55 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
          >
            
            {/* ── LEFT: SCROLLABLE COMMAND EXPLORER SIDEBAR ── */}
            <div className="lg:col-span-5 rounded-3xl bg-[#0e0717] border border-zinc-800/80 p-4 sm:p-5 flex flex-col space-y-4 shadow-xl max-h-[640px]">
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Filter commands (e.g. play, purge, gemini)..."
                  value={commandSearch}
                  onChange={(e) => setCommandSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/50"
                />
              </div>

              {/* Scrollable Command List */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {filteredCommands.length === 0 ? (
                  <p className="text-xs text-zinc-500 text-center py-8">No commands matching query.</p>
                ) : (
                  filteredCommands.map((cmd, idx) => {
                    const isSelected = activeCmd.name === cmd.name;
                    return (
                      <button
                        key={cmd.name}
                        onClick={() => {
                          dashboardAudio.playClick();
                          const originalIdx = commandSpecs.findIndex(c => c.name === cmd.name);
                          setSelectedCommandIdx(originalIdx >= 0 ? originalIdx : 0);
                        }}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between group cursor-pointer ${
                          isSelected
                            ? "bg-gradient-to-r from-orange-500/20 via-rose-500/15 to-transparent border-orange-500/70 shadow-md shadow-orange-500/10"
                            : "bg-[#0a0413] border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/40"
                        }`}
                      >
                        <div className="space-y-1 min-w-0 pr-2">
                          <div className="flex items-center gap-2">
                            <span className={`font-mono text-xs font-black truncate ${
                              isSelected ? "text-orange-400" : "text-white group-hover:text-orange-300"
                            }`}>
                              {cmd.name}
                            </span>
                            {cmd.badge && (
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-orange-500/15 border border-orange-500/30 text-orange-300 font-bold shrink-0">
                                {cmd.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-zinc-400 truncate font-normal">
                            {cmd.description}
                          </p>
                        </div>

                        <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                          isSelected ? "text-orange-400 translate-x-1" : "text-zinc-600 group-hover:text-zinc-400"
                        }`} />
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* ── RIGHT: LIVE DISCORD BOT SIMULATION STAGE ── */}
            <div className="lg:col-span-7 rounded-3xl bg-[#1e1f22] border border-zinc-700/60 shadow-2xl overflow-hidden flex flex-col font-sans">
              
              {/* Discord Channel Header Bar */}
              <div className="h-12 px-5 bg-[#2b2d31] border-b border-zinc-800 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 text-zinc-200">
                  <Hash className="w-5 h-5 text-zinc-400" />
                  <span className="font-bold text-xs">bot-commands</span>
                  <span className="text-zinc-500 text-xs hidden sm:inline">|</span>
                  <span className="text-[11px] text-zinc-400 font-mono hidden sm:inline">
                    Simulated VePlexity Sandbox Feed
                  </span>
                </div>
                <div className="flex items-center gap-3 text-zinc-400 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                    ● BOT ONLINE
                  </span>
                </div>
              </div>

              {/* Discord Chat Area */}
              <div className="p-5 sm:p-6 space-y-6 flex-1 min-h-[440px]">
                
                {/* 1. User Message (Trigger) */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-rose-500 p-0.5 shrink-0">
                    <div className="w-full h-full rounded-full bg-[#180a22] flex items-center justify-center font-bold text-xs text-white">
                      VM
                    </div>
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">Veer</span>
                      <span className="text-[10px] text-zinc-400">Today at 8:45 PM</span>
                    </div>
                    {/* User Command Bubble */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#2b2d31] border border-zinc-700 text-orange-300 font-mono text-xs">
                      <span>{activeCmd.userCommand}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Bot Response Message (Embed) */}
                <div className="flex items-start gap-3.5 pl-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-[#12081f] border border-orange-500/50 shrink-0 p-1">
                    <img 
                      src="/bots/veplexity-avatar.png" 
                      alt="VePlexity" 
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-white">VePlexity Bot</span>
                      <span className="text-[9px] px-1 py-0.2 rounded bg-[#5865F2] text-white font-bold font-mono">
                        APP
                      </span>
                      <span className="text-[10px] text-zinc-400">Today at 8:45 PM</span>
                    </div>

                    {/* Rich Discord Embed */}
                    <div 
                      className="rounded-lg bg-[#2b2d31] p-4 space-y-3 text-xs border-l-4 shadow-xl"
                      style={{ borderLeftColor: activeCmd.botResponse.embedColor }}
                    >
                      <h4 className="font-bold text-sm text-white">
                        {activeCmd.botResponse.embedTitle}
                      </h4>

                      <p className="text-zinc-200 leading-relaxed whitespace-pre-line text-xs font-normal">
                        {activeCmd.botResponse.embedDesc}
                      </p>

                      {/* Rank Card Visualization if /rank */}
                      {activeCmd.botResponse.rankCardData && (
                        <div className="p-4 rounded-xl bg-[#1e1f22] border border-zinc-700 space-y-2.5 my-2">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-mono text-orange-400 font-bold">LVL {activeCmd.botResponse.rankCardData.level}</span>
                            <span className="font-mono text-zinc-400">RANK #{activeCmd.botResponse.rankCardData.rank}</span>
                          </div>
                          <div className="h-2.5 w-full rounded-full bg-black/60 overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-orange-500 to-rose-500 w-[83%]" />
                          </div>
                          <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                            <span>{activeCmd.botResponse.rankCardData.currentXp} XP</span>
                            <span>{activeCmd.botResponse.rankCardData.nextXp} XP (83%)</span>
                          </div>
                        </div>
                      )}

                      {/* Embed Fields */}
                      {activeCmd.botResponse.fields && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 border-t border-zinc-700/60">
                          {activeCmd.botResponse.fields.map((field, i) => (
                            <div key={i} className="space-y-0.5">
                              <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase">
                                {field.name}
                              </span>
                              <p className="text-xs font-mono text-white font-semibold">
                                {field.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Simulated Interactive Button Components */}
                      {activeCmd.botResponse.buttons && (
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-700/60">
                          {activeCmd.botResponse.buttons.map((btnLabel, idx) => (
                            <button
                              key={idx}
                              onClick={() => dashboardAudio.playClick()}
                              className="px-3 py-1.5 rounded-md bg-[#383a40] hover:bg-[#474950] text-zinc-200 text-[11px] font-bold font-mono transition"
                            >
                              {btnLabel}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Embed Footer */}
                      {activeCmd.botResponse.footer && (
                        <div className="pt-2 text-[10px] font-mono text-zinc-400 border-t border-zinc-700/40">
                          {activeCmd.botResponse.footer}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Quick-Action Toolbar */}
              <div className="p-3 bg-[#2b2d31] border-t border-zinc-800 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400 text-[11px]">
                  Syntax: <code className="text-orange-300 font-bold">{activeCmd.syntax}</code>
                </span>

                <button
                  onClick={() => {
                    dashboardAudio.playClick();
                    navigator.clipboard.writeText(activeCmd.syntax);
                    setCopiedCmd(true);
                    setTimeout(() => setCopiedCmd(false), 2000);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-black/60 border border-zinc-700 text-zinc-300 hover:text-white flex items-center gap-1.5 text-xs font-bold"
                >
                  {copiedCmd ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Syntax</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ─── INTEGRATED SERVER MANAGEMENT CONSOLE ──────────────────────── */}
        <section id="server-console" className="space-y-6 pt-8 border-t border-zinc-800/80 scroll-mt-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            className="text-center space-y-2 max-w-2xl mx-auto"
          >
            <span className="text-xs font-mono text-orange-400 font-bold uppercase tracking-wider">
              SERVER MANAGEMENT CONSOLE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              LAUNCH YOUR SERVER DASHBOARD
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Select your Discord server below to configure 24/7 music settings, AutoMod rules, XP rewards, and bot roles with real-time sync.
            </p>
          </motion.div>

          {/* Unauthenticated View */}
          {status !== "authenticated" ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              className="max-w-xl mx-auto p-8 rounded-3xl bg-gradient-to-b from-[#140b20] to-[#0a0512] border border-orange-500/30 text-center space-y-6 shadow-2xl"
            >
              <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border-2 border-orange-500/40 flex items-center justify-center text-orange-400 mx-auto">
                <Server className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white uppercase">Connect Your Discord Account</h3>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Authenticate with Discord to view servers where you hold <strong>Manage Server</strong> or <strong>Administrator</strong> privileges.
                </p>
              </div>

              <button
                onClick={() => signIn("discord")}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-600 hover:from-orange-400 hover:to-rose-500 text-white font-black text-sm tracking-wide uppercase transition-all flex items-center justify-center gap-3 shadow-xl shadow-orange-500/25 active:scale-95 cursor-pointer"
              >
                <DiscordLogo className="w-5 h-5" fill="#ffffff" />
                <span>Log In with Discord</span>
              </button>

              <p className="text-[11px] font-mono text-zinc-500">
                VePlexity only reads your server list to identify managed guilds. We never request message history or payment permissions.
              </p>
            </motion.div>
          ) : (
            /* Authenticated Server Deck View */
            <div className="space-y-6 max-w-5xl mx-auto">
              {/* Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0f0718] border border-zinc-800">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search servers..."
                      value={serverSearch}
                      onChange={(e) => setServerSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-black border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/50"
                    />
                  </div>

                  <div className="flex gap-1 bg-black p-1 rounded-xl border border-zinc-800 text-xs">
                    {(["all", "active", "uninvited"] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setServerFilter(mode)}
                        className={`px-3 py-1 rounded-lg font-mono capitalize transition ${
                          serverFilter === mode ? "bg-orange-500 text-white font-bold" : "text-zinc-400 hover:text-white"
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
                  <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin mx-auto" />
                  <p className="text-xs font-mono text-zinc-400">Loading your Discord servers...</p>
                </div>
              ) : visibleGuilds.length === 0 ? (
                <div className="text-center py-12 p-8 rounded-2xl bg-[#0f0718] border border-zinc-800 space-y-2">
                  <p className="text-sm font-bold text-white">No servers matching criteria</p>
                  <p className="text-xs text-zinc-400">Ensure you have Manage Server permissions or clear your search query.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {visibleGuilds.map((guild) => {
                    const isJoined = Boolean(guild.bots?.veplexity);
                    return (
                      <div
                        key={guild.id}
                        className="p-5 rounded-2xl bg-[#0f0718] border border-zinc-800 hover:border-orange-500/40 transition flex flex-col justify-between space-y-4 shadow-lg group"
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
                            <h4 className="text-sm font-bold text-white truncate group-hover:text-orange-400 transition-colors">
                              {guild.name}
                            </h4>
                            <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
                              <span>ID: {guild.id.substring(0, 8)}...</span>
                              {guild.owner && <span className="text-orange-400 font-bold">Owner</span>}
                            </div>
                          </div>
                        </div>

                        {/* Action CTA with Zoom-in Flight Canvas */}
                        {isJoined ? (
                          <button
                            onClick={(e) => handleManageServerFlight(e, guild)}
                            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-400 hover:to-rose-500 text-white text-xs font-black transition flex items-center justify-between active:scale-95 shadow-md shadow-orange-500/20 cursor-pointer"
                          >
                            <span>LAUNCH DASHBOARD</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        ) : (
                          <a
                            href={`https://discord.com/api/oauth2/authorize?client_id=1556640364448714752&permissions=8&scope=bot%20applications.commands&guild_id=${guild.id}&disable_guild_select=true`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-black transition flex items-center justify-between active:scale-95"
                          >
                            <span>INVITE VEPLEXITY</span>
                            <Plus className="w-4 h-4 text-orange-400" />
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

        {/* ─── ENLISTED LEGAL ARCHITECTURE SECTION ───────────────────────── */}
        <section className="pt-10 border-t border-zinc-800/80 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            className="text-center space-y-2 max-w-xl mx-auto"
          >
            <span className="text-xs font-mono text-rose-400 font-bold uppercase tracking-wider">
              LEGAL &amp; COMPLIANCE DIRECTORY
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              ENLISTED LEGAL DOCUMENTS
            </h2>
            <p className="text-xs text-zinc-400">
              Complete transparent terms of service, privacy policies, and developer guidelines for VePlexity Bot.
            </p>
          </motion.div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#0e0717] border border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-orange-400" />
                <h4 className="text-base font-bold text-white uppercase">Official Terms of Service</h4>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                By adding VePlexity Bot to your Discord server or using its slash &amp; prefix commands, you agree to comply with Discord Developer Terms of Service and VePlexity acceptable use policies.
              </p>
              <Link
                href="/discord-bot/veplexity/terms"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-orange-400 hover:text-orange-300 transition-colors underline"
              >
                <span>Read Full Terms of Service</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-rose-400" />
                <h4 className="text-base font-bold text-white uppercase">Privacy &amp; Data Protection</h4>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                We never log message contents or personal user communications. Only guild IDs, channel routing pointers, and XP progression values are stored within encrypted database clusters.
              </p>
              <Link
                href="/discord-bot/veplexity/privacy"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-rose-400 hover:text-rose-300 transition-colors underline"
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
