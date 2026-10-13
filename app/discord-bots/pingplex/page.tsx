"use client";

import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Server, Plus, RefreshCw, LogOut, CheckCircle2, ChevronRight, 
  Search, ArrowLeft, Radio, Bell, Play, Video, Share2
} from "lucide-react";
import { DiscordLogo } from "@/app/components/BrandIcons";
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

export default function PingPlexServerSelectPage() {
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
  const [flightRect, setFlightRect] = useState<FlightRect | null>(null);
  const [flightGuild, setFlightGuild] = useState<FlightGuildData | null>(null);

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
      console.error("[PingPlexSelector] Error loading guilds:", err);
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
            if (found?.bots?.pingplex) {
              clearInterval(interval);
              setPendingGuildId(null);
              setToast(`PingPlex connected to ${guildName}!`);
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

  const handleManageClick = (e: React.MouseEvent, guild: GuildItem) => {
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

  const filteredGuilds = guilds
    .filter((g) => g.name.toLowerCase().includes(search.toLowerCase()))
    .filter((g) => {
      const isConnected = Boolean(g.bots?.pingplex);
      if (filterMode === "active") return isConnected;
      if (filterMode === "uninvited") return !isConnected;
      return true;
    });

  const activeCount = guilds.filter((g) => Boolean(g.bots?.pingplex)).length;

  if (status === "unauthenticated") {
    return (
      <main className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col justify-center items-center px-4 relative font-sans">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md w-full p-8 sm:p-10 rounded-2xl bg-[#0d0f15] border border-zinc-800 text-center space-y-6 shadow-xl"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#17101f] border border-fuchsia-500/40 mx-auto p-2.5 flex items-center justify-center text-fuchsia-400">
            <Radio className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
              PINGPLEX CREATOR STUDIO
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
              Sign in with Discord to manage automated creator alerts for YouTube, Twitch, TikTok, X, and Reddit.
            </p>
          </div>

          <button
            onClick={() => {
              const target = typeof window !== "undefined" && window.location.hostname.includes("localhost")
                ? "/discord-bots/pingplex"
                : "https://www.veplexity.dev/discord-bots/pingplex";
              signIn("discord", { callbackUrl: target, redirectTo: target });
            }}
            className="w-full py-3.5 px-5 rounded-xl btn-discord text-sm font-bold flex items-center justify-center gap-2.5 cursor-pointer shadow-md shadow-[#5865F2]/20"
          >
            <DiscordLogo className="w-5 h-5" fill="#ffffff" />
            <span>LOGIN WITH DISCORD</span>
          </button>

          <Link href="/discord-bots" className="inline-block text-xs text-zinc-500 hover:text-zinc-300 transition-colors font-mono uppercase font-bold tracking-wider">
            ← Return to Bot Hub
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col font-sans">
      {/* Navigation Header */}
      <header className="border-b border-zinc-800/80 bg-[#0c0d14] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/discord-bots" className="flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white px-2.5 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition">
              <ArrowLeft className="w-4 h-4 text-zinc-400" />
              <span>Bot Hub</span>
            </Link>
            <div className="h-5 w-px bg-zinc-800 hidden sm:block" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-400">
                <Radio className="w-4 h-4" />
              </div>
              <span className="font-black text-sm tracking-tight text-white uppercase hidden sm:inline">
                PINGPLEX
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/30 text-fuchsia-300 font-mono font-bold">
                CREATOR STUDIO
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://www.buymeacoffee.com/veplexity1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-90 hover:scale-105 transition-all hidden sm:block"
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

      {/* Main Content Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-7">
        {/* Banner Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Select a Server
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-400 font-mono font-bold">
                {guilds.length} SERVERS
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Select a Discord server to configure PingPlex automated stream, video, and social media notifications.
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
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-fuchsia-400" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Quick Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: "all", label: `All Servers (${guilds.length})` },
            { id: "active", label: `PingPlex Connected (${activeCount})` },
            { id: "uninvited", label: `Setup Needed (${guilds.length - activeCount})` },
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

        {/* Loading State */}
        {loading && (
          <div className="py-24 flex flex-col items-center justify-center space-y-3">
            <div className="w-8 h-8 border-2 border-zinc-700 border-t-fuchsia-500 rounded-full animate-spin" />
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-bold">
              SCANNING DISCORD SERVERS FOR PINGPLEX...
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
                  const isConnected = Boolean(guild.bots?.pingplex);

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
                      className={`rounded-2xl bg-[#0d0f17] overflow-hidden flex flex-col justify-between group border border-zinc-800/80 hover:border-fuchsia-500/50 hover:shadow-2xl hover:shadow-fuchsia-500/10 transition-all duration-300 relative ${
                        isConnected ? "cursor-pointer" : ""
                      }`}
                    >
                      {/* Top Ambient Backdrop */}
                      <div className="h-24 bg-gradient-to-b from-[#1f1026] via-[#150d1e] to-[#0d0f17] border-b border-zinc-800/50 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,70,239,0.18),transparent_70%)] pointer-events-none" />
                        
                        <div className="absolute top-3 inset-x-3.5 flex items-center justify-between z-10">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold">
                            ID: {guild.id.slice(-6)}
                          </span>
                          
                          {isConnected ? (
                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/40 text-fuchsia-400 font-mono text-[10px] font-black shadow-xs">
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

                      {/* Avatar Bezel */}
                      <div className="relative z-10 flex flex-col items-center px-5 pb-5 pt-0 -mt-12 text-center flex-1 justify-between gap-4">
                        <div className="flex flex-col items-center gap-3 w-full">
                          <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-[#1d1226] border-2 border-zinc-700/80 group-hover:border-fuchsia-500/70 shadow-2xl overflow-hidden flex items-center justify-center font-bold text-xl text-zinc-200 shrink-0 relative z-20 group-hover:scale-105 transition-all duration-300 p-1">
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

                          <div className="space-y-1.5 w-full">
                            <h3
                              className="font-black text-base text-white group-hover:text-fuchsia-300 transition-colors truncate max-w-full tracking-tight"
                              title={guild.name}
                            >
                              {guild.name}
                            </h3>

                            <div className="flex items-center justify-center gap-2 text-xs flex-wrap">
                              <span className="px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-[10px] font-semibold">
                                {guild.owner ? "👑 Server Owner" : "🛡️ Administrator"}
                              </span>
                            </div>
                          </div>

                          {/* Supported Feeds */}
                          <div className="w-full py-2 px-3 rounded-xl bg-[#090b12] border border-zinc-800/60 flex items-center justify-around text-[11px] font-mono text-zinc-400">
                            <span title="YouTube Uploads & Streams" className="flex items-center gap-1 text-red-400">
                              <Play className="w-3 h-3 fill-current" /> YT
                            </span>
                            <span className="text-zinc-700">•</span>
                            <span title="Twitch Live Alerts" className="flex items-center gap-1 text-purple-400">
                              <Video className="w-3 h-3" /> Twitch
                            </span>
                            <span className="text-zinc-700">•</span>
                            <span title="Reddit Posts" className="flex items-center gap-1 text-orange-400">
                              <Share2 className="w-3 h-3" /> Reddit
                            </span>
                            <span className="text-zinc-700">•</span>
                            <span title="TikTok & X Feeds" className="text-zinc-300">
                              TikTok/X
                            </span>
                          </div>
                        </div>

                        {/* Action Pill */}
                        <div className="w-full pt-1">
                          {isConnected ? (
                            <button
                              onClick={(e) => handleManageClick(e, guild)}
                              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white text-xs font-black transition-all flex items-center justify-between cursor-pointer shadow-lg hover:shadow-fuchsia-500/25 active:scale-98 group/btn"
                            >
                              <span className="tracking-wider uppercase">LAUNCH PINGPLEX STUDIO</span>
                              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover/btn:translate-x-1">
                                <ChevronRight className="w-3.5 h-3.5 text-white stroke-[3]" />
                              </div>
                            </button>
                          ) : (
                            <a
                              href={`/invite/pingplex?guild_id=${guild.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => handleInviteClick(guild.id, guild.name)}
                              className={`w-full py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-between cursor-pointer ${
                                pendingGuildId === guild.id
                                  ? "bg-zinc-900 border border-fuchsia-500 text-fuchsia-400 animate-pulse"
                                  : "bg-fuchsia-600/20 hover:bg-fuchsia-600/30 text-fuchsia-300 border border-fuchsia-500/40 shadow-sm"
                              }`}
                            >
                              <span className="tracking-wider uppercase">
                                {pendingGuildId === guild.id ? "DETECTING BOT..." : "INVITE PINGPLEX"}
                              </span>
                              <div className="w-6 h-6 rounded-full bg-fuchsia-500/20 flex items-center justify-center">
                                {pendingGuildId === guild.id ? (
                                  <RefreshCw className="w-3 h-3 animate-spin text-fuchsia-300" />
                                ) : (
                                  <Plus className="w-3.5 h-3.5 text-fuchsia-300 stroke-[3]" />
                                )}
                              </div>
                            </a>
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

      {/* Shared-Element Smooth Flight Overlay */}
      {flightRect && flightGuild && (
        <ServerFlightCanvas
          originRect={flightRect}
          guild={flightGuild}
          onFlightComplete={() => {}}
        />
      )}
    </main>
  );
}
