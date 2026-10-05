"use client";

import { useEffect, useState, use, useMemo } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { 
  Shield, Bell, Bot, Music, Check, Sparkles, AlertCircle, 
  ArrowLeft, Save, CheckCircle2, ChevronRight, Hash, 
  Volume2, Megaphone, Lock, Star, Mic, RotateCcw,
  Send, ExternalLink, Gamepad2, Cake, Coffee, Flame,
  MessageCircle, FileText, Settings, ThumbsUp, ThumbsDown,
  Trash2, UserMinus, UserPlus, Clock, Layers, HelpCircle
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

interface LoggingChannelsConfig {
  messageEdit?: string | null;
  messageDelete?: string | null;
  modActions?: string | null;
  memberJoin?: string | null;
  memberLeave?: string | null;
  roleUpdate?: string | null;
}

interface GuildConfig {
  modRoles: string[];
  modLogChannel: string | null;
  loggingChannels?: LoggingChannelsConfig;
  suggestionsChannel?: string | null;
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

type TabType = 
  | "overview" 
  | "moderation" 
  | "logging" 
  | "automod" 
  | "welcome" 
  | "ai" 
  | "music" 
  | "tempvc" 
  | "starboard" 
  | "suggestions" 
  | "community" 
  | "announce" 
  | "perks";

type LogPreviewType = "messageEdit" | "messageDelete" | "modAction" | "memberJoin" | "memberLeave" | "roleUpdate";

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
  const [loggingChannels, setLoggingChannels] = useState<LoggingChannelsConfig>({});
  const [activeLogPreview, setActiveLogPreview] = useState<LogPreviewType>("messageEdit");
  const [suggestionsChannel, setSuggestionsChannel] = useState<string>("");

  const [welcomeEnabled, setWelcomeEnabled] = useState(false);
  const [welcomeChannel, setWelcomeChannel] = useState<string>("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [autoRoleId, setAutoRoleId] = useState<string>("");
  const [welcomePreviewMode, setWelcomePreviewMode] = useState<"welcome" | "goodbye">("welcome");

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
  const [simulatedStreak, setSimulatedStreak] = useState(42);

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
    const logChans = cfg.loggingChannels || {};
    const suggChan = cfg.suggestionsChannel || "";
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
    setLoggingChannels(logChans);
    setSuggestionsChannel(suggChan);
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
      mRoles, mLog, logChans, suggChan, wEn, wCh, wMsg, aRole, aEn, aCh, aMd,
      dj, vol, tvcHub, tvcCat, sbCh, sbSt, amInv, amSpam, amBw,
      cntCh, bdayCh
    });
    setInitialSnapshot(snap);
  };

  const currentSnapshot = useMemo(() => {
    return JSON.stringify({
      mRoles: modRoles,
      mLog: modLogChannel,
      logChans: loggingChannels,
      suggChan: suggestionsChannel,
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
    modRoles, modLogChannel, loggingChannels, suggestionsChannel, welcomeEnabled, welcomeChannel, welcomeMessage,
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
        loggingChannels,
        suggestionsChannel: suggestionsChannel || null,
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

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0d0e12] text-white flex flex-col items-center justify-center font-sans space-y-4">
        <div className="w-10 h-10 border-2 border-fuchsia-500/20 border-t-fuchsia-500 rounded-full animate-spin" />
        <p className="text-xs font-mono text-gray-400 tracking-wider">
          Loading server configuration...
        </p>
      </main>
    );
  }

  // Active module labels mapping
  const MODULE_TITLES: Record<TabType, string> = {
    overview: "Server Overview",
    moderation: "Bot Masters & Moderator Roles",
    logging: "Audit & Logging Channels",
    automod: "Auto-Mod Security Shield",
    welcome: "Welcome & Goodbye Messages",
    ai: "Gemini AI Chatbot",
    music: "Music & DJ Audio System",
    tempvc: "Temporary Voice Hubs",
    starboard: "Starboard (Hall of Fame)",
    suggestions: "Community Suggestions Box",
    community: "Birthdays & Counting Games",
    announce: "Message Builder & Announcements",
    perks: "Community Perks & VIP Support"
  };

  return (
    <div className="min-h-screen bg-[#0d0e12] text-[#f2f3f5] flex flex-col font-sans">
      {/* Toast Alert */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl border text-xs font-medium flex items-center gap-3 shadow-2xl backdrop-blur-xl transition-all ${
            toast.type === "success"
              ? "bg-[#182a20] border-emerald-500/40 text-emerald-300"
              : "bg-[#2a1818] border-red-500/40 text-red-300"
          }`}
        >
          {toast.type === "success" ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="border-b border-white/5 bg-[#111217] sticky top-0 z-40 px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">All Servers</span>
          </Link>

          <div className="h-4 w-px bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#1e1f24] border border-white/10 overflow-hidden flex items-center justify-center font-bold text-xs text-fuchsia-400 shrink-0">
              {guild?.icon ? (
                <img src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=64`} alt="" className="w-full h-full object-cover" />
              ) : (
                guild?.name.charAt(0)
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white truncate max-w-[180px] sm:max-w-xs">{guild?.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 font-mono hidden md:inline">
                  {guild?.id}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://www.discord.gg/R6ZrqpWEcc"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition text-xs flex items-center gap-1.5 border border-white/5"
            title="Official Discord Server"
          >
            <MessageCircle className="w-3.5 h-3.5 text-fuchsia-400" />
            <span className="hidden sm:inline font-medium">VePlexity Point</span>
          </a>

          <a
            href="https://www.buymeacoffee.com/veplexity1"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 transition text-xs flex items-center gap-1.5"
            title="Support Creator"
          >
            <Coffee className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline font-semibold">Support</span>
          </a>

          <button
            onClick={handleSave}
            disabled={saving || !hasUnsavedChanges}
            className={`py-1.5 px-4 rounded-lg font-semibold text-xs transition-all flex items-center gap-2 ${
              hasUnsavedChanges
                ? "bg-fuchsia-600 hover:bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-600/30"
                : "bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed"
            }`}
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? "Saving..." : "Save"}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex max-w-[1400px] w-full mx-auto">
        {/* Left Navigation Sidebar */}
        <aside className="w-60 border-r border-white/5 bg-[#111217]/60 p-4 shrink-0 hidden lg:flex flex-col justify-between">
          <div className="space-y-6">
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition ${
                  activeTab === "overview"
                    ? "bg-fuchsia-600/20 text-fuchsia-300 border border-fuchsia-500/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Dashboard Overview</span>
              </button>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] uppercase font-mono tracking-wider text-gray-500 px-3 font-semibold">
                Configuration
              </p>
              <nav className="space-y-0.5">
                {[
                  { id: "moderation", label: "Bot Masters & Roles", icon: Shield },
                  { id: "logging", label: "Audit & Logging Channels", icon: FileText },
                  { id: "automod", label: "Auto-Mod Security", icon: Lock },
                  { id: "welcome", label: "Welcome & Goodbye", icon: Bell },
                  { id: "starboard", label: "Starboard (Hall of Fame)", icon: Star },
                  { id: "suggestions", label: "Suggestions Box", icon: ThumbsUp },
                  { id: "tempvc", label: "Temporary Voice Hubs", icon: Mic },
                  { id: "music", label: "Music & DJ Audio", icon: Music },
                  { id: "ai", label: "Gemini AI Chatbot", icon: Bot },
                  { id: "community", label: "Birthdays & Counting", icon: Gamepad2 },
                  { id: "announce", label: "Message Builder", icon: Megaphone },
                  { id: "perks", label: "VIP Perks & Monetization", icon: Coffee },
                ].map((item) => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as TabType)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2.5 transition ${
                        active
                          ? "bg-fuchsia-600/20 text-fuchsia-300 border border-fuchsia-500/30"
                          : "text-gray-400 hover:text-white hover:bg-white/[0.03]"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-gray-400 space-y-1">
            <p className="font-semibold text-gray-300">VePlexity Bot v2.0</p>
            <p className="text-[10px] text-gray-500">Connected to Discord Gateway</p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto pb-32 w-full">
          {/* Subpage Breadcrumb Header when not on overview */}
          {activeTab !== "overview" && (
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab("overview")}
                  className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Modules</span>
                </button>
                <span className="text-gray-600">/</span>
                <span className="text-xs font-bold text-white">{MODULE_TITLES[activeTab]}</span>
              </div>

              <button
                onClick={() => setActiveTab("overview")}
                className="text-xs px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition"
              >
                Back to Modules
              </button>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              1. OVERVIEW: MAKI-STYLE MODULAR GRID (SCREENSHOT 1)
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Maki-Style Server Banner Header */}
              <div className="p-6 rounded-2xl bg-[#14151b] border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#1e1f26] border border-white/10 overflow-hidden flex items-center justify-center font-black text-xl text-fuchsia-400 shadow-lg shrink-0">
                    {guild?.icon ? (
                      <img src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=128`} alt="" className="w-full h-full object-cover" />
                    ) : (
                      guild?.name.charAt(0)
                    )}
                  </div>
                  <div>
                    <h1 className="text-xl font-extrabold text-white">{guild?.name}</h1>
                    <p className="text-xs font-mono text-gray-400 mt-0.5">ID: {guild?.id}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                        Bot Active
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 font-medium">
                        {guild?.memberCount} Members
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
                  <Link
                    href="/dashboard"
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 transition"
                  >
                    Switch Server
                  </Link>
                </div>
              </div>

              {/* Maki-Style Modular Section: Customization & Administration */}
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 px-1">
                  Customization & Administration
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {/* Bot Masters */}
                  <div
                    onClick={() => setActiveTab("moderation")}
                    className="p-4 rounded-xl bg-[#15161c] hover:bg-[#1a1b23] border border-white/5 hover:border-white/10 transition cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                        <Shield className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-white group-hover:text-blue-300 transition">Bot Masters & Roles</h4>
                        <p className="text-[11px] text-gray-400 mt-0.5">Roles with admin & mod command authority</p>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white shrink-0">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Audit & Logging Channels (Skyra style) */}
                  <div
                    onClick={() => setActiveTab("logging")}
                    className="p-4 rounded-xl bg-[#15161c] hover:bg-[#1a1b23] border border-white/5 hover:border-white/10 transition cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-white group-hover:text-purple-300 transition">Audit & Logging Channels</h4>
                        <p className="text-[11px] text-gray-400 mt-0.5">Route edited, deleted & mod event logs</p>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white shrink-0">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Message Builder & Announcements */}
                  <div
                    onClick={() => setActiveTab("announce")}
                    className="p-4 rounded-xl bg-[#15161c] hover:bg-[#1a1b23] border border-white/5 hover:border-white/10 transition cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 shrink-0">
                        <Megaphone className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-white group-hover:text-fuchsia-300 transition">Message Builder</h4>
                        <p className="text-[11px] text-gray-400 mt-0.5">Send custom announcement embeds to chat</p>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white shrink-0">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Maki-Style Modular Section: Engagement & Community */}
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 px-1">
                  Engagement & Community
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {/* Welcome & Goodbye */}
                  <div
                    onClick={() => setActiveTab("welcome")}
                    className="p-4 rounded-xl bg-[#15161c] hover:bg-[#1a1b23] border border-white/5 hover:border-white/10 transition cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                        <Bell className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs text-white group-hover:text-emerald-300 transition">Welcome Messages</h4>
                          {welcomeEnabled && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                        </div>
                        <p className="text-[11px] text-gray-400 mt-0.5">Greet new members & assign auto-roles</p>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white shrink-0">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Starboard */}
                  <div
                    onClick={() => setActiveTab("starboard")}
                    className="p-4 rounded-xl bg-[#15161c] hover:bg-[#1a1b23] border border-white/5 hover:border-white/10 transition cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                        <Star className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-white group-hover:text-amber-300 transition">Starboard</h4>
                        <p className="text-[11px] text-gray-400 mt-0.5">Pin top community messages with stars</p>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white shrink-0">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Suggestions */}
                  <div
                    onClick={() => setActiveTab("suggestions")}
                    className="p-4 rounded-xl bg-[#15161c] hover:bg-[#1a1b23] border border-white/5 hover:border-white/10 transition cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                        <ThumbsUp className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-white group-hover:text-cyan-300 transition">Suggestions</h4>
                        <p className="text-[11px] text-gray-400 mt-0.5">Community suggestions with voting buttons</p>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white shrink-0">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Birthdays & Counting */}
                  <div
                    onClick={() => setActiveTab("community")}
                    className="p-4 rounded-xl bg-[#15161c] hover:bg-[#1a1b23] border border-white/5 hover:border-white/10 transition cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                        <Cake className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-white group-hover:text-pink-300 transition">Birthdays & Counting</h4>
                        <p className="text-[11px] text-gray-400 mt-0.5">Automated celebrations & counting streaks</p>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white shrink-0">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Maki-Style Modular Section: Security & Voice */}
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 px-1">
                  Security, Voice & AI
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {/* Auto-Mod Security */}
                  <div
                    onClick={() => setActiveTab("automod")}
                    className="p-4 rounded-xl bg-[#15161c] hover:bg-[#1a1b23] border border-white/5 hover:border-white/10 transition cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                        <Lock className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-white group-hover:text-red-300 transition">Auto-Mod Security</h4>
                        <p className="text-[11px] text-gray-400 mt-0.5">Anti-Invite, Anti-Spam & Bad Words filter</p>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white shrink-0">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Temp Voice Hubs */}
                  <div
                    onClick={() => setActiveTab("tempvc")}
                    className="p-4 rounded-xl bg-[#15161c] hover:bg-[#1a1b23] border border-white/5 hover:border-white/10 transition cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">
                        <Mic className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-white group-hover:text-violet-300 transition">Temporary Voice Hubs</h4>
                        <p className="text-[11px] text-gray-400 mt-0.5">Join-to-Create private customizable VCs</p>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white shrink-0">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Music & DJ */}
                  <div
                    onClick={() => setActiveTab("music")}
                    className="p-4 rounded-xl bg-[#15161c] hover:bg-[#1a1b23] border border-white/5 hover:border-white/10 transition cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                        <Music className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-white group-hover:text-indigo-300 transition">Music & DJ Audio</h4>
                        <p className="text-[11px] text-gray-400 mt-0.5">DJ permissions & default volume controls</p>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white shrink-0">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* AI Chatbot */}
                  <div
                    onClick={() => setActiveTab("ai")}
                    className="p-4 rounded-xl bg-[#15161c] hover:bg-[#1a1b23] border border-white/5 hover:border-white/10 transition cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-white group-hover:text-purple-300 transition">Gemini AI Chatbot</h4>
                        <p className="text-[11px] text-gray-400 mt-0.5">AI chat channel & custom personalities</p>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white shrink-0">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* VIP Perks */}
                  <div
                    onClick={() => setActiveTab("perks")}
                    className="p-4 rounded-xl bg-[#15161c] hover:bg-[#1a1b23] border border-white/5 hover:border-white/10 transition cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                        <Coffee className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-white group-hover:text-amber-300 transition">VIP Perks & Support</h4>
                        <p className="text-[11px] text-gray-400 mt-0.5">Unlock 8 gated commands & BMC perks</p>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white shrink-0">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              2. BOT MASTERS & MODERATOR ROLES (MEE6 STYLE - SCREENSHOT 2)
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "moderation" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Settings Panel */}
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 rounded-2xl bg-[#15161c] border border-white/5 space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-400" />
                      <span>Bot Masters (Moderator Roles)</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Bot masters are Discord roles that can administer VePlexity and execute moderation commands (<code className="text-blue-300">/ban</code>, <code className="text-blue-300">/kick</code>, <code className="text-blue-300">/timeout</code>, <code className="text-blue-300">/warn</code>). Roles with Discord Administrator permission are automatically bot masters.
                    </p>
                  </div>

                  <div className="pt-2 space-y-2">
                    <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                      Active Moderator Roles:
                    </label>

                    <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto pr-1">
                      {guild?.roles
                        ?.filter((r) => r.name !== "@everyone")
                        .map((role) => {
                          const isSelected = modRoles.includes(role.id);
                          const hexColor = role.color ? `#${role.color.toString(16).padStart(6, "0")}` : "#99aab5";
                          return (
                            <button
                              key={role.id}
                              type="button"
                              onClick={() => toggleModRole(role.id)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition flex items-center gap-2 ${
                                isSelected
                                  ? "bg-blue-600/20 border-blue-500 text-white"
                                  : "bg-[#1c1d24] border-white/5 text-gray-300 hover:border-white/20"
                              }`}
                            >
                              <span
                                className="w-2.5 h-2.5 rounded-full shrink-0"
                                style={{ backgroundColor: hexColor }}
                              />
                              <span>{role.name}</span>
                              {isSelected && <Check className="w-3 h-3 text-blue-400 ml-0.5" />}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                </div>

                {/* Primary Mod Log Channel */}
                <div className="p-6 rounded-2xl bg-[#15161c] border border-white/5 space-y-3">
                  <div>
                    <h3 className="text-sm font-bold text-white">Default Infraction Log Channel</h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      The channel where bans, kicks, and timeouts will be logged by default.
                    </p>
                  </div>

                  <select
                    value={modLogChannel}
                    onChange={(e) => setModLogChannel(e.target.value)}
                    className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-blue-500/50"
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

              {/* Right Output Visualizer: Discord Mod Log Embed */}
              <div className="lg:col-span-5 space-y-2 sticky top-20">
                <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                  <span className="font-semibold uppercase text-[10px] tracking-wider">Discord Output Visualizer</span>
                  <span className="text-[10px] font-mono text-blue-400">#mod-logs</span>
                </div>

                <div className="rounded-2xl bg-[#313338] border border-black/30 p-4 font-sans text-xs shadow-2xl space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-xs shrink-0 overflow-hidden">
                      <img src="/vp-logo-icon.png" alt="VP" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">VePlexity</span>
                        <span className="px-1 py-0.2 rounded bg-[#5865F2] text-white text-[9px] font-extrabold">BOT</span>
                        <span className="text-[10px] text-gray-400">Today at 4:20 PM</span>
                      </div>

                      {/* Embed Output */}
                      <div className="rounded-lg bg-[#2b2d31] border-l-4 border-red-500 p-3.5 space-y-2 max-w-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">🔨 Member Banned | Case #14</span>
                        </div>
                        <div className="space-y-1 text-xs text-gray-300">
                          <p><strong>Offender:</strong> @SpammerUser <span className="text-gray-400 text-[10px]">(ID: 10492819)</span></p>
                          <p><strong>Moderator:</strong> @Moderator <span className="text-gray-400 text-[10px]">(ID: 981240)</span></p>
                          <p><strong>Reason:</strong> Advertising invite links across public channels</p>
                          <p><strong>Channel:</strong> #general</p>
                        </div>
                        <div className="pt-2 border-t border-white/5 text-[10px] text-gray-400 flex items-center justify-between">
                          <span>VePlexity ModShield</span>
                          <span>Today at 4:20 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 px-1">
                  This shows the exact infraction record sent to your configured mod log channel whenever a moderator runs a command.
                </p>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              3. AUDIT & LOGGING CHANNELS (SKYRA STYLE - SCREENSHOT 4)
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "logging" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Settings Panel */}
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 rounded-2xl bg-[#15161c] border border-white/5 space-y-5">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-purple-400" />
                      <span>Skyra-Style Event Logging Channels</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Configure granular dedicated channels for specific server events. Click on an event button to preview its live Discord log output on the right.
                    </p>
                  </div>

                  {/* Granular Channel Selectors */}
                  <div className="space-y-3 pt-1">
                    {[
                      { key: "messageEdit", label: "Message Edit / Update Logs", desc: "Logs edited messages with Before and After diff" },
                      { key: "messageDelete", label: "Message Delete Logs", desc: "Logs deleted messages and author info" },
                      { key: "modActions", label: "Moderation Action Logs", desc: "Logs bans, kicks, timeouts and warnings" },
                      { key: "memberJoin", label: "Member Join Logs", desc: "Logs new arrivals with account age" },
                      { key: "memberLeave", label: "Member Leave Logs", desc: "Logs departing members with remaining count" },
                      { key: "roleUpdate", label: "Role & Permission Logs", desc: "Logs role changes made to members" },
                    ].map((item) => {
                      const currentVal = (loggingChannels as any)[item.key] || "";
                      const isSelected = activeLogPreview === item.key;
                      return (
                        <div
                          key={item.key}
                          onClick={() => setActiveLogPreview(item.key as LogPreviewType)}
                          className={`p-3.5 rounded-xl border transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            isSelected
                              ? "bg-purple-950/20 border-purple-500/50"
                              : "bg-[#1c1d24] border-white/5 hover:border-white/15"
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white">{item.label}</span>
                              {isSelected && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 font-mono">
                                  Previewing
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-gray-400 mt-0.5">{item.desc}</p>
                          </div>

                          <select
                            value={currentVal}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              setLoggingChannels({
                                ...loggingChannels,
                                [item.key]: e.target.value || null
                              });
                            }}
                            className="bg-[#14151a] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-purple-500/50 shrink-0"
                          >
                            <option value="">Use Default Mod Log</option>
                            {guild?.channels?.text?.map((c) => (
                              <option key={c.id} value={c.id}>
                                #{c.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Output Visualizer: Discord Log Embed (Dynamic based on selected event) */}
              <div className="lg:col-span-5 space-y-2 sticky top-20">
                <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                  <span className="font-semibold uppercase text-[10px] tracking-wider">Discord Output Visualizer</span>
                  <span className="text-[10px] font-mono text-purple-400">
                    {activeLogPreview === "messageEdit" && "#message-logs"}
                    {activeLogPreview === "messageDelete" && "#deleted-messages"}
                    {activeLogPreview === "modAction" && "#mod-logs"}
                    {activeLogPreview === "memberJoin" && "#join-logs"}
                    {activeLogPreview === "memberLeave" && "#leave-logs"}
                    {activeLogPreview === "roleUpdate" && "#role-logs"}
                  </span>
                </div>

                {/* Discord Message Preview Box */}
                <div className="rounded-2xl bg-[#313338] border border-black/30 p-4 font-sans text-xs shadow-2xl space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white text-xs shrink-0 overflow-hidden">
                      <img src="/vp-logo-icon.png" alt="VP" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">VePlexity Logger</span>
                        <span className="px-1 py-0.2 rounded bg-[#5865F2] text-white text-[9px] font-extrabold">BOT</span>
                        <span className="text-[10px] text-gray-400">Today at 4:21 PM</span>
                      </div>

                      {/* 1. Message Edit Preview */}
                      {activeLogPreview === "messageEdit" && (
                        <div className="rounded-lg bg-[#2b2d31] border-l-4 border-amber-400 p-3.5 space-y-2 max-w-sm">
                          <p className="font-bold text-white text-xs">📝 Message Edited in #general</p>
                          <div className="space-y-1.5 text-xs text-gray-300">
                            <p><strong>Author:</strong> @Veer <span className="text-gray-400 text-[10px]">(ID: 1469048463760036075)</span></p>
                            <div className="p-2 rounded bg-black/30 border border-white/5 space-y-1 font-mono text-[11px]">
                              <p className="text-red-300 line-through">Before: hey guys check out my twitch stream</p>
                              <p className="text-emerald-300">After: hey guys check out the new bot update!</p>
                            </div>
                          </div>
                          <div className="pt-2 border-t border-white/5 text-[10px] text-gray-400 flex items-center justify-between">
                            <span>Message ID: 129481920391</span>
                            <span>Jump to Message</span>
                          </div>
                        </div>
                      )}

                      {/* 2. Message Delete Preview */}
                      {activeLogPreview === "messageDelete" && (
                        <div className="rounded-lg bg-[#2b2d31] border-l-4 border-red-500 p-3.5 space-y-2 max-w-sm">
                          <p className="font-bold text-white text-xs">🗑️ Message Deleted in #general</p>
                          <div className="space-y-1 text-xs text-gray-300">
                            <p><strong>Author:</strong> @Alex <span className="text-gray-400 text-[10px]">(ID: 98127391823)</span></p>
                            <p><strong>Content:</strong></p>
                            <div className="p-2 rounded bg-black/30 border border-white/5 text-gray-300 text-[11px]">
                              &quot;Oops, wrong channel sorry about that!&quot;
                            </div>
                          </div>
                          <div className="pt-2 border-t border-white/5 text-[10px] text-gray-400 flex items-center justify-between">
                            <span>Message ID: 129481920400</span>
                            <span>Today at 4:21 PM</span>
                          </div>
                        </div>
                      )}

                      {/* 3. Moderation Action Preview */}
                      {activeLogPreview === "modAction" && (
                        <div className="rounded-lg bg-[#2b2d31] border-l-4 border-red-500 p-3.5 space-y-2 max-w-sm">
                          <p className="font-bold text-white text-xs">🔨 User Banned | Case #14</p>
                          <div className="space-y-1 text-xs text-gray-300">
                            <p><strong>Offender:</strong> @SpammerUser <span className="text-gray-400 text-[10px]">(ID: 10492819)</span></p>
                            <p><strong>Moderator:</strong> @Moderator</p>
                            <p><strong>Reason:</strong> Advertising unauthorized Discord links</p>
                          </div>
                          <div className="pt-2 border-t border-white/5 text-[10px] text-gray-400 flex items-center justify-between">
                            <span>VePlexity ModShield</span>
                            <span>Today at 4:20 PM</span>
                          </div>
                        </div>
                      )}

                      {/* 4. Member Join Preview */}
                      {activeLogPreview === "memberJoin" && (
                        <div className="rounded-lg bg-[#2b2d31] border-l-4 border-emerald-400 p-3.5 space-y-2 max-w-sm">
                          <p className="font-bold text-white text-xs">📥 Member Joined Server</p>
                          <div className="space-y-1 text-xs text-gray-300">
                            <p><strong>Member:</strong> @NewMember <span className="text-gray-400 text-[10px]">(NewMember#0001)</span></p>
                            <p><strong>Account Age:</strong> Created 4 months ago</p>
                            <p><strong>Server Total:</strong> {guild?.memberCount} members</p>
                          </div>
                          <div className="pt-2 border-t border-white/5 text-[10px] text-gray-400 flex items-center justify-between">
                            <span>User ID: 81928491029</span>
                            <span>Today at 4:21 PM</span>
                          </div>
                        </div>
                      )}

                      {/* 5. Member Leave Preview */}
                      {activeLogPreview === "memberLeave" && (
                        <div className="rounded-lg bg-[#2b2d31] border-l-4 border-gray-500 p-3.5 space-y-2 max-w-sm">
                          <p className="font-bold text-white text-xs">📤 Member Left Server</p>
                          <div className="space-y-1 text-xs text-gray-300">
                            <p><strong>Member:</strong> @DepartedUser <span className="text-gray-400 text-[10px]">(ID: 7182910)</span></p>
                            <p><strong>Remaining Members:</strong> {((guild?.memberCount || 1) - 1)} members</p>
                          </div>
                          <div className="pt-2 border-t border-white/5 text-[10px] text-gray-400 flex items-center justify-between">
                            <span>User ID: 7182910</span>
                            <span>Today at 4:21 PM</span>
                          </div>
                        </div>
                      )}

                      {/* 6. Role Update Preview */}
                      {activeLogPreview === "roleUpdate" && (
                        <div className="rounded-lg bg-[#2b2d31] border-l-4 border-blue-400 p-3.5 space-y-2 max-w-sm">
                          <p className="font-bold text-white text-xs">🏷️ Member Roles Updated</p>
                          <div className="space-y-1 text-xs text-gray-300">
                            <p><strong>Target:</strong> @Alex</p>
                            <p><strong>Added:</strong> <span className="text-emerald-400 font-mono text-[11px]">+VIP Supporter</span></p>
                            <p><strong>Updated By:</strong> @ServerOwner</p>
                          </div>
                          <div className="pt-2 border-t border-white/5 text-[10px] text-gray-400 flex items-center justify-between">
                            <span>Audit Case #15</span>
                            <span>Today at 4:21 PM</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 px-1">
                  Click any event in the left list to see how that specific log format appears in Discord.
                </p>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              4. WELCOME & GOODBYE (HYDRA / MAKI STYLE - SCREENSHOT 1 & 3)
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "welcome" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Settings Panel */}
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 rounded-2xl bg-[#15161c] border border-white/5 space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Bell className="w-4 h-4 text-emerald-400" />
                        <span>Welcome & Goodbye Messages</span>
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Greet new arrivals with custom messages and auto-roles.
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      checked={welcomeEnabled}
                      onChange={(e) => setWelcomeEnabled(e.target.checked)}
                      className="w-5 h-5 accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  {welcomeEnabled && (
                    <div className="space-y-4 pt-3 border-t border-white/5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[11px] font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                            Welcome Channel
                          </label>
                          <select
                            value={welcomeChannel}
                            onChange={(e) => setWelcomeChannel(e.target.value)}
                            className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-emerald-500/50"
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
                          <label className="text-[11px] font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                            Auto-Role on Join
                          </label>
                          <select
                            value={autoRoleId}
                            onChange={(e) => setAutoRoleId(e.target.value)}
                            className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-emerald-500/50"
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
                        <label className="text-[11px] font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                          Welcome Message Content
                        </label>
                        <textarea
                          rows={3}
                          value={welcomeMessage}
                          onChange={(e) => setWelcomeMessage(e.target.value)}
                          className="w-full bg-[#1c1d24] border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-emerald-500/50"
                          placeholder="Welcome to {server}, {user}! We're thrilled to have you here 🎉"
                        />
                        <div className="flex items-center gap-1.5 mt-2 text-[11px] text-gray-400 flex-wrap">
                          <span>Click to insert:</span>
                          <button
                            type="button"
                            onClick={() => setWelcomeMessage((m) => m + " {user}")}
                            className="px-2 py-0.5 rounded bg-white/5 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-mono transition"
                          >
                            + &#123;user&#125;
                          </button>
                          <button
                            type="button"
                            onClick={() => setWelcomeMessage((m) => m + " {server}")}
                            className="px-2 py-0.5 rounded bg-white/5 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-mono transition"
                          >
                            + &#123;server&#125;
                          </button>
                          <button
                            type="button"
                            onClick={() => setWelcomeMessage((m) => m + " {memberCount}")}
                            className="px-2 py-0.5 rounded bg-white/5 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-mono transition"
                          >
                            + &#123;memberCount&#125;
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Output Visualizer: Discord Welcome Embed */}
              <div className="lg:col-span-5 space-y-2 sticky top-20">
                <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                  <span className="font-semibold uppercase text-[10px] tracking-wider">Discord Output Visualizer</span>
                  <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg text-[10px]">
                    <button
                      type="button"
                      onClick={() => setWelcomePreviewMode("welcome")}
                      className={`px-2 py-0.5 rounded ${welcomePreviewMode === "welcome" ? "bg-emerald-500/20 text-emerald-300 font-bold" : "text-gray-400"}`}
                    >
                      Welcome
                    </button>
                    <button
                      type="button"
                      onClick={() => setWelcomePreviewMode("goodbye")}
                      className={`px-2 py-0.5 rounded ${welcomePreviewMode === "goodbye" ? "bg-gray-500/20 text-gray-300 font-bold" : "text-gray-400"}`}
                    >
                      Goodbye
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#313338] border border-black/30 p-4 font-sans text-xs shadow-2xl space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-xs shrink-0 overflow-hidden">
                      <img src="/vp-logo-icon.png" alt="VP" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">VePlexity</span>
                        <span className="px-1 py-0.2 rounded bg-[#5865F2] text-white text-[9px] font-extrabold">BOT</span>
                        <span className="text-[10px] text-gray-400">Today at 4:20 PM</span>
                      </div>

                      {welcomePreviewMode === "welcome" ? (
                        <div className="rounded-lg bg-[#2b2d31] border-l-4 border-fuchsia-500 p-3.5 space-y-2.5 max-w-sm">
                          <p className="font-bold text-white text-xs">👋 New Member Arrived!</p>
                          <p className="text-xs text-gray-200 whitespace-pre-wrap leading-relaxed">
                            {welcomeMessage
                              ? welcomeMessage
                                  .replace(/{user}/g, "@NewMember")
                                  .replace(/{server}/g, guild?.name || "Server")
                                  .replace(/{memberCount}/g, String((guild?.memberCount || 0) + 1))
                              : `Welcome to ${guild?.name || "Server"}, @NewMember! We're thrilled to have you here 🎉`}
                          </p>

                          {autoRoleId && (
                            <div className="pt-2 border-t border-white/5 flex items-center gap-2 text-[11px]">
                              <span className="text-gray-400">Assigned:</span>
                              <span className="px-2 py-0.5 rounded-full bg-white/5 text-fuchsia-300 font-medium flex items-center gap-1.5 border border-white/10">
                                <span
                                  className="w-2 h-2 rounded-full"
                                  style={{
                                    backgroundColor:
                                      guild?.roles?.find((r) => r.id === autoRoleId)?.color
                                        ? `#${guild.roles.find((r) => r.id === autoRoleId)!.color.toString(16).padStart(6, "0")}`
                                        : "#BD5FFF"
                                  }}
                                />
                                <span>{guild?.roles?.find((r) => r.id === autoRoleId)?.name || "Role"}</span>
                              </span>
                            </div>
                          )}

                          <div className="pt-2 border-t border-white/5 text-[10px] text-gray-400 flex items-center justify-between">
                            <span>Member #{((guild?.memberCount || 0) + 1)}</span>
                            <span>{guild?.name}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-lg bg-[#2b2d31] border-l-4 border-gray-500 p-3.5 space-y-2 max-w-sm">
                          <p className="text-xs text-gray-300">
                            👋 <strong>DepartedUser#0001</strong> has left the server. We wish them the best! (We are now at <strong>{guild?.memberCount}</strong> members)
                          </p>
                          <div className="pt-1 text-[10px] text-gray-500">
                            Today at 4:21 PM
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 px-1">
                  Live preview updates as you type your message or select an auto-role.
                </p>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              5. AUTO-MOD SECURITY SHIELD
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "automod" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 rounded-2xl bg-[#15161c] border border-white/5 space-y-5">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Lock className="w-4 h-4 text-red-400" />
                      <span>Auto-Mod Defense Filters</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Automated real-time shields that monitor chat and delete malicious content.
                    </p>
                  </div>

                  <div className="space-y-3 pt-1">
                    {[
                      {
                        id: "antiInvite",
                        label: "Block Discord Invites",
                        desc: "Deletes unauthorized Discord invite links sent by regular members.",
                        value: antiInvite,
                        setter: setAntiInvite
                      },
                      {
                        id: "antiSpam",
                        label: "Anti-Spam Rate Limiter",
                        desc: "Prevents rapid message spam and mass mentions (>4 pings).",
                        value: antiSpam,
                        setter: setAntiSpam
                      },
                      {
                        id: "antiBadWords",
                        label: "Profanity & Slur Filter",
                        desc: "Filters severe hate speech and slurs to keep chat compliant.",
                        value: antiBadWords,
                        setter: setAntiBadWords
                      }
                    ].map((rule) => (
                      <div
                        key={rule.id}
                        className="p-3.5 rounded-xl bg-[#1c1d24] border border-white/5 flex items-center justify-between gap-4"
                      >
                        <div>
                          <p className="font-bold text-xs text-white">{rule.label}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">{rule.desc}</p>
                        </div>

                        <input
                          type="checkbox"
                          checked={rule.value}
                          onChange={(e) => rule.setter(e.target.checked)}
                          className="w-5 h-5 accent-red-500 cursor-pointer shrink-0"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Output Visualizer: Discord Member Warning & Mod Log */}
              <div className="lg:col-span-5 space-y-2 sticky top-20">
                <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                  <span className="font-semibold uppercase text-[10px] tracking-wider">Discord Output Visualizer</span>
                  <span className="text-[10px] font-mono text-red-400">#general & #mod-logs</span>
                </div>

                <div className="rounded-2xl bg-[#313338] border border-black/30 p-4 font-sans text-xs shadow-2xl space-y-4">
                  {/* What Member Sees */}
                  <div className="space-y-2 border-b border-white/5 pb-3">
                    <p className="text-[10px] font-mono uppercase text-gray-400 font-bold">1. What member sees in channel:</p>
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-red-600/80 flex items-center justify-center font-bold text-white text-[10px] shrink-0">
                        🛡️
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-white text-xs">VePlexity Shield</span>
                          <span className="px-1 py-0.2 rounded bg-[#5865F2] text-white text-[9px] font-extrabold">BOT</span>
                        </div>
                        <p className="text-[11px] text-amber-200 bg-amber-500/10 p-2 rounded border border-amber-500/20">
                          ⚠️ <span className="font-semibold">@Alex</span>, your message was deleted for containing an unauthorized Discord invite link.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* What Moderators See in Log */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-mono uppercase text-gray-400 font-bold">2. Logged to #mod-logs:</p>
                    <div className="rounded-lg bg-[#2b2d31] border-l-4 border-red-500 p-3 space-y-1.5 text-xs">
                      <p className="font-bold text-white">🛡️ Auto-Mod Triggered: Discord Invite Blocked</p>
                      <p className="text-gray-300"><strong>User:</strong> @Alex <span className="text-gray-500 text-[10px]">(ID: 981273)</span></p>
                      <p className="text-gray-300"><strong>Channel:</strong> #general</p>
                      <p className="text-gray-300"><strong>Payload:</strong> <code className="text-red-300 font-mono text-[10px]">https://discord.gg/nitro-2026</code></p>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 px-1">
                  Illustrates the real-time deletion response and mod log record generated by Auto-Mod.
                </p>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              6. STARBOARD (HALL OF FAME)
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "starboard" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 rounded-2xl bg-[#15161c] border border-white/5 space-y-5">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-400" />
                      <span>Starboard (Hall of Fame)</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      When community messages reach your star reaction threshold, the bot automatically pins them to the Starboard channel.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="text-[11px] font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                        Starboard Channel
                      </label>
                      <select
                        value={starboardChannel}
                        onChange={(e) => setStarboardChannel(e.target.value)}
                        className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500/50"
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
                      <label className="text-[11px] font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                        Required Stars Threshold
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={25}
                        value={starboardStars}
                        onChange={(e) => setStarboardStars(Number(e.target.value))}
                        className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500/50"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Output Visualizer: Discord Starboard Embed */}
              <div className="lg:col-span-5 space-y-2 sticky top-20">
                <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                  <span className="font-semibold uppercase text-[10px] tracking-wider">Discord Output Visualizer</span>
                  <span className="text-[10px] font-mono text-amber-400">#starboard</span>
                </div>

                <div className="rounded-2xl bg-[#313338] border border-black/30 p-4 font-sans text-xs shadow-2xl space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs pb-1 border-b border-white/5">
                    <span>⭐ {starboardStars} | #general</span>
                    <span className="text-gray-400 text-[10px] font-mono font-normal">ID: 104928109</span>
                  </div>

                  <div className="rounded-lg bg-[#2b2d31] border-l-4 border-amber-400 p-3.5 space-y-2 max-w-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-white text-[9px]">
                        A
                      </div>
                      <span className="font-bold text-white text-xs">CommunityMember</span>
                    </div>

                    <p className="text-gray-200 text-xs leading-relaxed">
                      &quot;This bot has been running without a single crash for 3 months now. Best Discord bot update we&apos;ve seen! 🔥✨&quot;
                    </p>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-amber-300">
                      <span className="hover:underline cursor-pointer">Jump to Original Message ➔</span>
                      <span className="text-gray-500">Today at 4:18 PM</span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 px-1">
                  Shows how pinned messages appear in the starboard channel when the {starboardStars}-star threshold is met.
                </p>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              7. COMMUNITY SUGGESTIONS BOX
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "suggestions" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 rounded-2xl bg-[#15161c] border border-white/5 space-y-5">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4 text-cyan-400" />
                      <span>Community Suggestions Box</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      When members run <code className="text-cyan-300">/suggest</code>, the bot formats their idea into a rich embed with interactive voting buttons.
                    </p>
                  </div>

                  <div className="pt-1">
                    <label className="text-[11px] font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                      Dedicated Suggestions Channel
                    </label>
                    <select
                      value={suggestionsChannel}
                      onChange={(e) => setSuggestionsChannel(e.target.value)}
                      className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-cyan-500/50"
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
              </div>

              {/* Right Output Visualizer: Discord Suggestion Embed */}
              <div className="lg:col-span-5 space-y-2 sticky top-20">
                <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                  <span className="font-semibold uppercase text-[10px] tracking-wider">Discord Output Visualizer</span>
                  <span className="text-[10px] font-mono text-cyan-400">#suggestions</span>
                </div>

                <div className="rounded-2xl bg-[#313338] border border-black/30 p-4 font-sans text-xs shadow-2xl space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-cyan-600 flex items-center justify-center font-bold text-white text-xs shrink-0 overflow-hidden">
                      <img src="/vp-logo-icon.png" alt="VP" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">VePlexity</span>
                        <span className="px-1 py-0.2 rounded bg-[#5865F2] text-white text-[9px] font-extrabold">BOT</span>
                        <span className="text-[10px] text-gray-400">Today at 4:21 PM</span>
                      </div>

                      <div className="rounded-lg bg-[#2b2d31] border-l-4 border-cyan-400 p-3.5 space-y-2.5 max-w-sm">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-xs">💡 Suggestion #28</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300">
                            Voting Open
                          </span>
                        </div>

                        <p className="text-gray-200 text-xs leading-relaxed">
                          &quot;Can we create a weekend gaming tournament voice channel with prizes for top scores?&quot;
                        </p>

                        <div className="pt-2 border-t border-white/5 flex items-center gap-2">
                          <div className="px-2.5 py-1 rounded bg-[#383a40] text-emerald-400 text-xs flex items-center gap-1.5 font-bold border border-white/5">
                            <ThumbsUp className="w-3.5 h-3.5" />
                            <span>18</span>
                          </div>
                          <div className="px-2.5 py-1 rounded bg-[#383a40] text-red-400 text-xs flex items-center gap-1.5 font-bold border border-white/5">
                            <ThumbsDown className="w-3.5 h-3.5" />
                            <span>2</span>
                          </div>
                        </div>

                        <div className="pt-1 text-[10px] text-gray-400">
                          Submitted by @Alex • Today at 4:21 PM
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 px-1">
                  Shows how suggestions with Discord interactive vote buttons render in the channel.
                </p>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              8. TEMPORARY VOICE HUBS
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "tempvc" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 rounded-2xl bg-[#15161c] border border-white/5 space-y-5">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Mic className="w-4 h-4 text-violet-400" />
                      <span>Join-to-Create Temporary Voice Hubs</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Whenever members connect to the Hub, a private voice room is spawned. It auto-deletes when the last member leaves!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="text-[11px] font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                        Hub Generator Channel
                      </label>
                      <select
                        value={tempVcHub}
                        onChange={(e) => setTempVcHub(e.target.value)}
                        className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-violet-500/50"
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
                      <label className="text-[11px] font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                        Parent Category
                      </label>
                      <select
                        value={tempVcCategory}
                        onChange={(e) => setTempVcCategory(e.target.value)}
                        className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-violet-500/50"
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

              {/* Right Output Visualizer: Discord Voice Channel List */}
              <div className="lg:col-span-5 space-y-2 sticky top-20">
                <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                  <span className="font-semibold uppercase text-[10px] tracking-wider">Discord Output Visualizer</span>
                  <span className="text-[10px] font-mono text-violet-400">Channel Sidebar</span>
                </div>

                <div className="rounded-2xl bg-[#2b2d31] border border-black/30 p-4 font-sans text-xs shadow-2xl space-y-3">
                  <p className="text-[11px] uppercase font-bold text-gray-400 tracking-wider">
                    {guild?.channels?.categories?.find(c => c.id === tempVcCategory)?.name || "VOICE CHANNELS"}
                  </p>

                  <div className="space-y-1.5 text-xs">
                    {/* The Hub */}
                    <div className="flex items-center gap-2 text-gray-300 p-2 rounded hover:bg-white/5 transition">
                      <span className="text-violet-400 font-bold">🔊</span>
                      <span className="font-medium">{guild?.channels?.voice?.find(c => c.id === tempVcHub)?.name || "[+] Join to Create"}</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/5 text-gray-400 ml-auto font-mono">Hub</span>
                    </div>

                    {/* The Auto-Created Room */}
                    <div className="pl-4 flex flex-col gap-1 border-l-2 border-violet-500/50 ml-3 py-1">
                      <div className="flex items-center gap-2 text-white bg-violet-500/10 p-2 rounded border border-violet-500/20">
                        <span className="text-violet-400">🔒 🔊</span>
                        <span className="font-bold">Alex&apos;s Room</span>
                        <span className="text-[10px] font-mono text-violet-300 ml-auto">2/4</span>
                      </div>
                      <div className="pl-6 space-y-1 text-[11px] text-gray-400">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>Alex (Owner)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>Sam</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 px-1">
                  Illustrates the dynamic channel spawned under your category when a member connects.
                </p>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              9. MUSIC & DJ AUDIO (CLEAN, NO GIMMICKS)
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "music" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 rounded-2xl bg-[#15161c] border border-white/5 space-y-5">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Music className="w-4 h-4 text-indigo-400" />
                      <span>Music Playback & DJ Authority</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Designate a DJ role to restrict playback controls (skip, stop, volume) to authorized members.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="text-[11px] font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                        Designated DJ Role
                      </label>
                      <select
                        value={djRole}
                        onChange={(e) => setDjRole(e.target.value)}
                        className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500/50"
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
                      <label className="text-[11px] font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                        Default Playback Volume ({defaultVolume}%)
                      </label>
                      <div className="flex items-center gap-3 bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2">
                        <Volume2 className="w-4 h-4 text-gray-400 shrink-0" />
                        <input
                          type="range"
                          min="10"
                          max="150"
                          step="5"
                          value={defaultVolume}
                          onChange={(e) => setDefaultVolume(Number(e.target.value))}
                          className="w-full accent-indigo-500 cursor-pointer"
                        />
                        <span className="text-xs font-mono text-gray-300 w-10 text-right">{defaultVolume}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Output Visualizer: Discord /nowplaying Card */}
              <div className="lg:col-span-5 space-y-2 sticky top-20">
                <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                  <span className="font-semibold uppercase text-[10px] tracking-wider">Discord Output Visualizer</span>
                  <span className="text-[10px] font-mono text-indigo-400">#music-chat</span>
                </div>

                <div className="rounded-2xl bg-[#313338] border border-black/30 p-4 font-sans text-xs shadow-2xl space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-xs shrink-0 overflow-hidden">
                      <img src="/vp-logo-icon.png" alt="VP" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">VePlexity Music</span>
                        <span className="px-1 py-0.2 rounded bg-[#5865F2] text-white text-[9px] font-extrabold">BOT</span>
                      </div>

                      <div className="rounded-lg bg-[#2b2d31] border-l-4 border-indigo-500 p-3.5 space-y-2.5 max-w-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">🎵 Now Playing</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                            Vol: {defaultVolume}%
                          </span>
                        </div>

                        <div>
                          <p className="font-bold text-sm text-white">Blinding Lights</p>
                          <p className="text-xs text-gray-400">The Weeknd • After Hours</p>
                        </div>

                        <div className="space-y-1 font-mono text-[10px] text-gray-400">
                          <p className="text-indigo-400">🔘▬▬▬▬▬▬▬▬▬▬▬▬▬▬ 01:24 / 03:20</p>
                        </div>

                        <div className="pt-2 border-t border-white/5 flex items-center gap-1.5 text-xs">
                          <span className="px-2 py-1 rounded bg-[#383a40] text-gray-200">⏸️ Pause</span>
                          <span className="px-2 py-1 rounded bg-[#383a40] text-gray-200">⏭️ Skip</span>
                          <span className="px-2 py-1 rounded bg-[#383a40] text-gray-200">🔀 Shuffle</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 px-1">
                  Shows the Discord music player embed sent when users play songs in voice channels.
                </p>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              10. GEMINI AI CHATBOT
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "ai" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 rounded-2xl bg-[#15161c] border border-white/5 space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Bot className="w-4 h-4 text-purple-400" />
                        <span>Gemini AI Chatbot Engine</span>
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Enable the bot to converse, answer questions, and roleplay.
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      checked={aiEnabled}
                      onChange={(e) => setAiEnabled(e.target.checked)}
                      className="w-5 h-5 accent-purple-500 cursor-pointer"
                    />
                  </div>

                  {aiEnabled && (
                    <div className="space-y-4 pt-3 border-t border-white/5">
                      <div>
                        <label className="text-[11px] font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                          Dedicated AI Text Channel
                        </label>
                        <select
                          value={aiChannel}
                          onChange={(e) => setAiChannel(e.target.value)}
                          className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-purple-500/50"
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
                        <label className="text-[11px] font-semibold uppercase text-gray-400 tracking-wider mb-2 block">
                          AI Personality Preset
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          {[
                            { id: "standard", label: "Friendly & Helpful", desc: "Balanced, polite assistant." },
                            { id: "savage", label: "Savage & Roast", desc: "Hilarious clapbacks & roasts." },
                            { id: "anime", label: "Tsundere Anime", desc: "Anime banter with reactions." },
                          ].map((mode) => (
                            <button
                              key={mode.id}
                              type="button"
                              onClick={() => setAiMode(mode.id)}
                              className={`p-3 rounded-xl border text-left transition ${
                                aiMode === mode.id
                                  ? "bg-purple-600/20 border-purple-500 text-white"
                                  : "bg-[#1c1d24] border-white/5 text-gray-300 hover:border-white/15"
                              }`}
                            >
                              <p className="font-bold text-xs">{mode.label}</p>
                              <p className="text-[10px] text-gray-400 mt-1">{mode.desc}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Output Visualizer: Discord AI Conversation Mockup */}
              <div className="lg:col-span-5 space-y-2 sticky top-20">
                <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                  <span className="font-semibold uppercase text-[10px] tracking-wider">Discord Output Visualizer</span>
                  <span className="text-[10px] font-mono text-purple-400">#ai-chat</span>
                </div>

                <div className="rounded-2xl bg-[#313338] border border-black/30 p-4 font-sans text-xs shadow-2xl space-y-3">
                  {/* User message */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-white text-[10px] shrink-0">
                      U
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white text-xs">CommunityMember</span>
                        <span className="text-[9px] text-gray-400">4:21 PM</span>
                      </div>
                      <p className="text-gray-200 text-xs">
                        {aiMode === "standard" && "Hey VePlexity, what can you do for our server?"}
                        {aiMode === "savage" && "VePlexity, roast our server right now."}
                        {aiMode === "anime" && "VePlexity-chan, will you help me today?"}
                      </p>
                    </div>
                  </div>

                  {/* Bot reply */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white text-[10px] shrink-0 overflow-hidden">
                      <img src="/vp-logo-icon.png" alt="VP" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white text-xs">VePlexity</span>
                        <span className="px-1 py-0.2 rounded bg-[#5865F2] text-white text-[9px] font-extrabold">BOT</span>
                      </div>
                      <div className="p-3 rounded-lg bg-[#2b2d31] text-xs text-gray-200 border border-white/5 leading-relaxed">
                        {aiMode === "standard" && (
                          <p>Hey there! 👋 I provide 24/7 lossless music playback, automated moderation, temporary voice channels, and over 97 slash commands! Type <code className="text-purple-300">/help</code> to explore.</p>
                        )}
                        {aiMode === "savage" && (
                          <p className="text-amber-200">Your server is so quiet I thought my internet disconnected. The only thing more inactive than your general chat is your sense of humor. 💀🔥</p>
                        )}
                        {aiMode === "anime" && (
                          <p className="text-pink-200">H-Hmph! It&apos;s not like I wanted to help you or anything, b-baka! 😤 But fine, since you asked nicely... what do you need? (*/ω＼*)</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 px-1">
                  Shows how VePlexity replies in Discord depending on the active personality preset.
                </p>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              11. BIRTHDAYS & COUNTING GAME
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "community" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 rounded-2xl bg-[#15161c] border border-white/5 space-y-5">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Gamepad2 className="w-4 h-4 text-pink-400" />
                      <span>Counting Game & Birthdays</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Configure community interaction channels for counting streaks and automated birthday celebrations.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="text-[11px] font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                        Counting Game Channel
                      </label>
                      <select
                        value={countingChannel}
                        onChange={(e) => setCountingChannel(e.target.value)}
                        className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-pink-500/50"
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
                      <label className="text-[11px] font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                        Birthday Celebration Channel
                      </label>
                      <select
                        value={birthdayChannel}
                        onChange={(e) => setBirthdayChannel(e.target.value)}
                        className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-pink-500/50"
                      >
                        <option value="">Disabled / System Channel</option>
                        {guild?.channels?.text?.map((c) => (
                          <option key={c.id} value={c.id}>
                            #{c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Output Visualizer: Discord Counting Stream & Birthday Embed */}
              <div className="lg:col-span-5 space-y-2 sticky top-20">
                <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                  <span className="font-semibold uppercase text-[10px] tracking-wider">Discord Output Visualizer</span>
                  <span className="text-[10px] font-mono text-pink-400">#counting & #birthdays</span>
                </div>

                <div className="rounded-2xl bg-[#313338] border border-black/30 p-4 font-sans text-xs shadow-2xl space-y-4">
                  {/* Counting Stream */}
                  <div className="space-y-2 border-b border-white/5 pb-3">
                    <p className="text-[10px] font-mono uppercase text-gray-400 font-bold">Counting in #counting:</p>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 font-bold text-xs">Alex:</span>
                        <span className="text-white font-mono bg-black/30 px-2 py-0.5 rounded">41</span>
                        <span className="text-[11px]">✅</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 font-bold text-xs">Sam:</span>
                        <span className="text-white font-mono bg-black/30 px-2 py-0.5 rounded">42</span>
                        <span className="text-[11px]">✅</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 font-bold text-xs">Veer:</span>
                        <span className="text-amber-400 font-mono bg-amber-500/20 px-2 py-0.5 rounded font-bold">100</span>
                        <span className="text-[11px]">💯 ⭐ (Milestone!)</span>
                      </div>
                    </div>
                  </div>

                  {/* Birthday Embed */}
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-mono uppercase text-gray-400 font-bold">Birthday in #birthdays:</p>
                    <div className="rounded-lg bg-[#2b2d31] border-l-4 border-pink-500 p-3 space-y-1.5 text-xs">
                      <p className="font-bold text-white text-xs">🎉 Happy Birthday, @Alex! 🎂</p>
                      <p className="text-gray-300 leading-relaxed text-[11px]">
                        Today is a special day! Wishing @Alex a fantastic birthday filled with joy and wins! 🎁🥳
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 px-1">
                  Illustrates the counting reactions and automated birthday celebration embed.
                </p>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              12. MESSAGE BUILDER & ANNOUNCEMENTS
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "announce" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 rounded-2xl bg-[#15161c] border border-white/5 space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Megaphone className="w-4 h-4 text-fuchsia-400" />
                      <span>Message Builder & Announcements</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Compose a formatted Discord embed and dispatch it directly to any channel.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="text-[11px] font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                        Target Channel
                      </label>
                      <select
                        value={annChannel}
                        onChange={(e) => setAnnChannel(e.target.value)}
                        className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-fuchsia-500/50"
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
                      <label className="text-[11px] font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                        Notification Mention
                      </label>
                      <select
                        value={annPing}
                        onChange={(e) => setAnnPing(e.target.value)}
                        className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-fuchsia-500/50"
                      >
                        <option value="none">No Mention (Silent)</option>
                        <option value="@here">@here</option>
                        <option value="@everyone">@everyone</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                      Announcement Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Server Updates & Event Schedule 🎉"
                      value={annTitle}
                      onChange={(e) => setAnnTitle(e.target.value)}
                      className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-fuchsia-500/50"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                      Message Body
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Write your announcement content..."
                      value={annMessage}
                      onChange={(e) => setAnnMessage(e.target.value)}
                      className="w-full bg-[#1c1d24] border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-fuchsia-500/50"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">Color:</span>
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
                          className={`w-5 h-5 rounded-full transition-transform ${
                            annColor === c.id ? "scale-125 ring-2 ring-white" : "hover:scale-110"
                          }`}
                          style={{ backgroundColor: c.color }}
                        />
                      ))}
                    </div>

                    <button
                      onClick={handleSendAnnouncement}
                      disabled={annSending || !annChannel || !annTitle || !annMessage}
                      className="py-2.5 px-5 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold text-xs transition flex items-center gap-2 shadow-lg disabled:opacity-40"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{annSending ? "Dispatching..." : "Send Announcement"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Output Visualizer: Discord Announcement Embed */}
              <div className="lg:col-span-5 space-y-2 sticky top-20">
                <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                  <span className="font-semibold uppercase text-[10px] tracking-wider">Discord Output Visualizer</span>
                  <span className="text-[10px] font-mono text-fuchsia-400">Live Preview</span>
                </div>

                <div className="rounded-2xl bg-[#313338] border border-black/30 p-4 font-sans text-xs shadow-2xl space-y-2.5">
                  {annPing !== "none" && (
                    <p className="text-fuchsia-300 font-mono text-[11px]">{annPing}</p>
                  )}

                  <div
                    className="rounded-lg bg-[#2b2d31] border-l-4 p-3.5 space-y-2 max-w-sm"
                    style={{
                      borderColor:
                        annColor === "fuchsia" ? "#BD5FFF" :
                        annColor === "blue" ? "#3498db" :
                        annColor === "green" ? "#2ecc71" :
                        annColor === "red" ? "#e74c3c" : "#f1c40f"
                    }}
                  >
                    <p className="font-bold text-sm text-white">{annTitle || "Announcement Title Preview"}</p>
                    <p className="text-xs text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {annMessage || "Type your announcement title and body on the left to preview how it will look in Discord."}
                    </p>
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500">
                      <span>Official Announcement • {guild?.name}</span>
                      <span>Today</span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 px-1">
                  Live embed preview reflects the exact formatting, color, and mention ping sent to Discord.
                </p>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              13. VIP PERKS & BUY ME A COFFEE
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "perks" && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#15161c] border border-white/5 space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <h3 className="text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                      <Coffee className="w-5 h-5 text-amber-400" />
                      <span>VIP Perks & Community Monetization</span>
                    </h3>
                    <p className="text-xs text-gray-400 max-w-xl">
                      Unlock exclusive commands across all servers and keep VePlexity hosted 24/7 on cloud servers.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href="https://www.buymeacoffee.com/veplexity1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs transition flex items-center gap-2 shadow-lg"
                    >
                      <Coffee className="w-4 h-4 text-black" />
                      <span>Buy Me a Coffee</span>
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Left: BMC QR Card */}
                  <div className="p-5 rounded-xl bg-[#1c1d24] border border-white/5 flex flex-col sm:flex-row items-center gap-5">
                    <div className="p-2 bg-white rounded-xl shrink-0 shadow-md">
                      <img src="/bmc/bmc-qr-code.png" alt="BMC QR" className="w-32 h-32 object-contain" />
                    </div>
                    <div className="space-y-2 text-center sm:text-left">
                      <p className="font-bold text-sm text-white">Scan to Support</p>
                      <p className="text-xs text-gray-400">
                        Scan with your phone to support via Apple Pay, Google Pay, or Card.
                      </p>
                      <a
                        href="https://www.buymeacoffee.com/veplexity1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <span>buymeacoffee.com/veplexity1</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Right: Community Free Unlock */}
                  <div className="p-5 rounded-xl bg-[#1c1d24] border border-white/5 space-y-3 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-white uppercase tracking-wider text-fuchsia-400">
                        Free Unlock: Join Official Server
                      </h4>
                      <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                        Members can unlock the 8 exclusive commands (<code className="text-fuchsia-300">/imagine</code>, <code className="text-fuchsia-300">/flirt</code>, <code className="text-fuchsia-300">/roast</code>, <code className="text-fuchsia-300">/effects</code>, <code className="text-fuchsia-300">/confess</code>, <code className="text-fuchsia-300">/slots</code>, <code className="text-fuchsia-300">/roulette</code>, <code className="text-fuchsia-300">/rob</code>) for free simply by joining <strong>VePlexity Point</strong>!
                      </p>
                    </div>

                    <a
                      href="https://www.discord.gg/R6ZrqpWEcc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs transition flex items-center justify-center gap-2 border border-white/10"
                    >
                      <MessageCircle className="w-4 h-4 text-fuchsia-400" />
                      <span>Join discord.gg/R6ZrqpWEcc</span>
                    </a>
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
          <div className="p-3.5 rounded-xl bg-[#1a1b22] border border-fuchsia-500/40 backdrop-blur-2xl shadow-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <p className="text-xs font-semibold text-gray-200">
                You have unsaved changes!
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                disabled={saving}
                className="py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs transition"
              >
                Reset
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="py-1.5 px-4 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-lg shadow-fuchsia-600/30"
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
