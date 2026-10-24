"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ChevronRight, ExternalLink, Music, Shield, Bot, Radio, Bell, 
  Sparkles, ArrowRight, Lock, Zap, CheckCircle2, Server, Copy, 
  Check, Headphones, Terminal, Cpu, Globe, Share2, Flame, Sliders,
  Volume2, Eye, ShieldCheck, ArrowUpRight
} from "lucide-react";
import { DiscordLogo, DiscordVerifiedBadge, DiscordAppPill } from "@/app/components/BrandIcons";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { dashboardAudio } from "@/lib/dashboardAudio";

export default function DiscordBotsHubPage() {
  const [copiedUpi, setCopiedUpi] = useState(false);
  const upiId = "madan.45@superyes";

  const handleCopyUpi = () => {
    try {
      dashboardAudio.playClick();
      navigator.clipboard.writeText(upiId);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2200);
    } catch {}
  };

  const quickCommands = [
    { name: "/play", cat: "Music", desc: "48kHz Lossless VOIP Audio ('Aisi Tu' master track)" },
    { name: "/247", cat: "Voice", desc: "Lock bot in voice channel 24/7 permanently" },
    { name: "/connect", cat: "Voice", desc: "Instant voice channel summon on 384kbps socket" },
    { name: "/purge", cat: "Mod", desc: "Bulk delete 1,000 msgs + 14-day Nuke Channel button" },
    { name: "/donate", cat: "Support", desc: "Instant zero-fee UPI QR code & Buy Me a Coffee" },
    { name: "/action", cat: "Social", desc: "Unified 14-in-1 anime expressive reaction menu" },
    { name: "/gemini ask", cat: "AI", desc: "Google Gemini 2.5 multi-modal conversational AI" },
    { name: "/tempvc setup", cat: "Voice", desc: "Dynamic Join-to-Create private voice hubs" },
  ];

  return (
    <div className="min-h-screen bg-[#06020a] text-zinc-100 flex flex-col font-sans relative selection:bg-rose-500/30 overflow-x-hidden">
      <Navbar />

      {/* Atmospheric GTA 6 Sunset Ambient Glows (Gentle, High-Contrast, Eye-Friendly) */}
      <div className="fixed top-0 left-10 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(249,115,22,0.12)_0%,transparent_70%)] blur-[160px] pointer-events-none" />
      <div className="fixed top-1/4 right-0 w-[750px] h-[750px] bg-[radial-gradient(circle,rgba(217,70,239,0.10)_0%,transparent_70%)] blur-[170px] pointer-events-none" />
      <div className="fixed bottom-10 left-1/3 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(244,63,94,0.08)_0%,transparent_70%)] blur-[160px] pointer-events-none" />

      {/* Subtle Technical Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" />

      <main className="flex-1 w-full max-w-[1620px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 relative z-10 space-y-12">
        
        {/* ─── 1. WIDESCREEN COMMAND DECK HERO & DIRECT DASHBOARD LAUNCH ────── */}
        <section className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Headline & Telemetry Pills */}
            <motion.div 
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-4"
            >
              {/* Dynamic Pill Reveal */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/15 via-rose-500/15 to-fuchsia-500/15 border border-rose-500/30 text-[11px] font-mono text-rose-300 font-bold uppercase tracking-widest shadow-lg shadow-rose-500/5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span>DUAL BOT PLATFORM // CLUSTER PRODUCTION FLEET</span>
              </div>

              <h1 className="text-3xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight uppercase leading-[1.08]">
                CHOOSE YOUR <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-500 to-fuchsia-500 drop-shadow-[0_0_35px_rgba(244,63,94,0.3)]">
                  DISCORD BOT PLATFORM.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl font-normal">
                Two dedicated, purpose-built Discord applications engineered for modern servers. Zero paywalls, 24/7 lossless 48kHz audio DSP, sub-second social webhook broadcasts, and independent cloud dashboards.
              </p>

              {/* Fast Telemetry Strip */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <Terminal className="w-3.5 h-3.5 text-orange-400" />
                  <span className="text-zinc-200 font-bold">96 Slash Commands</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <Headphones className="w-3.5 h-3.5 text-rose-400" />
                  <span className="text-zinc-200 font-bold">48kHz Lossless DSP</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <Radio className="w-3.5 h-3.5 text-fuchsia-400" />
                  <span className="text-zinc-200 font-bold">Multi-Platform Webhooks</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-zinc-200 font-bold">100% Free AutoMod</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Top Quick Launch Dashboard Card (Veer directive: "launch dashboard should be in the top") */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 p-5 sm:p-6 rounded-3xl bg-[#0e0717]/85 border-2 border-white/10 hover:border-orange-500/40 backdrop-blur-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_16px_36px_rgba(0,0,0,0.6)] space-y-4 relative overflow-hidden transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-orange-500/10 via-rose-500/10 to-transparent pointer-events-none" />

              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400">
                    <Server className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono font-black text-white uppercase tracking-wider">
                      DIRECT CLUSTER CONSOLES
                    </h3>
                    <p className="text-[11px] text-zinc-400 font-normal">Instant server management dashboards</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>LIVE</span>
                </span>
              </div>

              {/* Quick Launch Buttons for both bots */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <Link
                  href="/discord-bots/veplexity/dashboard"
                  onClick={() => dashboardAudio.playClick()}
                  className="p-3.5 rounded-2xl bg-gradient-to-r from-orange-500/15 to-rose-500/15 hover:from-orange-500/25 hover:to-rose-500/25 border border-orange-500/35 hover:border-orange-500/70 transition-all flex items-center justify-between group active:scale-[0.98]"
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-wider block">
                      ALL-IN-ONE
                    </span>
                    <span className="text-xs font-black text-white group-hover:text-orange-300 transition-colors">
                      VePlexity Console
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-orange-400 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/discord-bots/pingplex/dashboard"
                  onClick={() => dashboardAudio.playClick()}
                  className="p-3.5 rounded-2xl bg-gradient-to-r from-fuchsia-500/15 to-purple-500/15 hover:from-fuchsia-500/25 hover:to-purple-500/25 border border-fuchsia-500/35 hover:border-fuchsia-500/70 transition-all flex items-center justify-between group active:scale-[0.98]"
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono font-bold text-fuchsia-400 uppercase tracking-wider block">
                      CREATOR ALERTS
                    </span>
                    <span className="text-xs font-black text-white group-hover:text-fuchsia-300 transition-colors">
                      PingPlex Studio
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-fuchsia-400 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="text-[11px] font-mono text-zinc-400 flex items-center justify-between pt-1">
                <span>Requires Discord Admin permissions</span>
                <span className="text-zinc-500">• Single sign-on OAuth</span>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ─── 2. THE DUAL BOT SHOWCASE DECK (PROPORTIONED, SLEEK, VIEWPORT-FIT) ── */}
        <section className="w-full space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 flex-wrap gap-3">
            <div>
              <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-widest block">
                PRODUCTION DISCORD APPLICATIONS
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                SELECT A BOT TO EXPLORE OR INVITE
              </h2>
            </div>
            <p className="text-xs font-mono text-zinc-400">
              Click &quot;Explore Bot&quot; for the interactive command workbench and live Discord visualizer
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8 items-stretch">
            
            {/* ════ CARD 1: VEPLEXITY BOT ════ */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="rounded-3xl bg-[#0e0717]/90 border-2 border-orange-500/30 hover:border-orange-500/70 transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_20px_45px_rgba(0,0,0,0.7)] flex flex-col justify-between overflow-hidden relative group backdrop-blur-2xl p-6 sm:p-7 space-y-5"
            >
              {/* Subtle Sunset Glow */}
              <div className="absolute top-0 left-0 w-80 h-80 bg-[radial-gradient(ellipse_at_top_left,rgba(249,115,22,0.16),transparent_70%)] pointer-events-none" />

              {/* Top Header: Unboxed Crisp Logo + Title + Status */}
              <div className="flex items-start justify-between gap-4 relative z-10">
                <div className="flex items-center gap-4 sm:gap-5">
                  {/* Unboxed Scaled Avatar (Zero square wrapper box around PNG) */}
                  <div className="relative shrink-0 flex items-center justify-center">
                    <img 
                      src="/bots/veplexity-avatar.png" 
                      alt="VePlexity Bot Official Logo" 
                      className="w-18 h-18 sm:w-20 sm:h-20 object-contain filter drop-shadow-[0_10px_24px_rgba(249,115,22,0.55)] group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.currentTarget.src = "/vp-no-bg.png"; }}
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-orange-400 transition-colors tracking-tight">
                        VePlexity
                      </h3>
                      <DiscordVerifiedBadge className="w-5 h-5 shrink-0" />
                      <DiscordAppPill />
                    </div>
                    <p className="text-xs font-mono text-zinc-400 font-medium">
                      All-in-One Community &amp; Audio Engine • v2.0
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex flex-col items-end shrink-0">
                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/35 text-orange-300 font-bold uppercase tracking-wider">
                    COMMERCIAL BOT
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Lossless VOIP Online</span>
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3 relative z-10">
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  Enterprise community suite featuring <strong>24/7 lossless music streaming</strong>, proactive <strong>AutoMod security</strong>, XP leveling &amp; rank cards, dynamic <strong>Temp Voice Hubs</strong>, and <strong>Google Gemini multi-modal AI</strong>.
                </p>

                {/* 4 Sleek Feature Pills */}
                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-mono text-zinc-300">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-orange-500/20">
                    <Music className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    <span className="truncate">48kHz Lossless DJ (Aisi Tu)</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-orange-500/20">
                    <Shield className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="truncate">AutoMod &amp; /purge (1000)</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-orange-500/20">
                    <Bot className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span className="truncate">Google Gemini 2.5 AI</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-orange-500/20">
                    <Volume2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">24/7 Voice Lock (/247)</span>
                  </div>
                </div>
              </div>

              {/* 3-Button Action Suite (Explore, Add, Launch Dashboard) */}
              <div className="space-y-3 pt-2 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* 1. Explore Bot (Primary CTA) */}
                  <Link
                    href="/discord-bot/veplexity"
                    onClick={() => dashboardAudio.playClick()}
                    className="py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-600 hover:from-orange-400 hover:to-rose-500 text-white text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/20 active:scale-[0.98] group/btn"
                  >
                    <span className="tracking-wider uppercase">Explore Bot</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>

                  {/* 2. Add to Server */}
                  <a
                    href="/invite"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 hover:border-orange-500/40 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
                  >
                    <DiscordLogo className="w-3.5 h-3.5" fill="#ffffff" />
                    <span className="tracking-wider uppercase">Add to Server</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400" />
                  </a>

                  {/* 3. Launch Dashboard */}
                  <Link
                    href="/discord-bots/veplexity/dashboard"
                    onClick={() => dashboardAudio.playClick()}
                    className="py-3 px-4 rounded-xl bg-[#160a22] hover:bg-[#200e31] border border-orange-500/35 hover:border-orange-500/70 text-orange-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
                  >
                    <Server className="w-3.5 h-3.5 text-orange-400" />
                    <span className="tracking-wider uppercase">Dashboard</span>
                  </Link>
                </div>

                {/* Legal Documents Bar */}
                <div className="flex items-center justify-between text-[11px] font-mono pt-2 text-zinc-500 border-t border-zinc-800">
                  <div className="flex items-center gap-3">
                    <Link href="/discord-bot/veplexity/terms" className="hover:text-orange-400 transition-colors underline">
                      Terms of Service
                    </Link>
                    <span>•</span>
                    <Link href="/discord-bot/veplexity/privacy" className="hover:text-orange-400 transition-colors underline">
                      Privacy Policy
                    </Link>
                  </div>
                  <span className="text-orange-400 font-bold font-mono">96 Slash Commands</span>
                </div>
              </div>
            </motion.div>

            {/* ════ CARD 2: PINGPLEX ════ */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="rounded-3xl bg-[#0c0615]/90 border-2 border-fuchsia-500/30 hover:border-fuchsia-500/70 transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_20px_45px_rgba(0,0,0,0.7)] flex flex-col justify-between overflow-hidden relative group backdrop-blur-2xl p-6 sm:p-7 space-y-5"
            >
              {/* Subtle Fuchsia Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(ellipse_at_top_right,rgba(217,70,239,0.16),transparent_70%)] pointer-events-none" />

              {/* Top Header: Unboxed Crisp Logo + Title + Status */}
              <div className="flex items-start justify-between gap-4 relative z-10">
                <div className="flex items-center gap-4 sm:gap-5">
                  {/* Unboxed Scaled Avatar */}
                  <div className="relative shrink-0 flex items-center justify-center">
                    <img 
                      src="/bots/pingplex-avatar.png" 
                      alt="PingPlex Bot Official Logo" 
                      className="w-18 h-18 sm:w-20 sm:h-20 object-contain filter drop-shadow-[0_10px_24px_rgba(217,70,239,0.55)] group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.currentTarget.src = "/bots/pp.png"; }}
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-fuchsia-400 transition-colors tracking-tight">
                        PingPlex
                      </h3>
                      <DiscordVerifiedBadge className="w-5 h-5 shrink-0" />
                      <DiscordAppPill />
                    </div>
                    <p className="text-xs font-mono text-zinc-400 font-medium">
                      Creator Alerts &amp; Live Webhook Studio • Live Engine
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex flex-col items-end shrink-0">
                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/35 text-fuchsia-300 font-bold uppercase tracking-wider">
                    CREATOR ALERTS
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Render Cluster Live</span>
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3 relative z-10">
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  Dedicated social notification engine delivering instant alerts for <strong>YouTube uploads &amp; shorts</strong>, <strong>Twitch live streams</strong>, <strong>TikTok</strong>, <strong>X (Twitter)</strong>, and <strong>Reddit</strong> with zero paywalls.
                </p>

                {/* 4 Sleek Feature Pills */}
                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-mono text-zinc-300">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-fuchsia-500/20">
                    <Radio className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
                    <span className="truncate">YouTube Atom RSS &amp; Shorts</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-fuchsia-500/20">
                    <Zap className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span className="truncate">Twitch EventSub Webhooks</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-fuchsia-500/20">
                    <Sliders className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="truncate">1-Click Message Presets</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-fuchsia-500/20">
                    <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">Unlimited Feeds (Zero Paywall)</span>
                  </div>
                </div>
              </div>

              {/* 3-Button Action Suite (Explore, Add, Launch Studio) */}
              <div className="space-y-3 pt-2 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* 1. Explore Bot (Primary CTA) */}
                  <Link
                    href="/discord-bot/pingplex"
                    onClick={() => dashboardAudio.playClick()}
                    className="py-3 px-4 rounded-xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-rose-600 hover:from-fuchsia-500 hover:to-purple-500 text-white text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-fuchsia-600/20 active:scale-[0.98] group/btn"
                  >
                    <span className="tracking-wider uppercase">Explore Bot</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>

                  {/* 2. Add to Server */}
                  <a
                    href="/invite/pingplex"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 hover:border-fuchsia-500/40 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
                  >
                    <DiscordLogo className="w-3.5 h-3.5" fill="#ffffff" />
                    <span className="tracking-wider uppercase">Add to Server</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400" />
                  </a>

                  {/* 3. Launch Studio */}
                  <Link
                    href="/discord-bots/pingplex/dashboard"
                    onClick={() => dashboardAudio.playClick()}
                    className="py-3 px-4 rounded-xl bg-[#140822] hover:bg-[#1d0d31] border border-fuchsia-500/35 hover:border-fuchsia-500/70 text-fuchsia-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
                  >
                    <Sliders className="w-3.5 h-3.5 text-fuchsia-400" />
                    <span className="tracking-wider uppercase">Studio</span>
                  </Link>
                </div>

                {/* Legal Documents Bar */}
                <div className="flex items-center justify-between text-[11px] font-mono pt-2 text-zinc-500 border-t border-zinc-800">
                  <div className="flex items-center gap-3">
                    <Link href="/discord-bot/pingplex/terms" className="hover:text-fuchsia-400 transition-colors underline">
                      Terms of Service
                    </Link>
                    <span>•</span>
                    <Link href="/discord-bot/pingplex/privacy" className="hover:text-fuchsia-400 transition-colors underline">
                      Privacy Policy
                    </Link>
                  </div>
                  <span className="text-fuchsia-400 font-bold font-mono">Free Multi-Feed</span>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ─── 3. WIDE ECOSYSTEM ARCHITECTURAL MATRIX (FULL WIDTH USAGE) ───── */}
        <section className="w-full space-y-6 pt-4">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest block">
              ECOSYSTEM COMPARISON &amp; CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              MODULAR ARCHITECTURE EXPLAINED
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Why two separate bots? By decoupling the commercial community bot from the social webhook engine, each application operates with maximum reliability, zero latency interference, and dedicated cloud scaling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Column 1: Audio vs Alerts */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.35 }}
              className="p-5 rounded-2xl bg-[#0c0614]/80 border border-white/10 hover:border-orange-500/30 transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <Music className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black text-white uppercase">48kHz Audio vs Social Webhooks</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                <strong className="text-orange-300">VePlexity</strong> runs a dedicated 48kHz lossless VOIP DSP engine with 24/7 channel retention, while <strong className="text-fuchsia-300">PingPlex</strong> operates an independent background worker polling YouTube Atom RSS and Twitch EventSub.
              </p>
            </motion.div>

            {/* Column 2: Moderation vs Feed Presets */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="p-5 rounded-2xl bg-[#0c0614]/80 border border-white/10 hover:border-rose-500/30 transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black text-white uppercase">Defense Matrix vs Custom Templates</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                <strong className="text-orange-300">VePlexity</strong> protects your server with automated raid shields, case-indexed audit logs, and 1,000-message purges. <strong className="text-fuchsia-300">PingPlex</strong> allows creators to deploy 1-click Hype and Stream alert templates with zero coding.
              </p>
            </motion.div>

            {/* Column 3: Gemini AI vs Multi-Platform Routing */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="p-5 rounded-2xl bg-[#0c0614]/80 border border-white/10 hover:border-purple-500/30 transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black text-white uppercase">Gemini AI vs Multi-Feed Routing</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                <strong className="text-orange-300">VePlexity</strong> embeds Google Gemini 2.5 multi-modal conversational intelligence. <strong className="text-fuchsia-300">PingPlex</strong> routes independent feeds into dedicated channels (YouTube to #videos, Twitch to #streams, Reddit to #memes).
              </p>
            </motion.div>

            {/* Column 4: Dynamic Voice vs Zero Paywalls */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="p-5 rounded-2xl bg-[#0c0614]/80 border border-white/10 hover:border-fuchsia-500/30 transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-400">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black text-white uppercase">XP &amp; Temp VC vs Zero Paywall Scale</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                <strong className="text-orange-300">VePlexity</strong> offers Join-to-Create voice hubs and custom XP leveling cards. <strong className="text-fuchsia-300">PingPlex</strong> delivers unlimited monitors without the arbitrary &quot;2 feed paywall&quot; seen in other alert bots.
              </p>
            </motion.div>

          </div>
        </section>

        {/* ─── 4. INTERACTIVE QUICK COMMAND SHOWCASE TICKER ───────────────── */}
        <section className="w-full p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0d0617] via-[#090410] to-[#0d0617] border border-white/10 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-widest block">
                INTERACTIVE COMMAND PREVIEW
              </span>
              <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
                POPULAR COMMANDS ACROSS THE NETWORK
              </h3>
            </div>
            <Link
              href="/discord-bot/veplexity"
              onClick={() => dashboardAudio.playClick()}
              className="text-xs font-mono font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1.5 transition-colors underline"
            >
              <span>Open Full Live Typing Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            {quickCommands.map((cmd, idx) => (
              <Link
                key={idx}
                href="/discord-bot/veplexity#command-console"
                onClick={() => dashboardAudio.playClick()}
                className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-orange-500/30 transition-all group block"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-white group-hover:text-orange-400 transition-colors">
                    {cmd.name}
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-zinc-400">
                    {cmd.cat}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 truncate mt-1">
                  {cmd.desc}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── 5. GLOBAL LEGAL COMPLIANCE & DISCORD APP VERIFICATION ──────── */}
        <section className="w-full p-6 sm:p-7 rounded-3xl bg-[#0c0514]/90 border border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-6 relative overflow-hidden backdrop-blur-xl shadow-lg">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase font-mono">
              <Shield className="w-4 h-4" />
              <span>VEPLEXITY BOT LEGAL STANDARDS</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              Official legal policies governing 24/7 lossless audio playback, Google Gemini multi-modal conversational AI, AutoMod moderation, and encrypted database retention in accordance with Discord Developer terms.
            </p>
            <div className="flex gap-4 pt-1 text-xs font-mono">
              <Link href="/discord-bot/veplexity/terms" className="text-orange-400 hover:text-orange-300 underline font-bold">
                VePlexity Terms →
              </Link>
              <Link href="/discord-bot/veplexity/privacy" className="text-rose-400 hover:text-rose-300 underline font-bold">
                VePlexity Privacy →
              </Link>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-fuchsia-400 text-xs font-bold uppercase font-mono">
              <Radio className="w-4 h-4" />
              <span>PINGPLEX ALERT ENGINE COMPLIANCE</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              Third-party API webhook dispatches (YouTube, Twitch, TikTok, X, Reddit) compliant with Discord Developer Terms of Service, radical data minimization, and zero private message harvesting.
            </p>
            <div className="flex gap-4 pt-1 text-xs font-mono">
              <Link href="/discord-bot/pingplex/terms" className="text-fuchsia-400 hover:text-fuchsia-300 underline font-bold">
                PingPlex Terms →
              </Link>
              <Link href="/discord-bot/pingplex/privacy" className="text-purple-400 hover:text-purple-300 underline font-bold">
                PingPlex Privacy →
              </Link>
            </div>
          </div>
        </section>

        {/* ─── 6. DEVELOPER HOSTING SUPPORT & DIRECT ZERO-FEE UPI BOX ──────── */}
        <section className="w-full p-5 sm:p-6 rounded-2xl bg-[#0d0716] border border-[#FFDD00]/25 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-xl">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-[#FFDD00]/10 border border-[#FFDD00]/30 flex items-center justify-center shrink-0">
              <img src="/bmc/SVG Files/bmc-logo.svg" alt="BMC" className="w-5 h-5 object-contain" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Support 24/7 Hosting Nodes &amp; Zero Paywall Feeds</p>
              <p className="text-[11px] text-zinc-400">
                Support developer Veer Madan directly to keep lossless VOIP clusters and creator alert webhook workers online 24/7.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2.5 shrink-0 flex-wrap justify-center sm:justify-end">
            <button
              onClick={handleCopyUpi}
              className="px-3 py-1.5 rounded-xl bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/40 flex items-center gap-1.5 text-[11px] font-mono text-orange-400 transition cursor-pointer"
            >
              <span>🇮🇳 UPI:</span>
              <span className="font-bold text-white select-all">{upiId}</span>
              {copiedUpi ? (
                <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" />
              ) : (
                <Copy className="w-3 h-3 text-zinc-400 ml-1" />
              )}
            </button>

            <a
              href="https://www.buymeacoffee.com/veplexity1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 transition-transform shrink-0"
            >
              <img src="/bmc/SVG Files/bmc-button.svg" alt="Buy Me A Coffee" className="h-8 w-auto rounded-lg" />
            </a>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
