"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Terminal, Play, ExternalLink } from "lucide-react";

export default function LabsPage() {
  const labProjects = [
    {
      id: "LAB-01",
      title: "Hardware Video Matrix & Studio Broadcast Automation",
      domain: "HARDWARE VIDEO & OBS AUTOMATION",
      status: "OPERATIONAL",
      borderColor: "hover:border-orange-500/50",
      description: "A customized multi-angle hardware camera capture rig paired with dynamic OBS automation. Switches camera scenes based on audio thresholds, game telemetry hooks, and real-time controller triggers for YouTube broadcasts.",
      specs: [
        { label: "Pipeline", value: "Low-latency 1080p60 HDMI Matrix" },
        { label: "Switching", value: "Automated Python / OBS-WebSocket Daemon" },
        { label: "Telemetry", value: "Real-time stream health & bit-rate monitoring" },
        { label: "Production", value: "VePlexity Comeback Stream Archive" },
      ],
      showVideo: true,
      videoId: "dZvvx4SIkbM",
      videoUrl: "https://www.youtube.com/watch?v=dZvvx4SIkbM",
    },
    {
      id: "LAB-02",
      title: "Game Engine Runtime & C++ Injection Architecture",
      domain: "REVERSE ENGINEERING & LOW-LEVEL SYSTEMS",
      status: "ACTIVE RESEARCH",
      borderColor: "hover:border-fuchsia-500/50",
      description: "Custom runtime memory hooking and dynamic render interception targeting Grand Theft Auto and open-world sandbox engines. Manipulates internal entity coordinates, free-cam matrix offsets, and renders diagnostic HUD overlays directly via DirectX.",
      specs: [
        { label: "Architecture", value: "C++20 / Assembly x64 Hooking" },
        { label: "Memory Pipeline", value: "Dynamic pattern scanning & pointer resolution" },
        { label: "Render Engine", value: "DirectX 11/12 ImGui overlay injection" },
        { label: "Safety", value: "Offline sandboxed memory inspection" },
      ],
      showVideo: false,
    },
    {
      id: "LAB-03",
      title: "Audio Mastering & Digital Signal Processing Chains",
      domain: "DIGITAL SIGNAL PROCESSING & STUDIO ACOUSTICS",
      status: "DEPLOYED IN BOT & MEDIA",
      borderColor: "hover:border-purple-500/50",
      description: "Custom digital signal processing chains delivering studio-grade broadcast sound. Features multi-band dynamic compression, vintage tube harmonic saturation, and automatic ITU-R BS.1770-4 LUFS loudness normalization for Discord voice nodes and YouTube mastering.",
      specs: [
        { label: "Standard", value: "-14 LUFS integrated / -1.0 dB True Peak" },
        { label: "Algorithm", value: "Adaptive lookahead limiter & phase alignment" },
        { label: "Integration", value: "VePlexity Bot audio filter pipeline" },
        { label: "Sampling", value: "48kHz 24-bit floating point processing" },
      ],
      showVideo: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#070308] text-white selection:bg-fuchsia-500/30 overflow-hidden flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-5 sm:px-8 py-16 relative z-10">
        
        {/* Header */}
        <div className="border-b border-white/5 pb-10 mb-14 relative">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-fuchsia-600/10 blur-[150px] rounded-full pointer-events-none" />

          <div className="flex items-center gap-2 font-mono text-xs text-orange-500 uppercase tracking-widest mb-3 font-black">
            <Terminal className="w-4 h-4 text-orange-400" />
            <span>RESEARCH & DEVELOPMENT • DIVISION</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-white">
            Software & Media <span className="bg-gradient-to-r from-orange-500 to-fuchsia-500 bg-clip-text text-transparent">Labs.</span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl text-lg leading-relaxed font-normal">
            Technical laboratory specifications covering studio video hardware, low-level C++ game runtime engineering, and digital signal processing.
          </p>
        </div>

        {/* Lab Modules */}
        <div className="space-y-12">
          {labProjects.map((lab, idx) => (
            <motion.section
              key={lab.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className={`p-8 sm:p-10 rounded-[2rem] bg-[#0c0512] border-[4px] border-zinc-900 ${lab.borderColor} transition-colors duration-300`}
            >
              {/* Meta row */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 text-xs text-zinc-400 pb-4 border-b border-white/5 font-mono">
                <div className="flex items-center gap-3">
                  <span className="font-black text-white bg-black border border-zinc-800 px-3 py-1 rounded-xl">
                    {lab.id}
                  </span>
                  <span className="text-zinc-300 font-bold uppercase">{lab.domain}</span>
                </div>
                <div className="flex items-center gap-2 text-green-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span>{lab.status}</span>
                </div>
              </div>

              {/* Title & Desc */}
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-4 leading-tight">
                {lab.title}
              </h2>
              <p className="text-gray-400 text-base leading-relaxed mb-8 font-normal">
                {lab.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 bg-black/60 p-6 rounded-2xl border border-zinc-800">
                {lab.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="font-mono text-xs">
                    <span className="text-orange-400 block mb-1 font-bold uppercase tracking-wider">{spec.label}:</span>
                    <span className="text-white font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Optional Video Embed */}
              {lab.showVideo && lab.videoId && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-2 font-bold uppercase text-white">
                      <Play className="w-4 h-4 fill-orange-500 text-orange-500" />
                      Live Laboratory Broadcast:
                    </span>
                    <a
                      href={lab.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-400 hover:text-orange-300 flex items-center gap-1 font-bold uppercase tracking-wider transition-colors"
                    >
                      <span>Open on YouTube</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-zinc-800 bg-black shadow-2xl">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube-nocookie.com/embed/${lab.videoId}`}
                      title={lab.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </motion.section>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
