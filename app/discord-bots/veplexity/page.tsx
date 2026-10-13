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
  Sliders, MessageSquare, AlertTriangle, ShieldCheck, Heart, Radio
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
  category: "music" | "moderation" | "ai" | "xp" | "prefix" | "fun" | "utility";
  syntax: string;
  description: string;
  permissions?: string;
  badge?: string;
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
  const [flightRect, setFlightRect] = useState<FlightRect | null>(null);
  const [flightGuild, setFlightGuild] = useState<FlightGuildData | null>(null);

  // Interactive Demo States
  const [activeTab, setActiveTab] = useState<"music" | "automod" | "xp" | "ai" | "tempvc">("music");
  const [isPlaying, setIsPlaying] = useState(true);
  const [bassBoost, setBassBoost] = useState(true);
  const [volume, setVolume] = useState(85);
  const [rankTheme, setRankTheme] = useState<"sunset" | "neon" | "cyber">("sunset");
  const [aiPrompt, setAiPrompt] = useState("Explain quantum computing in simple terms.");
  const [aiResponse, setAiResponse] = useState("Quantum computers leverage qubits that exist in multiple states simultaneously (superposition), allowing exponential calculation speed for complex modeling, cryptography, and molecular simulation.");
  const [autoModFilters, setAutoModFilters] = useState({
    antiSpam: true,
    phishingShield: true,
    inviteBlocker: true,
    massMention: true,
    autoPurgeAlert: true,
  });

  // Commands Directory Filter & Search
  const [commandSearch, setCommandSearch] = useState("");
  const [commandCategory, setCommandCategory] = useState<string>("all");

  const commandsList: CommandItem[] = [
    // Music
    { name: "/play", category: "music", syntax: "/play <query_or_url>", description: "Streams lossless audio instantly into your current voice channel with auto-queue.", badge: "48kHz DSP" },
    { name: "/skip", category: "music", syntax: "/skip [to_position]", description: "Vote skip or instantly bypass the active audio track.", badge: "Lossless" },
    { name: "/queue", category: "music", syntax: "/queue [page]", description: "Displays dynamic playlist queue with track durations and requested-by tags." },
    { name: "/volume", category: "music", syntax: "/volume <1-100>", description: "Adjusts playback master volume without audio clipping." },
    { name: "/247", category: "music", syntax: "/247 [toggle]", description: "Locks bot inside voice channel for 24/7 non-stop music streaming.", badge: "Free 24/7" },
    { name: "/lyrics", category: "music", syntax: "/lyrics [song_name]", description: "Fetches live synced lyrics for the currently playing track." },
    { name: "/pause", category: "music", syntax: "/pause", description: "Temporarily halts playback while keeping voice channel session open." },
    { name: "/resume", category: "music", syntax: "/resume", description: "Resumes audio playback exactly where it was paused." },
    { name: "/bassboost", category: "music", syntax: "/bassboost <level>", description: "Applies hardware-accelerated DSP low-frequency filter." },

    // Moderation
    { name: "/ban", category: "moderation", syntax: "/ban <user> [reason] [purge_days]", description: "Bans a member, purges previous message history, and creates an audit record.", permissions: "Ban Members" },
    { name: "/kick", category: "moderation", syntax: "/kick <user> [reason]", description: "Removes a member from the server with indexed case logging.", permissions: "Kick Members" },
    { name: "/timeout", category: "moderation", syntax: "/timeout <user> <duration> [reason]", description: "Applies Discord native communication timeout with precision duration.", permissions: "Moderate Members" },
    { name: "/warn", category: "moderation", syntax: "/warn <user> <reason>", description: "Issues an official logged warning that contributes to auto-escalation strikes.", permissions: "Manage Messages" },
    { name: "/warnings", category: "moderation", syntax: "/warnings <user>", description: "Queries full infraction and warning strike history for a user." },
    { name: "/clearwarns", category: "moderation", syntax: "/clearwarns <user>", description: "Wipes warning history for rehabilitated server members.", permissions: "Administrator" },
    { name: "/lock", category: "moderation", syntax: "/lock [channel]", description: "Locks public send permissions during raids or severe emergencies.", permissions: "Manage Channels" },
    { name: "/unlock", category: "moderation", syntax: "/unlock [channel]", description: "Restores normal messaging permissions to locked channels.", permissions: "Manage Channels" },
    { name: "/purge", category: "moderation", syntax: "/purge <amount>", description: "Mass deletes 1-100 messages with 5-second auto-clearing audit response.", permissions: "Manage Messages" },
    { name: "/modlogs", category: "moderation", syntax: "/modlogs setup <channel>", description: "Configures real-time security audit log feed with case numbers.", permissions: "Administrator" },

    // AI
    { name: "/gemini ask", category: "ai", syntax: "/gemini ask <prompt>", description: "Queries Google Gemini multi-modal conversational intelligence with contextual reasoning.", badge: "Gemini 2.5" },
    { name: "/gemini persona", category: "ai", syntax: "/gemini persona <persona_name>", description: "Customizes bot AI response behavior, style, and tone for your server.", badge: "Custom Tone" },
    { name: "/gemini reset", category: "ai", syntax: "/gemini reset", description: "Clears conversation memory and resets context cache for a fresh session." },
    { name: "/imagine", category: "ai", syntax: "/imagine <prompt>", description: "Generates creative AI text narratives, prompt ideas, or multi-modal suggestions." },

    // XP
    { name: "/rank", category: "xp", syntax: "/rank [user]", description: "Generates custom visual XP rank card displaying level, tier, and server leaderboard position.", badge: "Rich Card" },
    { name: "/leaderboard", category: "xp", syntax: "/leaderboard [page]", description: "Displays server-wide XP hierarchy with Top 10 badges and rankings." },
    { name: "/balance", category: "xp", syntax: "/balance [user]", description: "Shows virtual server currency balance and economic rating." },
    { name: "/daily", category: "xp", syntax: "/daily", description: "Claims daily streak bonus reward with multiplier progression." },
    { name: "/work", category: "xp", syntax: "/work", description: "Performs mini-tasks to earn server activity currency." },

    // Prefix Aliases
    { name: ".purge", category: "prefix", syntax: ".purge <1-100>", description: "Instant rapid-fire message purge with 5s auto-deleting confirmation embed.", badge: "Dual-Engine" },
    { name: ".afk", category: "prefix", syntax: ".afk [reason]", description: "Sets AFK status and auto-notifies anyone who mentions you with your note.", badge: "Dual-Engine" },
    { name: ".bal", category: "prefix", syntax: ".bal", description: "Instant quick-typing alias for wallet and activity balance.", badge: "Dual-Engine" },
    { name: ".p", category: "prefix", syntax: ".p <song>", description: "Ultra-fast alias for /play without waiting for slash command autocomplete.", badge: "Dual-Engine" },
    { name: ".np", category: "prefix", syntax: ".np", description: "Quickly displays currently playing track progress and sound metadata.", badge: "Dual-Engine" },
    { name: ".q", category: "prefix", syntax: ".q", description: "Quick-fire alias for audio queue inspection.", badge: "Dual-Engine" },
    { name: ".vol", category: "prefix", syntax: ".vol <1-100>", description: "Fast-adjust playback volume directly in chat.", badge: "Dual-Engine" },

    // Utility & Fun
    { name: "/setup", category: "utility", syntax: "/setup", description: "Interactive guided onboarding wizard to configure welcome channels, logs, and roles." },
    { name: "/reactionrole", category: "utility", syntax: "/reactionrole create", description: "Builds rich interactive button and dropdown menus for self-assignable roles." },
    { name: "/tempvc", category: "utility", syntax: "/tempvc setup", description: "Spawns dynamic join-to-create temporary voice channel hub with user controls." },
    { name: "/hug", category: "fun", syntax: "/hug <user>", description: "Sends animated social roleplay action with cute gif embed." },
    { name: "/kiss", category: "fun", syntax: "/kiss <user>", description: "Sends wholesome roleplay reaction to a server friend." },
    { name: "/bonk", category: "fun", syntax: "/bonk <user>", description: "Playful moderation roleplay bonk with sound fx and gif." },
    { name: "/tictactoe", category: "fun", syntax: "/tictactoe <opponent>", description: "Interactive 3x3 button-based game inside Discord message component." },
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
            if (found?.bots?.veplexity) {
              clearInterval(interval);
              setPendingGuildId(null);
              setToast(`VePlexity Bot connected to ${guildName}!`);
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
    <div className="min-h-screen bg-[#0a0512] text-zinc-100 flex flex-col font-sans selection:bg-rose-500/30 relative">
      <Navbar />

      {/* Flight Canvas Transition */}
      {flightRect && flightGuild && (
        <ServerFlightCanvas startRect={flightRect} guild={flightGuild} />
      )}

      {/* Global Toast */}
      {toast && (
        <div className="fixed top-24 right-6 z-50 px-4 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-600 text-white font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20 relative z-10">
        
        {/* HERO SECTION */}
        <section className="relative pt-6 pb-12 sm:pb-20 border-b border-zinc-800/80">
          <div className="absolute -top-10 left-1/3 w-[500px] h-[500px] bg-gradient-to-br from-orange-600/20 via-rose-600/15 to-transparent rounded-full blur-[140px] pointer-events-none" />

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-8">
            <Link href="/discord-bot" className="hover:text-white transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Discord Bots</span>
            </Link>
            <span>/</span>
            <span className="text-orange-400 font-bold">VePlexity Bot</span>
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12">
            
            {/* Left Column: Avatar + Pitch + Direct CTAs */}
            <div className="flex-1 space-y-6 text-center lg:text-left">
              
              {/* Badge + PFP Header Lockup */}
              <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
                <div className="relative group">
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-600 opacity-75 blur group-hover:opacity-100 transition duration-500" />
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-2 border-orange-500/60 shadow-2xl bg-[#140b20]">
                    <img 
                      src="/bots/veplexity-avatar.png" 
                      alt="VePlexity Bot Official Avatar" 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "/vp-no-bg.png";
                      }}
                    />
                    <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#120a1d]" title="Online 24/7" />
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
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-600 hover:from-orange-400 hover:to-rose-500 text-white font-black text-sm tracking-wide uppercase transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-orange-500/25 active:scale-98 group"
                >
                  <DiscordLogo className="w-5 h-5" fill="#ffffff" />
                  <span>Add to Server</span>
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </a>

                <button
                  onClick={handleLaunchDashboardClick}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#140b20] hover:bg-[#1a0e2a] border border-orange-500/30 hover:border-orange-500/60 text-white font-black text-sm tracking-wide uppercase transition-all flex items-center justify-center gap-2.5 shadow-lg active:scale-98"
                >
                  <Server className="w-5 h-5 text-orange-400" />
                  <span>{status === "authenticated" ? "Manage Servers" : "Launch Dashboard"}</span>
                  <ChevronRight className="w-4 h-4 text-orange-400" />
                </button>
              </div>

              {/* Legal Links Bar */}
              <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 justify-center lg:justify-start pt-2">
                <Link href="/discord-bot/veplexity/terms" className="hover:text-orange-400 transition-colors underline flex items-center gap-1">
                  <span>Terms of Service</span>
                </Link>
                <span>•</span>
                <Link href="/discord-bot/veplexity/privacy" className="hover:text-orange-400 transition-colors underline flex items-center gap-1">
                  <span>Privacy Policy</span>
                </Link>
                <span>•</span>
                <a href="#commands" className="hover:text-white transition-colors">
                  100 Commands Directory ↓
                </a>
              </div>
            </div>

            {/* Right Column: Hero Live Interactive Audio DSP Widget */}
            <div className="w-full lg:w-[460px] rounded-3xl bg-gradient-to-b from-[#180d26] to-[#0f0719] border border-orange-500/30 p-6 shadow-2xl relative overflow-hidden">
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

              {/* Track Info */}
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

                {/* Progress Bar */}
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

                {/* Controls */}
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

                {/* Volume Slider */}
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
            </div>
          </div>
        </section>

        {/* INTERACTIVE FEATURE SHOWCASES */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-orange-400 font-bold uppercase tracking-wider">
              ENTERPRISE DISCORD SUITE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              INTERACTIVE MODULE SIMULATORS
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
              Test drive the core engines powering VePlexity Bot across community audio, automated security defense, XP leveling, and Google Gemini AI.
            </p>
          </div>

          {/* Module Switcher Tabs */}
          <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-[#0e0717] border border-zinc-800 rounded-2xl max-w-2xl mx-auto">
            {[
              { id: "music", label: "🎵 Audio DJ Engine" },
              { id: "automod", label: "🛡️ AutoMod Defense" },
              { id: "xp", label: "🏆 XP Rank Cards" },
              { id: "ai", label: "🤖 Gemini Multi-Modal AI" },
              { id: "tempvc", label: "🎙️ Temp Voice Hubs" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  dashboardAudio.playClick();
                  setActiveTab(tab.id as any);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-md shadow-orange-500/20"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Showcase Display Box */}
          <div className="rounded-3xl bg-[#0f0718] border border-zinc-800/80 p-6 sm:p-10 relative overflow-hidden min-h-[380px] flex items-center justify-center">
            
            {/* Tab 1: Music DJ */}
            {activeTab === "music" && (
              <div className="w-full max-w-3xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4">
                    <span className="text-xs font-mono text-rose-400 font-bold uppercase">MODULE 01 // 24/7 LOSSLESS VOIP</span>
                    <h3 className="text-2xl font-black text-white uppercase">48kHz Audio DSP Engine</h3>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      Zero buffering, high-fidelity audio engine engineered with hardware-accelerated FFmpeg decoding and voice channel persistence. Never get kicked due to idle timeouts.
                    </p>
                    <ul className="space-y-2 text-xs font-mono text-zinc-300">
                      <li className="flex items-center gap-2">✓ Permanent 24/7 Channel Retention</li>
                      <li className="flex items-center gap-2">✓ Dynamic Queue Loop &amp; Shuffle</li>
                      <li className="flex items-center gap-2">✓ Rapid-fire prefix aliases: <code>.p</code>, <code>.np</code>, <code>.q</code>, <code>.vol</code></li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#140b20] border border-orange-500/30 space-y-4">
                    <div className="text-xs font-mono text-zinc-400 flex justify-between">
                      <span>SIMULATED CHAT EXECUTION</span>
                      <span className="text-emerald-400">2ms latency</span>
                    </div>
                    <div className="p-3 rounded-xl bg-black/60 border border-zinc-800 font-mono text-xs text-orange-300">
                      &gt; /play query: Synthwave Sunset 2026
                    </div>
                    <div className="p-4 rounded-xl bg-zinc-900/90 border border-rose-500/30 text-xs space-y-2">
                      <div className="flex items-center gap-2 text-white font-bold">
                        <Music className="w-4 h-4 text-orange-400" />
                        <span>Now Streaming in #music-lounge</span>
                      </div>
                      <p className="text-zinc-400 text-[11px]">Track: Synthwave Sunset 2026 • 3:45 • Requested by Veer</p>
                      <div className="flex gap-2 pt-1 text-[10px] font-mono text-orange-300">
                        <span className="px-2 py-0.5 rounded bg-orange-500/20">DSP Bass: Active</span>
                        <span className="px-2 py-0.5 rounded bg-rose-500/20">Volume: 85%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: AutoMod Defense */}
            {activeTab === "automod" && (
              <div className="w-full max-w-3xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4">
                    <span className="text-xs font-mono text-orange-400 font-bold uppercase">MODULE 02 // PROACTIVE DEFENSE</span>
                    <h3 className="text-2xl font-black text-white uppercase">Automated Server Shield</h3>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      Defend your server against raids, phishing links, spam floods, and token grabbers. All core moderation features (/ban, /kick, /warn, .purge) are permanently free without paywalls.
                    </p>
                    <div className="space-y-2 pt-1">
                      {Object.entries(autoModFilters).map(([key, val]) => (
                        <div key={key} className="flex items-center justify-between text-xs font-mono p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                          <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                          <span className="text-emerald-400 font-bold">ACTIVE 🛡️</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#140b20] border border-orange-500/30 space-y-3 font-mono text-xs">
                    <div className="text-xs text-zinc-400 flex justify-between border-b border-zinc-800 pb-2">
                      <span>SECURITY AUDIT STREAM</span>
                      <span className="text-rose-400">LIVE FEED</span>
                    </div>
                    <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/40 text-rose-300 space-y-1">
                      <p className="font-bold flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                        <span>[BLOCKED] Phishing Link Intercepted</span>
                      </p>
                      <p className="text-[11px] text-zinc-400">User: Spammer#0912 • Action: Deleted &amp; 1h Timeout</p>
                    </div>
                    <div className="p-3 rounded-xl bg-orange-950/20 border border-orange-500/30 text-orange-300 space-y-1">
                      <p className="font-bold flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                        <span>[CLEANED] .purge 25 Executed</span>
                      </p>
                      <p className="text-[11px] text-zinc-400">Auto-destruct alert purged in 5 seconds.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: XP Rank Cards */}
            {activeTab === "xp" && (
              <div className="w-full max-w-3xl space-y-6">
                <div className="text-center space-y-2">
                  <span className="text-xs font-mono text-fuchsia-400 font-bold uppercase">MODULE 03 // COMMUNITY ACTIVITY</span>
                  <h3 className="text-2xl font-black text-white uppercase">Custom XP Rank Card Generator</h3>
                  <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto">
                    Reward active members with text and voice XP progression. Generates high-res visual rank cards directly within Discord.
                  </p>
                </div>

                {/* Simulated Rank Card */}
                <div className="p-6 rounded-3xl bg-gradient-to-r from-[#1c0c29] via-[#12081f] to-[#1c0c29] border border-fuchsia-500/40 shadow-2xl space-y-4 max-w-xl mx-auto">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-fuchsia-500/60 shadow-lg">
                        <img src="/bots/veplexity-avatar.png" alt="VePlexity" className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border border-black" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-black text-white">Veer Madan</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-300 font-mono font-bold">
                            #1 RANK
                          </span>
                        </div>
                        <span className="text-xs font-mono text-zinc-400">Server Founder • VIP Elite</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-fuchsia-400">LVL 42</span>
                      <p className="text-[10px] font-mono text-zinc-500">TOP 1%</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="h-3 w-full rounded-full bg-black/60 overflow-hidden border border-zinc-800">
                      <div className="h-full bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-500 w-[84%]" />
                    </div>
                    <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                      <span>12,450 XP</span>
                      <span>15,000 XP (84%)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Gemini AI */}
            {activeTab === "ai" && (
              <div className="w-full max-w-3xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4">
                    <span className="text-xs font-mono text-amber-400 font-bold uppercase">MODULE 04 // MULTI-MODAL INTELLIGENCE</span>
                    <h3 className="text-2xl font-black text-white uppercase">Google Gemini AI Chatbot</h3>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      Powered by Gemini 2.5 with conversational server memory, custom server persona tuning, and intelligent code / text assistance right inside your server.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <button 
                        onClick={() => {
                          setAiPrompt("Explain quantum computing simply.");
                          setAiResponse("Quantum computers use qubits in superposition to calculate exponential possibilities simultaneously.");
                        }}
                        className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:text-white"
                      >
                        Prompt: Quantum Computing
                      </button>
                      <button 
                        onClick={() => {
                          setAiPrompt("/gemini persona Cyberpunk Hacker");
                          setAiResponse("Jacked into the grid, choomba. Ice is cleared. What's the protocol today?");
                        }}
                        className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:text-white"
                      >
                        Persona: Cyberpunk
                      </button>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#140b20] border border-amber-500/30 space-y-3 font-mono text-xs">
                    <div className="p-3 rounded-xl bg-black/60 border border-zinc-800 text-amber-300">
                      &gt; /gemini ask: {aiPrompt}
                    </div>
                    <div className="p-4 rounded-xl bg-zinc-900 border border-amber-500/20 text-zinc-200 text-xs leading-relaxed">
                      <div className="flex items-center gap-2 text-amber-400 font-bold mb-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Gemini Assistant</span>
                      </div>
                      <p>{aiResponse}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 5: Temp VC */}
            {activeTab === "tempvc" && (
              <div className="w-full max-w-3xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4">
                    <span className="text-xs font-mono text-orange-400 font-bold uppercase">MODULE 05 // DYNAMIC VOICE</span>
                    <h3 className="text-2xl font-black text-white uppercase">Dynamic Temp Voice Hubs</h3>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      Members join a designated <strong>+ Create Room</strong> channel, and VePlexity instantly creates their private voice lounge with automated lock and bitrate controls. Cleanly deletes itself when empty.
                    </p>
                    <ul className="space-y-2 text-xs font-mono text-zinc-300">
                      <li>✓ One-click channel locking &amp; hide controls</li>
                      <li>✓ Custom user limits (1 to 99 members)</li>
                      <li>✓ Zero server channel clutter</li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#140b20] border border-orange-500/30 space-y-3">
                    <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mic className="w-4 h-4 text-orange-400" />
                        <span>🔊 Veer&apos;s Private Lounge (2/4)</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/20 text-orange-300">Active</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                      <div className="p-2 rounded-lg bg-black border border-zinc-800 text-zinc-400">🔒 Lock: Yes</div>
                      <div className="p-2 rounded-lg bg-black border border-zinc-800 text-zinc-400">👥 Limit: 4</div>
                      <div className="p-2 rounded-lg bg-black border border-zinc-800 text-zinc-400">📶 Bitrate: 128k</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* COMMANDS DIRECTORY SECTION */}
        <section id="commands" className="space-y-6 pt-10 border-t border-zinc-800/80">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-orange-400 font-bold uppercase tracking-wider">
                DOCUMENTATION DIRECTORY
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                VEPLEXITY COMMAND REFERENCE
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400">
                Explore the complete catalog of 100+ slash commands and dual-engine instant prefix aliases.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search commands (e.g. play, purge, gemini)..."
                value={commandSearch}
                onChange={(e) => setCommandSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/50"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Commands" },
              { id: "music", label: "🎵 Music DSP" },
              { id: "moderation", label: "🛡️ Moderation" },
              { id: "ai", label: "🤖 Gemini AI" },
              { id: "xp", label: "🏆 XP & Economy" },
              { id: "prefix", label: "⚡ Prefix Aliases" },
              { id: "fun", label: "🎮 Fun & Action" },
              { id: "utility", label: "⚙️ System & Config" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCommandCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  commandCategory === cat.id
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
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
                className="p-4 rounded-2xl bg-[#0e0717] border border-zinc-800/80 hover:border-orange-500/40 transition-all flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-white group-hover:text-orange-400 transition-colors">
                      {cmd.name}
                    </span>
                    {cmd.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/15 border border-orange-500/30 text-orange-300 font-bold">
                        {cmd.badge}
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-[11px] text-orange-300/80 bg-black/40 p-1.5 rounded-lg border border-zinc-800/50">
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
            <span className="text-xs font-mono text-orange-400 font-bold uppercase tracking-wider">
              SERVER MANAGEMENT CONSOLE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              LAUNCH YOUR SERVER DASHBOARD
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Select your Discord server below to configure 24/7 music settings, AutoMod rules, XP rewards, and bot roles with real-time sync.
            </p>
          </div>

          {/* Unauthenticated View */}
          {status !== "authenticated" ? (
            <div className="max-w-xl mx-auto p-8 rounded-3xl bg-gradient-to-b from-[#140b20] to-[#0a0512] border border-orange-500/30 text-center space-y-6 shadow-2xl">
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
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-600 hover:from-orange-400 hover:to-rose-500 text-white font-black text-sm tracking-wide uppercase transition-all flex items-center justify-center gap-3 shadow-xl shadow-orange-500/25 active:scale-98"
              >
                <DiscordLogo className="w-5 h-5" fill="#ffffff" />
                <span>Log In with Discord</span>
              </button>

              <p className="text-[11px] font-mono text-zinc-500">
                VePlexity only reads your server list to identify managed guilds. We never request message history or payment permissions.
              </p>
            </div>
          ) : (
            /* Authenticated Server Deck View */
            <div className="space-y-6 max-w-5xl mx-auto">
              {/* Filter & Refresh Controls */}
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

                        {/* Action CTA */}
                        {isJoined ? (
                          <button
                            onClick={(e) => handleManageServerFlight(e, guild)}
                            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-400 hover:to-rose-500 text-white text-xs font-black transition flex items-center justify-between active:scale-98 shadow-md shadow-orange-500/20"
                          >
                            <span>LAUNCH DASHBOARD</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        ) : (
                          <a
                            href={`https://discord.com/api/oauth2/authorize?client_id=1556640364448714752&permissions=8&scope=bot%20applications.commands&guild_id=${guild.id}&disable_guild_select=true`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleInviteBotToGuild(guild.id, guild.name)}
                            className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-black transition flex items-center justify-between active:scale-98"
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

        {/* IN-PAGE LEGAL HIGHLIGHTS */}
        <section className="pt-10 border-t border-zinc-800/80">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0e0717] border border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-orange-400" />
                <h4 className="text-base font-bold text-white uppercase">Official Terms of Service</h4>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                By adding VePlexity Bot to your Discord server or using its commands, you agree to comply with Discord Developer Terms of Service and VePlexity acceptable use policies.
              </p>
              <Link
                href="/discord-bot/veplexity/terms"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-orange-400 hover:text-orange-300 transition-colors"
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
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-rose-400 hover:text-rose-300 transition-colors"
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
