"use client";

import { useEffect, useState, use, useMemo } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { 
  Shield, Bell, Bot, Music, Check, Sparkles, AlertCircle, 
  ArrowLeft, Save, RefreshCw, CheckCircle2, ChevronRight, Hash, 
  Volume2, Sliders, UserPlus, Megaphone, Lock, Star, Mic, RotateCcw,
  SlidersHorizontal, Radio, Send, ExternalLink, Gamepad2, Cake
} from "lucide-react";

interface RoleItem {
  id: string;
  name: string;
  color: number;
  position: number;
  managed: boolean;
}

interface ChannelItem {
  id: string;
  name: string;
  type: number;
  parentId?: string | null;
}

interface GuildConfig {
  modRoles: string[];
  modLogChannel: string | null;
  welcome: {
    enabled: boolean;
    channelId: string | null;
    message: string;
    autoRoleId?: string | null;
  };
  chatbot: {
    enabled: boolean;
    channelId: string | null;
    mode: string;
  };
  music: {
    djRole: string | null;
    defaultVolume: number;
  };
  tempVc?: {
    hubChannelId?: string | null;
    categoryId?: string | null;
  } | null;
  starboard?: {
    channelId?: string | null;
    minStars?: number;
  } | null;
  autoMod?: {
    antiInvite: boolean;
    antiSpam: boolean;
    antiBadWords: boolean;
  };
  counting?: {
    channelId?: string | null;
  } | null;
  birthday?: {
    channelId?: string | null;
  } | null;
}

interface GuildDetails {
  id: string;
  name: string;
  icon: string | null;
  memberCount: number;
  roles: RoleItem[];
  channels: {
    text: ChannelItem[];
    voice: ChannelItem[];
    categories: ChannelItem[];
  };
  config: GuildConfig;
  recommendations: {
    modLogChannelId: string | null;
    welcomeChannelId: string | null;
    chatbotChannelId: string | null;
  };
}

type TabType = "overview" | "moderation" | "automod" | "welcome" | "ai" | "music" | "tempvc" | "community" | "starboard" | "announce";

