"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Server, ChevronRight, Search, Shield, ArrowLeft, ExternalLink, 
  Music, Lock, Bot, Mic, Zap, Sparkles, ShieldCheck, Copy, Check, 
  Hash, Send, Volume2, Headphones, Play, Pause, Radio, RefreshCw,
  Heart, Terminal, Layers, Star
} from "lucide-react";
import { DiscordLogo, DiscordVerifiedBadge, DiscordAppPill } from "@/app/components/BrandIcons";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { dashboardAudio } from "@/lib/dashboardAudio";

interface CommandSpec {
  name: string;
  category: "music" | "moderation" | "ai" | "xp" | "voice" | "support";
  syntax: string;
  userCommand: string;
  shortDesc: string;
  badge?: string;
  botResponse: {
    embedTitle: string;
    embedColor: string;
    embedDesc: string;
    albumArt?: string;
    spotifyUrl?: string;
    fields?: Array<{ name: string; value: string; inline?: boolean }>;
    footer?: string;
    buttons?: string[];
    rankCardData?: {
      level: number;
      rank: number;
      currentXp: number;
      nextXp: number;
    };
  };
}

export default function VePlexityBotLandingPage() {
  const [selectedCommandIdx, setSelectedCommandIdx] = useState<number>(0);
  const [commandCategory, setCommandCategory] = useState<string>("all");
  const [copiedCmd, setCopiedCmd] = useState<boolean>(false);
  const [isPlayingPreview, setIsPlayingPreview] = useState<boolean>(false);

  // Live Typing Simulation State
  const [simStep, setSimStep] = useState<"idle" | "typing" | "sent" | "bot_thinking" | "bot_responded">("bot_responded");
  const [typedInputText, setTypedInputText] = useState<string>("");
  const simTimeoutRef = useRef<NodeJS.Timeout[]>([]);

  const commandSpecs: CommandSpec[] = [
    {
      name: "/play",
      category: "music",
      syntax: "/play <query_or_url>",
      userCommand: "/play query: Aisi Tu - Tanvik x VeeRM",
      shortDesc: "48kHz VOIP Lossless DSP streaming with zero buffer lag.",
      badge: "48kHz Lossless",
      botResponse: {
        embedTitle: "🎵 Now Streaming in #music-lounge",
        embedColor: "#f97316",
        embedDesc: "**Track:** Aisi Tu\n**Artists:** Tanvik x VeeRM\n**Production & Mastering:** Veer Madan\n**Audio Quality:** 320kbps Master • 48kHz VOIP DSP\n**Status:** 24/7 Channel Lock Active • Buffer: 0ms",
        albumArt: "/music/aisi-tu-cover.png",
        spotifyUrl: "https://open.spotify.com/search/Aisi%20Tu%20Tanvik",
        fields: [
          { name: "Requested By", value: "<@Veer>", inline: true },
          { name: "Producer", value: "Veer Madan", inline: true },
          { name: "Audio DSP", value: "48kHz VOIP Master", inline: true }
        ],
        footer: "VePlexity 48kHz Audio Engine • Stream 'Aisi Tu' Globally on Spotify",
        buttons: ["Pause ⏸️", "Skip ⏭️", "Loop 🔁", "🎧 Open on Spotify"]
      }
    },
    {
      name: "/247",
      category: "voice",
      syntax: "/247 [enabled: True/False]",
      userCommand: "/247 enabled: True",
      shortDesc: "Permanent 24/7 channel persistence. Never auto-disconnects.",
      badge: "24/7 Voice Lock",
      botResponse: {
        embedTitle: "🔒 24/7 Voice Persistence: Activated",
        embedColor: "#f97316",
        embedDesc: "VePlexity is now **permanently bound** to **🔊 #music-lounge**.\n\nThe bot persists indefinitely without auto-disconnecting when the queue finishes or when members leave.",
        fields: [
          { name: "Bound Channel", value: "🔊 music-lounge", inline: true },
          { name: "Audio Bitrate", value: "384 kbps Ultra", inline: true },
          { name: "Cloud Status", value: "MongoDB Atlas Saved", inline: true }
        ],
        footer: "VePlexity Voice Engine • Fast Aliases: .247, .24-7",
        buttons: ["Disable 24/7 🔓", "Voice Telemetry 📊"]
      }
    },
    {
      name: "/connect",
      category: "voice",
      syntax: "/connect",
      userCommand: "/connect",
      shortDesc: "Instantly summons the bot to your current voice channel.",
      badge: "Instant Summon",
      botResponse: {
        embedTitle: "🔊 Connected to Voice Channel",
        embedColor: "#06b6d4",
        embedDesc: "Successfully joined **🔊 Study & Beats**.\nVoice socket initialized and awaiting your tracks, radio streams, or sound effects.",
        fields: [
          { name: "Connected Channel", value: "🔊 Study & Beats", inline: true },
          { name: "VOIP Bitrate", value: "384 kbps Lossless", inline: true },
          { name: "Queue", value: "Ready (0 tracks)", inline: true }
        ],
        footer: "VePlexity 48kHz VOIP • Fast Aliases: .connect, .join",
        buttons: ["Play Music 🎵", "Disconnect ⏹️"]
      }
    },
    {
      name: "/purge",
      category: "moderation",
      syntax: "/purge [amount: 1-1000] [all: true] [bots: true]",
      userCommand: "/purge amount: 500",
      shortDesc: "Sweeps up to 1,000 messages with 14-day 💣 Nuke fallback.",
      badge: "Up to 1000 Msgs",
      botResponse: {
        embedTitle: "🛡️ Channel Purge Completed",
        embedColor: "#f43f5e",
        embedDesc: "Successfully swept and deleted **500 messages** from this channel.\n\n*Discord API Note: Bulk delete for messages older than 14 days is restricted. Click below to safely clone and wipe 100% of channel history.*",
        fields: [
          { name: "Wiped Messages", value: "500", inline: true },
          { name: "Execution", value: "Ephemeral Matrix", inline: true },
          { name: "Audit Modlog", value: "Case #492 Logged", inline: true }
        ],
        footer: "VePlexity Defense Matrix • Fast Alias: .clear all",
        buttons: ["💣 Wipe 100% of Messages (Nuke Channel)"]
      }
    },
    {
      name: "/donate",
      category: "support",
      syntax: "/donate",
      userCommand: "/donate",
      shortDesc: "Support developer Veer Madan via UPI ID & Buy Me a Coffee.",
      badge: "Instant UPI & BMC",
      botResponse: {
        embedTitle: "💖 Support Developer Veer Madan",
        embedColor: "#f59e0b",
        embedDesc: "Support 24/7 cloud hosting, audio DSP nodes, and continuous feature updates of VePlexity Network!\n\n🇮🇳 **India Instant UPI (Zero Fees):** `madan.45@superyes`\n🌍 **Worldwide:** [Buy Me a Coffee](https://www.buymeacoffee.com/veplexity1)",
        albumArt: "https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=upi%3A%2F%2Fpay%3Fpa%3Dmadan.45%40superyes%26pn%3DVeer%2520Madan%26cu%3DINR",
        fields: [
          { name: "UPI VPA (India)", value: "madan.45@superyes", inline: true },
          { name: "Global Platform", value: "Buy Me a Coffee", inline: true },
          { name: "VIP Discord Role", value: "Supporter Badge", inline: true }
        ],
        footer: "VePlexity Network • Fast Aliases: .donate, .upi",
        buttons: ["☕ Buy Me a Coffee", "📋 Copy UPI ID"]
      }
    },
    {
      name: "/action",
      category: "xp",
      syntax: "/action <type: 14 choices> [user: @member]",
      userCommand: "/action type: hug user: @Veer",
      shortDesc: "Consolidated 14-in-1 anime expressive reaction system.",
      badge: "14 Reactions",
      botResponse: {
        embedTitle: "✨ Warm Community Hug",
        embedColor: "#d946ef",
        embedDesc: "**Veer** gave **@Alex** a big warm wholesome hug! 🤗\n\n*Social interaction registered with +5 Server Affinity XP.*",
        fields: [
          { name: "Reaction Type", value: "Wholesome Hug", inline: true },
          { name: "Action Menu", value: "14 Anime Types", inline: true }
        ],
        footer: "VePlexity Social Matrix • Fast Aliases: .hug, .kiss, .slap, .pat",
        buttons: ["Hug Back 🤗", "View Leaderboard 🏆"]
      }
    },
    {
      name: "/gemini ask",
      category: "ai",
      syntax: "/gemini ask <prompt>",
      userCommand: "/gemini ask prompt: Explain quantum computing simply.",
      shortDesc: "Google Gemini 2.5 multi-modal conversational intelligence.",
      badge: "Gemini 2.5",
      botResponse: {
        embedTitle: "🤖 Google Gemini 2.5 Intelligence",
        embedColor: "#a855f7",
        embedDesc: "**Quantum Computing Simplified:**\nA normal computer bit is like a light switch—it is either ON (1) or OFF (0). A quantum bit (qubit) is like a spinning coin that can be both simultaneously (superposition).\n\nThis lets quantum systems evaluate billions of possibilities at once.",
        fields: [
          { name: "Model", value: "Gemini 2.5 Flash", inline: true },
          { name: "Latency", value: "320ms", inline: true },
          { name: "Context", value: "Guild Active", inline: true }
        ],
        footer: "VePlexity Multi-Modal AI Interface • Google Deepmind Core"
      }
    },
    {
      name: "/rank",
      category: "xp",
      syntax: "/rank [user]",
      userCommand: "/rank user: @Veer",
      shortDesc: "Dynamic XP rank card with server level & leaderboard rank.",
      badge: "XP Leveling",
      botResponse: {
        embedTitle: "🏆 Member Experience Card",
        embedColor: "#fbbf24",
        embedDesc: "Displaying progression stats for **Veer** in this server:",
        rankCardData: {
          level: 24,
          rank: 1,
          currentXp: 8420,
          nextXp: 10000
        },
        fields: [
          { name: "Voice Hours", value: "128h 45m", inline: true },
          { name: "Messages", value: "4,192", inline: true },
          { name: "Multiplier", value: "1.5x Active", inline: true }
        ],
        footer: "Encrypted MongoDB XP Progression Matrix"
      }
    },
    {
      name: "/tempvc setup",
      category: "voice",
      syntax: "/tempvc setup <hub_channel>",
      userCommand: "/tempvc setup channel: ➕ Join to Create",
      shortDesc: "Dynamic Join-to-Create private voice channel hubs.",
      badge: "Dynamic VC",
      botResponse: {
        embedTitle: "🎙️ Dynamic Voice Hub Activated",
        embedColor: "#06b6d4",
        embedDesc: "Members joining **➕ Join to Create** will receive an isolated private channel with rename, lock, and limit controls.",
        fields: [
          { name: "Parent Category", value: "Voice Lounges", inline: true },
          { name: "Auto-Deletion", value: "When Empty (0s)", inline: true }
        ],
        footer: "VePlexity Voice Dispatcher"
      }
    },
    {
      name: "/automod shield",
      category: "moderation",
      syntax: "/automod shield <level>",
      userCommand: "/automod shield level: Maximum",
      shortDesc: "Automated raid suppression, anti-invite & link screening.",
      badge: "Proactive Defense",
      botResponse: {
        embedTitle: "🛡️ AutoMod Fortress Shield: Engaged",
        embedColor: "#10b981",
        embedDesc: "Server protection matrix initialized at **MAXIMUM SECURITY**.\nAnti-Raid join throttling, discord.gg invite filters, and mass mention suppression are now operating in real-time.",
        fields: [
          { name: "Anti-Invite", value: "Strict Block", inline: true },
          { name: "Mass Mention", value: "Max 3 Pings", inline: true },
          { name: "Spam Throttling", value: "5 msgs / 3s", inline: true }
        ],
        footer: "VePlexity Security Sentinel • Zero Configuration Required"
      }
    }
  ];

  const filteredCommands = commandSpecs.filter((cmd) => {
    return commandCategory === "all" || cmd.category === commandCategory;
  });

  const activeCmd = commandSpecs[selectedCommandIdx] || commandSpecs[0];

  const runLiveCommandSimulation = (targetCmd: CommandSpec) => {
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
    runLiveCommandSimulation(commandSpecs[idx]);
  };

  return (
    <div className="min-h-screen bg-[#050209] text-zinc-100 flex flex-col font-sans selection:bg-rose-500/30 relative overflow-x-hidden">
      <Navbar />

      {/* Atmospheric GTA 6 Sunset Ambient Glows */}
      <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(249,115,22,0.13)_0%,transparent_70%)] blur-[170px] pointer-events-none" />
      <div className="fixed top-1/2 right-10 w-[750px] h-[750px] bg-[radial-gradient(circle,rgba(217,70,239,0.10)_0%,transparent_70%)] blur-[170px] pointer-events-none" />

      {/* Subtle Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,#000_60%,transparent_100%)] pointer-events-none" />

      <main className="flex-1 w-full max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10 space-y-12">
        
        {/* ─── 1. CINEMATIC HERO: VISUAL-FIRST BRAND SHOWCASE ──────────────── */}
        <section className="relative rounded-[36px] bg-[#0c0514]/85 border-2 border-orange-500/30 p-8 sm:p-12 backdrop-blur-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_24px_55px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* Subtle Radial Sunset Backlight */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.22),transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[radial-gradient(ellipse_at_bottom,rgba(244,63,94,0.12),transparent_70%)] pointer-events-none" />

          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-6">
            <Link href="/discord-bot" className="hover:text-white transition-colors flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Discord Bots Hub</span>
            </Link>
            <span>/</span>
            <span className="text-orange-400 font-bold">VePlexity Commercial Bot</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left: Giant Floating Avatar & Audio Waveform */}
            <div className="lg:col-span-5 flex flex-col items-center text-center space-y-5">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex items-center justify-center group"
              >
                {/* Ambient Halo */}
                <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-orange-500/35 via-rose-500/30 to-fuchsia-500/25 blur-3xl group-hover:scale-110 transition-transform duration-500" />

                <img 
                  src="/bots/veplexity-avatar.png" 
                  alt="VePlexity Bot Avatar" 
                  className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => { e.currentTarget.src = "/vp-no-bg.png"; }}
                />
              </motion.div>

              {/* Status Indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>24/7 Lossless Audio Cluster Online</span>
              </div>
            </div>

            {/* Right: Punchy Titles, Visual Metrics & Direct Actions */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-[11px] font-mono px-3 py-0.5 rounded-full bg-orange-500/15 border border-orange-500/35 text-orange-400 font-bold uppercase tracking-wider">
                    FLAGSHIP COMMUNITY SUITE // V2.0
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400">
                    App ID: 1556640364448714752
                  </span>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-none">
                    VEPLEXITY BOT
                  </h1>
                  <DiscordVerifiedBadge className="w-7 h-7 shrink-0" />
                  <DiscordAppPill />
                </div>

                <p className="text-sm sm:text-base text-zinc-300 font-medium max-w-xl leading-relaxed">
                  The all-in-one powerhouse for community Discord servers. 48kHz lossless music streaming, proactive AutoMod defense, Google Gemini multi-modal AI, XP leveling, and private temp voice channels.
                </p>
              </div>

              {/* Visual Metric Counter Deck */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-0.5">
                  <span className="text-2xl sm:text-3xl font-black text-white font-mono block">96</span>
                  <span className="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-wider">Slash Commands</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-0.5">
                  <span className="text-2xl sm:text-3xl font-black text-white font-mono block">48kHz</span>
                  <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider">VOIP Audio DSP</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-0.5">
                  <span className="text-2xl sm:text-3xl font-black text-white font-mono block">1,000</span>
                  <span className="text-[10px] font-mono font-bold text-fuchsia-400 uppercase tracking-wider">Purge Sweep</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-0.5">
                  <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono block">100%</span>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">Free (Zero Paywall)</span>
                </div>
              </div>

              {/* Action Buttons: Add to Server & Launch Dashboard */}
              <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
                <a
                  href="/invite"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => dashboardAudio.playClick()}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-600 hover:from-orange-400 hover:to-rose-500 text-white font-black text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-orange-500/25 active:scale-[0.98] cursor-pointer"
                >
                  <DiscordLogo className="w-4 h-4" fill="#ffffff" />
                  <span>Add VePlexity to Server</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/80" />
                </a>

                <Link
                  href="/discord-bots/veplexity/dashboard"
                  onClick={() => dashboardAudio.playClick()}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.09] border border-orange-500/40 hover:border-orange-500/70 text-orange-300 hover:text-white font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
                >
                  <Server className="w-4 h-4 text-orange-400" />
                  <span>Launch Server Dashboard</span>
                  <ChevronRight className="w-3.5 h-3.5 text-orange-400" />
                </Link>
              </div>

            </div>

          </div>
        </section>

        {/* ─── 2. "AISI TU" 48kHz LOSSLESS AUDIO STUDIO SPOTLIGHT ─────────── */}
        <section className="rounded-3xl bg-gradient-to-r from-[#12071f] via-[#090312] to-[#140822] border border-orange-500/25 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          
          <div className="flex items-center gap-5 relative z-10">
            {/* Spinning Album Art */}
            <div className="relative shrink-0">
              <img 
                src="/music/aisi-tu-cover.png" 
                alt="Aisi Tu Cover Art - Tanvik x VeeRM" 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-2xl border border-white/10"
              />
              <span className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-emerald-500 text-black font-black text-[9px] font-mono uppercase">
                48kHz FLAC
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 font-bold uppercase">
                  MASTER RELEASE SPOTLIGHT
                </span>
                <span className="text-xs text-zinc-400 font-mono hidden sm:inline">Produced by Veer Madan</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Aisi Tu — Tanvik x VeeRM
              </h3>
              <p className="text-xs text-zinc-300 font-normal">
                Streamed directly in Discord voice channels in studio master 320kbps via <code className="text-orange-400 font-mono">/play Aisi Tu</code>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative z-10 w-full md:w-auto justify-end">
            <a
              href="https://open.spotify.com/search/Aisi%20Tu%20Tanvik"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-5 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] text-black font-black text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
            >
              <span>Stream on Spotify</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => {
                const playCmdIdx = commandSpecs.findIndex(c => c.name === "/play");
                handleSelectCommand(playCmdIdx >= 0 ? playCmdIdx : 0);
                const el = document.getElementById("command-workbench");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs font-mono uppercase flex items-center justify-center gap-2 transition"
            >
              <Play className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
              <span>Simulate in Discord</span>
            </button>
          </div>
        </section>

        {/* ─── 3. HIGH-FIDELITY DISCORD WORKBENCH & LIVE COMMAND SIMULATOR ─── */}
        <section id="command-workbench" className="space-y-6 scroll-mt-24">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-widest block">
                INTERACTIVE COMMAND BENCH
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                DISCORD EXECUTION SIMULATOR
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: "all", label: "All" },
                { id: "music", label: "🎵 Audio" },
                { id: "voice", label: "🔊 Voice" },
                { id: "moderation", label: "🛡️ Mod" },
                { id: "ai", label: "🤖 AI" },
                { id: "xp", label: "🏆 XP" },
                { id: "support", label: "💖 UPI" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    dashboardAudio.playClick();
                    setCommandCategory(cat.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                    commandCategory === cat.id
                      ? "bg-orange-500 text-black shadow-md shadow-orange-500/25"
                      : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Workbench: Left Command Selector + Right Discord Screen */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* ── LEFT: FAST COMMAND SELECTOR (4 Cols) ── */}
            <div className="lg:col-span-4 rounded-3xl bg-[#0c0514]/90 border border-white/10 p-3 sm:p-4 space-y-2 max-h-[580px] overflow-y-auto custom-scrollbar shadow-xl backdrop-blur-xl">
              {filteredCommands.map((cmd) => {
                const isSelected = activeCmd.name === cmd.name;
                return (
                  <button
                    key={cmd.name}
                    onClick={() => {
                      const idx = commandSpecs.findIndex(c => c.name === cmd.name);
                      handleSelectCommand(idx >= 0 ? idx : 0);
                    }}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-orange-500/20 via-rose-500/15 to-transparent border-orange-500/60 shadow-lg"
                        : "bg-black/30 border-white/5 hover:border-white/15 hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="space-y-0.5 min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span className={`font-mono text-xs font-black truncate ${
                          isSelected ? "text-orange-400" : "text-white group-hover:text-orange-300"
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
                      isSelected ? "text-orange-400 translate-x-1" : "text-zinc-600 group-hover:text-zinc-400"
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
                  <span className="font-bold text-xs font-mono">bot-commands</span>
                  <span className="text-zinc-500 text-xs">•</span>
                  <span className="text-[11px] text-zinc-400 font-mono hidden sm:inline">
                    Simulated Sandbox Channel
                  </span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                    ● BOT ONLINE
                  </span>
                </div>
              </div>

              {/* Chat Canvas */}
              <div className="p-5 sm:p-6 space-y-6 flex-1 min-h-[440px] bg-[#313338]/40">
                
                {/* 1. User Dispatch */}
                {simStep !== "typing" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-3.5"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500 to-rose-500 p-0.5 shrink-0">
                      <div className="w-full h-full rounded-full bg-[#180a22] flex items-center justify-center font-bold text-xs text-white">
                        VM
                      </div>
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">Veer</span>
                        <span className="text-[10px] text-zinc-400">Today at 8:45 PM</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#2b2d31] border border-zinc-700 text-orange-300 font-mono text-xs">
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
                      <img src="/bots/veplexity-avatar.png" alt="VePlexity" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-[11px]">VePlexity is thinking</span>
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
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-[#12081f] border border-orange-500/50 shrink-0 p-1">
                      <img 
                        src="/bots/veplexity-avatar.png" 
                        alt="VePlexity" 
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black text-white">VePlexity Bot</span>
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
                            <h4 className="font-bold text-sm text-white">
                              {activeCmd.botResponse.embedTitle}
                            </h4>

                            <p className="text-zinc-200 leading-relaxed whitespace-pre-line text-xs font-normal">
                              {activeCmd.botResponse.embedDesc}
                            </p>
                          </div>

                          {/* Album Art / QR Code Thumbnail */}
                          {activeCmd.botResponse.albumArt && (
                            <div className="shrink-0 space-y-1 text-center">
                              <img 
                                src={activeCmd.botResponse.albumArt} 
                                alt="Visual Preview" 
                                className="w-20 h-20 rounded-xl object-cover shadow-2xl border border-white/15 bg-white p-1"
                              />
                            </div>
                          )}
                        </div>

                        {/* Rank Card Visualization if /rank */}
                        {activeCmd.botResponse.rankCardData && (
                          <div className="p-3.5 rounded-xl bg-[#1e1f22] border border-zinc-700 space-y-2 my-2">
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-mono text-orange-400 font-bold">LVL {activeCmd.botResponse.rankCardData.level}</span>
                              <span className="font-mono text-zinc-400">RANK #{activeCmd.botResponse.rankCardData.rank}</span>
                            </div>
                            <div className="h-2.5 w-full rounded-full bg-black/60 overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-orange-500 to-rose-500 w-[84%]" />
                            </div>
                            <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                              <span>{activeCmd.botResponse.rankCardData.currentXp} XP</span>
                              <span>{activeCmd.botResponse.rankCardData.nextXp} XP</span>
                            </div>
                          </div>
                        )}

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
                            {activeCmd.botResponse.buttons.map((btnLabel, idx) => {
                              const isSpotifyBtn = btnLabel.includes("Spotify");
                              if (isSpotifyBtn && activeCmd.botResponse.spotifyUrl) {
                                return (
                                  <a
                                    key={idx}
                                    href={activeCmd.botResponse.spotifyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1.5 rounded-md bg-[#1DB954] hover:bg-[#1ed760] text-black text-[11px] font-bold font-mono transition flex items-center gap-1 shadow-sm"
                                  >
                                    <span>{btnLabel}</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                );
                              }
                              return (
                                <button
                                  key={idx}
                                  onClick={() => dashboardAudio.playClick()}
                                  className="px-3 py-1.5 rounded-md bg-[#383a40] hover:bg-[#474950] text-zinc-200 text-[11px] font-bold font-mono transition cursor-pointer"
                                >
                                  {btnLabel}
                                </button>
                              );
                            })}
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
                        <span className="w-1.5 h-4 bg-orange-400 animate-pulse inline-block" />
                      </>
                    ) : (
                      <span className="text-zinc-500">Message #bot-commands</span>
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
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-0.5 text-center md:text-left">
              <h4 className="text-sm font-bold text-white uppercase font-mono">
                Discord Developer Verified Compliance
              </h4>
              <p className="text-xs text-zinc-400 font-normal">
                Radical data minimization • Zero private message logging • 100% free community access
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <Link 
              href="/discord-bot/veplexity/terms"
              className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-orange-400 hover:text-orange-300 transition underline"
            >
              Terms of Service
            </Link>
            <Link 
              href="/discord-bot/veplexity/privacy"
              className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-rose-400 hover:text-rose-300 transition underline"
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
