"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ChevronRight, ExternalLink, Music, 
  Award, Lock, Users, Bot, Mic, Zap, ArrowLeft, Radio, Bell, Shield, Sparkles, CheckCircle2
} from "lucide-react";
import { DiscordLogo, DiscordVerifiedBadge, DiscordAppPill } from "@/app/components/BrandIcons";
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

    // Get the card rect for zoom expansion
    const targetElement = e.currentTarget.closest(".bot-card-container") || e.currentTarget;
    const rect = targetElement.getBoundingClientRect();

    const botData: ZoomRevealBotData = botType === "veplexity" ? {
      name: "VePlexity Bot",
      avatarUrl: "/bots/veplexity-avatar.png",
      tagline: "VePlexity All-In-One",
      accentColor: "orange",
    } : {
      name: "PingPlex",
      avatarUrl: "/bots/pingplex-avatar.png",
      tagline: "PingPlex Creator Alerts",
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
    }, 450);
  };

  return (
    <div className="min-h-screen bg-[#07030a] text-zinc-100 flex flex-col font-sans relative selection:bg-rose-500/30 overflow-x-hidden">
      <Navbar />

      {/* Pure Cinematic Zoom-in Card Dissolve Overlay (No box, no borders) */}
      {zoomRect && zoomBot && (
        <CardZoomRevealCanvas rect={zoomRect} bot={zoomBot} />
      )}

      {/* Atmospheric GTA 6 Sunset Ambient Hues */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-orange-600/10 via-rose-600/5 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed top-1/3 right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-fuchsia-600/10 via-purple-600/5 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <main className="flex-1 w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 relative z-10 flex flex-col justify-center space-y-10 sm:space-y-12">
        
        {/* Header Hero Section: Compact and fits above the fold */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-3 max-w-3xl mx-auto"
        >
          {/* Subtle Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-zinc-300 font-bold uppercase tracking-wider backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
            <span>DUAL DISCORD BOT PLATFORM</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-none">
            CHOOSE YOUR{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-400 to-fuchsia-400">
              DISCORD BOT
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl mx-auto">
            Explore dedicated command consoles, live typing simulators, full legal terms, and launch your server dashboard with seamless liquid transitions.
          </p>
        </motion.div>

        {/* Dual Bot Showcase Deck: Sleek, Compact Cards that fit comfortably on 1080p */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 w-full max-w-6xl mx-auto items-stretch">
          
          {/* ── CARD 1: VEPLEXITY BOT ── */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bot-card-container rounded-3xl bg-[#0d0714]/85 border border-white/[0.08] hover:border-orange-500/40 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden relative group backdrop-blur-2xl p-6 sm:p-7 space-y-6"
          >
            {/* Top Row: Unboxed Logo + Verified Title + Status */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Unboxed Crisp Logo (Zero enclosing box) */}
                <div className="relative shrink-0 flex items-center justify-center">
                  <img 
                    src="/bots/veplexity-avatar.png" 
                    alt="VePlexity Bot Logo" 
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.currentTarget.src = "/vp-no-bg.png"; }}
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-2xl sm:text-3xl font-black text-white group-hover:text-orange-400 transition-colors">
                      VePlexity
                    </h2>
                    <DiscordVerifiedBadge className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <DiscordAppPill />
                  </div>
                  <p className="text-xs font-mono text-zinc-400">
                    All-in-One Community Engine • v2.0
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex flex-col items-end shrink-0">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Lossless VOIP Online</span>
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                Enterprise community powerhouse featuring <strong>24/7 lossless music streaming</strong>, proactive <strong>AutoMod security</strong>, XP leveling &amp; rank cards, and <strong>Google Gemini multi-modal AI</strong>.
              </p>

              {/* 3 Sleek Pill Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { icon: Music, label: "24/7 Lossless Audio DJ" },
                  { icon: Lock, label: "AutoMod & Security Logs" },
                  { icon: Bot, label: "Google Gemini 2.5 AI" },
                ].map((feat, idx) => (
                  <span 
                    key={idx} 
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-zinc-300 shadow-sm"
                  >
                    <feat.icon className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    <span>{feat.label}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Neo-Skeuomorphic Liquid Glass Action Buttons */}
            <div className="space-y-3 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={(e) => handleExploreBot(e, "veplexity")}
                  className="w-full py-3 px-5 rounded-xl bg-white/[0.10] hover:bg-white/[0.16] border border-white/20 hover:border-white/30 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_20px_rgba(0,0,0,0.35)] backdrop-blur-xl active:scale-[0.98] cursor-pointer group/btn"
                >
                  <span className="tracking-wider uppercase">Explore Bot</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 text-orange-400" />
                </button>

                <a
                  href="/invite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-5 rounded-xl bg-transparent hover:bg-white/[0.06] border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl active:scale-[0.98]"
                >
                  <DiscordLogo className="w-4 h-4" fill="#ffffff" />
                  <span className="tracking-wider uppercase">Add to Server</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400" />
                </a>
              </div>

              {/* Legal Documents Bar */}
              <div className="flex items-center justify-between text-[11px] font-mono pt-2 text-zinc-500 border-t border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <Link href="/discord-bot/veplexity/terms" className="hover:text-orange-400 transition-colors underline">
                    Terms of Service
                  </Link>
                  <span>•</span>
                  <Link href="/discord-bot/veplexity/privacy" className="hover:text-orange-400 transition-colors underline">
                    Privacy Policy
                  </Link>
                </div>
                <span className="text-zinc-500 font-medium">100+ Free Commands</span>
              </div>
            </div>
          </motion.div>

          {/* ── CARD 2: PINGPLEX ── */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bot-card-container rounded-3xl bg-[#0c0716]/85 border border-white/[0.08] hover:border-fuchsia-500/40 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden relative group backdrop-blur-2xl p-6 sm:p-7 space-y-6"
          >
            {/* Top Row: Unboxed Logo + Verified Title + Status */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Unboxed Crisp Logo (Zero enclosing box) */}
                <div className="relative shrink-0 flex items-center justify-center">
                  <img 
                    src="/bots/pingplex-avatar.png" 
                    alt="PingPlex Bot Logo" 
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.currentTarget.src = "/bots/pp.png"; }}
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-2xl sm:text-3xl font-black text-white group-hover:text-fuchsia-400 transition-colors">
                      PingPlex
                    </h2>
                    <DiscordVerifiedBadge className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <DiscordAppPill />
                  </div>
                  <p className="text-xs font-mono text-zinc-400">
                    Creator Alerts Studio Engine
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex flex-col items-end shrink-0">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Render Cluster Live</span>
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                Sub-second creator alerts dispatches for <strong>YouTube uploads &amp; shorts</strong>, <strong>Twitch live streams</strong>, <strong>TikTok</strong>, <strong>X (Twitter)</strong>, and <strong>Reddit</strong> with zero paywalls.
              </p>

              {/* 3 Sleek Pill Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { icon: Radio, label: "YouTube & Shorts Alerts" },
                  { icon: Radio, label: "Twitch Live EventSub" },
                  { icon: Zap, label: "100% Free Unlimited Feeds" },
                ].map((feat, idx) => (
                  <span 
                    key={idx} 
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-zinc-300 shadow-sm"
                  >
                    <feat.icon className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
                    <span>{feat.label}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Neo-Skeuomorphic Liquid Glass Action Buttons */}
            <div className="space-y-3 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={(e) => handleExploreBot(e, "pingplex")}
                  className="w-full py-3 px-5 rounded-xl bg-white/[0.10] hover:bg-white/[0.16] border border-white/20 hover:border-white/30 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_20px_rgba(0,0,0,0.35)] backdrop-blur-xl active:scale-[0.98] cursor-pointer group/btn"
                >
                  <span className="tracking-wider uppercase">Explore Bot</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 text-fuchsia-400" />
                </button>

                <a
                  href="/invite/pingplex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-5 rounded-xl bg-transparent hover:bg-white/[0.06] border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl active:scale-[0.98]"
                >
                  <DiscordLogo className="w-4 h-4" fill="#ffffff" />
                  <span className="tracking-wider uppercase">Add to Server</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400" />
                </a>
              </div>

              {/* Legal Documents Bar */}
              <div className="flex items-center justify-between text-[11px] font-mono pt-2 text-zinc-500 border-t border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <Link href="/discord-bot/pingplex/terms" className="hover:text-fuchsia-400 transition-colors underline">
                    Terms of Service
                  </Link>
                  <span>•</span>
                  <Link href="/discord-bot/pingplex/privacy" className="hover:text-fuchsia-400 transition-colors underline">
                    Privacy Policy
                  </Link>
                </div>
                <span className="text-zinc-500 font-medium">Free Multi-Feed</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Global Legal Documents Card Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="max-w-6xl mx-auto w-full p-6 sm:p-7 rounded-3xl bg-[#0c0514]/75 border border-white/[0.07] grid grid-cols-1 md:grid-cols-2 gap-6 relative overflow-hidden backdrop-blur-xl shadow-lg"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase font-mono">
              <Shield className="w-4 h-4" />
              <span>VEPLEXITY LEGAL ARCHITECTURE</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Full terms governing 24/7 lossless audio streaming, Google Gemini multi-modal conversational AI, AutoMod moderation, and encrypted database retention.
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
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="max-w-6xl mx-auto w-full p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-9 h-9 rounded-xl bg-[#FFDD00]/10 border border-[#FFDD00]/30 flex items-center justify-center shrink-0">
              <img src="/bmc/SVG Files/bmc-logo.svg" alt="BMC" className="w-4 h-4 object-contain" />
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
            <img src="/bmc/SVG Files/bmc-button.svg" alt="Buy Me A Coffee" className="h-8 w-auto rounded-lg" />
          </a>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
