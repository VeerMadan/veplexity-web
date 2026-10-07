"use client";

import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { 
  Server, Plus, ArrowRight, RefreshCw, 
  ExternalLink, LogOut, CheckCircle2, ChevronRight, Bot, Heart 
} from "lucide-react";

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
  const [guilds, setGuilds] = useState<GuildItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pendingGuildId, setPendingGuildId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

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
              setToast(`🎉 VePlexity connected to ${guildName}!`);
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

  const filteredGuilds = guilds.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  // ─── LOGIN SCREEN (UNAUTHENTICATED) ─────────────────────────────────────────
  if (status === "unauthenticated") {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4 relative">
        <div className="max-w-md w-full p-10 rounded-xl bg-[#0c0c0c] border border-white/15 text-center space-y-6 shadow-2xl">
          <div className="w-14 h-14 rounded-xl bg-zinc-900 border border-white/20 mx-auto p-2 flex items-center justify-center">
            <img 
              src="/vp-logo-icon.png" 
              alt="VePlexity" 
              className="w-full h-full object-contain" 
              onError={(e) => { e.currentTarget.style.display = 'none'; }} 
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black uppercase tracking-tight text-white">
              COMMAND CENTER
            </h1>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              Sign in with your Discord account to manage servers, assign roles, and configure bot settings.
            </p>
          </div>

          <button
            onClick={() => signIn("discord")}
            className="w-full py-3.5 px-4 rounded bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2"
          >
            <span>LOGIN WITH DISCORD</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <Link href="/" className="inline-block text-xs text-zinc-500 hover:text-white transition-colors font-mono uppercase font-bold tracking-wider">
            ← RETURN TO OVERVIEW
          </Link>
        </div>
      </main>
    );
  }

  // ─── AUTHENTICATED SERVER SELECTOR ──────────────────────────────────────────
  return (
    <main className="min-h-screen bg-black text-white flex flex-col font-sans">
      {/* Navigation Header */}
      <header className="border-b border-white/10 bg-black/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-zinc-900 border border-white/15 p-1 flex items-center justify-center">
                <img 
                  src="/vp-logo-icon.png" 
                  alt="VP" 
                  className="w-full h-full object-contain" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                />
              </div>
              <span className="font-black text-sm tracking-tighter text-white uppercase">
                VEPLEXITY
              </span>
            </Link>
            <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 border border-white/20 text-white font-mono uppercase font-bold">
              DASHBOARD
            </span>
          </div>

          <div className="flex items-center gap-5">
            <Link href="/bot" className="text-xs font-black uppercase tracking-wider text-zinc-400 hover:text-white transition-colors hidden sm:inline">
              BOT V2
            </Link>
            <Link href="/support" className="text-xs font-black uppercase tracking-wider text-pink-400 hover:text-pink-300 transition-colors hidden sm:inline flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 fill-pink-500" />
              <span>SUPPORT</span>
            </Link>

            {session?.user && (
              <div className="flex items-center gap-3 pl-3 border-l border-white/10">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 bg-zinc-900">
                  {session.user.image ? (
                    <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white">
                      {session.user.name?.charAt(0) || "U"}
                    </div>
                  )}
                </div>
                <span className="text-xs font-black text-zinc-200 hidden md:inline">
                  {session.user.name}
                </span>
                <button
                  onClick={() => signOut()}
                  title="Sign out"
                  className="p-1 rounded text-zinc-500 hover:text-red-400 transition-colors"
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
        <div className="fixed top-5 right-5 z-50 px-4 py-2.5 rounded border bg-zinc-900 border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-2 shadow-2xl">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-8">
        
        {/* Banner Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-white">SELECT A SERVER</h1>
            <p className="text-xs text-zinc-400 mt-1">
              Servers where you hold Administrator permissions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="FILTER SERVERS..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#0c0c0c] border border-white/15 focus:border-pink-500 rounded px-3.5 py-2 text-xs text-white placeholder-zinc-500 outline-none w-52 sm:w-64 font-mono font-bold tracking-wider transition-colors"
            />
            <button
              onClick={() => fetchGuilds(false)}
              title="Refresh server list"
              className="px-4 py-2 rounded bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-zinc-200 hover:text-white transition-colors flex items-center gap-2 text-xs font-black uppercase tracking-wider"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-pink-400" : ""}`} />
              <span className="hidden sm:inline">REFRESH</span>
            </button>
          </div>
        </div>

        {/* Support Callout */}
        <div className="p-6 rounded-lg bg-[#0c0c0c] border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
              <Heart className="w-5 h-5 fill-pink-500" />
            </div>
            <div>
              <div className="text-sm font-black uppercase text-white flex items-center gap-2">
                <span>SUPPORT 24/7 BOT INFRASTRUCTURE</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/20 font-bold">
                  COMMUNITY PATRONAGE
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1 font-normal">
                Back server operating costs directly on Buy Me a Coffee to unlock VIP Discord roles and priority queues.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://www.buymeacoffee.com/veplexity1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-wider text-xs transition-colors flex items-center gap-2"
            >
              <Heart className="w-3.5 h-3.5 fill-black" />
              <span>SUPPORT ON BMC</span>
            </a>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-24 flex flex-col items-center justify-center space-y-3">
            <div className="w-8 h-8 border-2 border-white/20 border-t-pink-500 rounded-full animate-spin" />
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-bold">
              SCANNING DISCORD SERVERS...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="p-5 rounded-lg bg-red-950/20 border border-red-500/30 text-red-300 flex items-center justify-between gap-4">
            <div>
              <p className="font-bold text-xs uppercase">FAILED TO RETRIEVE SERVERS</p>
              <p className="text-[11px] text-red-300/80 mt-0.5">{error}</p>
            </div>
            <button
              onClick={() => fetchGuilds()}
              className="px-4 py-2 rounded bg-red-500/20 hover:bg-red-500/30 text-xs font-black uppercase tracking-wider transition-colors"
            >
              RETRY
            </button>
          </div>
        )}

        {/* Server Grid */}
        {!loading && !error && (
          <>
            {filteredGuilds.length === 0 ? (
              <div className="py-16 text-center rounded-lg bg-[#0c0c0c] border border-white/10 p-8 space-y-3">
                <Server className="w-8 h-8 text-zinc-600 mx-auto" />
                <h3 className="text-sm font-black uppercase text-zinc-300">NO SERVERS FOUND</h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  {search ? "No servers match your filter." : "You do not currently manage any servers with Administrator permissions."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGuilds.map((guild) => (
                  <div
                    key={guild.id}
                    className="rounded-lg bg-[#0c0c0c] border border-white/10 hover:border-pink-500/50 transition-all p-6 flex flex-col justify-between gap-6"
                  >
                    {/* Server Info */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded bg-zinc-900 border border-white/15 overflow-hidden shrink-0 flex items-center justify-center font-black text-sm text-white">
                        {guild.iconUrl ? (
                          <img
                            src={guild.iconUrl}
                            alt={guild.name}
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.currentTarget.style.display = "none"); }}
                          />
                        ) : (
                          <span>{guild.name.slice(0, 2).toUpperCase()}</span>
                        )}
                      </div>

                      <div className="space-y-1.5 flex-1 min-w-0">
                        <h3 className="font-black text-base text-white truncate uppercase tracking-tight" title={guild.name}>
                          {guild.name}
                        </h3>

                        <div className="flex items-center gap-2 text-xs">
                          {guild.owner ? (
                            <span className="font-mono text-zinc-400 text-[10px] font-bold uppercase">OWNER</span>
                          ) : (
                            <span className="font-mono text-zinc-400 text-[10px] font-bold uppercase">ADMIN</span>
                          )}

                          <span className="text-zinc-600">•</span>

                          {guild.botJoined ? (
                            <span className="flex items-center gap-1 text-emerald-400 font-mono text-[10px] font-bold uppercase">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              ACTIVE
                            </span>
                          ) : (
                            <span className="text-zinc-500 font-mono text-[10px] uppercase font-bold">
                              NOT JOINED
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action */}
                    <div>
                      {guild.botJoined ? (
                        <Link
                          href={`/dashboard/${guild.id}`}
                          className="w-full py-3 px-4 rounded bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2"
                        >
                          <span>MANAGE SERVER</span>
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      ) : (
                        <a
                          href={`/invite?guild_id=${guild.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleInviteClick(guild.id, guild.name)}
                          className={`w-full py-3 px-4 rounded border text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
                            pendingGuildId === guild.id
                              ? "bg-zinc-900 border-pink-500/50 text-pink-400 animate-pulse"
                              : "bg-zinc-900 hover:bg-zinc-800 border-white/15 text-white"
                          }`}
                        >
                          {pendingGuildId === guild.id ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>DETECTING BOT...</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 text-pink-400" />
                              <span>ADD TO DISCORD</span>
                              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                            </>
                          )}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
