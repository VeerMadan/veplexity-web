"use client";

import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { 
  Shield, Server, Plus, ArrowRight, RefreshCw, 
  ExternalLink, Sparkles, LogOut, CheckCircle2, ChevronRight
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

  // 🔄 Automatic Recheck when user returns to this tab after adding bot in Discord
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

  // 🚀 Active smart poller when "Add to Discord" is clicked
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
              setToast(`🎉 VePlexity successfully connected to ${guildName}!`);
              setTimeout(() => setToast(null), 6000);
            }
          }
        }
      } catch (e) {
        // Silent background catch
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
      <main className="min-h-screen bg-[#070308] text-white flex flex-col justify-center items-center px-4 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-fuchsia-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-md w-full p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl text-center space-y-6">
          <div className="relative w-28 h-auto mx-auto drop-shadow-[0_0_25px_rgba(217,70,239,0.5)]">
            <img src="/vp-logo-icon.png" alt="VePlexity" className="w-full h-auto object-contain" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              VePlexity Command Center
            </h1>
            <p className="text-sm text-gray-400 leading-relaxed">
              Sign in with your Discord account to manage servers, set up moderator roles, and configure automated welcomers.
            </p>
          </div>

          <button
            onClick={() => signIn("discord")}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-semibold text-sm transition-all shadow-lg shadow-fuchsia-600/25 flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <span>Login with Discord</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <Link href="/" className="inline-block text-xs text-gray-500 hover:text-gray-300 transition-colors">
            ← Back to VePlexity Home
          </Link>
        </div>
      </main>
    );
  }

  // ─── AUTHENTICATED SERVER SELECTOR ──────────────────────────────────────────
  return (
    <main className="min-h-screen bg-[#070308] text-white flex flex-col font-sans relative overflow-x-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="border-b border-white/5 bg-[#070308]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="w-full px-6 sm:px-10 lg:px-16 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <img src="/vp-logo-icon.png" alt="VP" className="w-9 h-auto object-contain drop-shadow-[0_0_12px_rgba(217,70,239,0.5)]" />
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
                VePlexity
              </span>
            </Link>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 font-medium">
              Dashboard
            </span>
          </div>

          <div className="flex items-center gap-4">
            {session?.user && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 bg-white/5">
                  {session.user.image ? (
                    <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-bold text-fuchsia-400">
                      {session.user.name?.charAt(0) || "U"}
                    </div>
                  )}
                </div>
                <span className="text-sm font-medium text-gray-300 hidden sm:inline">
                  {session.user.name}
                </span>
                <button
                  onClick={() => signOut()}
                  title="Sign out"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Toast Alert Banner */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl border bg-[#182a20] border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-3 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Main Container - Full Width */}
      <div className="w-full px-6 sm:px-10 lg:px-16 py-10 flex-1 space-y-8">
        {/* Banner Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight">Select a Server</h1>
            <p className="text-sm text-gray-400">
              Manage your Discord servers, assign moderator roles, and configure automated welcome cards.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Filter servers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 focus:border-fuchsia-500/50 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 outline-none w-52 sm:w-64 transition-colors"
            />
            <button
              onClick={() => fetchGuilds(false)}
              title="Refresh server list"
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-colors flex items-center gap-2 text-xs font-medium"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-fuchsia-400" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Community & Buy Me a Coffee Support Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-fuchsia-950/40 via-purple-950/30 to-amber-950/20 border border-fuchsia-500/20 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-fuchsia-600/10 rounded-full blur-[90px] pointer-events-none" />

          <div className="flex items-center gap-5 z-10">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 p-2 shrink-0 flex items-center justify-center shadow-lg">
              <img src="/bmc/bmc-logo-yellow.png" alt="BMC" className="w-12 h-12 object-contain" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-base text-white">Join the Community & Fuel 24/7 Hosting</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                  VIP Perks
                </span>
              </div>
              <p className="text-xs text-gray-300 max-w-xl leading-relaxed">
                Unlock exclusive server commands, 24/7 lossless music radio, and supporter roles by joining our official Discord or buying a coffee!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 z-10 w-full sm:w-auto flex-wrap sm:flex-nowrap">
            <a
              href="https://www.discord.gg/R6ZrqpWEcc"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold text-xs transition flex items-center justify-center gap-2"
            >
              <span>Join VePlexity Point</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://www.buymeacoffee.com/veplexity1"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <span>☕ Support on BMC</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-24 flex flex-col items-center justify-center space-y-3">
            <div className="w-10 h-10 border-2 border-fuchsia-500/20 border-t-fuchsia-500 rounded-full animate-spin" />
            <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">
              Scanning your Discord servers...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-sm">Failed to retrieve servers</p>
              <p className="text-xs text-red-300/80 mt-0.5">{error}</p>
            </div>
            <button
              onClick={fetchGuilds}
              className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-xs font-medium transition-colors shrink-0"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Server Grid */}
        {!loading && !error && (
          <>
            {filteredGuilds.length === 0 ? (
              <div className="py-20 text-center rounded-3xl bg-white/[0.02] border border-white/5 p-8 space-y-4">
                <Server className="w-12 h-12 text-gray-600 mx-auto" />
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-gray-300">No servers found</h3>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    {search ? "No servers match your search filter." : "You do not currently own or manage any Discord servers with Administrator privileges."}
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredGuilds.map((guild) => (
                  <div
                    key={guild.id}
                    className="group relative rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-fuchsia-500/30 transition-all p-5 flex flex-col justify-between gap-5 shadow-lg shadow-black/20"
                  >
                    {/* Server Info */}
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-600/20 via-white/5 to-purple-800/20 border border-white/10 overflow-hidden shrink-0 flex items-center justify-center font-bold text-base text-fuchsia-400 shadow-inner">
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
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-base text-white truncate" title={guild.name}>
                            {guild.name}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap text-xs">
                          {guild.owner ? (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-medium">
                              👑 Owner
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-medium">
                              🛡️ Admin
                            </span>
                          )}

                          {guild.botJoined ? (
                            <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              Active
                            </span>
                          ) : (
                            <span className="text-[11px] text-gray-500">
                              Not Joined
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div>
                      {guild.botJoined ? (
                        <Link
                          href={`/dashboard/${guild.id}`}
                          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-fuchsia-600/20 group-hover:scale-[1.01]"
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
                          className={`w-full py-2.5 px-4 rounded-xl border text-xs font-medium transition-all flex items-center justify-center gap-2 ${
                            pendingGuildId === guild.id
                              ? "bg-fuchsia-600/20 border-fuchsia-500/50 text-fuchsia-300 animate-pulse"
                              : "bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-gray-200 hover:text-white"
                          }`}
                        >
                          {pendingGuildId === guild.id ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 text-fuchsia-400 animate-spin" />
                              <span>Detecting bot connection...</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 text-fuchsia-400" />
                              <span>Add to Discord</span>
                              <ExternalLink className="w-3 h-3 text-gray-500" />
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
