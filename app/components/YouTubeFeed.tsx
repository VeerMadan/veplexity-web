"use client";
import { motion } from "framer-motion";
import { MonitorPlay, Radio, Play, MessageCircle } from "lucide-react";

export default function YouTubeFeed() {
  return (
    <section className="relative py-32 px-5 z-10 bg-[#070308] border-t border-white/5" id="content">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-16 gap-6">
          <div>
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-500 to-fuchsia-500 bg-clip-text text-transparent mb-6 tracking-tighter">
              VePlexity Network
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl leading-relaxed">
              Live API feeds pulling the latest uploads, active broadcasts, and community updates directly from the channel infrastructure.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* THE REAL LIVE VIDEO DATA */}
          <motion.a 
            href="https://www.youtube.com/watch?v=dZvvx4SIkbM"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0c0512] border-[4px] border-zinc-900 hover:border-orange-500/50 transition-colors duration-300 rounded-[2rem] p-6 group cursor-pointer relative overflow-hidden flex flex-col shadow-[0_0_40px_rgba(249,115,22,0.05)] block"
          >
            {/* Real YouTube Thumbnail */}
            <div 
              className="w-full h-48 bg-zinc-900 rounded-xl mb-6 relative overflow-hidden border border-zinc-800 bg-cover bg-center"
              style={{ backgroundImage: `url('https://img.youtube.com/vi/dZvvx4SIkbM/maxresdefault.jpg')` }}
            >
               <div className="absolute inset-0 bg-gradient-to-tr from-orange-900/60 to-transparent z-10" />
               <div className="absolute inset-0 flex items-center justify-center z-20">
                 <div className="w-16 h-16 rounded-full bg-orange-500/30 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform border border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.6)]">
                   <Play className="w-7 h-7 text-white ml-1 fill-white" />
                 </div>
               </div>
            </div>
            
            <div className="flex gap-2 items-center mb-4">
              <span className="px-3 py-1 border border-orange-500 text-orange-500 rounded-lg text-[10px] font-black uppercase tracking-widest bg-orange-500/10">
                Latest Broadcast
              </span>
              <span className="text-xs text-zinc-500 font-mono font-bold">2H 30M</span>
            </div>
            
            <h3 className="text-2xl font-black text-white group-hover:text-orange-400 transition-colors leading-tight">
              🔴Comeback Day! - Welcome Back!
            </h3>
          </motion.a>

          {/* Archive / Logs Placeholders */}
          {[1, 2].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i + 1) * 0.1 }}
              className="bg-[#0c0512] border-[4px] border-zinc-900 hover:border-zinc-700 transition-colors duration-300 rounded-[2rem] p-6 group cursor-not-allowed relative overflow-hidden flex flex-col shadow-[0_0_40px_rgba(255,255,255,0.02)] opacity-70"
            >
              <div className="w-full h-48 bg-black rounded-xl mb-6 relative overflow-hidden border border-zinc-800 flex items-center justify-center">
                 <Radio className="w-10 h-10 text-zinc-700" />
              </div>
              
              <div className="flex gap-2 items-center mb-4">
                <span className="px-3 py-1 border border-zinc-600 text-zinc-500 rounded-lg text-[10px] font-black uppercase tracking-widest">
                  Archive
                </span>
              </div>
              
              <h3 className="text-2xl font-black text-zinc-600 leading-tight">
                Accessing Encrypted Logs...
              </h3>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}