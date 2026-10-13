"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Server, Plus, ChevronRight, Search, Radio, ArrowLeft, 
  ExternalLink, Bell, Video, Sparkles, ShieldCheck, 
  Lock, Copy, Check, Hash, Send, Zap
} from "lucide-react";
import { DiscordLogo, DiscordVerifiedBadge, DiscordAppPill } from "@/app/components/BrandIcons";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { dashboardAudio } from "@/lib/dashboardAudio";

interface AlertCommandSpec {
  name: string;
  category: "setup" | "management" | "roles" | "system";
  syntax: string;
  userCommand: string;
  description: string;
  badge?: string;
  botResponse: {
    embedTitle: string;
    embedColor: string;
    embedDesc: string;
    platformBadge: string;
    fields?: Array<{ name: string; value: string; inline?: boolean }>;
    footer?: string;
    rolePing?: string;
  };
}

export default function PingPlexLandingPage() {
  const [selectedCommandIdx, setSelectedCommandIdx] = useState<number>(0);
  const [commandCategory, setCommandCategory] = useState<string>("all");
  const [commandSearch, setCommandSearch] = useState<string>("");
  const [copiedCmd, setCopiedCmd] = useState<boolean>(false);

  // Preset Template State
  const [copiedPreset, setCopiedPreset] = useState<string | null>(null);

  // Live Typing & Sending Simulation State Machine
  const [simStep, setSimStep] = useState<"idle" | "typing" | "sent" | "bot_thinking" | "bot_responded">("bot_responded");
  const [typedInputText, setTypedInputText] = useState<string>("");
  const simTimeoutRef = useRef<NodeJS.Timeout[]>([]);

  const presetTemplates = [
    {
      id: "hype",
      label: "🔥 Hype Alert",
      text: "{role} 🚨 **{author}** just dropped something CRAZY! Go check it out: {url}",
    },
    {
      id: "stream",
      label: "🎮 Stream Live",
      text: "{role} 🔴 **{author}** is now LIVE playing **{game}**! Come chill: {url}",
    },
    {
      id: "clean",
      label: "✨ Minimalist Clean",
      text: "{role} **{author}** • {title} \n{url}",
    },
    {
      id: "chill",
      label: "☕ Community Chill",
      text: "{role} New drop from **{author}**! Grab snacks and enjoy: {url}",
    },
  ];

  const alertCommands: AlertCommandSpec[] = [
    {
      name: "/alert setup youtube",
      category: "setup",
      syntax: "/alert setup youtube <channel_url> <discord_channel>",
      userCommand: "/alert setup youtube channel: https://youtube.com/@VePlexity channel: #announcements",
      description: "Listens for new YouTube video uploads, Shorts drops, and scheduled premiere broadcasts in real-time.",
      badge: "Real-time RSS",
      botResponse: {
        embedTitle: "🔴 YouTube Upload Alert Connected",
        embedColor: "#ef4444",
        platformBadge: "YOUTUBE • 1080P60",
        rolePing: "@everyone",
        embedDesc: "**Channel:** VePlexity Network\n**Destination:** <#announcements>\n**Status:** Sub-second Webhook Listener Active\n\nWhenever a new video or YouTube Short publishes, PingPlex will dispatch the video title, high-res thumbnail, and direct link.",
        fields: [
          { name: "Target Channel", value: "https://youtube.com/@VePlexity", inline: true },
          { name: "Ping Role", value: "@everyone", inline: true },
          { name: "Latency", value: "<1.2s", inline: true }
        ],
        footer: "PingPlex Studio Webhook Daemon • 100% Free Feeds"
      }
    },
    {
      name: "/alert setup twitch",
      category: "setup",
      syntax: "/alert setup twitch <streamer_login> <discord_channel>",
      userCommand: "/alert setup twitch streamer: veplexity channel: #stream-alerts",
      description: "Connects low-latency Twitch EventSub Webhooks for instant live notifications with game title and viewer counts.",
      badge: "Sub-Second EventSub",
      botResponse: {
        embedTitle: "🟣 Twitch Stream Webhook Operational",
        embedColor: "#9333ea",
        platformBadge: "TWITCH LIVE BROADCAST",
        rolePing: "@StreamSquad",
        embedDesc: "**Streamer:** veplexity\n**Category:** Just Chatting\n**Title:** Late Night Coding & Chill Sessions\n**Destination:** <#stream-alerts>",
        fields: [
          { name: "Live Status", value: "🔴 Broadcast Started", inline: true },
          { name: "Ping Mention", value: "<@&StreamSquad>", inline: true },
          { name: "EventSub Sync", value: "Active (24ms)", inline: true }
        ],
        footer: "PingPlex Twitch EventSub Gateway"
      }
    },
    {
      name: "/alert setup reddit",
      category: "setup",
      syntax: "/alert setup reddit <subreddit> <discord_channel>",
      userCommand: "/alert setup reddit subreddit: r/Discord_Bots channel: #dev-feed",
      description: "Monitors any public subreddit for hot submissions, new inquiries, and media posts.",
      badge: "Subreddit Sync",
      botResponse: {
        embedTitle: "🟠 Subreddit Monitor Synchronized",
        embedColor: "#f97316",
        platformBadge: "REDDIT FEED • R/DISCORD_BOTS",
        embedDesc: "**Subreddit:** r/Discord_Bots\n**Polling Interval:** 30 seconds\n**Destination:** <#dev-feed>",
        fields: [
          { name: "Filtered Tag", value: "All Posts", inline: true },
          { name: "Media Previews", value: "High-Res Embeds", inline: true }
        ],
        footer: "PingPlex Reddit Polling Engine"
      }
    },
    {
      name: "/alert pingrole",
      category: "roles",
      syntax: "/alert pingrole <role>",
      userCommand: "/alert pingrole role: @StreamSquad",
      description: "Assigns targeted role mentions for announcements, preventing unnecessary ping fatigue across the server.",
      badge: "Targeted Ping",
      botResponse: {
        embedTitle: "🔔 Notification Role Configured",
        embedColor: "#d946ef",
        platformBadge: "ROLE MENTION SYNC",
        embedDesc: "Alerts will now ping **<@&StreamSquad>** instead of @everyone.\nServer members can toggle this role to customize notification preferences.",
        fields: [
          { name: "Assigned Role", value: "@StreamSquad", inline: true },
          { name: "Anti-Fatigue", value: "Active", inline: true }
        ],
        footer: "PingPlex Smart Role Filters"
      }
    },
    {
      name: "/pingplex status",
      category: "system",
      syntax: "/pingplex status",
      userCommand: "/pingplex status",
      description: "Queries PingPlex Render cloud cluster health, webhook latency, and polling intervals.",
      badge: "Cluster Status",
      botResponse: {
        embedTitle: "📊 PingPlex Cloud Infrastructure",
        embedColor: "#8b5cf6",
        platformBadge: "RENDER BACKEND ONLINE",
        embedDesc: "**Cluster Status:** 100% Operational (99.99% Uptime)\n**API Endpoint:** `https://pingplex.onrender.com`\n**Active Feed Monitors:** Unlimited Tier (Free)",
        fields: [
          { name: "Webhook Latency", value: "32ms", inline: true },
          { name: "Memory Usage", value: "68MB / 512MB", inline: true },
          { name: "Worker Health", value: "All Active", inline: true }
        ],
        footer: "PingPlex High-Availability Dispatcher"
      }
    }
  ];

  const filteredCommands = alertCommands.filter((cmd) => {
    const matchesCat = commandCategory === "all" || cmd.category === commandCategory;
    const matchesQuery = 
      cmd.name.toLowerCase().includes(commandSearch.toLowerCase()) ||
      cmd.syntax.toLowerCase().includes(commandSearch.toLowerCase()) ||
      cmd.description.toLowerCase().includes(commandSearch.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const activeCmd = alertCommands[selectedCommandIdx] || alertCommands[0];

  const runLiveCommandSimulation = (targetCmd: AlertCommandSpec) => {
    simTimeoutRef.current.forEach(clearTimeout);
    simTimeoutRef.current = [];

    setSimStep("typing");
    setTypedInputText("");

    const fullStr = targetCmd.userCommand;
    let curr = 0;

    const intervalId = setInterval(() => {
      curr++;
      setTypedInputText(fullStr.slice(0, curr));
      if (curr >= fullStr.length) {
        clearInterval(intervalId);
        const t1 = setTimeout(() => {
          setSimStep("sent");
          setTypedInputText("");
          const t2 = setTimeout(() => {
            setSimStep("bot_thinking");
            const t3 = setTimeout(() => {
              setSimStep("bot_responded");
            }, 500);
            simTimeoutRef.current.push(t3);
          }, 350);
          simTimeoutRef.current.push(t2);
        }, 220);
        simTimeoutRef.current.push(t1);
      }
    }, 20);
  };

  const handleSelectCommand = (idx: number) => {
    dashboardAudio.playClick();
    setSelectedCommandIdx(idx);
    runLiveCommandSimulation(alertCommands[idx]);
  };

  return (
    <div className="min-h-screen bg-[#07030a] text-zinc-100 flex flex-col font-sans selection:bg-fuchsia-500/30 relative overflow-x-hidden">
      <Navbar />

      {/* Atmospheric Soft Glows */}
      <div className="fixed top-0 right-1/4 w-[750px] h-[750px] bg-gradient-to-br from-fuchsia-600/15 via-purple-600/10 to-transparent rounded-full blur-[170px] pointer-events-none" />
      <div className="fixed top-1/2 left-1/4 w-[750px] h-[750px] bg-gradient-to-tr from-purple-600/15 via-rose-600/10 to-transparent rounded-full blur-[170px] pointer-events-none" />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 relative z-10">
        
        {/* ─── HERO SECTION: BOT SHOWCASE & DUAL CTAS ─────────────────────── */}
        <section className="relative pb-12 border-b border-zinc-800 space-y-6">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Link href="/discord-bot" className="hover:text-white transition-colors flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Discord Bots</span>
            </Link>
            <span>/</span>
            <span className="text-fuchsia-400 font-bold">PingPlex</span>
          </div>

          <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
            
            {/* Left: Brand Identity & Descriptions */}
            <div className="space-y-6 max-w-3xl">
              
              {/* Unboxed Logo + Title Lockup */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="relative shrink-0 flex items-center justify-center">
                  <img 
                    src="/bots/pingplex-avatar.png" 
                    alt="PingPlex Official Logo" 
                    className="w-24 h-24 sm:w-28 sm:h-28 object-contain filter drop-shadow-[0_12px_28px_rgba(217,70,239,0.6)]"
                    onError={(e) => { e.currentTarget.src = "/bots/pp.png"; }}
                  />
                </div>

                <div className="space-y-2 text-center sm:text-left">
                  <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/40 text-fuchsia-300 font-bold uppercase tracking-wider">
                      CREATOR ALERT ENGINE • ZERO PAYWALLS
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Render Cluster Live</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-3 justify-center sm:justify-start flex-wrap">
                    <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase leading-none">
                      PINGPLEX
                    </h1>
                    <DiscordVerifiedBadge className="w-7 h-7 shrink-0" />
                    <DiscordAppPill />
                  </div>

                  <p className="text-xs font-mono text-zinc-400">
                    Application ID: <span className="text-zinc-200">1559520031916687430</span> • Low-Latency Webhooks Gateway
                  </p>
                </div>
              </div>

              {/* Subtitle Overview */}
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
                The zero-delay creator alert engine for Discord communities. Deliver instantaneous, high-fidelity notifications for <strong>YouTube uploads &amp; shorts</strong>, <strong>Twitch live streams</strong>, <strong>TikTok videos</strong>, <strong>X (Twitter) posts</strong>, and <strong>Reddit threads</strong> — 100% free with unlimited feeds and custom mention presets.
              </p>

              {/* Capability Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  "Sub-Second Twitch EventSub Webhooks",
                  "YouTube Upload & Shorts Alerts",
                  "100% Free Unlimited Feeds",
                  "1-Click Message Presets",
                  "Custom Ping Roles (@StreamSquad)",
                  "Dedicated Render Cloud Cluster"
                ].map((pill, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-[#0c0716] border border-fuchsia-500/20 text-xs font-mono text-zinc-300 font-semibold shadow-sm">
                    ✓ {pill}
                  </span>
                ))}
              </div>

              {/* ── DUAL ACTION CTAS: ADD TO SERVER & SEPARATE STUDIO DASHBOARD BUTTON ── */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-3">
                <a
                  href="/invite/pingplex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-rose-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-black text-sm tracking-wide uppercase transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-fuchsia-600/25 active:scale-95 group cursor-pointer"
                >
                  <DiscordLogo className="w-5 h-5" fill="#ffffff" />
                  <span>Add to Server</span>
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </a>

                <Link
                  href="/discord-bots/pingplex/dashboard"
                  onClick={() => dashboardAudio.playClick()}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#180a24] hover:bg-[#230f34] border-2 border-fuchsia-500/40 hover:border-fuchsia-500/80 text-white font-black text-sm tracking-wide uppercase transition-all flex items-center justify-center gap-2.5 shadow-lg active:scale-95 group cursor-pointer"
                >
                  <Radio className="w-5 h-5 text-fuchsia-400" />
                  <span>Launch Studio Dashboard</span>
                  <ChevronRight className="w-4 h-4 text-fuchsia-400 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right: Quick Features Deck */}
            <div className="w-full lg:w-80 rounded-3xl bg-[#0c0716]/95 border-2 border-fuchsia-500/30 p-6 space-y-4 shadow-xl shrink-0 backdrop-blur-xl">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-fuchsia-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>STUDIO CONTROLS</span>
              </span>

              <div className="space-y-3 text-xs font-mono text-zinc-300">
                <div className="p-3 rounded-xl bg-black/50 border border-zinc-800 space-y-1">
                  <p className="text-fuchsia-300 font-bold">📡 Multi-Platform Feeds</p>
                  <p className="text-[11px] text-zinc-400">YouTube, Twitch, TikTok, X, and Reddit supported.</p>
                </div>

                <div className="p-3 rounded-xl bg-black/50 border border-zinc-800 space-y-1">
                  <p className="text-rose-300 font-bold">⚡ Zero Polling Lag</p>
                  <p className="text-[11px] text-zinc-400">Low-latency Twitch EventSub &amp; YouTube PubSubHubbub.</p>
                </div>

                <div className="p-3 rounded-xl bg-black/50 border border-zinc-800 space-y-1">
                  <p className="text-purple-300 font-bold">🎯 Targeted Mentions</p>
                  <p className="text-[11px] text-zinc-400">Ping specific roles instead of annoying @everyone.</p>
                </div>
              </div>

              <Link
                href="/discord-bots/pingplex/dashboard"
                className="w-full py-2.5 px-4 rounded-xl bg-fuchsia-500/15 hover:bg-fuchsia-500/25 border border-fuchsia-500/40 text-fuchsia-300 text-xs font-mono font-bold flex items-center justify-between transition"
              >
                <span>Open Dedicated Studio</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── 1-CLICK MESSAGE TEMPLATE PRESET STUDIO ───────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="space-y-1">
              <span className="text-xs font-mono text-fuchsia-400 font-bold uppercase tracking-wider">
                1-CLICK TEMPLATE PRESETS
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase">
                COMMUNITY ALERT PRESETS
              </h3>
            </div>
            <span className="text-xs font-mono text-zinc-400">
              Live in PingPlex Studio on Render
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {presetTemplates.map((preset) => (
              <div
                key={preset.id}
                className="p-4 rounded-2xl bg-[#0c0716] border border-fuchsia-500/25 hover:border-fuchsia-500/50 transition flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-white font-mono block">
                    {preset.label}
                  </span>
                  <p className="text-xs font-mono text-zinc-300 bg-black/60 p-2.5 rounded-lg border border-zinc-800 break-words">
                    {preset.text}
                  </p>
                </div>

                <button
                  onClick={() => {
                    dashboardAudio.playClick();
                    navigator.clipboard.writeText(preset.text);
                    setCopiedPreset(preset.id);
                    setTimeout(() => setCopiedPreset(null), 2000);
                  }}
                  className="w-full py-1.5 rounded-lg bg-fuchsia-500/15 hover:bg-fuchsia-500/25 border border-fuchsia-500/30 text-white text-xs font-bold font-mono transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copiedPreset === preset.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied Preset</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Template</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ─── INTERACTIVE LIVE TYPING COMMAND SIMULATOR ───────────────────── */}
        <section id="command-console" className="space-y-6 pt-2 scroll-mt-24">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-mono text-fuchsia-400 font-bold uppercase tracking-wider">
              HIGH-FIDELITY DISCORD SIMULATOR
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              ALERT COMMAND VISUALIZER
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Select any alert command to watch simulated character typing, Discord webhook dispatch, and rich alert embeds.
            </p>
          </div>

          {/* Workbench Grid: Left Command List + Right Live Discord Chat */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* ── LEFT: SCROLLABLE COMMAND LIST (4 Cols) ── */}
            <div className="lg:col-span-4 rounded-3xl bg-[#0c0716] border border-fuchsia-500/20 p-4 sm:p-5 flex flex-col space-y-3.5 shadow-xl max-h-[620px]">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Filter alert commands..."
                  value={commandSearch}
                  onChange={(e) => setCommandSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-black border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-fuchsia-500/50"
                />
              </div>

              {/* Command Items */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {filteredCommands.length === 0 ? (
                  <p className="text-xs text-zinc-500 text-center py-8">No commands matching query.</p>
                ) : (
                  filteredCommands.map((cmd) => {
                    const isSelected = activeCmd.name === cmd.name;
                    return (
                      <button
                        key={cmd.name}
                        onClick={() => {
                          const originalIdx = alertCommands.findIndex(c => c.name === cmd.name);
                          handleSelectCommand(originalIdx >= 0 ? originalIdx : 0);
                        }}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between group cursor-pointer ${
                          isSelected
                            ? "bg-gradient-to-r from-fuchsia-600/20 via-purple-600/15 to-transparent border-fuchsia-500/70 shadow-md shadow-fuchsia-500/15"
                            : "bg-[#090312] border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/40"
                        }`}
                      >
                        <div className="space-y-1 min-w-0 pr-2">
                          <div className="flex items-center gap-2">
                            <span className={`font-mono text-xs font-black truncate ${
                              isSelected ? "text-fuchsia-400" : "text-white group-hover:text-fuchsia-300"
                            }`}>
                              {cmd.name}
                            </span>
                            {cmd.badge && (
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-fuchsia-500/15 border border-fuchsia-500/30 text-fuchsia-300 font-bold shrink-0">
                                {cmd.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-zinc-400 truncate font-normal">
                            {cmd.description}
                          </p>
                        </div>

                        <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                          isSelected ? "text-fuchsia-400 translate-x-1" : "text-zinc-600 group-hover:text-zinc-400"
                        }`} />
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* ── RIGHT: LIVE DISCORD CHAT SCREEN WITH LIVE TYPING (8 Cols) ── */}
            <div className="lg:col-span-8 rounded-3xl bg-[#1e1f22] border border-zinc-700/60 shadow-2xl overflow-hidden flex flex-col font-sans">
              
              {/* Discord Channel Header Bar */}
              <div className="h-12 px-5 bg-[#2b2d31] border-b border-zinc-800 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 text-zinc-200">
                  <Hash className="w-5 h-5 text-zinc-400" />
                  <span className="font-bold text-xs">announcements</span>
                  <span className="text-zinc-500 text-xs hidden sm:inline">|</span>
                  <span className="text-[11px] text-zinc-400 font-mono hidden sm:inline">
                    Simulated PingPlex Webhook Feed
                  </span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                    ● CLUSTER LIVE
                  </span>
                </div>
              </div>

              {/* Discord Chat Area */}
              <div className="p-5 sm:p-6 space-y-6 flex-1 min-h-[460px] bg-[#313338]/40">
                
                {/* 1. User Message (Trigger) */}
                {simStep !== "typing" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-3.5"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-fuchsia-500 to-purple-500 p-0.5 shrink-0">
                      <div className="w-full h-full rounded-full bg-[#180a22] flex items-center justify-center font-bold text-xs text-white">
                        VM
                      </div>
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">Veer</span>
                        <span className="text-[10px] text-zinc-400">Today at 8:45 PM</span>
                      </div>
                      {/* User Command Bubble */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#2b2d31] border border-zinc-700 text-fuchsia-300 font-mono text-xs">
                        <span>{activeCmd.userCommand}</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2. Bot Thinking Indicator */}
                {simStep === "bot_thinking" && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3 pl-2 text-xs text-zinc-400 font-mono"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-[#180824] p-1 shrink-0">
                      <img src="/bots/pingplex-avatar.png" alt="PingPlex" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-[11px]">PingPlex is syncing feed</span>
                      <div className="flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 3. Bot Response Message */}
                {simStep === "bot_responded" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-start gap-3.5 pl-2"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-[#180824] border border-fuchsia-500/50 shrink-0 p-1">
                      <img 
                        src="/bots/pingplex-avatar.png" 
                        alt="PingPlex" 
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black text-white">PingPlex</span>
                        <DiscordVerifiedBadge className="w-3.5 h-3.5" />
                        <span className="text-[9px] px-1 py-0.2 rounded bg-[#5865F2] text-white font-bold font-mono">
                          APP
                        </span>
                        <span className="text-[10px] text-zinc-400">Today at 8:45 PM</span>
                      </div>

                      {/* Rich Discord Embed */}
                      <div 
                        className="rounded-lg bg-[#2b2d31] p-4 space-y-3 text-xs border-l-4 shadow-xl"
                        style={{ borderLeftColor: activeCmd.botResponse.embedColor }}
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
                            {activeCmd.botResponse.platformBadge}
                          </span>
                          <h4 className="font-bold text-sm text-white">
                            {activeCmd.botResponse.embedTitle}
                          </h4>
                        </div>

                        <p className="text-zinc-200 leading-relaxed whitespace-pre-line text-xs font-normal">
                          {activeCmd.botResponse.embedDesc}
                        </p>

                        {/* Embed Fields */}
                        {activeCmd.botResponse.fields && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 border-t border-zinc-700/60">
                            {activeCmd.botResponse.fields.map((field, i) => (
                              <div key={i} className="space-y-0.5">
                                <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase">
                                  {field.name}
                                </span>
                                <p className="text-xs font-mono text-white font-semibold">
                                  {field.value}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Embed Footer */}
                        {activeCmd.botResponse.footer && (
                          <div className="pt-2 text-[10px] font-mono text-zinc-400 border-t border-zinc-700/40">
                            {activeCmd.botResponse.footer}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Bottom Simulated Discord Input Bar */}
              <div className="p-3.5 bg-[#2b2d31] border-t border-zinc-800 flex items-center gap-3">
                <div className="flex-1 h-10 px-4 rounded-lg bg-[#383a40] flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1 text-zinc-200 min-w-0">
                    {simStep === "typing" ? (
                      <>
                        <span className="text-white font-bold">{typedInputText}</span>
                        <span className="w-1.5 h-4 bg-fuchsia-400 animate-pulse inline-block" />
                      </>
                    ) : (
                      <span className="text-zinc-500">Message #announcements</span>
                    )}
                  </div>

                  <button
                    onClick={() => runLiveCommandSimulation(activeCmd)}
                    className="text-zinc-400 hover:text-white transition flex items-center gap-1 text-[11px] font-bold"
                    title="Re-run Live Typing"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    dashboardAudio.playClick();
                    navigator.clipboard.writeText(activeCmd.syntax);
                    setCopiedCmd(true);
                    setTimeout(() => setCopiedCmd(false), 2000);
                  }}
                  className="px-3 py-2 rounded-lg bg-black/60 border border-zinc-700 text-zinc-300 hover:text-white flex items-center gap-1.5 text-xs font-bold shrink-0 font-mono"
                >
                  {copiedCmd ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Syntax</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── ENLISTED LEGAL DOCUMENTS DIRECTORY ─────────────────────────── */}
        <section className="pt-8 border-t border-zinc-800 space-y-6">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-mono text-fuchsia-400 font-bold uppercase tracking-wider">
              LEGAL &amp; COMPLIANCE POLICIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              TERMS &amp; PRIVACY COMPLIANCE
            </h2>
            <p className="text-xs text-zinc-400">
              Complete transparent legal documents directly codified for PingPlex Creator Alert operations.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#0c0716]/95 border-2 border-fuchsia-500/25 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-xl">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-fuchsia-400" />
                <h4 className="text-base font-bold text-white uppercase">Terms of Service</h4>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                By adding PingPlex to your Discord server or configuring webhook channels, you agree to comply with Discord Developer Terms of Service and official platform API policies (YouTube, Twitch, TikTok, X, Reddit).
              </p>
              <div className="space-y-1 text-xs font-mono text-zinc-400">
                <p>• Zero distribution of copyrighted content</p>
                <p>• Adherence to webhook rate limits and anti-spam quotas</p>
                <p>• Free access to all supported platform integrations</p>
              </div>
              <Link
                href="/discord-bot/pingplex/terms"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-fuchsia-400 hover:text-fuchsia-300 transition-colors underline pt-1"
              >
                <span>Read Full Terms of Service</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-purple-400" />
                <h4 className="text-base font-bold text-white uppercase">Privacy Policy</h4>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                PingPlex operates purely as an outward alert dispatcher. The application never reads, stores, or processes general server messages, member DMs, or user profiles.
              </p>
              <div className="space-y-1 text-xs font-mono text-zinc-400">
                <p>• Webhook destination URLs stored with AES-256 encryption</p>
                <p>• Zero harvesting of user communication content</p>
                <p>• Automatic configuration deletion upon bot kick or uninvite</p>
              </div>
              <Link
                href="/discord-bot/pingplex/privacy"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-purple-400 hover:text-purple-300 transition-colors underline pt-1"
              >
                <span>Read Full Privacy Policy</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
