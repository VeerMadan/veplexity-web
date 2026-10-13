"use client";

import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { 
  Shield, Radio, ChevronRight, Music, 
  Award, Lock, Bot, Mic, Zap, Heart, ArrowRight,
  Video, Play, Share2, CheckCircle2, Sparkles, Plus
} from "lucide-react";
import { DiscordLogo } from "@/app/components/BrandIcons";

export default function DiscordBotsShowcaseHubPage() {
  return (
    <div className="min-h-screen bg-[#0a0512] text-white selection:bg-rose-500/30 overflow-hidden flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 py-16 relative z-10 space-y-16">
        {/* HERO SECTION */}
        <div className="text-center space-y-4 max-w-3xl mx-auto relative">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-orange-500/15 via-rose-500/15 to-fuchsia-600/15 blur-[140px] rounded-full pointer-events-none" />

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500/15 via-rose-500/15 to-fuchsia-500/15 border border-rose-500/30 text-rose-300 font-mono text-xs font-bold shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            <span>DISCORD BOT ECOSYSTEM</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase"
          >
            Two Specialized Bots. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-500">
              Zero Conflicts. Total Power.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal"
          >
            Engineered by Veer Madan. We built two completely separated Discord bots with dedicated backends, distinct dashboards, and specialized architectures. Choose your bot below to explore features, invite, or launch the console.
          </motion.p>
        </div>

        {/* DUAL BOT SHOWCASE CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {/* BOT 1: VePlexity Bot */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[2.5rem] bg-[#120a1d] border-2 border-rose-500/30 hover:border-rose-500/60 transition-all duration-300 flex flex-col justify-between overflow-hidden relative shadow-2xl group"
          >
            <div className="p-8 sm:p-10 space-y-6">
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#1b0f2a] border border-rose-500/40 flex items-center justify-center text-rose-400 shadow-lg group-hover:scale-105 transition-transform">
                  <Shield className="w-7 h-7" />
                </div>
                <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-rose-500/20 border border-rose-500/40 text-rose-300 font-mono text-[11px] font-black uppercase tracking-wider">
                  COMMUNITY POWERHOUSE
                </span>
              </div>

              {/* Title & Desc */}
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-white group-hover:text-rose-300 transition-colors tracking-tight">
                  VePlexity Bot
                </h2>
                <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                  The complete all-in-one Discord powerhouse. 24/7 lossless audio streaming, proactive AutoMod defense, Gemini conversational AI, XP leveling, and dynamic temporary voice hubs.
                </p>
              </div>

              {/* Features Matrix */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                {[
                  { icon: Music, label: "24/7 Lossless Audio DJ" },
                  { icon: Lock, label: "Proactive AutoMod Shield" },
                  { icon: Award, label: "XP Leveling & Rank Cards" },
                  { icon: Bot, label: "Google Gemini AI Assistant" },
                  { icon: Mic, label: "Join-to-Create Temp VCs" },
                  { icon: Zap, label: "100 Production Commands" },
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-black/40 border border-zinc-800 text-xs font-mono text-zinc-300">
                    <feat.icon className="w-4 h-4 text-orange-400 shrink-0" />
                    <span className="truncate">{feat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="p-8 sm:p-10 pt-0 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href="/invite"
                  className="py-3.5 px-5 rounded-2xl bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-600 hover:from-orange-400 hover:to-rose-500 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 active:scale-98 transition-all"
                >
                  <DiscordLogo className="w-4 h-4" fill="#ffffff" />
                  <span>Add VePlexity Bot</span>
                </Link>

                <Link
                  href="/discord-bots/veplexity"
                  className="py-3.5 px-5 rounded-2xl bg-[#180f24] hover:bg-[#201330] text-rose-300 border border-rose-500/40 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Launch Console Deck</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 px-1">
                <Link href="/bot/veplexity" className="text-zinc-400 hover:text-white font-mono flex items-center gap-1 text-[11px] transition-colors">
                  <span>View All 100 Commands &amp; Architecture →</span>
                </Link>
                <span className="font-mono text-[10px] text-zinc-500">ID: 1556640364448714752</span>
              </div>
            </div>
          </motion.div>

          {/* BOT 2: PingPlex */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[2.5rem] bg-[#140b20] border-2 border-fuchsia-500/30 hover:border-fuchsia-500/60 transition-all duration-300 flex flex-col justify-between overflow-hidden relative shadow-2xl group"
          >
            <div className="p-8 sm:p-10 space-y-6">
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#1e0f2d] border border-fuchsia-500/40 flex items-center justify-center text-fuchsia-400 shadow-lg group-hover:scale-105 transition-transform">
                  <Radio className="w-7 h-7" />
                </div>
                <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-fuchsia-500/20 to-purple-500/20 border border-fuchsia-500/40 text-fuchsia-300 font-mono text-[11px] font-black uppercase tracking-wider">
                  CREATOR ALERTS STUDIO
                </span>
              </div>

              {/* Title & Desc */}
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-white group-hover:text-fuchsia-300 transition-colors tracking-tight">
                  PingPlex
                </h2>
                <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                  The zero-delay creator alert engine for Discord. Instant sub-second notification dispatches for YouTube, Twitch, TikTok, X (Twitter), and Reddit with zero paywalls.
                </p>
              </div>

              {/* Features Matrix */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                {[
                  { icon: Play, label: "YouTube Uploads & Streams" },
                  { icon: Video, label: "Twitch Live Webhooks" },
                  { icon: Share2, label: "TikTok Video Alerts" },
                  { icon: Radio, label: "X (Twitter) Feed Sync" },
                  { icon: Share2, label: "Subreddit Monitors" },
                  { icon: Zap, label: "Unlimited Free Feeds" },
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-black/40 border border-zinc-800 text-xs font-mono text-zinc-300">
                    <feat.icon className="w-4 h-4 text-fuchsia-400 shrink-0" />
                    <span className="truncate">{feat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="p-8 sm:p-10 pt-0 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href="/invite/pingplex"
                  className="py-3.5 px-5 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-rose-600 hover:from-fuchsia-500 hover:to-purple-500 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-fuchsia-500/25 active:scale-98 transition-all"
                >
                  <DiscordLogo className="w-4 h-4" fill="#ffffff" />
                  <span>Add PingPlex Bot</span>
                </Link>

                <Link
                  href="/discord-bots/pingplex"
                  className="py-3.5 px-5 rounded-2xl bg-[#1e0f2d] hover:bg-[#28143c] text-fuchsia-300 border border-fuchsia-500/40 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Launch Creator Studio</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 px-1">
                <Link href="/bot/pingplex" className="text-zinc-400 hover:text-white font-mono flex items-center gap-1 text-[11px] transition-colors">
                  <span>View All 5 Supported Creator Feeds →</span>
                </Link>
                <span className="font-mono text-[10px] text-zinc-500">ID: 1559520031916687430</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* COMPARISON MATRIX FOR INDIAN & GLOBAL USERS */}
        <div className="p-8 sm:p-12 rounded-[2.5rem] bg-[#120a1d] border-2 border-rose-500/20 space-y-8 shadow-xl">
          <div className="text-center space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Which Bot Does Your Server Need?
            </h3>
            <p className="text-sm text-zinc-400 max-w-xl mx-auto">
              Most servers invite both! VePlexity manages music &amp; security, while PingPlex handles creator alerts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-black/40 border border-zinc-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">Choose VePlexity Bot If:</h4>
                  <p className="text-xs text-zinc-400 font-mono">Community &amp; Infrastructure</p>
                </div>
              </div>
              <ul className="text-xs text-zinc-300 space-y-2.5 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold">✓</span>
                  <span>You want 24/7 high-fidelity music streaming without voice drops.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold">✓</span>
                  <span>You want server protection: AutoMod shields against invites, spam &amp; links.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold">✓</span>
                  <span>You want chat activity XP leveling, rank cards, and automated milestone roles.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold">✓</span>
                  <span>You want conversational Google Gemini AI chatbot interactions.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-zinc-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-fuchsia-500/20 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-400">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">Choose PingPlex If:</h4>
                  <p className="text-xs text-zinc-400 font-mono">Creator Feeds &amp; Alerts</p>
                </div>
              </div>
              <ul className="text-xs text-zinc-300 space-y-2.5 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-fuchsia-400 font-bold">✓</span>
                  <span>You are a YouTuber or streamer who wants automatic live notifications.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-fuchsia-400 font-bold">✓</span>
                  <span>You want instant Twitch stream announcements with thumbnails and titles.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-fuchsia-400 font-bold">✓</span>
                  <span>You want to relay TikTok video drops directly into your server.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-fuchsia-400 font-bold">✓</span>
                  <span>You want 100% free alerts with zero feed limits and zero paid paywalls.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
