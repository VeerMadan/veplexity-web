import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { 
  Bot, Music, Shield, Sparkles, Sliders, Database, Gamepad2, 
  ArrowRight, ExternalLink, Coffee, Check, Terminal 
} from "lucide-react";

export const metadata = {
  title: "VePlexity Bot V2 — Commercial Discord Infrastructure",
  description: "24/7 cloud Discord bot with 101 commands, lossless audio, Gemini AI assistant, and live web management dashboard.",
};

export default function BotPage() {
  const features = [
    {
      icon: Music,
      title: "Lossless Audio Engine",
      badge: "High-Fidelity",
      description: "Low-latency streaming architecture with queue looping, bass boost filters, volume calibration, and 24/7 voice stay in dedicated channels.",
    },
    {
      icon: Sparkles,
      title: "Google Gemini AI Assistant",
      badge: "Context Aware",
      description: "Direct conversational AI module powered by Gemini. Supports custom system prompts, contextual conversational memory, and vision input reasoning.",
    },
    {
      icon: Shield,
      title: "Enterprise Moderation",
      badge: "Full Audit",
      description: "Rule enforcement system with automated warning escalation, timed suspensions, channel lockdowns, and case-indexed audit logs.",
    },
    {
      icon: Sliders,
      title: "Real-Time Cloud Dashboard",
      badge: "Next.js 16",
      description: "Configure prefixes, notification channels, reaction roles, and automated welcome dispatches in real-time from veplexity.dev/dashboard.",
    },
    {
      icon: Gamepad2,
      title: "Multiplayer Discord Games",
      badge: "Interactive UI",
      description: "Native Discord component mini-games including TicTacToe, Connect4, Rock-Paper-Scissors duels, and Trivia competitions directly in text channels.",
    },
    {
      icon: Database,
      title: "MongoDB Atlas Persistence",
      badge: "Sub-15ms",
      description: "Enterprise cloud cluster storing user XP, server configurations, moderation records, and reaction role mappings with zero data loss.",
    },
  ];

  const commandCategories = [
    {
      category: "Music & Voice",
      commands: ["/play", "/skip", "/queue", "/volume", "/247", "/pause", "/resume", "/stop", "/lyrics"],
    },
    {
      category: "AI & Intelligence",
      commands: ["/gemini ask", "/gemini reset", "/gemini persona", "/gemini vision", "/imagine"],
    },
    {
      category: "Moderation & Security",
      commands: ["/ban", "/kick", "/timeout", "/warn", "/warnings", "/clearwarns", "/lock", "/unlock", "/purge"],
    },
    {
      category: "Management & Config",
      commands: ["/setup", "/setwelcome", "/reactionrole", "/announce", "/botinfo", "/serverinfo", "/stats", "/ping"],
    },
    {
      category: "Interactive & Games",
      commands: ["/tictactoe", "/connect4", "/rps", "/trivia", "/truth-or-dare", "/8ball", "/avatar"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-[#fafafa]">
      <Navbar />

      <main className="flex-1 max-w-6xl w-auto mx-auto px-4 sm:px-6 py-12 sm:py-20">
        
        {/* Hero Header */}
        <div className="border-b border-zinc-800 pb-12 mb-16">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 font-mono text-xs text-zinc-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>RENDER NODE // PRODUCTION READY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white max-w-3xl leading-[1.1]">
            VePlexity Commercial Discord Bot V2.
          </h1>

          <p className="text-lg text-zinc-400 mt-4 max-w-2xl leading-relaxed">
            A production-tier Discord infrastructure suite delivering lossless audio streaming, context-aware Gemini AI, full server moderation, and a live web management dashboard.
          </p>

          <div className="pt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/invite"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-white text-black font-medium text-sm hover:bg-zinc-200 transition-colors"
            >
              <Bot className="w-4 h-4" />
              <span>Add to Your Server</span>
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-zinc-900 text-zinc-200 border border-zinc-800 hover:border-zinc-700 font-medium text-sm transition-colors"
            >
              <Sliders className="w-4 h-4 text-zinc-400" />
              <span>Launch Dashboard</span>
            </Link>

            <a
              href="https://www.buymeacoffee.com/veplexity1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/15 font-medium text-sm transition-colors"
            >
              <Coffee className="w-4 h-4" />
              <span>Support Development</span>
            </a>
          </div>
        </div>

        {/* Live Architecture Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-lg bg-[#0d0d11] border border-zinc-800 mb-16 font-mono text-xs">
          <div>
            <div className="text-zinc-500 uppercase">Commands Active</div>
            <div className="text-xl font-bold text-white mt-1">101 Production</div>
            <div className="text-emerald-400 text-[11px] mt-0.5">Slash Handlers Ready</div>
          </div>
          <div>
            <div className="text-zinc-500 uppercase">Cloud Host</div>
            <div className="text-xl font-bold text-white mt-1">Render Node</div>
            <div className="text-zinc-400 text-[11px] mt-0.5">24/7 Dedicated Daemon</div>
          </div>
          <div>
            <div className="text-zinc-500 uppercase">Persistence</div>
            <div className="text-xl font-bold text-white mt-1">MongoDB Atlas</div>
            <div className="text-zinc-400 text-[11px] mt-0.5">Replica Set Cluster</div>
          </div>
          <div>
            <div className="text-zinc-500 uppercase">API Gateway</div>
            <div className="text-xl font-bold text-white mt-1">Discord v10</div>
            <div className="text-zinc-400 text-[11px] mt-0.5">WebSocket Gateway</div>
          </div>
        </div>

        {/* Core Architecture Capabilities */}
        <div className="mb-20">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">Core Architecture</h2>
            <p className="text-sm text-zinc-400 mt-1">Designed for speed, modularity, and zero-downtime server operations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-lg bg-[#0d0d11] border border-zinc-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-[10px] uppercase text-zinc-500 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                        {feat.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-white mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Command Directory Preview */}
        <div className="p-8 rounded-lg bg-[#0d0d11] border border-zinc-800 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-800">
            <div>
              <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider">COMMAND INDEX</div>
              <h2 className="text-xl font-bold text-white mt-1">101 Slash Commands Catalog</h2>
            </div>
            <div className="text-xs text-zinc-400 font-mono">
              Type /help in Discord for full interactive documentation
            </div>
          </div>

          <div className="space-y-6">
            {commandCategories.map((cat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-xs font-mono font-semibold text-zinc-300 uppercase">
                  {cat.category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.commands.map((cmd) => (
                    <span
                      key={cmd}
                      className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors cursor-default"
                    >
                      {cmd}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-8 rounded-lg bg-zinc-900/60 border border-zinc-800 gap-6">
          <div>
            <h3 className="text-xl font-bold text-white">Deploy to your Discord server</h3>
            <p className="text-xs text-zinc-400 mt-1">One-click authorization. No complex server setup required.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/invite"
              className="px-5 py-2.5 rounded-md bg-white text-black font-medium text-xs hover:bg-zinc-200 transition-colors"
            >
              Authorize Bot
            </Link>
            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-md bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-zinc-700 font-medium text-xs transition-colors"
            >
              Server Dashboard
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
