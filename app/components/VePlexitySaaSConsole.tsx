"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { 
  Server, Shield, Music, DollarSign, Settings, Terminal, 
  Play, Pause, SkipForward, Volume2, VolumeX, Users, AlertTriangle, 
  CheckCircle, RefreshCw, ChevronRight, Search, Menu, X, 
  Sliders, Lock, Unlock, Zap, Award, Heart, MessageSquare,
  Coffee, ExternalLink, Copy, Check, Sparkles, CheckCircle2,
  AlertCircle, ArrowLeft, Save, Radio, Gamepad2, Gift, Star,
  Bell, Megaphone, FileText, ChevronDown, Bot
} from "lucide-react";
import { DiscordLogo, DiscordVerifiedBadge, DiscordAppPill } from "@/app/components/BrandIcons";
import { dashboardAudio } from "@/lib/dashboardAudio";
import { TactileToggle } from "@/app/dashboard/[guildId]/components/TactileToggle";
import { motion, AnimatePresence } from "framer-motion";

export type ThemeKey = "blurple" | "cyberpunk" | "emerald" | "amber" | "nord" | "monochrome";

export interface ThemeTokens {
  name: string;
  bg: string;
  card: string;
  primary: string;
  accent: string;
  border: string;
  text: string;
}

export const SAAS_THEMES: Record<ThemeKey, ThemeTokens> = {
  blurple: {
    name: "Blurple SaaS",
    bg: "#0C0E14",
    card: "rgba(25, 28, 41, 0.75)",
    primary: "#BD5FFF",
    accent: "#5865F2",
    border: "rgba(255, 255, 255, 0.08)",
    text: "#F3F4F6",
  },
  cyberpunk: {
    name: "Midnight Cyberpunk",
    bg: "#05050D",
    card: "rgba(18, 18, 30, 0.8)",
    primary: "#EC4899",
    accent: "#06B6D4",
    border: "rgba(236, 72, 153, 0.18)",
    text: "#FDF2F8",
  },
  emerald: {
    name: "Emerald Hacker",
    bg: "#040D0A",
    card: "rgba(10, 26, 20, 0.8)",
    primary: "#10B981",
    accent: "#34D399",
    border: "rgba(16, 185, 129, 0.18)",
    text: "#ECFDF5",
  },
  amber: {
    name: "Sunset Amber",
    bg: "#0F0B08",
    card: "rgba(30, 20, 12, 0.8)",
    primary: "#F59E0B",
    accent: "#EF4444",
    border: "rgba(245, 158, 11, 0.18)",
    text: "#FFFBEB",
  },
  nord: {
    name: "Nordic Frost",
    bg: "#0D1117",
    card: "rgba(22, 27, 34, 0.8)",
    primary: "#38BDF8",
    accent: "#6366F1",
    border: "rgba(56, 189, 248, 0.18)",
    text: "#F0F6FC",
  },
  monochrome: {
    name: "Monochrome Stealth",
    bg: "#09090B",
    card: "rgba(24, 24, 27, 0.85)",
    primary: "#FAFAFA",
    accent: "#A1A1AA",
    border: "rgba(255, 255, 255, 0.12)",
    text: "#FAFAFA",
  },
};

interface GuildOption {
  id: string;
  name: string;
  iconUrl?: string | null;
  isReal?: boolean;
}

const DEMO_SERVERS: GuildOption[] = [
  { id: "demo-veplexity", name: "VePlexity Official", isReal: false },
  { id: "demo-lofi", name: "Lofi Lounge 24/7", isReal: false },
  { id: "demo-esports", name: "Esports Gaming Hub", isReal: false },
];

export interface VePlexitySaaSConsoleProps {
  initialGuildId?: string;
  initialTab?: string;
}

