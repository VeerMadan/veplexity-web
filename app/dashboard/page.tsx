"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Server, Radio, ChevronRight, Music, Bell, Shield, ExternalLink, ArrowLeft 
} from "lucide-react";
import { DiscordLogo, DiscordVerifiedBadge, DiscordAppPill } from "@/app/components/BrandIcons";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function UnifiedDashboardHub() {
  return (
    <div className="min-h-screen bg-[#07030a] text-zinc-100 flex flex-col font-sans relative selection:bg-rose-500/30 overflow-x-hidden">
      <Navbar />

      {/* Atmospheric GTA 6 Sunset Ambient Glows */}
      <div className="fixed top-0 left-1/4 w-[650px] h-[650px] bg-gradient-to-br from-orange-600/15 via-rose-600/10 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed top-1/3 right-1/4 w-[650px] h-[650px] bg-gradient-to-bl from-fuchsia-600/15 via-purple-600/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 relative z-10 flex flex-col justify-center">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-zinc-300 font-bold uppercase tracking-wider backdrop-blur-md">
            <span>UNIFIED DASHBOARD HUB</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            SELECT BOT <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-500 to-fuchsia-500">DASHBOARD</span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
            Choose your dedicated server control console to configure 24/7 lossless music, AutoMod shields, or creator alert webhooks.
          </p>
        </div>

        {/* 2 Bot Dashboard Consoles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* 1. VePlexity Console */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="p-6 sm:p-7 rounded-3xl bg-[#10071a]/95 border-2 border-orange-500/30 hover:border-orange-500/70 transition-all duration-300 shadow-2xl flex flex-col justify-between space-y-6 relative overflow-hidden backdrop-blur-xl group"
          >
            <div className="flex items-start gap-4">
              <div className="relative shrink-0 flex items-center justify-center">
                <img 
                  src="/bots/veplexity-avatar.png" 
                  alt="VePlexity" 
                  className="w-16 h-16 object-contain filter drop-shadow-[0_8px_18px_rgba(249,115,22,0.5)] group-hover:scale-105 transition-transform"
                  onError={(e) => { e.currentTarget.src = "/vp-no-bg.png"; }}
                />
              </div>

              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-2xl font-black text-white group-hover:text-orange-400 transition-colors">
                    VePlexity
                  </h2>
                  <DiscordVerifiedBadge className="w-4 h-4 shrink-0" />
                  <DiscordAppPill />
                </div>
                <p className="text-xs font-mono text-orange-400 font-bold uppercase">
                  Server Management Dashboard
                </p>
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              Configure 24/7 lossless audio channel locks, hardware DSP volume, AutoMod anti-raid filters, and XP leveling progression.
            </p>

            <Link
              href="/discord-bots/veplexity/dashboard"
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-600 hover:from-orange-400 hover:to-rose-500 text-white font-black text-xs uppercase tracking-wider transition flex items-center justify-between shadow-lg shadow-orange-500/25 active:scale-95"
            >
              <span>OPEN VEPLEXITY DASHBOARD</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* 2. PingPlex Studio */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="p-6 sm:p-7 rounded-3xl bg-[#0c0716]/95 border-2 border-fuchsia-500/30 hover:border-fuchsia-500/70 transition-all duration-300 shadow-2xl flex flex-col justify-between space-y-6 relative overflow-hidden backdrop-blur-xl group"
          >
            <div className="flex items-start gap-4">
              <div className="relative shrink-0 flex items-center justify-center">
                <img 
                  src="/bots/pingplex-avatar.png" 
                  alt="PingPlex" 
                  className="w-16 h-16 object-contain filter drop-shadow-[0_8px_18px_rgba(217,70,239,0.5)] group-hover:scale-105 transition-transform"
                  onError={(e) => { e.currentTarget.src = "/bots/pp.png"; }}
                />
              </div>

              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-2xl font-black text-white group-hover:text-fuchsia-400 transition-colors">
                    PingPlex
                  </h2>
                  <DiscordVerifiedBadge className="w-4 h-4 shrink-0" />
                  <DiscordAppPill />
                </div>
                <p className="text-xs font-mono text-fuchsia-400 font-bold uppercase">
                  Alert Studio Dashboard
                </p>
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              Connect real-time YouTube, Twitch, TikTok, X, &amp; Reddit webhooks, customize 1-click message templates, and assign mention roles.
            </p>

            <Link
              href="/discord-bots/pingplex/dashboard"
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-rose-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-black text-xs uppercase tracking-wider transition flex items-center justify-between shadow-lg shadow-fuchsia-600/25 active:scale-95"
            >
              <span>OPEN ALERT STUDIO</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
