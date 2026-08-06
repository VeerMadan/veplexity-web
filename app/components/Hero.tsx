"use client";
import { motion } from "framer-motion";
import { MonitorPlay, MessageSquare, Terminal } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center px-5 pt-20 relative overflow-hidden">
      
      {/* VP Cam Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-fuchsia-600/15 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-600/15 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center relative z-10 mt-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-2 px-4 py-2 border border-orange-500 text-orange-500 rounded-xl font-mono text-xs font-black uppercase tracking-widest bg-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.2)]"
        >
          <Terminal className="w-4 h-4" /> System Initialized
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl lg:text-[7rem] font-black text-white tracking-tighter leading-[1] mb-8 drop-shadow-[0_0_15px_rgba(217,70,239,0.3)]"
        >
          Welcome to <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-fuchsia-500">
            VePlexity.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-2xl text-gray-400 max-w-3xl mb-12 leading-relaxed"
        >
          The central infrastructure for advanced software engineering, C++ game engine modifications, and high-performance digital network ecosystems. 
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a 
            href="https://youtube.com/@VePlexity" 
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-10 py-5 bg-gradient-to-br from-orange-500 to-fuchsia-600 text-white font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 transition-transform hover:scale-105 shadow-[0_0_30px_rgba(217,70,239,0.4)]"
          >
            <MonitorPlay className="w-6 h-6" /> Watch Content
          </a>
          
          <a 
            href="https://www.discord.gg/R6ZrqpWEcc" 
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-10 py-5 bg-[#0c0512] text-fuchsia-400 border-[3px] border-fuchsia-500/30 hover:bg-fuchsia-500/10 font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 transition-all hover:border-fuchsia-500/60"
          >
            <MessageSquare className="w-6 h-6" /> Join Server
          </a>
        </motion.div>

      </div>
    </section>
  );
}