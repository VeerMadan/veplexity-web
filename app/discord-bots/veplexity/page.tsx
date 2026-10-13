"use client";

import { useEffect, useState, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Server, Plus, RefreshCw, LogOut, CheckCircle2, ChevronRight, 
  Search, Shield, ArrowLeft, ExternalLink, Music, Award, Lock, 
  Users, Bot, Mic, Zap, Play, Pause, Volume2, Sparkles, Terminal,
  Sliders, MessageSquare, AlertTriangle, ShieldCheck, Heart, Radio,
  Copy, Check, Hash, Bell, User, Clock, AlertCircle, Send
} from "lucide-react";
import { DiscordLogo, DiscordVerifiedBadge, DiscordAppPill } from "@/app/components/BrandIcons";
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
    albumArt?: string;
    spotifyUrl?: string;
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

  // Live Typing & Sending Simulation State Machine
  const [simStep, setSimStep] = useState<"idle" | "typing" | "sent" | "bot_thinking" | "bot_responded">("bot_responded");
  const [typedInputText, setTypedInputText] = useState<string>("");
  const simTimeoutRef = useRef<NodeJS.Timeout[]>([]);

  const commandSpecs: CommandSpec[] = [
    {
      name: "/play",
      category: "music",
      syntax: "/play <query_or_url>",
      userCommand: "/play query: Aisi Tu - Tanvik x VeeRM",
      description: "Streams lossless audio directly into your current voice channel with hardware-accelerated 48kHz VOIP DSP.",
      badge: "48kHz Lossless",
      botResponse: {
        embedTitle: "🎵 Now Streaming in #music-lounge",
        embedColor: "#f97316",
        embedDesc: "**Track:** Aisi Tu\n**Artists:** Tanvik x VeeRM\n**Production & Mastering:** Veer Madan\n**Specs:** 320kbps Master • 48kHz Lossless VOIP DSP\n**Status:** 24/7 Channel Lock Active • Buffer: 0ms",
        albumArt: "/music/aisi-tu-cover.png",
        spotifyUrl: "https://open.spotify.com/search/Aisi%20Tu%20Tanvik",
        fields: [
          { name: "Requested By", value: "<@Veer>", inline: true },
          { name: "Producer", value: "Veer Madan", inline: true },
          { name: "Audio Engine", value: "48kHz Lossless VOIP", inline: true }
        ],
        footer: "VePlexity 48kHz Audio Engine • Stream 'Aisi Tu' Globally on Spotify",
        buttons: ["Pause ⏸️", "Skip ⏭️", "Loop 🔁", "🎧 Open on Spotify"]
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
        embedTitle: "🤖 Google Gemini 2.5 Intelligence",
        embedColor: "#a855f7",
        embedDesc: "**Quantum Computing Simplified:**\nThink of a normal computer bit like a light switch—it is either ON (1) or OFF (0). A quantum bit (qubit) is like a spinning coin that can be heads and tails at the same time (superposition).\n\nThis allows quantum computers to analyze billions of possibilities simultaneously rather than checking them one by one.",
        fields: [
          { name: "Model", value: "Gemini 2.5 Flash", inline: true },
          { name: "Tokens Processed", value: "318", inline: true },
          { name: "Context Retention", value: "Guild Active", inline: true }
        ],
        footer: "VePlexity Multi-Modal AI Interface • Google Deepmind Core"
      }
    },
    {
      name: "/rank",
      category: "xp",
      syntax: "/rank [user]",
      userCommand: "/rank user: @Veer",
      description: "Displays your personalized dynamic XP progression card, current server level, and global leaderboard standing.",
      badge: "XP Leveling",
      botResponse: {
        embedTitle: "🏆 Member Experience Card",
        embedColor: "#fbbf24",
        embedDesc: "Displaying progression stats for **Veer** in this server:",
        rankCardData: {
          level: 24,
          rank: 1,
          currentXp: 8420,
          nextXp: 10000
        },
        fields: [
          { name: "Voice Hours", value: "128h 45m", inline: true },
          { name: "Messages Sent", value: "4,192", inline: true },
          { name: "Multiplier", value: "1.5x Active", inline: true }
        ],
        footer: "Encrypted MongoDB XP Progression Matrix"
      }
    },
    {
      name: "/tempvc setup",
      category: "tempvc",
      syntax: "/tempvc setup <hub_channel>",
      userCommand: "/tempvc setup channel: ➕ Join to Create",
      description: "Deploys a zero-clutter dynamic voice system where clicking creates a private channel with custom user controls.",
      badge: "Dynamic VC",
      permissions: "Manage Channels",
      botResponse: {
        embedTitle: "🎙️ Dynamic Voice Hub Activated",
        embedColor: "#06b6d4",
        embedDesc: "Members joining **➕ Join to Create** will automatically receive an isolated private channel with rename, lock, and limit controls.",
        fields: [
          { name: "Parent Category", value: "Voice Lounges", inline: true },
          { name: "Auto-Deletion", value: "When Empty (0s)", inline: true }
        ],
        footer: "VePlexity Voice Dispatcher"
      }
    },
    {
      name: "/automod shield",
      category: "moderation",
      syntax: "/automod shield <level>",
      userCommand: "/automod shield level: Maximum",
      description: "Engages automated raid suppression, anti-invite filtering, and link screening with instant audit log dispatch.",
      badge: "Proactive Defense",
      permissions: "Administrator",
      botResponse: {
        embedTitle: "🛡️ AutoMod Fortress Shield: Engaged",
        embedColor: "#10b981",
        embedDesc: "Server protection matrix initialized at **MAXIMUM SECURITY**.\nAnti-Raid join throttling, discord.gg invite filters, and mass mention suppression are now operating in real-time.",
        fields: [
          { name: "Anti-Invite", value: "Strict Block", inline: true },
          { name: "Mass Mention", value: "Max 3 Pings", inline: true },
          { name: "Spam Throttling", value: "5 msgs / 3s", inline: true }
        ],
        footer: "VePlexity Security Sentinel • Zero Configuration Required"
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

  // Trigger simulated live typing -> sending -> bot thinking -> bot embed
  const runLiveCommandSimulation = (targetCmd: CommandSpec) => {
    // Clear any previous running simulation timeouts
    simTimeoutRef.current.forEach(clearTimeout);
    simTimeoutRef.current = [];

    setSimStep("typing");
    setTypedInputText("");

    const fullStr = targetCmd.userCommand;
    let curr = 0;

    const intervalId = setInterval(() => {
      curr++;
      setTypedInputText(fullStr.slice(0, curr));
      if (curr >= fullStr.length) {
        clearInterval(intervalId);
        // Step to 'sent'
        const t1 = setTimeout(() => {
          setSimStep("sent");
          setTypedInputText("");
          // Step to 'bot_thinking'
          const t2 = setTimeout(() => {
            setSimStep("bot_thinking");
            // Step to 'bot_responded'
            const t3 = setTimeout(() => {
              setSimStep("bot_responded");
            }, 500);
            simTimeoutRef.current.push(t3);
          }, 350);
          simTimeoutRef.current.push(t2);
        }, 220);
        simTimeoutRef.current.push(t1);
      }
    }, 20);
  };

  const handleSelectCommand = (idx: number) => {
    dashboardAudio.playClick();
    setSelectedCommandIdx(idx);
    runLiveCommandSimulation(commandSpecs[idx]);
  };

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
      const el = document.getElementById("server-management-deck");
      if (el) el.scrollIntoView({ behavior: "smooth" });
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

      {/* Atmospheric GTA 6 Sunset Ambient Hues */}
      <div className="fixed top-0 left-1/4 w-[700px] h-[700px] bg-gradient-to-br from-orange-600/10 via-rose-600/5 to-transparent rounded-full blur-[170px] pointer-events-none" />
      <div className="fixed top-1/2 right-1/4 w-[700px] h-[700px] bg-gradient-to-bl from-fuchsia-600/10 via-purple-600/5 to-transparent rounded-full blur-[170px] pointer-events-none" />

      {/* WIDESCREEN CONTAINER: Maximize space across the full display */}
      <main className="flex-1 w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 space-y-16 sm:space-y-20 relative z-10">
        
        {/* ─── HERO & TOP SERVER MANAGEMENT DECK (WIDESCREEN 2-COLUMN) ───────── */}
        <section className="relative pb-10 border-b border-white/[0.07]">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-6">
            <Link href="/discord-bot" className="hover:text-white transition-colors flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Discord Bots</span>
            </Link>
            <span>/</span>
            <span className="text-orange-400 font-bold">VePlexity Bot</span>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* LEFT COLUMN: BRAND LOCKUP + OVERVIEW (7 Cols on XL) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="xl:col-span-7 flex flex-col justify-between space-y-6"
            >
              {/* Official Unboxed Logo + Title */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                {/* Unboxed Crisp Logo with zero artificial container box */}
                <div className="relative shrink-0 flex items-center justify-center">
                  <img 
                    src="/bots/veplexity-avatar.png" 
                    alt="VePlexity Official Logo" 
                    className="w-24 h-24 sm:w-28 sm:h-28 object-contain filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform"
                    onError={(e) => { e.currentTarget.src = "/vp-no-bg.png"; }}
                  />
                </div>

                <div className="space-y-2 text-center sm:text-left">
                  <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-orange-300 font-bold uppercase tracking-wider backdrop-blur-md">
                      ALL-IN-ONE ENGINE • v2.0
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>24/7 Lossless Online</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-3 justify-center sm:justify-start flex-wrap">
                    <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-none">
                      VEPLEXITY BOT
                    </h1>
                    <DiscordVerifiedBadge className="w-6 h-6 shrink-0" />
                    <DiscordAppPill />
                  </div>

                  <p className="text-xs font-mono text-zinc-400">
                    Application ID: <span className="text-zinc-200">1556640364448714752</span> • Slash &amp; Dual Prefix (. / ? / !)
                  </p>
                </div>
              </div>

              {/* Subtitle / Overview */}
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                Enterprise community infrastructure engineered with zero compromises. Features hardware-accelerated <strong>24/7 Lossless VOIP Audio</strong>, <strong>Proactive AutoMod Shield</strong>, <strong>Google Gemini Multi-Modal AI</strong>, <strong>XP Leveling &amp; Rank Cards</strong>, and <strong>Dynamic Temp Voice Hubs</strong> — 100% free with no paywalls.
              </p>

              {/* Capability Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  "48kHz VOIP Lossless Audio DSP",
                  "100% Free Moderation & Audit Logs",
                  "Google Gemini 2.5 Multi-Modal AI",
                  "XP Leveling & Rank Cards",
                  "Temp Join-to-Create Voice Hubs",
                  "Reaction Role Embed Menus"
                ].map((pill, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-zinc-300 font-semibold shadow-sm">
                    ✓ {pill}
                  </span>
                ))}
              </div>

              {/* Action Buttons & Legal Links */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <a
                  href="/invite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/[0.12] hover:bg-white/[0.18] border border-white/20 hover:border-white/35 text-white font-black text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_10px_25px_rgba(0,0,0,0.4)] backdrop-blur-xl active:scale-95"
                >
                  <DiscordLogo className="w-4 h-4" fill="#ffffff" />
                  <span>Add to Server</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                </a>

                <a
                  href="#command-console"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-transparent hover:bg-white/[0.05] border border-white/10 text-zinc-300 hover:text-white font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 backdrop-blur-xl"
                >
                  <span>Interactive Command Simulator ↓</span>
                </a>
              </div>

              {/* Legal Links Bar */}
              <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 pt-1">
                <Link href="/discord-bot/veplexity/terms" className="hover:text-orange-400 transition-colors underline">
                  Terms of Service
                </Link>
                <span>•</span>
                <Link href="/discord-bot/veplexity/privacy" className="hover:text-orange-400 transition-colors underline">
                  Privacy Policy
                </Link>
                <span>•</span>
                <span className="text-zinc-500">100+ Free Slash &amp; Prefix Commands</span>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: PROMINENT TOP SERVER LAUNCHER DECK (5 Cols on XL) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              id="server-management-deck"
              className="xl:col-span-5 rounded-3xl bg-[#0e0717]/85 border border-white/[0.08] p-6 sm:p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl flex flex-col justify-between space-y-5"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
                <div className="flex items-center gap-2.5">
                  <Server className="w-5 h-5 text-orange-400" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    SERVER MANAGEMENT CONSOLE
                  </span>
                </div>
                {status === "authenticated" && (
                  <button
                    onClick={() => signOut()}
                    className="text-[11px] font-mono text-zinc-400 hover:text-rose-400 transition flex items-center gap-1"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>Sign Out</span>
                  </button>
                )}
              </div>

              {/* Body: Authenticated vs Unauthenticated */}
              {status !== "authenticated" ? (
                <div className="space-y-4 py-2">
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                    Log in with Discord to view servers where you hold <strong>Manage Server</strong> or <strong>Administrator</strong> privileges and launch real-time config dashboards.
                  </p>

                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1.5 text-xs font-mono text-zinc-400">
                    <p className="text-white font-bold">⚡ What you can configure:</p>
                    <p>• 24/7 Lossless voice channel lock &amp; volume presets</p>
                    <p>• AutoMod shield raid thresholds &amp; link rules</p>
                    <p>• Custom XP leveling rate &amp; role rewards</p>
                  </div>

                  <button
                    onClick={() => signIn("discord")}
                    className="w-full py-3.5 px-5 rounded-xl bg-white/[0.12] hover:bg-white/[0.18] border border-white/20 text-white font-bold text-xs tracking-wider uppercase transition flex items-center justify-center gap-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_20px_rgba(0,0,0,0.35)] backdrop-blur-xl active:scale-95 cursor-pointer"
                  >
                    <DiscordLogo className="w-4 h-4" fill="#ffffff" />
                    <span>Log In with Discord &amp; Launch</span>
                  </button>

                  <p className="text-[10px] font-mono text-zinc-500 text-center">
                    Read-only server permissions • Zero private message access
                  </p>
                </div>
              ) : (
                /* Authenticated Server Selector inside Top Deck */
                <div className="space-y-3.5 flex-1 flex flex-col justify-between">
                  {/* Search & Filter Bar */}
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Search your servers..."
                        value={serverSearch}
                        onChange={(e) => setServerSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/50"
                      />
                    </div>

                    <button
                      onClick={() => fetchGuilds(false)}
                      disabled={isRefreshing}
                      className="p-2 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-300 hover:text-white transition disabled:opacity-50"
                      title="Refresh Servers"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
                    </button>
                  </div>

                  {/* Servers List View */}
                  <div className="max-h-56 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                    {loadingGuilds ? (
                      <div className="text-center py-8 space-y-2">
                        <div className="w-6 h-6 rounded-full border-2 border-orange-500 border-t-transparent animate-spin mx-auto" />
                        <p className="text-[11px] font-mono text-zinc-400">Loading Discord servers...</p>
                      </div>
                    ) : visibleGuilds.length === 0 ? (
                      <p className="text-xs text-zinc-500 text-center py-6">No managed servers found.</p>
                    ) : (
                      visibleGuilds.map((guild) => {
                        const isJoined = Boolean(guild.bots?.veplexity);
                        return (
                          <div
                            key={guild.id}
                            className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-orange-500/30 transition flex items-center justify-between gap-3 group"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-white/10 overflow-hidden flex items-center justify-center font-bold text-xs text-zinc-400 shrink-0">
                                {guild.iconUrl ? (
                                  <img src={guild.iconUrl} alt={guild.name} className="w-full h-full object-cover" />
                                ) : (
                                  guild.name.substring(0, 2).toUpperCase()
                                )}
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-white truncate group-hover:text-orange-400 transition-colors">
                                  {guild.name}
                                </p>
                                <p className="text-[10px] font-mono text-zinc-500">
                                  {isJoined ? "● VePlexity Active" : "Not Invited"}
                                </p>
                              </div>
                            </div>

                            {isJoined ? (
                              <button
                                onClick={(e) => handleManageServerFlight(e, guild)}
                                className="px-3 py-1.5 rounded-lg bg-white/[0.12] hover:bg-white/[0.2] border border-white/20 text-white font-bold text-[11px] transition flex items-center gap-1 shrink-0 cursor-pointer active:scale-95"
                              >
                                <span>Dashboard</span>
                                <ChevronRight className="w-3.5 h-3.5 text-orange-400" />
                              </button>
                            ) : (
                              <a
                                href={`https://discord.com/api/oauth2/authorize?client_id=1556640364448714752&permissions=8&scope=bot%20applications.commands&guild_id=${guild.id}&disable_guild_select=true`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/40 text-orange-300 font-bold text-[11px] transition flex items-center gap-1 shrink-0"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Invite</span>
                              </a>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>

                  <p className="text-[10px] font-mono text-zinc-500 text-center">
                    Select a server to open dedicated 24/7 music &amp; automod configuration
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* ─── INTERACTIVE LIVE TYPING COMMAND VISUALIZER ───────────────────── */}
        <section id="command-console" className="space-y-6 pt-2 scroll-mt-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            className="text-center space-y-2 max-w-2xl mx-auto"
          >
            <span className="text-xs font-mono text-orange-400 font-bold uppercase tracking-wider">
              HIGH-FIDELITY DISCORD SIMULATOR
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              LIVE COMMAND VISUALIZER
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Select any command to watch simulated live character typing, Discord message dispatch, bot thinking states, and rich responses.
            </p>
          </motion.div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {[
              { id: "all", label: "All Commands" },
              { id: "music", label: "🎵 Lossless Audio" },
              { id: "moderation", label: "🛡️ AutoMod Defense" },
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
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  commandCategory === cat.id
                    ? "bg-white/15 border border-white/25 text-white shadow-sm"
                    : "bg-white/[0.04] border border-white/[0.08] text-zinc-400 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Workbench Grid: Left Command Selector + Right Live Discord Chat Visualizer */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.45 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
          >
            
            {/* ── LEFT: SCROLLABLE COMMAND LIST (4 Cols) ── */}
            <div className="lg:col-span-4 rounded-3xl bg-[#0e0717]/85 border border-white/[0.08] p-4 sm:p-5 flex flex-col space-y-3.5 shadow-xl backdrop-blur-2xl max-h-[620px]">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Filter commands (play, purge, gemini)..."
                  value={commandSearch}
                  onChange={(e) => setCommandSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/50"
                />
              </div>

              {/* Command Items */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {filteredCommands.length === 0 ? (
                  <p className="text-xs text-zinc-500 text-center py-8">No commands matching query.</p>
                ) : (
                  filteredCommands.map((cmd) => {
                    const isSelected = activeCmd.name === cmd.name;
                    return (
                      <button
                        key={cmd.name}
                        onClick={() => {
                          const originalIdx = commandSpecs.findIndex(c => c.name === cmd.name);
                          handleSelectCommand(originalIdx >= 0 ? originalIdx : 0);
                        }}
                        className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between group cursor-pointer ${
                          isSelected
                            ? "bg-white/[0.10] border-white/25 shadow-sm"
                            : "bg-white/[0.03] border-white/[0.06] hover:border-white/15 hover:bg-white/[0.05]"
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
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/[0.06] border border-white/10 text-zinc-300 font-bold shrink-0">
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

            {/* ── RIGHT: LIVE DISCORD CHAT SCREEN WITH LIVE TYPING (8 Cols) ── */}
            <div className="lg:col-span-8 rounded-3xl bg-[#1e1f22] border border-zinc-700/60 shadow-2xl overflow-hidden flex flex-col font-sans">
              
              {/* Discord Channel Header Bar */}
              <div className="h-12 px-5 bg-[#2b2d31] border-b border-zinc-800 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 text-zinc-200">
                  <Hash className="w-5 h-5 text-zinc-400" />
                  <span className="font-bold text-xs">bot-commands</span>
                  <span className="text-zinc-500 text-xs hidden sm:inline">|</span>
                  <span className="text-[11px] text-zinc-400 font-mono hidden sm:inline">
                    Simulated VePlexity Sandbox Channel
                  </span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                    ● BOT ONLINE
                  </span>
                </div>
              </div>

              {/* Discord Chat Area */}
              <div className="p-5 sm:p-6 space-y-6 flex-1 min-h-[460px] bg-[#313338]/40">
                
                {/* 1. User Message (Trigger) */}
                {simStep !== "typing" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-3.5"
                  >
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
                  </motion.div>
                )}

                {/* 2. Bot Thinking Indicator (Animated Typing Dots) */}
                {simStep === "bot_thinking" && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3 pl-2 text-xs text-zinc-400 font-mono"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-[#12081f] p-1 shrink-0">
                      <img src="/bots/veplexity-avatar.png" alt="VePlexity" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-[11px]">VePlexity Bot is thinking</span>
                      <div className="flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 3. Bot Response Message (Embed Pop-in) */}
                {simStep === "bot_responded" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-start gap-3.5 pl-2"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-[#12081f] border border-orange-500/50 shrink-0 p-1">
                      <img 
                        src="/bots/veplexity-avatar.png" 
                        alt="VePlexity" 
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black text-white">VePlexity Bot</span>
                        <DiscordVerifiedBadge className="w-3.5 h-3.5" />
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
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1.5 flex-1 min-w-0">
                            <h4 className="font-bold text-sm text-white">
                              {activeCmd.botResponse.embedTitle}
                            </h4>

                            <p className="text-zinc-200 leading-relaxed whitespace-pre-line text-xs font-normal">
                              {activeCmd.botResponse.embedDesc}
                            </p>
                          </div>

                          {/* SPECIAL SHOWCASE: "Aisi Tu" Official Cover Art Thumbnail for /play */}
                          {activeCmd.botResponse.albumArt && (
                            <div className="shrink-0 space-y-1.5 text-center">
                              <img 
                                src={activeCmd.botResponse.albumArt} 
                                alt="Aisi Tu Cover Art - Tanvik x VeeRM" 
                                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shadow-2xl border border-white/15"
                              />
                              <span className="block text-[9px] font-mono text-zinc-400 font-bold uppercase">
                                Tanvik x VeeRM
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Rank Card Visualization if /rank */}
                        {activeCmd.botResponse.rankCardData && (
                          <div className="p-4 rounded-xl bg-[#1e1f22] border border-zinc-700 space-y-2.5 my-2">
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-mono text-orange-400 font-bold">LVL {activeCmd.botResponse.rankCardData.level}</span>
                              <span className="font-mono text-zinc-400">RANK #{activeCmd.botResponse.rankCardData.rank}</span>
                            </div>
                            <div className="h-2.5 w-full rounded-full bg-black/60 overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-orange-500 to-rose-500 w-[84%]" />
                            </div>
                            <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                              <span>{activeCmd.botResponse.rankCardData.currentXp} XP</span>
                              <span>{activeCmd.botResponse.rankCardData.nextXp} XP (84%)</span>
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
                            {activeCmd.botResponse.buttons.map((btnLabel, idx) => {
                              const isSpotifyBtn = btnLabel.includes("Spotify");
                              if (isSpotifyBtn && activeCmd.botResponse.spotifyUrl) {
                                return (
                                  <a
                                    key={idx}
                                    href={activeCmd.botResponse.spotifyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1.5 rounded-md bg-[#1DB954] hover:bg-[#1ed760] text-black text-[11px] font-bold font-mono transition flex items-center gap-1 shadow-sm"
                                  >
                                    <span>{btnLabel}</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                );
                              }
                              return (
                                <button
                                  key={idx}
                                  onClick={() => dashboardAudio.playClick()}
                                  className="px-3 py-1.5 rounded-md bg-[#383a40] hover:bg-[#474950] text-zinc-200 text-[11px] font-bold font-mono transition cursor-pointer"
                                >
                                  {btnLabel}
                                </button>
                              );
                            })}
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
                  </motion.div>
                )}
              </div>

              {/* Bottom Simulated Discord Input Bar (Renders Live Character Typing) */}
              <div className="p-3.5 bg-[#2b2d31] border-t border-zinc-800 flex items-center gap-3">
                <div className="flex-1 h-10 px-4 rounded-lg bg-[#383a40] flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1 text-zinc-200 min-w-0">
                    {simStep === "typing" ? (
                      <>
                        <span className="text-white font-bold">{typedInputText}</span>
                        <span className="w-1.5 h-4 bg-orange-400 animate-pulse inline-block" />
                      </>
                    ) : (
                      <span className="text-zinc-500">Message #bot-commands</span>
                    )}
                  </div>

                  <button
                    onClick={() => runLiveCommandSimulation(activeCmd)}
                    className="text-zinc-400 hover:text-white transition flex items-center gap-1 text-[11px] font-bold"
                    title="Re-run Live Typing"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    dashboardAudio.playClick();
                    navigator.clipboard.writeText(activeCmd.syntax);
                    setCopiedCmd(true);
                    setTimeout(() => setCopiedCmd(false), 2000);
                  }}
                  className="px-3 py-2 rounded-lg bg-black/60 border border-zinc-700 text-zinc-300 hover:text-white flex items-center gap-1.5 text-xs font-bold shrink-0 font-mono"
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

        {/* ─── ENLISTED LEGAL DOCUMENTS DIRECTORY ─────────────────────────── */}
        <section className="pt-8 border-t border-white/[0.07] space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            className="text-center space-y-2 max-w-xl mx-auto"
          >
            <span className="text-xs font-mono text-orange-400 font-bold uppercase tracking-wider">
              LEGAL &amp; COMPLIANCE POLICIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              TERMS &amp; PRIVACY COMPLIANCE
            </h2>
            <p className="text-xs text-zinc-400">
              Complete transparent legal documents directly codified for VePlexity Bot operations.
            </p>
          </motion.div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#0e0717]/85 border border-white/[0.08] grid grid-cols-1 md:grid-cols-2 gap-8 backdrop-blur-2xl">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-orange-400" />
                <h4 className="text-base font-bold text-white uppercase">Terms of Service</h4>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                By adding VePlexity Bot to your Discord server or invoking its slash &amp; prefix commands, you agree to comply with Discord Developer Terms of Service and acceptable audio streaming rules. Lossless VOIP DSP nodes are reserved for non-abusive community voice channels.
              </p>
              <div className="space-y-1 text-xs font-mono text-zinc-400">
                <p>• Zero commercial resale of bot privileges</p>
                <p>• Respect for fair-use streaming rate limits</p>
                <p>• Administrator discretion on channel moderation commands</p>
              </div>
              <Link
                href="/discord-bot/veplexity/terms"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-orange-400 hover:text-orange-300 transition-colors underline pt-1"
              >
                <span>Read Full Terms of Service</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-rose-400" />
                <h4 className="text-base font-bold text-white uppercase">Privacy Policy</h4>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                We strictly adhere to privacy-by-design principles. VePlexity Bot never logs private chat messages, voice transcripts, or user passwords. Only guild configuration IDs, custom role pointers, and encrypted XP leveling points are retained in MongoDB Atlas clusters.
              </p>
              <div className="space-y-1 text-xs font-mono text-zinc-400">
                <p>• Zero private message storage or harvesting</p>
                <p>• Ephemeral Google Gemini 2.5 context handling</p>
                <p>• Complete right to data erasure upon bot removal</p>
              </div>
              <Link
                href="/discord-bot/veplexity/privacy"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-rose-400 hover:text-rose-300 transition-colors underline pt-1"
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
