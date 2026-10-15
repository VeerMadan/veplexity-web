"use client";

import { useEffect, useState, use, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { 
  Shield, Bell, Bot, Music, Check, Sparkles, AlertCircle, 
  ArrowLeft, Save, CheckCircle2, ChevronRight, Hash, 
  Volume2, VolumeX, Megaphone, Lock, Star, Mic, RotateCcw,
  Send, ExternalLink, Gamepad2, Cake, Coffee, Flame,
  MessageCircle, FileText, Settings, ThumbsUp, ThumbsDown,
  Trash2, UserMinus, UserPlus, Clock, Layers, Award,
  Zap, Radio, Link as LinkIcon, Compass, Gift, Users, Plus, Terminal,
  Palette, ChevronDown, Copy
} from "lucide-react";
import { TactileToggle } from "@/app/dashboard/[guildId]/components/TactileToggle";
import { AutoModDefenseSimulator } from "@/app/dashboard/[guildId]/components/AutoModDefenseSimulator";
import { MusicDjStudio } from "@/app/dashboard/[guildId]/components/MusicDjStudio";
import { RankCardStudio } from "@/app/dashboard/[guildId]/components/RankCardStudio";
import { ServerDestinationReveal } from "@/app/components/ServerRevealTransition";
import { ServerOverviewTab, OverviewModuleItem } from "@/app/dashboard/[guildId]/components/ServerOverviewTab";
import { dashboardAudio } from "@/lib/dashboardAudio";
import { DiscordLogo, BmcCupIcon } from "@/app/components/BrandIcons";
import UpiPaymentCard from "@/app/components/UpiPaymentCard";
import { motion, AnimatePresence } from "framer-motion";

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

interface VoiceRewardMilestone {
  id: string;
  minutes: number;
  roleId: string;
  message?: string;
}

interface TextRewardMilestone {
  id: string;
  messagesCount: number;
  roleId: string;
  message?: string;
}

interface ActivityRewardsConfig {
  enabled: boolean;
  voiceRewardsEnabled: boolean;
  voiceMilestones: VoiceRewardMilestone[];
  voiceMinMembers: number;
  ignoreDeafMute: boolean;
  textRewardsEnabled: boolean;
  textMilestones: TextRewardMilestone[];
  textCooldownSeconds: number;
  minMessageLength: number;
  notificationType: "silent" | "dm" | "channel";
  channelId: string | null;
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
  activityRewards?: ActivityRewardsConfig;
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
  bots?: {
    veplexity: boolean;
    pingplex: boolean;
  };
}

type TabType = 
  | "overview" 
  | "moderation" 
  | "logging" 
  | "automod" 
  | "welcome" 
  | "leveling"
  | "rewards"
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

export type DashboardTheme = "neon-violet" | "cyberpunk-neon" | "emerald-minimal" | "sunset-gold";

export interface ThemeConfig {
  id: DashboardTheme;
  name: string;
  bgMain: string;
  cardBg: string;
  primary: string;
  accent: string;
  border: string;
}

export const THEMES: Record<DashboardTheme, ThemeConfig> = {
  "neon-violet": {
    id: "neon-violet",
    name: "Neon Violet (Default)",
    bgMain: "#0C0E14",
    cardBg: "rgba(25, 28, 41, 0.7)",
    primary: "#BD5FFF",
    accent: "#FFDD00",
    border: "rgba(255, 255, 255, 0.08)",
  },
  "cyberpunk-neon": {
    id: "cyberpunk-neon",
    name: "Cyberpunk Neon",
    bgMain: "#08070C",
    cardBg: "rgba(20, 15, 30, 0.75)",
    primary: "#06B6D4",
    accent: "#EC4899",
    border: "rgba(255, 255, 255, 0.08)",
  },
  "emerald-minimal": {
    id: "emerald-minimal",
    name: "Emerald Minimal",
    bgMain: "#06120E",
    cardBg: "rgba(12, 30, 22, 0.75)",
    primary: "#1DB954",
    accent: "#10B981",
    border: "rgba(255, 255, 255, 0.08)",
  },
  "sunset-gold": {
    id: "sunset-gold",
    name: "Sunset Gold",
    bgMain: "#120A05",
    cardBg: "rgba(32, 18, 10, 0.75)",
    primary: "#FFDD00",
    accent: "#F97316",
    border: "rgba(255, 255, 255, 0.08)",
  },
};

function GuildDashboardInner({ params }: { params: Promise<{ guildId: string }> }) {
  const resolvedParams = use(params);
  const guildId = resolvedParams.guildId;
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const botParam = searchParams?.get("bot");

  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [theme, setTheme] = useState<DashboardTheme>("neon-violet");
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("vep_dashboard_theme") as DashboardTheme;
    if (saved && THEMES[saved]) {
      setTheme(saved);
    }
  }, []);

  const handleSelectTheme = (t: DashboardTheme) => {
    setTheme(t);
    localStorage.setItem("vep_dashboard_theme", t);
    setThemeDropdownOpen(false);
    dashboardAudio.playClick();
    showToast(`Switched theme to ${THEMES[t].name}`);
  };

  const handleCopyGuildId = () => {
    if (guildId) {
      navigator.clipboard.writeText(guildId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
      showToast("Server ID copied to clipboard!");
    }
  };

  const [guild, setGuild] = useState<GuildDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [soundOn, setSoundOn] = useState(dashboardAudio.enabled);

  // Gating & Error states
  const [notInvited, setNotInvited] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Smooth Reveal Animation State
  const [revealActive, setRevealActive] = useState(true);

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

  // Activity Rewards State (Custom Voice Time & Text Sent Rewards)
  const [rewardsEnabled, setRewardsEnabled] = useState(true);
  const [voiceRewardsEnabled, setVoiceRewardsEnabled] = useState(true);
  const [voiceMilestones, setVoiceMilestones] = useState<VoiceRewardMilestone[]>([
    { id: "vr-1", minutes: 60, roleId: "", message: "🎉 {user} spent 1 Hour in Voice Channels and unlocked {role}!" },
    { id: "vr-2", minutes: 300, roleId: "", message: "🔥 {user} spent 5 Hours in Voice Channels and unlocked {role}!" },
    { id: "vr-3", minutes: 1200, roleId: "", message: "👑 {user} achieved 20 Hours in Voice Channels and unlocked {role}!" },
  ]);
  const [voiceMinMembers, setVoiceMinMembers] = useState(1);
  const [ignoreDeafMute, setIgnoreDeafMute] = useState(true);

  const [textRewardsEnabled, setTextRewardsEnabled] = useState(true);
  const [textMilestones, setTextMilestones] = useState<TextRewardMilestone[]>([
    { id: "tr-1", messagesCount: 100, roleId: "", message: "💬 {user} reached 100 chat messages and unlocked {role}!" },
    { id: "tr-2", messagesCount: 500, roleId: "", message: "⚡ {user} reached 500 chat messages and unlocked {role}!" },
    { id: "tr-3", messagesCount: 2000, roleId: "", message: "🏆 {user} reached 2,000 chat messages and unlocked {role}!" },
  ]);
  const [textCooldownSeconds, setTextCooldownSeconds] = useState(10);
  const [minMessageLength, setMinMessageLength] = useState(3);
  const [rewardsNotificationType, setRewardsNotificationType] = useState<"silent" | "dm" | "channel">("channel");
  const [rewardsChannel, setRewardsChannel] = useState("");
  const [rewardsPreviewMode, setRewardsPreviewMode] = useState<"voice" | "text">("voice");

  const addVoiceMilestone = () => {
    const newId = `vr-${Date.now()}`;
    const highestMinutes = voiceMilestones.length > 0 ? Math.max(...voiceMilestones.map(m => m.minutes)) : 0;
    const newMinutes = highestMinutes > 0 ? highestMinutes + 120 : 60;
    setVoiceMilestones([
      ...voiceMilestones,
      {
        id: newId,
        minutes: newMinutes,
        roleId: "",
        message: `🎉 {user} reached ${newMinutes >= 60 ? Math.round(newMinutes / 60) + " Hours" : newMinutes + " Minutes"} in Voice and unlocked {role}!`
      }
    ]);
  };

  const removeVoiceMilestone = (id: string) => {
    setVoiceMilestones(voiceMilestones.filter(m => m.id !== id));
  };

  const updateVoiceMilestone = (id: string, patch: Partial<VoiceRewardMilestone>) => {
    setVoiceMilestones(voiceMilestones.map(m => m.id === id ? { ...m, ...patch } : m));
  };

  const addTextMilestone = () => {
    const newId = `tr-${Date.now()}`;
    const highestCount = textMilestones.length > 0 ? Math.max(...textMilestones.map(m => m.messagesCount)) : 0;
    const newCount = highestCount > 0 ? highestCount + 500 : 100;
    setTextMilestones([
      ...textMilestones,
      {
        id: newId,
        messagesCount: newCount,
        roleId: "",
        message: `💬 {user} reached ${newCount.toLocaleString()} chat messages and unlocked {role}!`
      }
    ]);
  };

  const removeTextMilestone = (id: string) => {
    setTextMilestones(textMilestones.filter(m => m.id !== id));
  };

  const updateTextMilestone = (id: string, patch: Partial<TextRewardMilestone>) => {
    setTextMilestones(textMilestones.map(m => m.id === id ? { ...m, ...patch } : m));
  };

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

  const guildIconUrl = useMemo(() => {
    if (!guild?.icon) return null;
    if (guild.icon.startsWith("http://") || guild.icon.startsWith("https://")) {
      return guild.icon;
    }
    return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=128`;
  }, [guild?.id, guild?.icon]);

  const guildInitials = useMemo(() => {
    if (!guild?.name) return "VP";
    const parts = guild.name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return guild.name.slice(0, 2).toUpperCase();
  }, [guild?.name]);

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

    const arList: AutoResponderItem[] = cfg.autoResponders?.length ? cfg.autoResponders : [
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

    const actCfg = cfg.activityRewards;
    const rEn = actCfg ? !!actCfg.enabled : true;
    const vrEn = actCfg ? !!actCfg.voiceRewardsEnabled : true;
    const vrMiles: VoiceRewardMilestone[] = Array.isArray(actCfg?.voiceMilestones) && actCfg.voiceMilestones.length > 0 
      ? actCfg.voiceMilestones 
      : [
          { id: "vr-1", minutes: 60, roleId: "", message: "🎉 {user} spent 1 Hour in Voice Channels and unlocked {role}!" },
          { id: "vr-2", minutes: 300, roleId: "", message: "🔥 {user} spent 5 Hours in Voice Channels and unlocked {role}!" },
          { id: "vr-3", minutes: 1200, roleId: "", message: "👑 {user} achieved 20 Hours in Voice Channels and unlocked {role}!" },
        ];
    const vrMinMem = actCfg?.voiceMinMembers ?? 1;
    const vrIgDeaf = actCfg?.ignoreDeafMute ?? true;

    const trEn = actCfg ? !!actCfg.textRewardsEnabled : true;
    const trMiles: TextRewardMilestone[] = Array.isArray(actCfg?.textMilestones) && actCfg.textMilestones.length > 0 
      ? actCfg.textMilestones 
      : [
          { id: "tr-1", messagesCount: 100, roleId: "", message: "💬 {user} reached 100 chat messages and unlocked {role}!" },
          { id: "tr-2", messagesCount: 500, roleId: "", message: "⚡ {user} reached 500 chat messages and unlocked {role}!" },
          { id: "tr-3", messagesCount: 2000, roleId: "", message: "🏆 {user} reached 2,000 chat messages and unlocked {role}!" },
        ];
    const trCd = actCfg?.textCooldownSeconds ?? 10;
    const trMinLen = actCfg?.minMessageLength ?? 3;
    const rNotifType = actCfg?.notificationType ?? "channel";
    const rNotifCh = actCfg?.channelId || "";

    setRewardsEnabled(rEn);
    setVoiceRewardsEnabled(vrEn);
    setVoiceMilestones(vrMiles);
    setVoiceMinMembers(vrMinMem);
    setIgnoreDeafMute(vrIgDeaf);

    setTextRewardsEnabled(trEn);
    setTextMilestones(trMiles);
    setTextCooldownSeconds(trCd);
    setMinMessageLength(trMinLen);
    setRewardsNotificationType(rNotifType);
    setRewardsChannel(rNotifCh);

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
      arList,
      actEn: rEn,
      vrEn,
      vrMiles,
      vrMinMem,
      vrIgDeaf,
      trEn,
      trMiles,
      trCd,
      trMinLen,
      rNotifType,
      rNotifCh
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
      arList: autoResponders,
      actEn: rewardsEnabled,
      vrEn: voiceRewardsEnabled,
      vrMiles: voiceMilestones,
      vrMinMem: voiceMinMembers,
      vrIgDeaf: ignoreDeafMute,
      trEn: textRewardsEnabled,
      trMiles: textMilestones,
      trCd: textCooldownSeconds,
      trMinLen: minMessageLength,
      rNotifType: rewardsNotificationType,
      rNotifCh: rewardsChannel
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
    autoResponders,
    rewardsEnabled, voiceRewardsEnabled, voiceMilestones, voiceMinMembers, ignoreDeafMute,
    textRewardsEnabled, textMilestones, textCooldownSeconds, minMessageLength,
    rewardsNotificationType, rewardsChannel
  ]);

  const hasUnsavedChanges = useMemo(() => {
    if (!initialSnapshot) return false;
    return initialSnapshot !== currentSnapshot;
  }, [initialSnapshot, currentSnapshot]);

  const fetchGuildData = async () => {
    try {
      setLoading(true);
      setNotInvited(false);
      setFetchError(null);
      const res = await fetch(`/api/bot/guilds/${guildId}`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        if (res.status === 404 || err.notInvited) {
          setNotInvited(true);
          setFetchError(err.error || "VePlexity Bot is not a member of this server.");
          return;
        }
        throw new Error(err.error || "Failed to load guild details");
      }
      const data: GuildDetails = await res.json();
      if (!data.bots?.veplexity) {
        setNotInvited(true);
        setFetchError("VePlexity Bot is not currently a member of this server.");
        setGuild(data);
        return;
      }
      setGuild(data);
      populateFromConfig(data);

      // Smooth reveal expansion animation completes into the loaded dashboard!
      setTimeout(() => {
        setRevealActive(false);
      }, 1200);
    } catch (err: any) {
      console.error("[VePlexityGuildDashboard] Fetch error:", err);
      setFetchError(err.message || "Could not connect to bot backend");
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
        activityRewards: {
          enabled: rewardsEnabled,
          voiceRewardsEnabled,
          voiceMilestones,
          voiceMinMembers,
          ignoreDeafMute,
          textRewardsEnabled,
          textMilestones,
          textCooldownSeconds,
          minMessageLength,
          notificationType: rewardsNotificationType,
          channelId: rewardsChannel || null,
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
            <div className="space-y-2 pt-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-full h-7 rounded-lg bg-zinc-900 animate-pulse" />
              ))}
            </div>
          </aside>
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            <div className="w-full h-28 rounded-2xl bg-zinc-900/80 border border-zinc-800 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-44 rounded-2xl bg-zinc-900/60 border border-zinc-800 animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ─── GATING BARRIER: VEPLEXITY BOT NOT CONNECTED TO GUILD ───────────────────────────
  if (notInvited) {
    return (
      <main className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col font-sans">
        {/* Navigation Header */}
        <header className="border-b border-zinc-800/80 bg-[#0c0d14] sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/discord-bots/veplexity/dashboard"
                className="flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white px-2.5 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition"
              >
                <ArrowLeft className="w-4 h-4 text-zinc-400" />
                <span>Return to Servers</span>
              </Link>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 font-mono uppercase font-bold">
                VEPLEXITY BOT REQUIRED
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
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 mx-auto flex items-center justify-center text-blue-400 shadow-xl shadow-blue-500/10 mb-4">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              VePlexity Bot Not Connected
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
              VePlexity Bot is not currently a member of this Discord server. Invite VePlexity Bot to unlock 24/7 lossless music, AutoMod defense, leveling, and all moderation features.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d0f17] border border-blue-500/30 w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <DiscordLogo className="w-5 h-5" fill="#3b82f6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">VePlexity Bot</h3>
                  <p className="text-[11px] text-zinc-400 font-mono">Client ID: 1556640364448714752</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/30 font-bold">
                ADMINISTRATOR (8)
              </span>
            </div>

            <a
              href={`/invite?guild_id=${guildId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black transition-all flex items-center justify-between cursor-pointer shadow-lg shadow-blue-600/20 active:scale-98"
            >
              <span className="tracking-wider uppercase">INVITE VEPLEXITY BOT</span>
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
              href="/discord-bot/veplexity"
              className="px-4 py-2 rounded-xl text-zinc-500 hover:text-zinc-300 text-xs font-semibold transition"
            >
              Select Another Server
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ─── ERROR FALLBACK: GUILD DATA NOT LOADED ─────────────────────────────────
  if (!guild) {
    return (
      <main className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full p-8 rounded-2xl bg-[#0d0f15] border border-red-500/30 text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
          <h2 className="text-xl font-bold text-white uppercase">Server Sync Issue</h2>
          <p className="text-xs text-zinc-400">{fetchError || "Could not retrieve Discord server configuration."}</p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => fetchGuildData()}
              className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-bold uppercase transition cursor-pointer"
            >
              Retry
            </button>
            <Link
              href="/discord-bot/veplexity"
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition"
            >
              Return to Servers
            </Link>
          </div>
        </div>
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
    rewards: "Voice & Text Activity Rewards",
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

  const overviewModules: OverviewModuleItem[] = [
    // 1. Essentials (3)
    {
      id: "welcome",
      name: "Welcome & Goodbye",
      desc: "Custom welcome cards, join announcements, departure logs, and instant auto-roles.",
      category: "essentials",
      categoryLabel: "Essentials",
      accentColor: "rose",
      icon: Bell,
      bgColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      badges: ["Canvas Graphic Cards", "Instant Auto-Role"],
      active: welcomeEnabled,
      onToggle: (val: boolean) => {
        setWelcomeEnabled(val);
        showToast(`Welcome & Goodbye ${val ? "armed & enabled" : "disabled"}`);
      },
    },
    {
      id: "reactionroles",
      name: "Reaction Roles & Menus",
      desc: "Interactive Discord button and menu role assignment for self-assignable roles.",
      category: "essentials",
      categoryLabel: "Essentials",
      accentColor: "pink",
      icon: Users,
      bgColor: "bg-pink-500/10 text-pink-400 border-pink-500/20",
      badges: ["Interactive Discord Button & Dropdown Picker"],
      active: Boolean(rrItems.length > 0 && rrChannel),
      onToggle: () => {
        setActiveTab("reactionroles");
        showToast("Opening Reaction Roles & Menus Studio");
      },
    },
    {
      id: "announce",
      name: "Message Builder & Embeds",
      desc: "Craft and dispatch rich announcements with mentions, embeds, and buttons.",
      category: "essentials",
      categoryLabel: "Essentials",
      accentColor: "blue",
      icon: Megaphone,
      bgColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      badges: ["Rich Embed Studio"],
      active: Boolean(annChannel),
      onToggle: () => {
        setActiveTab("announce");
        showToast("Opening Message Builder & Embeds Studio");
      },
    },

    // 2. Engagement & XP (6)
    {
      id: "leveling",
      name: "XP Leveling & Rank System",
      desc: "Chat activity XP progression, automated level-up role rewards, and custom rank cards.",
      category: "engagement",
      categoryLabel: "Engagement & XP",
      accentColor: "indigo",
      icon: Award,
      bgColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      badges: ["Rank Studio", "2x Voice XP Multiplier"],
      active: levelingEnabled,
      onToggle: (val: boolean) => {
        setLevelingEnabled(val);
        showToast(`XP Leveling ${val ? "armed & enabled" : "disabled"}`);
      },
    },
    {
      id: "rewards",
      name: "Voice & Text Activity Rewards",
      desc: "Earn server roles automatically by spending time in voice channels and text chatting.",
      category: "engagement",
      categoryLabel: "Engagement & XP",
      accentColor: "cyan",
      icon: Gift,
      bgColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      badges: ["Voice Time Farming", "Activity Role Tiers"],
      active: rewardsEnabled,
      onToggle: (val: boolean) => {
        setRewardsEnabled(val);
        showToast(`Activity Rewards ${val ? "armed & enabled" : "disabled"}`);
      },
    },
    {
      id: "starboard",
      name: "Starboard (Hall of Fame)",
      desc: "Showcase community highlight messages in a dedicated hall of fame channel.",
      category: "engagement",
      categoryLabel: "Engagement & XP",
      accentColor: "amber",
      icon: Star,
      bgColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      badges: ["Community Hall of Fame Pinning"],
      active: Boolean(starboardChannel),
      onToggle: () => {
        setActiveTab("starboard");
        showToast("Opening Starboard Studio");
      },
    },
    {
      id: "community",
      name: "Birthdays & Counting Games",
      desc: "Interactive counting streak game channel and celebratory birthday shoutouts.",
      category: "engagement",
      categoryLabel: "Engagement & XP",
      accentColor: "fuchsia",
      icon: Gamepad2,
      bgColor: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20",
      badges: ["Automated Birthday Shoutouts", "Counting Streaks"],
      active: Boolean(countingChannel || birthdayChannel),
      onToggle: () => {
        setActiveTab("community");
        showToast("Opening Birthdays & Counting Studio");
      },
    },
    {
      id: "boosters",
      name: "Server Boosters Appreciation",
      desc: "Automatic public booster shortcuts and custom thank-you perks for server boosters.",
      category: "engagement",
      categoryLabel: "Engagement & XP",
      accentColor: "violet",
      icon: Zap,
      bgColor: "bg-violet-500/10 text-violet-400 border-violet-500/20",
      badges: ["Automatic Server Booster Appreciation"],
      active: boostersEnabled,
      onToggle: (val: boolean) => {
        setBoostersEnabled(val);
        showToast(`Server Boosters ${val ? "armed & enabled" : "disabled"}`);
      },
    },
    {
      id: "autoresponders",
      name: "Custom Auto-Responders",
      desc: "Automated keyword triggers and instant pre-configured replies in server channels.",
      category: "engagement",
      categoryLabel: "Engagement & XP",
      accentColor: "orange",
      icon: MessageCircle,
      bgColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      badges: ["Regex Match", "Custom Replies"],
      active: autoResponders.length > 0,
      onToggle: () => {
        setActiveTab("autoresponders");
        showToast("Opening Auto-Responders Studio");
      },
    },

    // 3. Security & Mod (3)
    {
      id: "automod",
      name: "Auto-Mod Security",
      desc: "Instant spam shield, invite link blocker, toxic language filter, and anti-caps engine.",
      category: "security",
      categoryLabel: "Security & Mod",
      accentColor: "red",
      icon: Lock,
      bgColor: "bg-red-500/10 text-red-400 border-red-500/20",
      badges: ["0-Day Anti-Raid", "Link & Spam Shield"],
      active: Boolean(antiSpam || antiInvite || antiBadWords || antiLinks),
      onToggle: (val: boolean) => {
        setAntiSpam(val);
        setAntiInvite(val);
        setAntiBadWords(val);
        setAntiLinks(val);
        showToast(`Auto-Mod Security ${val ? "armed & enabled" : "disabled"}`);
      },
    },
    {
      id: "moderation",
      name: "Bot Masters & Roles",
      desc: "Authorize moderator roles to execute administrative and moderation commands.",
      category: "security",
      categoryLabel: "Security & Mod",
      accentColor: "rose",
      icon: Shield,
      bgColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      badges: ["Role Hierarchy", "Audit Enforcement"],
      active: modRoles.length > 0,
      onToggle: () => {
        setActiveTab("moderation");
        showToast("Opening Bot Masters & Roles Studio");
      },
    },
    {
      id: "logging",
      name: "Audit & Logging Channels",
      desc: "Detailed server audit logs for message edits, deletions, joins, and mod actions.",
      category: "security",
      categoryLabel: "Security & Mod",
      accentColor: "slate",
      icon: FileText,
      bgColor: "bg-slate-500/10 text-slate-400 border-slate-500/20",
      badges: ["Event Dispatcher", "Immutable Logs"],
      active: Boolean(modLogChannel || loggingChannels?.messageEdit),
      onToggle: () => {
        setActiveTab("logging");
        showToast("Opening Audit & Logging Studio");
      },
    },

    // 4. Utilities (3)
    {
      id: "music",
      name: "Music & DJ Audio (24/7)",
      desc: "Lossless 24/7 high-fidelity music streaming, equalizers, and DJ controls.",
      category: "utilities",
      categoryLabel: "Utilities",
      accentColor: "blue",
      icon: Music,
      bgColor: "bg-[#5865F2]/10 text-[#5865F2] border-[#5865F2]/20",
      badges: ["24/7 Lossless Stream", "-14 LUFS DSP"],
      active: stay247,
      onToggle: (val: boolean) => {
        setStay247(val);
        showToast(`24/7 Lossless Audio ${val ? "armed & enabled" : "disabled"}`);
      },
    },
    {
      id: "tempvc",
      name: "Temporary Voice Hubs",
      desc: "Dynamic join-to-create temporary voice channels that automatically delete when empty.",
      category: "utilities",
      categoryLabel: "Utilities",
      accentColor: "rose",
      icon: Mic,
      bgColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      badges: ["Dynamic VC Creator", "Auto-Prune Zero Members"],
      active: Boolean(tempVcHub),
      onToggle: () => {
        setActiveTab("tempvc");
        showToast("Opening Temporary Voice Hubs Studio");
      },
    },
    {
      id: "ai",
      name: "Gemini AI Chatbot",
      desc: "Conversational Google Gemini companion channel with custom personality.",
      category: "utilities",
      categoryLabel: "Utilities",
      accentColor: "teal",
      icon: Bot,
      bgColor: "bg-teal-500/10 text-teal-400 border-teal-500/20",
      badges: ["Gemini 1.5 Flash Brain", "Custom Persona"],
      active: aiEnabled,
      onToggle: (val: boolean) => {
        setAiEnabled(val);
        showToast(`Gemini AI Chatbot ${val ? "armed & enabled" : "disabled"}`);
      },
    },
  ];

  const armedCount = useMemo(() => {
    return overviewModules.filter((m) => m.active).length;
  }, [
    welcomeEnabled, rrItems.length, rrChannel, annChannel,
    levelingEnabled, rewardsEnabled, starboardChannel,
    countingChannel, birthdayChannel, boostersEnabled,
    autoResponders.length, antiSpam, antiInvite, antiBadWords, antiLinks,
    modRoles.length, modLogChannel, loggingChannels, stay247, tempVcHub, aiEnabled
  ]);

  return (
    <div 
      className="h-screen w-full flex flex-col font-sans overflow-hidden relative"
      style={{
        backgroundColor: THEMES[theme].bgMain,
        color: "#F4F4F5",
        ["--bg-main" as any]: THEMES[theme].bgMain,
        ["--card-bg" as any]: THEMES[theme].cardBg,
        ["--primary" as any]: THEMES[theme].primary,
        ["--accent" as any]: THEMES[theme].accent,
        ["--border-divider" as any]: THEMES[theme].border,
      }}
    >
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
              ? "bg-[#180a22] border-purple-500/40 text-purple-300"
              : "bg-[#240e13] border-rose-500/40 text-rose-300"
          }`}
        >
          {toast.type === "success" ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-rose-400" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* ─── 2.1 TOP APP HEADER ──────────────────────────────────────────────── */}
      <header 
        className="h-16 shrink-0 border-b px-4 sm:px-6 flex items-center justify-between z-30 backdrop-blur-xl"
        style={{
          backgroundColor: THEMES[theme].cardBg,
          borderColor: THEMES[theme].border,
        }}
      >
        {/* Left: Server Selector Hub */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <Link
            href="/discord-bots/veplexity/dashboard"
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition shrink-0"
            title="Return to Server Selection"
          >
            <ArrowLeft className="w-4 h-4 text-zinc-400" />
            <span className="hidden sm:inline">Servers</span>
          </Link>

          <div className="h-5 w-px bg-white/10 hidden sm:block shrink-0" />

          <div className="flex items-center gap-3 min-w-0">
            <div 
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border overflow-hidden flex items-center justify-center font-bold text-xs sm:text-sm text-zinc-300 shrink-0 shadow-md"
              style={{
                backgroundColor: "rgba(12, 14, 20, 0.8)",
                borderColor: THEMES[theme].primary,
              }}
            >
              {guildIconUrl ? (
                <img
                  src={guildIconUrl}
                  alt={guild?.name || "Server"}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.currentTarget.style.display = "none"); }}
                />
              ) : (
                <span className="font-mono text-sm">{guildInitials}</span>
              )}
            </div>

            <div className="min-w-0 space-y-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-sm sm:text-base text-white truncate max-w-[140px] sm:max-w-xs">{guild?.name}</span>
                
                {/* Fleet Engine Online Status */}
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold hidden md:inline-flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2ECC71] animate-pulse" />
                  <span>Fleet Engine Online</span>
                </span>

                {/* VIP Perks Active Badge */}
                <span 
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full border font-bold hidden lg:inline-flex items-center gap-1"
                  style={{
                    backgroundColor: "rgba(255, 221, 0, 0.12)",
                    borderColor: "rgba(255, 221, 0, 0.4)",
                    color: "#FFDD00",
                  }}
                >
                  ⚡ VIP Perks Active
                </span>
              </div>

              {/* Sub-row telemetry: ID, Members, Armed count */}
              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 flex-wrap">
                <button
                  onClick={handleCopyGuildId}
                  title="Copy Server ID"
                  className="hover:text-white transition flex items-center gap-1 cursor-pointer"
                >
                  <span>ID: {guild?.id?.substring(0, 8)}...</span>
                  {copiedId ? <Check className="w-2.5 h-2.5 text-emerald-400" /> : <Copy className="w-2.5 h-2.5 text-zinc-500" />}
                </button>
                <span className="text-zinc-600">•</span>
                <span className="hidden sm:inline">{guild?.memberCount?.toLocaleString() || 0} Members</span>
                <span className="text-zinc-600 hidden sm:inline">•</span>
                <span className="text-purple-300 font-bold">{armedCount} of 15 Armed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Header Action Trailing Cluster */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Dynamic Theme Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="px-2.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer bg-white/5 border-white/10 hover:border-white/20 text-zinc-200"
              title="Switch Dashboard Theme"
            >
              <span 
                className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs" 
                style={{ backgroundColor: THEMES[theme].primary }} 
              />
              <span className="hidden xl:inline text-[11px] font-mono">{THEMES[theme].name}</span>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>

            {themeDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-52 rounded-xl border shadow-2xl p-1.5 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100"
                style={{
                  backgroundColor: "rgba(15, 18, 28, 0.96)",
                  borderColor: "rgba(255, 255, 255, 0.12)",
                }}
              >
                <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold border-b border-white/5 mb-1">
                  Select Theme
                </div>
                {(Object.keys(THEMES) as DashboardTheme[]).map((tKey) => {
                  const tCfg = THEMES[tKey];
                  const isSelected = theme === tKey;
                  return (
                    <button
                      key={tKey}
                      onClick={() => handleSelectTheme(tKey)}
                      className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition cursor-pointer ${
                        isSelected 
                          ? "bg-white/10 text-white font-bold" 
                          : "text-zinc-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-3 h-3 rounded-full border border-white/20 shrink-0" 
                          style={{ backgroundColor: tCfg.primary }} 
                        />
                        <span>{tCfg.name}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* SFX Audio State Indicator */}
          <button
            onClick={() => {
              const next = dashboardAudio.toggleSound();
              setSoundOn(next);
            }}
            className={`px-2.5 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition cursor-pointer font-mono ${
              soundOn
                ? "bg-white/10 border-white/15 text-zinc-200"
                : "bg-white/5 border-white/5 text-zinc-500 hover:text-zinc-300"
            }`}
            title="Toggle Dashboard Sound Effects"
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-zinc-500" />}
            <span className="hidden md:inline text-[11px] font-semibold">
              {soundOn ? "SFX ACTIVE" : "SFX MUTED"}
            </span>
          </button>

          {/* Discord Support Server Link */}
          <a
            href="https://www.discord.gg/R6ZrqpWEcc"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 rounded-lg bg-[#5865F2]/15 border border-[#5865F2]/30 hover:bg-[#5865F2]/25 text-white transition text-xs flex items-center gap-1.5 font-semibold"
            title="Join Official VePlexity Discord Support"
          >
            <DiscordLogo className="w-3.5 h-3.5 text-[#5865F2]" />
            <span className="hidden sm:inline">Discord</span>
          </a>

          {/* Buy Me a Coffee Action Button (#FFDD00 Electric Gold Background) */}
          <a
            href="https://www.buymeacoffee.com/veplexity1"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg font-black text-xs transition-all flex items-center gap-1.5 shadow-md active:scale-95 text-black hover:opacity-95"
            style={{
              backgroundColor: "#FFDD00",
            }}
            title="Support Creator on Buy Me a Coffee"
          >
            <Coffee className="w-3.5 h-3.5 text-black" />
            <span className="hidden sm:inline tracking-tight font-black">Buy me a coffee</span>
          </a>

          {/* Persistent Save Changes Button */}
          <button
            onClick={handleSave}
            disabled={saving || !hasUnsavedChanges}
            className={`py-1.5 px-3 sm:px-4 rounded-lg font-bold text-xs transition flex items-center gap-1.5 ${
              hasUnsavedChanges
                ? "text-white cursor-pointer shadow-lg active:scale-95 animate-pulse"
                : "bg-white/5 text-zinc-500 border border-white/5 cursor-not-allowed opacity-50"
            }`}
            style={
              hasUnsavedChanges
                ? {
                    background: "linear-gradient(135deg, var(--primary, #BD5FFF) 0%, #F97316 100%)",
                    boxShadow: "0 0 20px rgba(189, 95, 255, 0.4)",
                  }
                : undefined
            }
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </header>

      {/* Main Full-Width Application Body */}
      <div className="flex-1 flex overflow-hidden w-full relative">
        {/* ─── 2.2 LEFT NAVIGATION SIDEBAR (19 EXACT DIRECTORY ITEMS) ─── */}
        <aside 
          className="w-60 lg:w-64 shrink-0 border-r flex flex-col justify-between overflow-y-auto p-3 z-20 backdrop-blur-xl"
          style={{
            backgroundColor: THEMES[theme].cardBg,
            borderColor: THEMES[theme].border,
          }}
        >
          <div className="space-y-3.5">
            {/* 1. Server Overview */}
            <div>
              <button
                onClick={() => {
                  dashboardAudio.playClick();
                  setActiveTab("overview");
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-all cursor-pointer select-none border ${
                  activeTab === "overview"
                    ? "text-white font-bold shadow-md"
                    : "text-zinc-400 hover:text-white hover:bg-white/5 border-transparent"
                }`}
                style={
                  activeTab === "overview"
                    ? {
                        backgroundColor: "rgba(189, 95, 255, 0.18)",
                        borderColor: THEMES[theme].primary,
                      }
                    : undefined
                }
              >
                <div className="flex items-center gap-2.5">
                  {activeTab === "overview" && (
                    <span 
                      className="w-1 h-4 rounded-full shrink-0" 
                      style={{ backgroundColor: THEMES[theme].primary }} 
                    />
                  )}
                  <Layers className="w-4 h-4 shrink-0" style={{ color: activeTab === "overview" ? THEMES[theme].primary : undefined }} />
                  <span className="text-xs font-bold">Server Overview</span>
                </div>
              </button>
            </div>

            <div className="space-y-1">
              <p className="text-[11px] uppercase font-mono tracking-wider text-zinc-500 px-3 py-1 font-semibold">
                Modules &amp; Settings
              </p>
              <nav className="space-y-0.5">
                {[
                  { id: "moderation", label: "Bot Masters & Roles", icon: Shield },
                  { id: "automod", label: "Auto-Mod Security", icon: Lock },
                  { id: "logging", label: "Audit & Logging Channels", icon: FileText },
                  { id: "welcome", label: "Welcome & Goodbye", icon: Bell },
                  { id: "leveling", label: "Leveling & XP System", icon: Award, tag: "Free VIP" },
                  { id: "rewards", label: "Voice & Text Rewards", icon: Gift, tag: "New" },
                  { id: "music", label: "Music & DJ Audio", icon: Music, tag: "24/7 Stay" },
                  { id: "tempvc", label: "Temporary Voice Hubs", icon: Mic },
                  { id: "reactionroles", label: "Reaction Roles", icon: Users, tag: "Free VIP" },
                  { id: "autoresponders", label: "Auto-Responders", icon: MessageCircle, tag: "Free VIP" },
                  { id: "starboard", label: "Starboard (Hall of Fame)", icon: Star },
                  { id: "suggestions", label: "Suggestions Box", icon: ThumbsUp },
                  { id: "community", label: "Birthdays & Counting", icon: Gamepad2 },
                  { id: "announce", label: "Message Builder", icon: Megaphone },
                  { id: "boosters", label: "Server Boosters", icon: Zap, tag: "Free VIP" },
                  { id: "ai", label: "Gemini AI Chatbot", icon: Bot },
                  { id: "perks", label: "VIP Perks & Support", icon: Coffee },
                ].map((item) => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        dashboardAudio.playClick();
                        setActiveTab(item.id as TabType);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-all cursor-pointer select-none group relative border ${
                        active
                          ? "text-white font-bold shadow-xs"
                          : "text-zinc-400 hover:text-white hover:bg-white/5 border-transparent"
                      }`}
                      style={
                        active
                          ? {
                              backgroundColor: "rgba(189, 95, 255, 0.15)",
                              borderColor: THEMES[theme].primary,
                            }
                          : undefined
                      }
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {active && (
                          <span 
                            className="w-1 h-4 rounded-full shrink-0" 
                            style={{ backgroundColor: THEMES[theme].primary }} 
                          />
                        )}
                        <Icon 
                          className="w-4 h-4 shrink-0 transition-colors" 
                          style={{ color: active ? THEMES[theme].primary : undefined }} 
                        />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.tag && (
                        <span 
                          className="text-[9px] font-mono px-1.5 py-0.2 rounded border shrink-0 font-medium"
                          style={
                            item.tag === "Free VIP"
                              ? {
                                  backgroundColor: "rgba(255, 221, 0, 0.12)",
                                  borderColor: "rgba(255, 221, 0, 0.3)",
                                  color: "#FFDD00",
                                }
                              : item.tag === "New"
                              ? {
                                  backgroundColor: "rgba(46, 204, 113, 0.12)",
                                  borderColor: "rgba(46, 204, 113, 0.3)",
                                  color: "#2ECC71",
                                }
                              : {
                                  backgroundColor: "rgba(29, 185, 84, 0.12)",
                                  borderColor: "rgba(29, 185, 84, 0.3)",
                                  color: "#1DB954",
                                }
                          }
                        >
                          {item.tag}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* 19. Support Creator (Sidebar Footer Anchor) */}
          <div className="pt-2.5 mt-2.5 border-t border-white/10">
            <a
              href="https://www.buymeacoffee.com/veplexity1"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl transition flex items-center justify-between gap-2 group shadow-sm border border-white/10 hover:border-yellow-500/40"
              style={{
                backgroundColor: "rgba(255, 221, 0, 0.08)",
              }}
              title="Support Creator on Buy Me a Coffee"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Coffee className="w-4 h-4 text-[#FFDD00] shrink-0" />
                <span className="text-[11px] font-bold truncate text-[#FFDD00]">Support Creator</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </aside>

        {/* ─── SCROLLABLE MAIN CONTENT WORKSPACE ───────────────────────── */}
        <main 
          className="flex-1 h-full overflow-y-auto p-4 sm:p-5 lg:p-6 space-y-5"
          style={{ backgroundColor: THEMES[theme].bgMain }}
        >
          {/* Subpage Breadcrumb Header when not on overview */}
          {activeTab !== "overview" && (
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 w-full">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab("overview")}
                  className="text-xs font-medium text-zinc-400 hover:text-white flex items-center gap-1 transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Overview</span>
                </button>
                <span className="text-zinc-600">/</span>
                <span className="text-xs font-bold text-white">{MODULE_TITLES[activeTab]}</span>
              </div>

              <button
                onClick={() => setActiveTab("overview")}
                className="text-xs px-3 py-1.5 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 hover:border-zinc-700 transition font-medium"
              >
                ← Back to Overview
              </button>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              1. OVERVIEW: MODULAR GRID
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "overview" && (
            <ServerOverviewTab
              guild={guild}
              guildIconUrl={guildIconUrl}
              guildInitials={guildInitials}
              setActiveTab={setActiveTab}
              modules={overviewModules}
            />
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              SOCIAL MEDIA ALERTS & STREAMS (PINGCORD SYSTEM)
          ═══════════════════════════════════════════════════════════════════ */}




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

                  {/* Dual-Engine Prefix Runner Notice */}
                  <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-orange-300">
                      <Terminal className="w-4 h-4 text-orange-400" />
                      <span>Instant Fast-Mod Commands Active</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono">
                        Prefixes: . / ? / !
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      Moderators can execute rapid commands in chat without waiting for Discord slash menus. Purge notices auto-delete after 5 seconds to keep channels clean:
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
                      <span className="px-2.5 py-1 bg-black/50 rounded-lg border border-white/5 text-gray-300">
                        <code className="text-orange-400">.purge [n]</code> / <code className="text-orange-400">?purge [n]</code>
                      </span>
                      <span className="px-2.5 py-1 bg-black/50 rounded-lg border border-white/5 text-gray-300">
                        <code className="text-orange-400">.warn @user [reason]</code>
                      </span>
                      <span className="px-2.5 py-1 bg-black/50 rounded-lg border border-white/5 text-gray-300">
                        <code className="text-orange-400">.timeout @user [mins]</code>
                      </span>
                      <span className="px-2.5 py-1 bg-black/50 rounded-lg border border-white/5 text-gray-300">
                        <code className="text-orange-400">.afk [reason]</code>
                      </span>
                      <span className="px-2.5 py-1 bg-black/50 rounded-lg border border-white/5 text-gray-300">
                        <code className="text-orange-400">.mute</code> / <code className="text-orange-400">.unmute</code>
                      </span>
                    </div>
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
                              <p className="text-red-300 line-through">Before: hey guys check out my other server</p>
                              <p className="text-rose-300">After: hey guys check out the new bot update!</p>
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
              4. LEVELING & XP SYSTEM (INTERACTIVE RANK CARD STUDIO)
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "leveling" && (
            <RankCardStudio
              levelingEnabled={levelingEnabled}
              setLevelingEnabled={setLevelingEnabled}
              levelingChannel={levelingChannel}
              setLevelingChannel={setLevelingChannel}
              levelingMessage={levelingMessage}
              setLevelingMessage={setLevelingMessage}
              xpRate={xpRate}
              setXpRate={setXpRate}
              channels={guild?.channels?.text || []}
            />
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              4B. VOICE & TEXT ACTIVITY REWARDS (CUSTOMIZABLE VC & TEXT TIERS)
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "rewards" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
              <div className="lg:col-span-7 space-y-6">
                
                {/* Master Rewards Toggle Card */}
                <div className="p-6 sm:p-7 rounded-2xl bg-[#15161c] border border-white/5 space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                          <Gift className="w-5 h-5 text-fuchsia-400" />
                          <span>Voice & Text Activity Rewards</span>
                        </h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 font-bold border border-fuchsia-500/30">
                          100% Customizable
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Automatically award custom server roles and recognition to members who spend time in voice channels or actively chat in text channels.
                      </p>
                    </div>

                    <TactileToggle
                      checked={rewardsEnabled}
                      onChange={setRewardsEnabled}
                      color="fuchsia"
                      activeLabel="ARMED"
                    />
                  </div>
                </div>

                {rewardsEnabled && (
                  <>
                    {/* SECTION 1: VOICE CHANNEL TIME REWARDS */}
                    <div className="p-6 sm:p-7 rounded-2xl bg-[#15161c] border border-white/5 space-y-6">
                      <div className="flex items-center justify-between pb-4 border-b border-white/5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                            <Mic className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                              <span>Voice Channel Time Rewards</span>
                              <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-purple-500/20 text-purple-300">
                                VC Milestones
                              </span>
                            </h4>
                            <p className="text-xs text-gray-400 mt-0.5">
                              Reward members with roles based on cumulative minutes or hours spent in voice channels.
                            </p>
                          </div>
                        </div>

                        <TactileToggle
                          checked={voiceRewardsEnabled}
                          onChange={setVoiceRewardsEnabled}
                          color="fuchsia"
                          activeLabel="ON"
                        />
                      </div>

                      {voiceRewardsEnabled && (
                        <div className="space-y-4">
                          {/* Voice Milestones List */}
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider">
                                Configured Voice Time Milestones ({voiceMilestones.length})
                              </label>
                              <button
                                type="button"
                                onClick={addVoiceMilestone}
                                className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-purple-900/30"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add Time Milestone</span>
                              </button>
                            </div>

                            {voiceMilestones.length === 0 ? (
                              <div className="p-6 rounded-xl bg-[#1c1d24] border border-dashed border-white/10 text-center text-xs text-gray-400">
                                No voice milestones configured yet. Click above to add your first time reward!
                              </div>
                            ) : (
                              <div className="space-y-3">
                                {voiceMilestones.map((m, idx) => {
                                  const hours = m.minutes >= 60 ? (m.minutes / 60).toFixed(1).replace(/\.0$/, "") : null;
                                  return (
                                    <div
                                      key={m.id}
                                      className="p-4 rounded-xl bg-[#1c1d24] border border-white/5 space-y-3 hover:border-purple-500/30 transition group"
                                    >
                                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                          <span className="w-6 h-6 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center font-mono text-[11px] font-bold text-purple-400">
                                            #{idx + 1}
                                          </span>
                                          <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-400">Time Threshold:</span>
                                            <input
                                              type="number"
                                              min={1}
                                              value={m.minutes}
                                              onChange={(e) => updateVoiceMilestone(m.id, { minutes: Math.max(1, Number(e.target.value) || 1) })}
                                              className="w-20 bg-black/50 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white font-mono outline-none focus:border-purple-500/50"
                                            />
                                            <span className="text-xs font-mono text-purple-300 font-semibold">
                                              Minutes {hours && `(${hours}h)`}
                                            </span>
                                          </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                          <span className="text-xs text-gray-400">Award Role:</span>
                                          <select
                                            value={m.roleId}
                                            onChange={(e) => updateVoiceMilestone(m.id, { roleId: e.target.value })}
                                            className="bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-purple-500/50 max-w-[180px]"
                                          >
                                            <option value="">Choose Server Role...</option>
                                            {guild?.roles?.filter(r => !r.managed).map((role) => (
                                              <option key={role.id} value={role.id}>
                                                @{role.name}
                                              </option>
                                            ))}
                                          </select>

                                          <button
                                            type="button"
                                            onClick={() => removeVoiceMilestone(m.id)}
                                            className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition"
                                            title="Delete Milestone"
                                          >
                                            <Trash2 className="w-4 h-4" />
                                          </button>
                                        </div>
                                      </div>

                                      {/* Custom Notification Message */}
                                      <div>
                                        <input
                                          type="text"
                                          value={m.message || ""}
                                          onChange={(e) => updateVoiceMilestone(m.id, { message: e.target.value })}
                                          placeholder="🎉 {user} spent {time} in voice channels and unlocked {role}!"
                                          className="w-full bg-black/40 border border-white/5 rounded-lg px-3 py-1.5 text-xs text-gray-200 outline-none focus:border-purple-500/50"
                                        />
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>

                          {/* Anti-AFK & Quality Filters */}
                          <div className="pt-4 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                                Minimum Voice Members
                              </label>
                              <select
                                value={voiceMinMembers}
                                onChange={(e) => setVoiceMinMembers(Number(e.target.value))}
                                className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2 text-xs text-white outline-none focus:border-purple-500/50"
                              >
                                <option value={1}>1+ Member (Solo voice time counts)</option>
                                <option value={2}>2+ Members (Must talk with someone - Anti AFK)</option>
                                <option value={3}>3+ Members (Group sessions only)</option>
                              </select>
                              <p className="text-[11px] text-gray-500 mt-1">
                                Requiring 2+ members stops users from farming time alone in empty channels.
                              </p>
                            </div>

                            <div>
                              <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                                Muted / Deafened Filter
                              </label>
                              <label className="flex items-center gap-2.5 p-2 rounded-xl bg-[#1c1d24] border border-white/10 cursor-pointer hover:border-white/20 transition">
                                <input
                                  type="checkbox"
                                  checked={ignoreDeafMute}
                                  onChange={(e) => setIgnoreDeafMute(e.target.checked)}
                                  className="w-4 h-4 accent-purple-500 cursor-pointer"
                                />
                                <span className="text-xs text-gray-300">
                                  Pause tracking if user is Self-Deafened or Server-Muted
                                </span>
                              </label>
                              <p className="text-[11px] text-gray-500 mt-1">
                                Prevents overnight AFK sleep-farming while deafened.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* SECTION 2: TEXT MESSAGE ACTIVITY REWARDS */}
                    <div className="p-6 sm:p-7 rounded-2xl bg-[#15161c] border border-white/5 space-y-6">
                      <div className="flex items-center justify-between pb-4 border-b border-white/5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400">
                            <MessageCircle className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                              <span>Text Message Activity Rewards</span>
                              <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-fuchsia-500/20 text-fuchsia-300">
                                Chat Milestones
                              </span>
                            </h4>
                            <p className="text-xs text-gray-400 mt-0.5">
                              Reward active chatters with server roles as they reach total messages-sent milestones.
                            </p>
                          </div>
                        </div>

                        <TactileToggle
                          checked={textRewardsEnabled}
                          onChange={setTextRewardsEnabled}
                          color="fuchsia"
                          activeLabel="ON"
                        />
                      </div>

                      {textRewardsEnabled && (
                        <div className="space-y-4">
                          {/* Text Milestones List */}
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider">
                                Configured Message Milestones ({textMilestones.length})
                              </label>
                              <button
                                type="button"
                                onClick={addTextMilestone}
                                className="px-3 py-1.5 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-fuchsia-900/30"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add Message Milestone</span>
                              </button>
                            </div>

                            {textMilestones.length === 0 ? (
                              <div className="p-6 rounded-xl bg-[#1c1d24] border border-dashed border-white/10 text-center text-xs text-gray-400">
                                No message milestones configured yet. Click above to add your first chat reward!
                              </div>
                            ) : (
                              <div className="space-y-3">
                                {textMilestones.map((m, idx) => (
                                  <div
                                    key={m.id}
                                    className="p-4 rounded-xl bg-[#1c1d24] border border-white/5 space-y-3 hover:border-fuchsia-500/30 transition group"
                                  >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                      <div className="flex items-center gap-3">
                                        <span className="w-6 h-6 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center font-mono text-[11px] font-bold text-fuchsia-400">
                                          #{idx + 1}
                                        </span>
                                        <div className="flex items-center gap-2">
                                          <span className="text-xs text-gray-400">Messages Required:</span>
                                          <input
                                            type="number"
                                            min={1}
                                            value={m.messagesCount}
                                            onChange={(e) => updateTextMilestone(m.id, { messagesCount: Math.max(1, Number(e.target.value) || 1) })}
                                            className="w-24 bg-black/50 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white font-mono outline-none focus:border-fuchsia-500/50"
                                          />
                                          <span className="text-xs font-mono text-fuchsia-300 font-semibold">
                                            Msgs
                                          </span>
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-400">Award Role:</span>
                                        <select
                                          value={m.roleId}
                                          onChange={(e) => updateTextMilestone(m.id, { roleId: e.target.value })}
                                          className="bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-fuchsia-500/50 max-w-[180px]"
                                        >
                                          <option value="">Choose Server Role...</option>
                                          {guild?.roles?.filter(r => !r.managed).map((role) => (
                                            <option key={role.id} value={role.id}>
                                              @{role.name}
                                            </option>
                                          ))}
                                        </select>

                                        <button
                                          type="button"
                                          onClick={() => removeTextMilestone(m.id)}
                                          className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition"
                                          title="Delete Milestone"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </div>

                                    {/* Custom Notification Message */}
                                    <div>
                                      <input
                                        type="text"
                                        value={m.message || ""}
                                        onChange={(e) => updateTextMilestone(m.id, { message: e.target.value })}
                                        placeholder="💬 {user} reached {count} messages and unlocked {role}!"
                                        className="w-full bg-black/40 border border-white/5 rounded-lg px-3 py-1.5 text-xs text-gray-200 outline-none focus:border-fuchsia-500/50"
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Anti-Spam & Chat Quality Filters */}
                          <div className="pt-4 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                                Message Anti-Spam Cooldown
                              </label>
                              <select
                                value={textCooldownSeconds}
                                onChange={(e) => setTextCooldownSeconds(Number(e.target.value))}
                                className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2 text-xs text-white outline-none focus:border-fuchsia-500/50"
                              >
                                <option value={5}>5 Seconds (Fast Chat)</option>
                                <option value={10}>10 Seconds (Standard - Recommended)</option>
                                <option value={30}>30 Seconds (Strict Quality)</option>
                                <option value={60}>60 Seconds (Slow Chat Only)</option>
                              </select>
                              <p className="text-[11px] text-gray-500 mt-1">
                                Prevents rapid copypasta spamming from counting multiple times.
                              </p>
                            </div>

                            <div>
                              <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                                Minimum Message Length
                              </label>
                              <select
                                value={minMessageLength}
                                onChange={(e) => setMinMessageLength(Number(e.target.value))}
                                className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2 text-xs text-white outline-none focus:border-fuchsia-500/50"
                              >
                                <option value={1}>1 Character (All messages count)</option>
                                <option value={3}>3 Characters (Recommended - Ignores 'k', 'hi')</option>
                                <option value={10}>10 Characters (Meaningful sentences only)</option>
                              </select>
                              <p className="text-[11px] text-gray-500 mt-1">
                                Filters out low-effort single character spammers.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* SECTION 3: NOTIFICATION & DELIVERY MODE */}
                    <div className="p-6 sm:p-7 rounded-2xl bg-[#15161c] border border-white/5 space-y-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                          <Bell className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">
                            Achievement Notification & Delivery
                          </h4>
                          <p className="text-xs text-gray-400 mt-0.5">
                            Control where and how members are celebrated when they earn reward roles.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button
                          type="button"
                          onClick={() => setRewardsNotificationType("channel")}
                          className={`p-3.5 rounded-xl border text-left transition ${
                            rewardsNotificationType === "channel"
                              ? "bg-orange-500/20 border-orange-500/50 text-white"
                              : "bg-[#1c1d24] border-white/5 text-gray-400 hover:text-white"
                          }`}
                        >
                          <span className="font-bold text-xs block mb-1">📢 Channel Broadcast</span>
                          <span className="text-[11px] text-gray-400">Post congratulations embed in a designated server channel.</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setRewardsNotificationType("dm")}
                          className={`p-3.5 rounded-xl border text-left transition ${
                            rewardsNotificationType === "dm"
                              ? "bg-orange-500/20 border-orange-500/50 text-white"
                              : "bg-[#1c1d24] border-white/5 text-gray-400 hover:text-white"
                          }`}
                        >
                          <span className="font-bold text-xs block mb-1">📩 Direct Message (DM)</span>
                          <span className="text-[11px] text-gray-400">Privately message the member with their unlocked role info.</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setRewardsNotificationType("silent")}
                          className={`p-3.5 rounded-xl border text-left transition ${
                            rewardsNotificationType === "silent"
                              ? "bg-orange-500/20 border-orange-500/50 text-white"
                              : "bg-[#1c1d24] border-white/5 text-gray-400 hover:text-white"
                          }`}
                        >
                          <span className="font-bold text-xs block mb-1">🤫 Silent Assignment</span>
                          <span className="text-[11px] text-gray-400">Award role quietly with zero chat pings or spam notifications.</span>
                        </button>
                      </div>

                      {rewardsNotificationType === "channel" && (
                        <div className="pt-3">
                          <label className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5 block">
                            Announcement Channel
                          </label>
                          <select
                            value={rewardsChannel}
                            onChange={(e) => setRewardsChannel(e.target.value)}
                            className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-orange-500/50"
                          >
                            <option value="">Default General / Chat Channel</option>
                            {guild?.channels?.text?.map((c) => (
                              <option key={c.id} value={c.id}>
                                #{c.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Right Output Visualizer: Discord Milestone Achievement Card */}
              <div className="lg:col-span-5 space-y-3 sticky top-20">
                <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                  <span className="font-semibold uppercase text-[10px] tracking-wider">Discord Output Visualizer</span>
                  <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-lg border border-white/5">
                    <button
                      type="button"
                      onClick={() => setRewardsPreviewMode("voice")}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition ${
                        rewardsPreviewMode === "voice"
                          ? "bg-[#5865F2] text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      VC Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setRewardsPreviewMode("text")}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition ${
                        rewardsPreviewMode === "text"
                          ? "bg-[#5865F2] text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      Chat Card
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#313338] border border-black/30 p-5 font-sans text-xs shadow-2xl space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-white text-xs shrink-0 overflow-hidden shadow-sm">
                      <img src="/vp-logo-icon.png" alt="VP" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">VePlexity Rewards</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#5865F2] text-white text-[9px] font-extrabold">BOT</span>
                        <span className="text-[10px] text-gray-400">Today at 5:12 PM</span>
                      </div>

                      {rewardsPreviewMode === "voice" ? (
                        <div className="rounded-xl bg-[#2b2d31] border-l-4 border-[#5865F2] p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white text-sm flex items-center gap-1.5">
                              <span>🎙️ VOICE MILESTONE UNLOCKED!</span>
                            </span>
                            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#5865F2]/20 text-[#5865F2] font-bold">
                              5 HOURS
                            </span>
                          </div>

                          <p className="text-xs text-gray-200">
                            {voiceMilestones[1]?.message
                              ?.replace(/{user}/g, "@Alex")
                              ?.replace(/{role}/g, "@VC Night Owl")
                              ?.replace(/{time}/g, "5 Hours") ||
                              "🔥 @Alex spent 5 Hours in Voice Channels and unlocked the @VC Night Owl role!"}
                          </p>

                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono">
                              <span>Total Voice Time: 300 Mins</span>
                              <span>Next Tier: 20 Hours</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-black/50 overflow-hidden border border-white/5">
                              <div className="h-full bg-[#5865F2] rounded-full w-3/4" />
                            </div>
                          </div>

                          <div className="pt-2 border-t border-white/5 flex items-center gap-2 text-[11px] text-gray-300">
                            <span>Role Assigned:</span>
                            <span className="px-2 py-0.5 rounded-full bg-[#5865F2]/20 text-[#5865F2] font-semibold border border-[#5865F2]/30 flex items-center gap-1">
                              <span>🎙️ VC Night Owl</span>
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-xl bg-[#2b2d31] border-l-4 border-orange-500 p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white text-sm flex items-center gap-1.5">
                              <span>💬 CHAT MILESTONE UNLOCKED!</span>
                            </span>
                            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 font-bold">
                              500 MSGS
                            </span>
                          </div>

                          <p className="text-xs text-gray-200">
                            {textMilestones[1]?.message
                              ?.replace(/{user}/g, "@Sarah")
                              ?.replace(/{role}/g, "@Chat Legend")
                              ?.replace(/{count}/g, "500") ||
                              "⚡ @Sarah reached 500 chat messages and unlocked the @Chat Legend role!"}
                          </p>

                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono">
                              <span>Total Messages: 500</span>
                              <span>Next Tier: 2,000 Msgs</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-black/50 overflow-hidden border border-white/5">
                              <div className="h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full w-1/2" />
                            </div>
                          </div>

                          <div className="pt-2 border-t border-white/5 flex items-center gap-2 text-[11px] text-gray-300">
                            <span>Role Assigned:</span>
                            <span className="px-2 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 font-semibold border border-fuchsia-500/30 flex items-center gap-1">
                              <span>💬 Chat Legend</span>
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 px-1">
                  Illustrates the achievement card dispatched to members when milestone thresholds are reached.
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
                        <Bell className="w-5 h-5 text-rose-400" />
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
                      className="w-5 h-5 accent-rose-500 cursor-pointer"
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
                            className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-rose-500/50"
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
                            className="w-full bg-[#1c1d24] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-rose-500/50"
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
                          className="w-4 h-4 accent-rose-500 cursor-pointer"
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
                          className="w-full bg-[#1c1d24] border border-white/10 rounded-xl p-3.5 text-xs text-white outline-none focus:border-rose-500/50"
                          placeholder="Welcome to {server}, {user}! We're thrilled to have you here 🎉"
                        />
                        <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-400">
                          <span>Click to insert:</span>
                          <button
                            type="button"
                            onClick={() => setWelcomeMessage((m) => m + " {user}")}
                            className="px-2 py-0.5 rounded bg-white/5 hover:bg-rose-500/20 text-rose-400 text-[11px] font-mono transition"
                          >
                            + &#123;user&#125;
                          </button>
                          <button
                            type="button"
                            onClick={() => setWelcomeMessage((m) => m + " {server}")}
                            className="px-2 py-0.5 rounded bg-white/5 hover:bg-rose-500/20 text-rose-400 text-[11px] font-mono transition"
                          >
                            + &#123;server&#125;
                          </button>
                          <button
                            type="button"
                            onClick={() => setWelcomeMessage((m) => m + " {memberCount}")}
                            className="px-2 py-0.5 rounded bg-white/5 hover:bg-rose-500/20 text-rose-400 text-[11px] font-mono transition"
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
                      className={`px-2 py-0.5 rounded ${welcomePreviewMode === "welcome" ? "bg-rose-500/20 text-rose-300 font-bold" : "text-gray-400"}`}
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
              7. AUTO-MOD DEFENSE (EXPANDED FILTERS & INTERACTIVE SANDBOX)
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "automod" && (
            <AutoModDefenseSimulator
              antiInvite={antiInvite}
              setAntiInvite={setAntiInvite}
              antiSpam={antiSpam}
              setAntiSpam={setAntiSpam}
              antiBadWords={antiBadWords}
              setAntiBadWords={setAntiBadWords}
              antiLinks={antiLinks}
              setAntiLinks={setAntiLinks}
              antiCaps={antiCaps}
              setAntiCaps={setAntiCaps}
            />
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              8. MUSIC & 24/7 VOICE STAY (INTERACTIVE DJ DECK & EQUALIZER)
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === "music" && (
            <MusicDjStudio
              djRole={djRole}
              setDjRole={setDjRole}
              defaultVolume={defaultVolume}
              setDefaultVolume={setDefaultVolume}
              stay247={stay247}
              setStay247={setStay247}
              roles={guild?.roles || []}
            />
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
                            matchType: "exact" as const,
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

                {/* Direct UPI Payment Section */}
                <div className="pt-2">
                  <UpiPaymentCard />
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
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <p className="text-xs font-medium text-zinc-200">
                You have unsaved configuration changes!
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
                className="py-1 px-3.5 rounded-md bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-600 hover:from-orange-400 hover:to-rose-500 text-white font-bold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-rose-500/20 active:scale-98"
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

export default function GuildDashboard({ params }: { params: Promise<{ guildId: string }> }) {
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
      <GuildDashboardInner params={params} />
    </Suspense>
  );
}
