"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Server, ChevronRight, Search, Radio, ArrowLeft, ExternalLink, 
  Bell, Video, Sparkles, ShieldCheck, Lock, Copy, Check, Hash, 
  Send, Zap, Sliders, Globe, Share2, Play
} from "lucide-react";
import { DiscordLogo, DiscordVerifiedBadge, DiscordAppPill } from "@/app/components/BrandIcons";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { dashboardAudio } from "@/lib/dashboardAudio";

interface AlertCommandSpec {
  name: string;
  platform: "youtube" | "twitch" | "reddit" | "roles";
  syntax: string;
  userCommand: string;
  shortDesc: string;
  badge?: string;
  botResponse: {
    embedTitle: string;
    embedColor: string;
    platformBadge: string;
    rolePing: string;
    embedDesc: string;
    thumbnailUrl?: string;
    fields?: Array<{ name: string; value: string; inline?: boolean }>;
    footer?: string;
    buttons?: string[];
  };
}

export default function PingPlexLandingPage() {
  const [selectedCommandIdx, setSelectedCommandIdx] = useState<number>(0);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [copiedCmd, setCopiedCmd] = useState<boolean>(false);
  const [copiedPreset, setCopiedPreset] = useState<string | null>(null);

  // Live Typing Simulation State
  const [simStep, setSimStep] = useState<"idle" | "typing" | "sent" | "bot_thinking" | "bot_responded">("bot_responded");
  const [typedInputText, setTypedInputText] = useState<string>("");
  const simTimeoutRef = useRef<NodeJS.Timeout[]>([]);

  const presetTemplates = [
    {
      id: "hype",
      label: "🔥 Hype Alert",
      text: "{role} 🚨 **{author}** just dropped something CRAZY! Go check it out: {url}",
      tag: "High Energy",
    },
    {
      id: "stream",
      label: "🎮 Stream Live",
      text: "{role} 🔴 **{author}** is now LIVE playing **{game}**! Come chill: {url}",
      tag: "Twitch / Kick",
    },
    {
      id: "clean",
      label: "✨ Minimalist Clean",
      text: "{role} **{author}** • {title} \n{url}",
      tag: "Clean Layout",
    },
    {
      id: "chill",
      label: "☕ Community Chill",
      text: "{role} New drop from **{author}**! Grab snacks and enjoy: {url}",
      tag: "Casual Community",
    },
  ];

  const alertCommands: AlertCommandSpec[] = [
    {
      name: "/alert setup youtube",
      platform: "youtube",
      syntax: "/alert setup youtube <channel_url> <discord_channel>",
      userCommand: "/alert setup youtube channel: https://youtube.com/@VePlexity channel: #announcements",
      shortDesc: "Sub-second YouTube uploads, Shorts, & premiere broadcast alerts.",
      badge: "YouTube Atom RSS",
      botResponse: {
        embedTitle: "🔴 YouTube Upload Alert Connected",
        embedColor: "#ef4444",
        platformBadge: "YOUTUBE • 1080P60",
        rolePing: "@everyone",
        embedDesc: "**Channel:** VePlexity Network\n**Destination:** <#announcements>\n**Status:** Sub-second Webhook Listener Active\n\nWhenever a new video or YouTube Short publishes, PingPlex dispatches the video title, 4K thumbnail, and instant watch link.",
        thumbnailUrl: "/projects/downloader-logo.png",
        fields: [
          { name: "Target Channel", value: "@VePlexity", inline: true },
          { name: "Ping Mention", value: "@everyone", inline: true },
          { name: "Latency", value: "<1.2s", inline: true }
        ],
        footer: "PingPlex Studio Webhook Daemon • 100% Free Feeds",
        buttons: ["Watch on YouTube 📺", "Send Test Alert 🚀"]
      }
    },
    {
      name: "/alert setup twitch",
      platform: "twitch",
      syntax: "/alert setup twitch <streamer_login> <discord_channel>",
      userCommand: "/alert setup twitch streamer: veplexity channel: #stream-alerts",
      shortDesc: "Instant low-latency Twitch EventSub live stream webhooks.",
      badge: "Twitch EventSub",
      botResponse: {
        embedTitle: "🟣 Twitch Stream Webhook Operational",
        embedColor: "#9333ea",
        platformBadge: "TWITCH LIVE BROADCAST",
        rolePing: "@StreamSquad",
        embedDesc: "**Streamer:** veplexity\n**Game:** Just Chatting\n**Title:** Late Night Coding & Chill Sessions\n**Destination:** <#stream-alerts>",
        fields: [
          { name: "Live Status", value: "🔴 Broadcast Started", inline: true },
          { name: "Ping Role", value: "<@&StreamSquad>", inline: true },
          { name: "EventSub Sync", value: "Active (24ms)", inline: true }
        ],
        footer: "PingPlex Twitch EventSub Gateway",
        buttons: ["Join Live Stream 🎮", "Send Test Alert 🚀"]
      }
    },
    {
      name: "/alert setup reddit",
      platform: "reddit",
      syntax: "/alert setup reddit <subreddit> <discord_channel>",
      userCommand: "/alert setup reddit subreddit: r/Discord_Bots channel: #dev-feed",
      shortDesc: "Polls public subreddits for hot posts, memes, and media drops.",
      badge: "Subreddit Sync",
      botResponse: {
        embedTitle: "🟠 Subreddit Monitor Synchronized",
        embedColor: "#f97316",
        platformBadge: "REDDIT FEED • R/DISCORD_BOTS",
        rolePing: "@TechFeed",
        embedDesc: "**Subreddit:** r/Discord_Bots\n**Polling Interval:** 30 seconds\n**Destination:** <#dev-feed>",
        fields: [
          { name: "Filter", value: "All Posts", inline: true },
          { name: "Media Embeds", value: "High-Res Previews", inline: true }
        ],
        footer: "PingPlex Reddit Polling Engine",
        buttons: ["Open on Reddit 🟠", "Send Test Alert 🚀"]
      }
    },
    {
      name: "/alert pingrole",
      platform: "roles",
      syntax: "/alert pingrole <role>",
      userCommand: "/alert pingrole role: @StreamSquad",
      shortDesc: "Configures targeted role pings to eliminate mention fatigue.",
      badge: "Anti-Fatigue",
      botResponse: {
        embedTitle: "🔔 Notification Role Configured",
        embedColor: "#d946ef",
        platformBadge: "ROLE MENTION SYNC",
        rolePing: "@StreamSquad",
        embedDesc: "Alerts will now ping **<@&StreamSquad>** instead of @everyone.\nServer members can toggle this role to customize notification preferences.",
        fields: [
          { name: "Assigned Role", value: "@StreamSquad", inline: true },
          { name: "Ping Fatigue", value: "Shielded", inline: true }
        ],
        footer: "PingPlex Smart Role Filters",
        buttons: ["Test Ping 🔔"]
      }
    }
  ];

  const filteredCommands = alertCommands.filter((cmd) => {
    return selectedPlatform === "all" || cmd.platform === selectedPlatform;
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
            }, 450);
            simTimeoutRef.current.push(t3);
          }, 300);
          simTimeoutRef.current.push(t2);
        }, 180);
        simTimeoutRef.current.push(t1);
      }
    }, 18);
  };

  const handleSelectCommand = (idx: number) => {
    dashboardAudio.playClick();
    setSelectedCommandIdx(idx);
    runLiveCommandSimulation(alertCommands[idx]);
  };

  return (
    <div className="min-h-screen bg-[#050209] text-zinc-100 flex flex-col font-sans selection:bg-fuchsia-500/30 relative overflow-x-hidden">
      <Navbar />

      {/* Atmospheric Soft Glows */}
      <div className="fixed top-0 right-1/4 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(217,70,239,0.12)_0%,transparent_70%)] blur-[170px] pointer-events-none" />
      <div className="fixed top-1/2 left-10 w-[750px] h-[750px] bg-[radial-gradient(circle,rgba(147,51,234,0.10)_0%,transparent_70%)] blur-[170px] pointer-events-none" />

      {/* Subtle Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,#000_60%,transparent_100%)] pointer-events-none" />

      <main className="flex-1 w-full max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10 space-y-12">
        
        {/* ─── 1. CINEMATIC HERO: VISUAL-FIRST BRAND SHOWCASE ──────────────── */}
        <section className="relative rounded-[36px] bg-[#0c0514]/85 border-2 border-fuchsia-500/30 p-8 sm:p-12 backdrop-blur-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_24px_55px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* Subtle Radial Backlight */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,rgba(217,70,239,0.22),transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[radial-gradient(ellipse_at_bottom,rgba(147,51,234,0.12),transparent_70%)] pointer-events-none" />

          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-6">
            <Link href="/discord-bot" className="hover:text-white transition-colors flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Discord Bots Hub</span>
            </Link>
            <span>/</span>
            <span className="text-fuchsia-400 font-bold">PingPlex Alert Engine</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left: Giant Floating Avatar */}
            <div className="lg:col-span-5 flex flex-col items-center text-center space-y-5">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex items-center justify-center group"
              >
                {/* Ambient Halo */}
                <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-fuchsia-500/35 via-purple-500/30 to-rose-500/25 blur-3xl group-hover:scale-110 transition-transform duration-500" />

                <img 
                  src="/bots/pingplex-avatar.png" 
                  alt="PingPlex Bot Avatar" 
                  className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => { e.currentTarget.src = "/bots/pp.png"; }}
                />
              </motion.div>

              {/* Status Indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Render Webhook Cluster Online</span>
              </div>
            </div>

            {/* Right: Titles, Visual Metrics & Actions */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-[11px] font-mono px-3 py-0.5 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/35 text-fuchsia-400 font-bold uppercase tracking-wider">
                    CREATOR ALERT STUDIO // ZERO PAYWALLS
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400">
                    App ID: 1559520031916687430
                  </span>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-none">
                    PINGPLEX
                  </h1>
                  <DiscordVerifiedBadge className="w-7 h-7 shrink-0" />
                  <DiscordAppPill />
                </div>

                <p className="text-sm sm:text-base text-zinc-300 font-medium max-w-xl leading-relaxed">
                  The zero-delay creator notification engine for Discord communities. Instant, high-fidelity alerts for YouTube uploads &amp; Shorts, Twitch live streams, TikTok, X, and Reddit feeds with 1-click presets.
                </p>
              </div>

              {/* Visual Metric Counter Deck */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-0.5">
                  <span className="text-2xl sm:text-3xl font-black text-white font-mono block">&lt;1.2s</span>
                  <span className="text-[10px] font-mono font-bold text-fuchsia-400 uppercase tracking-wider">Webhook Latency</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-0.5">
                  <span className="text-2xl sm:text-3xl font-black text-white font-mono block">5</span>
                  <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider">Social Platforms</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-0.5">
                  <span className="text-2xl sm:text-3xl font-black text-white font-mono block">1-Click</span>
                  <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider">Message Presets</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-0.5">
                  <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono block">100%</span>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">Free (Unlimited)</span>
                </div>
              </div>

              {/* Action Buttons: Add to Server & Launch Studio */}
              <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
                <a
                  href="/invite/pingplex"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => dashboardAudio.playClick()}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-rose-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-black text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-fuchsia-600/25 active:scale-[0.98] cursor-pointer"
                >
                  <DiscordLogo className="w-4 h-4" fill="#ffffff" />
                  <span>Add PingPlex to Server</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/80" />
                </a>

                <Link
                  href="/discord-bots/pingplex/dashboard"
                  onClick={() => dashboardAudio.playClick()}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.09] border border-fuchsia-500/40 hover:border-fuchsia-500/70 text-fuchsia-300 hover:text-white font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
                >
                  <Sliders className="w-4 h-4 text-fuchsia-400" />
                  <span>Launch Creator Studio</span>
                  <ChevronRight className="w-3.5 h-3.5 text-fuchsia-400" />
                </Link>
              </div>

            </div>

          </div>
        </section>

        {/* ─── 2. 1-CLICK MESSAGE PRESETS STUDIO (VISUAL INTERACTIVE CARDS) ── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/10 pb-3">
            <div>
              <span className="text-[10px] font-mono font-bold text-fuchsia-400 uppercase tracking-widest block">
                CREATOR TEMPLATES
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                1-CLICK MESSAGE PRESETS
              </h3>
            </div>
            <span className="text-xs font-mono text-zinc-400">
              Copy any template or deploy directly in PingPlex Studio
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {presetTemplates.map((preset) => (
              <div
                key={preset.id}
                className="p-5 rounded-3xl bg-[#0c0514]/90 border border-fuchsia-500/20 hover:border-fuchsia-500/50 transition-all flex flex-col justify-between space-y-4 shadow-xl group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white font-mono block">
                      {preset.label}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-fuchsia-500/15 text-fuchsia-300 font-bold">
                      {preset.tag}
                    </span>
                  </div>

                  <p className="text-xs font-mono text-zinc-300 bg-black/50 p-3 rounded-xl border border-zinc-800 break-words leading-relaxed">
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
                  className="w-full py-2.5 rounded-xl bg-fuchsia-500/15 hover:bg-fuchsia-500/25 border border-fuchsia-500/35 text-white text-xs font-bold font-mono transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md active:scale-95"
                >
                  {copiedPreset === preset.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied to Clipboard!</span>
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

        {/* ─── 3. HIGH-FIDELITY DISCORD WORKBENCH & ALERT SIMULATOR ────────── */}
        <section id="command-workbench" className="space-y-6 scroll-mt-24">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-fuchsia-400 uppercase tracking-widest block">
                INTERACTIVE ALERT BENCH
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                WEBHOOK DISPATCH SIMULATOR
              </h2>
            </div>

            {/* Platform Filter Switcher */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: "all", label: "All Platforms" },
                { id: "youtube", label: "🔴 YouTube" },
                { id: "twitch", label: "🟣 Twitch" },
                { id: "reddit", label: "🟠 Reddit" },
                { id: "roles", label: "🔔 Mentions" },
              ].map((plat) => (
                <button
                  key={plat.id}
                  onClick={() => {
                    dashboardAudio.playClick();
                    setSelectedPlatform(plat.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                    selectedPlatform === plat.id
                      ? "bg-fuchsia-500 text-black shadow-md shadow-fuchsia-500/25"
                      : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  {plat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Workbench: Left Command Selector + Right Discord Screen */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* ── LEFT: FAST ALERT COMMAND SELECTOR (4 Cols) ── */}
            <div className="lg:col-span-4 rounded-3xl bg-[#0c0514]/90 border border-white/10 p-3 sm:p-4 space-y-2 max-h-[580px] overflow-y-auto custom-scrollbar shadow-xl backdrop-blur-xl">
              {filteredCommands.map((cmd) => {
                const isSelected = activeCmd.name === cmd.name;
                return (
                  <button
                    key={cmd.name}
                    onClick={() => {
                      const idx = alertCommands.findIndex(c => c.name === cmd.name);
                      handleSelectCommand(idx >= 0 ? idx : 0);
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-fuchsia-500/20 via-purple-500/15 to-transparent border-fuchsia-500/60 shadow-lg"
                        : "bg-black/30 border-white/5 hover:border-white/15 hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="space-y-0.5 min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span className={`font-mono text-xs font-black truncate ${
                          isSelected ? "text-fuchsia-400" : "text-white group-hover:text-fuchsia-300"
                        }`}>
                          {cmd.name}
                        </span>
                        {cmd.badge && (
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-zinc-300 font-bold shrink-0">
                            {cmd.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-400 truncate font-normal">
                        {cmd.shortDesc}
                      </p>
                    </div>

                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? "text-fuchsia-400 translate-x-1" : "text-zinc-600 group-hover:text-zinc-400"
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* ── RIGHT: LIVE DISCORD CHAT SCREEN (8 Cols) ── */}
            <div className="lg:col-span-8 rounded-3xl bg-[#1e1f22] border border-zinc-700/60 shadow-2xl overflow-hidden flex flex-col font-sans">
              
              {/* Channel Header Bar */}
              <div className="h-12 px-5 bg-[#2b2d31] border-b border-zinc-800 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 text-zinc-200">
                  <Hash className="w-4 h-4 text-zinc-400" />
                  <span className="font-bold text-xs font-mono">announcements</span>
                  <span className="text-zinc-500 text-xs">•</span>
                  <span className="text-[11px] text-zinc-400 font-mono hidden sm:inline">
                    Simulated Creator Feed Channel
                  </span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                    ● WEBHOOKS LIVE
                  </span>
                </div>
              </div>

              {/* Chat Canvas */}
              <div className="p-5 sm:p-6 space-y-6 flex-1 min-h-[440px] bg-[#313338]/40">
                
                {/* 1. User Setup Dispatch */}
                {simStep !== "typing" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-3.5"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-fuchsia-500 to-purple-500 p-0.5 shrink-0">
                      <div className="w-full h-full rounded-full bg-[#180a22] flex items-center justify-center font-bold text-xs text-white">
                        VM
                      </div>
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">Veer</span>
                        <span className="text-[10px] text-zinc-400">Today at 8:45 PM</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#2b2d31] border border-zinc-700 text-fuchsia-300 font-mono text-xs">
                        <span>{activeCmd.userCommand}</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2. Thinking Indicator */}
                {simStep === "bot_thinking" && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3 pl-2 text-xs text-zinc-400 font-mono"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-[#12081f] p-1 shrink-0">
                      <img src="/bots/pingplex-avatar.png" alt="PingPlex" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-[11px]">PingPlex is connecting webhook</span>
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
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-3.5 pl-2"
                  >
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-[#12081f] border border-fuchsia-500/50 shrink-0 p-1">
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

                      {/* Embed Box */}
                      <div 
                        className="rounded-lg bg-[#2b2d31] p-4 space-y-3 text-xs border-l-4 shadow-xl"
                        style={{ borderLeftColor: activeCmd.botResponse.embedColor }}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1.5 flex-1 min-w-0">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-zinc-300 font-bold uppercase inline-block">
                              {activeCmd.botResponse.platformBadge}
                            </span>

                            <h4 className="font-bold text-sm text-white">
                              {activeCmd.botResponse.embedTitle}
                            </h4>

                            <p className="text-zinc-200 leading-relaxed whitespace-pre-line text-xs font-normal">
                              {activeCmd.botResponse.embedDesc}
                            </p>
                          </div>

                          {/* Thumbnail */}
                          {activeCmd.botResponse.thumbnailUrl && (
                            <div className="shrink-0 space-y-1 text-center">
                              <img 
                                src={activeCmd.botResponse.thumbnailUrl} 
                                alt="Platform Thumbnail" 
                                className="w-20 h-20 rounded-xl object-contain shadow-2xl border border-white/15 bg-black/50 p-2"
                              />
                            </div>
                          )}
                        </div>

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

                        {/* Interactive Buttons in Embed */}
                        {activeCmd.botResponse.buttons && (
                          <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-700/60">
                            {activeCmd.botResponse.buttons.map((btnLabel, idx) => (
                              <button
                                key={idx}
                                onClick={() => dashboardAudio.playClick()}
                                className="px-3 py-1.5 rounded-md bg-[#383a40] hover:bg-[#474950] text-zinc-200 text-[11px] font-bold font-mono transition cursor-pointer"
                              >
                                {btnLabel}
                              </button>
                            ))}
                          </div>
                        )}

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

              {/* Bottom Simulated Input Bar */}
              <div className="p-3 bg-[#2b2d31] border-t border-zinc-800 flex items-center gap-3">
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

        {/* ─── 4. MINIMAL LEGAL COMPLIANCE & DEVELOPER SUPPORT DOCK ────────── */}
        <section className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl">
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-0.5 text-center md:text-left">
              <h4 className="text-sm font-bold text-white uppercase font-mono">
                Discord Developer Verified Compliance
              </h4>
              <p className="text-xs text-zinc-400 font-normal">
                Radical data minimization • Zero message reading • 100% free unlimited creator webhooks
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <Link 
              href="/discord-bot/pingplex/terms"
              className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-fuchsia-400 hover:text-fuchsia-300 transition underline"
            >
              Terms of Service
            </Link>
            <Link 
              href="/discord-bot/pingplex/privacy"
              className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-purple-400 hover:text-purple-300 transition underline"
            >
              Privacy Policy
            </Link>
          </div>

        </section>

      </main>

      <Footer />
    </div>
  );
}
