import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { 
  Bot, Music, Shield, Sparkles, Sliders, Database, Gamepad2, 
  ExternalLink, Coffee 
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
      accent: "text-pink-400 bg-pink-500/10 border-pink-500/20",
      description: "Low-latency streaming architecture with queue looping, bass boost filters, volume calibration, and 24/7 voice stay in dedicated channels.",
    },
    {
      icon: Sparkles,
      title: "Google Gemini AI Assistant",
      badge: "Context Aware",
      accent: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      description: "Direct conversational AI module powered by Gemini. Supports custom system personas, conversational memory, and image prompt generation.",
    },
    {
      icon: Shield,
      title: "Enterprise Moderation",
      badge: "Full Audit",
      accent: "text-orange-400 bg-orange-500/10 border-orange-500/20",
      description: "Rule enforcement system with automated warning escalation, timed suspensions, channel lockdowns, and case-indexed audit logs.",
    },
    {
      icon: Sliders,
      title: "Real-Time Cloud Dashboard",
      badge: "Next.js 16",
      accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      description: "Configure prefixes, notification channels, reaction roles, and automated welcome dispatches in real-time from veplexity.dev/dashboard.",
    },
    {
      icon: Gamepad2,
      title: "Multiplayer Discord Games",
      badge: "Interactive UI",
      accent: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      description: "Native Discord component mini-games including TicTacToe, Connect4, Rock-Paper-Scissors duels, and Trivia competitions directly in text channels.",
    },
    {
      icon: Database,
      title: "MongoDB Atlas Persistence",
      badge: "Sub-15ms",
      accent: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20",
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
    <div className="min-h-screen flex flex-col bg-[#08040d] text-[#fafafa]">
      <Navbar />

      <main className="flex-1 max-w-6xl w-auto mx-auto px-4 sm:px-6 py-12 sm:py-20">
        
        {/* Hero Header */}
        <div className="border-b border-fuchsia-500/20 pb-12 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 font-mono text-xs text-orange-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>RENDER NODE // 101 COMMANDS LOADED</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-3xl leading-[1.05]">
            VePlexity Commercial <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-fuchsia-500">
              Discord Bot V2.
            </span>
          </h1>

          <p className="text-lg text-zinc-300 mt-4 max-w-2xl leading-relaxed">
            A production-tier Discord infrastructure suite delivering lossless audio streaming, context-aware Gemini AI, full server moderation, and a live web management dashboard.
          </p>

          <div className="pt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/invite"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-fuchsia-600 hover:from-orange-400 hover:to-fuchsia-500 text-white font-bold text-sm transition-all shadow-lg shadow-fuchsia-600/25"
            >
              <Bot className="w-4 h-4" />
              <span>Add to Your Server</span>
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#12081d] text-zinc-200 border border-fuchsia-500/30 hover:border-fuchsia-500/60 font-semibold text-sm transition-colors"
            >
              <Sliders className="w-4 h-4 text-fuchsia-400" />
              <span>Launch Dashboard</span>
            </Link>

            <a
              href="https://www.buymeacoffee.com/veplexity1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 font-semibold text-sm transition-colors"
            >
              <Coffee className="w-4 h-4 text-amber-400" />
              <span>Support Development</span>
            </a>
          </div>
        </div>

        {/* Live Architecture Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-xl bg-[#0e0717] border border-fuchsia-500/20 mb-16 font-mono text-xs">
          <div>
            <div className="text-orange-400 uppercase">Commands Active</div>
            <div className="text-2xl font-black text-white mt-1">101 Production</div>
            <div className="text-emerald-400 text-[11px] mt-0.5">Slash Handlers Ready</div>
          </div>
          <div>
            <div className="text-fuchsia-400 uppercase">Cloud Daemon</div>
            <div className="text-2xl font-black text-white mt-1">Render Node</div>
            <div className="text-zinc-400 text-[11px] mt-0.5">24/7 Dedicated Daemon</div>
          </div>
          <div>
            <div className="text-pink-400 uppercase">Persistence</div>
            <div className="text-2xl font-black text-white mt-1">MongoDB Atlas</div>
            <div className="text-zinc-400 text-[11px] mt-0.5">Replica Set Cluster</div>
          </div>
          <div>
            <div className="text-amber-400 uppercase">API Gateway</div>
            <div className="text-2xl font-black text-white mt-1">Discord v10</div>
            <div className="text-zinc-400 text-[11px] mt-0.5">WebSocket Gateway</div>
          </div>
        </div>

        {/* Core Architecture Capabilities */}
        <div className="mb-20">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Core Architecture</h2>
            <p className="text-sm text-zinc-400 mt-1">Designed for speed, modularity, and zero-downtime server operations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-[#0e0717] border border-white/10 hover:border-fuchsia-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-lg bg-[#180d28] border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`font-mono text-[10px] uppercase px-2 py-0.5 rounded border ${feat.accent}`}>
                        {feat.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-2">
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
        <div className="p-8 rounded-xl bg-[#0e0717] border border-fuchsia-500/20 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div>
              <div className="font-mono text-xs text-orange-400 uppercase tracking-wider">COMMAND INDEX</div>
              <h2 className="text-2xl font-bold text-white mt-1">101 Slash Commands Catalog</h2>
            </div>
            <div className="text-xs text-zinc-400 font-mono">
              Type /help in Discord for full interactive documentation
            </div>
          </div>

          <div className="space-y-6">
            {commandCategories.map((cat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-xs font-mono font-bold text-fuchsia-400 uppercase">
                  {cat.category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.commands.map((cmd) => (
                    <span
                      key={cmd}
                      className="px-2.5 py-1 rounded bg-[#150b24] border border-fuchsia-500/20 text-xs font-mono text-zinc-300 hover:text-white hover:border-orange-500/40 transition-colors cursor-default"
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
        <div className="flex flex-col sm:flex-row items-center justify-between p-8 rounded-xl bg-gradient-to-r from-[#12081d] via-[#10071a] to-[#150a22] border border-fuchsia-500/30 gap-6">
          <div>
            <h3 className="text-xl font-bold text-white">Deploy to your Discord server</h3>
            <p className="text-xs text-zinc-400 mt-1">One-click authorization. No complex server setup required.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/invite"
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-fuchsia-600 hover:from-orange-400 hover:to-fuchsia-500 text-white font-bold text-xs transition-all shadow-md shadow-fuchsia-600/20"
            >
              Authorize Bot
            </Link>
            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-lg bg-[#150b24] text-zinc-200 border border-fuchsia-500/30 hover:border-fuchsia-500/60 font-semibold text-xs transition-colors"
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
