"use client";
import { motion } from "framer-motion";
import { MessageSquare, Terminal, Zap, Shield, Server, ArrowRight, Music } from "lucide-react";

export default function Ecosystem() {
  return (
    <section className="relative py-32 px-5 z-10 bg-[#070308] border-t border-white/5" id="ecosystem">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 drop-shadow-[0_0_10px_rgba(217,70,239,0.3)]">
            Community <span className="bg-gradient-to-r from-fuchsia-500 to-purple-500 bg-clip-text text-transparent">Infrastructure.</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            VePlexity is powered by a heavily engineered custom Node.js and Discord.js architecture designed to seamlessly bridge content creation, community engagement, and automated server management.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-[#0c0512] border-[4px] border-zinc-900 rounded-[2rem] p-10 relative overflow-hidden group hover:border-fuchsia-500/50 transition-colors shadow-[0_0_40px_rgba(217,70,239,0.1)]"
          >
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-fuchsia-600/20 blur-[80px] rounded-full pointer-events-none transition-opacity group-hover:opacity-100 opacity-50" />
            
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-16 h-16 rounded-2xl bg-fuchsia-500/10 flex items-center justify-center mb-8 border border-fuchsia-500/30">
                <MessageSquare className="w-8 h-8 text-fuchsia-500" />
              </div>
              
              <h3 className="text-3xl font-black text-white mb-4">VePlexity Discord HQ</h3>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed flex-1">
                The central nervous system of the audience. A fully optimized server featuring dynamic voice channels, automated role assignments, and a highly active community of developers.
              </p>

              <a 
                href="https://www.discord.gg/R6ZrqpWEcc" 
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:scale-105 text-white font-black uppercase tracking-widest px-8 py-5 rounded-2xl transition-all w-fit shadow-[0_0_20px_rgba(217,70,239,0.4)]"
              >
                Join the Server <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 bg-[#0c0512] border-[4px] border-zinc-900 rounded-[2rem] p-10 relative overflow-hidden flex flex-col justify-between group hover:border-orange-500/50 transition-colors"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/30">
                  <Terminal className="w-8 h-8 text-orange-400" />
                </div>
                <span className="px-4 py-2 border border-orange-500 text-orange-500 rounded-xl text-xs font-black uppercase tracking-widest bg-orange-500/10">
                  Node.js Bot
                </span>
              </div>
              
              <h3 className="text-2xl font-black text-white mb-3">Custom Architecture</h3>
              <p className="text-base text-gray-400 mb-8 leading-relaxed">
                Engineered from scratch using modern APIs to handle real-time event webhooks, heavy-duty moderation, and high-fidelity music playback logic.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="bg-black border border-zinc-800 p-4 rounded-xl flex items-center gap-3">
                <Shield className="w-5 h-5 text-orange-400" />
                <span className="text-sm font-bold text-gray-300 uppercase">Auto-Mod</span>
              </div>
              <div className="bg-black border border-zinc-800 p-4 rounded-xl flex items-center gap-3">
                <Zap className="w-5 h-5 text-fuchsia-400" />
                <span className="text-sm font-bold text-gray-300 uppercase">Webhooks</span>
              </div>
              <div className="col-span-2 bg-black border border-zinc-800 p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Music className="w-5 h-5 text-white" />
                  <span className="text-sm font-bold text-gray-300 uppercase">Audio Engine</span>
                </div>
                <span className="text-sm font-black text-green-500">Active</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}