export default function GuildDashboard({ params }: { params: Promise<{ guildId: string }> }) {
  const resolvedParams = use(params);
  const guildId = resolvedParams.guildId;
  const { data: session } = useSession();

  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [guild, setGuild] = useState<GuildDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Form State
  const [modRoles, setModRoles] = useState<string[]>([]);
  const [modLogChannel, setModLogChannel] = useState<string>("");
  const [welcomeEnabled, setWelcomeEnabled] = useState(false);
  const [welcomeChannel, setWelcomeChannel] = useState<string>("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [autoRoleId, setAutoRoleId] = useState<string>("");
  const [aiEnabled, setAiEnabled] = useState(false);
  const [aiChannel, setAiChannel] = useState<string>("");
  const [aiMode, setAiMode] = useState("standard");
  const [djRole, setDjRole] = useState<string>("");
  const [defaultVolume, setDefaultVolume] = useState<number>(100);
  const [tempVcHub, setTempVcHub] = useState<string>("");
  const [tempVcCategory, setTempVcCategory] = useState<string>("");
  const [starboardChannel, setStarboardChannel] = useState<string>("");
  const [starboardStars, setStarboardStars] = useState<number>(3);
  const [antiInvite, setAntiInvite] = useState(false);
  const [antiSpam, setAntiSpam] = useState(false);
  const [antiBadWords, setAntiBadWords] = useState(false);
  const [countingChannel, setCountingChannel] = useState<string>("");
  const [birthdayChannel, setBirthdayChannel] = useState<string>("");

  // Announcement State
  const [annChannel, setAnnChannel] = useState("");
  const [annTitle, setAnnTitle] = useState("");
  const [annMessage, setAnnMessage] = useState("");
  const [annColor, setAnnColor] = useState("fuchsia");
  const [annPing, setAnnPing] = useState("none");
  const [annSending, setAnnSending] = useState(false);

  // Initial Snapshot for unsaved changes detection
  const [initialSnapshot, setInitialSnapshot] = useState<string>("");

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const populateFromConfig = (data: GuildDetails) => {
    const cfg = data.config || ({} as any);
    const mRoles = cfg.modRoles || [];
    const mLog = cfg.modLogChannel || "";
    const wEn = !!cfg.welcome?.enabled;
    const wCh = cfg.welcome?.channelId || "";
    const wMsg = cfg.welcome?.message || "Welcome to {server}, {user}! We're thrilled to have you here 🎉";
    const aRole = cfg.welcome?.autoRoleId || "";
    const aEn = !!cfg.chatbot?.enabled;
    const aCh = cfg.chatbot?.channelId || "";
    const aMd = cfg.chatbot?.mode || "standard";
    const dj = cfg.music?.djRole || "";
    const vol = cfg.music?.defaultVolume ?? 100;
    const tvcHub = cfg.tempVc?.hubChannelId || "";
    const tvcCat = cfg.tempVc?.categoryId || "";
    const sbCh = cfg.starboard?.channelId || "";
    const sbSt = cfg.starboard?.minStars ?? 3;
    const amInv = !!cfg.autoMod?.antiInvite;
    const amSpam = !!cfg.autoMod?.antiSpam;
    const amBw = !!cfg.autoMod?.antiBadWords;
    const cntCh = cfg.counting?.channelId || "";
    const bdayCh = cfg.birthday?.channelId || "";

    setModRoles(mRoles);
    setModLogChannel(mLog);
    setWelcomeEnabled(wEn);
    setWelcomeChannel(wCh);
    setWelcomeMessage(wMsg);
    setAutoRoleId(aRole);
    setAiEnabled(aEn);
    setAiChannel(aCh);
    setAiMode(aMd);
    setDjRole(dj);
    setDefaultVolume(vol);
    setTempVcHub(tvcHub);
    setTempVcCategory(tvcCat);
    setStarboardChannel(sbCh);
    setStarboardStars(sbSt);
    setAntiInvite(amInv);
    setAntiSpam(amSpam);
    setAntiBadWords(amBw);
    setCountingChannel(cntCh);
    setBirthdayChannel(bdayCh);

    const snap = JSON.stringify({
      mRoles, mLog, wEn, wCh, wMsg, aRole, aEn, aCh, aMd,
      dj, vol, tvcHub, tvcCat, sbCh, sbSt, amInv, amSpam, amBw,
      cntCh, bdayCh
    });
    setInitialSnapshot(snap);
  };

  const currentSnapshot = useMemo(() => {
    return JSON.stringify({
      mRoles: modRoles,
      mLog: modLogChannel,
      wEn: welcomeEnabled,
      wCh: welcomeChannel,
      wMsg: welcomeMessage,
      aRole: autoRoleId,
      aEn: aiEnabled,
      aCh: aiChannel,
      aMd: aiMode,
      dj: djRole,
      vol: defaultVolume,
      tvcHub: tempVcHub,
      tvcCat: tempVcCategory,
      sbCh: starboardChannel,
      sbSt: starboardStars,
      amInv: antiInvite,
      amSpam: antiSpam,
      amBw: antiBadWords,
      cntCh: countingChannel,
      bdayCh: birthdayChannel
    });
  }, [
    modRoles, modLogChannel, welcomeEnabled, welcomeChannel, welcomeMessage,
    autoRoleId, aiEnabled, aiChannel, aiMode, djRole, defaultVolume,
    tempVcHub, tempVcCategory, starboardChannel, starboardStars, antiInvite, antiSpam, antiBadWords,
    countingChannel, birthdayChannel
  ]);

  const hasUnsavedChanges = useMemo(() => {
    if (!initialSnapshot) return false;
    return initialSnapshot !== currentSnapshot;
  }, [initialSnapshot, currentSnapshot]);

  const fetchGuildData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/bot/guilds/${guildId}`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to load guild details");
      }
      const data: GuildDetails = await res.json();
      setGuild(data);
      populateFromConfig(data);
    } catch (err: any) {
      console.error("[GuildDashboard] Fetch error:", err);
      showToast(err.message || "Could not connect to bot backend", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuildData();
  }, [guildId]);

  const applyScannerRecommendations = () => {
    if (!guild?.recommendations) return;
    if (guild.recommendations.modLogChannelId) {
      setModLogChannel(guild.recommendations.modLogChannelId);
    }
    if (guild.recommendations.welcomeChannelId) {
      setWelcomeEnabled(true);
      setWelcomeChannel(guild.recommendations.welcomeChannelId);
    }
    if (guild.recommendations.chatbotChannelId) {
      setAiEnabled(true);
      setAiChannel(guild.recommendations.chatbotChannelId);
    }
    showToast("Auto-detected channels loaded into settings!");
  };

  const toggleModRole = (roleId: string) => {
    if (modRoles.includes(roleId)) {
      setModRoles(modRoles.filter((id) => id !== roleId));
    } else {
      setModRoles([...modRoles, roleId]);
    }
  };

  const handleReset = () => {
    if (guild) populateFromConfig(guild);
    showToast("Changes reset to saved values.");
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const payload: GuildConfig = {
        modRoles,
        modLogChannel: modLogChannel || null,
        welcome: {
          enabled: welcomeEnabled,
          channelId: welcomeChannel || null,
          message: welcomeMessage,
          autoRoleId: autoRoleId || null
        },
        chatbot: {
          enabled: aiEnabled,
          channelId: aiChannel || null,
          mode: aiMode,
        },
        music: {
          djRole: djRole || null,
          defaultVolume,
        },
        tempVc: {
          hubChannelId: tempVcHub || null,
          categoryId: tempVcCategory || null
        },
        starboard: {
          channelId: starboardChannel || null,
          minStars: starboardStars
        },
        autoMod: {
          antiInvite,
          antiSpam,
          antiBadWords
        },
        counting: {
          channelId: countingChannel || null
        },
        birthday: {
          channelId: birthdayChannel || null
        }
      };

      const res = await fetch(`/api/bot/guilds/${guildId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to commit settings");
      }

      showToast("Server configurations saved successfully!");
      fetchGuildData();
    } catch (err: any) {
      showToast(err.message || "Failed to save configuration", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleSendAnnouncement = async () => {
    if (!annChannel || !annTitle || !annMessage) {
      return showToast("Please fill in channel, title, and announcement message", "error");
    }

    try {
      setAnnSending(true);
      const res = await fetch(`/api/bot/guilds/${guildId}/announce`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channelId: annChannel,
          title: annTitle,
          message: annMessage,
          color: annColor,
          ping: annPing
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send announcement");

      showToast(data.message || "Announcement dispatched to Discord!");
      setAnnTitle("");
      setAnnMessage("");
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setAnnSending(false);
    }
  };

  const readinessScore = () => {
    let score = 20; // Bot joined
    if (modRoles.length > 0) score += 20;
    if (modLogChannel) score += 15;
    if (welcomeEnabled && welcomeChannel) score += 15;
    if (aiEnabled && aiChannel) score += 15;
    if (antiInvite || antiSpam) score += 15;
    return Math.min(score, 100);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#070308] text-white flex flex-col items-center justify-center font-sans space-y-4">
        <div className="w-12 h-12 border-2 border-fuchsia-500/20 border-t-fuchsia-500 rounded-full animate-spin" />
        <p className="text-xs font-mono text-gray-400 tracking-widest uppercase">
          Auditing server telemetry & roles...
        </p>
      </main>
    );
  }

  const score = readinessScore();

  return (
    <div className="min-h-screen bg-[#070308] text-white flex flex-col font-sans">
      {/* Toast Alert */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl border text-xs font-medium flex items-center gap-3 shadow-2xl backdrop-blur-xl transition-all ${
            toast.type === "success"
              ? "bg-emerald-950/90 border-emerald-500/40 text-emerald-300"
              : "bg-red-950/90 border-red-500/40 text-red-300"
          }`}
        >
          {toast.type === "success" ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="border-b border-white/5 bg-[#070308]/90 backdrop-blur-xl sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">All Servers</span>
          </Link>
          <div className="h-4 w-px bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center font-bold text-xs text-fuchsia-400">
              {guild?.icon ? (
                <img src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=64`} alt="" className="w-full h-full object-cover" />
              ) : (
                guild?.name.charAt(0)
              )}
            </div>
            <span className="font-bold text-sm text-white truncate max-w-[200px] sm:max-w-xs">{guild?.name}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 font-medium hidden md:inline">
              {guild?.memberCount} Members
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`/invite?guild_id=${guildId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors text-xs flex items-center gap-1.5"
            title="Bot Invite Link"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Bot Link</span>
          </a>

          <button
            onClick={handleSave}
            disabled={saving || !hasUnsavedChanges}
            className={`py-2 px-4 rounded-xl font-semibold text-xs transition-all flex items-center gap-2 shadow-lg ${
              hasUnsavedChanges
                ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white shadow-fuchsia-600/30 animate-pulse"
                : "bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed"
            }`}
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </header>

      {/* Main Dashboard Layout (Sidebar + Content) */}
      <div className="flex-1 flex max-w-[1400px] w-full mx-auto">
        {/* Left Sidebar Menu */}
        <aside className="w-64 border-r border-white/5 bg-[#070308]/50 p-4 shrink-0 hidden md:flex flex-col justify-between">
          <div className="space-y-6">
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-mono tracking-wider text-gray-500 px-3">Management</p>
              <nav className="space-y-1">
                {[
                  { id: "overview", label: "Server Overview", icon: Sparkles },
                  { id: "moderation", label: "Moderator Roles", icon: Shield },
                  { id: "automod", label: "Auto-Mod Security", icon: Lock },
                  { id: "welcome", label: "Welcomer & Auto-Role", icon: Bell },
                  { id: "ai", label: "AI Chatbot", icon: Bot },
                  { id: "music", label: "Music & DJ Audio", icon: Music },
                  { id: "tempvc", label: "Temp Voice Hub", icon: Mic },
                  { id: "community", label: "Community & Games", icon: Gamepad2 },
                  { id: "starboard", label: "Hall of Fame", icon: Star },
                  { id: "announce", label: "Send Announcement", icon: Megaphone },
                ].map((item) => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as TabType)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-all ${
                        active
                          ? "bg-fuchsia-600/15 text-fuchsia-400 border border-fuchsia-500/30 shadow-sm"
                          : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Sidebar Footer Stats */}
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-[11px] text-gray-400 space-y-1">
            <p className="font-semibold text-gray-300">VePlexity v2.0 Commercial</p>
            <p className="text-[10px] text-gray-500">Live Socket Connected</p>
          </div>
        </aside>

        {/* Mobile Horizontal Tabs */}
        <div className="md:hidden border-b border-white/5 p-2 overflow-x-auto flex gap-1 w-full bg-[#070308]">
          {[
            { id: "overview", label: "Overview" },
            { id: "moderation", label: "Mod Roles" },
            { id: "automod", label: "AutoMod" },
            { id: "welcome", label: "Welcome" },
            { id: "ai", label: "AI" },
            { id: "music", label: "Music" },
            { id: "tempvc", label: "Temp VC" },
            { id: "community", label: "Games" },
            { id: "starboard", label: "Starboard" },
            { id: "announce", label: "Announce" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as TabType)}
              className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium transition ${
                activeTab === item.id
                  ? "bg-fuchsia-600/20 text-fuchsia-400 border border-fuchsia-500/40"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right Content Area */}
        <main className="flex-1 p-5 sm:p-8 lg:p-10 space-y-8 max-w-4xl pb-32">
          {/* ─── TAB 1: OVERVIEW & SCANNER ─────────────────────────────────── */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 relative overflow-hidden shadow-2xl space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-fuchsia-400" />
                      <span>Server Setup Readiness: {score}%</span>
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">
                      Automated audit completed. Enable moderator roles and channel integrations for 100% readiness.
                    </p>
                  </div>

                  <button
                    onClick={applyScannerRecommendations}
                    className="py-2.5 px-4 rounded-xl bg-fuchsia-600/20 hover:bg-fuchsia-600/30 border border-fuchsia-500/40 text-fuchsia-300 font-semibold text-xs transition-all flex items-center gap-2 shrink-0 self-start sm:self-auto"
                  >
                    <Sparkles className="w-4 h-4 text-fuchsia-400" />
                    <span>Auto-Apply Detected Channels</span>
                  </button>
                </div>

                {/* Progress Meter */}
                <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-700"
                    style={{ width: `${score}%` }}
                  />
                </div>

                {/* Status Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                    <p className="text-[10px] uppercase font-mono text-gray-500">Moderator Roles</p>
                    <p className={`text-xs font-bold ${modRoles.length > 0 ? "text-emerald-400" : "text-amber-400"}`}>
                      {modRoles.length > 0 ? `${modRoles.length} Configured` : "None Set"}
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                    <p className="text-[10px] uppercase font-mono text-gray-500">Mod Audit Logs</p>
                    <p className={`text-xs font-bold ${modLogChannel ? "text-emerald-400" : "text-gray-500"}`}>
                      {modLogChannel ? "Enabled" : "Disabled"}
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                    <p className="text-[10px] uppercase font-mono text-gray-500">Welcomer</p>
                    <p className={`text-xs font-bold ${welcomeEnabled ? "text-emerald-400" : "text-gray-500"}`}>
                      {welcomeEnabled ? "Enabled" : "Disabled"}
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                    <p className="text-[10px] uppercase font-mono text-gray-500">AI Chatbot</p>
                    <p className={`text-xs font-bold ${aiEnabled ? "text-purple-400" : "text-gray-500"}`}>
                      {aiEnabled ? "Active" : "Disabled"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Jump Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveTab("moderation")}
                  className="p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 text-left transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-fuchsia-600/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white group-hover:text-fuchsia-300 transition">Configure Mod Roles</h4>
                      <p className="text-xs text-gray-400">Manage who can ban, kick, and mute</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 transition" />
                </button>

                <button
                  onClick={() => setActiveTab("welcome")}
                  className="p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 text-left transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                      <Bell className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white group-hover:text-purple-300 transition">Setup Welcome Embeds</h4>
                      <p className="text-xs text-gray-400">Greet new members automatically</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 transition" />
                </button>
              </div>
            </div>
          )}

          {/* ─── TAB 2: MODERATION & ROLES ─────────────────────────────────── */}
          {activeTab === "moderation" && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <Shield className="w-4 h-4 text-fuchsia-400" />
                    <span>Authorized Moderator Roles</span>
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Select which Discord roles have authority to execute moderation commands (<code className="text-fuchsia-300">/ban</code>, <code className="text-fuchsia-300">/kick</code>, <code className="text-fuchsia-300">/timeout</code>, <code className="text-fuchsia-300">/warn</code>, <code className="text-fuchsia-300">/purge</code>). Server Owners and members with Discord's Administrator permission automatically have full access.
                  </p>
                </div>

                <div className="pt-2">
                  <label className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-2 block">
                    Select Roles ({modRoles.length} active):
                  </label>
                  <div className="flex flex-wrap gap-2.5 max-h-72 overflow-y-auto pr-1">
                    {guild?.roles
                      ?.filter((r) => r.name !== "@everyone")
                      .map((role) => {
                        const isSelected = modRoles.includes(role.id);
                        const hexColor = role.color ? `#${role.color.toString(16).padStart(6, "0")}` : "#99aab5";
                        return (
                          <button
                            key={role.id}
                            onClick={() => toggleModRole(role.id)}
                            type="button"
                            className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-2 ${
                              isSelected
                                ? "bg-fuchsia-600/20 border-fuchsia-500 text-white shadow-md shadow-fuchsia-500/10"
                                : "bg-white/[0.02] border-white/10 text-gray-300 hover:border-white/25 hover:bg-white/[0.05]"
                            }`}
                          >
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                              style={{ backgroundColor: hexColor }}
                            />
                            <span>{role.name}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-fuchsia-400 ml-1" />}
                          </button>
                        );
                      })}
                  </div>
                </div>
              </div>

              {/* Mod Logs Channel */}
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-3">
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-white">📜 Infraction & Audit Logs Channel</h3>
                  <p className="text-xs text-gray-400">
                    The private text channel where all moderator infractions, bans, kicks, and timeouts are logged.
                  </p>
                </div>

                <select
                  value={modLogChannel}
                  onChange={(e) => setModLogChannel(e.target.value)}
                  className="w-full max-w-md bg-[#070308] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-fuchsia-500/50 outline-none"
                >
                  <option value="">Disabled / None</option>
                  {guild?.channels?.text?.map((c) => (
                    <option key={c.id} value={c.id}>
                      #{c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* ─── TAB 3: AUTO-MOD SECURITY ──────────────────────────────────── */}
          {activeTab === "automod" && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6">
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <Lock className="w-4 h-4 text-fuchsia-400" />
                    <span>Auto-Mod Defense Shield</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Automated real-time protection filters that monitor chat to protect your server from raid attempts and invite spam.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {[
                    {
                      id: "antiInvite",
                      label: "Block Discord Invites",
                      desc: "Automatically deletes unauthorized Discord invite links sent by regular members.",
                      value: antiInvite,
                      setter: setAntiInvite
                    },
                    {
                      id: "antiSpam",
                      label: "Anti-Spam Rate Limiter",
                      desc: "Detects and prevents users from spamming repetitive messages or excessive mentions.",
                      value: antiSpam,
                      setter: setAntiSpam
                    },
                    {
                      id: "antiBadWords",
                      label: "Profanity & Slur Filter",
                      desc: "Filters severe hate speech and slurs to keep chat safe and compliant.",
                      value: antiBadWords,
                      setter: setAntiBadWords
                    }
                  ].map((rule) => (
                    <div
                      key={rule.id}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4"
                    >
                      <div>
                        <p className="font-bold text-sm text-white">{rule.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{rule.desc}</p>
                      </div>

                      <input
                        type="checkbox"
                        checked={rule.value}
                        onChange={(e) => rule.setter(e.target.checked)}
                        className="w-5 h-5 accent-fuchsia-500 cursor-pointer shrink-0"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── TAB 4: WELCOMER & AUTO-ROLE ───────────────────────────────── */}
          {activeTab === "welcome" && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base text-white flex items-center gap-2">
                      <Bell className="w-4 h-4 text-fuchsia-400" />
                      <span>Automated Welcomer Engine</span>
                    </h3>
                    <p className="text-xs text-gray-400">
                      Send an aesthetic welcome message whenever a new user joins your server.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={welcomeEnabled}
                    onChange={(e) => setWelcomeEnabled(e.target.checked)}
                    className="w-5 h-5 accent-fuchsia-500 cursor-pointer"
                  />
                </div>

                {welcomeEnabled && (
                  <div className="space-y-5 pt-4 border-t border-white/5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5 block">
                          Welcome Text Channel
                        </label>
                        <select
                          value={welcomeChannel}
                          onChange={(e) => setWelcomeChannel(e.target.value)}
                          className="w-full bg-[#070308] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-fuchsia-500/50 outline-none"
                        >
                          <option value="">Select a channel...</option>
                          {guild?.channels?.text?.map((c) => (
                            <option key={c.id} value={c.id}>
                              #{c.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5 block">
                          Auto-Role on Join (Optional)
                        </label>
                        <select
                          value={autoRoleId}
                          onChange={(e) => setAutoRoleId(e.target.value)}
                          className="w-full bg-[#070308] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-fuchsia-500/50 outline-none"
                        >
                          <option value="">None (No role assigned)</option>
                          {guild?.roles
                            ?.filter((r) => r.name !== "@everyone" && !r.managed)
                            .map((r) => (
                              <option key={r.id} value={r.id}>
                                {r.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5 block">
                        Custom Welcome Message
                      </label>
                      <textarea
                        rows={3}
                        value={welcomeMessage}
                        onChange={(e) => setWelcomeMessage(e.target.value)}
                        className="w-full bg-[#070308] border border-white/15 rounded-xl p-3.5 text-sm text-white focus:border-fuchsia-500/50 outline-none"
                        placeholder="Welcome to {server}, {user}! 🎉"
                      />
                      <div className="flex items-center gap-2 mt-2 text-[11px] text-gray-400 flex-wrap">
                        <span>Click to insert:</span>
                        <button
                          type="button"
                          onClick={() => setWelcomeMessage((m) => m + " {user}")}
                          className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-fuchsia-500/20 text-fuchsia-400 hover:text-fuchsia-300 font-mono transition text-[11px] cursor-pointer border border-white/5"
                        >
                          + &#123;user&#125;
                        </button>
                        <button
                          type="button"
                          onClick={() => setWelcomeMessage((m) => m + " {server}")}
                          className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-fuchsia-500/20 text-fuchsia-400 hover:text-fuchsia-300 font-mono transition text-[11px] cursor-pointer border border-white/5"
                        >
                          + &#123;server&#125;
                        </button>
                        <button
                          type="button"
                          onClick={() => setWelcomeMessage((m) => m + " {memberCount}")}
                          className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-fuchsia-500/20 text-fuchsia-400 hover:text-fuchsia-300 font-mono transition text-[11px] cursor-pointer border border-white/5"
                        >
                          + &#123;memberCount&#125;
                        </button>
                      </div>
                    </div>

                    {/* Simulated Discord Preview */}
                    <div className="p-4 rounded-2xl bg-[#0e1015] border border-white/10 space-y-2">
                      <p className="text-[10px] uppercase font-mono tracking-wider text-gray-500">Live Discord Embed Preview</p>
                      <div className="border-l-4 border-fuchsia-500 pl-3 py-1 space-y-1">
                        <p className="text-xs font-bold text-white">👋 New Member Arrived!</p>
                        <p className="text-xs text-gray-300">
                          {welcomeMessage
                            .replace("{user}", `@NewMember`)
                            .replace("{server}", guild?.name || "Server")
                            .replace("{memberCount}", String((guild?.memberCount || 0) + 1))}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─── TAB 5: AI CHATBOT ─────────────────────────────────────────── */}
          {activeTab === "ai" && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base text-white flex items-center gap-2">
                      <Bot className="w-4 h-4 text-fuchsia-400" />
                      <span>Gemini AI Chatbot Engine</span>
                    </h3>
                    <p className="text-xs text-gray-400">
                      Enable the bot to converse, answer questions, and roleplay inside designated channels.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={aiEnabled}
                    onChange={(e) => setAiEnabled(e.target.checked)}
                    className="w-5 h-5 accent-fuchsia-500 cursor-pointer"
                  />
                </div>

                {aiEnabled && (
                  <div className="space-y-5 pt-4 border-t border-white/5">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5 block">
                        Dedicated AI Text Channel
                      </label>
                      <select
                        value={aiChannel}
                        onChange={(e) => setAiChannel(e.target.value)}
                        className="w-full max-w-md bg-[#070308] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-fuchsia-500/50 outline-none"
                      >
                        <option value="">Select a channel...</option>
                        {guild?.channels?.text?.map((c) => (
                          <option key={c.id} value={c.id}>
                            #{c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 block">
                        AI Personality Preset
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { id: "standard", label: "Friendly & Helpful", desc: "Balanced, polite, and helpful assistant." },
                          { id: "savage", label: "Savage & Roast", desc: "Witty, hilarious clapbacks and savage roasts." },
                          { id: "anime", label: "Tsundere Anime", desc: "Feisty anime personality with reaction GIFs." },
                        ].map((mode) => (
                          <button
                            key={mode.id}
                            type="button"
                            onClick={() => setAiMode(mode.id)}
                            className={`p-4 rounded-2xl border text-left transition-all ${
                              aiMode === mode.id
                                ? "bg-fuchsia-600/20 border-fuchsia-500 shadow-md shadow-fuchsia-500/10"
                                : "bg-white/[0.02] border-white/10 hover:border-white/20"
                            }`}
                          >
                            <p className="font-bold text-sm text-white">{mode.label}</p>
                            <p className="text-xs text-gray-400 mt-1">{mode.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─── TAB 6: MUSIC & DJ ─────────────────────────────────────────── */}
          {activeTab === "music" && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-5">
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <Music className="w-4 h-4 text-fuchsia-400" />
                    <span>Music Playback & DJ Authority</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Configure DJ permissions so only designated roles can skip or clear the queue.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5 block">
                      Designated DJ Role
                    </label>
                    <select
                      value={djRole}
                      onChange={(e) => setDjRole(e.target.value)}
                      className="w-full bg-[#070308] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-fuchsia-500/50 outline-none"
                    >
                      <option value="">Everyone (No Role Required)</option>
                      {guild?.roles
                        ?.filter((r) => r.name !== "@everyone")
                        .map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5 block">
                      Default Playback Volume ({defaultVolume}%)
                    </label>
                    <div className="flex items-center gap-3 bg-[#070308] border border-white/15 rounded-xl px-4 py-2.5">
                      <Volume2 className="w-4 h-4 text-gray-400" />
                      <input
                        type="range"
                        min="10"
                        max="150"
                        step="5"
                        value={defaultVolume}
                        onChange={(e) => setDefaultVolume(Number(e.target.value))}
                        className="w-full accent-fuchsia-500 cursor-pointer"
                      />
                      <span className="text-xs font-mono text-gray-300 w-12 text-right">{defaultVolume}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── TAB 7: TEMP VOICE HUBS ─────────────────────────────────────── */}
          {activeTab === "tempvc" && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-5">
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <Mic className="w-4 h-4 text-fuchsia-400" />
                    <span>Join-to-Create Temporary Voice Hubs</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Whenever members connect to the Hub channel, the bot instantly provisions a private, customizable voice room for them.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5 block">
                      Hub Generator Channel
                    </label>
                    <select
                      value={tempVcHub}
                      onChange={(e) => setTempVcHub(e.target.value)}
                      className="w-full bg-[#070308] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-fuchsia-500/50 outline-none"
                    >
                      <option value="">Disabled / None</option>
                      {guild?.channels?.voice?.map((vc) => (
                        <option key={vc.id} value={vc.id}>
                          🔊 {vc.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5 block">
                      Parent Category
                    </label>
                    <select
                      value={tempVcCategory}
                      onChange={(e) => setTempVcCategory(e.target.value)}
                      className="w-full bg-[#070308] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-fuchsia-500/50 outline-none"
                    >
                      <option value="">Auto / Same Category</option>
                      {guild?.channels?.categories?.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          📁 {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── TAB: COMMUNITY & MINI-GAMES ───────────────────────────────── */}
          {activeTab === "community" && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-5">
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <Gamepad2 className="w-4 h-4 text-fuchsia-400" />
                    <span>Interactive Counting Mini-Game</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Dedicate a text channel where members count 1, 2, 3... in streak order. The bot reacts with milestone badges (✅, 💯, ⭐) and resets the streak to 0 on mistakes or consecutive user posts!
                  </p>
                </div>

                <div className="pt-2 max-w-md">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5 block">
                    Counting Channel
                  </label>
                  <select
                    value={countingChannel}
                    onChange={(e) => setCountingChannel(e.target.value)}
                    className="w-full bg-[#070308] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-fuchsia-500/50 outline-none"
                  >
                    <option value="">Disabled / None</option>
                    {guild?.channels?.text?.map((c) => (
                      <option key={c.id} value={c.id}>
                        #{c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-5">
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <Cake className="w-4 h-4 text-fuchsia-400" />
                    <span>Automated Birthday Celebrations</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    When members set their birthday using <code className="text-fuchsia-300">/birthday set</code>, the bot will automatically send a celebration embed with cake & wishes to this channel on their special day!
                  </p>
                </div>

                <div className="pt-2 max-w-md">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5 block">
                    Birthday Announcement Channel
                  </label>
                  <select
                    value={birthdayChannel}
                    onChange={(e) => setBirthdayChannel(e.target.value)}
                    className="w-full bg-[#070308] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-fuchsia-500/50 outline-none"
                  >
                    <option value="">Disabled / Default System Channel</option>
                    {guild?.channels?.text?.map((c) => (
                      <option key={c.id} value={c.id}>
                        #{c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ─── TAB 8: STARBOARD ──────────────────────────────────────────── */}
          {activeTab === "starboard" && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-5">
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <Star className="w-4 h-4 text-fuchsia-400" />
                    <span>Hall of Fame Starboard</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    When messages receive star reactions from community members, pin them into the Hall of Fame.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5 block">
                      Starboard Channel
                    </label>
                    <select
                      value={starboardChannel}
                      onChange={(e) => setStarboardChannel(e.target.value)}
                      className="w-full bg-[#070308] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-fuchsia-500/50 outline-none"
                    >
                      <option value="">Disabled / None</option>
                      {guild?.channels?.text?.map((c) => (
                        <option key={c.id} value={c.id}>
                          #{c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5 block">
                      Minimum Stars Threshold
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={starboardStars}
                      onChange={(e) => setStarboardStars(Number(e.target.value))}
                      className="w-full bg-[#070308] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-fuchsia-500/50 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── TAB 9: ANNOUNCEMENTS ──────────────────────────────────────── */}
          {activeTab === "announce" && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-5">
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <Megaphone className="w-4 h-4 text-fuchsia-400" />
                    <span>Send Announcement from Dashboard</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Dispatch a formatted embed directly to any channel in your Discord server.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5 block">
                        Target Text Channel
                      </label>
                      <select
                        value={annChannel}
                        onChange={(e) => setAnnChannel(e.target.value)}
                        className="w-full bg-[#070308] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-fuchsia-500/50 outline-none"
                      >
                        <option value="">Select target channel...</option>
                        {guild?.channels?.text?.map((c) => (
                          <option key={c.id} value={c.id}>
                            #{c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5 block">
                        Mention Notification
                      </label>
                      <select
                        value={annPing}
                        onChange={(e) => setAnnPing(e.target.value)}
                        className="w-full bg-[#070308] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-fuchsia-500/50 outline-none"
                      >
                        <option value="none">No Ping</option>
                        <option value="@here">@here</option>
                        <option value="@everyone">@everyone</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5 block">
                      Announcement Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Server Updates & New Events! 🎉"
                      value={annTitle}
                      onChange={(e) => setAnnTitle(e.target.value)}
                      className="w-full bg-[#070308] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-fuchsia-500/50 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5 block">
                      Announcement Message Body
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Write your announcement message here..."
                      value={annMessage}
                      onChange={(e) => setAnnMessage(e.target.value)}
                      className="w-full bg-[#070308] border border-white/15 rounded-xl p-3.5 text-sm text-white focus:border-fuchsia-500/50 outline-none"
                    />
                  </div>

                  {/* Live Announcement Embed Preview */}
                  <div className="p-4 rounded-2xl bg-[#0e1015] border border-white/10 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] uppercase font-mono tracking-wider text-gray-500">Live Discord Embed Preview</p>
                      {annPing !== "none" && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-300 font-mono">
                          Notification: {annPing}
                        </span>
                      )}
                    </div>
                    <div
                      className="rounded-r-xl border-l-4 p-4 space-y-2 bg-white/[0.02]"
                      style={{
                        borderColor:
                          annColor === "fuchsia" ? "#BD5FFF" :
                          annColor === "blue" ? "#3498db" :
                          annColor === "green" ? "#2ecc71" :
                          annColor === "red" ? "#e74c3c" : "#f1c40f"
                      }}
                    >
                      <p className="text-sm font-bold text-white">
                        {annTitle || "Announcement Title Preview"}
                      </p>
                      <p className="text-xs text-gray-300 whitespace-pre-wrap leading-relaxed">
                        {annMessage || "Type your announcement message above to preview formatting and layout..."}
                      </p>
                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500">
                        <span>Official Server Announcement • {guild?.name || "Server"}</span>
                        <span>Today</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 font-medium">Embed Color:</span>
                      {[
                        { id: "fuchsia", color: "#BD5FFF" },
                        { id: "blue", color: "#3498db" },
                        { id: "green", color: "#2ecc71" },
                        { id: "red", color: "#e74c3c" },
                        { id: "gold", color: "#f1c40f" },
                      ].map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setAnnColor(c.id)}
                          className={`w-6 h-6 rounded-full transition-transform ${
                            annColor === c.id ? "scale-125 ring-2 ring-white" : "hover:scale-110"
                          }`}
                          style={{ backgroundColor: c.color }}
                        />
                      ))}
                    </div>

                    <button
                      onClick={handleSendAnnouncement}
                      disabled={annSending || !annChannel || !annTitle || !annMessage}
                      className="py-3 px-6 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-lg shadow-fuchsia-600/30 active:scale-95 disabled:opacity-40"
                    >
                      <Send className="w-4 h-4" />
                      <span>{annSending ? "Dispatching..." : "Send Announcement Now"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Floating Unsaved Changes Bar */}
      {hasUnsavedChanges && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="p-4 rounded-2xl bg-[#0f1118]/95 border border-fuchsia-500/40 backdrop-blur-2xl shadow-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <p className="text-xs font-semibold text-gray-200">
                Careful — you have unsaved changes!
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                disabled={saving}
                className="py-2 px-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-medium text-xs transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="py-2 px-5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-lg shadow-fuchsia-600/30 active:scale-95"
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
