"use client";

import { motion } from "framer-motion";
import { MessageSquare, Terminal, Zap, Shield, ArrowRight, Music, Server, Radio, Users } from "lucide-react";

export default function Ecosystem() {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050208] border-t border-white/5" id="ecosystem">
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-fuchsia-600/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass border border-fuchsia-500/30 text-fuchsia-300 font-mono text-xs font-bold uppercase tracking-widest mb-4">
            <Server className="w-3.5 h-3.5" /> High-Concurrence Engine
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter">
            Community <span className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-orange-400 bg-clip-text text-transparent">Infrastructure.</span>
          </h2>
          <p className="text-zinc-400 text-lg sm:text-xl mt-4 leading-relaxed">
            VePlexity is backed by a custom Node.js and Discord.js architecture designed to seamlessly bridge content creation, community engagement, and automated server operations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Discord HQ Showcase (7 Cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 neo-card rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between group border-2 border-white/10 hover:border-fuchsia-500/40 sheen-layer"
          >
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-fuchsia-600/20 blur-[100px] rounded-full pointer-events-none transition-opacity group-hover:opacity-100 opacity-40" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="w-16 h-16 rounded-2xl liquid-glass flex items-center justify-center border border-fuchsia-500/30 text-fuchsia-400 shadow-[0_0_20px_rgba(217,70,239,0.3)]">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-400 bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Permanent Invite Active</span>
                </div>
              </div>
              
              <h3 className="text-3xl sm:text-4xl font-black text-white mb-4">VePlexity Discord HQ</h3>
              <p className="text-zinc-300 text-base sm:text-lg mb-8 leading-relaxed">
                The central nervous system of our creative network. Join to test beta bot builds, hang out in lossless music lounges, request custom features, and connect directly with Veer Madan and the dev team.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-center">
                  <div className="text-lg font-black text-white">Lossless</div>
                  <div className="text-[10px] font-mono uppercase text-zinc-400">24/7 Music Lounges</div>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-center">
                  <div className="text-lg font-black text-amber-400">VIP Perks</div>
                  <div className="text-[10px] font-mono uppercase text-zinc-400">Buy Me Coffee Roles</div>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-center col-span-2 sm:col-span-1">
                  <div className="text-lg font-black text-emerald-400">Direct</div>
                  <div className="text-[10px] font-mono uppercase text-zinc-400">Creator Access</div>
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <a 
                href="https://www.discord.gg/R6ZrqpWEcc" 
                target="_blank"
                rel="noreferrer"
                className="neo-btn-primary inline-flex items-center justify-center gap-3 text-white font-black uppercase tracking-wider px-8 py-4 rounded-2xl transition-all cursor-pointer text-sm"
              >
                Join Official Server <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Bot Architecture Card (5 Cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 neo-card rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between border-2 border-white/10 hover:border-orange-500/40"
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-16 h-16 rounded-2xl liquid-glass flex items-center justify-center border border-orange-500/30 text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                  <Terminal className="w-8 h-8" />
                </div>
                <span className="px-3 py-1 border border-orange-500/40 text-orange-400 rounded-xl text-[10px] font-mono font-bold uppercase tracking-widest bg-orange-500/10">
                  Node.js + Discord.js v14
                </span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">Engineered for Scalability</h3>
              <p className="text-zinc-300 text-sm leading-relaxed mb-8">
                Engineered from the ground up to handle high event concurrency, sub-second moderation decisions, dynamic voice channel lifecycle automation, and real-time telemetry REST APIs.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/50 border border-white/10 p-3.5 rounded-xl flex items-center gap-3">
                <Shield className="w-4 h-4 text-orange-400" />
                <span className="text-xs font-bold text-zinc-200 uppercase">Auto-Mod</span>
              </div>
              <div className="bg-black/50 border border-white/10 p-3.5 rounded-xl flex items-center gap-3">
                <Zap className="w-4 h-4 text-fuchsia-400" />
                <span className="text-xs font-bold text-zinc-200 uppercase">REST API</span>
              </div>
              <div className="bg-black/50 border border-white/10 p-3.5 rounded-xl flex items-center gap-3">
                <Music className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-zinc-200 uppercase">FLAC Engine</span>
              </div>
              <div className="bg-black/50 border border-white/10 p-3.5 rounded-xl flex items-center gap-3">
                <Radio className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold text-zinc-200 uppercase">Auto PVC</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}