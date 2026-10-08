"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { 
  Bot, Music, Shield, Sparkles, Sliders, Database, Gamepad2, 
  ExternalLink, Heart, Terminal, ArrowRight, Zap 
} from "lucide-react";

export default function BotPage() {
  const features = [
    {
      icon: <Music className="w-8 h-8 text-fuchsia-500" />,
      title: "Lossless Audio DSP Engine",
      badge: "48kHz VOIP",
      borderColor: "hover:border-fuchsia-500/50",
      description: "Low-latency streaming architecture with queue looping, dynamic bass boost filters, volume calibration, and 24/7 voice stay in dedicated channels.",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-orange-500" />,
      title: "Google Gemini AI Assistant",
      badge: "Multi-Modal",
      borderColor: "hover:border-orange-500/50",
      description: "Direct conversational AI module powered by Gemini. Supports custom server personas, contextual conversational memory, and image prompt generation.",
    },
    {
      icon: <Shield className="w-8 h-8 text-red-500" />,
      title: "Enterprise Moderation Suite",
      badge: "Automated",
      borderColor: "hover:border-red-500/50",
      description: "Rule enforcement system with automated warning escalation, timed suspensions, channel lockdowns, and case-indexed audit logs.",
    },
    {
      icon: <Sliders className="w-8 h-8 text-purple-500" />,
      title: "Real-Time Cloud Dashboard",
      badge: "Next.js 16",
      borderColor: "hover:border-purple-500/50",
      description: "Configure prefixes, notification channels, reaction roles, and automated welcome dispatches in real-time from veplexity.dev/dashboard.",
    },
    {
      icon: <Gamepad2 className="w-8 h-8 text-cyan-500" />,
      title: "Multiplayer Discord Games",
      badge: "Component UI",
      borderColor: "hover:border-cyan-500/50",
      description: "Native Discord component mini-games including TicTacToe, Connect4, Rock-Paper-Scissors duels, and Trivia competitions directly in text channels.",
    },
    {
      icon: <Database className="w-8 h-8 text-orange-400" />,
      title: "MongoDB Atlas Persistence",
      badge: "Sub-15ms Sync",
      borderColor: "hover:border-orange-400/50",
      description: "Enterprise cloud cluster storing user XP, server configurations, moderation records, and reaction role mappings with zero data loss.",
    },
  ];

  const commandCategories = [
    {
      category: "Music & Audio DSP",
      commands: ["/play", "/skip", "/queue", "/volume", "/247", "/pause", "/resume", "/stop", "/lyrics"],
    },
    {
      category: "AI & Intelligence",
      commands: ["/gemini ask", "/gemini reset", "/gemini persona", "/gemini vision", "/imagine"],
    },
    {
      category: "Security & Moderation",
      commands: ["/ban", "/kick", "/timeout", "/warn", "/warnings", "/clearwarns", "/lock", "/unlock", "/purge"],
    },
    {
      category: "System & Configuration",
      commands: ["/setup", "/setwelcome", "/reactionrole", "/announce", "/botinfo", "/serverinfo", "/stats", "/ping"],
    },
    {
      category: "Interactive & Mini-Games",
      commands: ["/tictactoe", "/connect4", "/rps", "/trivia", "/truth-or-dare", "/8ball", "/avatar"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#070308] text-white selection:bg-fuchsia-500/30 overflow-hidden flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 py-16 relative z-10">
        
        {/* HERO SECTION */}
        <div className="border-b border-white/5 pb-16 mb-16 relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-fuchsia-600/10 blur-[150px] rounded-full pointer-events-none" />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center gap-2 px-4 py-2 border border-orange-500 text-orange-500 rounded-xl font-mono text-xs font-black uppercase tracking-widest bg-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.2)] w-fit"
          >
            <Terminal className="w-4 h-4" /> Render Node 24/7 • 101 Production Commands
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black text-white tracking-tighter leading-[1] mb-6 drop-shadow-[0_0_15px_rgba(217,70,239,0.3)] max-w-4xl"
          >
            VePlexity Commercial <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-fuchsia-500">
              Discord Bot V2.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-gray-400 max-w-3xl mb-10 leading-relaxed"
          >
            Production-grade Discord cloud infrastructure engineered by Veer Madan. Featuring lossless audio streaming, context-aware Gemini AI, full enterprise moderation, and live web management.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/invite"
              className="px-8 py-4 bg-gradient-to-br from-orange-500 to-fuchsia-600 text-white font-black uppercase tracking-widest rounded-2xl flex items-center gap-3 transition-transform hover:scale-105 shadow-[0_0_30px_rgba(217,70,239,0.4)]"
            >
              <Bot className="w-5 h-5" />
              <span>Add to Server</span>
            </Link>

            <Link
              href="/dashboard"
              className="px-8 py-4 bg-[#0c0512] text-fuchsia-400 border-[3px] border-fuchsia-500/30 hover:bg-fuchsia-500/10 font-black uppercase tracking-widest rounded-2xl transition-all hover:border-fuchsia-500/60"
            >
              <span>Launch Dashboard</span>
            </Link>

            <a
              href="https://www.buymeacoffee.com/veplexity1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 bg-black/50 text-zinc-300 hover:text-white border border-white/10 rounded-2xl font-bold uppercase tracking-wider text-xs flex items-center gap-2 transition-colors"
            >
              <Heart className="w-4 h-4 text-orange-400" />
              <span>Support Perks</span>
            </a>
          </motion.div>
        </div>

        {/* METRICS STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 md:p-10 rounded-[2rem] bg-[#0c0512] border-[4px] border-zinc-900 mb-20 shadow-[0_0_40px_rgba(249,115,22,0.05)]">
          <div>
            <div className="text-xs text-orange-500 font-black uppercase tracking-widest">COMMAND MATRIX</div>
            <div className="text-4xl font-black text-white mt-1">101 PROD</div>
            <div className="text-xs text-zinc-400 font-mono mt-1">Slash Handlers Ready</div>
          </div>
          <div>
            <div className="text-xs text-fuchsia-500 font-black uppercase tracking-widest">CLOUD DAEMON</div>
            <div className="text-4xl font-black text-white mt-1">RENDER</div>
            <div className="text-xs text-zinc-400 font-mono mt-1">24/7 Dedicated Daemon</div>
          </div>
          <div>
            <div className="text-xs text-purple-400 font-black uppercase tracking-widest">PERSISTENCE</div>
            <div className="text-4xl font-black text-white mt-1">ATLAS DB</div>
            <div className="text-xs text-zinc-400 font-mono mt-1">Sub-15ms Replica Set</div>
          </div>
          <div>
            <div className="text-xs text-green-400 font-black uppercase tracking-widest">API GATEWAY</div>
            <div className="text-4xl font-black text-white mt-1">DISCORD V10</div>
            <div className="text-xs text-zinc-400 font-mono mt-1">WebSocket Gateway</div>
          </div>
        </div>

        {/* ARCHITECTURE FEATURES */}
        <div className="mb-24">
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter">
              Production <span className="bg-gradient-to-r from-orange-500 to-fuchsia-500 bg-clip-text text-transparent">Architecture.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className={`p-8 rounded-[2rem] bg-[#0c0512] border-[4px] border-zinc-900 ${feat.borderColor} transition-colors duration-300 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                      {feat.icon}
                    </div>
                    <span className="px-3 py-1 border border-zinc-700 text-zinc-300 rounded-lg text-[10px] font-black uppercase tracking-widest bg-black">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white mb-3 leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-base text-gray-400 leading-relaxed font-normal">
                    {feat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 101 COMMAND MATRIX */}
        <div className="p-8 sm:p-12 rounded-[2rem] bg-[#0c0512] border-[4px] border-zinc-900 mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/5">
            <div>
              <span className="font-mono text-xs font-black text-orange-500 uppercase tracking-widest">COMMAND INDEX</span>
              <h2 className="text-3xl font-black text-white mt-1 tracking-tight">101 Slash Handlers</h2>
            </div>
            <div className="text-xs text-zinc-400 font-mono">
              Type <code className="text-orange-400 bg-black px-2 py-1 rounded border border-zinc-800">/help</code> in Discord for interactive documentation
            </div>
          </div>

          <div className="space-y-8">
            {commandCategories.map((cat, idx) => (
              <div key={idx} className="space-y-3">
                <div className="text-xs font-black uppercase tracking-widest text-fuchsia-400">
                  {cat.category}
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {cat.commands.map((cmd) => (
                    <span
                      key={cmd}
                      className="px-3.5 py-1.5 rounded-xl bg-black border border-zinc-800 text-xs font-mono font-bold text-zinc-300 hover:border-orange-500/50 hover:text-white transition-colors cursor-default"
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
        <div className="flex flex-col sm:flex-row items-center justify-between p-10 rounded-[2rem] bg-[#0c0512] border-[4px] border-zinc-900 gap-6 shadow-[0_0_40px_rgba(217,70,239,0.1)]">
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-white">Deploy to your Discord server</h3>
            <p className="text-sm text-gray-400 mt-1 font-normal">Instant authorization. Zero configuration required to start.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/invite"
              className="px-8 py-4 bg-gradient-to-br from-orange-500 to-fuchsia-600 text-white font-black uppercase tracking-widest rounded-2xl text-xs hover:scale-105 transition-transform shadow-[0_0_20px_rgba(217,70,239,0.4)]"
            >
              Authorize Bot
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-4 bg-black text-fuchsia-400 border border-fuchsia-500/30 rounded-2xl font-bold uppercase tracking-wider text-xs hover:bg-fuchsia-500/10 transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
