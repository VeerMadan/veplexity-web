"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RevealText from "../components/RevealText";
import { 
  Terminal, Play, ExternalLink, Bot, Camera, Tv, Download, 
  Gamepad2, Code2, ArrowRight, CheckCircle2, ShieldCheck, Layers 
} from "lucide-react";

export default function LabsPage() {
  const labProjects = [
    {
      id: "LAB-01",
      slug: "veplexity-cam",
      title: "VePlexity Cam: Wireless & USB HD Camera Ecosystem",
      domain: "ANDROID SENSOR & WINDOWS DIRECTSHOW DRIVER",
      status: "LIVE PRODUCTION",
      borderColor: "hover:border-fuchsia-500/50",
      accentGradient: "from-fuchsia-500 to-pink-500",
      badgeColor: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/30",
      description: "Proprietary low-latency video streaming bridge converting modern Android smartphones into high-framerate, studio-grade PC webcams. Engineered with a custom Android capture client, local Wi-Fi UDP/TCP socket streaming, ADB USB reverse tethering, and a native Windows DirectShow virtual camera receiver driver recognized across OBS, Discord, and Zoom.",
      image: "/projects/webcam-banner.jpg",
      specs: [
        { label: "Glass-to-Glass Latency", value: "< 18ms (LAN / ADB)" },
        { label: "Video Pipeline", value: "Hardware H.264 / HEVC GPU Encode" },
        { label: "Max Resolution", value: "1080p 60FPS / 4K Sensor" },
        { label: "Driver Target", value: "Windows DirectShow Virtual Camera" },
      ],
      techStack: ["Android SDK", "Java / Flutter", "C++ Windows Driver", "DirectShow", "FFmpeg", "ADB Sockets"],
      actions: [
        { label: "Watch Live Rig Stream", href: "https://www.youtube.com/watch?v=dZvvx4SIkbM", external: true },
      ],
      highlights: [
        "Sub-18ms transmission over local 5GHz Wi-Fi and zero-jitter ADB USB tethering.",
        "DirectShow Windows Virtual Camera hook recognized natively by OBS Studio and Discord.",
        "100% private zero-cloud stream: video frames never leave the local LAN subnet."
      ]
    },
    {
      id: "LAB-02",
      slug: "veplexity-vision",
      title: "VePlexity Vision: Standalone Desktop Media Hub",
      domain: "ELECTRON 24 RUNTIME & HARDWARE VIDEO ACCELERATION",
      status: "ACTIVE APP",
      borderColor: "hover:border-purple-500/50",
      accentGradient: "from-purple-500 to-indigo-500",
      badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/30",
      description: "Standalone desktop video player and online media streaming center packaged with Next.js, Electron, and Tailwind CSS. Eliminates heavy browser overhead by delivering hardware-accelerated local video playback, native YouTube player embeds, fluid Picture-in-Picture multitasking, and VePlexity's signature vice neon glass aesthetic.",
      specs: [
        { label: "Desktop Runtime", value: "Electron 24 + Next.js Container" },
        { label: "Decoding Engine", value: "GPU Hardware Video Acceleration" },
        { label: "Multitasking", value: "Always-on-Top Picture-in-Picture (PiP)" },
        { label: "Media Support", value: "MKV, MP4, WebM, YouTube Stream" },
      ],
      techStack: ["Electron", "Next.js", "TypeScript", "Tailwind CSS", "HTML5 Media", "IPC Bridges"],
      actions: [
        { label: "Creator Portfolio", href: "https://veermadan.dev", external: true },
      ],
      highlights: [
        "Standalone Electron desktop container with zero browser chrome clutter and low memory footprint.",
        "Hardware GPU accelerated local media decoding for high-bitrate HEVC and 4K video files.",
        "Fluid Picture-in-Picture (PiP) viewport for concurrent coding, gaming, and editing workflows."
      ]
    },
    {
      id: "LAB-03",
      slug: "veplexity-downloader",
      title: "VePlexity Downloader: Vice Native Edition Transcoding Suite",
      domain: "MEDIA SCRAPING & EMBEDDED FFMPEG 6.0 PIPELINE",
      status: "STANDALONE RELEASE",
      borderColor: "hover:border-amber-500/50",
      accentGradient: "from-amber-500 to-orange-500",
      badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
      description: "Architectural, zero-friction desktop media extraction and transcoding application powered by yt-dlp and embedded FFmpeg 6.0. Shipped as a 100% standalone Windows portable executable and a native macOS .app bundle with Finder/Dock integration. Features GTA VI dusk styling, 4K60 video multiplexing, 320 kbps MP3 conversion, and zero browser popups.",
      image: "/projects/downloader-logo.png",
      specs: [
        { label: "Core Engine", value: "yt-dlp + Embedded FFmpeg 6.0" },
        { label: "Windows Target", value: "Standalone Portable EXE (Zero Setup)" },
        { label: "macOS Target", value: "Native .app Bundle with Dock Support" },
        { label: "Max Formats", value: "Lossless 4K60, 320k MP3, Studio WAV" },
      ],
      techStack: ["Python 3.11", "yt-dlp", "FFmpeg", "PyInstaller", "macOS AppleScript", "Custom HTML/CSS"],
      actions: [
        { label: "Creator Instagram", href: "https://www.instagram.com/veermxdan", external: true },
      ],
      highlights: [
        "100% standalone portable Windows EXE — zero Python, Node.js, or external CLI dependencies required.",
        "Native macOS .app bundle with /Applications installer and Spotlight support.",
        "Embedded FFmpeg audio/video muxing engine for 4K 60FPS video and 320 kbps studio MP3.",
        "Total UI lockdown (no DevTools, disabled right-click) with automatic file explorer highlighting."
      ]
    },
    {
      id: "LAB-04",
      slug: "veplexity-bot",
      title: "VePlexity Bot: Commercial Cloud Daemon Infrastructure",
      domain: "NODE.JS 24/7 DAEMON & MONGODB ATLAS CLUSTER",
      status: "PRODUCTION LIVE",
      borderColor: "hover:border-orange-500/50",
      accentGradient: "from-orange-500 to-fuchsia-500",
      badgeColor: "text-orange-400 bg-orange-500/10 border-orange-500/30",
      description: "Full-scale commercial Discord application deployed 24/7 on Render cloud web services with MongoDB Atlas cluster persistence. Powers 101 slash commands across Music, AI, Moderation, Utility, and Fun, lossless audio streaming, context-aware Gemini AI, and native Buy Me a Coffee VIP role synchronization.",
      specs: [
        { label: "Production Commands", value: "101 Modular Slash Routes" },
        { label: "Hosting Platform", value: "Render Web Service (24/7 Daemon)" },
        { label: "Database Cluster", value: "MongoDB Atlas (<15ms Query Latency)" },
        { label: "Monetization Sync", value: "Buy Me a Coffee Native Tier Webhooks" },
      ],
      techStack: ["Node.js", "Discord.js v14", "MongoDB Atlas", "Docker", "Render", "Gemini AI"],
      actions: [
        { label: "Explore Bot Page", href: "/bot", external: false },
        { label: "Add to Server", href: "/invite", external: false },
      ],
      highlights: [
        "101 modular slash commands divided across 5 core categories with hot-reload capability.",
        "Lossless music streaming engine with 24/7 retention and queue control.",
        "Integrated Gemini AI smart assistant for conversational queries.",
        "Zero-risk VIP payment fail-safe system with automated role synchronization."
      ]
    },
    {
      id: "LAB-05",
      slug: "studio-broadcast",
      title: "Hardware Video Matrix & OBS Studio Automation",
      domain: "HARDWARE VIDEO & OBS WEBSOCKET AUTOMATION",
      status: "OPERATIONAL",
      borderColor: "hover:border-orange-500/50",
      accentGradient: "from-orange-500 to-amber-500",
      badgeColor: "text-orange-400 bg-orange-500/10 border-orange-500/30",
      description: "Customized multi-angle hardware camera capture rig paired with dynamic OBS automation. Switches camera scenes based on audio thresholds, game telemetry hooks, and real-time controller triggers for YouTube broadcasts.",
      specs: [
        { label: "Pipeline", value: "Low-latency 1080p60 HDMI Matrix" },
        { label: "Switching", value: "Automated Python / OBS-WebSocket Daemon" },
        { label: "Telemetry", value: "Real-time stream health & bit-rate monitoring" },
        { label: "Production", value: "VePlexity Comeback Stream Archive" },
      ],
      techStack: ["OBS Studio", "OBS-WebSocket", "Python", "Hardware HDMI Capture", "MIDI Triggers"],
      showVideo: true,
      videoId: "dZvvx4SIkbM",
      videoUrl: "https://www.youtube.com/watch?v=dZvvx4SIkbM",
      highlights: [
        "Automated scene switching triggered by audio thresholds and game states.",
        "Integrated with VePlexity Cam for mobile wireless auxiliary angles.",
        "Zero dropped frames during 2.5-hour continuous live production."
      ]
    },
    {
      id: "LAB-06",
      slug: "game-engine",
      title: "Game Engine Runtime & C++ Injection Architecture",
      domain: "REVERSE ENGINEERING & LOW-LEVEL SYSTEMS",
      status: "ACTIVE RESEARCH",
      borderColor: "hover:border-cyan-500/50",
      accentGradient: "from-cyan-500 to-blue-500",
      badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
      description: "Custom runtime memory hooking and dynamic render interception targeting Grand Theft Auto and open-world sandbox engines. Manipulates internal entity coordinates, free-cam matrix offsets, and renders diagnostic HUD overlays directly via DirectX.",
      specs: [
        { label: "Architecture", value: "C++20 / Assembly x64 Hooking" },
        { label: "Memory Pipeline", value: "Dynamic pattern scanning & pointer resolution" },
        { label: "Render Engine", value: "DirectX 11/12 ImGui overlay injection" },
        { label: "Safety", value: "Offline sandboxed memory inspection" },
      ],
      techStack: ["C++20", "Assembly x64", "DirectX 11/12", "ImGui", "MinHook", "Memory Scanners"],
      highlights: [
        "Pattern scanning routines with dynamic offset recalculation across updates.",
        "In-process ImGui diagnostic overlays rendered with zero frame time spikes.",
        "Strictly sandboxed for single-player engine performance research."
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-[#070308] text-white selection:bg-fuchsia-500/30 overflow-hidden flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-5 sm:px-8 py-16 relative z-10">
        
        {/* Header */}
        <div className="border-b border-white/5 pb-12 mb-16 relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-fuchsia-600/10 blur-[160px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />

          <div className="flex items-center gap-2 font-mono text-xs text-orange-400 uppercase tracking-widest mb-3 font-black bg-orange-500/10 border border-orange-500/30 px-3.5 py-1.5 rounded-xl w-fit">
            <Terminal className="w-4 h-4 text-orange-400" />
            <span>RESEARCH & DEVELOPMENT • DIVISION</span>
          </div>

          <RevealText
            text="Engineering & Software"
            highlightText="Labs."
            as="h1"
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white"
          />

          <p className="text-gray-400 mt-4 max-w-3xl text-lg sm:text-xl leading-relaxed font-normal">
            Comprehensive technical laboratory specifications covering Veer Madan's proprietary software deployments: wireless Android camera drivers, Electron media hubs, standalone FFmpeg extractors, and cloud daemons.
          </p>
        </div>

        {/* Lab Modules */}
        <div className="space-y-14">
          {labProjects.map((lab, idx) => (
            <motion.section
              key={lab.id}
              id={lab.slug}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: idx * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`p-8 sm:p-12 rounded-[2rem] bg-[#0c0512] border-[4px] border-zinc-900 ${lab.borderColor} transition-colors duration-300 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.6)]`}
            >
              {/* Corner Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-fuchsia-600/10 to-orange-600/5 blur-[90px] rounded-full pointer-events-none" />

              {/* Meta row */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 text-xs text-zinc-400 pb-5 border-b border-white/5 font-mono">
                <div className="flex items-center gap-3">
                  <span className="font-black text-white bg-black border border-zinc-800 px-3 py-1 rounded-xl">
                    {lab.id}
                  </span>
                  <span className="text-zinc-300 font-bold uppercase tracking-wider">{lab.domain}</span>
                </div>
                <div className="flex items-center gap-2 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.6)]" />
                  <span className="text-green-400 uppercase tracking-widest">{lab.status}</span>
                </div>
              </div>

              {/* Title & Desc */}
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-4 leading-tight">
                {lab.title}
              </h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 font-normal">
                {lab.description}
              </p>

              {/* Optional Visual Image Preview */}
              {lab.image && (
                <div className="mb-8 rounded-2xl overflow-hidden border border-zinc-800 bg-black/80 max-h-72 flex items-center justify-center p-3 relative group">
                  <Image
                    src={lab.image}
                    alt={lab.title}
                    width={800}
                    height={350}
                    className="w-full h-auto max-h-64 object-contain rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              )}

              {/* Engineering Highlights */}
              {lab.highlights && (
                <div className="mb-8 space-y-2.5">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-orange-400" /> Key Architectural Innovations
                  </h4>
                  {lab.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-3 p-3 rounded-xl bg-black/60 border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                      <span className="text-xs sm:text-sm text-zinc-300 font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 bg-black/70 p-6 sm:p-7 rounded-2xl border border-zinc-800">
                {lab.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="font-mono text-xs flex flex-col justify-between">
                    <span className="text-orange-400 block mb-1 font-bold uppercase tracking-wider">{spec.label}:</span>
                    <span className="text-white font-black text-sm">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Badges */}
              {lab.techStack && (
                <div className="flex flex-wrap items-center gap-2 mb-8">
                  {lab.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-xs font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Optional Actions */}
              {lab.actions && lab.actions.length > 0 && (
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  {lab.actions.map((act, aIdx) => (
                    act.external ? (
                      <a
                        key={aIdx}
                        href={act.href}
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3.5 bg-gradient-to-br from-orange-500 to-fuchsia-600 text-white font-black uppercase tracking-widest text-xs rounded-xl flex items-center gap-2 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(217,70,239,0.3)]"
                      >
                        <span>{act.label}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <Link
                        key={aIdx}
                        href={act.href}
                        className="px-6 py-3.5 bg-gradient-to-br from-orange-500 to-fuchsia-600 text-white font-black uppercase tracking-widest text-xs rounded-xl flex items-center gap-2 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(217,70,239,0.3)]"
                      >
                        <span>{act.label}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )
                  ))}
                </div>
              )}

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
