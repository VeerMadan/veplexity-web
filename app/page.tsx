import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { 
  Bot, Radio, Terminal, Coffee, ArrowRight, ArrowUpRight, 
  Play, Shield, Cpu, ExternalLink, Sparkles 
} from "lucide-react";

export default function Home() {
  const modules = [
    {
      id: "01",
      title: "Commercial Bot V2",
      description: "Production Discord bot running 24/7 on dedicated cloud nodes. 101 slash commands, lossless audio engine, Gemini AI assistant, and live web dashboard.",
      href: "/bot",
      tag: "INFRASTRUCTURE",
      icon: Bot,
      stats: "101 Commands • Render 24/7",
    },
    {
      id: "02",
      title: "The News Wire",
      description: "Real-time dispatch room documenting releases, architectural changes, YouTube streams, and community announcements.",
      href: "/news-wire",
      tag: "DISPATCH LOG",
      icon: Radio,
      stats: "Live Updates • Changelogs",
    },
    {
      id: "03",
      title: "Software & Media Labs",
      description: "VePlexity Cam studio rig, low-level C++ game runtime memory injection, and analog-modeled audio mastering chains.",
      href: "/labs",
      tag: "R&D LABS",
      icon: Terminal,
      stats: "3 Active Projects",
    },
    {
      id: "04",
      title: "Support & Patronage",
      description: "Direct community backing via Buy Me a Coffee. Helps cover dedicated cloud servers, MongoDB clusters, and hardware lab research.",
      href: "/support",
      tag: "BACKER HUB",
      icon: Coffee,
      stats: "VIP Discord Roles • Early Builds",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-[#fafafa]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-16 sm:py-24">
        
        {/* Editorial Hero Header */}
        <div className="space-y-6 max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>VEPLEXITY NETWORK // ACTIVE DEPLOYMENT</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            Media, software labs & scalable digital infrastructure.
          </h1>

          <p className="text-lg text-zinc-400 leading-relaxed">
            The central brand network founded by Veer Madan. Home to the production VePlexity Discord Bot, hardware studio broadcasting, and low-level software engineering experiments.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/bot"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-white text-black font-medium text-sm hover:bg-zinc-200 transition-colors"
            >
              <Bot className="w-4 h-4" />
              <span>Explore Commercial Bot</span>
            </Link>

            <Link
              href="/news-wire"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-zinc-900 text-zinc-200 border border-zinc-800 hover:border-zinc-700 font-medium text-sm transition-colors"
            >
              <Radio className="w-4 h-4 text-zinc-400" />
              <span>Read News Wire</span>
            </Link>

            <Link
              href="/support"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/15 font-medium text-sm transition-colors"
            >
              <Coffee className="w-4 h-4" />
              <span>Support on BMC</span>
            </Link>
          </div>
        </div>

        {/* Telemetry Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-zinc-800/80 mb-20">
          <div>
            <div className="text-xs font-mono uppercase text-zinc-500 mb-1">Commercial Bot</div>
            <div className="text-xl font-bold text-white">101 Commands</div>
            <div className="text-[11px] text-emerald-400 font-mono">Render Node 24/7</div>
          </div>
          <div>
            <div className="text-xs font-mono uppercase text-zinc-500 mb-1">Database Cluster</div>
            <div className="text-xl font-bold text-white">Atlas MongoDB</div>
            <div className="text-[11px] text-zinc-400 font-mono">Sub-15ms Sync</div>
          </div>
          <div>
            <div className="text-xs font-mono uppercase text-zinc-500 mb-1">Web Platform</div>
            <div className="text-xl font-bold text-white">Next.js 16</div>
            <div className="text-[11px] text-zinc-400 font-mono">veplexity.dev on Vercel</div>
          </div>
          <div>
            <div className="text-xs font-mono uppercase text-zinc-500 mb-1">Community & Support</div>
            <div className="text-xl font-bold text-white">Buy Me a Coffee</div>
            <div className="text-[11px] text-amber-400 font-mono">Verified Creator</div>
          </div>
        </div>

        {/* Network Modules Index */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Network Modules</h2>
              <p className="text-sm text-zinc-400 mt-1">Dedicated divisions across bot engineering, press dispatches, and laboratories.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((m) => {
              const Icon = m.icon;
              return (
                <Link
                  key={m.id}
                  href={m.href}
                  className="group block p-6 rounded-lg bg-[#0d0d11] border border-zinc-800 hover:border-zinc-600 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
                        [{m.id}] {m.tag}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-zinc-200 transition-colors">
                    {m.title}
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                    {m.description}
                  </p>

                  <div className="pt-3 border-t border-zinc-800/80 font-mono text-[11px] text-zinc-500">
                    {m.stats}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Featured Broadcast / YouTube Showcase */}
        <div className="p-8 rounded-lg bg-[#0d0d11] border border-zinc-800 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 font-mono text-xs text-zinc-400">
                <Play className="w-3 h-3 text-red-400" />
                <span>STUDIO BROADCAST</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                VePlexity Studio: The Official Comeback Stream
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Full high-production stream archive showcasing the updated hardware capture pipeline, live community interaction, and technical previews.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <a
                  href="https://www.youtube.com/watch?v=dZvvx4SIkbM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 text-white font-medium text-xs transition-colors"
                >
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <Link
                  href="/labs"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-medium text-xs border border-zinc-800 transition-colors"
                >
                  <span>Inspect Studio Specs</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative aspect-video w-full rounded-md overflow-hidden border border-zinc-800 bg-black">
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

        {/* Quick Dispatch Feed Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-lg bg-zinc-900/60 border border-zinc-800 gap-4">
          <div>
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">
              [LATEST DISPATCH] OCTOBER 2026
            </div>
            <div className="text-base font-semibold text-white">
              VePlexity Commercial Discord Bot V2 Enters Production
            </div>
            <div className="text-xs text-zinc-400 mt-0.5">
              Overhaul deployed on Render with 101 slash commands, lossless audio, and dashboard management.
            </div>
          </div>
          <Link
            href="/news-wire"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-white text-black font-medium text-xs hover:bg-zinc-200 transition-colors whitespace-nowrap"
          >
            <span>All Dispatches</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}