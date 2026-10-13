"use client";

import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { 
  Bot, Music, Shield, Sparkles, Sliders, Database, 
  ExternalLink, Heart, Terminal, ArrowRight, Zap, ChevronRight,
  Layers, Lock, Award, Radio, Mic, Users, Megaphone
} from "lucide-react";
import { DiscordLogo } from "@/app/components/BrandIcons";

export default function VePlexityBotShowcasePage() {
  const features = [
    {
      icon: <Terminal className="w-8 h-8 text-orange-400" />,
      title: "Dual-Engine Hybrid Command Runner",
      badge: "Instant . / ? / !",
      borderColor: "hover:border-orange-500/50",
      description: "Supports instant prefix commands (.purge, .afk, ?purge, !help) with fast-typing aliases (.bal, .p, .np, .q, .vol) alongside modern Discord slash commands (/), complete with 5-second auto-clearing purge alerts.",
    },
    {
      icon: <Music className="w-8 h-8 text-rose-500" />,
      title: "Lossless Audio DSP Engine",
      badge: "48kHz VOIP",
      borderColor: "hover:border-rose-500/50",
      description: "Low-latency audio streaming architecture with queue looping, dynamic bass boost filters, volume calibration, and 24/7 voice stay in dedicated channels.",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-amber-500" />,
      title: "Google Gemini AI Assistant",
      badge: "Multi-Modal",
      borderColor: "hover:border-amber-500/50",
      description: "Direct conversational AI module powered by Gemini. Supports custom server personas, contextual conversational memory, and image prompt generation.",
    },
    {
      icon: <Shield className="w-8 h-8 text-rose-500" />,
      title: "100% Free Moderation Suite",
      badge: "Permanent Free",
      borderColor: "hover:border-rose-500/50",
      description: "All server safety tools (/ban, /kick, /warn, /timeout, .purge, /lock) remain permanently free with zero paywalls. Case-indexed audit logs with auto-moderation.",
    },
    {
      icon: <Award className="w-8 h-8 text-fuchsia-500" />,
      title: "XP Leveling & Rank Cards",
      badge: "Free VIP Feature",
      borderColor: "hover:border-fuchsia-500/50",
      description: "Custom rank card generator with avatar bezels, XP progression bars, level-up celebration alerts, and automated role rewards upon reaching milestones.",
    },
    {
      icon: <Mic className="w-8 h-8 text-orange-400" />,
      title: "Dynamic Temp Voice Hubs",
      badge: "Join-To-Create",
      borderColor: "hover:border-orange-500/50",
      description: "Automated join-to-create temporary voice channels with customizable user bitrates and user limits that cleanly self-delete when members disconnect.",
    },
  ];

  const commandCategories = [
    {
      category: "Dual-Engine Rapid Prefix Aliases (. / ? / !)",
      commands: [
        ".purge [amount]", ".afk [reason]", ".bal", ".p [query]", 
        ".q", ".np", ".vol [0-100]", ".dc", ".w @user [reason]", 
        ".mute", ".unmute", ".av @user", ".h", ".si", ".ui", ".cf", ".8b"
      ],
    },
    {
      category: "Standalone Social & Roleplay Actions",
      commands: [
        "/hug", "/kiss", "/pat", "/slap", "/bite", "/cuddle", 
        "/poke", "/tickle", "/bonk", "/punch", "/blush", "/wink", "/lick", "/cry"
      ],
    },
    {
      category: "Music & Audio DSP (24/7 Voice Retention)",
      commands: ["/play", "/skip", "/queue", "/volume", "/247", "/pause", "/resume", "/stop", "/lyrics"],
    },
    {
      category: "AI & Intelligence (Google Gemini Multi-Modal)",
      commands: ["/gemini ask", "/gemini reset", "/gemini persona", "/gemini vision", "/imagine"],
    },
    {
      category: "100% Free Moderation & Server Protection",
      commands: ["/ban", "/kick", "/timeout", "/warn", "/warnings", "/clearwarns", "/lock", "/unlock", "/purge", "/modlogs", "/massmod"],
    },
    {
      category: "System, Economy & Activity Rewards",
      commands: ["/setup", "/setwelcome", "/reactionrole", "/announce", "/botinfo", "/serverinfo", "/rank", "/balance", "/daily", "/work"],
    },
    {
      category: "Interactive & Mini-Games",
      commands: ["/tictactoe", "/connect4", "/rps", "/trivia", "/truth-or-dare", "/8ball", "/avatar"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0512] text-white selection:bg-rose-500/30 overflow-hidden flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 py-16 relative z-10">
        
        {/* HERO SECTION - GTA 6 SUNSET THEME */}
        <div className="border-b border-rose-500/10 pb-16 mb-16 relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-500/15 via-rose-500/15 to-fuchsia-600/15 blur-[150px] rounded-full pointer-events-none" />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center gap-2.5 px-4 py-2 border border-orange-500/40 text-orange-400 rounded-xl font-mono text-xs font-black uppercase tracking-widest bg-gradient-to-r from-orange-500/10 via-rose-500/10 to-transparent shadow-[0_0_20px_rgba(249,115,22,0.15)] w-fit"
          >
            <Shield className="w-4 h-4 text-orange-400" />
            <span>VePlexity Commercial Bot • 100 Production Commands • Dual-Engine</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black text-white tracking-tighter leading-[1] mb-6 drop-shadow-[0_0_20px_rgba(244,63,94,0.3)] max-w-4xl"
          >
            VePlexity Bot <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-500">
              Community Powerhouse.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-zinc-300 max-w-3xl mb-10 leading-relaxed font-normal"
          >
            Production-grade Discord cloud infrastructure engineered by Veer Madan. Featuring 24/7 lossless DJ music, context-aware Gemini AI, proactive AutoMod defense, XP leveling, and live web management.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/invite"
              className="px-8 py-4 bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-600 hover:from-orange-400 hover:to-rose-500 text-white font-black uppercase tracking-widest rounded-2xl flex items-center gap-3 transition-transform hover:scale-105 shadow-[0_0_30px_rgba(244,63,94,0.35)] active:scale-98"
            >
              <DiscordLogo className="w-5 h-5" fill="#ffffff" />
              <span>Add VePlexity Bot</span>
            </Link>

            <Link
              href="/discord-bots/veplexity"
              className="px-8 py-4 bg-[#140b20] text-rose-300 border-2 border-rose-500/30 hover:border-rose-500/60 hover:bg-rose-500/10 font-black uppercase tracking-widest rounded-2xl transition-all shadow-sm"
            >
              <span>Launch VePlexity Console</span>
            </Link>

            <Link
              href="/bot/pingplex"
              className="px-6 py-4 bg-zinc-900/60 hover:bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 rounded-2xl font-bold uppercase tracking-wider text-xs flex items-center gap-2 transition-colors"
            >
              <span>Need Creator Alerts? View PingPlex →</span>
            </Link>
          </motion.div>
        </div>

        {/* METRICS STRIP - GTA 6 SUNSET AMBIENCE */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 md:p-10 rounded-[2rem] bg-[#120a1d] border-2 border-rose-500/20 mb-20 shadow-[0_0_40px_rgba(249,115,22,0.06)]">
          <div>
            <div className="text-xs text-orange-400 font-black uppercase tracking-widest font-mono">COMMAND ENGINE</div>
            <div className="text-4xl font-black text-white mt-1">100 PROD</div>
            <div className="text-xs text-zinc-400 font-mono mt-1">Slash &amp; Instant Prefixes</div>
          </div>
          <div>
            <div className="text-xs text-rose-400 font-black uppercase tracking-widest font-mono">AUDIO ENGINE</div>
            <div className="text-4xl font-black text-white mt-1">24/7 LOSSLESS</div>
            <div className="text-xs text-zinc-400 font-mono mt-1">Low-latency DSP Filters</div>
          </div>
          <div>
            <div className="text-xs text-fuchsia-400 font-black uppercase tracking-widest font-mono">PERSISTENCE</div>
            <div className="text-4xl font-black text-white mt-1">ATLAS CLOUD</div>
            <div className="text-xs text-zinc-400 font-mono mt-1">Sub-15ms Mongo Sync</div>
          </div>
          <div>
            <div className="text-xs text-amber-400 font-black uppercase tracking-widest font-mono">SECURITY</div>
            <div className="text-4xl font-black text-white mt-1">AUTOMOD DEFENSE</div>
            <div className="text-xs text-zinc-400 font-mono mt-1">Spam, Links, Invites Shield</div>
          </div>
        </div>

        {/* ARCHITECTURE FEATURES */}
        <div className="mb-24">
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter">
              Flagship <span className="bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-500 bg-clip-text text-transparent">Architecture.</span>
            </h2>
            <p className="text-sm text-zinc-400 mt-2">
              Everything your server needs in a single powerhouse bot — no paywalls, no clutter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className={`p-8 rounded-[2rem] bg-[#120a1d] border-2 border-zinc-800/80 ${feat.borderColor} transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-rose-500/10`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-[#1b0f2a] border border-rose-500/30 flex items-center justify-center">
                      {feat.icon}
                    </div>
                    <span className="px-3 py-1 border border-rose-500/30 text-rose-300 rounded-lg text-[10px] font-black uppercase tracking-widest bg-black/40">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white mb-3 leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-base text-zinc-400 leading-relaxed font-normal">
                    {feat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 100 COMMAND MATRIX */}
        <div className="p-8 sm:p-12 rounded-[2rem] bg-[#120a1d] border-2 border-rose-500/20 mb-20 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-rose-500/10">
            <div>
              <span className="font-mono text-xs font-black text-orange-400 uppercase tracking-widest">COMMAND INDEX</span>
              <h2 className="text-3xl font-black text-white mt-1 tracking-tight">100 Production Slash Routes &amp; Prefix Runners</h2>
            </div>
            <div className="text-xs text-zinc-400 font-mono">
              Type <code className="text-orange-400 bg-black px-2 py-1 rounded border border-zinc-800">/help</code> or <code className="text-rose-400 bg-black px-2 py-1 rounded border border-zinc-800">.help</code> in Discord
            </div>
          </div>

          <div className="space-y-8">
            {commandCategories.map((cat, idx) => (
              <div key={idx} className="space-y-3">
                <div className="text-xs font-black uppercase tracking-widest text-rose-400">
                  {cat.category}
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {cat.commands.map((cmd) => (
                    <span
                      key={cmd}
                      className="px-3.5 py-1.5 rounded-xl bg-black/60 border border-zinc-800 text-xs font-mono font-bold text-zinc-300 hover:border-rose-500/50 hover:text-white transition-colors cursor-default"
                    >
                      {cmd}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA BANNER */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-10 rounded-[2rem] bg-gradient-to-br from-[#1b0f2a] via-[#120a1d] to-[#0a0512] border-2 border-rose-500/30 gap-6 shadow-[0_0_40px_rgba(244,63,94,0.15)]">
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-white">Deploy VePlexity Bot Now</h3>
            <p className="text-sm text-zinc-400 mt-1 font-normal">Instant authorization with Discord Administrator permissions (8). Zero setup required to start.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/invite"
              className="px-8 py-4 bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-600 hover:from-orange-400 hover:to-rose-500 text-white font-black uppercase tracking-widest rounded-2xl text-xs hover:scale-105 transition-transform shadow-[0_0_20px_rgba(244,63,94,0.4)]"
            >
              Add to Server
            </Link>
            <Link
              href="/discord-bots/veplexity"
              className="px-6 py-4 bg-[#140b20] text-rose-300 border border-rose-500/40 rounded-2xl font-bold uppercase tracking-wider text-xs hover:bg-rose-500/10 transition-colors"
            >
              Console Deck
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
