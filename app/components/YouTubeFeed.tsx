"use client";

import { motion } from "framer-motion";
import { Play, Radio, Video, ExternalLink, MonitorPlay, Sparkles } from "lucide-react";

export default function YouTubeFeed() {
  return (
    <section id="media" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#070308] border-t border-white/5">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass border border-red-500/30 text-red-400 font-mono text-xs font-bold uppercase tracking-widest mb-4">
              <Video className="w-3.5 h-3.5" /> Media Network
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white">
              VePlexity <span className="bg-gradient-to-r from-red-500 via-orange-500 to-fuchsia-500 bg-clip-text text-transparent">Broadcasts.</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mt-3">
              Official video releases, devlogs, production livestreams, and music engineering masterclasses from the core channel.
            </p>
          </div>

          <a
            href="https://youtube.com/@VePlexity"
            target="_blank"
            rel="noreferrer"
            className="neo-btn-glass px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2 hover:border-red-500/50 self-start md:self-auto cursor-pointer"
          >
            <Video className="w-4 h-4 text-red-500" />
            <span>Visit @VePlexity YouTube</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Broadcast Video Card */}
          <motion.a 
            href="https://www.youtube.com/watch?v=dZvvx4SIkbM"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="neo-card p-6 rounded-[2rem] border border-white/10 hover:border-red-500/50 transition-all duration-300 group cursor-pointer relative overflow-hidden flex flex-col shadow-2xl block md:col-span-2"
          >
            {/* Real YouTube Thumbnail with Glass Play Button */}
            <div 
              className="w-full h-64 sm:h-80 bg-zinc-900 rounded-2xl mb-6 relative overflow-hidden border border-white/10 bg-cover bg-center group-hover:scale-[1.01] transition-transform duration-300"
              style={{ backgroundImage: `url('https://img.youtube.com/vi/dZvvx4SIkbM/maxresdefault.jpg')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-20 h-20 rounded-full liquid-glass flex items-center justify-center backdrop-blur-xl group-hover:scale-110 transition-transform border border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.5)]">
                  <Play className="w-8 h-8 text-white ml-1 fill-white" />
                </div>
              </div>

              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-red-600 text-white uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  Official Stream
                </span>
                <span className="text-xs text-white/90 font-mono font-bold bg-black/60 px-2 py-0.5 rounded backdrop-blur-md">
                  2h 30m
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 border border-orange-500/40 text-orange-400 rounded-lg text-[10px] font-black uppercase tracking-widest bg-orange-500/10">
                Latest Broadcast
              </span>
              <span className="text-xs text-zinc-500 font-mono">1080p 60FPS</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-red-400 transition-colors leading-tight">
              🔴 Comeback Day! - Welcome Back to VePlexity!
            </h3>
            <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
              Full return livestream exploring upcoming music engineering sessions, game mod architecture, and the complete rollout of Discord Bot V2.
            </p>
          </motion.a>

          {/* Secondary Hub / Archives Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="neo-card p-6 rounded-[2rem] border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-full h-44 rounded-2xl bg-gradient-to-tr from-purple-900/40 to-fuchsia-900/20 border border-white/10 flex flex-col items-center justify-center p-6 mb-6 text-center relative overflow-hidden">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                  <MonitorPlay className="w-6 h-6 text-fuchsia-400" />
                </div>
                <div className="text-sm font-black text-white">Upcoming Video Releases</div>
                <span className="text-xs text-zinc-400 mt-1">In Production Studio</span>
              </div>

              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-xs font-bold text-white mb-1">C++ Game Injection Modding</div>
                  <div className="text-[11px] text-zinc-400">Deep dive into render pipeline hookups & memory tools.</div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-xs font-bold text-white mb-1">DAW Sound Design & FLAC Mastering</div>
                  <div className="text-[11px] text-zinc-400">VST presets and stereo imaging breakdowns.</div>
                </div>
              </div>
            </div>

            <a
              href="https://youtube.com/@VePlexity?sub_confirmation=1"
              target="_blank"
              rel="noreferrer"
              className="mt-6 neo-btn-primary py-3 px-4 rounded-xl text-center text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center gap-2 cursor-pointer"
            >
              <Video className="w-4 h-4" /> Subscribe on YouTube
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}