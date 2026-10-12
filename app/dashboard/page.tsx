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
import { ServerRevealTransition } from "@/app/components/ServerRevealTransition";

interface GuildItem {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  botJoined: boolean;
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

  // Transition Reveal State
  const [transitionServer, setTransitionServer] = useState<{
    id: string;
    name: string;
    icon?: string | null;
  } | null>(null);

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

  // Smooth server transition handler
  const handleManageClick = (guild: GuildItem) => {
    setTransitionServer({
      id: guild.id,
      name: guild.name,
      icon: guild.iconUrl,
    });
    // Give animation 450ms before routing
    setTimeout(() => {
      router.push(`/dashboard/${guild.id}`);
    }, 450);
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
      {/* Seamless Transition Overlay */}
      <ServerRevealTransition
        serverName={transitionServer?.name || "Server"}
        serverIcon={transitionServer?.icon}
        isVisible={Boolean(transitionServer)}
      />

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
              className="btn-bmc px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2"
              title="Support Creator"
            >
              <BmcCupIcon className="w-4 h-4 text-black" />
              <span className="hidden sm:inline">SUPPORT ON BMC</span>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        
        {/* Banner Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Select a Server
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#5865F2]/10 border border-[#5865F2]/30 text-[#5865F2] font-mono font-bold">
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
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-[#5865F2]" : ""}`} />
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
                  ? "bg-[#5865F2] text-white shadow-sm"
                  : "bg-[#12141c] text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        {/* Official BMC Patronage Callout */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0d0f15] border border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FFDD00]/10 border border-[#FFDD00]/30 flex items-center justify-center text-[#FFDD00] shrink-0">
              <BmcCupIcon className="w-6 h-6 text-[#FFDD00]" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>Support 24/7 Lossless Audio &amp; Hosting Nodes</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FFDD00]/10 text-[#FFDD00] border border-[#FFDD00]/20 font-bold">
                  OFFICIAL BMC
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Back operating and bandwidth costs directly on Buy Me a Coffee to unlock VIP server perks and continuous 24/7 uptime.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://www.buymeacoffee.com/veplexity1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-bmc px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2"
            >
              <BmcCupIcon className="w-4 h-4 text-black" />
              <span>BUY A COFFEE</span>
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
                {filteredGuilds.map((guild) => (
                  <motion.div
                    key={guild.id}
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
                    }}
                    whileHover={{ y: -4, transition: { duration: 0.15 } }}
                    className="rounded-2xl pro-card overflow-hidden flex flex-col justify-between group border border-zinc-800/80 hover:border-zinc-700 transition shadow-lg"
                  >
                    {/* Upper Ambient Backdrop */}
                    <div className="h-20 bg-gradient-to-b from-[#181a29] to-[#0e1017] border-b border-zinc-800/40 relative">
                      {/* Connection pill in top right */}
                      <div className="absolute top-3 right-3">
                        {guild.botJoined ? (
                          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Connected
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-900/80 border border-zinc-700 text-zinc-400 font-mono text-[10px] font-bold">
                            Setup Needed
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Centered Large Circular Avatar */}
                    <div className="flex flex-col items-center px-6 pb-6 pt-0 -mt-10 text-center flex-1 justify-between gap-5">
                      <div className="flex flex-col items-center gap-3 w-full">
                        <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-[#12141c] border-4 border-[#0e1017] shadow-xl overflow-hidden flex items-center justify-center font-bold text-lg text-zinc-200 shrink-0 group-hover:scale-105 transition-transform duration-200">
                          {guild.iconUrl ? (
                            <img
                              src={guild.iconUrl}
                              alt={guild.name}
                              className="w-full h-full object-cover"
                              onError={(e) => { (e.currentTarget.style.display = "none"); }}
                            />
                          ) : (
                            <span className="text-xl font-mono text-zinc-300">{guild.name.slice(0, 2).toUpperCase()}</span>
                          )}
                        </div>

                        {/* Server Title & Roles */}
                        <div className="space-y-1 w-full">
                          <h3 className="font-bold text-base text-white truncate max-w-full" title={guild.name}>
                            {guild.name}
                          </h3>

                          <div className="flex items-center justify-center gap-2 text-xs">
                            <span className="font-mono text-zinc-400 text-[11px] font-medium">
                              {guild.owner ? "Server Owner" : "Administrator"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Pill Button */}
                      <div className="w-full pt-1">
                        {guild.botJoined ? (
                          <button
                            onClick={() => handleManageClick(guild)}
                            className="w-full py-2.5 px-4 rounded-xl btn-discord text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-[#5865F2]/20"
                          >
                            <span>Go</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        ) : (
                          <a
                            href={`/invite?guild_id=${guild.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleInviteClick(guild.id, guild.name)}
                            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                              pendingGuildId === guild.id
                                ? "bg-zinc-900 border border-[#5865F2] text-[#5865F2] animate-pulse"
                                : "bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            }`}
                          >
                            {pendingGuildId === guild.id ? (
                              <>
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                <span>Detecting Bot...</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-4 h-4" />
                                <span>Setup</span>
                              </>
                            )}
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
