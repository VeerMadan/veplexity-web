"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ChevronRight, ExternalLink, Music, 
  Award, Lock, Users, Bot, Mic, Zap, ArrowLeft, Radio, Bell, Shield, Sparkles, CheckCircle2
} from "lucide-react";
import { DiscordLogo, BmcCupIcon } from "@/app/components/BrandIcons";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { dashboardAudio } from "@/lib/dashboardAudio";
import { CardZoomRevealCanvas, ZoomRevealRect, ZoomRevealBotData } from "@/app/components/CardZoomRevealCanvas";

export default function DiscordBotsHubPage() {
  const router = useRouter();
  const [zoomRect, setZoomRect] = useState<ZoomRevealRect | null>(null);
  const [zoomBot, setZoomBot] = useState<ZoomRevealBotData | null>(null);

  const handleExploreBot = (
    e: React.MouseEvent,
    botType: "veplexity" | "pingplex"
  ) => {
    e.preventDefault();
    dashboardAudio.playClick();

    // Get the card rect or button rect for zoom expansion
    const targetElement = e.currentTarget.closest(".bot-card-container") || e.currentTarget;
    const rect = targetElement.getBoundingClientRect();

    const botData: ZoomRevealBotData = botType === "veplexity" ? {
      name: "VePlexity Bot",
      avatarUrl: "/bots/veplexity-avatar.png",
      tagline: "Launching All-In-One Powerhouse...",
      accentColor: "orange",
    } : {
      name: "PingPlex",
      avatarUrl: "/bots/pingplex-avatar.png",
      tagline: "Launching Creator Alerts Studio...",
      accentColor: "fuchsia",
    };

    setZoomRect({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
    setZoomBot(botData);

    setTimeout(() => {
      router.push(`/discord-bot/${botType}`);
    }, 480);
  };

  return (
    <div className="min-h-screen bg-[#07030a] text-zinc-100 flex flex-col font-sans relative selection:bg-rose-500/30 overflow-x-hidden">
      <Navbar />

      {/* Hardware-Accelerated Zoom-in Card Expansion Overlay */}
      {zoomRect && zoomBot && (
        <CardZoomRevealCanvas rect={zoomRect} bot={zoomBot} />
      )}

      {/* Atmospheric GTA 6 Sunset Glows */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-orange-600/15 via-rose-600/10 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed top-1/3 right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-fuchsia-600/15 via-purple-600/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10 flex flex-col justify-center space-y-16">
        
        {/* Header Hero Section with Scroll Reversible Animations */}
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          {/* Pulsing Pill Reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500/15 via-rose-500/15 to-fuchsia-500/15 border border-rose-500/30 text-xs font-mono text-rose-300 font-bold uppercase tracking-wider shadow-lg shadow-rose-500/10"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span>DUAL DISCORD BOT PLATFORM</span>
          </motion.div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase leading-[1.05]">
            CHOOSE YOUR <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-500 to-fuchsia-500 drop-shadow-[0_0_25px_rgba(244,63,94,0.35)]">
              DISCORD BOT
            </span>
          </h1>

          <p className="text-xs sm:text-base text-zinc-400 leading-relaxed font-normal max-w-2xl mx-auto">
            Explore dedicated command consoles, interactive Discord simulators, full legal documentation, and launch server dashboards with seamless zoom reveal transitions.
          </p>
        </motion.div>

        {/* Dual Bot Showcase Deck (Cinematic Wide Placement) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 w-full items-stretch">
          
          {/* ── CARD 1: VEPLEXITY BOT ── */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="bot-card-container rounded-[2.5rem] bg-[#10071a]/95 border-2 border-orange-500/30 hover:border-orange-500/80 transition-all duration-300 shadow-2xl hover:shadow-[0_0_50px_rgba(249,115,22,0.25)] flex flex-col justify-between overflow-hidden relative group backdrop-blur-xl"
          >
            {/* Top Atmospheric Gradient Accent */}
            <div className="h-40 bg-gradient-to-b from-[#28102d] via-[#160a20] to-transparent p-6 sm:p-8 flex items-start justify-between relative overflow-hidden border-b border-orange-500/20">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(249,115,22,0.35),transparent_70%)] pointer-events-none" />
              
              {/* Real VePlexity Logo (from E:\VePlexity\vp no bg.png) */}
              <div className="relative group/logo">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-orange-500 to-rose-600 opacity-60 blur-lg group-hover/logo:opacity-100 transition duration-300" />
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden border-2 border-orange-500/60 shadow-2xl bg-[#12081f] p-2 flex items-center justify-center">
                  <img 
                    src="/bots/veplexity-avatar.png" 
                    alt="VePlexity Official Logo" 
                    className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(249,115,22,0.6)] group-hover/logo:scale-110 transition-transform duration-300"
                    onError={(e) => { e.currentTarget.src = "/vp-no-bg.png"; }}
                  />
                  <div className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#10071a]" title="24/7 Lossless Online" />
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="text-[11px] font-mono px-3.5 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-rose-500/20 border border-orange-500/40 text-orange-300 font-bold uppercase tracking-wider shadow-sm">
                  ALL-IN-ONE POWERHOUSE
                </span>
                <span className="text-[10px] font-mono text-zinc-500">ID: 1556640364448714752</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-black text-white group-hover:text-orange-400 transition-colors">
                    VePlexity Bot
                  </h2>
                  <span className="text-xs px-2.5 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 font-mono text-orange-400 font-bold">
                    v2.0
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  The complete community powerhouse. Features <strong>24/7 lossless music streaming</strong>, proactive <strong>AutoMod security</strong>, XP leveling &amp; rank cards, <strong>Google Gemini AI multi-modal chatbot</strong>, and dynamic temp voice hubs.
                </p>

                {/* Capability Pills with Reverse Scroll Animation */}
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  {[
                    { icon: Music, label: "24/7 Lossless Audio DJ" },
                    { icon: Lock, label: "100% Free Moderation & Logs" },
                    { icon: Award, label: "XP Leveling & Rank Cards" },
                    { icon: Bot, label: "Google Gemini 2.5 AI" },
                    { icon: Mic, label: "Dynamic Temp Voice Hubs" },
                    { icon: Users, label: "Reaction Role Menus" },
                  ].map((feat, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0a0413] border border-zinc-800/80 text-[11px] font-mono text-zinc-300 group-hover:border-orange-500/20 transition-colors"
                    >
                      <feat.icon className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      <span className="truncate">{feat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons with Hardware Zoom-In Reveal */}
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <button
                    onClick={(e) => handleExploreBot(e, "veplexity")}
                    className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-600 hover:from-orange-400 hover:to-rose-500 text-white text-xs font-black transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-orange-500/25 active:scale-95 group/btn cursor-pointer"
                  >
                    <span className="tracking-wider uppercase">Explore Bot</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>

                  <a
                    href="/invite"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-black transition-all flex items-center justify-center gap-2 hover:border-orange-500/40 active:scale-95"
                  >
                    <DiscordLogo className="w-4 h-4" fill="#ffffff" />
                    <span className="tracking-wider uppercase">Add to Server</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                  </a>
                </div>

                {/* Legal Documents Bar */}
                <div className="flex items-center justify-between text-[11px] font-mono pt-2 text-zinc-500 border-t border-zinc-800/80">
                  <div className="flex items-center gap-3">
                    <Link href="/discord-bot/veplexity/terms" className="hover:text-orange-400 transition-colors underline">
                      Terms of Service
                    </Link>
                    <span>•</span>
                    <Link href="/discord-bot/veplexity/privacy" className="hover:text-orange-400 transition-colors underline">
                      Privacy Policy
                    </Link>
                  </div>
                  <span className="text-zinc-600 font-semibold">100+ Commands</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── CARD 2: PINGPLEX ── */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="bot-card-container rounded-[2.5rem] bg-[#0c0716]/95 border-2 border-fuchsia-500/30 hover:border-fuchsia-500/80 transition-all duration-300 shadow-2xl hover:shadow-[0_0_50px_rgba(217,70,239,0.25)] flex flex-col justify-between overflow-hidden relative group backdrop-blur-xl"
          >
            {/* Top Atmospheric Gradient Accent */}
            <div className="h-40 bg-gradient-to-b from-[#240b2d] via-[#14081c] to-transparent p-6 sm:p-8 flex items-start justify-between relative overflow-hidden border-b border-fuchsia-500/20">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(217,70,239,0.35),transparent_70%)] pointer-events-none" />
              
              {/* Real PingPlex Logo (from E:\VePlexity\PP.png) */}
              <div className="relative group/logo">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-fuchsia-600 to-purple-600 opacity-60 blur-lg group-hover/logo:opacity-100 transition duration-300" />
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden border-2 border-fuchsia-500/60 shadow-2xl bg-[#12081f] p-2 flex items-center justify-center">
                  <img 
                    src="/bots/pingplex-avatar.png" 
                    alt="PingPlex Official Logo" 
                    className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(217,70,239,0.6)] group-hover/logo:scale-110 transition-transform duration-300"
                    onError={(e) => { e.currentTarget.src = "/bots/pp.png"; }}
                  />
                  <div className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0c0716]" title="Render Cluster Online" />
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="text-[11px] font-mono px-3.5 py-1 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/40 text-fuchsia-300 font-bold uppercase tracking-wider shadow-sm">
                  CREATOR STREAM ALERTS
                </span>
                <span className="text-[10px] font-mono text-zinc-500">ID: 1559520031916687430</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-black text-white group-hover:text-fuchsia-400 transition-colors">
                    PingPlex
                  </h2>
                  <span className="text-xs px-2.5 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 font-mono text-fuchsia-400 font-bold">
                    Live Studio
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  The zero-delay creator alert engine. Dispatches real-time webhooks for <strong>YouTube uploads &amp; shorts</strong>, <strong>Twitch live streams</strong>, <strong>TikToks</strong>, <strong>X (Twitter)</strong>, and <strong>Reddit</strong> with zero paywalls.
                </p>

                {/* Capability Pills with Reverse Scroll Animation */}
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  {[
                    { icon: Radio, label: "YouTube Upload & Shorts" },
                    { icon: Radio, label: "Twitch Live Webhooks" },
                    { icon: Radio, label: "TikTok Video Alerts" },
                    { icon: Radio, label: "X (Twitter) Feed Sync" },
                    { icon: Radio, label: "Subreddit Monitors" },
                    { icon: Zap, label: "100% Free Unlimited Feeds" },
                  ].map((feat, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-[#090412] border border-zinc-800/80 text-[11px] font-mono text-zinc-300 group-hover:border-fuchsia-500/20 transition-colors"
                    >
                      <feat.icon className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
                      <span className="truncate">{feat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons with Hardware Zoom-In Reveal */}
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <button
                    onClick={(e) => handleExploreBot(e, "pingplex")}
                    className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-rose-600 hover:from-fuchsia-500 hover:to-purple-500 text-white text-xs font-black transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-fuchsia-600/25 active:scale-95 group/btn cursor-pointer"
                  >
                    <span className="tracking-wider uppercase">Explore Bot</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>

                  <a
                    href="/invite/pingplex"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-black transition-all flex items-center justify-center gap-2 hover:border-fuchsia-500/40 active:scale-95"
                  >
                    <DiscordLogo className="w-4 h-4" fill="#ffffff" />
                    <span className="tracking-wider uppercase">Add to Server</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                  </a>
                </div>

                {/* Legal Documents Bar */}
                <div className="flex items-center justify-between text-[11px] font-mono pt-2 text-zinc-500 border-t border-zinc-800/80">
                  <div className="flex items-center gap-3">
                    <Link href="/discord-bot/pingplex/terms" className="hover:text-fuchsia-400 transition-colors underline">
                      Terms of Service
                    </Link>
                    <span>•</span>
                    <Link href="/discord-bot/pingplex/privacy" className="hover:text-fuchsia-400 transition-colors underline">
                      Privacy Policy
                    </Link>
                  </div>
                  <span className="text-zinc-600 font-semibold">Free Multi-Feed</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Global Legal Documents Card Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="p-6 sm:p-8 rounded-3xl bg-[#0c0514]/90 border border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-6 relative overflow-hidden"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-orange-400 text-sm font-bold uppercase font-mono">
              <Shield className="w-4 h-4" />
              <span>VEPLEXITY LEGAL ARCHITECTURE</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Full terms governing lossless VOIP DSP usage, Google Gemini multi-modal conversational AI, and encrypted MongoDB Atlas XP progression retention.
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
            <div className="flex items-center gap-2 text-fuchsia-400 text-sm font-bold uppercase font-mono">
              <Radio className="w-4 h-4" />
              <span>PINGPLEX LEGAL ARCHITECTURE</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Third-party API webhook dispatches (YouTube, Twitch, TikTok, X, Reddit) compliant with Discord Developer Terms of Service and zero private message logging.
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
        </motion.div>

        {/* Bottom BMC Support Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="p-5 sm:p-6 rounded-2xl bg-[#0d0716] border border-[#FFDD00]/25 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-[#FFDD00]/10 border border-[#FFDD00]/30 flex items-center justify-center shrink-0">
              <img src="/bmc/SVG Files/bmc-logo.svg" alt="BMC" className="w-5 h-5 object-contain" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Support 24/7 Hosting Nodes &amp; Zero Paywall Feeds</p>
              <p className="text-[11px] text-zinc-400">Back operating infrastructure on Buy Me a Coffee to keep lossless audio nodes and webhook workers online 24/7.</p>
            </div>
          </div>
          <a
            href="https://www.buymeacoffee.com/veplexity1"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-105 transition-transform shrink-0"
          >
            <img src="/bmc/SVG Files/bmc-button.svg" alt="Buy Me A Coffee" className="h-9 w-auto rounded-lg" />
          </a>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
