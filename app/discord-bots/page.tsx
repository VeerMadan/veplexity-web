"use client";

import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { 
  Shield, Radio, ChevronRight, ExternalLink, Music, 
  Award, Lock, Users, Bot, Mic, Zap, Star, AlertCircle, ArrowLeft
} from "lucide-react";
import { DiscordLogo, BmcCupIcon } from "@/app/components/BrandIcons";

export default function DiscordBotsHubPage() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen bg-[#0a0512] text-zinc-100 flex flex-col font-sans relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="border-b border-zinc-800/80 bg-[#0c0714]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#140b20] border border-orange-500/30 p-1 flex items-center justify-center">
                <img 
                  src="/vp-logo-icon.png" 
                  alt="VP" 
                  className="w-full h-full object-contain" 
                  onError={(e) => { e.currentTarget.style.display = "none"; }} 
                />
              </div>
              <span className="font-black text-sm tracking-tight text-white uppercase">
                VEPLEXITY
              </span>
            </Link>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 font-mono uppercase font-bold">
              DISCORD BOTS HUB
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="https://www.buymeacoffee.com/veplexity1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-90 hover:scale-105 transition-all hidden sm:block"
              title="Support on Buy Me a Coffee"
            >
              <img 
                src="/bmc/SVG Files/bmc-button.svg" 
                alt="Buy Me a Coffee" 
                className="h-8 w-auto rounded-lg shadow-sm" 
              />
            </a>

            <Link
              href="/"
              className="text-xs text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 transition flex items-center gap-1.5 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Overview</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Hub Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex-1 flex flex-col justify-center space-y-10 relative z-10">
        {/* Title & Directive */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            <span>DUAL DISCORD ECOSYSTEM</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            CHOOSE YOUR BOT CONSOLE
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
            Access dedicated, specialized dashboards built specifically for each Discord application. Select a bot below to launch its server management console.
          </p>
        </div>

        {/* Dual Bot Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Card 1: VePlexity Bot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="rounded-3xl bg-[#120a1d] border border-zinc-800/80 hover:border-rose-500/50 flex flex-col justify-between overflow-hidden relative shadow-2xl group transition-all"
          >
            {/* Top Accent Backdrop */}
            <div className="h-32 bg-gradient-to-b from-[#221028] via-[#160b1e] to-transparent p-6 flex items-start justify-between relative overflow-hidden border-b border-zinc-800/50">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(244,63,94,0.22),transparent_70%)] pointer-events-none" />
              
              <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border-2 border-rose-500/30 flex items-center justify-center text-rose-400 shadow-xl group-hover:scale-105 transition-transform">
                <Shield className="w-7 h-7" />
              </div>

              <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-rose-500/20 border border-rose-500/40 text-rose-300 font-bold uppercase tracking-wider">
                ALL-IN-ONE POWERHOUSE
              </span>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black text-white group-hover:text-rose-300 transition-colors">
                    VePlexity Bot
                  </h2>
                  <span className="text-xs px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 font-mono text-zinc-400 font-semibold">
                    v2.0
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                  The complete community powerhouse. Manage 24/7 lossless music, proactive AutoMod security, leveling XP, reaction roles, and automated moderation across all your servers.
                </p>

                {/* Features Strip */}
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  {[
                    { icon: Music, label: "24/7 Lossless Audio DJ" },
                    { icon: Lock, label: "Proactive AutoMod Defense" },
                    { icon: Award, label: "XP Leveling & Rank Cards" },
                    { icon: Users, label: "Reaction Role Menus" },
                    { icon: Bot, label: "Gemini AI Chatbot" },
                    { icon: Mic, label: "Dynamic Temp Voice Hubs" },
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-[#0a0512] border border-zinc-800/80 text-[11px] font-mono text-zinc-300">
                      <feat.icon className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      <span className="truncate">{feat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-2">
                <Link
                  href="/discord-bots/veplexity"
                  className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-600 hover:from-orange-400 hover:to-rose-500 text-white text-xs font-black transition-all flex items-center justify-between shadow-lg shadow-rose-500/25 active:scale-98 group/btn"
                >
                  <span className="tracking-wider uppercase">MANAGE VEPLEXITY BOT</span>
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover/btn:translate-x-1">
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </div>
                </Link>

                <div className="flex items-center justify-between text-xs px-1">
                  <a
                    href="/invite"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-rose-400 transition-colors font-mono font-semibold flex items-center gap-1"
                  >
                    <span>Direct Bot Invite</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-[10px] font-mono text-zinc-600">ID: 1556640364448714752</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: PingPlex */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="rounded-3xl bg-[#0d0f17] border border-zinc-800 hover:border-fuchsia-500/50 flex flex-col justify-between overflow-hidden relative shadow-2xl group transition-all"
          >
            {/* Top Accent Backdrop */}
            <div className="h-32 bg-gradient-to-b from-fuchsia-950/40 via-fuchsia-950/10 to-transparent p-6 flex items-start justify-between relative overflow-hidden border-b border-zinc-800/50">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(217,70,239,0.22),transparent_70%)] pointer-events-none" />
              
              <div className="w-14 h-14 rounded-2xl bg-fuchsia-500/10 border-2 border-fuchsia-500/30 flex items-center justify-center text-fuchsia-400 shadow-xl group-hover:scale-105 transition-transform">
                <Radio className="w-7 h-7" />
              </div>

              <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/40 text-fuchsia-300 font-bold uppercase tracking-wider">
                CREATOR STREAM ALERTS
              </span>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black text-white group-hover:text-fuchsia-300 transition-colors">
                    PingPlex
                  </h2>
                  <span className="text-xs px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 font-mono text-fuchsia-400 font-semibold">
                    Studio
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                  The zero-delay creator alert engine. Streamline live notifications for YouTube uploads, Twitch streams, TikToks, X (Twitter) tweets, and Reddit threads with zero paywalls.
                </p>

                {/* Features Strip */}
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  {[
                    { icon: Radio, label: "YouTube Upload & Shorts" },
                    { icon: Radio, label: "Twitch Live Webhooks" },
                    { icon: Radio, label: "X (Twitter) Feed Sync" },
                    { icon: Radio, label: "TikTok Video Alerts" },
                    { icon: Radio, label: "Subreddit Monitors" },
                    { icon: Zap, label: "100% Free Unlimited Feeds" },
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-[#090b12] border border-zinc-800/80 text-[11px] font-mono text-zinc-300">
                      <feat.icon className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
                      <span className="truncate">{feat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-2">
                <Link
                  href="/discord-bots/pingplex"
                  className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-rose-600 hover:from-fuchsia-500 hover:to-purple-500 text-white text-xs font-black transition-all flex items-center justify-between shadow-lg shadow-fuchsia-600/25 active:scale-98 group/btn"
                >
                  <span className="tracking-wider uppercase">MANAGE PINGPLEX</span>
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover/btn:translate-x-1">
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </div>
                </Link>

                <div className="flex items-center justify-between text-xs px-1">
                  <a
                    href="/invite/pingplex"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-fuchsia-400 transition-colors font-mono font-semibold flex items-center gap-1"
                  >
                    <span>Direct Bot Invite</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-[10px] font-mono text-zinc-600">ID: 1559520031916687430</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom BMC Support Banner */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0d0f15] border border-[#FFDD00]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
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
        </div>
      </div>
    </main>
  );
}
