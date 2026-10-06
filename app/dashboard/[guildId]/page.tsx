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
  Trash2, UserMinus, UserPlus, Clock, Layers, Award,
  Zap, Radio, Link as LinkIcon, Compass, Gift, Users, Plus
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

interface LevelingConfig {
  enabled: boolean;
  channelId: string | null;
  message: string;
  xpRate: number;
}

interface BoostersConfig {
  enabled: boolean;
  channelId: string | null;
  roleId?: string | null;
  message: string;
}

interface ReactionRoleItem {
  roleId: string;
  label: string;
  emoji?: string;
}

interface ReactionRolesConfig {
  channelId: string | null;
  title: string;
  description: string;
  color: string;
  style: "buttons" | "select";
  items: ReactionRoleItem[];
}

interface AutoResponderItem {
  id: string;
  trigger: string;
  matchType: "contains" | "exact" | "startswith";
  response: string;
  isEmbed?: boolean;
}

interface GuildConfig {
  modRoles: string[];
  modLogChannel: string | null;
  loggingChannels?: LoggingChannelsConfig;
  suggestionsChannel?: string | null;
  leveling?: LevelingConfig;
  boosters?: BoostersConfig;
  reactionRoles?: ReactionRolesConfig;
  autoResponders?: AutoResponderItem[];
  welcome: {
    enabled: boolean;
    channelId: string | null;
    message: string;
    autoRoleId?: string | null;
    dmWelcome?: boolean;
  };
  chatbot: {
    enabled: boolean;
    channelId: string | null;
    mode: string;
    customPrompt?: string;
  };
  music: {
    djRole: string | null;
    defaultVolume: number;
    stay247?: boolean;
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
    antiLinks?: boolean;
    antiCaps?: boolean;
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
  | "leveling"
  | "boosters"
  | "reactionroles"
  | "autoresponders"
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

  // Leveling State (Free VIP Feature)
  const [levelingEnabled, setLevelingEnabled] = useState(false);
  const [levelingChannel, setLevelingChannel] = useState<string>("");
  const [levelingMessage, setLevelingMessage] = useState("GG {user}, you leveled up to Level {level}! 🎉");
  const [xpRate, setXpRate] = useState<number>(1);

  // Boosters State (Free VIP Feature)
  const [boostersEnabled, setBoostersEnabled] = useState(false);
  const [boostersChannel, setBoostersChannel] = useState<string>("");
  const [boostersRole, setBoostersRole] = useState<string>("");
  const [boostersMessage, setBoostersMessage] = useState("🚀 Huge thanks to {user} for boosting {server}! Your boost unlocks 24/7 lossless audio! ✨");

  // Welcome State
  const [welcomeEnabled, setWelcomeEnabled] = useState(false);
  const [welcomeChannel, setWelcomeChannel] = useState<string>("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [autoRoleId, setAutoRoleId] = useState<string>("");
  const [dmWelcome, setDmWelcome] = useState(false);
  const [welcomePreviewMode, setWelcomePreviewMode] = useState<"welcome" | "goodbye">("welcome");

  // AI Chatbot State
  const [aiEnabled, setAiEnabled] = useState(false);
  const [aiChannel, setAiChannel] = useState<string>("");
  const [aiMode, setAiMode] = useState("standard");
  const [customAiPrompt, setCustomAiPrompt] = useState("");

  // Music State
  const [djRole, setDjRole] = useState<string>("");
  const [defaultVolume, setDefaultVolume] = useState<number>(100);
  const [stay247, setStay247] = useState(true);

  // Temp VC State
  const [tempVcHub, setTempVcHub] = useState<string>("");
  const [tempVcCategory, setTempVcCategory] = useState<string>("");

  // Starboard State
  const [starboardChannel, setStarboardChannel] = useState<string>("");
  const [starboardStars, setStarboardStars] = useState<number>(3);

  // Auto-Mod State (Expanded Filters)
  const [antiInvite, setAntiInvite] = useState(false);
  const [antiSpam, setAntiSpam] = useState(false);
  const [antiBadWords, setAntiBadWords] = useState(false);
  const [antiLinks, setAntiLinks] = useState(false);
  const [antiCaps, setAntiCaps] = useState(false);

  // Community Mini-Games State
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

  // Reaction Roles State (Free VIP Feature)
  const [rrChannel, setRrChannel] = useState("");
  const [rrTitle, setRrTitle] = useState("🎭 Choose Your Server Roles");
  const [rrDescription, setRrDescription] = useState("Click the buttons or select from the dropdown menu below to assign or remove roles!");
  const [rrColor, setRrColor] = useState("fuchsia");
  const [rrStyle, setRrStyle] = useState<"buttons" | "select">("buttons");
  const [rrItems, setRrItems] = useState<ReactionRoleItem[]>([
    { roleId: "", label: "Gamer", emoji: "🎮" },
    { roleId: "", label: "Developer", emoji: "💻" },
    { roleId: "", label: "Creator", emoji: "🎨" }
  ]);
  const [rrDeploying, setRrDeploying] = useState(false);

  // Auto-Responders State (Free VIP Feature)
  const [autoResponders, setAutoResponders] = useState<AutoResponderItem[]>([
    { id: "1", trigger: "!rules", matchType: "exact", response: "Please respect all members, keep chat civil, and abide by Discord ToS!", isEmbed: true },
    { id: "2", trigger: "!support", matchType: "contains", response: "Need help? Ping @Moderator or open a thread in #support!", isEmbed: false }
  ]);
  const [activeArPreviewIndex, setActiveArPreviewIndex] = useState(0);

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

    const levEn = !!cfg.leveling?.enabled;
    const levCh = cfg.leveling?.channelId || "";
    const levMsg = cfg.leveling?.message || "GG {user}, you leveled up to Level {level}! 🎉";
    const levXp = cfg.leveling?.xpRate ?? 1;

    const bstEn = !!cfg.boosters?.enabled;
    const bstCh = cfg.boosters?.channelId || "";
    const bstRl = cfg.boosters?.roleId || "";
    const bstMsg = cfg.boosters?.message || "🚀 Huge thanks to {user} for boosting {server}! Your boost unlocks 24/7 lossless audio! ✨";

    const wEn = !!cfg.welcome?.enabled;
    const wCh = cfg.welcome?.channelId || "";
    const wMsg = cfg.welcome?.message || "Welcome to {server}, {user}! We're thrilled to have you here 🎉";
    const aRole = cfg.welcome?.autoRoleId || "";
    const dmW = !!cfg.welcome?.dmWelcome;

    const aEn = !!cfg.chatbot?.enabled;
    const aCh = cfg.chatbot?.channelId || "";
    const aMd = cfg.chatbot?.mode || "standard";
    const aPrompt = cfg.chatbot?.customPrompt || "";

    const dj = cfg.music?.djRole || "";
    const vol = cfg.music?.defaultVolume ?? 100;
    const s247 = cfg.music?.stay247 ?? true;

    const tvcHub = cfg.tempVc?.hubChannelId || "";
    const tvcCat = cfg.tempVc?.categoryId || "";

    const sbCh = cfg.starboard?.channelId || "";
    const sbSt = cfg.starboard?.minStars ?? 3;

    const amInv = !!cfg.autoMod?.antiInvite;
    const amSpam = !!cfg.autoMod?.antiSpam;
    const amBw = !!cfg.autoMod?.antiBadWords;
    const amLinks = !!cfg.autoMod?.antiLinks;
    const amCaps = !!cfg.autoMod?.antiCaps;

    const cntCh = cfg.counting?.channelId || "";
    const bdayCh = cfg.birthday?.channelId || "";

    setModRoles(mRoles);
    setModLogChannel(mLog);
    setLoggingChannels(logChans);
    setSuggestionsChannel(suggChan);

    setLevelingEnabled(levEn);
    setLevelingChannel(levCh);
    setLevelingMessage(levMsg);
    setXpRate(levXp);

    setBoostersEnabled(bstEn);
    setBoostersChannel(bstCh);
    setBoostersRole(bstRl);
    setBoostersMessage(bstMsg);

    setWelcomeEnabled(wEn);
    setWelcomeChannel(wCh);
    setWelcomeMessage(wMsg);
    setAutoRoleId(aRole);
    setDmWelcome(dmW);

    setAiEnabled(aEn);
    setAiChannel(aCh);
    setAiMode(aMd);
    setCustomAiPrompt(aPrompt);

    setDjRole(dj);
    setDefaultVolume(vol);
    setStay247(s247);

    setTempVcHub(tvcHub);
    setTempVcCategory(tvcCat);

    setStarboardChannel(sbCh);
    setStarboardStars(sbSt);

    setAntiInvite(amInv);
    setAntiSpam(amSpam);
    setAntiBadWords(amBw);
    setAntiLinks(amLinks);
    setAntiCaps(amCaps);

    setCountingChannel(cntCh);
    setBirthdayChannel(bdayCh);

    const rrCfg = cfg.reactionRoles;
    const rCh = rrCfg?.channelId || "";
    const rTit = rrCfg?.title || "🎭 Choose Your Server Roles";
    const rDesc = rrCfg?.description || "Click the buttons or select from the dropdown menu below to assign or remove roles!";
    const rCol = rrCfg?.color || "fuchsia";
    const rSty = rrCfg?.style || "buttons";
    const rIts = rrCfg?.items?.length ? rrCfg.items : [
      { roleId: "", label: "Gamer", emoji: "🎮" },
      { roleId: "", label: "Developer", emoji: "💻" },
      { roleId: "", label: "Creator", emoji: "🎨" }
    ];

    const arList = cfg.autoResponders?.length ? cfg.autoResponders : [
      { id: "1", trigger: "!rules", matchType: "exact", response: "Please respect all members, keep chat civil, and abide by Discord ToS!", isEmbed: true },
      { id: "2", trigger: "!support", matchType: "contains", response: "Need help? Ping @Moderator or open a thread in #support!", isEmbed: false }
    ];

    setRrChannel(rCh);
    setRrTitle(rTit);
    setRrDescription(rDesc);
    setRrColor(rCol);
    setRrStyle(rSty);
    setRrItems(rIts);
    setAutoResponders(arList);

    const snap = JSON.stringify({
      mRoles, mLog, logChans, suggChan,
      levEn, levCh, levMsg, levXp,
      bstEn, bstCh, bstRl, bstMsg,
      wEn, wCh, wMsg, aRole, dmW,
      aEn, aCh, aMd, aPrompt,
      dj, vol, s247,
      tvcHub, tvcCat,
      sbCh, sbSt,
      amInv, amSpam, amBw, amLinks, amCaps,
      cntCh, bdayCh,
      rCh, rTit, rDesc, rCol, rSty, rIts,
      arList
    });
    setInitialSnapshot(snap);
  };

  const currentSnapshot = useMemo(() => {
    return JSON.stringify({
      mRoles: modRoles,
      mLog: modLogChannel,
      logChans: loggingChannels,
      suggChan: suggestionsChannel,
      levEn: levelingEnabled,
      levCh: levelingChannel,
      levMsg: levelingMessage,
      levXp: xpRate,
      bstEn: boostersEnabled,
      bstCh: boostersChannel,
      bstRl: boostersRole,
      bstMsg: boostersMessage,
      wEn: welcomeEnabled,
      wCh: welcomeChannel,
      wMsg: welcomeMessage,
      aRole: autoRoleId,
      dmW: dmWelcome,
      aEn: aiEnabled,
      aCh: aiChannel,
      aMd: aiMode,
      aPrompt: customAiPrompt,
      dj: djRole,
      vol: defaultVolume,
      s247: stay247,
      tvcHub: tempVcHub,
      tvcCat: tempVcCategory,
      sbCh: starboardChannel,
      sbSt: starboardStars,
      amInv: antiInvite,
      amSpam: antiSpam,
      amBw: antiBadWords,
      amLinks: antiLinks,
      amCaps: antiCaps,
      cntCh: countingChannel,
      bdayCh: birthdayChannel,
      rCh: rrChannel,
      rTit: rrTitle,
      rDesc: rrDescription,
      rCol: rrColor,
      rSty: rrStyle,
      rIts: rrItems,
      arList: autoResponders
    });
  }, [
    modRoles, modLogChannel, loggingChannels, suggestionsChannel,
    levelingEnabled, levelingChannel, levelingMessage, xpRate,
    boostersEnabled, boostersChannel, boostersRole, boostersMessage,
    welcomeEnabled, welcomeChannel, welcomeMessage, autoRoleId, dmWelcome,
    aiEnabled, aiChannel, aiMode, customAiPrompt,
    djRole, defaultVolume, stay247,
    tempVcHub, tempVcCategory,
    starboardChannel, starboardStars,
    antiInvite, antiSpam, antiBadWords, antiLinks, antiCaps,
    countingChannel, birthdayChannel,
    rrChannel, rrTitle, rrDescription, rrColor, rrStyle, rrItems,
    autoResponders
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
        leveling: {
          enabled: levelingEnabled,
          channelId: levelingChannel || null,
          message: levelingMessage,
          xpRate
        },
        boosters: {
          enabled: boostersEnabled,
          channelId: boostersChannel || null,
          roleId: boostersRole || null,
          message: boostersMessage
        },
        welcome: {
          enabled: welcomeEnabled,
          channelId: welcomeChannel || null,
          message: welcomeMessage,
          autoRoleId: autoRoleId || null,
          dmWelcome
        },
        chatbot: {
          enabled: aiEnabled,
          channelId: aiChannel || null,
          mode: aiMode,
          customPrompt: customAiPrompt
        },
        music: {
          djRole: djRole || null,
          defaultVolume,
          stay247
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
          antiBadWords,
          antiLinks,
          antiCaps
        },
        counting: {
          channelId: countingChannel || null
        },
        birthday: {
          channelId: birthdayChannel || null
        },
        reactionRoles: {
          channelId: rrChannel || null,
          title: rrTitle,
          description: rrDescription,
          color: rrColor,
          style: rrStyle,
          items: rrItems.filter((i) => i.roleId)
        },
        autoResponders: autoResponders
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

  const handleDeployReactionRoles = async () => {
    if (!rrChannel) {
      showToast("Please choose a target channel to post the reaction roles to.", "error");
      return;
    }
    const validItems = rrItems.filter((i) => i.roleId);
    if (!validItems.length) {
      showToast("Please assign at least one role to an item.", "error");
      return;
    }

    try {
      setRrDeploying(true);
      const res = await fetch(`/api/bot/guilds/${guildId}/reaction-roles/dispatch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channelId: rrChannel,
          title: rrTitle,
          description: rrDescription,
          color: rrColor,
          style: rrStyle,
          items: validItems
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to dispatch reaction roles");

      showToast(data.message || "Reaction roles menu sent to Discord!");
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setRrDeploying(false);
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
        <div className="w-12 h-12 border-2 border-fuchsia-500/20 border-t-fuchsia-500 rounded-full animate-spin" />
        <p className="text-sm font-mono text-gray-400 tracking-wider">
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
    leveling: "Leveling & XP Rank System",
    boosters: "Server Boosters Appreciation",
    reactionroles: "Reaction Roles & Self-Assign Menus",
    autoresponders: "Custom Auto-Responders & Triggers",
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
    <div className="min-h-screen bg-[#0d0e12] text-[#f2f3f5] flex flex-col font-sans w-full">
      {/* Toast Alert */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl border text-sm font-medium flex items-center gap-3 shadow-2xl backdrop-blur-xl transition-all ${
            toast.type === "success"
              ? "bg-[#182a20] border-emerald-500/40 text-emerald-300"
              : "bg-[#2a1818] border-red-500/40 text-red-300"
          }`}
        >
          {toast.type === "success" ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Navbar - Full Width */}
      <header className="border-b border-white/5 bg-[#111217] sticky top-0 z-40 px-6 sm:px-10 py-3.5 flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">All Servers</span>
          </Link>

          <div className="h-4 w-px bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1e1f24] border border-white/10 overflow-hidden flex items-center justify-center font-bold text-sm text-fuchsia-400 shrink-0">
              {guild?.icon ? (
                <img src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=64`} alt="" className="w-full h-full object-cover" />
              ) : (
                guild?.name.charAt(0)
              )}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="font-extrabold text-sm sm:text-base text-white truncate max-w-xs">{guild?.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-fuchsia-500/10 text-fuchsia-300 font-mono hidden md:inline border border-fuchsia-500/20">
                  {guild?.id}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href="https://www.discord.gg/R6ZrqpWEcc"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition text-xs flex items-center gap-2 border border-white/5"
            title="Official Discord Server"
          >
            <MessageCircle className="w-3.5 h-3.5 text-fuchsia-400" />
            <span className="hidden sm:inline font-medium">VePlexity Point</span>
          </a>

          <a
            href="https://www.buymeacoffee.com/veplexity1"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 transition text-xs flex items-center gap-2"
            title="Support Creator"
          >
            <Coffee className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline font-semibold">Support</span>
          </a>

          <button
            onClick={handleSave}
            disabled={saving || !hasUnsavedChanges}
            className={`py-1.5 px-5 rounded-lg font-bold text-xs transition-all flex items-center gap-2 ${
              hasUnsavedChanges
                ? "bg-fuchsia-600 hover:bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-600/30 animate-pulse"
                : "bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed"
            }`}
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </header>

      {/* Main Full-Width Container */}
      <div className="flex-1 flex w-full">
        {/* Left Navigation Sidebar */}
        <aside className="w-64 xl:w-72 border-r border-white/5 bg-[#111217]/70 p-4 shrink-0 hidden lg:flex flex-col justify-between">
          <div className="space-y-6">
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition ${
                  activeTab === "overview"
                    ? "bg-fuchsia-600/20 text-fuchsia-300 border border-fuchsia-500/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span className="text-sm">Server Overview</span>
              </button>
            </div>

            <div className="space-y-1.5">
              <p className="text-[10px] uppercase font-mono tracking-wider text-gray-500 px-3 font-bold">
                Modules & Features
              </p>
              <nav className="space-y-0.5">
                {[
                  { id: "moderation", label: "Bot Masters & Roles", icon: Shield },
                  { id: "logging", label: "Audit & Logging Channels", icon: FileText },
                  { id: "automod", label: "Auto-Mod Security", icon: Lock },
                  { id: "welcome", label: "Welcome & Goodbye", icon: Bell },
                  { id: "leveling", label: "Leveling & XP System", icon: Award, tag: "Free VIP" },
                  { id: "boosters", label: "Server Boosters", icon: Zap, tag: "Free VIP" },
                  { id: "reactionroles", label: "Reaction Roles", icon: Users, tag: "Free VIP" },
                  { id: "autoresponders", label: "Auto-Responders", icon: MessageCircle, tag: "Free VIP" },
                  { id: "starboard", label: "Starboard (Hall of Fame)", icon: Star },
                  { id: "suggestions", label: "Suggestions Box", icon: ThumbsUp },
                  { id: "tempvc", label: "Temporary Voice Hubs", icon: Mic },
                  { id: "music", label: "Music & DJ Audio (24/7)", icon: Music, tag: "24/7 Stay" },
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
                      className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition ${
                        active
                          ? "bg-fuchsia-600/20 text-fuchsia-300 border border-fuchsia-500/30"
                          : "text-gray-400 hover:text-white hover:bg-white/[0.03]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.tag && (
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/20 shrink-0">
                          {item.tag}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-gray-400 space-y-1">
            <p className="font-bold text-gray-200">VePlexity Bot v2.0</p>
            <p className="text-[11px] text-gray-500">All Premium Features 100% Free</p>
          </div>
        </aside>

        {/* Full-Width Main Workspace */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 xl:p-12 space-y-8 w-full pb-36">
          {/* Subpage Breadcrumb Header when not on overview */}
          {activeTab !== "overview" && (
            <div className="flex items-center justify-between pb-4 border-b border-white/5 w-full">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setActiveTab("overview")}
                  className="text-xs font-medium text-gray-400 hover:text-white flex items-center gap-1.5 transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Overview</span>
                </button>
                <span className="text-gray-600">/</span>
                <span className="text-sm font-bold text-white">{MODULE_TITLES[activeTab]}</span>
              </div>

              <button
                onClick={() => setActiveTab("overview")}
                className="text-xs px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition font-medium"
              >
                ← Back to All Modules
              </button>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              1. OVERVIEW: EXPANDED FULL-WIDTH MODULAR GRID (MAKI-STYLE)
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "overview" && (
            <div className="space-y-8 w-full">
              {/* Maki-Style Expanded Server Banner Header */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#14151b] border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-[#1e1f26] border border-white/10 overflow-hidden flex items-center justify-center font-black text-2xl text-fuchsia-400 shadow-xl shrink-0">
                    {guild?.icon ? (
                      <img src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=128`} alt="" className="w-full h-full object-cover" />
                    ) : (
                      guild?.name.charAt(0)
                    )}
                  </div>
                  <div className="space-y-1">
                    <h1 className="text-2xl font-black text-white">{guild?.name}</h1>
                    <p className="text-xs font-mono text-gray-400">Server ID: {guild?.id}</p>
                    <div className="flex items-center gap-2.5 pt-1 flex-wrap">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Bot Connected
                      </span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/5 text-gray-300 font-medium">
                        {guild?.memberCount} Members
                      </span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/20 font-bold">
                        💎 All VIP Features Free
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-stretch md:self-auto justify-end">
                  <Link
                    href="/dashboard"
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 transition"
                  >
                    Switch Server
                  </Link>
                </div>
              </div>

              {/* Maki-Style Modular Section: Customization & Administration */}
              <div className="space-y-3.5 w-full">
                <div className="flex items-center justify-between px-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Customization & Administration
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {/* Bot Masters */}
                  <div
                    onClick={() => setActiveTab("moderation")}
                    className="p-5 rounded-2xl bg-[#15161c] hover:bg-[#1a1b23] border border-white/5 hover:border-white/10 transition cursor-pointer flex flex-col justify-between group h-36"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white group-hover:text-blue-300 transition">Bot Masters & Roles</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Admin & mod command authority</p>
                    </div>
                  </div>

                  {/* Audit & Logging Channels (Skyra style) */}
                  <div
                    onClick={() => setActiveTab("logging")}
                    className="p-5 rounded-2xl bg-[#15161c] hover:bg-[#1a1b23] border border-white/5 hover:border-white/10 transition cursor-pointer flex flex-col justify-between group h-36"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white group-hover:text-purple-300 transition">Audit & Logging Channels</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Route edited, deleted & mod event logs</p>
                    </div>
                  </div>

                  {/* Message Builder & Announcements */}
                  <div
                    onClick={() => setActiveTab("announce")}
                    className="p-5 rounded-2xl bg-[#15161c] hover:bg-[#1a1b23] border border-white/5 hover:border-white/10 transition cursor-pointer flex flex-col justify-between group h-36"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400">
                        <Megaphone className="w-5 h-5" />
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white group-hover:text-fuchsia-300 transition">Message Builder</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Send custom announcement embeds to chat</p>
                    </div>
                  </div>

                  {/* Auto-Mod Security */}
                  <div
                    onClick={() => setActiveTab("automod")}
                    className="p-5 rounded-2xl bg-[#15161c] hover:bg-[#1a1b23] border border-white/5 hover:border-white/10 transition cursor-pointer flex flex-col justify-between group h-36"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                        <Lock className="w-5 h-5" />
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white group-hover:text-red-300 transition">Auto-Mod Security</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Anti-Invite, Anti-Spam & Bad Words filter</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Maki-Style Modular Section: Engagement & Free Premium Features */}
              <div className="space-y-3.5 w-full">
                <div className="flex items-center justify-between px-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Community Engagement (All Premium Unlocked)
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {/* Leveling & Rank System */}
                  <div
                    onClick={() => setActiveTab("leveling")}
                    className="p-5 rounded-2xl bg-[#15161c] hover:bg-[#1a1b23] border border-white/5 hover:border-white/10 transition cursor-pointer flex flex-col justify-between group h-36 relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                        <Award className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold">
                        Free VIP
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition">Leveling & XP System</h4>
                      <p className="text-xs text-gray-400 mt-0.5">XP cards, level-up channel & role rewards</p>
                    </div>
                  </div>

                  {/* Server Boosters */}
                  <div
                    onClick={() => setActiveTab("boosters")}
                    className="p-5 rounded-2xl bg-[#15161c] hover:bg-[#1a1b23] border border-white/5 hover:border-white/10 transition cursor-pointer flex flex-col justify-between group h-36 relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                        <Zap className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/20 font-bold">
                        Free VIP
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white group-hover:text-pink-300 transition">Server Boosters Rewards</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Thank boosters & auto-assign VIP roles</p>
                    </div>
                  </div>

                  {/* Reaction Roles */}
                  <div
                    onClick={() => setActiveTab("reactionroles")}
                    className="p-5 rounded-2xl bg-[#15161c] hover:bg-[#1a1b23] border border-white/5 hover:border-white/10 transition cursor-pointer flex flex-col justify-between group h-36 relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                        <Users className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-bold">
                        Free VIP
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white group-hover:text-purple-300 transition">Reaction Roles</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Button & dropdown role self-assign</p>
                    </div>
                  </div>

                  {/* Auto-Responders */}
                  <div
                    onClick={() => setActiveTab("autoresponders")}
                    className="p-5 rounded-2xl bg-[#15161c] hover:bg-[#1a1b23] border border-white/5 hover:border-white/10 transition cursor-pointer flex flex-col justify-between group h-36 relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-bold">
                        Free VIP
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white group-hover:text-cyan-300 transition">Auto-Responders</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Instant custom chat trigger replies</p>
                    </div>
                  </div>

                  {/* Welcome & Goodbye */}
                  <div
                    onClick={() => setActiveTab("welcome")}
                    className="p-5 rounded-2xl bg-[#15161c] hover:bg-[#1a1b23] border border-white/5 hover:border-white/10 transition cursor-pointer flex flex-col justify-between group h-36"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <Bell className="w-5 h-5" />
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white group-hover:text-emerald-300 transition">Welcome Messages</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Greet new members & assign auto-roles</p>
                    </div>
                  </div>

                  {/* Starboard */}
                  <div
                    onClick={() => setActiveTab("starboard")}
                    className="p-5 rounded-2xl bg-[#15161c] hover:bg-[#1a1b23] border border-white/5 hover:border-white/10 transition cursor-pointer flex flex-col justify-between group h-36"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
                        <Star className="w-5 h-5" />
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white group-hover:text-yellow-300 transition">Starboard (Hall of Fame)</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Pin top community messages with stars</p>
                    </div>
                  </div>

                  {/* Suggestions */}
                  <div
                    onClick={() => setActiveTab("suggestions")}
                    className="p-5 rounded-2xl bg-[#15161c] hover:bg-[#1a1b23] border border-white/5 hover:border-white/10 transition cursor-pointer flex flex-col justify-between group h-36"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                        <ThumbsUp className="w-5 h-5" />
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white group-hover:text-cyan-300 transition">Suggestions Box</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Interactive voting with upvote buttons</p>
                    </div>
                  </div>

                  {/* Birthdays & Counting */}
                  <div
                    onClick={() => setActiveTab("community")}
                    className="p-5 rounded-2xl bg-[#15161c] hover:bg-[#1a1b23] border border-white/5 hover:border-white/10 transition cursor-pointer flex flex-col justify-between group h-36"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                        <Cake className="w-5 h-5" />
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white group-hover:text-rose-300 transition">Birthdays & Counting</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Automated celebrations & counting streaks</p>
                    </div>
                  </div>

                  {/* Music & DJ (24/7 Stay) */}
                  <div
                    onClick={() => setActiveTab("music")}
                    className="p-5 rounded-2xl bg-[#15161c] hover:bg-[#1a1b23] border border-white/5 hover:border-white/10 transition cursor-pointer flex flex-col justify-between group h-36"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <Music className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-bold">
                        24/7 Stay Free
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white group-hover:text-indigo-300 transition">Music & DJ Audio</h4>
                      <p className="text-xs text-gray-400 mt-0.5">DJ permissions, volume & 24/7 mode</p>
                    </div>
                  </div>

                  {/* AI Chatbot */}
                  <div
                    onClick={() => setActiveTab("ai")}
                    className="p-5 rounded-2xl bg-[#15161c] hover:bg-[#1a1b23] border border-white/5 hover:border-white/10 transition cursor-pointer flex flex-col justify-between group h-36"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white group-hover:text-purple-300 transition">Gemini AI Chatbot</h4>
                      <p className="text-xs text-gray-400 mt-0.5">AI chat channel & custom lore prompt</p>
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 sm:p-7 rounded-2xl bg-[#15161c] border border-white/5 space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-400" />
                      <span>Bot Masters (Moderator Roles)</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Bot masters are Discord roles that can administer VePlexity and execute moderation commands (<code className="text-blue-300">/ban</code>, <code className="text-blue-300">/kick</code>, <code className="text-blue-300">/timeout</code>, <code className="text-blue-300">/warn</code>). Roles with Discord Administrator permission are automatically bot masters.
                    </p>
                  </div>

                  <div className="pt-2 space-y-2">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
                      Active Moderator Roles:
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
                              type="button"
                              onClick={() => toggleModRole(role.id)}
                              className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition flex items-center gap-2 ${
                                isSelected
                                  ? "bg-blue-600/20 border-blue-500 text-white shadow-sm"
                                  : "bg-[#1c1d24] border-white/5 text-gray-300 hover:border-white/20"
                              }`}
                            >
                              <span
                                className="w-2.5 h-2.5 rounded-full shrink-0"
                                style={{ backgroundColor: hexColor }}
                              />
                              <span>{role.name}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-blue-400 ml-0.5" />}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-7 rounded-2xl bg-[#15161c] border border-white/5 space-y-3">
                  <div>
                    <h3 className="text-sm font-bold text-white">Default Infraction Log Channel</h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      The channel where bans, kicks, and timeouts will be logged by default.
                    </p>
                  </div>

                  <select
                    value={modLogChannel}
                    onChange={(e) => setModLogChannel(e.target.value)}
                    className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-blue-500/50"
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
              <div className="lg:col-span-5 space-y-3 sticky top-20">
                <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                  <span className="font-semibold uppercase text-[10px] tracking-wider">Discord Output Visualizer</span>
                  <span className="text-[10px] font-mono text-blue-400">#mod-logs</span>
                </div>

                <div className="rounded-2xl bg-[#313338] border border-black/30 p-5 font-sans text-xs shadow-2xl space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-xs shrink-0 overflow-hidden">
                      <img src="/vp-logo-icon.png" alt="VP" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">VePlexity</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#5865F2] text-white text-[9px] font-extrabold">BOT</span>
                        <span className="text-[10px] text-gray-400">Today at 4:20 PM</span>
                      </div>

                      <div className="rounded-xl bg-[#2b2d31] border-l-4 border-red-500 p-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">🔨 Member Banned | Case #14</span>
                        </div>
                        <div className="space-y-1 text-xs text-gray-300">
                          <p><strong>Offender:</strong> @SpammerUser <span className="text-gray-400 text-[10px]">(ID: 10492819)</span></p>
                          <p><strong>Moderator:</strong> @Moderator</p>
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
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              3. AUDIT & LOGGING CHANNELS (SKYRA STYLE - SCREENSHOT 4)
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "logging" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 sm:p-7 rounded-2xl bg-[#15161c] border border-white/5 space-y-5">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <FileText className="w-5 h-5 text-purple-400" />
                      <span>Skyra-Style Event Logging Channels</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Configure granular dedicated channels for specific server events. Click on an event button to preview its live Discord log output on the right.
                    </p>
                  </div>

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
                          className={`p-4 rounded-xl border transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            isSelected
                              ? "bg-purple-950/20 border-purple-500/50"
                              : "bg-[#1c1d24] border-white/5 hover:border-white/15"
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white">{item.label}</span>
                              {isSelected && (
                                <span className="text-[9px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono font-bold">
                                  Live Preview Active
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
                            className="bg-[#14151a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-purple-500/50 shrink-0"
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

              {/* Right Output Visualizer */}
              <div className="lg:col-span-5 space-y-3 sticky top-20">
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

                <div className="rounded-2xl bg-[#313338] border border-black/30 p-5 font-sans text-xs shadow-2xl space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white text-xs shrink-0 overflow-hidden">
                      <img src="/vp-logo-icon.png" alt="VP" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">VePlexity Logger</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#5865F2] text-white text-[9px] font-extrabold">BOT</span>
                        <span className="text-[10px] text-gray-400">Today at 4:21 PM</span>
                      </div>

                      {activeLogPreview === "messageEdit" && (
                        <div className="rounded-xl bg-[#2b2d31] border-l-4 border-amber-400 p-4 space-y-2.5">
                          <p className="font-bold text-white text-xs">📝 Message Edited in #general</p>
                          <div className="space-y-1.5 text-xs text-gray-300">
                            <p><strong>Author:</strong> @Veer <span className="text-gray-400 text-[10px]">(ID: 1469048463760036075)</span></p>
                            <div className="p-2.5 rounded bg-black/30 border border-white/5 space-y-1 font-mono text-[11px]">
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

                      {activeLogPreview === "messageDelete" && (
                        <div className="rounded-xl bg-[#2b2d31] border-l-4 border-red-500 p-4 space-y-2.5">
                          <p className="font-bold text-white text-xs">🗑️ Message Deleted in #general</p>
                          <div className="space-y-1.5 text-xs text-gray-300">
                            <p><strong>Author:</strong> @Alex <span className="text-gray-400 text-[10px]">(ID: 98127391823)</span></p>
                            <div className="p-2.5 rounded bg-black/30 border border-white/5 text-gray-300 text-[11px]">
                              &quot;Oops, wrong channel sorry about that!&quot;
                            </div>
                          </div>
                          <div className="pt-2 border-t border-white/5 text-[10px] text-gray-400 flex items-center justify-between">
                            <span>Message ID: 129481920400</span>
                            <span>Today at 4:21 PM</span>
                          </div>
                        </div>
                      )}

                      {activeLogPreview === "modAction" && (
                        <div className="rounded-xl bg-[#2b2d31] border-l-4 border-red-500 p-4 space-y-2">
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

                      {activeLogPreview === "memberJoin" && (
                        <div className="rounded-xl bg-[#2b2d31] border-l-4 border-emerald-400 p-4 space-y-2">
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

                      {activeLogPreview === "memberLeave" && (
                        <div className="rounded-xl bg-[#2b2d31] border-l-4 border-gray-500 p-4 space-y-2">
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

                      {activeLogPreview === "roleUpdate" && (
                        <div className="rounded-xl bg-[#2b2d31] border-l-4 border-blue-400 p-4 space-y-2">
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
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              4. LEVELING & XP SYSTEM (FREE VIP FEATURE - MEE6 CHARGES $12/MO)
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "leveling" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 sm:p-7 rounded-2xl bg-[#15161c] border border-white/5 space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                          <Award className="w-5 h-5 text-amber-400" />
                          <span>Leveling & XP Rank System</span>
                        </h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                          100% Free
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Reward active chatters with XP, level-up cards, and milestone role unlocks.
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      checked={levelingEnabled}
                      onChange={(e) => setLevelingEnabled(e.target.checked)}
                      className="w-5 h-5 accent-amber-500 cursor-pointer"
                    />
                  </div>

                  {levelingEnabled && (
                    <div className="space-y-4 pt-4 border-t border-white/5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                            Level Up Announcement Channel
                          </label>
                          <select
                            value={levelingChannel}
                            onChange={(e) => setLevelingChannel(e.target.value)}
                            className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500/50"
                          >
                            <option value="">Current Channel (Where member chatted)</option>
                            {guild?.channels?.text?.map((c) => (
                              <option key={c.id} value={c.id}>
                                #{c.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                            XP Rate Multiplier
                          </label>
                          <select
                            value={xpRate}
                            onChange={(e) => setXpRate(Number(e.target.value))}
                            className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500/50"
                          >
                            <option value={1}>1.0x (Standard 15-25 XP/msg)</option>
                            <option value={1.5}>1.5x (Weekend Boost)</option>
                            <option value={2}>2.0x (Double XP Mode)</option>
                            <option value={3}>3.0x (Triple High Speed)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                          Level-Up Announcement Message
                        </label>
                        <textarea
                          rows={3}
                          value={levelingMessage}
                          onChange={(e) => setLevelingMessage(e.target.value)}
                          className="w-full bg-[#1c1d24] border border-white/10 rounded-xl p-3.5 text-xs text-white outline-none focus:border-amber-500/50"
                          placeholder="GG {user}, you leveled up to Level {level}! 🎉"
                        />
                        <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-400">
                          <span>Click to insert:</span>
                          <button
                            type="button"
                            onClick={() => setLevelingMessage(m => m + " {user}")}
                            className="px-2 py-0.5 rounded bg-white/5 hover:bg-amber-500/20 text-amber-300 font-mono text-[11px]"
                          >
                            + &#123;user&#125;
                          </button>
                          <button
                            type="button"
                            onClick={() => setLevelingMessage(m => m + " {level}")}
                            className="px-2 py-0.5 rounded bg-white/5 hover:bg-amber-500/20 text-amber-300 font-mono text-[11px]"
                          >
                            + &#123;level&#125;
                          </button>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-[#1c1d24] border border-white/5 space-y-2">
                        <p className="text-xs font-bold text-white">🏆 Milestone Role Rewards (Automatic)</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-gray-400">
                          <div className="p-2 bg-black/30 rounded border border-white/5">
                            <span className="text-amber-400 font-bold block">Level 5</span>
                            <span>Bronze Member</span>
                          </div>
                          <div className="p-2 bg-black/30 rounded border border-white/5">
                            <span className="text-gray-300 font-bold block">Level 10</span>
                            <span>Silver Member</span>
                          </div>
                          <div className="p-2 bg-black/30 rounded border border-white/5">
                            <span className="text-yellow-400 font-bold block">Level 25</span>
                            <span>Gold Elite</span>
                          </div>
                          <div className="p-2 bg-black/30 rounded border border-white/5">
                            <span className="text-cyan-400 font-bold block">Level 50</span>
                            <span>Diamond Master</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Output Visualizer: Discord Level Up Card */}
              <div className="lg:col-span-5 space-y-3 sticky top-20">
                <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                  <span className="font-semibold uppercase text-[10px] tracking-wider">Discord Output Visualizer</span>
                  <span className="text-[10px] font-mono text-amber-400">#level-up</span>
                </div>

                <div className="rounded-2xl bg-[#313338] border border-black/30 p-5 font-sans text-xs shadow-2xl space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center font-bold text-white text-xs shrink-0 overflow-hidden shadow-lg">
                      <img src="/vp-logo-icon.png" alt="VP" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">VePlexity Levels</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#5865F2] text-white text-[9px] font-extrabold">BOT</span>
                        <span className="text-[10px] text-gray-400">Today at 4:21 PM</span>
                      </div>

                      <div className="rounded-xl bg-[#2b2d31] border-l-4 border-amber-400 p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-sm">🎉 LEVEL UP!</span>
                          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                            LEVEL 5
                          </span>
                        </div>

                        <p className="text-xs text-gray-200">
                          {levelingMessage
                            .replace(/{user}/g, "@Alex")
                            .replace(/{level}/g, "5")}
                        </p>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono">
                            <span>Rank #3 • 2,450 XP</span>
                            <span>Next: Level 6</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-black/50 overflow-hidden border border-white/5">
                            <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full w-4/5" />
                          </div>
                        </div>

                        <div className="pt-2 border-t border-white/5 flex items-center gap-2 text-[11px] text-gray-300">
                          <span>Unlocked Role:</span>
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                            🥉 Bronze Member
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 px-1">
                  Illustrates the level-up card dispatched to members when earning XP.
                </p>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              5. SERVER BOOSTERS REWARDS (FREE VIP FEATURE)
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "boosters" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 sm:p-7 rounded-2xl bg-[#15161c] border border-white/5 space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                          <Zap className="w-5 h-5 text-pink-400" />
                          <span>Server Boosters Appreciation</span>
                        </h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-bold border border-pink-500/30">
                          Free VIP
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Publicly celebrate server boosters in chat and assign VIP cosmetic roles.
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      checked={boostersEnabled}
                      onChange={(e) => setBoostersEnabled(e.target.checked)}
                      className="w-5 h-5 accent-pink-500 cursor-pointer"
                    />
                  </div>

                  {boostersEnabled && (
                    <div className="space-y-4 pt-4 border-t border-white/5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                            Booster Announcement Channel
                          </label>
                          <select
                            value={boostersChannel}
                            onChange={(e) => setBoostersChannel(e.target.value)}
                            className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-pink-500/50"
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
                          <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                            VIP Booster Reward Role
                          </label>
                          <select
                            value={boostersRole}
                            onChange={(e) => setBoostersRole(e.target.value)}
                            className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-pink-500/50"
                          >
                            <option value="">None (No extra role)</option>
                            {guild?.roles
                              ?.filter((r) => r.name !== "@everyone")
                              .map((r) => (
                                <option key={r.id} value={r.id}>
                                  {r.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                          Booster Thank-You Message
                        </label>
                        <textarea
                          rows={3}
                          value={boostersMessage}
                          onChange={(e) => setBoostersMessage(e.target.value)}
                          className="w-full bg-[#1c1d24] border border-white/10 rounded-xl p-3.5 text-xs text-white outline-none focus:border-pink-500/50"
                        />
                        <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-400">
                          <span>Click to insert:</span>
                          <button
                            type="button"
                            onClick={() => setBoostersMessage(m => m + " {user}")}
                            className="px-2 py-0.5 rounded bg-white/5 hover:bg-pink-500/20 text-pink-300 font-mono text-[11px]"
                          >
                            + &#123;user&#125;
                          </button>
                          <button
                            type="button"
                            onClick={() => setBoostersMessage(m => m + " {server}")}
                            className="px-2 py-0.5 rounded bg-white/5 hover:bg-pink-500/20 text-pink-300 font-mono text-[11px]"
                          >
                            + &#123;server&#125;
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Output Visualizer: Discord Booster Embed */}
              <div className="lg:col-span-5 space-y-3 sticky top-20">
                <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                  <span className="font-semibold uppercase text-[10px] tracking-wider">Discord Output Visualizer</span>
                  <span className="text-[10px] font-mono text-pink-400">#boosters</span>
                </div>

                <div className="rounded-2xl bg-[#313338] border border-black/30 p-5 font-sans text-xs shadow-2xl space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center font-bold text-white text-xs shrink-0 overflow-hidden shadow-lg">
                      <img src="/vp-logo-icon.png" alt="VP" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">VePlexity</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#5865F2] text-white text-[9px] font-extrabold">BOT</span>
                        <span className="text-[10px] text-gray-400">Today at 4:21 PM</span>
                      </div>

                      <div className="rounded-xl bg-[#2b2d31] border-l-4 border-pink-500 p-4 space-y-3">
                        <div className="flex items-center gap-2 text-pink-400 font-bold text-sm">
                          <span>🚀 NEW SERVER BOOST! 🎉</span>
                        </div>

                        <p className="text-xs text-gray-200 leading-relaxed">
                          {boostersMessage
                            .replace(/{user}/g, "@Alex")
                            .replace(/{server}/g, guild?.name || "Server")}
                        </p>

                        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400">
                          <span>Assigned: @Server Booster VIP</span>
                          <span className="text-pink-400 font-bold">Level 3 Perks Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              6. WELCOME & GOODBYE
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "welcome" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 sm:p-7 rounded-2xl bg-[#15161c] border border-white/5 space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Bell className="w-5 h-5 text-emerald-400" />
                        <span>Welcome & Goodbye Messages</span>
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        Greet new arrivals with custom embeds and assign auto-roles immediately.
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
                    <div className="space-y-4 pt-4 border-t border-white/5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
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
                          <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
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

                      <div className="p-3.5 rounded-xl bg-[#1c1d24] border border-white/5 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-xs text-white">Send Direct Message (DM) to New Member</p>
                          <p className="text-[11px] text-gray-400">Sends a private welcome greeting directly into member&apos;s DMs.</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={dmWelcome}
                          onChange={(e) => setDmWelcome(e.target.checked)}
                          className="w-4 h-4 accent-emerald-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                          Welcome Message Content
                        </label>
                        <textarea
                          rows={3}
                          value={welcomeMessage}
                          onChange={(e) => setWelcomeMessage(e.target.value)}
                          className="w-full bg-[#1c1d24] border border-white/10 rounded-xl p-3.5 text-xs text-white outline-none focus:border-emerald-500/50"
                          placeholder="Welcome to {server}, {user}! We're thrilled to have you here 🎉"
                        />
                        <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-400">
                          <span>Click to insert:</span>
                          <button
                            type="button"
                            onClick={() => setWelcomeMessage((m) => m + " {user}")}
                            className="px-2 py-0.5 rounded bg-white/5 hover:bg-emerald-500/20 text-emerald-400 text-[11px] font-mono transition"
                          >
                            + &#123;user&#125;
                          </button>
                          <button
                            type="button"
                            onClick={() => setWelcomeMessage((m) => m + " {server}")}
                            className="px-2 py-0.5 rounded bg-white/5 hover:bg-emerald-500/20 text-emerald-400 text-[11px] font-mono transition"
                          >
                            + &#123;server&#125;
                          </button>
                          <button
                            type="button"
                            onClick={() => setWelcomeMessage((m) => m + " {memberCount}")}
                            className="px-2 py-0.5 rounded bg-white/5 hover:bg-emerald-500/20 text-emerald-400 text-[11px] font-mono transition"
                          >
                            + &#123;memberCount&#125;
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Output Visualizer */}
              <div className="lg:col-span-5 space-y-3 sticky top-20">
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

                <div className="rounded-2xl bg-[#313338] border border-black/30 p-5 font-sans text-xs shadow-2xl space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-xs shrink-0 overflow-hidden">
                      <img src="/vp-logo-icon.png" alt="VP" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">VePlexity</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#5865F2] text-white text-[9px] font-extrabold">BOT</span>
                        <span className="text-[10px] text-gray-400">Today at 4:20 PM</span>
                      </div>

                      {welcomePreviewMode === "welcome" ? (
                        <div className="rounded-xl bg-[#2b2d31] border-l-4 border-fuchsia-500 p-4 space-y-2.5">
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
                        <div className="rounded-xl bg-[#2b2d31] border-l-4 border-gray-500 p-4 space-y-2">
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
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              7. AUTO-MOD DEFENSE (EXPANDED FILTERS)
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "automod" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 sm:p-7 rounded-2xl bg-[#15161c] border border-white/5 space-y-5">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Lock className="w-5 h-5 text-red-400" />
                      <span>Auto-Mod Defense Shield</span>
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
                      },
                      {
                        id: "antiLinks",
                        label: "Block External Suspicious Links",
                        desc: "Blocks unknown phishing and scam URLs in public channels.",
                        value: antiLinks,
                        setter: setAntiLinks
                      },
                      {
                        id: "antiCaps",
                        label: "Excessive Capitals Limiter",
                        desc: "Automatically deletes messages with >70% shout caps.",
                        value: antiCaps,
                        setter: setAntiCaps
                      }
                    ].map((rule) => (
                      <div
                        key={rule.id}
                        className="p-4 rounded-xl bg-[#1c1d24] border border-white/5 flex items-center justify-between gap-4"
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

              {/* Right Output Visualizer */}
              <div className="lg:col-span-5 space-y-3 sticky top-20">
                <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                  <span className="font-semibold uppercase text-[10px] tracking-wider">Discord Output Visualizer</span>
                  <span className="text-[10px] font-mono text-red-400">#general & #mod-logs</span>
                </div>

                <div className="rounded-2xl bg-[#313338] border border-black/30 p-5 font-sans text-xs shadow-2xl space-y-4">
                  <div className="space-y-2 border-b border-white/5 pb-3">
                    <p className="text-[10px] font-mono uppercase text-gray-400 font-bold">1. What member sees in channel:</p>
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-red-600/80 flex items-center justify-center font-bold text-white text-[10px] shrink-0">
                        🛡️
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-white text-xs">VePlexity Shield</span>
                          <span className="px-1.5 py-0.2 rounded bg-[#5865F2] text-white text-[9px] font-extrabold">BOT</span>
                        </div>
                        <p className="text-xs text-amber-200 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
                          ⚠️ <span className="font-semibold">@Alex</span>, your message was deleted for containing an unauthorized Discord invite link.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-mono uppercase text-gray-400 font-bold">2. Logged to #mod-logs:</p>
                    <div className="rounded-xl bg-[#2b2d31] border-l-4 border-red-500 p-3.5 space-y-1.5 text-xs">
                      <p className="font-bold text-white">🛡️ Auto-Mod Triggered: Discord Invite Blocked</p>
                      <p className="text-gray-300"><strong>User:</strong> @Alex <span className="text-gray-500 text-[10px]">(ID: 981273)</span></p>
                      <p className="text-gray-300"><strong>Channel:</strong> #general</p>
                      <p className="text-gray-300"><strong>Payload:</strong> <code className="text-red-300 font-mono text-[10px]">https://discord.gg/nitro-2026</code></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              8. MUSIC & 24/7 VOICE STAY (HYDRA CHARGES $5/MO, FREE HERE)
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "music" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 sm:p-7 rounded-2xl bg-[#15161c] border border-white/5 space-y-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Music className="w-5 h-5 text-indigo-400" />
                        <span>Music Playback & 24/7 Radio</span>
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                        24/7 Stay Free
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Lavalink lossless 24-bit audio playback with 24/7 stay mode enabled for free.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
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
                      <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
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

                  {/* 24/7 Mode Switch */}
                  <div className="p-4 rounded-xl bg-[#1c1d24] border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-xs text-white flex items-center gap-1.5">
                        <span>24/7 Voice Channel Stay Mode</span>
                        <span className="text-[10px] text-emerald-400 font-mono">(Normally Paid)</span>
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        Bot stays connected in voice channel 24/7 even when music ends or channel is empty.
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      checked={stay247}
                      onChange={(e) => setStay247(e.target.checked)}
                      className="w-5 h-5 accent-indigo-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Right Output Visualizer: Discord /nowplaying Card */}
              <div className="lg:col-span-5 space-y-3 sticky top-20">
                <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                  <span className="font-semibold uppercase text-[10px] tracking-wider">Discord Output Visualizer</span>
                  <span className="text-[10px] font-mono text-indigo-400">#music-chat</span>
                </div>

                <div className="rounded-2xl bg-[#313338] border border-black/30 p-5 font-sans text-xs shadow-2xl space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-xs shrink-0 overflow-hidden shadow-lg">
                      <img src="/vp-logo-icon.png" alt="VP" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">VePlexity Music</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#5865F2] text-white text-[9px] font-extrabold">BOT</span>
                      </div>

                      <div className="rounded-xl bg-[#2b2d31] border-l-4 border-indigo-500 p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">🎵 Now Playing</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                            Vol: {defaultVolume}% {stay247 && "• 24/7 Active"}
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
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              9. GEMINI AI CHATBOT WITH CUSTOM LORE
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "ai" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 sm:p-7 rounded-2xl bg-[#15161c] border border-white/5 space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Bot className="w-5 h-5 text-purple-400" />
                        <span>Gemini AI Chatbot Engine</span>
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        Configure personality modes and supply custom server lore to guide the AI.
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
                    <div className="space-y-4 pt-4 border-t border-white/5">
                      <div>
                        <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
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
                        <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-2 block">
                          AI Personality Preset
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {[
                            { id: "standard", label: "Friendly & Helpful", desc: "Balanced, polite assistant." },
                            { id: "savage", label: "Savage & Roast", desc: "Hilarious clapbacks & roasts." },
                            { id: "anime", label: "Tsundere Anime", desc: "Anime banter with reactions." },
                          ].map((mode) => (
                            <button
                              key={mode.id}
                              type="button"
                              onClick={() => setAiMode(mode.id)}
                              className={`p-3.5 rounded-xl border text-left transition ${
                                aiMode === mode.id
                                  ? "bg-purple-600/20 border-purple-500 text-white shadow-sm"
                                  : "bg-[#1c1d24] border-white/5 text-gray-300 hover:border-white/15"
                              }`}
                            >
                              <p className="font-bold text-xs">{mode.label}</p>
                              <p className="text-[11px] text-gray-400 mt-1">{mode.desc}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                          Custom Server Lore & AI System Prompt (Optional)
                        </label>
                        <textarea
                          rows={3}
                          value={customAiPrompt}
                          onChange={(e) => setCustomAiPrompt(e.target.value)}
                          placeholder="e.g. You are the mascot of VePlexity Point. Speak like a cybernetic AI assistant and recommend our gaming events..."
                          className="w-full bg-[#1c1d24] border border-white/10 rounded-xl p-3.5 text-xs text-white outline-none focus:border-purple-500/50"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Output Visualizer */}
              <div className="lg:col-span-5 space-y-3 sticky top-20">
                <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                  <span className="font-semibold uppercase text-[10px] tracking-wider">Discord Output Visualizer</span>
                  <span className="text-[10px] font-mono text-purple-400">#ai-chat</span>
                </div>

                <div className="rounded-2xl bg-[#313338] border border-black/30 p-5 font-sans text-xs shadow-2xl space-y-3">
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

                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white text-[10px] shrink-0 overflow-hidden">
                      <img src="/vp-logo-icon.png" alt="VP" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white text-xs">VePlexity</span>
                        <span className="px-1 py-0.2 rounded bg-[#5865F2] text-white text-[9px] font-extrabold">BOT</span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#2b2d31] text-xs text-gray-200 border border-white/5 leading-relaxed">
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
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              10. TEMPORARY VOICE HUBS
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "tempvc" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 sm:p-7 rounded-2xl bg-[#15161c] border border-white/5 space-y-5">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Mic className="w-5 h-5 text-violet-400" />
                      <span>Join-to-Create Temporary Voice Hubs</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Whenever members connect to the Hub, a private voice room is spawned. It auto-deletes when the last member leaves!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
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
                      <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
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

              {/* Right Output Visualizer */}
              <div className="lg:col-span-5 space-y-3 sticky top-20">
                <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                  <span className="font-semibold uppercase text-[10px] tracking-wider">Discord Output Visualizer</span>
                  <span className="text-[10px] font-mono text-violet-400">Channel Sidebar</span>
                </div>

                <div className="rounded-2xl bg-[#2b2d31] border border-black/30 p-5 font-sans text-xs shadow-2xl space-y-3">
                  <p className="text-[11px] uppercase font-bold text-gray-400 tracking-wider">
                    {guild?.channels?.categories?.find(c => c.id === tempVcCategory)?.name || "VOICE CHANNELS"}
                  </p>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 text-gray-300 p-2 rounded hover:bg-white/5 transition">
                      <span className="text-violet-400 font-bold">🔊</span>
                      <span className="font-medium">{guild?.channels?.voice?.find(c => c.id === tempVcHub)?.name || "[+] Join to Create"}</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/5 text-gray-400 ml-auto font-mono">Hub</span>
                    </div>

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
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              11. STARBOARD (HALL OF FAME)
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "starboard" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 sm:p-7 rounded-2xl bg-[#15161c] border border-white/5 space-y-5">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span>Starboard (Hall of Fame)</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      When community messages reach your star reaction threshold, the bot automatically pins them to the Starboard channel.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                        Starboard Channel
                      </label>
                      <select
                        value={starboardChannel}
                        onChange={(e) => setStarboardChannel(e.target.value)}
                        className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-yellow-500/50"
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
                      <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                        Required Stars Threshold
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={25}
                        value={starboardStars}
                        onChange={(e) => setStarboardStars(Number(e.target.value))}
                        className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-yellow-500/50"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Output Visualizer */}
              <div className="lg:col-span-5 space-y-3 sticky top-20">
                <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                  <span className="font-semibold uppercase text-[10px] tracking-wider">Discord Output Visualizer</span>
                  <span className="text-[10px] font-mono text-yellow-400">#starboard</span>
                </div>

                <div className="rounded-2xl bg-[#313338] border border-black/30 p-5 font-sans text-xs shadow-2xl space-y-3">
                  <div className="flex items-center gap-2 text-yellow-400 font-bold text-xs pb-1 border-b border-white/5">
                    <span>⭐ {starboardStars} | #general</span>
                    <span className="text-gray-400 text-[10px] font-mono font-normal">ID: 104928109</span>
                  </div>

                  <div className="rounded-xl bg-[#2b2d31] border-l-4 border-yellow-400 p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-white text-[9px]">
                        A
                      </div>
                      <span className="font-bold text-white text-xs">CommunityMember</span>
                    </div>

                    <p className="text-gray-200 text-xs leading-relaxed">
                      &quot;This bot has been running without a single crash for 3 months now. Best Discord bot update we&apos;ve seen! 🔥✨&quot;
                    </p>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-yellow-300">
                      <span className="hover:underline cursor-pointer">Jump to Original Message ➔</span>
                      <span className="text-gray-500">Today at 4:18 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              12. COMMUNITY SUGGESTIONS BOX
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "suggestions" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 sm:p-7 rounded-2xl bg-[#15161c] border border-white/5 space-y-5">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <ThumbsUp className="w-5 h-5 text-cyan-400" />
                      <span>Community Suggestions Box</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      When members run <code className="text-cyan-300">/suggest</code>, the bot formats their idea into a rich embed with interactive voting buttons.
                    </p>
                  </div>

                  <div className="pt-1">
                    <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
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

              {/* Right Output Visualizer */}
              <div className="lg:col-span-5 space-y-3 sticky top-20">
                <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                  <span className="font-semibold uppercase text-[10px] tracking-wider">Discord Output Visualizer</span>
                  <span className="text-[10px] font-mono text-cyan-400">#suggestions</span>
                </div>

                <div className="rounded-2xl bg-[#313338] border border-black/30 p-5 font-sans text-xs shadow-2xl space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center font-bold text-white text-xs shrink-0 overflow-hidden shadow-lg">
                      <img src="/vp-logo-icon.png" alt="VP" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">VePlexity</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#5865F2] text-white text-[9px] font-extrabold">BOT</span>
                        <span className="text-[10px] text-gray-400">Today at 4:21 PM</span>
                      </div>

                      <div className="rounded-xl bg-[#2b2d31] border-l-4 border-cyan-400 p-4 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-xs">💡 Suggestion #28</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 font-bold">
                            Voting Open
                          </span>
                        </div>

                        <p className="text-gray-200 text-xs leading-relaxed">
                          &quot;Can we create a weekend gaming tournament voice channel with prizes for top scores?&quot;
                        </p>

                        <div className="pt-2 border-t border-white/5 flex items-center gap-2">
                          <div className="px-3 py-1 rounded bg-[#383a40] text-emerald-400 text-xs flex items-center gap-1.5 font-bold border border-white/5">
                            <ThumbsUp className="w-3.5 h-3.5" />
                            <span>18</span>
                          </div>
                          <div className="px-3 py-1 rounded bg-[#383a40] text-red-400 text-xs flex items-center gap-1.5 font-bold border border-white/5">
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
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              13. BIRTHDAYS & COUNTING GAME
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "community" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 sm:p-7 rounded-2xl bg-[#15161c] border border-white/5 space-y-5">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Gamepad2 className="w-5 h-5 text-rose-400" />
                      <span>Counting Game & Birthdays</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Configure community interaction channels for counting streaks and automated birthday celebrations.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                        Counting Game Channel
                      </label>
                      <select
                        value={countingChannel}
                        onChange={(e) => setCountingChannel(e.target.value)}
                        className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-rose-500/50"
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
                      <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                        Birthday Celebration Channel
                      </label>
                      <select
                        value={birthdayChannel}
                        onChange={(e) => setBirthdayChannel(e.target.value)}
                        className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-rose-500/50"
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

              {/* Right Output Visualizer */}
              <div className="lg:col-span-5 space-y-3 sticky top-20">
                <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                  <span className="font-semibold uppercase text-[10px] tracking-wider">Discord Output Visualizer</span>
                  <span className="text-[10px] font-mono text-rose-400">#counting & #birthdays</span>
                </div>

                <div className="rounded-2xl bg-[#313338] border border-black/30 p-5 font-sans text-xs shadow-2xl space-y-4">
                  <div className="space-y-2 border-b border-white/5 pb-3">
                    <p className="text-[10px] font-mono uppercase text-gray-400 font-bold">Counting in #counting:</p>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 font-bold text-xs">Alex:</span>
                        <span className="text-white font-mono bg-black/30 px-2.5 py-0.5 rounded">41</span>
                        <span className="text-xs">✅</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 font-bold text-xs">Sam:</span>
                        <span className="text-white font-mono bg-black/30 px-2.5 py-0.5 rounded">42</span>
                        <span className="text-xs">✅</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 font-bold text-xs">Veer:</span>
                        <span className="text-amber-400 font-mono bg-amber-500/20 px-2.5 py-0.5 rounded font-bold">100</span>
                        <span className="text-xs">💯 ⭐ (Milestone!)</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-[10px] font-mono uppercase text-gray-400 font-bold">Birthday in #birthdays:</p>
                    <div className="rounded-xl bg-[#2b2d31] border-l-4 border-rose-500 p-3.5 space-y-1.5 text-xs">
                      <p className="font-bold text-white text-xs">🎉 Happy Birthday, @Alex! 🎂</p>
                      <p className="text-gray-300 leading-relaxed text-[11px]">
                        Today is a special day! Wishing @Alex a fantastic birthday filled with joy and wins! 🎁🥳
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              14. MESSAGE BUILDER & ANNOUNCEMENTS
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "announce" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 sm:p-7 rounded-2xl bg-[#15161c] border border-white/5 space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Megaphone className="w-5 h-5 text-fuchsia-400" />
                      <span>Message Builder & Announcements</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Compose a formatted Discord embed and dispatch it directly to any channel.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
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
                      <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
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
                    <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
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
                    <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                      Message Body
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Write your announcement content..."
                      value={annMessage}
                      onChange={(e) => setAnnMessage(e.target.value)}
                      className="w-full bg-[#1c1d24] border border-white/10 rounded-xl p-3.5 text-xs text-white outline-none focus:border-fuchsia-500/50"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 font-medium">Color:</span>
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
                      className="py-2.5 px-6 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold text-xs transition flex items-center gap-2 shadow-lg disabled:opacity-40"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{annSending ? "Dispatching..." : "Send Announcement"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Output Visualizer */}
              <div className="lg:col-span-5 space-y-3 sticky top-20">
                <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                  <span className="font-semibold uppercase text-[10px] tracking-wider">Discord Output Visualizer</span>
                  <span className="text-[10px] font-mono text-fuchsia-400">Live Preview</span>
                </div>

                <div className="rounded-2xl bg-[#313338] border border-black/30 p-5 font-sans text-xs shadow-2xl space-y-2.5">
                  {annPing !== "none" && (
                    <p className="text-fuchsia-300 font-mono text-[11px]">{annPing}</p>
                  )}

                  <div
                    className="rounded-xl bg-[#2b2d31] border-l-4 p-4 space-y-2"
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
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              15. REACTION ROLES & SELF-ASSIGN MENUS (FREE VIP)
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "reactionroles" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
              <div className="lg:col-span-7 space-y-6">
                {/* Header Card */}
                <div className="p-6 sm:p-7 rounded-2xl bg-[#15161c] border border-white/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">Reaction Roles & Dropdown Menus</h3>
                        <p className="text-xs text-gray-400 mt-0.5">Let members choose roles with interactive buttons or select menus</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 font-bold">
                      💎 Free VIP
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Bots like MEE6 and Carl-bot charge up to $10/mo for reaction role menus. With VePlexity, deploy unlimited button and dropdown menus completely free.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                        Target Text Channel
                      </label>
                      <select
                        value={rrChannel}
                        onChange={(e) => setRrChannel(e.target.value)}
                        className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-purple-500/50"
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
                      <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                        Component Style
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setRrStyle("buttons")}
                          className={`py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                            rrStyle === "buttons"
                              ? "bg-purple-600/20 border-purple-500 text-purple-300"
                              : "bg-[#1c1d24] border-white/5 text-gray-400 hover:border-white/10"
                          }`}
                        >
                          Action Buttons
                        </button>
                        <button
                          type="button"
                          onClick={() => setRrStyle("select")}
                          className={`py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                            rrStyle === "select"
                              ? "bg-purple-600/20 border-purple-500 text-purple-300"
                              : "bg-[#1c1d24] border-white/5 text-gray-400 hover:border-white/10"
                          }`}
                        >
                          Select Dropdown
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                      Menu Embed Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 🎭 Choose Your Server Roles"
                      value={rrTitle}
                      onChange={(e) => setRrTitle(e.target.value)}
                      className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-purple-500/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                      Instructions & Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Click the buttons or select from the dropdown menu below to assign or remove roles!"
                      value={rrDescription}
                      onChange={(e) => setRrDescription(e.target.value)}
                      className="w-full bg-[#1c1d24] border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-purple-500/50"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-xs text-gray-400 font-medium">Embed Accent:</span>
                    {[
                      { id: "fuchsia", color: "#BD5FFF" },
                      { id: "blue", color: "#3498db" },
                      { id: "green", color: "#2ecc71" },
                      { id: "red", color: "#e74c3c" },
                      { id: "gold", color: "#f1c40f" },
                      { id: "purple", color: "#9b59b6" },
                    ].map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setRrColor(c.id)}
                        className={`w-5 h-5 rounded-full transition-transform ${
                          rrColor === c.id ? "scale-125 ring-2 ring-white" : "hover:scale-110"
                        }`}
                        style={{ backgroundColor: c.color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Role Items Config */}
                <div className="p-6 sm:p-7 rounded-2xl bg-[#15161c] border border-white/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-white">Interactive Role Choices ({rrItems.length}/25)</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Specify emoji, button label, and Discord role</p>
                    </div>

                    {rrItems.length < 25 && (
                      <button
                        type="button"
                        onClick={() => setRrItems([...rrItems, { roleId: "", label: `Role ${rrItems.length + 1}`, emoji: "✨" }])}
                        className="py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white transition flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Role</span>
                      </button>
                    )}
                  </div>

                  <div className="space-y-3 pt-1">
                    {rrItems.map((item, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-[#1c1d24] border border-white/5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <div className="w-16 shrink-0">
                          <label className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Emoji</label>
                          <input
                            type="text"
                            value={item.emoji}
                            onChange={(e) => {
                              const updated = [...rrItems];
                              updated[idx].emoji = e.target.value;
                              setRrItems(updated);
                            }}
                            className="w-full bg-[#15161c] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-center text-white outline-none focus:border-purple-500/50"
                            placeholder="🎮"
                          />
                        </div>

                        <div className="flex-1 min-w-[120px]">
                          <label className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Button Label</label>
                          <input
                            type="text"
                            value={item.label}
                            onChange={(e) => {
                              const updated = [...rrItems];
                              updated[idx].label = e.target.value;
                              setRrItems(updated);
                            }}
                            className="w-full bg-[#15161c] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-purple-500/50"
                            placeholder="Label (e.g. Gamer)"
                          />
                        </div>

                        <div className="flex-1 min-w-[140px]">
                          <label className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Assigned Role</label>
                          <select
                            value={item.roleId}
                            onChange={(e) => {
                              const updated = [...rrItems];
                              updated[idx].roleId = e.target.value;
                              setRrItems(updated);
                            }}
                            className="w-full bg-[#15161c] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-purple-500/50"
                          >
                            <option value="">Select a role...</option>
                            {guild?.roles?.filter((r) => r.name !== "@everyone").map((r) => (
                              <option key={r.id} value={r.id}>
                                @{r.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {rrItems.length > 1 && (
                          <div className="sm:self-end pb-0.5">
                            <button
                              type="button"
                              onClick={() => setRrItems(rrItems.filter((_, i) => i !== idx))}
                              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                              title="Remove Option"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <p className="text-xs text-gray-400">
                      Settings save automatically when you click &quot;Save Changes&quot; in the header bar.
                    </p>
                    <button
                      type="button"
                      onClick={handleDeployReactionRoles}
                      disabled={rrDeploying || !rrChannel || !rrItems.some(i => i.roleId)}
                      className="py-2.5 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition flex items-center gap-2 shadow-lg disabled:opacity-40"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{rrDeploying ? "Deploying..." : "Deploy to Discord"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Output Visualizer: Live Discord Reaction Role Preview */}
              <div className="lg:col-span-5 space-y-3 sticky top-20">
                <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                  <span className="font-semibold uppercase text-[10px] tracking-wider">Discord Output Visualizer</span>
                  <span className="text-[10px] font-mono text-purple-400">#roles-preview</span>
                </div>

                <div className="rounded-2xl bg-[#313338] border border-black/30 p-5 font-sans text-xs shadow-2xl space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white text-xs shrink-0 overflow-hidden">
                      <img src="/vp-logo-icon.png" alt="VP" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">VePlexity</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#5865F2] text-white text-[9px] font-extrabold">BOT</span>
                        <span className="text-[10px] text-gray-400">Today at 4:21 PM</span>
                      </div>

                      {/* Embed Preview */}
                      <div
                        className="rounded-xl bg-[#2b2d31] border-l-4 p-4 space-y-2"
                        style={{
                          borderColor:
                            rrColor === "fuchsia" ? "#BD5FFF" :
                            rrColor === "blue" ? "#3498db" :
                            rrColor === "green" ? "#2ecc71" :
                            rrColor === "red" ? "#e74c3c" :
                            rrColor === "gold" ? "#f1c40f" : "#9b59b6"
                        }}
                      >
                        <p className="font-bold text-sm text-white">{rrTitle || "🎭 Choose Your Server Roles"}</p>
                        <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap">
                          {rrDescription || "Click the buttons or select from the dropdown below to assign or remove roles!"}
                        </p>
                        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500">
                          <span>Role Selection • {guild?.name}</span>
                          <span>Today</span>
                        </div>
                      </div>

                      {/* Discord Interactive Controls Mockup */}
                      <div className="pt-2">
                        {rrStyle === "buttons" ? (
                          <div className="flex flex-wrap gap-2">
                            {rrItems.map((item, idx) => (
                              <div
                                key={idx}
                                className="px-3.5 py-2 rounded-md bg-[#4e5058] hover:bg-[#6d6f78] text-white font-medium text-xs flex items-center gap-2 shadow cursor-pointer transition select-none"
                              >
                                {item.emoji && <span>{item.emoji}</span>}
                                <span>{item.label || "Role Option"}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <div className="w-full bg-[#1e1f22] border border-[#232428] rounded-md px-3 py-2 flex items-center justify-between text-gray-300 text-xs shadow-inner">
                              <span className="text-gray-400">Choose your roles...</span>
                              <ChevronRight className="w-3.5 h-3.5 text-gray-400 rotate-90" />
                            </div>
                            <div className="bg-[#2b2d31] border border-black/30 rounded-md p-1.5 shadow-xl space-y-1">
                              {rrItems.map((item, idx) => (
                                <div key={idx} className="p-1.5 rounded hover:bg-[#35373c] flex items-center gap-2 text-xs text-gray-200 cursor-pointer">
                                  <div className="w-3.5 h-3.5 rounded border border-gray-500 flex items-center justify-center text-[10px]">
                                    {idx === 0 && <Check className="w-3 h-3 text-emerald-400" />}
                                  </div>
                                  {item.emoji && <span>{item.emoji}</span>}
                                  <span>{item.label}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              16. CUSTOM AUTO-RESPONDERS & TRIGGERS (FREE VIP)
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "autoresponders" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 sm:p-7 rounded-2xl bg-[#15161c] border border-white/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">Custom Auto-Responders & Triggers</h3>
                        <p className="text-xs text-gray-400 mt-0.5">Automate replies to common questions, keywords, and custom chat triggers</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-bold">
                      💎 Free VIP
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    MEE6 limits free servers to just 3 custom commands and charges $12/mo for more. VePlexity provides unlimited custom keyword triggers with rich embed formatting completely free.
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <h4 className="font-bold text-sm text-white">Configured Auto-Responders ({autoResponders.length})</h4>
                    <button
                      type="button"
                      onClick={() => {
                        const newId = Date.now().toString();
                        setAutoResponders([
                          ...autoResponders,
                          {
                            id: newId,
                            trigger: "!newtrigger",
                            matchType: "exact",
                            response: "This is a custom auto-response message!",
                            isEmbed: true
                          }
                        ]);
                        setActiveArPreviewIndex(autoResponders.length);
                      }}
                      className="py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white transition flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>New Trigger</span>
                    </button>
                  </div>

                  <div className="space-y-4 pt-1">
                    {autoResponders.map((ar, idx) => (
                      <div
                        key={ar.id}
                        onClick={() => setActiveArPreviewIndex(idx)}
                        className={`p-4 rounded-xl border transition space-y-3 cursor-pointer ${
                          activeArPreviewIndex === idx
                            ? "bg-[#181920] border-cyan-500/40 shadow-lg"
                            : "bg-[#1c1d24] border-white/5 hover:border-white/15"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 flex-1">
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-bold">
                              #{idx + 1}
                            </span>
                            <input
                              type="text"
                              value={ar.trigger}
                              onChange={(e) => {
                                const updated = [...autoResponders];
                                updated[idx].trigger = e.target.value;
                                setAutoResponders(updated);
                              }}
                              className="bg-[#15161c] border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono text-white outline-none focus:border-cyan-500/50 flex-1 max-w-xs"
                              placeholder="!trigger"
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={ar.matchType}
                              onChange={(e) => {
                                const updated = [...autoResponders];
                                updated[idx].matchType = e.target.value as any;
                                setAutoResponders(updated);
                              }}
                              className="bg-[#15161c] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-gray-300 outline-none"
                            >
                              <option value="exact">Exact Match</option>
                              <option value="contains">Contains Word</option>
                              <option value="startswith">Starts With</option>
                            </select>

                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...autoResponders];
                                updated[idx].isEmbed = !updated[idx].isEmbed;
                                setAutoResponders(updated);
                              }}
                              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
                                ar.isEmbed
                                  ? "bg-fuchsia-600/20 border-fuchsia-500 text-fuchsia-300"
                                  : "bg-white/5 border-white/10 text-gray-400"
                              }`}
                            >
                              {ar.isEmbed ? "Rich Embed" : "Plain Text"}
                            </button>

                            {autoResponders.length > 1 && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const updated = autoResponders.filter((_, i) => i !== idx);
                                  setAutoResponders(updated);
                                  if (activeArPreviewIndex >= updated.length) {
                                    setActiveArPreviewIndex(Math.max(0, updated.length - 1));
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                                title="Delete Trigger"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Response Message</label>
                          <textarea
                            rows={2}
                            value={ar.response}
                            onChange={(e) => {
                              const updated = [...autoResponders];
                              updated[idx].response = e.target.value;
                              setAutoResponders(updated);
                            }}
                            className="w-full bg-[#15161c] border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-cyan-500/50"
                            placeholder="Bot response message..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Output Visualizer: Live Discord Chat Simulation */}
              <div className="lg:col-span-5 space-y-3 sticky top-20">
                <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                  <span className="font-semibold uppercase text-[10px] tracking-wider">Discord Output Visualizer</span>
                  <span className="text-[10px] font-mono text-cyan-400">#chat-preview</span>
                </div>

                <div className="rounded-2xl bg-[#313338] border border-black/30 p-5 font-sans text-xs shadow-2xl space-y-4">
                  {/* Member trigger message */}
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-white text-xs shrink-0">
                      U
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">ServerMember</span>
                        <span className="text-[10px] text-gray-400">Today at 4:22 PM</span>
                      </div>
                      <p className="text-gray-200 font-mono text-xs bg-black/20 px-2.5 py-1 rounded-md inline-block">
                        {autoResponders[activeArPreviewIndex]?.trigger || "!rules"}
                      </p>
                    </div>
                  </div>

                  {/* Bot automated reply */}
                  <div className="flex items-start gap-3 pl-2 border-l-2 border-cyan-500/30">
                    <div className="w-9 h-9 rounded-full bg-cyan-600 flex items-center justify-center font-bold text-white text-xs shrink-0 overflow-hidden">
                      <img src="/vp-logo-icon.png" alt="VP" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">VePlexity</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#5865F2] text-white text-[9px] font-extrabold">BOT</span>
                        <span className="text-[10px] text-gray-400">Today at 4:22 PM</span>
                      </div>

                      {autoResponders[activeArPreviewIndex]?.isEmbed ? (
                        <div className="rounded-xl bg-[#2b2d31] border-l-4 border-cyan-400 p-4 space-y-1.5">
                          <p className="font-bold text-xs text-white">
                            {autoResponders[activeArPreviewIndex]?.trigger || "!rules"}
                          </p>
                          <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap">
                            {autoResponders[activeArPreviewIndex]?.response || "Please respect all members, keep chat civil, and abide by Discord ToS!"}
                          </p>
                          <div className="pt-2 border-t border-white/5 text-[10px] text-gray-500">
                            Auto-Responder • {guild?.name}
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-gray-200 leading-relaxed whitespace-pre-wrap">
                          {autoResponders[activeArPreviewIndex]?.response || "Please respect all members, keep chat civil, and abide by Discord ToS!"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              17. VIP PERKS & BUY ME A COFFEE
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "perks" && (
            <div className="space-y-6 w-full">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#15161c] border border-white/5 space-y-6 w-full">
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
                      className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs transition flex items-center gap-2 shadow-lg"
                    >
                      <Coffee className="w-4 h-4 text-black" />
                      <span>Buy Me a Coffee</span>
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="p-6 rounded-2xl bg-[#1c1d24] border border-white/5 flex flex-col sm:flex-row items-center gap-5">
                    <div className="p-2.5 bg-white rounded-xl shrink-0 shadow-md">
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

                  <div className="p-6 rounded-2xl bg-[#1c1d24] border border-white/5 space-y-3 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-wider text-fuchsia-400">
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
                      className="py-3 px-5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs transition flex items-center justify-center gap-2 border border-white/10"
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
          <div className="p-4 rounded-xl bg-[#1a1b22] border border-fuchsia-500/40 backdrop-blur-2xl shadow-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <p className="text-xs font-semibold text-gray-200">
                You have unsaved changes!
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                disabled={saving}
                className="py-1.5 px-3.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs transition"
              >
                Reset
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="py-1.5 px-5 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-lg shadow-fuchsia-600/30"
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
