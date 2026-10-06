"use client";
import { motion } from "framer-motion";
import { Code2, Gamepad2, Database } from "lucide-react";

export default function Labs() {
  const projects = [
    {
      title: "Game Engine Architecture",
      desc: "Deep-level C++ memory injection and render state modifications for titles like Vice City and GTA VI modding concepts.",
      icon: <Gamepad2 className="w-8 h-8 text-fuchsia-500" />,
      color: "border-fuchsia-500/50"
    },
    {
      title: "Performance Operations",
      desc: "Architecting high-conversion pipelines using localized WhatsApp CTAs and aggressively optimized CPL marketing systems.",
      icon: <Database className="w-8 h-8 text-orange-500" />,
      color: "border-orange-500/50"
    },
    {
      title: "Audio Engineering Hub",
      desc: "Professional DAW sequencing, VST integrations, and mastering workflows utilized for commercial releases like Tera Asar and Aisi Tu.",
      icon: <Code2 className="w-8 h-8 text-purple-500" />,
      color: "border-purple-500/50"
    }
  ];

  return (
    <section className="relative py-32 px-5 z-10 bg-[#070308] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black text-white mb-16 tracking-tighter">
          Engineering <span className="bg-gradient-to-r from-orange-500 to-fuchsia-500 bg-clip-text text-transparent">Labs.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((proj, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`bg-[#0c0512] border-[4px] border-zinc-900 rounded-[2rem] p-10 hover:${proj.color} transition-colors duration-300 group`}
            >
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {proj.icon}
              </div>
              <h3 className="text-2xl font-black text-white mb-4">{proj.title}</h3>
              <p className="text-gray-400 text-lg leading-relaxed">{proj.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}