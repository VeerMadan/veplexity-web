"use client";

import { motion } from "framer-motion";
import { Code2, Gamepad2, Database, Sparkles, Layers } from "lucide-react";

export default function Labs() {
  const projects = [
    {
      title: "Game Engine Architecture",
      desc: "Deep-level C++ memory injection and render state modifications for titles like Vice City and GTA VI modding concepts.",
      icon: <Gamepad2 className="w-7 h-7 text-fuchsia-400" />,
      color: "border-fuchsia-500/40"
    },
    {
      title: "Performance Operations",
      desc: "Architecting high-conversion pipelines using localized messaging CTAs and aggressively optimized conversion marketing systems.",
      icon: <Database className="w-7 h-7 text-orange-400" />,
      color: "border-orange-500/40"
    },
    {
      title: "Audio Engineering Hub",
      desc: "Professional DAW sequencing, VST integrations, and mastering workflows utilized for commercial releases like Tera Asar and Aisi Tu.",
      icon: <Code2 className="w-7 h-7 text-purple-400" />,
      color: "border-purple-500/40"
    }
  ];

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050208] border-t border-white/5">
      <div className="w-full max-w-[1400px] mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass border border-fuchsia-500/30 text-fuchsia-300 font-mono text-xs font-bold uppercase tracking-widest mb-4">
              <Layers className="w-3.5 h-3.5" /> Innovation R&D
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter">
              Engineering <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent">Labs.</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mt-3">
              Experimental systems built alongside VePlexity spanning low-level reverse engineering, media automation, and audio science.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((proj, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`neo-card rounded-[2.5rem] p-8 sm:p-10 border-2 border-white/10 hover:${proj.color} transition-all duration-300 group flex flex-col justify-between`}
            >
              <div>
                <div className="w-14 h-14 rounded-2xl liquid-glass flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {proj.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-3">{proj.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{proj.desc}</p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>R&D PROJECT #{i + 1}</span>
                <span className="text-fuchsia-400 font-bold uppercase">Active</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}