"use client";

import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { 
  Server, Plus, ArrowRight, RefreshCw, 
  ExternalLink, LogOut, CheckCircle2, ChevronRight, Bot, Coffee 
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
      <main className="min-h-screen bg-[#08040d] text-[#fafafa] flex flex-col justify-center items-center px-4 relative">
        <div className="max-w-md w-full p-8 rounded-xl bg-[#0e0717] border border-fuchsia-500/30 text-center space-y-6 shadow-2xl">
          <div className="w-14 h-14 rounded-xl bg-[#150a22] border border-fuchsia-500/40 mx-auto p-2 flex items-center justify-center">
            <img 
              src="/vp-logo-icon.png" 
              alt="VePlexity" 
              className="w-full h-full object-contain" 
              onError={(e) => { e.currentTarget.style.display = 'none'; }} 
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black tracking-tight text-white">
              VePlexity Command Center<span className="text-fuchsia-500">.</span>
            </h1>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Sign in with your Discord account to manage servers, assign roles, and configure bot settings.
            </p>
          </div>

          <button
            onClick={() => signIn("discord")}
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-orange-500 to-fuchsia-600 hover:from-orange-400 hover:to-fuchsia-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-fuchsia-600/25"
          >
            <span>Login with Discord</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <Link href="/" className="inline-block text-xs text-zinc-400 hover:text-white transition-colors font-mono">
            ← Return to Overview
          </Link>
        </div>
      </main>
    );
  }

  // ─── AUTHENTICATED SERVER SELECTOR ──────────────────────────────────────────
  return (
    <main className="min-h-screen bg-[#08040d] text-[#fafafa] flex flex-col font-sans">
      {/* Navigation Header */}
      <header className="border-b border-fuchsia-500/15 bg-[#08040d]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#12081d] border border-fuchsia-500/30 p-1 flex items-center justify-center">
                <img 
                  src="/vp-logo-icon.png" 
                  alt="VP" 
                  className="w-full h-full object-contain" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                />
              </div>
              <span className="font-bold text-sm tracking-tight text-white">
                VePlexity<span className="text-fuchsia-500">.</span>
              </span>
            </Link>
            <span className="text-[10px] px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono uppercase">
              Dashboard
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/bot" className="text-xs text-zinc-300 hover:text-white transition-colors hidden sm:inline">
              Bot Architecture
            </Link>
            <Link href="/support" className="text-xs text-amber-300 hover:text-amber-200 transition-colors hidden sm:inline flex items-center gap-1">
              <Coffee className="w-3.5 h-3.5 text-amber-400" />
              <span>Support</span>
            </Link>

            {session?.user && (
              <div className="flex items-center gap-3 pl-2 border-l border-white/10">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-fuchsia-500/40 bg-[#150a22]">
                  {session.user.image ? (
                    <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white">
                      {session.user.name?.charAt(0) || "U"}
                    </div>
                  )}
                </div>
                <span className="text-xs font-medium text-zinc-200 hidden md:inline">
                  {session.user.name}
                </span>
                <button
                  onClick={() => signOut()}
                  title="Sign out"
                  className="p-1 rounded text-zinc-400 hover:text-red-400 transition-colors"
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
        <div className="fixed top-5 right-5 z-50 px-4 py-2.5 rounded-lg border bg-[#0e0717] border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center gap-2 shadow-xl">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex-1 w-full space-y-8">
        
        {/* Banner Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-fuchsia-500/15 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Select a Server</h1>
            <p className="text-xs text-zinc-400 mt-1">
              Servers where you hold Administrator permissions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Filter servers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#0e0717] border border-white/10 focus:border-fuchsia-500/50 rounded-lg px-3.5 py-2 text-xs text-white placeholder-zinc-500 outline-none w-52 sm:w-64 transition-colors"
            />
            <button
              onClick={() => fetchGuilds(false)}
              title="Refresh server list"
              className="px-3.5 py-2 rounded-lg bg-[#150a22] hover:bg-[#1b0d2c] border border-fuchsia-500/20 text-zinc-200 hover:text-white transition-colors flex items-center gap-2 text-xs font-semibold"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-orange-400" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Support Callout */}
        <div className="p-5 rounded-xl bg-[#0e0717] border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>Support 24/7 Bot Infrastructure</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  PATRONAGE
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Back server operating costs directly on Buy Me a Coffee to unlock VIP Discord roles and priority queues.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://www.buymeacoffee.com/veplexity1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-amber-400/20"
            >
              <Coffee className="w-3.5 h-3.5" />
              <span>Support on BMC</span>
            </a>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <div className="w-8 h-8 border-2 border-fuchsia-500/20 border-t-fuchsia-500 rounded-full animate-spin" />
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
              Scanning Discord servers...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 text-red-300 flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-xs">Failed to retrieve servers</p>
              <p className="text-[11px] text-red-300/80 mt-0.5">{error}</p>
            </div>
            <button
              onClick={() => fetchGuilds()}
              className="px-3.5 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-xs font-medium transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Server Grid */}
        {!loading && !error && (
          <>
            {filteredGuilds.length === 0 ? (
              <div className="py-16 text-center rounded-xl bg-[#0e0717] border border-white/10 p-8 space-y-3">
                <Server className="w-8 h-8 text-zinc-600 mx-auto" />
                <h3 className="text-sm font-semibold text-zinc-300">No servers found</h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  {search ? "No servers match your filter." : "You do not currently manage any servers with Administrator permissions."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredGuilds.map((guild) => (
                  <div
                    key={guild.id}
                    className="rounded-xl bg-[#0e0717] border border-white/10 hover:border-fuchsia-500/40 hover:bg-[#12091e] transition-all p-5 flex flex-col justify-between gap-5 shadow-lg shadow-black/30"
                  >
                    {/* Server Info */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-[#180d28] border border-fuchsia-500/30 overflow-hidden shrink-0 flex items-center justify-center font-bold text-sm text-fuchsia-300">
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

                      <div className="space-y-1 flex-1 min-w-0">
                        <h3 className="font-bold text-base text-white truncate" title={guild.name}>
                          {guild.name}
                        </h3>

                        <div className="flex items-center gap-2 text-xs">
                          {guild.owner ? (
                            <span className="font-mono text-amber-400 text-[11px]">Owner</span>
                          ) : (
                            <span className="font-mono text-zinc-400 text-[11px]">Admin</span>
                          )}

                          <span>•</span>

                          {guild.botJoined ? (
                            <span className="flex items-center gap-1 text-emerald-400 font-mono text-[11px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              Active
                            </span>
                          ) : (
                            <span className="text-zinc-500 font-mono text-[11px]">
                              Not Joined
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
                          className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-orange-500 to-fuchsia-600 hover:from-orange-400 hover:to-fuchsia-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-fuchsia-600/20"
                        >
                          <span>Manage Server</span>
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      ) : (
                        <a
                          href={`/invite?guild_id=${guild.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleInviteClick(guild.id, guild.name)}
                          className={`w-full py-2.5 px-4 rounded-lg border text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                            pendingGuildId === guild.id
                              ? "bg-fuchsia-600/20 border-fuchsia-500/50 text-fuchsia-300 animate-pulse"
                              : "bg-[#150a22] hover:bg-[#1a0e2a] border-fuchsia-500/20 text-zinc-200 hover:text-white"
                          }`}
                        >
                          {pendingGuildId === guild.id ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 text-fuchsia-400 animate-spin" />
                              <span>Detecting bot...</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 text-orange-400" />
                              <span>Add to Discord</span>
                              <ExternalLink className="w-3 h-3 text-zinc-500" />
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
