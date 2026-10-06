"use client";

import { motion } from "framer-motion";
import { Shield, MessageSquare, Terminal, Sparkles, Music, Cpu, Flame, ExternalLink, Zap } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden cyber-grid">
      {/* Ambient Liquid Plasma Auras */}
      <div className="absolute top-1/4 -left-40 w-[650px] h-[650px] bg-fuchsia-600/15 blur-[160px] rounded-full pointer-events-none animate-pulse duration-1000" />
      <div className="absolute top-1/3 -right-40 w-[700px] h-[700px] bg-orange-600/15 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 left-1/3 w-[500px] h-[500px] bg-purple-600/15 blur-[140px] rounded-full pointer-events-none" />

      {/* Main Full-Width Container */}
      <div className="w-full max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* System Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full liquid-glass border border-fuchsia-500/30 text-fuchsia-300 font-mono text-xs font-bold uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(217,70,239,0.2)]"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Autonomous Discord Engine • v2.0 Live</span>
              <span className="text-zinc-600">|</span>
              <span className="text-orange-400 font-black">97 Commands</span>
            </motion.div>

            {/* Mammoth Neo Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-5xl sm:text-7xl lg:text-[5.5rem] xl:text-[6.2rem] font-black tracking-tighter leading-[0.98] text-white mb-6 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
            >
              The Next Evolution <br className="hidden sm:inline" />
              of <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(217,70,239,0.4)]">Discord Audio & AI.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg sm:text-xl md:text-2xl text-zinc-300 max-w-2xl mb-10 leading-relaxed font-normal"
            >
              Lossless 24-bit 96kHz studio playback, Gemini 2.0 multi-personality AI, instant automated moderation, and dynamic private voice channels. Engineered with <span className="text-white font-bold">zero subscription paywalls</span>.
            </motion.p>

            {/* Neo-Skeuomorphic Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full mb-12"
            >
              {/* Dashboard Button */}
              <Link
                href="/dashboard"
                className="neo-btn-primary px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-wider text-white flex items-center justify-center gap-3 transition-transform cursor-pointer"
              >
                <Shield className="w-5 h-5 text-white" />
                <span>Bot Dashboard</span>
              </Link>

              {/* Add to Discord Button */}
              <a
                href="/invite"
                target="_blank"
                rel="noreferrer"
                className="neo-btn-glass px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-wider text-fuchsia-300 flex items-center justify-center gap-3 border border-fuchsia-500/30 hover:border-fuchsia-400 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 text-fuchsia-400" />
                <span>Add to Discord</span>
              </a>

              {/* Official Server */}
              <a
                href="https://www.discord.gg/R6ZrqpWEcc"
                target="_blank"
                rel="noreferrer"
                className="neo-btn-glass px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center justify-center gap-2 hover:text-white"
              >
                <span>💬 Official Server</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>

              {/* Buy Me a Coffee */}
              <a
                href="https://www.buymeacoffee.com/veplexity1"
                target="_blank"
                rel="noreferrer"
                className="neo-btn-bmc px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2.5"
              >
                <img src="/bmc/bmc-logo-no-background.png" alt="BMC" className="w-4 h-4 object-contain" />
                <span>Buy Coffee</span>
              </a>
            </motion.div>

            {/* Quick Spec Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full"
            >
              <div className="neo-card p-3.5 rounded-xl border border-white/5 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  <Music className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Audio Engine</div>
                  <div className="text-xs font-extrabold text-white">Lossless FLAC</div>
                </div>
              </div>

              <div className="neo-card p-3.5 rounded-xl border border-white/5 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Intelligence</div>
                  <div className="text-xs font-extrabold text-white">Gemini 2.0 AI</div>
                </div>
              </div>

              <div className="neo-card p-3.5 rounded-xl border border-white/5 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Auto-Mod</div>
                  <div className="text-xs font-extrabold text-white">Sub-Second Shield</div>
                </div>
              </div>

              <div className="neo-card p-3.5 rounded-xl border border-white/5 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Pricing</div>
                  <div className="text-xs font-extrabold text-white">100% Free VIP</div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Hero Showcase: Liquid Glass Pod with Animated VP Logo (5 Cols) */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="relative w-full max-w-[460px] aspect-square flex items-center justify-center"
            >
              {/* Outer Glow Halo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/30 via-fuchsia-600/30 to-purple-600/20 rounded-full blur-3xl opacity-75 animate-pulse" />

              {/* Neo-Skeuomorphic Liquid Glass Capsule Plate */}
              <div className="relative w-full h-full rounded-[3rem] liquid-glass-glow p-8 flex flex-col items-center justify-center border-2 border-fuchsia-500/30 sheen-layer">
                
                {/* Specular Rim Arc */}
                <div className="absolute top-4 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full pointer-events-none" />

                {/* Animated Brand Logo GIF */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="relative z-10 flex flex-col items-center group cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src="/vp-logo-web.gif"
                      alt="VePlexity Cinematic Animation"
                      className="w-64 sm:w-80 h-auto object-contain drop-shadow-[0_0_40px_rgba(217,70,239,0.7)] group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="mt-4 flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass border border-white/10 text-xs font-mono font-bold tracking-widest text-zinc-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>SYSTEM CORE ONLINE</span>
                  </div>
                </motion.div>

                {/* Floating Tactile Glass Badges */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 liquid-glass px-4 py-2 rounded-2xl border border-fuchsia-500/40 shadow-xl flex items-center gap-2.5 z-20"
                >
                  <div className="w-7 h-7 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">
                    <Music className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-zinc-400 uppercase">Playback</div>
                    <div className="text-xs font-extrabold text-white">24-bit Lossless</div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 liquid-glass px-4 py-2 rounded-2xl border border-orange-500/40 shadow-xl flex items-center gap-2.5 z-20"
                >
                  <div className="w-7 h-7 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-zinc-400 uppercase">AI Neural Engine</div>
                    <div className="text-xs font-extrabold text-white">Gemini 2.0 Flash</div>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}