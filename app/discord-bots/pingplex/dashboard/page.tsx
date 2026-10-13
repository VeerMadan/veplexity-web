"use client";

import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Server, Plus, RefreshCw, LogOut, CheckCircle2, ChevronRight, 
  Search, Radio, ArrowLeft, ExternalLink, Bell, AlertCircle
} from "lucide-react";
import { DiscordLogo, DiscordVerifiedBadge, DiscordAppPill } from "@/app/components/BrandIcons";
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

export default function PingPlexDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [guilds, setGuilds] = useState<GuildItem[]>([]);
  const [loadingGuilds, setLoadingGuilds] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [serverSearch, setServerSearch] = useState("");
  const [serverFilter, setServerFilter] = useState<"all" | "active" | "uninvited">("all");
  const [serverError, setServerError] = useState<string | null>(null);

  // Flight transition state
  const [flightRect, setFlightRect] = useState<FlightRect | null>(null);
  const [flightGuild, setFlightGuild] = useState<FlightGuildData | null>(null);

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
      console.error("[PingPlexDashboard] Error loading guilds:", err);
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
    }, 480);
  };

  const visibleGuilds = guilds.filter((g) => {
    const matchesSearch = g.name.toLowerCase().includes(serverSearch.toLowerCase());
    const isJoined = Boolean(g.bots?.pingplex);
    if (serverFilter === "active") return matchesSearch && isJoined;
    if (serverFilter === "uninvited") return matchesSearch && !isJoined;
    return matchesSearch;
  });

  const activeCount = guilds.filter((g) => Boolean(g.bots?.pingplex)).length;

  return (
    <div className="min-h-screen bg-[#07030a] text-zinc-100 flex flex-col font-sans relative selection:bg-fuchsia-500/30 overflow-x-hidden">
      <Navbar />

      {/* Flight Canvas Transition into Specific Guild */}
      {flightRect && flightGuild && (
        <ServerFlightCanvas startRect={flightRect} guild={flightGuild} />
      )}

      {/* Atmospheric Soft Glows */}
      <div className="fixed top-0 right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-fuchsia-600/15 via-purple-600/10 to-transparent rounded-full blur-[170px] pointer-events-none" />
      <div className="fixed top-1/2 left-1/4 w-[700px] h-[700px] bg-gradient-to-tr from-purple-600/15 via-rose-600/10 to-transparent rounded-full blur-[170px] pointer-events-none" />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 relative z-10">
        
        {/* Top Header & Breadcrumb */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Link href="/discord-bot" className="hover:text-white transition-colors flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Discord Bots</span>
            </Link>
            <span>/</span>
            <Link href="/discord-bot/pingplex" className="hover:text-fuchsia-400 transition-colors">
              PingPlex
            </Link>
            <span>/</span>
            <span className="text-fuchsia-400 font-bold">Studio Dashboard</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0 flex items-center justify-center">
                <img 
                  src="/bots/pingplex-avatar.png" 
                  alt="PingPlex" 
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain filter drop-shadow-[0_8px_20px_rgba(217,70,239,0.4)]"
                  onError={(e) => { e.currentTarget.src = "/bots/pp.png"; }}
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
                    PingPlex Alert Studio
                  </h1>
                  <DiscordVerifiedBadge className="w-5 h-5 shrink-0" />
                  <DiscordAppPill />
                </div>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Select your Discord server to manage real-time social alert feeds, webhooks, and 1-click presets.
                </p>
              </div>
            </div>

            {status === "authenticated" && (
              <div className="flex items-center gap-3 shrink-0">
                <div className="px-3.5 py-1.5 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/30 text-xs font-mono text-fuchsia-300 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{activeCount} Active Studios</span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-rose-400 transition"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ─── UNAUTHENTICATED: FULL-PAGE DISCORD LOGIN HERO ─────────────── */}
        {status !== "authenticated" ? (
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-xl mx-auto p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#180a24] to-[#0c0514] border-2 border-fuchsia-500/40 text-center space-y-6 shadow-2xl relative overflow-hidden backdrop-blur-xl"
          >
            <div className="w-20 h-20 rounded-3xl bg-fuchsia-500/10 border-2 border-fuchsia-500/40 flex items-center justify-center text-fuchsia-400 mx-auto shadow-lg shadow-fuchsia-500/20">
              <Radio className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Connect With Discord
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-md mx-auto">
                Authenticate with your Discord account to discover and manage servers where you hold <strong>Manage Server</strong> or <strong>Administrator</strong> permissions.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#090312] border border-zinc-800 text-left space-y-2 text-xs font-mono text-zinc-400">
              <p className="text-white font-bold">⚡ With PingPlex Studio you can:</p>
              <p>• Connect YouTube, Twitch, TikTok, X, &amp; Reddit webhooks</p>
              <p>• Deploy 1-click viral message templates and hype alerts</p>
              <p>• Setup targeted @StreamSquad notification mention roles</p>
            </div>

            <button
              onClick={() => signIn("discord")}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-rose-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-black text-sm tracking-wide uppercase transition-all flex items-center justify-center gap-3 shadow-xl shadow-fuchsia-600/25 active:scale-95 cursor-pointer"
            >
              <DiscordLogo className="w-5 h-5" fill="#ffffff" />
              <span>Log In with Discord &amp; Open Studio</span>
            </button>

            <p className="text-[11px] font-mono text-zinc-500">
              Read-only server permissions • Zero private message access
            </p>
          </motion.div>
        ) : (
          /* ─── AUTHENTICATED: SPACIOUS SERVER MANAGEMENT GRID ──────────── */
          <div className="space-y-6">
            
            {/* Search, Filter & Controls Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0c0716]/95 border border-zinc-800 backdrop-blur-xl">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-72">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search your servers..."
                    value={serverSearch}
                    onChange={(e) => setServerSearch(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 rounded-xl bg-black/60 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-fuchsia-500/50"
                  />
                </div>

                <div className="flex gap-1 bg-black/60 p-1 rounded-xl border border-zinc-800 text-xs font-mono">
                  {(["all", "active", "uninvited"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setServerFilter(mode)}
                      className={`px-3 py-1.5 rounded-lg capitalize transition ${
                        serverFilter === mode
                          ? "bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white font-bold shadow-md shadow-fuchsia-600/20"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <button
                  onClick={() => fetchGuilds(false)}
                  disabled={isRefreshing}
                  className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition disabled:opacity-50 flex items-center gap-2 text-xs font-mono font-bold"
                  title="Refresh Servers"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
              </div>
            </div>

            {/* Error Banner */}
            {serverError && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-300 text-xs font-mono">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            {/* Server Cards Full-Width Grid */}
            {loadingGuilds ? (
              <div className="text-center py-24 space-y-3">
                <div className="w-10 h-10 rounded-full border-2 border-fuchsia-500 border-t-transparent animate-spin mx-auto" />
                <p className="text-xs font-mono text-zinc-400">Loading your Discord servers...</p>
              </div>
            ) : visibleGuilds.length === 0 ? (
              <div className="text-center py-16 p-8 rounded-3xl bg-[#0c0716]/95 border border-zinc-800 space-y-3">
                <p className="text-base font-bold text-white">No servers matching criteria</p>
                <p className="text-xs text-zinc-400 max-w-md mx-auto">
                  Ensure your Discord account has <strong>Manage Server</strong> or <strong>Administrator</strong> permissions, or clear your search filter.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {visibleGuilds.map((guild) => {
                  const isJoined = Boolean(guild.bots?.pingplex);
                  return (
                    <motion.div
                      key={guild.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 rounded-3xl bg-[#0c0716]/95 border-2 border-fuchsia-500/25 hover:border-fuchsia-500/60 transition-all duration-200 flex flex-col justify-between space-y-5 shadow-xl hover:shadow-[0_0_30px_rgba(217,70,239,0.15)] group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden flex items-center justify-center font-bold text-base text-zinc-400 shrink-0 shadow-md">
                          {guild.iconUrl ? (
                            <img src={guild.iconUrl} alt={guild.name} className="w-full h-full object-cover" />
                          ) : (
                            guild.name.substring(0, 2).toUpperCase()
                          )}
                        </div>

                        <div className="min-w-0 space-y-1">
                          <h3 className="text-base font-black text-white truncate group-hover:text-fuchsia-400 transition-colors">
                            {guild.name}
                          </h3>
                          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 flex-wrap">
                            <span>ID: {guild.id.substring(0, 8)}...</span>
                            {guild.owner && (
                              <span className="px-1.5 py-0.2 rounded bg-fuchsia-500/20 text-fuchsia-300 font-bold">
                                Owner
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Status & Action Button */}
                      <div className="space-y-3 pt-2 border-t border-zinc-800/80">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-zinc-500">Studio Status:</span>
                          {isJoined ? (
                            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                              <span>PingPlex Active</span>
                            </span>
                          ) : (
                            <span className="text-zinc-500">Not Installed</span>
                          )}
                        </div>

                        {isJoined ? (
                          <button
                            onClick={(e) => handleManageServerFlight(e, guild)}
                            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-600 hover:from-fuchsia-500 hover:to-rose-500 text-white text-xs font-black transition flex items-center justify-between active:scale-95 shadow-md shadow-fuchsia-600/20 cursor-pointer"
                          >
                            <span>OPEN ALERT STUDIO</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        ) : (
                          <a
                            href={`https://discord.com/api/oauth2/authorize?client_id=1559520031916687430&permissions=8&scope=bot%20applications.commands&guild_id=${guild.id}&disable_guild_select=true`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 hover:border-fuchsia-500/40 text-white text-xs font-black transition flex items-center justify-between active:scale-95"
                          >
                            <span>INVITE PINGPLEX</span>
                            <Plus className="w-4 h-4 text-fuchsia-400" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
