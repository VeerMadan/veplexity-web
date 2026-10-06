"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MonitorPlay, Bot, Terminal, Coffee, Sparkles, Radio, Cpu, ShieldCheck, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center px-4 sm:px-6 pt-32 pb-20 overflow-hidden">
      
      {/* Cinematic Ambient Glows & Cyber Grids */}
      <div className="absolute top-1/4 -right-20 w-[550px] h-[550px] bg-fuchsia-600/20 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-orange-600/15 blur-[170px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full flex flex-col items-center text-center relative z-10">
        
        {/* Transmission Live Pill */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 inline-flex items-center gap-2.5 px-4 py-2 border border-orange-500/40 text-orange-400 rounded-full font-mono text-xs font-bold uppercase tracking-widest bg-orange-500/10 backdrop-blur-md shadow-[0_0_25px_rgba(249,115,22,0.25)]"
        >
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
          <span>TRANSMISSION LIVE // VEPLEXITY NETWORK HUB</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-black text-white tracking-tighter leading-[1.02] mb-8"
        >
          Engineering Code, <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-fuchsia-500 drop-shadow-[0_0_35px_rgba(217,70,239,0.35)]">
            Media & Digital Worlds.
          </span>
        </motion.h1>

        {/* Narrative */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-zinc-400 max-w-3xl mb-12 leading-relaxed font-normal"
        >
          The central brand portfolio of <span className="text-white font-semibold">Veer Madan</span> and the <span className="text-fuchsia-400 font-semibold">VePlexity Network</span>. 
          Architecting high-performance C++ game modifications, studio broadcast hardware, audio master engineering, and our flagship 24/7 commercial Discord automation system.
        </motion.p>

        {/* Call to Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 w-full mb-16"
        >
          <Link 
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 via-pink-500 to-fuchsia-600 text-white font-black uppercase tracking-wider rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-[0_0_30px_rgba(217,70,239,0.4)] text-sm"
          >
            <Bot className="w-5 h-5" /> Launch Bot Dashboard
          </Link>
          
          <a 
            href="#broadcasts"
            className="w-full sm:w-auto px-8 py-4 bg-[#0e0716] text-white border-2 border-white/10 hover:border-orange-500/50 hover:bg-orange-500/5 font-black uppercase tracking-wider rounded-2xl flex items-center justify-center gap-3 transition-all text-sm"
          >
            <MonitorPlay className="w-5 h-5 text-orange-400" /> Watch Latest Streams
          </a>

          <a 
            href="#support" 
            className="w-full sm:w-auto px-8 py-4 bg-amber-500/10 text-amber-300 border-2 border-amber-500/30 hover:bg-amber-500/20 font-black uppercase tracking-wider rounded-2xl flex items-center justify-center gap-3 transition-all text-sm shadow-[0_0_20px_rgba(245,158,11,0.15)]"
          >
            <Coffee className="w-5 h-5 text-amber-400" /> Buy Me a Coffee
          </a>
        </motion.div>

        {/* Live Telemetry / Network Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl"
        >
          <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">Commercial Bot</span>
            <span className="text-xl sm:text-2xl font-black text-white">97+ Cmds</span>
            <span className="text-[10px] text-emerald-400 font-mono mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live on Render
            </span>
          </div>

          <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">Studio Broadcast</span>
            <span className="text-xl sm:text-2xl font-black text-orange-400">1080p60</span>
            <span className="text-[10px] text-zinc-400 font-mono mt-1">VePlexity Cam</span>
          </div>

          <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">Audio Master</span>
            <span className="text-xl sm:text-2xl font-black text-fuchsia-400">Lossless</span>
            <span className="text-[10px] text-zinc-400 font-mono mt-1">DAW DSP Pipeline</span>
          </div>

          <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">Cloud Sync</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-400">&lt; 15ms</span>
            <span className="text-[10px] text-zinc-400 font-mono mt-1">MongoDB Atlas</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}