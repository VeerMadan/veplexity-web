"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TelemetryBar from "./components/TelemetryBar";
import FlagshipProjectsSection from "./components/FlagshipProjectsSection";
import RevealText from "./components/RevealText";
import { 
  MonitorPlay, MessageSquare, Terminal, Play, Radio, 
  Gamepad2, Database, Code2, ArrowRight, Shield, Zap, Music,
  Bot, ExternalLink, Sparkles, Layers 
} from "lucide-react";

export default function Home() {
  const labProjects = [
    {
      title: "Game Engine Architecture",
      desc: "Deep-level C++ memory injection and render state modifications for open-world runtimes and GTA modding concepts.",
      icon: <Gamepad2 className="w-8 h-8 text-fuchsia-500" />,
      color: "hover:border-fuchsia-500/50",
      href: "/labs",
    },
    {
      title: "Performance Operations",
      desc: "Architecting high-conversion pipelines using localized WhatsApp CTAs and aggressively optimized CPL marketing systems.",
      icon: <Database className="w-8 h-8 text-orange-500" />,
      color: "hover:border-orange-500/50",
      href: "/labs",
    },
    {
      title: "Audio Engineering Hub",
      desc: "Professional DAW sequencing, VST integrations, and mastering workflows utilized for commercial releases like Tera Asar and Aisi Tu.",
      icon: <Code2 className="w-8 h-8 text-purple-500" />,
      color: "hover:border-purple-500/50",
      href: "/labs",
    }
  ];

  return (
    <div className="min-h-screen bg-[#070308] text-white selection:bg-fuchsia-500/30 overflow-hidden flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 w-full">
        
        {/* ─── HERO SECTION (COMMIT 60be601 REBORN WITH REVEAL TEXT) ───────── */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-5 pt-10 pb-20 overflow-hidden">
          
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-fuchsia-600/15 blur-[160px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-600/15 blur-[160px] rounded-full pointer-events-none" />

          <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center relative z-10 mt-4">
            
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex items-center gap-2 px-4 py-2 border border-orange-500 text-orange-400 rounded-xl font-mono text-xs font-black uppercase tracking-widest bg-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.25)]"
            >
              <Terminal className="w-4 h-4 text-orange-400" /> System Initialized • VePlexity Network
            </motion.div>

            <RevealText
              text="Welcome to"
              highlightText="VePlexity."
              as="h1"
              delay={0.1}
              className="text-6xl md:text-8xl lg:text-[7.5rem] font-black text-white tracking-tighter leading-[1] mb-8 drop-shadow-[0_0_20px_rgba(217,70,239,0.35)]"
            />

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="text-lg md:text-2xl text-gray-400 max-w-3xl mb-12 leading-relaxed"
            >
              The central engineering infrastructure for standalone desktop software, Android hardware camera pipelines, and high-performance cloud network ecosystems.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Link 
                href="/bot" 
                className="w-full sm:w-auto px-9 py-5 bg-gradient-to-br from-orange-500 to-fuchsia-600 text-white font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 transition-transform hover:scale-105 shadow-[0_0_30px_rgba(217,70,239,0.4)]"
              >
                <Bot className="w-6 h-6" /> Explore VePlexity Bot
              </Link>

              <a 
                href="#flagship-software" 
                className="w-full sm:w-auto px-9 py-5 bg-[#0c0512] text-fuchsia-400 border-[3px] border-fuchsia-500/30 hover:bg-fuchsia-500/10 font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 transition-all hover:border-fuchsia-500/60"
              >
                <Layers className="w-6 h-6" /> Flagship Software
              </a>

              <a 
                href="https://youtube.com/@VePlexity" 
                target="_blank" 
                rel="noreferrer"
                className="w-full sm:w-auto px-8 py-5 bg-black/80 text-zinc-300 hover:text-white border-[2px] border-zinc-800 hover:border-zinc-700 font-bold uppercase tracking-wider text-xs rounded-2xl flex items-center justify-center gap-2 transition-colors"
              >
                <MonitorPlay className="w-4 h-4 text-orange-400" /> Watch Content
              </a>
            </motion.div>

          </div>
        </section>

        {/* ─── TELEMETRY BAR ─────────────────────────────────────────────────── */}
        <TelemetryBar />

        {/* ─── FLAGSHIP PROJECTS SHOWCASE ────────────────────────────────────── */}
        <FlagshipProjectsSection />

        {/* ─── YOUTUBE FEED SECTION (COMMIT 60be601 REBORN) ────────────────── */}
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
              <Link
                href="/news-wire"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-400 hover:text-orange-300 transition-colors"
              >
                <span>Read Technical Newswire</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
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
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-[#0c0512] border-[4px] border-zinc-900 hover:border-zinc-700 transition-colors duration-300 rounded-[2rem] p-6 group relative overflow-hidden flex flex-col shadow-[0_0_40px_rgba(255,255,255,0.02)]"
              >
                <div className="w-full h-48 bg-black rounded-xl mb-6 relative overflow-hidden border border-zinc-800 flex items-center justify-center">
                   <Radio className="w-10 h-10 text-fuchsia-500/50" />
                </div>
                
                <div className="flex gap-2 items-center mb-4">
                  <span className="px-3 py-1 border border-fuchsia-500/50 text-fuchsia-400 rounded-lg text-[10px] font-black uppercase tracking-widest bg-fuchsia-500/10">
                    Live Stream Rig
                  </span>
                </div>
                
                <h3 className="text-2xl font-black text-white leading-tight">
                  OBS Multi-Cam 1080p60 Hardware Rig Tested
                </h3>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-[#0c0512] border-[4px] border-zinc-900 hover:border-zinc-700 transition-colors duration-300 rounded-[2rem] p-6 group relative overflow-hidden flex flex-col shadow-[0_0_40px_rgba(255,255,255,0.02)]"
              >
                <div className="w-full h-48 bg-black rounded-xl mb-6 relative overflow-hidden border border-zinc-800 flex items-center justify-center">
                   <Terminal className="w-10 h-10 text-orange-500/50" />
                </div>
                
                <div className="flex gap-2 items-center mb-4">
                  <span className="px-3 py-1 border border-orange-500/50 text-orange-400 rounded-lg text-[10px] font-black uppercase tracking-widest bg-orange-500/10">
                    Cloud Infrastructure
                  </span>
                </div>
                
                <h3 className="text-2xl font-black text-white leading-tight">
                  Commercial VePlexity Bot Loaded on Render 24/7
                </h3>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ─── LABS SECTION (COMMIT 60be601 REBORN) ────────────────────────── */}
        <section className="relative py-32 px-5 z-10 bg-[#070308] border-t border-white/5" id="labs">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter">
                Engineering <span className="bg-gradient-to-r from-orange-500 to-fuchsia-500 bg-clip-text text-transparent">Labs.</span>
              </h2>
              <Link
                href="/labs"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
              >
                <span>View Full Laboratory Specs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {labProjects.map((proj, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-[#0c0512] border-[4px] border-zinc-900 rounded-[2rem] p-10 ${proj.color} transition-colors duration-300 group flex flex-col justify-between`}
                >
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                      {proj.icon}
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4">{proj.title}</h3>
                    <p className="text-gray-400 text-lg leading-relaxed mb-6">{proj.desc}</p>
                  </div>
                  <div>
                    <Link
                      href={proj.href}
                      className="text-xs font-black uppercase tracking-widest text-white group-hover:text-fuchsia-400 flex items-center gap-2 transition-colors"
                    >
                      <span>Explore Spec</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── ECOSYSTEM SECTION (COMMIT 60be601 REBORN) ───────────────────── */}
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

      </main>

      <Footer />
    </div>
  );
}