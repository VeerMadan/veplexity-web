"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { 
  Server, Shield, Music, DollarSign, Settings, Terminal, 
  Play, Pause, SkipForward, Volume2, Users, AlertTriangle, 
  CheckCircle, RefreshCw, ChevronRight, Search, Menu, X, 
  Sliders, Lock, Unlock, Zap, Award, Heart, MessageSquare,
  ArrowLeft, ExternalLink, Radio, Check, Copy, Flame, Sparkles
} from "lucide-react";
import { DiscordLogo, DiscordVerifiedBadge, DiscordAppPill } from "@/app/components/BrandIcons";
import { dashboardAudio } from "@/lib/dashboardAudio";

export interface DashboardProps {
  initialGuildId?: string;
  botType?: "veplexity" | "pingplex";
}

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

export default function ProfessionalBotDashboard({
  initialGuildId,
  botType = "veplexity"
}: DashboardProps) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTheme, setSelectedTheme] = useState("blurple");
  const [currentGuild, setCurrentGuild] = useState("VePlexity Official");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(80);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModule, setSelectedModule] = useState("all");

  // Real guilds state
  const [userGuilds, setUserGuilds] = useState<GuildItem[]>([]);
  const [loadingGuilds, setLoadingGuilds] = useState(false);

  // Active audio filters in Studio Music tab
  const [activeFilters, setActiveFilters] = useState<string[]>(["Bass Boost"]);

  // AutoMod toggles state
  const [autoModSettings, setAutoModSettings] = useState({
    antiInvite: true,
    antiSpam: true,
    antiGhostPing: false,
    raidShield: true,
    stay247: true,
    geminiContext: true,
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  // Theme definitions matching SaaS dark palettes
  const themes = {
    blurple: {
      name: "Blurple SaaS",
      bg: "#0C0E14",
      card: "rgba(25, 28, 41, 0.7)",
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
      border: "rgba(236, 72, 153, 0.15)",
      text: "#FDF2F8",
    },
    emerald: {
      name: "Emerald Hacker",
      bg: "#040D0A",
      card: "rgba(10, 26, 20, 0.75)",
      primary: "#10B981",
      accent: "#34D399",
      border: "rgba(16, 185, 129, 0.15)",
      text: "#ECFDF5",
    },
    amber: {
      name: "Sunset Amber",
      bg: "#0F0B08",
      card: "rgba(30, 20, 12, 0.75)",
      primary: "#F59E0B",
      accent: "#EF4444",
      border: "rgba(245, 158, 11, 0.15)",
      text: "#FFFBEB",
    },
    nord: {
      name: "Nordic Frost",
      bg: "#0D1117",
      card: "rgba(22, 27, 34, 0.8)",
      primary: "#38BDF8",
      accent: "#6366F1",
      border: "rgba(56, 189, 248, 0.15)",
      text: "#F0F6FC",
    },
    monochrome: {
      name: "Monochrome Stealth",
      bg: "#09090B",
      card: "rgba(24, 24, 27, 0.8)",
      primary: "#FAFAFA",
      accent: "#A1A1AA",
      border: "rgba(255, 255, 255, 0.1)",
      text: "#FAFAFA",
    },
  };

  const currentTheme = themes[selectedTheme as keyof typeof themes] || themes.blurple;

  // Fetch real Discord guilds if user is authenticated
  useEffect(() => {
    if (status === "authenticated") {
      setLoadingGuilds(true);
      fetch("/api/user/guilds", { cache: "no-store" })
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((data) => {
          const list: GuildItem[] = data.guilds || [];
          setUserGuilds(list);

          // If initialGuildId was passed, match it
          if (initialGuildId) {
            const found = list.find((g) => g.id === initialGuildId);
            if (found) setCurrentGuild(found.name);
          } else if (list.length > 0) {
            setCurrentGuild(list[0].name);
          }
        })
        .catch((err) => {
          console.error("[Dashboard] Could not fetch guilds:", err);
        })
        .finally(() => setLoadingGuilds(false));
    }
  }, [status, initialGuildId]);

  const handleGuildSelectChange = (guildName: string) => {
    dashboardAudio.playClick();
    setCurrentGuild(guildName);
    const matched = userGuilds.find((g) => g.name === guildName);
    if (matched) {
      router.push(`/discord-bots/${botType}/${matched.id}`);
    }
  };

  const toggleFilter = (effectName: string) => {
    dashboardAudio.playClick();
    if (effectName === "Clear Filters") {
      setActiveFilters([]);
      return;
    }
    setActiveFilters((prev) =>
      prev.includes(effectName) ? prev.filter((f) => f !== effectName) : [...prev, effectName]
    );
  };

  const toggleAutoMod = (key: keyof typeof autoModSettings) => {
    dashboardAudio.playClick();
    setAutoModSettings((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
      return next;
    });
  };

  // Commands dataset
  const commandList = [
    { name: "/play", alias: ".p", module: "music", desc: "Stream lossless track or playlist with 48kHz VOIP DSP.", perm: "Everyone" },
    { name: "/aisi-tu", alias: ".song", module: "music", desc: "Play 'Aisi Tu' by Tanvik x VeeRM (Produced & Mastered by Veer Madan).", perm: "Everyone" },
    { name: "/warn", alias: ".w", module: "moderation", desc: "Issue an official recorded warning to a server member.", perm: "Moderate Members" },
    { name: "/timeout", alias: ".mute", module: "moderation", desc: "Place a member in timeout for specified duration.", perm: "Moderate Members" },
    { name: "/purge", alias: ".clear", module: "moderation", desc: "Dual-engine rapid message purge with auto-clearing audit feedback.", perm: "Manage Messages" },
    { name: "/daily", alias: ".d", module: "economy", desc: "Claim daily cash bonus and increment daily streak counter.", perm: "Everyone" },
    { name: "/pay", alias: ".give", module: "economy", desc: "Transfer coins to another server member with instant audit receipt.", perm: "Everyone" },
    { name: "/gemini ask", alias: ".ai", module: "utility", desc: "Query Google Gemini 2.5 multi-modal conversational intelligence.", perm: "Everyone" },
    { name: "/tempvc", alias: ".vc", module: "utility", desc: "Deploy dynamic join-to-create temporary voice lounges.", perm: "Manage Channels" },
    { name: "/rank", alias: ".level", module: "utility", desc: "Render personal XP progression card and server leaderboard rank.", perm: "Everyone" },
    { name: "/automod shield", alias: ".shield", module: "moderation", desc: "Initialize automated anti-raid and mass mention fortress protection.", perm: "Administrator" },
    { name: "/action", alias: ".act", module: "fun", desc: "Perform anime reaction GIF (Hug, Pat, Slap, Bonk, Dance, Highfive).", perm: "Everyone" },
  ];

  const filteredCommands = commandList.filter((cmd) => {
    const matchesMod = selectedModule === "all" || cmd.module === selectedModule;
    const matchesSearch =
      cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.alias.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMod && matchesSearch;
  });

  return (
    <div 
      className="min-h-screen flex font-sans transition-colors duration-300"
      style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}
    >
      {/* ─── SIDEBAR NAVIGATION ────────────────────────────────────────── */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 transform ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-200 ease-in-out border-r backdrop-blur-xl flex flex-col`}
        style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border }}
      >
        {/* Brand Lockup */}
        <div className="p-5 flex items-center justify-between border-b" style={{ borderColor: currentTheme.border }}>
          <Link 
            href="/"
            className="flex items-center gap-3 group"
            title="Return to VePlexity.dev"
          >
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl shadow-lg transition-transform group-hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.accent})`, color: "#fff" }}
            >
              V
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-bold tracking-wide text-sm">VePlexity</h1>
                <DiscordVerifiedBadge className="w-3.5 h-3.5 shrink-0" />
              </div>
              <span className="text-[11px] opacity-60 block">Commercial Bot v2.0</span>
            </div>
          </Link>

          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden p-1 rounded-lg hover:bg-white/10 opacity-70"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {[
            { id: "overview", label: "Overview & Stats", icon: Server },
            { id: "commands", label: "100+ Commands", icon: Terminal },
            { id: "moderation", label: "Moderation Hub", icon: Shield },
            { id: "music", label: "Studio Music", icon: Music },
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
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  isActive ? "shadow-lg" : "opacity-70 hover:opacity-100 hover:bg-white/5"
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
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Back Link to Website */}
        <div className="px-4 py-2">
          <Link
            href="/discord-bot"
            className="flex items-center gap-2 text-xs opacity-60 hover:opacity-100 px-3 py-2 rounded-lg hover:bg-white/5 transition"
          >
            <ArrowLeft size={14} />
            <span>Back to Bot Catalog</span>
          </Link>
        </div>

        {/* Server Switcher Footer */}
        <div className="p-4 border-t" style={{ borderColor: currentTheme.border }}>
          <label className="text-[11px] uppercase tracking-wider opacity-60 block mb-2 font-semibold">
            Active Server
          </label>
          <select 
            value={currentGuild} 
            onChange={(e) => handleGuildSelectChange(e.target.value)}
            className="w-full bg-black/40 border rounded-xl px-3 py-2 text-sm outline-none cursor-pointer"
            style={{ borderColor: currentTheme.border, color: currentTheme.text }}
          >
            {userGuilds.length > 0 ? (
              userGuilds.map((g) => (
                <option key={g.id} value={g.name} className="bg-zinc-900 text-white">
                  {g.name} {g.bots?.veplexity ? "●" : ""}
                </option>
              ))
            ) : (
              <>
                <option value="VePlexity Official" className="bg-zinc-900 text-white">VePlexity Official</option>
                <option value="Lofi Lounge" className="bg-zinc-900 text-white">Lofi Lounge</option>
                <option value="Esports Gaming" className="bg-zinc-900 text-white">Esports Gaming</option>
              </>
            )}
          </select>
        </div>
      </aside>

      {/* ─── MAIN CONTENT AREA ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col md:ml-64 min-w-0">
        
        {/* Top Header */}
        <header 
          className="h-16 border-b px-6 flex items-center justify-between sticky top-0 z-40 backdrop-blur-xl shrink-0"
          style={{ backgroundColor: `${currentTheme.bg}dd`, borderColor: currentTheme.border }}
        >
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden p-2 rounded-lg bg-white/5 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold capitalize">
                {activeTab.replace("-", " ")}
              </h2>
              <span className="text-xs opacity-40 hidden sm:inline">•</span>
              <span className="text-xs opacity-60 font-mono hidden sm:inline truncate max-w-xs">
                {currentGuild}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Theme Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs opacity-60 hidden sm:inline font-mono">Theme:</span>
              <select 
                value={selectedTheme} 
                onChange={(e) => {
                  dashboardAudio.playClick();
                  setSelectedTheme(e.target.value);
                }}
                className="bg-black/30 border rounded-xl px-3 py-1.5 text-xs outline-none cursor-pointer font-medium"
                style={{ borderColor: currentTheme.border, color: currentTheme.text }}
              >
                {Object.entries(themes).map(([key, t]) => (
                  <option key={key} value={key} className="bg-zinc-900 text-white">
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Lavalink Node Online Pill */}
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full text-emerald-400 text-xs font-semibold shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="hidden sm:inline">Lavalink Node Online</span>
              <span className="sm:hidden">Online</span>
            </div>

            {/* Auth Button */}
            {status === "authenticated" ? (
              <button
                onClick={() => signOut()}
                className="p-1.5 rounded-xl hover:bg-white/10 opacity-70 hover:opacity-100 transition"
                title="Sign Out"
              >
                <X size={16} />
              </button>
            ) : (
              <button
                onClick={() => signIn("discord")}
                className="px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 bg-white/10 hover:bg-white/15"
                style={{ border: `1px solid ${currentTheme.border}` }}
              >
                <DiscordLogo className="w-3.5 h-3.5" fill="currentColor" />
                <span className="hidden sm:inline">Log In</span>
              </button>
            )}
          </div>
        </header>

        {/* ─── DYNAMIC TAB VIEWS ───────────────────────────────────────── */}
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          
          {/* TAB 1: OVERVIEW & STATS */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Active Servers", value: "1,482", icon: Server, change: "+12% this week" },
                  { label: "Total Members", value: "342,109", icon: Users, change: "+2,400 today" },
                  { label: "Commands Executed", value: "1.2M", icon: Terminal, change: "99.9% success" },
                  { label: "Audio Latency", value: "18ms", icon: Music, change: "Lossless VOIP Node" },
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div 
                      key={idx} 
                      className="p-5 rounded-2xl border backdrop-blur-xl relative overflow-hidden"
                      style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs opacity-60 font-medium">{stat.label}</p>
                          <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                        </div>
                        <div className="p-3 rounded-xl bg-white/5" style={{ color: currentTheme.primary }}>
                          <Icon size={20} />
                        </div>
                      </div>
                      <p className="text-xs mt-3 opacity-50 font-mono">{stat.change}</p>
                    </div>
                  );
                })}
              </div>

              {/* Quick Widget Row: Studio Music Quick Player + Dual Monetization */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Music Quick Player */}
                <div 
                  className="lg:col-span-2 p-6 rounded-2xl border backdrop-blur-xl space-y-4"
                  style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border }}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-base flex items-center gap-2">
                      <Music size={18} style={{ color: currentTheme.primary }} />
                      <span>Studio Music Quick Player</span>
                    </h3>
                    <span className="text-xs opacity-60 font-mono">Now Playing in Voice</span>
                  </div>

                  <div 
                    className="p-4 rounded-xl bg-black/40 border flex flex-col sm:flex-row items-center gap-4" 
                    style={{ borderColor: currentTheme.border }}
                  >
                    {/* Track Artwork */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-lg shrink-0">
                      <img 
                        src="/music/aisi-tu-cover.png" 
                        alt="Aisi Tu - Tanvik x VeeRM" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <div className="w-full h-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                        🎵
                      </div>
                    </div>

                    <div className="flex-1 text-center sm:text-left min-w-0">
                      <h4 className="font-semibold truncate">Aisi Tu • Tanvik x VeeRM</h4>
                      <p className="text-xs opacity-60 truncate">Production &amp; Mastering: Veer Madan • Lossless 48kHz FLAC</p>
                      
                      <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-300" 
                          style={{ width: isPlaying ? "68%" : "45%", backgroundColor: currentTheme.primary }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          dashboardAudio.playClick();
                          setIsPlaying(!isPlaying);
                        }} 
                        className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition cursor-pointer"
                        title={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                      </button>
                      <button 
                        onClick={() => dashboardAudio.playClick()}
                        className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition cursor-pointer"
                        title="Skip"
                      >
                        <SkipForward size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Monetization / UPI Gateway Card */}
                <div 
                  className="p-6 rounded-2xl border backdrop-blur-xl flex flex-col justify-between"
                  style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border }}
                >
                  <div>
                    <div 
                      className="flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-full w-max mb-3 font-mono" 
                      style={{ background: `${currentTheme.primary}20`, color: currentTheme.primary }}
                    >
                      <Zap size={14} /> Dual Monetization
                    </div>
                    <h3 className="font-semibold text-base">Support VePlexity</h3>
                    <p className="text-xs opacity-60 mt-1">
                      Zero-fee instant UPI donation gateway for server boosters &amp; creator operating nodes.
                    </p>
                  </div>

                  <div className="my-4 p-3 bg-black/30 rounded-xl border text-center" style={{ borderColor: currentTheme.border }}>
                    <p className="text-xs font-mono select-all font-bold" style={{ color: currentTheme.primary }}>
                      madan.45@superyes
                    </p>
                  </div>

                  <a 
                    href="https://buymeacoffee.com/veplexity1" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-xl text-center text-sm font-semibold text-white shadow-lg transition hover:opacity-90 block cursor-pointer"
                    style={{ background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.accent})` }}
                  >
                    Buy Me a Coffee ☕
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 100+ COMMANDS DIRECTORY */}
          {activeTab === "commands" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-3 opacity-40" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search 100+ commands..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black/30 border rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none"
                    style={{ borderColor: currentTheme.border, color: currentTheme.text }}
                  />
                </div>

                <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 custom-scrollbar">
                  {["all", "moderation", "music", "economy", "fun", "utility"].map((mod) => (
                    <button
                      key={mod}
                      onClick={() => {
                        dashboardAudio.playClick();
                        setSelectedModule(mod);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition cursor-pointer ${
                        selectedModule === mod ? "shadow-md" : "opacity-60 hover:opacity-100 bg-white/5"
                      }`}
                      style={selectedModule === mod ? { background: currentTheme.primary, color: "#fff" } : {}}
                    >
                      {mod}
                    </button>
                  ))}
                </div>
              </div>

              {/* Command List Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCommands.length === 0 ? (
                  <p className="text-xs opacity-50 py-10 col-span-2 text-center">No commands matching search criteria.</p>
                ) : (
                  filteredCommands.map((cmd, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 rounded-2xl border backdrop-blur-xl flex flex-col justify-between space-y-3"
                      style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm" style={{ color: currentTheme.primary }}>
                            {cmd.name}
                          </span>
                          <span className="text-xs opacity-40 px-2 py-0.5 rounded bg-white/5 font-mono">
                            Alias: {cmd.alias}
                          </span>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded font-semibold bg-white/5 opacity-70 font-mono">
                          {cmd.module}
                        </span>
                      </div>
                      <p className="text-xs opacity-70 leading-relaxed">{cmd.desc}</p>
                      <div className="flex justify-between items-center text-xs pt-2 border-t font-mono" style={{ borderColor: currentTheme.border }}>
                        <span className="opacity-50">Req. Permission:</span>
                        <span className="font-semibold" style={{ color: currentTheme.accent }}>
                          {cmd.perm}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: MODERATION HUB */}
          {activeTab === "moderation" && (
            <div className="space-y-6">
              <div 
                className="p-6 rounded-2xl border backdrop-blur-xl space-y-4"
                style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-base flex items-center gap-2">
                    <Shield size={18} style={{ color: currentTheme.primary }} />
                    <span>Active Moderation Cases</span>
                  </h3>
                  <span className="text-xs opacity-60 font-mono">Live Audit Logs</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b opacity-50 text-xs font-mono" style={{ borderColor: currentTheme.border }}>
                        <th className="pb-3">Case ID</th>
                        <th className="pb-3">Action</th>
                        <th className="pb-3">Target User</th>
                        <th className="pb-3">Moderator</th>
                        <th className="pb-3">Reason</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y" style={{ borderColor: currentTheme.border }}>
                      {[
                        { id: "#104", action: "Timeout", target: "User_Alpha#1234", mod: "Staff_Mod#9999", reason: "Spamming voice channels" },
                        { id: "#103", action: "Warn", target: "BetaTester#4321", mod: "Admin_Boss#0001", reason: "Inappropriate language in general" },
                        { id: "#102", action: "Ban", target: "RaidBot#0000", mod: "AutoMod Shield", reason: "Anti-Invite mass raid detection" },
                        { id: "#101", action: "Kick", target: "Spammer_99#5512", mod: "Staff_Mod#9999", reason: "Repeated ghost pings in announcements" },
                      ].map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/5 transition">
                          <td className="py-3 font-mono font-bold" style={{ color: currentTheme.primary }}>{row.id}</td>
                          <td className="py-3 font-semibold">
                            <span className="px-2 py-0.5 rounded bg-white/5 text-xs font-mono">
                              {row.action}
                            </span>
                          </td>
                          <td className="py-3 opacity-90 font-mono text-xs">{row.target}</td>
                          <td className="py-3 opacity-70 font-mono text-xs">{row.mod}</td>
                          <td className="py-3 opacity-70 text-xs">{row.reason}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: STUDIO MUSIC */}
          {activeTab === "music" && (
            <div className="space-y-6">
              <div 
                className="p-6 rounded-2xl border backdrop-blur-xl space-y-6"
                style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border }}
              >
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Music size={20} style={{ color: currentTheme.primary }} />
                    <span>Studio Audio Mixing &amp; DSP Suite</span>
                  </h3>
                  <p className="text-xs opacity-60 mt-1">
                    Apply stackable real-time audio filters and manage lossless 48kHz VOIP playback.
                  </p>
                </div>

                {/* DSP Effect Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {["8D Audio", "Bass Boost", "Nightcore", "Vaporwave", "Karaoke", "Tremolo", "Clear Filters"].map((effect, idx) => {
                    const isSelected = activeFilters.includes(effect);
                    return (
                      <button 
                        key={idx} 
                        onClick={() => toggleFilter(effect)}
                        className={`p-4 rounded-xl border text-center font-medium text-xs transition cursor-pointer ${
                          isSelected ? "shadow-md" : "hover:bg-white/10"
                        }`}
                        style={
                          isSelected
                            ? {
                                background: `linear-gradient(135deg, ${currentTheme.primary}30, ${currentTheme.accent}20)`,
                                borderColor: currentTheme.primary,
                                color: currentTheme.primary,
                              }
                            : { borderColor: currentTheme.border }
                        }
                      >
                        {effect}
                      </button>
                    );
                  })}
                </div>

                {/* Playback Volume Slider */}
                <div className="space-y-2 pt-4 border-t" style={{ borderColor: currentTheme.border }}>
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Playback Volume</span>
                    <span style={{ color: currentTheme.primary }}>{volume}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="150" 
                    value={volume} 
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] opacity-40 font-mono">
                    <span>0% (Muted)</span>
                    <span>100% (Standard)</span>
                    <span>150% (Max Boost)</span>
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
                style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-base flex items-center gap-2">
                    <DollarSign size={18} style={{ color: currentTheme.primary }} />
                    <span>Server Tycoons Leaderboard (Net Worth)</span>
                  </h3>
                  <span className="text-xs opacity-60 font-mono">Real-time Coin Matrix</span>
                </div>

                <div className="space-y-3">
                  {[
                    { rank: "👑 1", name: "Veer Madan", worth: "🪙 452,100", level: "Level 42" },
                    { rank: "🥈 2", name: "Alex_Dev", worth: "🪙 310,450", level: "Level 35" },
                    { rank: "🥉 3", name: "CryptoKing", worth: "🪙 289,000", level: "Level 31" },
                    { rank: "4", name: "Luna_Gamer", worth: "🪙 210,800", level: "Level 28" },
                    { rank: "5", name: "NeonRider", worth: "🪙 185,400", level: "Level 24" },
                  ].map((user, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center justify-between p-4 rounded-xl bg-black/30 border transition hover:bg-black/50" 
                      style={{ borderColor: currentTheme.border }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-bold w-8 font-mono">{user.rank}</span>
                        <span className="font-semibold">{user.name}</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-xs opacity-60 font-mono">{user.level}</span>
                        <span className="font-mono font-bold" style={{ color: currentTheme.primary }}>
                          {user.worth}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: AUTOMOD & CONFIG SETTINGS */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div 
                className="p-6 rounded-2xl border backdrop-blur-xl space-y-6"
                style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-base flex items-center gap-2">
                      <Settings size={18} style={{ color: currentTheme.primary }} />
                      <span>AutoMod Defense Shield &amp; Server Configuration</span>
                    </h3>
                    <p className="text-xs opacity-60 mt-1">
                      Toggle active protective sentinel rules and automated server behaviors.
                    </p>
                  </div>

                  {saveSuccess && (
                    <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5">
                      <Check size={14} />
                      <span>Config Saved</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {[
                    { key: "antiInvite" as const, title: "Anti-Invite Blocker", desc: "Automatically deletes unauthorized discord.gg / discord.com/invite links." },
                    { key: "antiSpam" as const, title: "Anti-Spam Velocity Limiter", desc: "Blocks users posting more than 5 messages in 3 seconds." },
                    { key: "antiGhostPing" as const, title: "Anti-GhostPing Detector", desc: "Exposes users who mention members and instantly edit or delete messages." },
                    { key: "raidShield" as const, title: "Automated Raid Shield", desc: "Throttles mass member join spikes and auto-assigns quarantine verification." },
                    { key: "stay247" as const, title: "24/7 Channel Retention", desc: "Prevents music DJ bot from disconnecting when voice channel is empty." },
                    { key: "geminiContext" as const, title: "Gemini Multi-Modal AI Memory", desc: "Retains guild context memory for /gemini conversational reasoning." },
                  ].map((item) => {
                    const active = autoModSettings[item.key];
                    return (
                      <div 
                        key={item.key} 
                        className="flex items-center justify-between p-4 rounded-xl bg-black/30 border transition" 
                        style={{ borderColor: currentTheme.border }}
                      >
                        <div className="pr-4">
                          <h4 className="font-semibold text-sm">{item.title}</h4>
                          <p className="text-xs opacity-60 mt-0.5">{item.desc}</p>
                        </div>
                        <div 
                          onClick={() => toggleAutoMod(item.key)}
                          className="w-12 h-6 rounded-full p-1 cursor-pointer transition shrink-0"
                          style={{ backgroundColor: active ? currentTheme.primary : "rgba(255, 255, 255, 0.1)" }}
                        >
                          <div 
                            className={`w-4 h-4 rounded-full bg-white transform transition ${
                              active ? "translate-x-6" : "translate-x-0"
                            }`} 
                          />
                        </div>
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
