"use client";

import { use, useEffect, useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Radio, LayoutDashboard, Coffee, Volume2, VolumeX, 
  ArrowLeft, Save, CheckCircle2, AlertCircle, RotateCcw, 
  ChevronRight, ExternalLink, Shield, Users, Hash, Bell, 
  Sparkles, Check, Heart, HelpCircle
} from "lucide-react";
import { DiscordLogo } from "@/app/components/BrandIcons";
import { dashboardAudio } from "@/lib/dashboardAudio";
import { ServerDestinationReveal } from "@/app/components/ServerRevealTransition";
import { 
  SocialAlertsStudio, 
  NotificationsConfig 
} from "@/app/dashboard/[guildId]/components/SocialAlertsStudio";

interface GuildDetails {
  id: string;
  name: string;
  icon: string | null;
  ownerId: string;
  memberCount?: number;
  approximate_member_count?: number;
  roles: Array<{ id: string; name: string; color: number }>;
  channels: Array<{ id: string; name: string; type: number; parentId?: string }>;
  bots?: {
    veplexity: boolean;
    pingplex: boolean;
  };
  config?: any;
}

type TabType = "alerts" | "overview" | "perks";

function PingPlexGuildStudioInner({ params }: { params: Promise<{ guildId: string }> }) {
  const resolvedParams = use(params);
  const guildId = resolvedParams.guildId;
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<TabType>("alerts");
  const [guild, setGuild] = useState<GuildDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [soundOn, setSoundOn] = useState(dashboardAudio.enabled);

  // Gating Barrier State
  const [notInvited, setNotInvited] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Social Media Alerts Config
  const [notificationsConfig, setNotificationsConfig] = useState<NotificationsConfig>({
    enabled: true,
    channelId: null,
    pingRole: "@everyone",
    youtube: {
      enabled: true,
      target: "https://youtube.com/@VePlexity",
      message: "🔴 **{author}** just uploaded a new video: **{title}**!\nWatch here: {url}",
    },
    twitch: {
      enabled: true,
      target: "veplexity_live",
      message: "🟣 **{author}** is now LIVE on Twitch streaming **{game}**!\nWatch stream: {url}",
    },
    tiktok: {
      enabled: false,
      target: "@veplexity",
      message: "🎵 **{author}** posted a new TikTok: **{title}**!\nWatch: {url}",
    },
    twitter: {
      enabled: false,
      target: "veplexity",
      message: "🐦 **{author}** just posted on X:\n{url}",
    },
    reddit: {
      enabled: false,
      target: "r/veplexity",
      message: "📢 New post in **{author}**: **{title}**!\n{url}",
    },
  });

  const [initialSnapshot, setInitialSnapshot] = useState<string | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    if (type === "success") dashboardAudio.playSuccess();
    else dashboardAudio.playError();
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const populateFromConfig = (data: GuildDetails) => {
    if (data.config?.notifications) {
      const n = data.config.notifications;
      const parsed: NotificationsConfig = {
        enabled: Boolean(n.enabled ?? true),
        channelId: n.channelId || null,
        pingRole: n.pingRole || "@everyone",
        youtube: {
          enabled: Boolean(n.youtube?.enabled ?? true),
          target: n.youtube?.target || "https://youtube.com/@VePlexity",
          message: n.youtube?.message || "🔴 **{author}** just uploaded a new video: **{title}**!\nWatch here: {url}",
          channelId: n.youtube?.channelId || null,
          pingRole: n.youtube?.pingRole || null,
        },
        twitch: {
          enabled: Boolean(n.twitch?.enabled ?? true),
          target: n.twitch?.target || "veplexity_live",
          message: n.twitch?.message || "🟣 **{author}** is now LIVE on Twitch streaming **{game}**!\nWatch stream: {url}",
          channelId: n.twitch?.channelId || null,
          pingRole: n.twitch?.pingRole || null,
        },
        tiktok: {
          enabled: Boolean(n.tiktok?.enabled ?? false),
          target: n.tiktok?.target || "@veplexity",
          message: n.tiktok?.message || "🎵 **{author}** posted a new TikTok: **{title}**!\nWatch: {url}",
          channelId: n.tiktok?.channelId || null,
          pingRole: n.tiktok?.pingRole || null,
        },
        twitter: {
          enabled: Boolean(n.twitter?.enabled ?? false),
          target: n.twitter?.target || "veplexity",
          message: n.twitter?.message || "🐦 **{author}** just posted on X:\n{url}",
          channelId: n.twitter?.channelId || null,
          pingRole: n.twitter?.pingRole || null,
        },
        reddit: {
          enabled: Boolean(n.reddit?.enabled ?? false),
          target: n.reddit?.target || "r/veplexity",
          message: n.reddit?.message || "📢 New post in **{author}**: **{title}**!\n{url}",
          channelId: n.reddit?.channelId || null,
          pingRole: n.reddit?.pingRole || null,
        },
      };
      setNotificationsConfig(parsed);
      setInitialSnapshot(JSON.stringify(parsed));
    } else {
      setInitialSnapshot(JSON.stringify(notificationsConfig));
    }
  };

  const currentSnapshot = useMemo(() => {
    return JSON.stringify(notificationsConfig);
  }, [notificationsConfig]);

  const hasUnsavedChanges = useMemo(() => {
    if (!initialSnapshot) return false;
    return initialSnapshot !== currentSnapshot;
  }, [initialSnapshot, currentSnapshot]);

  const fetchGuildData = async () => {
    try {
      setLoading(true);
      setNotInvited(false);
      setFetchError(null);
      const res = await fetch(`/api/pingplex/guilds/${guildId}`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        if (res.status === 404 || err.notInvited) {
          setNotInvited(true);
          setFetchError(err.error || "PingPlex is not a member of this server.");
          return;
        }
        throw new Error(err.error || "Failed to load guild details");
      }
      const data: GuildDetails = await res.json();
      if (!data.bots?.pingplex && !data.bot?.joined) {
        setNotInvited(true);
        setFetchError("PingPlex is not currently a member of this server.");
        setGuild(data);
        return;
      }
      setGuild(data);
      populateFromConfig(data);
    } catch (err: any) {
      console.error("[PingPlexStudio] Fetch error:", err);
      setFetchError(err.message || "Could not connect to bot backend");
      showToast(err.message || "Could not connect to bot backend", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuildData();
  }, [guildId]);

  const handleReset = () => {
    if (guild) populateFromConfig(guild);
    showToast("Changes reset to saved values.");
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const payload = {
        notifications: notificationsConfig,
      };

      const res = await fetch(`/api/pingplex/guilds/${guildId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to commit settings");
      }

      showToast("Creator alert settings saved successfully!");
      fetchGuildData();
    } catch (err: any) {
      showToast(err.message || "Failed to save configuration", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleSendTestNotification = async (platform: string, channelId: string) => {
    try {
      const res = await fetch(`/api/pingplex/guilds/${guildId}/notifications/test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, channelId }),
      });
      const data = await res.json();
      showToast(data.message || `Test alert dispatched to #${channelId}!`);
    } catch (e: any) {
      showToast(e.message || "Failed to dispatch test notification", "error");
    }
  };

  const guildInitials = guild?.name
    ? guild.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .substring(0, 3)
        .toUpperCase()
    : "PX";

  const guildIconUrl = guild?.icon
    ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=128`
    : null;

  const activeFeedsCount = [
    notificationsConfig.youtube.enabled,
    notificationsConfig.twitch.enabled,
    notificationsConfig.tiktok.enabled,
    notificationsConfig.twitter.enabled,
    notificationsConfig.reddit.enabled,
  ].filter(Boolean).length;

  if (loading && !guild && !notInvited) {
    return (
      <main className="min-h-screen bg-[#090a0f] text-white flex flex-col font-sans">
        <header className="h-16 border-b border-zinc-800/80 bg-[#0c0d14] px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-800 animate-pulse" />
            <div className="w-32 h-4 rounded bg-zinc-800 animate-pulse" />
          </div>
          <div className="w-24 h-8 rounded-lg bg-zinc-800 animate-pulse" />
        </header>
        <div className="flex-1 flex overflow-hidden">
          <aside className="w-64 border-r border-zinc-800 bg-[#0c0d14] p-4 space-y-3 hidden md:block">
            <div className="w-full h-8 rounded-lg bg-zinc-800 animate-pulse" />
            <div className="w-full h-8 rounded-lg bg-zinc-800 animate-pulse" />
            <div className="w-full h-8 rounded-lg bg-zinc-800 animate-pulse" />
          </aside>
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            <div className="w-full h-32 rounded-2xl bg-zinc-900/80 border border-zinc-800 animate-pulse" />
            <div className="w-full h-80 rounded-2xl bg-zinc-900/80 border border-zinc-800 animate-pulse" />
          </div>
        </div>
      </main>
    );
  }

  // ─── GATING BARRIER: PINGPLEX NOT CONNECTED TO GUILD ───────────────────────
  if (notInvited) {
    return (
      <main className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col font-sans">
        {/* Navigation Header */}
        <header className="border-b border-zinc-800/80 bg-[#0c0d14] sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/discord-bots/pingplex"
                className="flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white px-2.5 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition"
              >
                <ArrowLeft className="w-4 h-4 text-zinc-400" />
                <span>Return to Servers</span>
              </Link>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/30 text-fuchsia-300 font-mono uppercase font-bold">
                PINGPLEX REQUIRED
              </span>
            </div>
            <div className="flex items-center gap-3 font-mono text-xs text-zinc-500">
              <span>GUILD ID: {guildId}</span>
            </div>
          </div>
        </header>

        {/* Gating Barrier Container */}
        <div className="flex-1 max-w-xl w-full mx-auto px-4 sm:px-6 py-12 flex flex-col items-center justify-center space-y-8">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/30 mx-auto flex items-center justify-center text-fuchsia-400 shadow-xl shadow-fuchsia-500/10 mb-4">
              <Radio className="w-8 h-8" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              PingPlex Not Connected
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
              PingPlex is not currently a member of this Discord server. Invite PingPlex to unlock 24/7 automated creator stream & video alerts for YouTube, Twitch, TikTok, X, and Reddit.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d0f17] border border-fuchsia-500/30 w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-400">
                  <Radio className="w-5 h-5 text-fuchsia-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">PingPlex Creator Bot</h3>
                  <p className="text-[11px] text-zinc-400 font-mono">Client ID: 1559520031916687430</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30 font-bold">
                ALERTS PERMS
              </span>
            </div>

            <a
              href={`/invite/pingplex?guild_id=${guildId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white text-xs font-black transition-all flex items-center justify-between cursor-pointer shadow-lg shadow-fuchsia-600/20 active:scale-98"
            >
              <span className="tracking-wider uppercase">INVITE PINGPLEX</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </a>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={() => fetchGuildData()}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Re-check Connection</span>
            </button>
            <Link
              href="/discord-bots/pingplex"
              className="px-4 py-2 rounded-xl text-zinc-500 hover:text-zinc-300 text-xs font-semibold transition"
            >
              Select Another Server
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col bg-[#090a0f] text-[#f4f4f5] font-sans overflow-hidden relative">
      {/* Shared-Element Destination Reveal Veil */}
      <ServerDestinationReveal
        isReady={!loading && Boolean(guild)}
        fallbackServerName={guild?.name}
        fallbackServerIcon={guildIconUrl}
      />

      {/* Toast Alert */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-2.5 rounded-lg border text-xs font-semibold flex items-center gap-2.5 shadow-xl transition-all ${
            toast.type === "success"
              ? "bg-[#1e0f24] border-fuchsia-500/40 text-fuchsia-200"
              : "bg-[#2a1015] border-rose-500/40 text-rose-200"
          }`}
        >
          {toast.type === "success" ? <CheckCircle2 className="w-4 h-4 text-fuchsia-400" /> : <AlertCircle className="w-4 h-4 text-rose-400" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* ─── TOP APP HEADER ──────────────────────────────────────────────── */}
      <header className="h-16 shrink-0 border-b border-zinc-800 bg-[#0c0d14] px-4 sm:px-6 flex items-center justify-between z-30">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/discord-bots/pingplex"
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-white px-2.5 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition"
            title="Return to Server Selection"
          >
            <ArrowLeft className="w-4 h-4 text-zinc-400" />
            <span className="hidden sm:inline">Servers</span>
          </Link>

          <div className="h-5 w-px bg-zinc-800 hidden sm:block" />

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 overflow-hidden flex items-center justify-center font-bold text-sm text-zinc-300 shrink-0">
              {guildIconUrl ? (
                <img
                  src={guildIconUrl}
                  alt={guild?.name || "Server"}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.currentTarget.style.display = "none"); }}
                />
              ) : (
                <span className="font-mono text-base">{guildInitials}</span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base text-white truncate max-w-xs sm:max-w-sm">{guild?.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-fuchsia-500/15 text-fuchsia-300 font-mono hidden md:inline-flex items-center gap-1.5 border border-fuchsia-500/40 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-pulse" />
                  PINGPLEX STUDIO
                </span>
              </div>
              <p className="text-[10px] font-mono text-fuchsia-400/90 hidden sm:block">
                📡 Dedicated Social Media Alerts Engine
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              const next = dashboardAudio.toggleSound();
              setSoundOn(next);
            }}
            className={`px-2.5 py-1.5 rounded-md border text-xs flex items-center gap-1.5 transition cursor-pointer font-mono ${
              soundOn
                ? "bg-zinc-800 border-zinc-700 text-zinc-200"
                : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300"
            }`}
            title="Toggle Dashboard Sound Effects"
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5 text-fuchsia-400" /> : <VolumeX className="w-3.5 h-3.5 text-zinc-500" />}
            <span className="hidden md:inline text-[11px] font-semibold">
              {soundOn ? "SFX ON" : "SFX MUTED"}
            </span>
          </button>

          <a
            href="https://www.discord.gg/R6ZrqpWEcc"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition text-xs flex items-center gap-1.5 font-semibold"
            title="Join Official Discord Community"
          >
            <DiscordLogo className="w-3.5 h-3.5 text-[#5865F2]" />
            <span className="hidden sm:inline">Discord</span>
          </a>

          <a
            href="https://www.buymeacoffee.com/veplexity1"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-90 hover:scale-105 transition-all"
            title="Support Creator on Buy Me a Coffee"
          >
            <img src="/bmc/SVG Files/bmc-button.svg" alt="Buy Me a Coffee" className="h-8 w-auto rounded-lg shadow-sm" />
          </a>

          <button
            onClick={handleSave}
            disabled={saving || !hasUnsavedChanges}
            className={`py-1.5 px-3.5 sm:px-4 rounded-md font-semibold text-xs sm:text-sm transition flex items-center gap-2 ${
              hasUnsavedChanges
                ? "bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold cursor-pointer shadow-sm"
                : "bg-zinc-800 text-zinc-500 border border-zinc-700/60 cursor-not-allowed opacity-60"
            }`}
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </header>

      {/* Main Studio Body */}
      <div className="flex-1 flex overflow-hidden w-full relative">
        {/* ─── LEFT NAVIGATION SIDEBAR ─────────────────────────────────── */}
        <aside className="w-60 lg:w-64 shrink-0 border-r border-zinc-800 bg-[#0c0d14] flex flex-col justify-between overflow-y-auto p-3 z-20">
          <div className="space-y-4">
            <div>
              <p className="px-3 text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold mb-2">
                CREATOR ENGINE
              </p>
              <nav className="space-y-1">
                <button
                  onClick={() => {
                    dashboardAudio.playClick();
                    setActiveTab("alerts");
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-all cursor-pointer select-none ${
                    activeTab === "alerts"
                      ? "bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30 shadow-xs"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/60 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {activeTab === "alerts" && (
                      <span className="w-1 h-4 rounded-full bg-fuchsia-400 shrink-0" />
                    )}
                    <Radio className={`w-4 h-4 shrink-0 ${activeTab === "alerts" ? "text-fuchsia-400" : "text-zinc-500"}`} />
                    <span>Social Media Alerts</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-300 font-bold">
                    {activeFeedsCount} ACTIVE
                  </span>
                </button>

                <button
                  onClick={() => {
                    dashboardAudio.playClick();
                    setActiveTab("overview");
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-all cursor-pointer select-none ${
                    activeTab === "overview"
                      ? "bg-purple-500/15 text-purple-300 border border-purple-500/30 shadow-xs"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/60 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {activeTab === "overview" && (
                      <span className="w-1 h-4 rounded-full bg-purple-400 shrink-0" />
                    )}
                    <LayoutDashboard className={`w-4 h-4 shrink-0 ${activeTab === "overview" ? "text-purple-400" : "text-zinc-500"}`} />
                    <span>Server Overview</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    dashboardAudio.playClick();
                    setActiveTab("perks");
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-all cursor-pointer select-none ${
                    activeTab === "perks"
                      ? "bg-yellow-500/15 text-yellow-300 border border-yellow-500/30 shadow-xs"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/60 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {activeTab === "perks" && (
                      <span className="w-1 h-4 rounded-full bg-yellow-400 shrink-0" />
                    )}
                    <Coffee className={`w-4 h-4 shrink-0 ${activeTab === "perks" ? "text-yellow-400" : "text-zinc-500"}`} />
                    <span>VIP Perks & Support</span>
                  </div>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-400 font-bold">
                    VIP
                  </span>
                </button>
              </nav>
            </div>

            {/* VePlexity Bot Cross-Promotion Card */}
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-blue-950/30 via-zinc-900 to-zinc-950 border border-blue-500/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                <span>Need 24/7 Music & AutoMod?</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Add <strong>VePlexity Bot</strong> to this server for lossless audio DJ, leveling, and full automations.
              </p>
              <a
                href={`/invite?guild_id=${guildId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-1.5 px-2.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Invite VePlexity Bot</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800/80 text-[11px] text-zinc-500 font-mono space-y-1">
            <p className="font-semibold text-zinc-400">PingPlex v2.4</p>
            <p>100% Focused Creator Studio</p>
          </div>
        </aside>

        {/* ─── MAIN CONTENT PANE ───────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#090a0f]">
          {activeTab === "alerts" && (
            <div className="max-w-6xl mx-auto space-y-6">
              <SocialAlertsStudio
                channels={guild?.channels || []}
                roles={guild?.roles || []}
                guildId={guildId}
                config={notificationsConfig}
                onChange={setNotificationsConfig}
                onSendTest={handleSendTestNotification}
                isPingPlexMode={true}
              />
            </div>
          )}

          {activeTab === "overview" && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0d0f17] border border-zinc-800 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-800 border border-zinc-700 overflow-hidden flex items-center justify-center font-black text-xl text-zinc-300 shrink-0">
                      {guildIconUrl ? (
                        <img src={guildIconUrl} alt={guild?.name} className="w-full h-full object-cover" />
                      ) : (
                        <span>{guildInitials}</span>
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-white">{guild?.name}</h2>
                      <p className="text-xs font-mono text-zinc-400 mt-0.5">GUILD ID: {guild?.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/40 text-fuchsia-300 font-mono text-xs font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
                      PINGPLEX ACTIVE
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                    <span className="text-[11px] font-mono text-zinc-500 uppercase font-bold">TOTAL MEMBERS</span>
                    <p className="text-2xl font-black text-white">{guild?.approximate_member_count || guild?.memberCount || "Connected"}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                    <span className="text-[11px] font-mono text-zinc-500 uppercase font-bold">ACTIVE CHANNELS</span>
                    <p className="text-2xl font-black text-white">{guild?.channels?.length || 0}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                    <span className="text-[11px] font-mono text-zinc-500 uppercase font-bold">CONFIGURED FEEDS</span>
                    <p className="text-2xl font-black text-fuchsia-400">{activeFeedsCount} / 5</p>
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Social Alert Feeds Status
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      { name: "YouTube", cfg: notificationsConfig.youtube, desc: "New video uploads & premieres" },
                      { name: "Twitch", cfg: notificationsConfig.twitch, desc: "Instant live stream broadcasts" },
                      { name: "TikTok", cfg: notificationsConfig.tiktok, desc: "New TikTok videos" },
                      { name: "X (Twitter)", cfg: notificationsConfig.twitter, desc: "Tweets & creator posts" },
                      { name: "Reddit", cfg: notificationsConfig.reddit, desc: "Subreddit posts & alerts" },
                    ].map((feed) => (
                      <div
                        key={feed.name}
                        className={`p-3.5 rounded-xl border flex items-center justify-between ${
                          feed.cfg.enabled
                            ? "bg-fuchsia-500/10 border-fuchsia-500/30 text-white"
                            : "bg-zinc-900/40 border-zinc-800 text-zinc-500"
                        }`}
                      >
                        <div>
                          <p className="font-bold text-xs">{feed.name}</p>
                          <p className="text-[10px] text-zinc-400 font-mono truncate max-w-[180px]">
                            {feed.cfg.enabled ? feed.cfg.target : "Disabled"}
                          </p>
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          feed.cfg.enabled ? "bg-fuchsia-500/20 text-fuchsia-300" : "bg-zinc-800 text-zinc-500"
                        }`}>
                          {feed.cfg.enabled ? "ACTIVE" : "OFF"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <button
                    onClick={() => setActiveTab("alerts")}
                    className="py-2.5 px-4 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer"
                  >
                    <Radio className="w-4 h-4" />
                    <span>Configure Creator Alert Feeds</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "perks" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0d0f17] border border-yellow-500/20 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
                    <Coffee className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white">VIP Perks & Supporter Status</h2>
                    <p className="text-xs text-zinc-400">Claim exclusive perks, VIP Discord roles, and priority support.</p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-yellow-500/5 border border-yellow-500/20 space-y-3">
                  <h3 className="font-bold text-sm text-yellow-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Included Supporter Benefits</span>
                  </h3>
                  <ul className="text-xs text-zinc-300 space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-yellow-400 shrink-0" />
                      <span>Zero rate-limits and instant sub-second creator notification dispatch.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-yellow-400 shrink-0" />
                      <span>Exclusive VIP Supporter role in the official VePlexity Point community.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-yellow-400 shrink-0" />
                      <span>Priority feature requests and early access to upcoming creator features.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href="https://www.buymeacoffee.com/veplexity1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto py-3 px-6 rounded-xl bg-[#FFDD00] hover:bg-[#ffea4d] text-zinc-950 text-xs font-black transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Coffee className="w-4 h-4" />
                    <span>Support on Buy Me a Coffee</span>
                  </a>
                  <a
                    href="https://www.discord.gg/R6ZrqpWEcc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto py-3 px-6 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition flex items-center justify-center gap-2"
                  >
                    <DiscordLogo className="w-4 h-4 text-[#5865F2]" />
                    <span>Join Discord Community</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Floating Unsaved Changes Bar */}
      {hasUnsavedChanges && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-700 shadow-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
              <p className="text-xs font-medium text-zinc-200">
                You have unsaved alert configuration changes!
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                disabled={saving}
                className="py-1 px-3 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs transition cursor-pointer"
              >
                Reset
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="py-1 px-3.5 rounded-md bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-semibold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{saving ? "Saving..." : "Save Changes"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PingPlexGuildStudio({ params }: { params: Promise<{ guildId: string }> }) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#090a0f] text-white flex flex-col font-sans">
          <header className="h-16 border-b border-zinc-800/80 bg-[#0c0d14] px-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 animate-pulse" />
              <div className="w-32 h-4 rounded bg-zinc-800 animate-pulse" />
            </div>
            <div className="w-24 h-8 rounded-lg bg-zinc-800 animate-pulse" />
          </header>
          <div className="flex-1 flex overflow-hidden">
            <aside className="w-64 border-r border-zinc-800 bg-[#0c0d14] p-4 space-y-3 hidden md:block">
              <div className="w-full h-8 rounded-lg bg-zinc-800 animate-pulse" />
            </aside>
            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
              <div className="w-full h-28 rounded-2xl bg-zinc-900/80 border border-zinc-800 animate-pulse" />
            </div>
          </div>
        </main>
      }
    >
      <PingPlexGuildStudioInner params={params} />
    </Suspense>
  );
}
