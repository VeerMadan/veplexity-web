"use client";
import { motion } from "framer-motion";
import { MonitorPlay, MessageSquare, Terminal, Shield } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center px-5 pt-20 relative overflow-hidden">
      
      {/* VP Cam Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-fuchsia-600/15 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-600/15 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center relative z-10 mt-10">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-4 group"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/30 to-fuchsia-600/30 rounded-full blur-2xl pointer-events-none group-hover:opacity-100 transition duration-700 opacity-60" />
          <img 
            src="/vp-logo-icon.png" 
            alt="VePlexity VP" 
            className="relative w-48 sm:w-60 md:w-72 h-auto mx-auto object-contain drop-shadow-[0_0_35px_rgba(217,70,239,0.6)] group-hover:scale-105 transition-transform duration-300"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center gap-2 px-4 py-2 border border-orange-500 text-orange-500 rounded-xl font-mono text-xs font-black uppercase tracking-widest bg-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.2)]"
        >
          <Terminal className="w-4 h-4" /> System Initialized • v2.0 Live
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl lg:text-[7rem] font-black text-white tracking-tighter leading-[1] mb-6 drop-shadow-[0_0_15px_rgba(217,70,239,0.3)]"
        >
          Welcome to <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-fuchsia-500">
            VePlexity.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-2xl text-gray-400 max-w-3xl mb-10 leading-relaxed"
        >
          Next-generation lossless studio music, multi-personality AI chatbot, real-time auto-mod defense, and automated Discord community infrastructure.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto flex-wrap"
        >
          <Link 
            href="/dashboard" 
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 transition-transform hover:scale-105 shadow-[0_0_30px_rgba(217,70,239,0.4)] text-sm"
          >
            <Shield className="w-5 h-5" /> Bot Dashboard
          </Link>

          <a 
            href="/invite" 
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-[#0c0512] text-fuchsia-400 border-[2px] border-fuchsia-500/40 hover:bg-fuchsia-500/10 font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 transition-all hover:border-fuchsia-500/80 text-sm"
          >
            <MessageSquare className="w-5 h-5" /> Add to Discord
          </a>

          <a 
            href="https://www.discord.gg/R6ZrqpWEcc" 
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-6 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2.5 transition-all text-xs"
          >
            <span>💬 Official Server</span>
          </a>

          <a 
            href="https://www.buymeacoffee.com/veplexity1" 
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-6 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 text-black font-bold uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 text-xs"
          >
            <span>☕ Buy Coffee</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}