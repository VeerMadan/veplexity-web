"use client";

import { motion } from "framer-motion";
import { 
  Gamepad2, Video, Music, Bot, Database, Cpu, 
  ExternalLink, Sparkles, Terminal, Code2, Layers, ShieldCheck 
} from "lucide-react";

export default function Labs() {
  const projects = [
    {
      id: "vp-cam",
      title: "VePlexity Cam / Studio Systems",
      category: "HARDWARE & OBS AUTOMATION",
      desc: "Hardware multi-angle camera switching rig coupled with custom OBS WebSocket macro triggers. Powers studio-grade 1080p60 multi-camera live switching with zero latency.",
      icon: Video,
      gradient: "from-orange-500 to-amber-500",
      borderColor: "border-orange-500/30 hover:border-orange-500/60",
      tags: ["Multi-Angle HDMI", "OBS WebSocket", "Hardware Macros"],
      badge: "ACTIVE IN STUDIO",
    },
    {
      id: "bot-v2",
      title: "VePlexity Commercial Bot V2",
      category: "AUTOMATION & CLOUD ENGINE",
      desc: "Full-scale commercial Discord application loaded with 97+ production slash commands, lossless FFmpeg music engine, Gemini AI intelligence, and a live web dashboard.",
      icon: Bot,
      gradient: "from-fuchsia-500 to-pink-500",
      borderColor: "border-fuchsia-500/30 hover:border-fuchsia-500/60",
      tags: ["Discord.js", "MongoDB Atlas", "Next.js Dashboard"],
      badge: "PRODUCTION LIVE",
    },
    {
      id: "game-engine",
      title: "Game Engine Architecture",
      category: "C++ SYSTEMS & REVERSE ENG",
      desc: "Deep-level C++ memory injection, runtime hook reverse engineering, and custom render state modifications for Grand Theft Auto: Vice City and sandbox game engine modding.",
      icon: Gamepad2,
      gradient: "from-purple-500 to-indigo-500",
      borderColor: "border-purple-500/30 hover:border-purple-500/60",
      tags: ["C++ Injection", "Memory Hooking", "DirectX/D3D"],
      badge: "RESEARCH & LABS",
    },
    {
      id: "audio-mastering",
      title: "Audio Engineering & Discography",
      category: "DSP & ACOUSTIC MASTERING",
      desc: "Professional DAW sequencing, VST DSP mastering workflows, and sound design. Commercial discography master files include 'Tera Asar' and 'Aisi Tu' with high dynamic range audio.",
      icon: Music,
      gradient: "from-pink-500 to-rose-500",
      borderColor: "border-pink-500/30 hover:border-pink-500/60",
      tags: ["DAW Mastering", "DSP Chains", "Commercial Audio"],
      badge: "STUDIO ARCHIVE",
    },
    {
      id: "cloud-ops",
      title: "High-Performance Cloud Infrastructure",
      category: "DISTRIBUTED PIPELINES",
      desc: "Scalable containerized deployment configurations on Render and Vercel. Includes automated self-healing pingers, in-memory caching, and sub-15ms database replication.",
      icon: Database,
      gradient: "from-emerald-500 to-teal-500",
      borderColor: "border-emerald-500/30 hover:border-emerald-500/60",
      tags: ["Docker Containers", "Atlas Clusters", "Health Telemetry"],
      badge: "CLOUD DEPLOYED",
    },
    {
      id: "future-systems",
      title: "Next-Gen Media & AI Experiments",
      category: "FUTURE PIPELINES",
      desc: "Upcoming generative vision and audio pipelines currently under development in the VePlexity labs. Building autonomous creator toolchains for the next decade.",
      icon: Sparkles,
      gradient: "from-cyan-500 to-blue-500",
      borderColor: "border-cyan-500/30 hover:border-cyan-500/60",
      tags: ["Generative AI", "Audio Synthesis", "Creator Tools"],
      badge: "IN DEVELOPMENT",
    },
  ];

  return (
    <section className="relative py-28 px-4 sm:px-6 z-10 bg-[#070308] border-t border-white/5" id="labs">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="w-5 h-5 text-fuchsia-400" />
              <span className="text-xs font-mono font-black uppercase tracking-widest text-fuchsia-400">
                VePlexity Systems R&D
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
              Engineering <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent">Labs & Projects.</span>
            </h2>
          </div>
          <p className="text-zinc-400 text-sm sm:text-base max-w-lg leading-relaxed font-normal">
            From low-level C++ game runtime hooks and hardware camera rigs to full commercial cloud microservices and audio mastering.
          </p>
        </div>

        {/* Labs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, i) => {
            const Icon = proj.icon;
            return (
              <motion.div 
                key={proj.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`bg-[#0c0512] border-2 ${proj.borderColor} rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_35px_rgba(217,70,239,0.12)] group relative overflow-hidden`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${proj.gradient} p-0.5 group-hover:scale-110 transition-transform shadow-lg`}>
                      <div className="w-full h-full bg-[#0c0512] rounded-[10px] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                      {proj.badge}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-zinc-500 block mb-1">
                    {proj.category}
                  </span>

                  <h3 className="text-xl font-black text-white group-hover:text-fuchsia-300 transition-colors mb-3">
                    {proj.title}
                  </h3>

                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-normal">
                    {proj.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {proj.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx}
                      className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-md bg-white/[0.03] text-zinc-400 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}