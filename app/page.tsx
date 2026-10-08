import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { 
  Bot, ArrowRight, Play, ExternalLink, 
  Cpu, Radio, Sliders, Shield, Terminal, ArrowUpRight
} from "lucide-react";
import { 
  MotionReveal, 
  MotionStaggerContainer, 
  MotionStaggerItem 
} from "./components/MotionReveal";

export default function Home() {
  const capabilities = [
    {
      id: "01",
      icon: Cpu,
      category: "Low-Level Systems & Reverse Engineering",
      title: "C++ Game Engine Hooks & Memory Injection",
      description: "Direct runtime memory manipulation, dynamic pattern scanning, x64 assembly detours, and custom DirectX 11/12 ImGui overlay pipelines targeting Grand Theft Auto and open-world simulation engines.",
      tags: ["C++20", "Assembly x64", "DirectX 11/12", "Pattern Scanning"],
      accentColor: "from-purple-500/20 to-blue-500/20",
      href: "/labs",
    },
    {
      id: "02",
      icon: Bot,
      category: "Cloud Platforms & Distributed Services",
      title: "VePlexity Commercial Discord Bot V2",
      description: "Enterprise multi-server Discord bot architecture running 24/7 on dedicated Render cloud nodes. Built with 101 modular slash commands, lossless audio DSP, Gemini AI integration, and MongoDB Atlas persistence.",
      tags: ["Node.js 20", "Discord.js v14", "MongoDB Atlas", "Render Daemon"],
      accentColor: "from-blue-500/20 to-indigo-500/20",
      href: "/bot",
    },
    {
      id: "03",
      icon: Radio,
      category: "Hardware Video & Studio Broadcasting",
      title: "Hardware Camera Matrix & OBS Automation",
      description: "Multi-angle 1080p60 hardware HDMI matrix synchronized with an automated Python/OBS-WebSocket daemon that dynamically switches camera scenes based on audio thresholds and application telemetry.",
      tags: ["Hardware Matrix", "OBS-WebSocket", "Python Daemon", "1080p60"],
      accentColor: "from-indigo-500/20 to-pink-500/20",
      href: "/labs",
    },
    {
      id: "04",
      icon: Sliders,
      category: "Digital Signal Processing & Studio Acoustics",
      title: "Audio Mastering & Harmonic Processing",
      description: "Audio processing algorithms delivering broadcast-ready sound. Features multi-band dynamic compression, vintage harmonic modeling, and ITU-R BS.1770-4 -14 LUFS loudness mastering compliance.",
      tags: ["48kHz DSP", "-14 LUFS", "Dynamic Limiter", "Acoustics"],
      accentColor: "from-pink-500/20 to-purple-500/20",
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
    <div className="min-h-screen flex flex-col bg-[#05070a] text-[#e5e7eb] relative selection:bg-purple-500/30">
      <Navbar />

      <main className="flex-1 w-full relative z-10">
        
        {/* HERO SECTION */}
        <section className="relative w-full pt-20 pb-24 md:pt-32 md:pb-36 px-5 sm:px-8 lg:px-12 overflow-hidden border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto">
            
            <MotionReveal delay={0.05} yOffset={20}>
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full neo-card mb-8 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span className="text-xs font-medium text-zinc-300">
                  VePlexity Network <span className="text-zinc-500">•</span> System Operational
                </span>
              </div>
            </MotionReveal>

            {/* Headline with refined subtle brand gradient */}
            <div className="max-w-4xl space-y-6">
              <MotionReveal delay={0.15} yOffset={25}>
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05]">
                  Systems. Media. <br />
                  <span className="veer-gradient-text drop-shadow-[0_2px_15px_rgba(124,58,237,0.18)]">
                    Engineering.
                  </span>
                </h1>
              </MotionReveal>

              <MotionReveal delay={0.25} yOffset={25}>
                <p className="text-base sm:text-xl text-zinc-400 font-normal leading-relaxed max-w-2xl">
                  The software portfolio and engineering infrastructure of <strong className="text-white font-semibold">Veer Madan</strong>. Spanning enterprise 24/7 cloud Discord bots, low-level C++ game runtime hooks, and automated studio broadcasts.
                </p>
              </MotionReveal>

              {/* Action Buttons with Neo-Glass depth */}
              <MotionReveal delay={0.35} yOffset={25}>
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link
                    href="/bot"
                    className="px-7 py-3.5 neo-btn-primary text-sm flex items-center gap-2"
                  >
                    <span>Explore Bot V2</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/news-wire"
                    className="px-7 py-3.5 neo-btn-glass text-sm flex items-center gap-2"
                  >
                    <span>Technical Newswire</span>
                  </Link>

                  <a
                    href="https://www.youtube.com/watch?v=dZvvx4SIkbM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 text-zinc-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2"
                  >
                    <Play className="w-4 h-4 text-purple-400" />
                    <span>Watch Stream</span>
                  </a>
                </div>
              </MotionReveal>
            </div>

          </div>
        </section>

        {/* METRICS & TELEMETRY STRIP */}
        <section className="border-b border-white/[0.06] bg-[#070b12]/50">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10">
            <MotionStaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
              
              <MotionStaggerItem>
                <div className="p-6 rounded-2xl neo-card">
                  <div className="text-xs font-semibold text-purple-400/90 uppercase tracking-wider">Bot Handlers</div>
                  <div className="text-3xl font-black text-white mt-1">101 Slash</div>
                  <div className="text-xs text-zinc-400 mt-1">Node.js 20 & Discord.js v14</div>
                </div>
              </MotionStaggerItem>

              <MotionStaggerItem>
                <div className="p-6 rounded-2xl neo-card">
                  <div className="text-xs font-semibold text-blue-400/90 uppercase tracking-wider">Cloud Database</div>
                  <div className="text-3xl font-black text-white mt-1">Atlas M0</div>
                  <div className="text-xs text-zinc-400 mt-1">Sub-15ms replica sync</div>
                </div>
              </MotionStaggerItem>

              <MotionStaggerItem>
                <div className="p-6 rounded-2xl neo-card">
                  <div className="text-xs font-semibold text-pink-400/90 uppercase tracking-wider">Studio Broadcast</div>
                  <div className="text-3xl font-black text-white mt-1">1080p60</div>
                  <div className="text-xs text-zinc-400 mt-1">Automated OBS-WebSocket</div>
                </div>
              </MotionStaggerItem>

              <MotionStaggerItem>
                <div className="p-6 rounded-2xl neo-card">
                  <div className="text-xs font-semibold text-indigo-400/90 uppercase tracking-wider">Runtime Hooks</div>
                  <div className="text-3xl font-black text-white mt-1">C++20 x64</div>
                  <div className="text-xs text-zinc-400 mt-1">DirectX overlay pipelines</div>
                </div>
              </MotionStaggerItem>

            </MotionStaggerContainer>
          </div>
        </section>

        {/* ENGINEERING DISCIPLINES // BENTO GRID */}
        <section className="py-24 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto">
          <MotionReveal yOffset={30}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14 pb-6 border-b border-white/[0.06]">
              <div>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
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
          </MotionReveal>

          <MotionStaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((item) => {
              const IconComponent = item.icon;
              return (
                <MotionStaggerItem key={item.id}>
                  <div className="p-8 md:p-10 rounded-2xl neo-glass flex flex-col justify-between group h-full">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white group-hover:scale-105 transition-transform shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                          <IconComponent className="w-6 h-6 text-zinc-200" />
                        </div>
                        <span className="text-xs font-mono text-zinc-500 font-bold">
                          {item.id}
                        </span>
                      </div>

                      <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider block mb-2">
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
                      <div className="flex flex-wrap gap-2 pt-6 border-t border-white/[0.06]">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium rounded-lg bg-white/[0.03] border border-white/[0.08] text-zinc-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </MotionStaggerItem>
              );
            })}
          </MotionStaggerContainer>
        </section>

        {/* TECHNICAL NEWSWIRE */}
        <section className="py-24 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/[0.06]">
          <MotionReveal yOffset={30}>
            <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/[0.06]">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
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
                <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
              </Link>
            </div>
          </MotionReveal>

          <MotionStaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newswireArticles.map((item, idx) => (
              <MotionStaggerItem key={idx}>
                <div className="p-7 rounded-2xl neo-glass flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4 text-xs">
                      <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/[0.04] border border-white/10 text-purple-300">
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

                  <div className="pt-4 border-t border-white/[0.06]">
                    {item.isExternal ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
                      >
                        <span>Watch Archive</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-purple-400" />
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
                      >
                        <span>Read Dispatch</span>
                        <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
                      </Link>
                    )}
                  </div>
                </div>
              </MotionStaggerItem>
            ))}
          </MotionStaggerContainer>
        </section>

        {/* STUDIO BROADCAST & HARDWARE DEMO */}
        <section className="py-24 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/[0.06]">
          <MotionReveal yOffset={30}>
            <div className="p-8 md:p-12 rounded-3xl neo-glass">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-semibold text-zinc-300">
                    <Play className="w-3 h-3 fill-purple-400 text-purple-400" />
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
                      className="px-5 py-2.5 neo-btn-primary text-xs flex items-center gap-2"
                    >
                      <span>Watch on YouTube</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <Link
                      href="/labs"
                      className="px-5 py-2.5 neo-btn-glass text-xs"
                    >
                      <span>Rig Specs</span>
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-black shadow-[0_15px_40px_rgba(0,0,0,0.7)]">
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
          </MotionReveal>
        </section>

      </main>

      <Footer />
    </div>
  );
}