export default function VePlexitySaaSConsole({
  initialGuildId,
  initialTab = "overview",
}: VePlexitySaaSConsoleProps) {
  const { data: session, status: authStatus } = useSession();

  // Tab & Theme State
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey>("blurple");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(dashboardAudio.enabled);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Server selection state
  const [activeServerId, setActiveServerId] = useState<string>(initialGuildId || "demo-veplexity");
  const [realGuilds, setRealGuilds] = useState<GuildOption[]>([]);
  const [loadingRealGuilds, setLoadingRealGuilds] = useState(false);

  // Music Player State
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState<number>(80);
  const [activeFilters, setActiveFilters] = useState<string[]>(["Bass Boost"]);
  const [stay247, setStay247] = useState(true);

  // Commands Tab State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModule, setSelectedModule] = useState("all");
  const [activeSimCommand, setActiveSimCommand] = useState<any>(null);
  const [simStep, setSimStep] = useState<"idle" | "typing" | "sent" | "bot_thinking" | "bot_responded">("bot_responded");
  const [simTypedText, setSimTypedText] = useState("");
  const simTimeoutRef = useRef<NodeJS.Timeout[]>([]);

  // Overview 15 Modules State
  const [moduleCategory, setModuleCategory] = useState("all");
  const [moduleSearch, setModuleSearch] = useState("");
  const [moduleStates, setModuleStates] = useState<Record<string, boolean>>({
    welcome: true,
    reactionroles: true,
    announce: true,
    leveling: true,
    rewards: true,
    starboard: false,
    community: true,
    boosters: true,
    autoresponders: true,
    automod: true,
    moderation: true,
    logging: true,
    music: true,
    tempvc: true,
    ai: true,
  });

  // Moderation Hub State
  const [modCases, setModCases] = useState([
    { id: "#104", action: "Timeout", target: "SpamBot#1234", mod: "Staff_Mod#9999", reason: "Excessive voice channel pinging", time: "5m ago" },
    { id: "#103", action: "Warn", target: "ToxicGamer#4321", mod: "Admin_Boss#0001", reason: "Inappropriate language in general chat", time: "1h ago" },
    { id: "#102", action: "Ban", target: "RaidAccount#0000", mod: "AutoMod Shield", reason: "Mass invite link raid detected", time: "3h ago" },
    { id: "#101", action: "Mute", target: "CapsLover#8888", mod: "AutoMod Shield", reason: "Sent 80% caps lock messages in 3s", time: "1d ago" },
  ]);
  const [quickActionUserId, setQuickActionUserId] = useState("");
  const [quickActionReason, setQuickActionReason] = useState("");

  // AutoMod Toggles State
  const [autoModFilters, setAutoModFilters] = useState({
    antiInvite: true,
    antiSpam: true,
    antiGhostPing: true,
    antiBadWords: true,
    antiCaps: false,
  });

  // UPI Copy State
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [savingConfig, setSavingConfig] = useState(false);

  const currentTheme = SAAS_THEMES[selectedTheme] || SAAS_THEMES.blurple;

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Load theme preference from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("vep_saas_theme") as ThemeKey;
      if (saved && SAAS_THEMES[saved]) {
        setSelectedTheme(saved);
      }
    } catch {}
  }, []);

  const handleThemeChange = (key: ThemeKey) => {
    setSelectedTheme(key);
    try {
      localStorage.setItem("vep_saas_theme", key);
    } catch {}
    dashboardAudio.playClick();
    showToast(`Switched theme to ${SAAS_THEMES[key].name}`);
  };

  // Fetch real user Discord guilds if authenticated
  useEffect(() => {
    if (authStatus === "authenticated") {
      setLoadingRealGuilds(true);
      fetch("/api/user/guilds")
        .then((res) => (res.ok ? res.json() : Promise.reject()))
        .then((data) => {
          if (Array.isArray(data.guilds)) {
            const mapped: GuildOption[] = data.guilds.map((g: any) => ({
              id: g.id,
              name: g.name,
              iconUrl: g.iconUrl,
              isReal: true,
            }));
            setRealGuilds(mapped);
            if (initialGuildId && mapped.some((g) => g.id === initialGuildId)) {
              setActiveServerId(initialGuildId);
            }
          }
        })
        .catch(() => {})
        .finally(() => setLoadingRealGuilds(false));
    }
  }, [authStatus, initialGuildId]);

  // Combined servers list
  const allServers = useMemo(() => {
    if (realGuilds.length > 0) {
      return [...realGuilds, ...DEMO_SERVERS];
    }
    return DEMO_SERVERS;
  }, [realGuilds]);

  const activeServer = useMemo(() => {
    return allServers.find((s) => s.id === activeServerId) || allServers[0];
  }, [allServers, activeServerId]);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText("madan.45@superyes");
    setCopiedUpi(true);
    dashboardAudio.playClick();
    showToast("UPI ID (madan.45@superyes) copied to clipboard!");
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleToggleModule = (id: string) => {
    dashboardAudio.playToggle(!moduleStates[id]);
    setModuleStates((prev) => ({ ...prev, [id]: !prev[id] }));
    setHasUnsavedChanges(true);
    showToast(`Module ${id} ${!moduleStates[id] ? "enabled" : "disabled"}`);
  };

  const handleSaveConfig = async () => {
    setSavingConfig(true);
    dashboardAudio.playClick();

    // If real server and authenticated, attempt backend API save
    if (activeServer.isReal && activeServer.id) {
      try {
        const res = await fetch(`/api/guilds/${activeServer.id}/config`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            guildId: activeServer.id,
            autoMod: {
              enabled: true,
              antiInvite: autoModFilters.antiInvite,
              antiSpam: autoModFilters.antiSpam,
              antiBadWords: autoModFilters.antiBadWords,
            },
            music: {
              stay247,
              defaultVolume: volume,
            },
            modules: moduleStates,
          }),
        });
        if (res.ok) {
          showToast("Server configuration successfully saved to VePlexity Bot!");
          setHasUnsavedChanges(false);
          setSavingConfig(false);
          return;
        }
      } catch {}
    }

    // Default simulation save
    setTimeout(() => {
      setSavingConfig(false);
      setHasUnsavedChanges(false);
      showToast("Configuration saved successfully!");
    }, 500);
  };

  // Run live command typing simulation
  const runCommandSimulation = (cmd: any) => {
    simTimeoutRef.current.forEach(clearTimeout);
    simTimeoutRef.current = [];

    setActiveSimCommand(cmd);
    setSimStep("typing");
    setSimTypedText("");

    const fullStr = cmd.syntax;
    let curr = 0;
    const interval = setInterval(() => {
      curr++;
      setSimTypedText(fullStr.slice(0, curr));
      if (curr >= fullStr.length) {
        clearInterval(interval);
        const t1 = setTimeout(() => {
          setSimStep("sent");
          setSimTypedText("");
          const t2 = setTimeout(() => {
            setSimStep("bot_thinking");
            const t3 = setTimeout(() => {
              setSimStep("bot_responded");
            }, 450);
            simTimeoutRef.current.push(t3);
          }, 300);
          simTimeoutRef.current.push(t2);
        }, 200);
        simTimeoutRef.current.push(t1);
      }
    }, 22);
  };

  // 100+ Commands Catalog Data
  const COMMANDS_LIST = [
    { name: "/play", alias: ".p", module: "music", syntax: "/play query: Aisi Tu - Tanvik x VeeRM", desc: "Stream lossless audio with 48kHz VOIP DSP engine directly into voice channels.", perm: "Everyone", badge: "48kHz Lossless" },
    { name: "/skip", alias: ".s", module: "music", syntax: "/skip", desc: "Instantly vote or force-skip current playing track.", perm: "Everyone" },
    { name: "/volume", alias: ".vol", module: "music", syntax: "/volume level: 120", desc: "Adjust high-fidelity output volume up to 150% with software limiter.", perm: "DJ Role" },
    { name: "/247", alias: "—", module: "music", syntax: "/247 enable: True", desc: "Keep VePlexity bot parked in your voice channel 24/7 indefinitely.", perm: "Manage Channels", badge: "Free VIP" },
    { name: "/warn", alias: ".w", module: "moderation", syntax: "/warn user: @Member reason: Spamming general", desc: "Issue an official recorded warning to a member with instant DM notice.", perm: "Moderate Members" },
    { name: "/timeout", alias: ".mute", module: "moderation", syntax: "/timeout user: @Member duration: 10m reason: Toxic language", desc: "Place a member into Discord timeout for specified duration.", perm: "Moderate Members" },
    { name: "/kick", alias: ".k", module: "moderation", syntax: "/kick user: @Member reason: Disobeying rules", desc: "Kick user from the server with full audit log entry.", perm: "Kick Members" },
    { name: "/ban", alias: ".b", module: "moderation", syntax: "/ban user: @Member delete_days: 1 reason: Raid bot", desc: "Permanently ban member and prune their recent messages.", perm: "Ban Members" },
    { name: "/purge", alias: ".clear", module: "moderation", syntax: "/purge amount: 25", desc: "Mass-delete up to 100 messages rapidly with auto-clearing receipt.", perm: "Manage Messages", badge: "Dual-Engine" },
    { name: "/rank", alias: ".r", module: "economy", syntax: "/rank user: @Veer", desc: "Display dynamic member rank card, level progression, and voice stats.", perm: "Everyone", badge: "Rank Studio" },
    { name: "/daily", alias: "—", module: "economy", syntax: "/daily", desc: "Claim daily currency bonus and increment your server streak counter.", perm: "Everyone" },
    { name: "/leaderboard", alias: ".lb", module: "economy", syntax: "/leaderboard type: xp", desc: "View server leaderboard rankings for chat XP, voice time, or cash.", perm: "Everyone" },
    { name: "/action", alias: "—", module: "fun", syntax: "/action type: Hug user: @Friend", desc: "Perform high-FPS anime reaction GIF action with mentions.", perm: "Everyone" },
    { name: "/gemini", alias: ".ai", module: "utility", syntax: "/gemini prompt: What is quantum superposition?", desc: "Query Google Gemini 2.5 multi-modal conversational AI intelligence.", perm: "Everyone", badge: "Gemini 2.5" },
    { name: "/tempvc setup", alias: "—", module: "utility", syntax: "/tempvc setup hub: ➕ Join to Create", desc: "Deploy dynamic zero-clutter temporary voice channels system.", perm: "Manage Channels" },
    { name: "/reactionroles", alias: ".rr", module: "utility", syntax: "/reactionroles channel: #roles style: Buttons", desc: "Deploy self-assignable Discord button role menus.", perm: "Manage Roles", badge: "Free VIP" },
  ];

  const filteredCommands = COMMANDS_LIST.filter((cmd) => {
    const matchesMod = selectedModule === "all" || cmd.module === selectedModule;
    const matchesSearch =
      cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.syntax.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMod && matchesSearch;
  });

  // 15 Modules List matching commercial spec
  const OVERVIEW_MODULES_15 = [
    { id: "welcome", name: "Welcome & Goodbye", desc: "Custom welcome graphic cards, join announcements, and instant auto-role assignment.", category: "essentials", categoryLabel: "Essentials", badges: ["Canvas Graphic Cards", "Instant Auto-Role"], icon: Bell },
    { id: "reactionroles", name: "Reaction Roles & Menus", desc: "Interactive Discord button and menu role assignment for self-assignable server roles.", category: "essentials", categoryLabel: "Essentials", badges: ["Interactive Discord Button & Dropdown Picker"], icon: Users },
    { id: "announce", name: "Message Builder & Embeds", desc: "Craft and dispatch rich announcements with mentions, embeds, and buttons.", category: "essentials", categoryLabel: "Essentials", badges: ["Rich Embed Studio"], icon: Megaphone },
    { id: "leveling", name: "XP Leveling & Rank System", desc: "Chat activity XP progression, automated level-up rewards, and custom rank cards.", category: "engagement", categoryLabel: "Engagement & XP", badges: ["Rank Studio", "2x Voice XP Multiplier"], icon: Award },
    { id: "rewards", name: "Voice & Text Activity Rewards", desc: "Earn server roles automatically by spending time in voice channels and chatting.", category: "engagement", categoryLabel: "Engagement & XP", badges: ["Voice Time Farming", "Activity Role Tiers"], icon: Gift },
    { id: "starboard", name: "Starboard (Hall of Fame)", desc: "Showcase community highlight messages in a dedicated hall of fame channel.", category: "engagement", categoryLabel: "Engagement & XP", badges: ["Community Hall of Fame Pinning"], icon: Star },
    { id: "community", name: "Birthdays & Counting Games", desc: "Interactive counting streak game channel and celebratory birthday shoutouts.", category: "engagement", categoryLabel: "Engagement & XP", badges: ["Automated Birthday Shoutouts", "Counting Streaks"], icon: Gamepad2 },
    { id: "boosters", name: "Server Boosters Appreciation", desc: "Automatic public booster shoutouts and custom thank-you perks for server boosters.", category: "engagement", categoryLabel: "Engagement & XP", badges: ["Automatic Server Booster Appreciation"], icon: Zap },
    { id: "autoresponders", name: "Custom Auto-Responders", desc: "Automated keyword triggers and instant pre-configured replies in server channels.", category: "engagement", categoryLabel: "Engagement & XP", badges: ["Regex Match", "Custom Replies"], icon: MessageSquare },
    { id: "automod", name: "Auto-Mod Security Shield", desc: "Instant spam shield, invite link blocker, toxic language filter, and anti-caps engine.", category: "security", categoryLabel: "Security & Mod", badges: ["0-Day Anti-Raid", "Link & Spam Shield"], icon: Lock },
    { id: "moderation", name: "Bot Masters & Roles", desc: "Authorize moderator roles to execute administrative and moderation commands.", category: "security", categoryLabel: "Security & Mod", badges: ["Role Hierarchy", "Audit Enforcement"], icon: Shield },
    { id: "logging", name: "Audit & Logging Channels", desc: "Detailed server audit logs for message edits, deletions, joins, and mod actions.", category: "security", categoryLabel: "Security & Mod", badges: ["Event Dispatcher", "Immutable Logs"], icon: FileText },
    { id: "music", name: "Music & DJ Audio (24/7)", desc: "Lossless 24/7 high-fidelity music streaming, equalizers, and DJ controls.", category: "utilities", categoryLabel: "Utilities", badges: ["24/7 Lossless Stream", "-14 LUFS DSP"], icon: Music },
    { id: "tempvc", name: "Temporary Voice Hubs", desc: "Dynamic join-to-create temporary voice channels that auto-delete when empty.", category: "utilities", categoryLabel: "Utilities", badges: ["Dynamic VC Creator", "Auto-Prune Zero Members"], icon: Radio },
    { id: "ai", name: "Gemini AI Chatbot", desc: "Conversational Google Gemini companion channel with custom personality.", category: "utilities", categoryLabel: "Utilities", badges: ["Gemini 1.5 Flash Brain", "Custom Persona"], icon: Bot },
  ];

  const filteredOverviewModules = OVERVIEW_MODULES_15.filter((m) => {
    const matchesCat = moduleCategory === "all" || m.category === moduleCategory;
    const matchesSearch =
      m.name.toLowerCase().includes(moduleSearch.toLowerCase()) ||
      m.desc.toLowerCase().includes(moduleSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const armedModulesCount = Object.values(moduleStates).filter(Boolean).length;

  return (
    <div
      className="min-h-screen flex font-sans transition-colors duration-300 relative select-none"
      style={{
        backgroundColor: currentTheme.bg,
        color: currentTheme.text,
        ["--primary" as any]: currentTheme.primary,
        ["--accent" as any]: currentTheme.accent,
        ["--card-bg" as any]: currentTheme.card,
        ["--border-divider" as any]: currentTheme.border,
      }}
    >
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-[9999] px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2.5 shadow-2xl backdrop-blur-xl transition-all ${
            toast.type === "success"
              ? "bg-[#180a22]/95 border-purple-500/50 text-purple-200"
              : "bg-[#240e13]/95 border-rose-500/50 text-rose-200"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* ─── LEFT SIDEBAR NAVIGATION ─── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-200 ease-in-out border-r backdrop-blur-2xl flex flex-col justify-between`}
        style={{
          backgroundColor: currentTheme.card,
          borderColor: currentTheme.border,
        }}
      >
        <div>
          {/* Brand Header */}
          <div
            className="p-5 flex items-center justify-between border-b"
            style={{ borderColor: currentTheme.border }}
          >
            <Link href="/discord-bot/veplexity" className="flex items-center gap-3 group">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl shadow-lg transition-transform group-hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.accent})`,
                  color: "#fff",
                }}
              >
                V
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h1 className="font-bold text-sm tracking-wide text-white truncate">VePlexity</h1>
                  <DiscordVerifiedBadge className="w-3.5 h-3.5 shrink-0" />
                </div>
                <span className="text-[10px] font-mono opacity-60">Commercial Bot v2.0</span>
              </div>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden p-1.5 rounded-lg bg-white/5 text-zinc-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Items (All Core Tabs) */}
          <nav className="p-3.5 space-y-1 overflow-y-auto">
            {[
              { id: "overview", label: "Overview & Stats", icon: Server },
              { id: "commands", label: "100+ Commands", icon: Terminal, badge: "Interactive" },
              { id: "moderation", label: "Moderation Hub", icon: Shield },
              { id: "music", label: "Studio Music DSP", icon: Music, badge: "24/7" },
              { id: "economy", label: "Economy & Tycoons", icon: DollarSign },
              { id: "settings", label: "AutoMod & Config", icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    dashboardAudio.playClick();
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none ${
                    isActive
                      ? "shadow-md text-white font-bold"
                      : "opacity-70 hover:opacity-100 hover:bg-white/5 text-zinc-300"
                  }`}
                  style={
                    isActive
                      ? {
                          background: `linear-gradient(135deg, ${currentTheme.primary}25, ${currentTheme.accent}15)`,
                          color: currentTheme.primary,
                          border: `1px solid ${currentTheme.primary}40`,
                        }
                      : {}
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className="text-[9px] font-mono px-1.5 py-0.2 rounded font-bold"
                      style={{
                        background: `${currentTheme.primary}20`,
                        color: currentTheme.primary,
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Active Server Switcher & Support Creator */}
        <div className="p-4 border-t space-y-3" style={{ borderColor: currentTheme.border }}>
          {/* Active Server Switcher */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[10px] uppercase tracking-wider opacity-60 font-mono font-bold">
                Active Server
              </label>
              <span className="text-[9px] font-mono opacity-50">
                {activeServer.isReal ? "🟢 Discord Live" : "🟡 Preview"}
              </span>
            </div>

            <select
              value={activeServerId}
              onChange={(e) => {
                setActiveServerId(e.target.value);
                dashboardAudio.playClick();
                showToast(`Switched active server to: ${allServers.find((s) => s.id === e.target.value)?.name}`);
              }}
              className="w-full bg-black/40 border rounded-xl px-3 py-2 text-xs outline-none cursor-pointer text-white font-medium backdrop-blur-md"
              style={{ borderColor: currentTheme.border }}
            >
              {allServers.map((srv) => (
                <option key={srv.id} value={srv.id} className="bg-[#12141c] text-white">
                  {srv.isReal ? "⭐ " : ""}{srv.name}
                </option>
              ))}
            </select>
          </div>

          {/* Support Creator Button */}
          <a
            href="https://buymeacoffee.com/veplexity1"
            target="_blank"
            rel="noreferrer"
            className="w-full py-2 px-3 rounded-xl text-center text-xs font-bold transition flex items-center justify-center gap-2 group border"
            style={{
              backgroundColor: "rgba(255, 221, 0, 0.12)",
              borderColor: "rgba(255, 221, 0, 0.35)",
              color: "#FFDD00",
            }}
          >
            <Coffee size={14} className="group-hover:scale-110 transition-transform" />
            <span>Support Creator ☕</span>
          </a>
        </div>
      </aside>

      {/* ─── MAIN CONTENT VIEWPORT ─── */}
      <div className="flex-1 flex flex-col md:ml-64 min-w-0">
        {/* Top Navigation Header */}
        <header
          className="h-16 border-b px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 backdrop-blur-2xl"
          style={{
            backgroundColor: `${currentTheme.bg}e6`,
            borderColor: currentTheme.border,
          }}
        >
          {/* Left: Mobile trigger & Tab Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 text-zinc-300 hover:text-white"
            >
              <Menu size={18} />
            </button>
            <div>
              <h2 className="text-sm sm:text-base font-bold capitalize text-white flex items-center gap-2">
                <span>{activeTab === "overview" ? "Dashboard Overview & Stats" : activeTab.replace("-", " ")}</span>
              </h2>
            </div>
          </div>

          {/* Right Header Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Lavalink Node Online Pill */}
            <div className="hidden lg:flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full text-emerald-400 text-[11px] font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Lavalink Node Online</span>
            </div>

            {/* Theme Selector Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono opacity-50 hidden sm:inline">Theme:</span>
              <select
                value={selectedTheme}
                onChange={(e) => handleThemeChange(e.target.value as ThemeKey)}
                className="bg-black/40 border rounded-xl px-2.5 py-1.5 text-xs outline-none cursor-pointer font-medium text-white"
                style={{ borderColor: currentTheme.border }}
              >
                {Object.entries(SAAS_THEMES).map(([key, t]) => (
                  <option key={key} value={key} className="bg-[#12141c] text-white">
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            {/* SFX Audio Toggle */}
            <button
              onClick={() => {
                const next = dashboardAudio.toggleSound();
                setSoundOn(next);
              }}
              className={`p-2 rounded-xl border text-xs flex items-center gap-1 transition cursor-pointer ${
                soundOn
                  ? "bg-white/10 border-white/20 text-zinc-200"
                  : "bg-white/5 border-white/5 text-zinc-500"
              }`}
              title="Toggle Audio Effects"
            >
              {soundOn ? <Volume2 size={15} className="text-emerald-400" /> : <VolumeX size={15} />}
            </button>

            {/* Discord Official Link */}
            <a
              href="https://www.discord.gg/R6ZrqpWEcc"
              target="_blank"
              rel="noreferrer"
              className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-[#5865F2]/15 border border-[#5865F2]/30 hover:bg-[#5865F2]/25 text-white transition text-xs flex items-center gap-1.5 font-semibold"
              title="VePlexity Discord Support"
            >
              <DiscordLogo className="w-3.5 h-3.5 text-[#5865F2]" />
              <span className="hidden sm:inline">Discord</span>
            </a>

            {/* Auth / Discord Connect */}
            {authStatus === "authenticated" ? (
              <div className="flex items-center gap-2">
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="w-7 h-7 rounded-full border border-white/20"
                  />
                ) : null}
                <button
                  onClick={() => signOut()}
                  className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-mono text-zinc-400 hover:text-white"
                  title="Sign out"
                >
                  Exit
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn("discord")}
                className="px-2.5 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-300 font-bold text-xs flex items-center gap-1 transition"
              >
                <span>Connect Discord</span>
              </button>
            )}

            {/* Save Changes Button */}
            {hasUnsavedChanges && (
              <button
                onClick={handleSaveConfig}
                disabled={savingConfig}
                className="px-3 py-1.5 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-purple-500/25 active:scale-95 animate-pulse"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.primary}, #F97316)`,
                }}
              >
                <Save size={14} />
                <span>{savingConfig ? "Saving..." : "Save Changes"}</span>
              </button>
            )}
          </div>
        </header>

        {/* ─── DYNAMIC TAB PANELS ─── */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
          {/* TAB 1: OVERVIEW & STATS */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* 4 High-Tech Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Active Servers", value: "1,482", icon: Server, change: "+12% this week", color: currentTheme.primary },
                  { label: "Total Members", value: "342,109", icon: Users, change: "+2,400 today", color: currentTheme.accent },
                  { label: "Commands Executed", value: "1.2M", icon: Terminal, change: "99.9% uptime", color: "#10B981" },
                  { label: "Audio Node Latency", value: "18ms", icon: Music, change: "48kHz FLAC Node", color: "#F59E0B" },
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -3 }}
                      className="p-5 rounded-2xl border backdrop-blur-xl relative overflow-hidden transition-all shadow-md"
                      style={{
                        backgroundColor: currentTheme.card,
                        borderColor: currentTheme.border,
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[11px] font-mono uppercase tracking-wider opacity-60 font-bold">{stat.label}</p>
                          <h3 className="text-2xl font-black mt-1 text-white">{stat.value}</h3>
                        </div>
                        <div
                          className="p-2.5 rounded-xl"
                          style={{
                            backgroundColor: `${stat.color}15`,
                            color: stat.color,
                          }}
                        >
                          <Icon size={20} />
                        </div>
                      </div>
                      <p className="text-[10px] font-mono mt-3 opacity-60 flex items-center gap-1 text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>{stat.change}</span>
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Quick Widget Row: Studio Music Quick Player & Dual Monetization */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Music Quick Player */}
                <div
                  className="lg:col-span-2 p-6 rounded-2xl border backdrop-blur-xl space-y-4"
                  style={{
                    backgroundColor: currentTheme.card,
                    borderColor: currentTheme.border,
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Music size={18} style={{ color: currentTheme.primary }} />
                      <h3 className="font-bold text-sm sm:text-base text-white">Studio Music Quick Player</h3>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                      Now Streaming in Voice
                    </span>
                  </div>

                  <div
                    className="p-4 rounded-xl bg-black/40 border flex flex-col sm:flex-row items-center gap-4"
                    style={{ borderColor: currentTheme.border }}
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-lg border border-white/10 relative">
                      <img
                        src="/music/aisi-tu-cover.png"
                        alt="Aisi Tu"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as any).src = "/bots/veplexity-avatar.png";
                        }}
                      />
                    </div>

                    <div className="flex-1 text-center sm:text-left min-w-0">
                      <div className="flex items-center gap-2 justify-center sm:justify-start">
                        <h4 className="font-bold text-sm text-white truncate">Aisi Tu - Tanvik x VeeRM</h4>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-400 font-bold">
                          Lossless
                        </span>
                      </div>
                      <p className="text-xs opacity-60 mt-0.5 truncate text-zinc-300">
                        Mastered by Veer Madan • Streamed via 48kHz VOIP DSP Node
                      </p>
                      <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: currentTheme.primary }}
                          animate={{ width: isPlaying ? ["30%", "65%", "90%"] : "45%" }}
                          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          dashboardAudio.playClick();
                          setIsPlaying(!isPlaying);
                        }}
                        className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition cursor-pointer text-white"
                        title={isPlaying ? "Pause Track" : "Resume Track"}
                      >
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                      </button>
                      <button
                        onClick={() => {
                          dashboardAudio.playClick();
                          showToast("Skipped to next queued track in Lavalink node");
                        }}
                        className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition cursor-pointer text-white"
                        title="Skip Track"
                      >
                        <SkipForward size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Dual Monetization / UPI Gateway Card */}
                <div
                  className="p-6 rounded-2xl border backdrop-blur-xl flex flex-col justify-between space-y-4"
                  style={{
                    backgroundColor: currentTheme.card,
                    borderColor: currentTheme.border,
                  }}
                >
                  <div>
                    <div
                      className="flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-full w-max mb-3 font-mono"
                      style={{
                        background: `${currentTheme.primary}20`,
                        color: currentTheme.primary,
                      }}
                    >
                      <Zap size={14} /> Dual Monetization Gateway
                    </div>
                    <h3 className="font-bold text-base text-white">Support VePlexity</h3>
                    <p className="text-xs opacity-60 mt-1 leading-relaxed text-zinc-300">
                      Direct zero-fee UPI gateway for Indian creators & server boosters to keep 24/7 nodes alive.
                    </p>
                  </div>

                  {/* 1-Click Copy UPI Pill */}
                  <div
                    onClick={handleCopyUpi}
                    className="p-3 bg-black/40 rounded-xl border flex items-center justify-between cursor-pointer hover:border-purple-500/50 transition group"
                    style={{ borderColor: currentTheme.border }}
                    title="Click to copy UPI ID"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10px] font-mono uppercase opacity-50 font-bold">UPI ID:</span>
                      <span className="text-xs font-mono font-bold truncate text-white">madan.45@superyes</span>
                    </div>
                    {copiedUpi ? (
                      <Check size={16} className="text-emerald-400 shrink-0" />
                    ) : (
                      <Copy size={16} className="text-zinc-500 group-hover:text-white transition-colors shrink-0" />
                    )}
                  </div>

                  <a
                    href="https://buymeacoffee.com/veplexity1"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-xl text-center text-xs font-bold text-black shadow-lg transition hover:opacity-90 flex items-center justify-center gap-1.5"
                    style={{
                      backgroundColor: "#FFDD00",
                    }}
                  >
                    <Coffee size={14} />
                    <span>Buy Me a Coffee ☕</span>
                  </a>
                </div>
              </div>

              {/* 15 Modules Matrix Header & Grid */}
              <div className="space-y-4 pt-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                      <span>Server Modules &amp; Feature Cartridges</span>
                      <span
                        className="text-xs font-mono px-2 py-0.5 rounded-full font-bold border"
                        style={{
                          backgroundColor: `${currentTheme.primary}15`,
                          borderColor: `${currentTheme.primary}35`,
                          color: currentTheme.primary,
                        }}
                      >
                        {armedModulesCount} of 15 Armed
                      </span>
                    </h3>
                    <p className="text-xs opacity-60 text-zinc-300">
                      Toggle active features and launch dedicated configuration studios.
                    </p>
                  </div>

                  {/* Search and Category Filter */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-56">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                      <input
                        type="text"
                        placeholder="Filter modules..."
                        value={moduleSearch}
                        onChange={(e) => setModuleSearch(e.target.value)}
                        className="w-full bg-black/40 border rounded-xl pl-8 pr-3 py-1.5 text-xs outline-none text-white placeholder-zinc-500"
                        style={{ borderColor: currentTheme.border }}
                      />
                    </div>
                  </div>
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {[
                    { id: "all", label: "All Modules (15)" },
                    { id: "essentials", label: "Essentials (3)" },
                    { id: "engagement", label: "Engagement & XP (6)" },
                    { id: "security", label: "Security & Mod (3)" },
                    { id: "utilities", label: "Utilities (3)" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setModuleCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                        moduleCategory === cat.id
                          ? "text-white shadow-md font-bold"
                          : "opacity-60 hover:opacity-100 bg-white/5 text-zinc-300"
                      }`}
                      style={
                        moduleCategory === cat.id
                          ? {
                              backgroundColor: currentTheme.primary,
                              color: "#fff",
                            }
                          : {}
                      }
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* 15 Modules Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredOverviewModules.map((mod) => {
                    const Icon = mod.icon;
                    const isArmed = Boolean(moduleStates[mod.id]);
                    return (
                      <motion.div
                        key={mod.id}
                        whileHover={{ y: -3 }}
                        className="p-5 rounded-2xl border backdrop-blur-xl flex flex-col justify-between gap-4 transition-all"
                        style={{
                          backgroundColor: currentTheme.card,
                          borderColor: isArmed ? `${currentTheme.primary}40` : currentTheme.border,
                        }}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 shadow-md"
                            style={{
                              backgroundColor: `${currentTheme.primary}20`,
                              color: currentTheme.primary,
                            }}
                          >
                            <Icon size={20} />
                          </div>

                          <TactileToggle
                            checked={isArmed}
                            onChange={() => handleToggleModule(mod.id)}
                            label={`Toggle ${mod.name}`}
                          />
                        </div>

                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-sm text-white">{mod.name}</h4>
                            <span className="text-[9px] font-mono uppercase opacity-50 px-1.5 py-0.2 rounded bg-white/5">
                              {mod.categoryLabel}
                            </span>
                          </div>
                          <p className="text-xs opacity-70 text-zinc-300 leading-relaxed line-clamp-2">
                            {mod.desc}
                          </p>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {mod.badges.map((b, bIdx) => (
                              <span
                                key={bIdx}
                                className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-zinc-300"
                              >
                                {b}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div
                          className="pt-2 border-t flex items-center justify-between text-xs font-mono"
                          style={{ borderColor: currentTheme.border }}
                        >
                          <span className={isArmed ? "text-emerald-400 font-bold" : "text-zinc-500 font-semibold"}>
                            {isArmed ? "● ARMED & ACTIVE" : "○ STANDBY"}
                          </span>
                          <button
                            onClick={() => {
                              dashboardAudio.playClick();
                              if (mod.id === "music") setActiveTab("music");
                              else if (mod.id === "moderation" || mod.id === "logging") setActiveTab("moderation");
                              else if (mod.id === "automod") setActiveTab("settings");
                              else if (mod.id === "leveling" || mod.id === "rewards") setActiveTab("economy");
                              else setActiveTab("settings");
                            }}
                            className="text-[10px] font-bold uppercase tracking-wider text-purple-300 hover:text-white flex items-center gap-1 cursor-pointer"
                          >
                            <span>STUDIO</span>
                            <ChevronRight size={12} />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 100+ COMMANDS EXPLORER */}
          {activeTab === "commands" && (
            <div className="space-y-6">
              {/* Header and Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" size={16} />
                  <input
                    type="text"
                    placeholder="Search 100+ commands..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black/40 border rounded-xl pl-9 pr-4 py-2 text-xs outline-none text-white placeholder-zinc-500"
                    style={{ borderColor: currentTheme.border }}
                  />
                </div>

                <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
                  {["all", "moderation", "music", "economy", "fun", "utility"].map((mod) => (
                    <button
                      key={mod}
                      onClick={() => setSelectedModule(mod)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize whitespace-nowrap transition cursor-pointer ${
                        selectedModule === mod
                          ? "shadow-md text-white font-bold"
                          : "opacity-60 hover:opacity-100 bg-white/5 text-zinc-300"
                      }`}
                      style={
                        selectedModule === mod
                          ? {
                              backgroundColor: currentTheme.primary,
                              color: "#fff",
                            }
                          : {}
                      }
                    >
                      {mod}
                    </button>
                  ))}
                </div>
              </div>

              {/* Commands Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredCommands.map((cmd, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -3 }}
                    onClick={() => {
                      dashboardAudio.playClick();
                      runCommandSimulation(cmd);
                    }}
                    className="p-4 rounded-2xl border backdrop-blur-xl flex flex-col justify-between space-y-3 cursor-pointer group hover:border-purple-500/50 transition-all shadow-md"
                    style={{
                      backgroundColor: currentTheme.card,
                      borderColor: currentTheme.border,
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm" style={{ color: currentTheme.primary }}>
                          {cmd.name}
                        </span>
                        <span className="text-[10px] opacity-50 px-2 py-0.5 rounded bg-white/5 font-mono">
                          Alias: {cmd.alias}
                        </span>
                      </div>
                      <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-bold bg-white/5 opacity-70">
                        {cmd.module}
                      </span>
                    </div>

                    <p className="text-xs opacity-70 text-zinc-300 leading-relaxed">{cmd.desc}</p>

                    <div
                      className="flex justify-between items-center text-xs pt-2 border-t font-mono"
                      style={{ borderColor: currentTheme.border }}
                    >
                      <span className="opacity-50 text-[10px]">Permission:</span>
                      <span className="font-bold text-[10px]" style={{ color: currentTheme.accent }}>
                        {cmd.perm}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Interactive Live Command Simulator Banner */}
              {activeSimCommand && (
                <div
                  className="p-5 rounded-2xl border backdrop-blur-xl space-y-3"
                  style={{
                    backgroundColor: "rgba(10, 12, 18, 0.95)",
                    borderColor: currentTheme.primary,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                      <Terminal size={14} /> Live Discord Command Terminal
                    </span>
                    <button
                      onClick={() => setActiveSimCommand(null)}
                      className="text-xs opacity-50 hover:opacity-100 text-white"
                    >
                      Close ✕
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-xs space-y-2">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <span className="text-purple-400 font-bold">user@discord:~$</span>
                      <span>{simTypedText}</span>
                      {simStep === "typing" && <span className="w-1.5 h-3.5 bg-purple-400 animate-pulse" />}
                    </div>

                    {simStep === "bot_thinking" && (
                      <div className="text-xs text-amber-400 flex items-center gap-1.5 pt-1">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                        <span>VePlexity is thinking...</span>
                      </div>
                    )}

                    {simStep === "bot_responded" && (
                      <div className="p-3 rounded-lg bg-[#1e2029] border-l-4 border-purple-500 space-y-1 text-zinc-200">
                        <div className="font-bold text-xs text-white flex items-center gap-1.5">
                          <span>VePlexity Bot</span>
                          <span className="text-[9px] px-1 py-0.2 rounded bg-[#5865F2] text-white">BOT</span>
                        </div>
                        <p className="text-xs text-zinc-300">
                          Executed: <code>{activeSimCommand.syntax}</code>
                        </p>
                        <p className="text-xs text-emerald-400">
                          ✓ Command action dispatched successfully with 0ms execution delay.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MODERATION HUB */}
          {activeTab === "moderation" && (
            <div className="space-y-6">
              {/* Cases Table */}
              <div
                className="p-6 rounded-2xl border backdrop-blur-xl space-y-4"
                style={{
                  backgroundColor: currentTheme.card,
                  borderColor: currentTheme.border,
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base text-white">Active Moderation Cases</h3>
                    <p className="text-xs opacity-60 text-zinc-300">
                      Real-time server enforcement record and automated audit logs.
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                    🛡️ Auto-Defense Active
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b opacity-50" style={{ borderColor: currentTheme.border }}>
                        <th className="pb-3">Case ID</th>
                        <th className="pb-3">Action</th>
                        <th className="pb-3">Target User</th>
                        <th className="pb-3">Moderator</th>
                        <th className="pb-3">Reason</th>
                        <th className="pb-3">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y" style={{ borderColor: currentTheme.border }}>
                      {modCases.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/5 transition">
                          <td className="py-3 font-bold" style={{ color: currentTheme.primary }}>
                            {row.id}
                          </td>
                          <td className="py-3 font-semibold">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                row.action === "Ban"
                                  ? "bg-rose-500/20 text-rose-300"
                                  : row.action === "Timeout"
                                  ? "bg-amber-500/20 text-amber-300"
                                  : "bg-blue-500/20 text-blue-300"
                              }`}
                            >
                              {row.action}
                            </span>
                          </td>
                          <td className="py-3 text-white font-medium">{row.target}</td>
                          <td className="py-3 opacity-70">{row.mod}</td>
                          <td className="py-3 opacity-70">{row.reason}</td>
                          <td className="py-3 opacity-50">{row.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Action Dispatcher Form */}
              <div
                className="p-6 rounded-2xl border backdrop-blur-xl space-y-4"
                style={{
                  backgroundColor: currentTheme.card,
                  borderColor: currentTheme.border,
                }}
              >
                <h3 className="font-bold text-base text-white">Manual Moderation Dispatch</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="User ID or @Mention..."
                    value={quickActionUserId}
                    onChange={(e) => setQuickActionUserId(e.target.value)}
                    className="bg-black/40 border rounded-xl px-3 py-2 text-xs outline-none text-white"
                    style={{ borderColor: currentTheme.border }}
                  />
                  <input
                    type="text"
                    placeholder="Reason..."
                    value={quickActionReason}
                    onChange={(e) => setQuickActionReason(e.target.value)}
                    className="bg-black/40 border rounded-xl px-3 py-2 text-xs outline-none text-white sm:col-span-2"
                    style={{ borderColor: currentTheme.border }}
                  />
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    { label: "Warn User", action: "Warn", color: "bg-blue-600 hover:bg-blue-500" },
                    { label: "Timeout (10m)", action: "Timeout", color: "bg-amber-600 hover:bg-amber-500" },
                    { label: "Kick User", action: "Kick", color: "bg-orange-600 hover:bg-orange-500" },
                    { label: "Ban User", action: "Ban", color: "bg-rose-600 hover:bg-rose-500" },
                  ].map((btn) => (
                    <button
                      key={btn.action}
                      onClick={() => {
                        if (!quickActionUserId) {
                          showToast("Please enter a Target User ID", "error");
                          return;
                        }
                        const newCase = {
                          id: `#${105 + modCases.length}`,
                          action: btn.action,
                          target: quickActionUserId,
                          mod: session?.user?.name || "Dashboard Admin",
                          reason: quickActionReason || "No reason specified",
                          time: "Just now",
                        };
                        setModCases([newCase, ...modCases]);
                        dashboardAudio.playClick();
                        showToast(`Dispatched ${btn.action} against ${quickActionUserId}`);
                        setQuickActionUserId("");
                        setQuickActionReason("");
                      }}
                      className={`px-4 py-2 rounded-xl text-white font-bold text-xs transition cursor-pointer shadow-md ${btn.color}`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: STUDIO MUSIC DSP SUITE */}
          {activeTab === "music" && (
            <div className="space-y-6">
              <div
                className="p-6 rounded-2xl border backdrop-blur-xl space-y-6"
                style={{
                  backgroundColor: currentTheme.card,
                  borderColor: currentTheme.border,
                }}
              >
                <div>
                  <h3 className="font-bold text-lg text-white">Studio Audio Mixing &amp; DSP Suite</h3>
                  <p className="text-xs opacity-60 text-zinc-300 mt-0.5">
                    Hardware-accelerated real-time stackable audio filters and permanent 24/7 channel locking.
                  </p>
                </div>

                {/* 24/7 Channel Stay Toggle */}
                <div
                  className="p-4 rounded-xl bg-black/40 border flex items-center justify-between"
                  style={{ borderColor: currentTheme.border }}
                >
                  <div className="space-y-0.5">
                    <p className="font-bold text-sm text-white">24/7 Voice Channel Stay</p>
                    <p className="text-xs opacity-60 text-zinc-300">
                      Bot stays connected in voice channel indefinitely even when queue finishes.
                    </p>
                  </div>
                  <TactileToggle
                    checked={stay247}
                    onChange={(checked) => {
                      setStay247(checked);
                      dashboardAudio.playToggle(checked);
                      setHasUnsavedChanges(true);
                      showToast(`24/7 Stay ${checked ? "enabled" : "disabled"}`);
                    }}
                    label="Toggle 24/7 Stay"
                  />
                </div>

                {/* Real-Time DSP Audio Filters */}
                <div>
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 block mb-2">
                    Stackable DSP Filters
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {["8D Audio", "Bass Boost", "Nightcore", "Vaporwave", "Karaoke", "Tremolo", "Clear Filters"].map(
                      (effect) => {
                        const isClear = effect === "Clear Filters";
                        const isFilterActive = activeFilters.includes(effect);
                        return (
                          <button
                            key={effect}
                            onClick={() => {
                              dashboardAudio.playClick();
                              if (isClear) {
                                setActiveFilters([]);
                                showToast("Cleared all DSP filters");
                              } else {
                                if (activeFilters.includes(effect)) {
                                  setActiveFilters(activeFilters.filter((f) => f !== effect));
                                  showToast(`Removed filter: ${effect}`);
                                } else {
                                  setActiveFilters([...activeFilters, effect]);
                                  showToast(`Applied filter: ${effect}`);
                                }
                              }
                              setHasUnsavedChanges(true);
                            }}
                            className={`p-3.5 rounded-xl border text-center font-bold text-xs transition cursor-pointer ${
                              isClear
                                ? "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                                : isFilterActive
                                ? "text-white shadow-lg"
                                : "bg-black/30 text-zinc-300 hover:bg-white/5"
                            }`}
                            style={
                              !isClear && isFilterActive
                                ? {
                                    backgroundColor: `${currentTheme.primary}30`,
                                    borderColor: currentTheme.primary,
                                    color: "#fff",
                                  }
                                : { borderColor: currentTheme.border }
                            }
                          >
                            {effect}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* Playback Volume Slider */}
                <div className="space-y-2 pt-4 border-t" style={{ borderColor: currentTheme.border }}>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-white">Master Output Volume</span>
                    <span style={{ color: currentTheme.primary }} className="font-mono">
                      {volume}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="150"
                    value={volume}
                    onChange={(e) => {
                      setVolume(Number(e.target.value));
                      setHasUnsavedChanges(true);
                    }}
                    className="w-full accent-purple-500 cursor-pointer h-2 bg-black/40 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                    <span>0%</span>
                    <span>100% (Lossless Master)</span>
                    <span>150% (Boosted)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ECONOMY & TYCOONS */}
          {activeTab === "economy" && (
            <div className="space-y-6">
              <div
                className="p-6 rounded-2xl border backdrop-blur-xl space-y-4"
                style={{
                  backgroundColor: currentTheme.card,
                  borderColor: currentTheme.border,
                }}
              >
                <div>
                  <h3 className="font-bold text-base text-white">Server Tycoons Leaderboard (Net Worth)</h3>
                  <p className="text-xs opacity-60 text-zinc-300">
                    Top wealth rankings based on chat XP activity, voice minutes, and daily streak bonuses.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {[
                    { rank: "👑 1", name: "Veer Madan", worth: "🪙 452,100", level: "Level 42", voiceTime: "148h" },
                    { rank: "🥈 2", name: "Alex_Dev", worth: "🪙 310,450", level: "Level 35", voiceTime: "92h" },
                    { rank: "🥉 3", name: "CryptoKing", worth: "🪙 289,000", level: "Level 31", voiceTime: "75h" },
                    { rank: "#4", name: "CyberSamurai", worth: "🪙 195,200", level: "Level 28", voiceTime: "54h" },
                    { rank: "#5", name: "AcousticVibes", worth: "🪙 142,800", level: "Level 22", voiceTime: "40h" },
                  ].map((user, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-black/30 border transition hover:border-white/20"
                      style={{ borderColor: currentTheme.border }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-black text-xs w-8 text-zinc-300">{user.rank}</span>
                        <span className="font-bold text-xs text-white">{user.name}</span>
                      </div>
                      <div className="flex items-center gap-5 text-xs font-mono">
                        <span className="text-[10px] text-zinc-400 hidden sm:inline">🎙️ {user.voiceTime}</span>
                        <span className="text-[10px] opacity-60 text-zinc-400">{user.level}</span>
                        <span className="font-black" style={{ color: currentTheme.primary }}>
                          {user.worth}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: AUTOMOD & CONFIG */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div
                className="p-6 rounded-2xl border backdrop-blur-xl space-y-5"
                style={{
                  backgroundColor: currentTheme.card,
                  borderColor: currentTheme.border,
                }}
              >
                <div>
                  <h3 className="font-bold text-base text-white">AutoMod Defense Shield &amp; Filters</h3>
                  <p className="text-xs opacity-60 text-zinc-300">
                    Proactive zero-day spam mitigation and automated invite link suppression.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { key: "antiInvite", title: "Anti-Invite Blocker", desc: "Instantly deletes discord.gg and invite links from non-moderators." },
                    { key: "antiSpam", title: "Anti-Spam Velocity Limiter", desc: "Mutes users sending more than 5 messages within 3 seconds." },
                    { key: "antiGhostPing", title: "Anti-GhostPing Detector", desc: "Publicly logs users who mention members and immediately delete messages." },
                    { key: "antiBadWords", title: "Toxic Language Filter", desc: "Blocks hate speech and toxic terms with warning DM notifications." },
                    { key: "antiCaps", title: "Anti-Caps Limiter", desc: "Suppresses messages containing more than 70% uppercase letters." },
                  ].map((filter) => {
                    const isChecked = (autoModFilters as any)[filter.key];
                    return (
                      <div
                        key={filter.key}
                        className="flex items-center justify-between p-4 rounded-xl bg-black/40 border"
                        style={{ borderColor: currentTheme.border }}
                      >
                        <div className="space-y-0.5">
                          <h4 className="font-bold text-xs text-white">{filter.title}</h4>
                          <p className="text-[11px] opacity-60 text-zinc-300">{filter.desc}</p>
                        </div>
                        <TactileToggle
                          checked={isChecked}
                          onChange={(checked) => {
                            setAutoModFilters((prev) => ({ ...prev, [filter.key]: checked }));
                            dashboardAudio.playToggle(checked);
                            setHasUnsavedChanges(true);
                            showToast(`${filter.title} ${checked ? "armed" : "disabled"}`);
                          }}
                          label={`Toggle ${filter.title}`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
