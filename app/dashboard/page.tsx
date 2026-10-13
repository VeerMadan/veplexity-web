"use client";

import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Server, Plus, ArrowRight, RefreshCw, 
  ExternalLink, LogOut, CheckCircle2, ChevronRight, 
  Search, ShieldCheck, Filter, AlertCircle, Coffee
} from "lucide-react";
import { DiscordLogo, BmcCupIcon } from "@/app/components/BrandIcons";
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

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [guilds, setGuilds] = useState<GuildItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pendingGuildId, setPendingGuildId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterMode, setFilterMode] = useState<"all" | "active" | "uninvited">("all");
  const [error, setError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authErrorDetail, setAuthErrorDetail] = useState<string | null>(null);
  const [flightRect, setFlightRect] = useState<FlightRect | null>(null);
  const [flightGuild, setFlightGuild] = useState<FlightGuildData | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.hostname === "veplexity.dev") {
        window.location.replace(`https://www.veplexity.dev${window.location.pathname}${window.location.search}`);
        return;
      }
      const params = new URLSearchParams(window.location.search);
      const err = params.get("error");
      const detail = params.get("error_detail");
      if (err) setAuthError(err);
      if (detail) setAuthErrorDetail(detail);
    }
  }, []);

  const fetchGuilds = async (showSpinner = true) => {
    try {
      if (showSpinner) {
        setLoading(true);
      } else {
        setIsRefreshing(true);
      }
      setError(null);
      const res = await fetch("/api/user/guilds", { cache: "no-store" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to load servers");
      }
      const data = await res.json();
      setGuilds(data.guilds || []);
    } catch (err: any) {
      console.error("[Dashboard] Error loading guilds:", err);
      if (showSpinner) setError(err.message || "Failed to connect to Discord API");
    } finally {
      if (showSpinner) setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchGuilds(true);
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    const handleRecheck = () => {
      if (status === "authenticated") {
        fetchGuilds(false);
      }
    };

    window.addEventListener("focus", handleRecheck);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") handleRecheck();
    });
    return () => {
      window.removeEventListener("focus", handleRecheck);
    };
  }, [status]);

  const handleInviteClick = (guildId: string, guildName: string) => {
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
            if (found?.botJoined) {
              clearInterval(interval);
              setPendingGuildId(null);
              setToast(`VePlexity connected to ${guildName}!`);
              setTimeout(() => setToast(null), 5000);
            }
          }
        }
      } catch (e) {
        // Silent catch
      }

      if (attempts >= 16) {
        clearInterval(interval);
        setPendingGuildId(null);
      }
    }, 2500);
  };

  // Shared-element button-to-fullscreen reveal flight to server dashboard
  const handleManageClick = (e: React.MouseEvent, guild: GuildItem) => {
    e.preventDefault();
    e.stopPropagation();
    dashboardAudio.playClick();

    const isPingPlexOnly = guild.bots?.pingplex && !guild.bots?.veplexity;
    const targetUrl = isPingPlexOnly
      ? `/dashboard/${guild.id}?bot=pingplex`
      : `/dashboard/${guild.id}`;

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
      router.push(targetUrl);
    }, 520);
  };

  const filteredGuilds = guilds
    .filter((g) => g.name.toLowerCase().includes(search.toLowerCase()))
    .filter((g) => {
      if (filterMode === "active") return g.botJoined;
      if (filterMode === "uninvited") return !g.botJoined;
      return true;
    });

  const activeCount = guilds.filter((g) => g.botJoined).length;

  // ─── LOGIN SCREEN (UNAUTHENTICATED) ─────────────────────────────────────────
  if (status === "unauthenticated") {
    return (
      <main className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col justify-center items-center px-4 relative font-sans">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md w-full p-8 sm:p-10 rounded-2xl bg-[#0d0f15] border border-zinc-800 text-center space-y-6 shadow-xl"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#12141c] border border-zinc-700/80 mx-auto p-2.5 flex items-center justify-center">
            <img 
              src="/vp-logo-icon.png" 
              alt="VePlexity" 
              className="w-full h-full object-contain" 
              onError={(e) => { e.currentTarget.style.display = 'none'; }} 
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
              SERVER MANAGEMENT CONSOLE
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
              Sign in with your Discord account to manage servers, assign roles, and configure bot settings.
            </p>
          </div>

          {authError && (
            <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/30 text-left text-xs space-y-2 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-red-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Discord Sign-In Error ({authError})</span>
                </div>
                <button
                  onClick={() => {
                    setAuthError(null);
                    if (typeof window !== "undefined") {
                      window.history.replaceState({}, document.title, window.location.pathname);
                    }
                  }}
                  className="text-zinc-400 hover:text-white text-xs underline font-mono cursor-pointer"
                >
                  ✕ Dismiss
                </button>
              </div>
              <p className="text-[11px] text-zinc-300 leading-relaxed">
                {authError === "Configuration" 
                  ? "OAuth handshake could not be completed. Please ensure you are initiating sign-in on https://www.veplexity.dev and that both Redirect URIs are saved in Discord Developer Portal."
                  : `Authentication encountered an issue (${authError}). Please try logging in again.`}
              </p>
              {authErrorDetail && (
                <div className="p-2.5 bg-black/60 rounded border border-red-500/30 text-[10px] font-mono text-red-300 break-all leading-normal">
                  <div className="text-[9px] uppercase font-bold text-red-400 mb-1">Diagnostic Detail:</div>
                  {authErrorDetail}
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => {
              setAuthError(null);
              if (typeof window !== "undefined") {
                window.history.replaceState({}, document.title, window.location.pathname);
                const target = window.location.hostname.includes("localhost")
                  ? "/dashboard"
                  : "https://www.veplexity.dev/dashboard";
                signIn("discord", { callbackUrl: target, redirectTo: target });
              } else {
                signIn("discord", { callbackUrl: "/dashboard", redirectTo: "/dashboard" });
              }
            }}
            className="w-full py-3.5 px-5 rounded-xl btn-discord text-sm font-bold flex items-center justify-center gap-2.5 cursor-pointer shadow-md shadow-[#5865F2]/20"
          >
            <DiscordLogo className="w-5 h-5" fill="#ffffff" />
            <span>LOGIN WITH DISCORD</span>
          </button>

          <Link href="/" className="inline-block text-xs text-zinc-500 hover:text-zinc-300 transition-colors font-mono uppercase font-bold tracking-wider">
            ← Return to Overview
          </Link>
        </motion.div>
      </main>
    );
  }

  // ─── AUTHENTICATED SERVER SELECTOR ──────────────────────────────────────────
  return (
    <main className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col font-sans">
      {/* Navigation Header */}
      <header className="border-b border-zinc-800/80 bg-[#0c0d14] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#141620] border border-zinc-700/60 p-1 flex items-center justify-center">
                <img 
                  src="/vp-logo-icon.png" 
                  alt="VP" 
                  className="w-full h-full object-contain" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                />
              </div>
              <span className="font-black text-sm tracking-tight text-white uppercase">
                VEPLEXITY
              </span>
            </Link>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-zinc-800/80 border border-zinc-700 text-zinc-300 font-mono uppercase font-bold">
              CONSOLE
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://www.buymeacoffee.com/veplexity1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-90 hover:scale-105 transition-all"
              title="Support on Buy Me a Coffee"
            >
              <img 
                src="/bmc/SVG Files/bmc-button.svg" 
                alt="Buy Me a Coffee" 
                className="h-8 w-auto rounded-lg shadow-sm" 
              />
            </a>

            {session?.user && (
              <div className="flex items-center gap-3 pl-3 border-l border-zinc-800">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-700 bg-zinc-800">
                  {session.user.image ? (
                    <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white">
                      {session.user.name?.charAt(0) || "U"}
                    </div>
                  )}
                </div>
                <span className="text-xs font-semibold text-zinc-200 hidden md:inline">
                  {session.user.name}
                </span>
                <button
                  onClick={() => signOut()}
                  title="Sign out"
                  className="p-1 rounded text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 px-4 py-2.5 rounded-xl border bg-zinc-900 border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-2 shadow-xl">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-7">
        {/* Limited Access Demo Alert Banner */}
        <div className="p-3 sm:p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 font-mono text-[10px] font-bold tracking-wider shrink-0 border border-amber-500/30">
              LIMITED ACCESS DEMO
            </span>
            <span className="text-zinc-300 font-medium truncate">
              This is a limited access demonstration preview. Dashboard configurations and bot interactions are running in live preview mode.
            </span>
          </div>
          <span className="text-[10px] font-mono text-amber-400/80 shrink-0 hidden sm:inline">
            v2.0 PREVIEW
          </span>
        </div>
        
        {/* Banner Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Select a Server
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold">
                {guilds.length} SERVERS
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Select a Discord server to configure auto-moderation, music streaming, alerts, and bot settings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter Server..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pro-input pl-10 pr-4 py-2.5 text-xs w-52 sm:w-64 rounded-full font-medium"
              />
            </div>
            <button
              onClick={() => fetchGuilds(false)}
              title="Refresh server list"
              className="px-3.5 py-2.5 rounded-full btn-secondary flex items-center gap-2 text-xs font-bold cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-emerald-400" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Quick Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: "all", label: `All Servers (${guilds.length})` },
            { id: "active", label: `Connected (${activeCount})` },
            { id: "uninvited", label: `Requires Setup (${guilds.length - activeCount})` },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setFilterMode(mode.id as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer select-none ${
                filterMode === mode.id
                  ? "bg-zinc-100 text-zinc-950 font-bold shadow-sm"
                  : "bg-[#12141c] text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        {/* Official BMC Patronage Callout */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0d0f15] border border-[#FFDD00]/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-xl bg-[#FFDD00]/10 border border-[#FFDD00]/30 flex items-center justify-center shrink-0">
              <img src="/bmc/SVG Files/bmc-logo.svg" alt="BMC Logo" className="w-7 h-7 object-contain" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>Support 24/7 Lossless Audio &amp; Hosting Nodes</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FFDD00]/15 text-[#FFDD00] border border-[#FFDD00]/30 font-bold">
                  OFFICIAL PARTNER
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Back operating and bandwidth costs directly on Buy Me a Coffee to unlock VIP server perks and continuous 24/7 uptime.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://www.buymeacoffee.com/veplexity1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-95 hover:scale-105 transition-all shadow-md"
            >
              <img src="/bmc/SVG Files/bmc-button.svg" alt="Buy Me A Coffee" className="h-10 w-auto rounded-lg" />
            </a>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-24 flex flex-col items-center justify-center space-y-3">
            <div className="w-8 h-8 border-2 border-zinc-700 border-t-[#5865F2] rounded-full animate-spin" />
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-bold">
              SCANNING DISCORD SERVERS...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="p-5 rounded-xl bg-red-950/20 border border-red-500/30 text-red-300 flex items-center justify-between gap-4">
            <div>
              <p className="font-bold text-xs uppercase">FAILED TO RETRIEVE SERVERS</p>
              <p className="text-[11px] text-red-300/80 mt-0.5">{error}</p>
            </div>
            <button
              onClick={() => fetchGuilds()}
              className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-xs font-bold uppercase transition-colors"
            >
              RETRY
            </button>
          </div>
        )}

        {/* Server Grid */}
        {!loading && !error && (
          <>
            {filteredGuilds.length === 0 ? (
              <div className="py-16 text-center rounded-2xl bg-[#0d0f15] border border-zinc-800 p-8 space-y-3">
                <Server className="w-10 h-10 text-zinc-600 mx-auto" />
                <h3 className="text-sm font-bold uppercase text-zinc-300">NO SERVERS FOUND</h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  {search ? "No servers match your filter query." : "You do not currently manage any servers with Administrator permissions."}
                </p>
              </div>
            ) : (
              <motion.div 
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.04 },
                  },
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredGuilds.map((guild) => {
                  const isDual = Boolean(guild.bots?.veplexity && guild.bots?.pingplex);
                  const isVepOnly = Boolean(guild.bots?.veplexity && !guild.bots?.pingplex);
                  const isPingOnly = Boolean(guild.bots?.pingplex && !guild.bots?.veplexity);
                  const isConnected = Boolean(guild.botJoined);

                  return (
                    <motion.div
                      key={guild.id}
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
                      }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      onClick={(e) => {
                        if (isConnected) {
                          handleManageClick(e, guild);
                        }
                      }}
                      className={`rounded-2xl bg-[#0d0f17] overflow-hidden flex flex-col justify-between group border border-zinc-800/80 transition-all duration-300 relative ${
                        isConnected ? "cursor-pointer" : ""
                      } ${
                        isPingOnly
                          ? "hover:border-fuchsia-500/50 hover:shadow-2xl hover:shadow-fuchsia-500/10"
                          : isConnected
                          ? "hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10"
                          : "hover:border-amber-500/30"
                      }`}
                    >
                      {/* Top Ambient Backdrop with Scanner Hairline */}
                      <div className="h-24 bg-gradient-to-b from-[#181d2e] via-[#101322] to-[#0d0f17] border-b border-zinc-800/50 relative overflow-hidden">
                        <div
                          className={`absolute inset-0 pointer-events-none ${
                            isPingOnly
                              ? "bg-[radial-gradient(ellipse_at_top,rgba(217,70,239,0.18),transparent_70%)]"
                              : isVepOnly
                              ? "bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.16),transparent_70%)]"
                              : "bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.14),transparent_70%)]"
                          }`}
                        />

                        {/* Top Bar Badges */}
                        <div className="absolute top-3 inset-x-3.5 flex items-center justify-between z-10">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold">
                            ID: {guild.id.slice(-6)}
                          </span>

                          {isDual ? (
                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-mono text-[10px] font-black shadow-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              DUAL ENGINE ACTIVE
                            </span>
                          ) : isVepOnly ? (
                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/40 text-blue-400 font-mono text-[10px] font-black shadow-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                              VEPLEXITY ACTIVE
                            </span>
                          ) : isPingOnly ? (
                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/40 text-fuchsia-300 font-mono text-[10px] font-black shadow-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-pulse" />
                              PINGPLEX ACTIVE
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-[10px] font-bold">
                              SETUP NEEDED
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Centered Large Circular Avatar in Machined Bezel */}
                      <div className="relative z-10 flex flex-col items-center px-5 pb-5 pt-0 -mt-12 text-center flex-1 justify-between gap-4">
                        <div className="flex flex-col items-center gap-3 w-full">
                          <div
                            className={`w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-[#121522] border-2 shadow-2xl overflow-hidden flex items-center justify-center font-bold text-xl text-zinc-200 shrink-0 relative z-20 group-hover:scale-105 transition-all duration-300 p-1 ${
                              isPingOnly
                                ? "border-zinc-700/80 group-hover:border-fuchsia-500/70"
                                : "border-zinc-700/80 group-hover:border-emerald-500/60"
                            }`}
                          >
                            {guild.iconUrl ? (
                              <img
                                src={guild.iconUrl}
                                alt={guild.name}
                                className="w-full h-full object-cover rounded-xl"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            ) : (
                              <span className="text-xl font-mono font-black text-zinc-200">
                                {guild.name.slice(0, 2).toUpperCase()}
                              </span>
                            )}
                          </div>

                          {/* Server Title & Roles */}
                          <div className="space-y-1.5 w-full">
                            <h3
                              className={`font-black text-base text-white transition-colors truncate max-w-full tracking-tight ${
                                isPingOnly ? "group-hover:text-fuchsia-300" : "group-hover:text-emerald-300"
                              }`}
                              title={guild.name}
                            >
                              {guild.name}
                            </h3>

                            <div className="flex items-center justify-center gap-2 text-xs flex-wrap">
                              <span className="px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-[10px] font-semibold">
                                {guild.owner ? "👑 Server Owner" : "🛡️ Administrator"}
                              </span>
                              {isPingOnly && (
                                <span className="px-2 py-0.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-300 font-mono text-[10px] font-bold">
                                  📡 PingPlex Alerts
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Feature Badges Strip */}
                          {isPingOnly ? (
                            <div className="w-full py-2 px-3 rounded-xl bg-[#090b12] border border-fuchsia-500/20 flex items-center justify-around text-[11px] font-mono text-fuchsia-300">
                              <span title="YouTube Video Alerts">🔴 YouTube</span>
                              <span className="text-zinc-700">•</span>
                              <span title="Twitch Live Stream Alerts">🟣 Twitch</span>
                              <span className="text-zinc-700">•</span>
                              <span title="X Post Alerts">🐦 X</span>
                              <span className="text-zinc-700">•</span>
                              <span title="TikTok Alerts">🎵 TikTok</span>
                            </div>
                          ) : (
                            <div className="w-full py-2 px-3 rounded-xl bg-[#090b12] border border-zinc-800/60 flex items-center justify-around text-[11px] font-mono text-zinc-400">
                              <span title="24/7 Lossless Audio">🎵 Audio</span>
                              <span className="text-zinc-700">•</span>
                              <span title="AutoMod Security">🛡️ Mod</span>
                              <span className="text-zinc-700">•</span>
                              <span title="Pingcord Social Alerts">🔔 Alerts</span>
                              <span className="text-zinc-700">•</span>
                              <span title="Leveling & XP">🏆 XP</span>
                            </div>
                          )}
                        </div>

                        {/* Action Pill Button with Nested Circle */}
                        <div className="w-full pt-1">
                          {isConnected ? (
                            <button
                              onClick={(e) => handleManageClick(e, guild)}
                              className={`w-full py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-between cursor-pointer shadow-lg active:scale-98 group/btn ${
                                isPingOnly
                                  ? "bg-fuchsia-600 hover:bg-fuchsia-500 text-white shadow-fuchsia-500/20 hover:shadow-fuchsia-500/35"
                                  : "bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-emerald-500/20 hover:shadow-emerald-500/35"
                              }`}
                            >
                              <span className="tracking-wider uppercase">
                                {isPingOnly ? "LAUNCH PINGPLEX STUDIO" : "LAUNCH CONSOLE"}
                              </span>
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform group-hover/btn:translate-x-1 ${
                                  isPingOnly ? "bg-white/20 text-white" : "bg-zinc-950/20 text-zinc-950"
                                }`}
                              >
                                <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                            </button>
                          ) : (
                            <div className="space-y-1.5 w-full">
                              <a
                                href={`/invite?guild_id=${guild.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => handleInviteClick(guild.id, guild.name)}
                                className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-between cursor-pointer ${
                                  pendingGuildId === guild.id
                                    ? "bg-zinc-900 border border-[#5865F2] text-[#5865F2] animate-pulse"
                                    : "bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow-sm"
                                }`}
                              >
                                <span className="tracking-wider uppercase text-[11px]">
                                  {pendingGuildId === guild.id ? "DETECTING BOT..." : "INVITE VEPLEXITY"}
                                </span>
                                <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center">
                                  {pendingGuildId === guild.id ? (
                                    <RefreshCw className="w-3 h-3 animate-spin text-amber-300" />
                                  ) : (
                                    <Plus className="w-3.5 h-3.5 text-amber-300 stroke-[3]" />
                                  )}
                                </div>
                              </a>

                              <a
                                href={`/invite/pingplex?guild_id=${guild.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-1.5 px-3 rounded-lg text-[10px] font-bold text-fuchsia-300 hover:text-fuchsia-200 bg-fuchsia-500/10 hover:bg-fuchsia-500/20 border border-fuchsia-500/30 flex items-center justify-between transition-colors cursor-pointer"
                              >
                                <span>OR INVITE PINGPLEX (ALERTS ONLY)</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Shared-Element Button-to-Fullscreen Flight Canvas */}
      <ServerFlightCanvas
        rect={flightRect}
        guild={flightGuild}
        isExpanding={Boolean(flightRect)}
      />
    </main>
  );
}
