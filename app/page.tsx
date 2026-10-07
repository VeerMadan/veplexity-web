import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { 
  Bot, Radio, Terminal, ArrowRight, Play, ExternalLink, 
  Cpu, Music, Shield, Sliders, Heart, Layers, Eye 
} from "lucide-react";

export default function Home() {
  const capabilities = [
    {
      id: "01",
      category: "LOW-LEVEL SYSTEMS & REVERSE ENGINEERING",
      title: "C++ Game Engine Injection & Memory Hooking",
      description: "Direct runtime memory manipulation, dynamic pattern scanning, x64 assembly detours, and custom DirectX 11/12 ImGui overlay pipelines targeting Grand Theft Auto and open-world simulation engines.",
      tags: ["C++20", "Assembly x64", "DirectX", "Memory Hooking", "Pattern Scanning"],
      href: "/labs",
    },
    {
      id: "02",
      category: "CLOUD PLATFORMS & DISTRIBUTED INFRASTRUCTURE",
      title: "VePlexity Commercial Discord Bot V2",
      description: "Enterprise multi-server Discord bot architecture running 24/7 on dedicated Render cloud nodes. Built with 101 modular slash commands, lossless audio DSP, Gemini AI, and MongoDB Atlas persistence.",
      tags: ["Node.js", "Discord.js v14", "MongoDB Atlas", "Render Daemon", "NextAuth v5"],
      href: "/bot",
    },
    {
      id: "03",
      category: "HARDWARE VIDEO & STUDIO BROADCASTING",
      title: "VePlexity Cam Rig & OBS Automation",
      description: "Custom multi-angle 1080p60 hardware HDMI matrix synchronized with an automated Python/OBS-WebSocket daemon that dynamically cuts camera scenes based on audio levels and game telemetry.",
      tags: ["Hardware Matrix", "OBS-WebSocket", "Python Daemon", "1080p60 Stream"],
      href: "/labs",
    },
    {
      id: "04",
      category: "DIGITAL SIGNAL PROCESSING & STUDIO ACOUSTICS",
      title: "Audio Mastering & Harmonic Saturation",
      description: "Custom audio processing algorithms delivering broadcast-ready sound. Features multi-band dynamic compression, vintage tube saturation modeling, and ITU-R BS.1770-4 -14 LUFS loudness mastering compliance.",
      tags: ["48kHz DSP", "-14 LUFS", "Dynamic Limiter", "Analog Saturation"],
      href: "/labs",
    },
  ];

  const newswireHighlights = [
    {
      tag: "FLAGSHIP RELEASE",
      tagColor: "text-pink-400 border-pink-500/30 bg-pink-500/10",
      date: "OCTOBER 7, 2026",
      title: "VePlexity Commercial Bot V2 Enters Production Across 101 Commands",
      excerpt: "Full rollout on Render cloud nodes with lossless music audio, context-aware Gemini AI, web dashboard integration, and MongoDB Atlas sync.",
      href: "/bot",
    },
    {
      tag: "STUDIO BROADCAST",
      tagColor: "text-zinc-300 border-white/20 bg-white/5",
      date: "OCTOBER 6, 2026",
      title: "VePlexity Studio: Comeback Broadcast & Hardware Camera Matrix Tested",
      excerpt: "Multi-angle camera switching rig and automated OBS macros demonstrated live on YouTube during the official network comeback stream.",
      href: "https://www.youtube.com/watch?v=dZvvx4SIkbM",
      isExternal: true,
    },
    {
      tag: "R&D DIVISION",
      tagColor: "text-pink-400 border-pink-500/30 bg-pink-500/10",
      date: "FALL 2026",
      title: "DirectX Overlay Injection & Memory Pointer Research Milestone",
      excerpt: "Phase 1 completion of lightweight DLL hooking without external frameworks, enabling zero-frame-drop telemetry HUDs in open-world sandbox games.",
      href: "/labs",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />

      <main className="flex-1 w-full">
        
        {/* ROCKSTAR BILLBOARD HERO */}
        <section className="relative w-full border-b border-white/10 bg-black pt-16 pb-24 px-4 sm:px-6 lg:px-12 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-400">
                VEPLEXITY STUDIOS // PRODUCTION NETWORK
              </span>
            </div>

            <div className="max-w-5xl space-y-6">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-[0.95]">
                CODE. BROADCASTS. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-pink-500">
                  REVERSE ENGINEERING.
                </span>
              </h1>

              <p className="text-base sm:text-xl text-zinc-400 font-medium leading-relaxed max-w-3xl">
                The independent digital laboratory and software engineering showcase of Veer Madan. From low-level C++ game runtime hooks and hardware studio rigs to scalable 24/7 cloud Discord infrastructure.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/bot"
                  className="px-8 py-4 bg-white text-black font-black uppercase tracking-wider text-xs hover:bg-zinc-200 transition-all rounded"
                >
                  EXPLORE BOT V2
                </Link>

                <Link
                  href="/news-wire"
                  className="px-8 py-4 bg-zinc-900 text-white border border-white/20 font-black uppercase tracking-wider text-xs hover:border-pink-500 hover:text-pink-400 transition-all rounded"
                >
                  READ NEWSWIRE
                </Link>

                <a
                  href="https://www.youtube.com/watch?v=dZvvx4SIkbM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 bg-black text-zinc-300 border border-white/10 hover:border-white/30 font-black uppercase tracking-wider text-xs flex items-center gap-2 transition-all rounded"
                >
                  <Play className="w-3.5 h-3.5 text-pink-500" />
                  <span>WATCH COMEBACK</span>
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* METRICS STRIP (ROCKSTAR STYLE) */}
        <section className="border-b border-white/10 bg-[#080808]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 font-mono">
            <div>
              <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">COMMAND MATRIX</div>
              <div className="text-3xl font-black text-white mt-1">101 PROD</div>
              <div className="text-xs text-pink-400 font-bold mt-0.5">Slash Handlers Ready</div>
            </div>
            <div>
              <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">SYSTEM PERSISTENCE</div>
              <div className="text-3xl font-black text-white mt-1">ATLAS DB</div>
              <div className="text-xs text-zinc-400 mt-0.5">Sub-15ms Cloud Sync</div>
            </div>
            <div>
              <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">STUDIO BROADCAST</div>
              <div className="text-3xl font-black text-white mt-1">1080P60</div>
              <div className="text-xs text-zinc-400 mt-0.5">Hardware HDMI Matrix</div>
            </div>
            <div>
              <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">CORE ENGINE HOOKS</div>
              <div className="text-3xl font-black text-white mt-1">C++20 x64</div>
              <div className="text-xs text-zinc-400 mt-0.5">DirectX Memory Overlays</div>
            </div>
          </div>
        </section>

        {/* WHAT I AM CAPABLE OF // CAPABILITIES GRID */}
        <section className="py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-6 border-b border-white/10">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-pink-400">
                TECHNICAL DISCIPLINES
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-1">
                ENGINEERING CAPABILITIES
              </h2>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm">
              Cross-disciplinary software engineering spanning low-level reverse engineering, cloud infrastructure, and hardware broadcasts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((item) => (
              <div
                key={item.id}
                className="p-8 rounded-lg bg-[#0c0c0c] border border-white/10 hover:border-pink-500/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-black text-pink-400 uppercase tracking-wider">
                      [{item.id}] {item.category}
                    </span>
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>

                  <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3 group-hover:text-pink-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5 font-mono text-[11px]">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded bg-black border border-white/10 text-zinc-300 uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ROCKSTAR NEWSWIRE GRID */}
        <section className="py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/10">
          <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/10">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-400">
                OFFICIAL PRESS & DISPATCHES
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-1">
                THE NEWSWIRE
              </h2>
            </div>
            <Link
              href="/news-wire"
              className="text-xs font-black uppercase tracking-wider text-pink-400 hover:text-pink-300 flex items-center gap-1.5 transition-colors"
            >
              <span>VIEW ALL</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newswireHighlights.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-[#0c0c0c] border border-white/10 hover:border-pink-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 font-mono text-xs">
                    <span className={`px-2.5 py-0.5 rounded uppercase font-bold border ${item.tagColor}`}>
                      {item.tag}
                    </span>
                    <span className="text-zinc-500">{item.date}</span>
                  </div>

                  <h3 className="text-lg font-black uppercase tracking-tight text-white mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                    {item.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  {item.isExternal ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-zinc-300 hover:text-white transition-colors"
                    >
                      <span>WATCH ARCHIVE</span>
                      <ExternalLink className="w-3 h-3 text-pink-400" />
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-zinc-300 hover:text-white transition-colors"
                    >
                      <span>READ DISPATCH</span>
                      <ArrowRight className="w-3 h-3 text-pink-400" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CINEMATIC BROADCAST / COMEBACK STREAM BILLBOARD */}
        <section className="py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/10">
          <div className="p-8 sm:p-12 rounded-xl bg-[#0c0c0c] border border-white/15">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-600/10 border border-red-500/30 font-mono text-xs font-bold text-red-400 uppercase">
                  <Play className="w-3 h-3 fill-red-400" />
                  <span>COMEBACK BROADCAST ARCHIVE</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                  VePlexity Studio Broadcast
                </h3>

                <p className="text-sm text-zinc-400 leading-relaxed">
                  Full multi-angle broadcast recording demonstrating low-latency HDMI switching, dynamic voice triggers, and community live interaction.
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <a
                    href="https://www.youtube.com/watch?v=dZvvx4SIkbM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-wider text-xs rounded transition-colors flex items-center gap-2"
                  >
                    <span>WATCH ON YOUTUBE</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <Link
                    href="/labs"
                    className="px-6 py-3 bg-black hover:bg-zinc-900 text-zinc-300 border border-white/15 font-black uppercase tracking-wider text-xs rounded transition-colors"
                  >
                    <span>RIG SPECS</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-white/20 bg-black shadow-2xl">
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