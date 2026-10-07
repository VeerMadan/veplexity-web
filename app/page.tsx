import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { 
  Bot, Radio, Terminal, Coffee, ArrowRight, ArrowUpRight, 
  Play, ExternalLink, Sparkles 
} from "lucide-react";

export default function Home() {
  const modules = [
    {
      id: "01",
      title: "Commercial Bot V2",
      description: "Production multi-server Discord bot running 24/7 on Render cloud nodes. 101 slash commands, lossless audio, Gemini AI reasoning, and live cloud dashboard.",
      href: "/bot",
      tag: "CORE INFRASTRUCTURE",
      accent: "text-orange-400 bg-orange-500/10 border-orange-500/30",
      icon: Bot,
      stats: "101 Commands • Render 24/7 Node",
    },
    {
      id: "02",
      title: "The News Wire",
      description: "Live chronologically verified dispatch room documenting production releases, studio broadcasts, and network changelogs.",
      href: "/news-wire",
      tag: "PRESS & DISPATCHES",
      accent: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/30",
      icon: Radio,
      stats: "Verified Dispatches • Changelogs",
    },
    {
      id: "03",
      title: "Software & Media Labs",
      description: "VePlexity Cam hardware studio capture rig, low-level C++ game runtime memory injection, and analog audio DSP mastering.",
      href: "/labs",
      tag: "R&D DIVISION",
      accent: "text-pink-400 bg-pink-500/10 border-pink-500/30",
      icon: Terminal,
      stats: "3 Active Engineering Projects",
    },
    {
      id: "04",
      title: "Support & Patronage",
      description: "Direct community patronage via Buy Me a Coffee. Helps cover dedicated Render cloud nodes, Atlas MongoDB clusters, and hardware lab research.",
      href: "/support",
      tag: "COMMUNITY HUB",
      accent: "text-amber-400 bg-amber-500/10 border-amber-500/30",
      icon: Coffee,
      stats: "VIP Discord Roles • Early Builds",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#08040d] text-[#fafafa]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-16 sm:py-24">
        
        {/* Brand Hero Header */}
        <div className="space-y-6 max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>VEPLEXITY NETWORK // ACTIVE DEPLOYMENT</span>
          </div>

          <h1 className="text-4xl sm:text-7xl font-black tracking-tight text-white leading-[1.05]">
            Engineering media, labs &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-fuchsia-500">
              digital infrastructure.
            </span>
          </h1>

          <p className="text-lg text-zinc-300 leading-relaxed max-w-3xl">
            The central brand network founded by Veer Madan. Home to the commercial VePlexity Discord Bot, hardware broadcasting rigs, and high-performance software engineering laboratories.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/bot"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 via-pink-500 to-fuchsia-600 hover:from-orange-400 hover:to-fuchsia-500 text-white font-bold text-sm transition-all shadow-lg shadow-fuchsia-600/25"
            >
              <Bot className="w-4 h-4" />
              <span>Explore Commercial Bot</span>
            </Link>

            <Link
              href="/news-wire"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#12081d] text-zinc-200 border border-fuchsia-500/30 hover:border-fuchsia-500/60 font-semibold text-sm transition-colors"
            >
              <Radio className="w-4 h-4 text-fuchsia-400" />
              <span>Read News Wire</span>
            </Link>

            <Link
              href="/support"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 font-semibold text-sm transition-colors"
            >
              <Coffee className="w-4 h-4 text-amber-400" />
              <span>Support on BMC</span>
            </Link>
          </div>
        </div>

        {/* Brand Telemetry Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-fuchsia-500/15 mb-20">
          <div>
            <div className="text-xs font-mono uppercase text-orange-400/80 mb-1">Commercial Bot</div>
            <div className="text-2xl font-black text-white">101 Commands</div>
            <div className="text-[11px] text-emerald-400 font-mono">Render Node 24/7</div>
          </div>
          <div>
            <div className="text-xs font-mono uppercase text-fuchsia-400/80 mb-1">Database Cluster</div>
            <div className="text-2xl font-black text-white">Atlas MongoDB</div>
            <div className="text-[11px] text-zinc-400 font-mono">Sub-15ms Sync</div>
          </div>
          <div>
            <div className="text-xs font-mono uppercase text-pink-400/80 mb-1">Web Platform</div>
            <div className="text-2xl font-black text-white">Next.js 16</div>
            <div className="text-[11px] text-zinc-400 font-mono">veplexity.dev on Vercel</div>
          </div>
          <div>
            <div className="text-xs font-mono uppercase text-amber-400/80 mb-1">Support Hub</div>
            <div className="text-2xl font-black text-white">Buy Me a Coffee</div>
            <div className="text-[11px] text-amber-400 font-mono">Official Creator</div>
          </div>
        </div>

        {/* Network Modules Index */}
        <div className="mb-20">
          <div className="mb-8">
            <div className="font-mono text-xs text-orange-400 uppercase tracking-widest mb-1">
              DIVISIONS // DIRECTORY
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Network Modules
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((m) => {
              const Icon = m.icon;
              return (
                <Link
                  key={m.id}
                  href={m.href}
                  className="group block p-6 rounded-xl bg-[#0e0717] border border-white/10 hover:border-fuchsia-500/40 transition-all hover:bg-[#130a20]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#180d28] border border-fuchsia-500/20 flex items-center justify-center text-zinc-300 group-hover:text-fuchsia-300 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`font-mono text-xs uppercase tracking-wider px-2 py-0.5 rounded border ${m.accent}`}>
                        [{m.id}] {m.tag}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-fuchsia-400 group-hover:translate-x-1 transition-all" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-fuchsia-200 transition-colors">
                    {m.title}
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                    {m.description}
                  </p>

                  <div className="pt-3 border-t border-white/5 font-mono text-[11px] text-zinc-500 group-hover:text-zinc-400 transition-colors">
                    {m.stats}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Featured Broadcast / Studio Rig */}
        <div className="p-8 rounded-xl bg-[#0e0717] border border-fuchsia-500/20 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 font-mono text-xs text-red-400">
                <Play className="w-3 h-3 text-red-400" />
                <span>STUDIO BROADCAST</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                VePlexity Studio: The Official Comeback Stream
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Watch the complete comeback stream featuring the updated hardware camera capture pipeline, real-time OBS automation, and live community discussion.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <a
                  href="https://www.youtube.com/watch?v=dZvvx4SIkbM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-colors"
                >
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <Link
                  href="/labs"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#140a20] hover:bg-[#1a0e2a] text-zinc-300 font-semibold text-xs border border-fuchsia-500/20 transition-colors"
                >
                  <span>Studio Specs</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-fuchsia-500/30 bg-black shadow-xl">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/dZvvx4SIkbM"
                  title="VePlexity Comeback Stream"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Dispatch Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-xl bg-gradient-to-r from-[#12081d] via-[#10071a] to-[#150a22] border border-fuchsia-500/30 gap-4">
          <div>
            <div className="text-xs font-mono text-orange-400 uppercase tracking-wider mb-1">
              [LATEST DISPATCH] OCTOBER 2026
            </div>
            <div className="text-base font-bold text-white">
              VePlexity Commercial Discord Bot V2 Enters Production
            </div>
            <div className="text-xs text-zinc-400 mt-0.5">
              Live on Render nodes with 101 slash commands, lossless audio, and cloud dashboard.
            </div>
          </div>
          <Link
            href="/news-wire"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-fuchsia-600 hover:from-orange-400 hover:to-fuchsia-500 text-white font-bold text-xs transition-all whitespace-nowrap shadow-md shadow-fuchsia-600/20"
          >
            <span>Read All Dispatches</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}