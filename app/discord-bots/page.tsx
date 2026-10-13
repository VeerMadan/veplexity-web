"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { 
  ChevronRight, ExternalLink, Music, 
  Award, Lock, Users, Bot, Mic, Zap, ArrowLeft, Radio, Bell, Shield, Sparkles
} from "lucide-react";
import { DiscordLogo } from "@/app/components/BrandIcons";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function DiscordBotsHubPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-[#0a0512] text-zinc-100 flex flex-col font-sans relative selection:bg-rose-500/30">
      <Navbar />

      <main className="flex-1 flex flex-col justify-center relative overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-orange-600/15 via-rose-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-fuchsia-600/15 via-purple-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

        {/* Main Hub Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex-1 flex flex-col justify-center space-y-10 relative z-10 w-full">
          {/* Title & Directive */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
              <span>OFFICIAL DISCORD BOTS ECOSYSTEM</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              CHOOSE YOUR DISCORD BOT
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
              Select an official bot below to explore interactive features, command documentation, terms of service, and launch the dedicated server management console.
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
              className="rounded-3xl bg-[#120a1d] border border-zinc-800/80 hover:border-orange-500/50 flex flex-col justify-between overflow-hidden relative shadow-2xl group transition-all"
            >
              {/* Top Accent Backdrop with Real PFP */}
              <div className="h-36 bg-gradient-to-b from-[#25102a] via-[#160b1e] to-transparent p-6 flex items-start justify-between relative overflow-hidden border-b border-zinc-800/50">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(249,115,22,0.25),transparent_70%)] pointer-events-none" />
                
                {/* Official VePlexity Avatar */}
                <div className="relative w-18 h-18 rounded-2xl overflow-hidden border-2 border-orange-500/50 shadow-[0_0_25px_rgba(249,115,22,0.35)] shrink-0 bg-[#140b20] group-hover:scale-105 transition-transform">
                  <img 
                    src="/bots/veplexity-avatar.png" 
                    alt="VePlexity Bot Official Avatar" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/vp-no-bg.png";
                    }}
                  />
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#120a1d]" title="Online 24/7" />
                </div>

                <div className="flex flex-col items-end gap-1.5">
                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-rose-500/20 border border-orange-500/40 text-orange-300 font-bold uppercase tracking-wider">
                    ALL-IN-ONE POWERHOUSE
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">ID: 1556640364448714752</span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black text-white group-hover:text-orange-400 transition-colors">
                      VePlexity Bot
                    </h2>
                    <span className="text-xs px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 font-mono text-zinc-400 font-semibold">
                      v2.0 Commercial
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                    The complete Discord powerhouse. Features 24/7 lossless music streaming, proactive AutoMod defense, XP leveling rank cards, Gemini AI multi-modal chat, and dynamic temp voice hubs.
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Link
                      href="/discord-bot/veplexity"
                      className="py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-600 hover:from-orange-400 hover:to-rose-500 text-white text-xs font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 active:scale-98 group/btn"
                    >
                      <span className="tracking-wider uppercase">Explore Bot</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>

                    <a
                      href="/invite"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-black transition-all flex items-center justify-center gap-2 hover:border-orange-500/40"
                    >
                      <DiscordLogo className="w-3.5 h-3.5" fill="#ffffff" />
                      <span className="tracking-wider uppercase">Add to Server</span>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                    </a>
                  </div>

                  {/* Legal Sublinks */}
                  <div className="flex items-center justify-between text-[11px] font-mono pt-1 text-zinc-500 border-t border-zinc-800/60">
                    <div className="flex items-center gap-3">
                      <Link href="/discord-bot/veplexity/terms" className="hover:text-orange-400 transition-colors">
                        Terms of Service
                      </Link>
                      <span>•</span>
                      <Link href="/discord-bot/veplexity/privacy" className="hover:text-orange-400 transition-colors">
                        Privacy Policy
                      </Link>
                    </div>
                    <span className="text-zinc-600">100 Commands</span>
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
              {/* Top Accent Backdrop with Real PFP */}
              <div className="h-36 bg-gradient-to-b from-fuchsia-950/40 via-fuchsia-950/10 to-transparent p-6 flex items-start justify-between relative overflow-hidden border-b border-zinc-800/50">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(217,70,239,0.25),transparent_70%)] pointer-events-none" />
                
                {/* Official PingPlex Avatar */}
                <div className="relative w-18 h-18 rounded-2xl overflow-hidden border-2 border-fuchsia-500/50 shadow-[0_0_25px_rgba(217,70,239,0.35)] shrink-0 bg-[#160b20] group-hover:scale-105 transition-transform">
                  <img 
                    src="/bots/pingplex-avatar.png" 
                    alt="PingPlex Official Avatar" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/vp-logo-icon.png";
                    }}
                  />
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0d0f17]" title="Render Online" />
                </div>

                <div className="flex flex-col items-end gap-1.5">
                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/40 text-fuchsia-300 font-bold uppercase tracking-wider">
                    CREATOR STREAM ALERTS
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">ID: 1559520031916687430</span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black text-white group-hover:text-fuchsia-300 transition-colors">
                      PingPlex
                    </h2>
                    <span className="text-xs px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 font-mono text-fuchsia-400 font-semibold">
                      Live Studio
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                    The zero-delay creator notification engine. Automated live alerts for YouTube uploads, Twitch streams, TikToks, X (Twitter) tweets, and Reddit threads with zero paywalls.
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Link
                      href="/discord-bot/pingplex"
                      className="py-3 px-4 rounded-xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-rose-600 hover:from-fuchsia-500 hover:to-purple-500 text-white text-xs font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-fuchsia-600/25 active:scale-98 group/btn"
                    >
                      <span className="tracking-wider uppercase">Explore Bot</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>

                    <a
                      href="/invite/pingplex"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-black transition-all flex items-center justify-center gap-2 hover:border-fuchsia-500/40"
                    >
                      <DiscordLogo className="w-3.5 h-3.5" fill="#ffffff" />
                      <span className="tracking-wider uppercase">Add to Server</span>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                    </a>
                  </div>

                  {/* Legal Sublinks */}
                  <div className="flex items-center justify-between text-[11px] font-mono pt-1 text-zinc-500 border-t border-zinc-800/60">
                    <div className="flex items-center gap-3">
                      <Link href="/discord-bot/pingplex/terms" className="hover:text-fuchsia-400 transition-colors">
                        Terms of Service
                      </Link>
                      <span>•</span>
                      <Link href="/discord-bot/pingplex/privacy" className="hover:text-fuchsia-400 transition-colors">
                        Privacy Policy
                      </Link>
                    </div>
                    <span className="text-zinc-600">Free Multi-Feed</span>
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

      <Footer />
    </div>
  );
}
