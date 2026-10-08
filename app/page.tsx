import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { 
  Bot, ArrowRight, Play, ExternalLink, 
  Cpu, Radio, Sliders, Shield, Terminal, ArrowUpRight
} from "lucide-react";

export default function Home() {
  const capabilities = [
    {
      id: "01",
      icon: Cpu,
      category: "Low-Level Systems & Reverse Engineering",
      title: "C++ Game Engine Hooks & Memory Injection",
      description: "Direct runtime memory manipulation, dynamic pattern scanning, x64 assembly detours, and custom DirectX 11/12 ImGui overlay pipelines targeting Grand Theft Auto and open-world simulation engines.",
      tags: ["C++20", "Assembly x64", "DirectX 11/12", "Pattern Scanning"],
      href: "/labs",
    },
    {
      id: "02",
      icon: Bot,
      category: "Cloud Platforms & Distributed Services",
      title: "VePlexity Commercial Discord Bot V2",
      description: "Enterprise multi-server Discord bot architecture running 24/7 on dedicated Render cloud nodes. Built with 101 modular slash commands, lossless audio DSP, Gemini AI integration, and MongoDB Atlas persistence.",
      tags: ["Node.js 20", "Discord.js v14", "MongoDB Atlas", "Render Daemon"],
      href: "/bot",
    },
    {
      id: "03",
      icon: Radio,
      category: "Hardware Video & Studio Broadcasting",
      title: "Hardware Camera Matrix & OBS Automation",
      description: "Multi-angle 1080p60 hardware HDMI matrix synchronized with an automated Python/OBS-WebSocket daemon that dynamically switches camera scenes based on audio thresholds and application telemetry.",
      tags: ["Hardware Matrix", "OBS-WebSocket", "Python Daemon", "1080p60"],
      href: "/labs",
    },
    {
      id: "04",
      icon: Sliders,
      category: "Digital Signal Processing & Studio Acoustics",
      title: "Audio Mastering & Harmonic Processing",
      description: "Audio processing algorithms delivering broadcast-ready sound. Features multi-band dynamic compression, vintage harmonic modeling, and ITU-R BS.1770-4 -14 LUFS loudness mastering compliance.",
      tags: ["48kHz DSP", "-14 LUFS", "Dynamic Limiter", "Acoustics"],
      href: "/labs",
    },
  ];

  const newswireArticles = [
    {
      tag: "Flagship Release",
      date: "October 7, 2026",
      title: "VePlexity Commercial Bot V2 Deployed in Production",
      excerpt: "Full rollout on Render cloud nodes with lossless music audio, context-aware Gemini AI, web dashboard integration, and MongoDB Atlas sync.",
      href: "/bot",
    },
    {
      tag: "Studio Broadcast",
      date: "October 6, 2026",
      title: "VePlexity Studio: Comeback Broadcast & Camera Matrix Tested",
      excerpt: "Multi-angle camera switching rig and automated OBS macros demonstrated live on YouTube during the official network comeback stream.",
      href: "https://www.youtube.com/watch?v=dZvvx4SIkbM",
      isExternal: true,
    },
    {
      tag: "Engineering Lab",
      date: "Fall 2026",
      title: "DirectX Overlay Injection & Memory Pointer Research Milestone",
      excerpt: "Phase 1 completion of lightweight DLL hooking without external frameworks, enabling zero-frame-drop telemetry overlays in open-world sandbox runtimes.",
      href: "/labs",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#05070a] text-[#e5e7eb]">
      <Navbar />

      <main className="flex-1 w-full">
        
        {/* HERO SECTION */}
        <section className="relative w-full pt-20 pb-24 md:pt-32 md:pb-36 px-5 sm:px-8 lg:px-12 overflow-hidden border-b border-white/5">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-purple-600/10 via-blue-600/10 to-transparent blur-[130px] rounded-full pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="text-xs font-medium text-zinc-300">
                VePlexity Network <span className="text-zinc-500">•</span> System Operational
              </span>
            </div>

            {/* Headline */}
            <div className="max-w-4xl space-y-6">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05]">
                Systems. Media. <br />
                <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  Engineering.
                </span>
              </h1>

              <p className="text-base sm:text-xl text-zinc-400 font-normal leading-relaxed max-w-2xl">
                The software portfolio and engineering infrastructure of <strong className="text-white font-semibold">Veer Madan</strong>. Spanning enterprise 24/7 cloud Discord bots, low-level C++ game runtime hooks, and automated studio broadcasts.
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/bot"
                  className="px-6 py-3.5 bg-white text-black rounded-xl font-bold text-sm hover:bg-zinc-200 transition-all shadow-sm flex items-center gap-2"
                >
                  <span>Explore Bot V2</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/news-wire"
                  className="px-6 py-3.5 bg-white/5 text-white border border-white/10 rounded-xl font-medium text-sm hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <span>Technical Newswire</span>
                </Link>

                <a
                  href="https://www.youtube.com/watch?v=dZvvx4SIkbM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 text-zinc-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <Play className="w-4 h-4 text-zinc-300" />
                  <span>Watch Stream</span>
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* METRICS & TELEMETRY STRIP */}
        <section className="border-b border-white/5 bg-[#080b10]/60">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Bot V2 Handlers</div>
              <div className="text-3xl font-black text-white">101 Slash</div>
              <div className="text-xs text-zinc-400">Node.js 20 & Discord.js v14</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Cloud Database</div>
              <div className="text-3xl font-black text-white">Atlas M0</div>
              <div className="text-xs text-zinc-400">Sub-15ms replica cluster</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Studio Broadcast</div>
              <div className="text-3xl font-black text-white">1080p60</div>
              <div className="text-xs text-zinc-400">Automated OBS-WebSocket</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Runtime Hooks</div>
              <div className="text-3xl font-black text-white">C++20 x64</div>
              <div className="text-xs text-zinc-400">DirectX overlay pipelines</div>
            </div>
          </div>
        </section>

        {/* ENGINEERING DISCIPLINES // BENTO GRID */}
        <section className="py-24 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14 pb-6 border-b border-white/5">
            <div>
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Technical Disciplines
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mt-1">
                Engineering Capabilities
              </h2>
            </div>
            <p className="text-sm text-zinc-400 max-w-md font-normal leading-relaxed">
              Cross-disciplinary software development bridging low-level memory manipulation, cloud platform architecture, and real-time audio/video broadcasting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className="p-8 md:p-10 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all flex flex-col justify-between group shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                        <IconComponent className="w-6 h-6 text-zinc-200" />
                      </div>
                      <span className="text-xs font-mono text-zinc-500 font-bold">
                        {item.id}
                      </span>
                    </div>

                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-2">
                      {item.category}
                    </span>

                    <h3 className="text-2xl font-bold tracking-tight text-white mb-3 group-hover:text-zinc-100 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-sm text-zinc-400 leading-relaxed mb-8 font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium rounded-lg bg-white/5 border border-white/5 text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* TECHNICAL NEWSWIRE */}
        <section className="py-24 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/5">
          <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/5">
            <div>
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Official Press & Dispatches
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1">
                The Technical Newswire
              </h2>
            </div>
            <Link
              href="/news-wire"
              className="text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newswireArticles.map((item, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 text-xs">
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/5 border border-white/10 text-zinc-300">
                      {item.tag}
                    </span>
                    <span className="text-zinc-500 text-[11px]">{item.date}</span>
                  </div>

                  <h3 className="text-lg font-bold tracking-tight text-white mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-normal">
                    {item.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  {item.isExternal ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
                    >
                      <span>Watch Archive</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
                    >
                      <span>Read Dispatch</span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STUDIO BROADCAST & HARDWARE DEMO */}
        <section className="py-24 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/5">
          <div className="p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300">
                  <Play className="w-3 h-3 fill-zinc-300" />
                  <span>Broadcast Recording</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                  VePlexity Studio Broadcast
                </h3>

                <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                  Live multi-angle broadcast demonstrating low-latency HDMI switching, dynamic voice triggers, and community interaction during the network comeback stream.
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <a
                    href="https://www.youtube.com/watch?v=dZvvx4SIkbM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-white text-black font-semibold text-xs rounded-xl hover:bg-zinc-200 transition-colors flex items-center gap-2"
                  >
                    <span>Watch on YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <Link
                    href="/labs"
                    className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-semibold text-xs rounded-xl transition-colors"
                  >
                    <span>Rig Specs</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-black shadow-xl">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube-nocookie.com/embed/dZvvx4SIkbM"
                    title="VePlexity Studio Broadcast"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}