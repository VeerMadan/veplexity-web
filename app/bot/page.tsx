import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { 
  Bot, Music, Shield, Sparkles, Sliders, Database, Gamepad2, 
  ExternalLink, Heart, ArrowRight
} from "lucide-react";

export const metadata = {
  title: "VePlexity Commercial Bot V2 — Production Discord Platform",
  description: "24/7 cloud Discord bot with 101 commands, lossless audio, Gemini AI assistant, and live web management dashboard.",
};

export default function BotPage() {
  const features = [
    {
      icon: Music,
      title: "Lossless Audio DSP Engine",
      badge: "48kHz VOIP",
      description: "Low-latency voice streaming with queue looping, dynamic bass boost filters, volume calibration, and 24/7 voice stay in dedicated channels.",
    },
    {
      icon: Sparkles,
      title: "Google Gemini AI Assistant",
      badge: "Multi-Modal",
      description: "Direct conversational AI module powered by Gemini. Supports custom server personas, contextual conversation memory, and image prompt generation.",
    },
    {
      icon: Shield,
      title: "Enterprise Moderation Suite",
      badge: "Automated",
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
      badge: "Component UI",
      description: "Native Discord component mini-games including TicTacToe, Connect4, Rock-Paper-Scissors duels, and Trivia competitions directly in text channels.",
    },
    {
      icon: Database,
      title: "MongoDB Atlas Persistence",
      badge: "Sub-15ms Sync",
      description: "Enterprise cloud cluster storing user XP, server configurations, moderation records, and reaction role mappings with zero data loss.",
    },
  ];

  const commandCategories = [
    {
      category: "Music & Audio DSP",
      commands: ["/play", "/skip", "/queue", "/volume", "/247", "/pause", "/resume", "/stop", "/lyrics"],
    },
    {
      category: "AI & Intelligence",
      commands: ["/gemini ask", "/gemini reset", "/gemini persona", "/gemini vision", "/imagine"],
    },
    {
      category: "Security & Moderation",
      commands: ["/ban", "/kick", "/timeout", "/warn", "/warnings", "/clearwarns", "/lock", "/unlock", "/purge"],
    },
    {
      category: "System & Configuration",
      commands: ["/setup", "/setwelcome", "/reactionrole", "/announce", "/botinfo", "/serverinfo", "/stats", "/ping"],
    },
    {
      category: "Interactive & Mini-Games",
      commands: ["/tictactoe", "/connect4", "/rps", "/trivia", "/truth-or-dare", "/8ball", "/avatar"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#05070a] text-[#e5e7eb]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 py-16">
        
        {/* HERO SECTION */}
        <div className="border-b border-white/5 pb-16 mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-xs font-medium text-zinc-300">
              Render Node 24/7 • 101 Production Commands
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white max-w-4xl leading-[1.05]">
            VePlexity Commercial <br />
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Discord Bot V2.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 mt-6 max-w-2xl leading-relaxed font-normal">
            Production-grade Discord cloud infrastructure engineered by Veer Madan. Featuring lossless audio streaming, context-aware Gemini AI, full enterprise moderation, and live web management.
          </p>

          <div className="pt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/invite"
              className="px-6 py-3.5 bg-white text-black rounded-xl font-bold text-sm hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-sm"
            >
              <Bot className="w-4 h-4" />
              <span>Add to Server</span>
            </Link>

            <Link
              href="/dashboard"
              className="px-6 py-3.5 bg-white/5 text-white border border-white/10 rounded-xl font-medium text-sm hover:bg-white/10 transition-all"
            >
              <span>Launch Dashboard</span>
            </Link>

            <a
              href="https://www.buymeacoffee.com/veplexity1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 text-zinc-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2"
            >
              <Heart className="w-4 h-4" />
              <span>Support on BMC</span>
            </a>
          </div>
        </div>

        {/* METRICS STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 rounded-2xl bg-white/[0.02] border border-white/5 mb-16">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Commands Active</div>
            <div className="text-3xl font-black text-white">101 Handlers</div>
            <div className="text-xs text-zinc-400">Node.js 20 & Discord.js v14</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Cloud Host</div>
            <div className="text-3xl font-black text-white">Render PaaS</div>
            <div className="text-xs text-zinc-400">24/7 dedicated container</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Database</div>
            <div className="text-3xl font-black text-white">Atlas M0</div>
            <div className="text-xs text-zinc-400">Sub-15ms sync latency</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Gateway</div>
            <div className="text-3xl font-black text-white">Discord v10</div>
            <div className="text-xs text-zinc-400">WebSocket real-time</div>
          </div>
        </div>

        {/* ARCHITECTURE FEATURES */}
        <div className="mb-20">
          <div className="mb-10">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Core Subsystems
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1">
              Production Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                        <Icon className="w-5 h-5 text-zinc-300" />
                      </div>
                      <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                        {feat.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold tracking-tight text-white mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                      {feat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 101 COMMAND MATRIX */}
        <div className="p-8 sm:p-12 rounded-2xl bg-white/[0.02] border border-white/5 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/5">
            <div>
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Command Index</span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">101 Slash Handlers</h2>
            </div>
            <div className="text-xs text-zinc-400">
              Type <code className="text-zinc-200 bg-white/5 px-2 py-1 rounded">/help</code> in Discord for interactive documentation
            </div>
          </div>

          <div className="space-y-8">
            {commandCategories.map((cat, idx) => (
              <div key={idx} className="space-y-3">
                <div className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  {cat.category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.commands.map((cmd) => (
                    <span
                      key={cmd}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-mono text-zinc-300 hover:bg-white/10 transition-colors cursor-default"
                    >
                      {cmd}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA BANNER */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-10 rounded-2xl bg-white/[0.02] border border-white/5 gap-6">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-white">Deploy to your Discord server</h3>
            <p className="text-sm text-zinc-400 mt-1 font-normal">Instant authorization. Zero configuration required to start.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/invite"
              className="px-6 py-3 rounded-xl bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-colors"
            >
              Authorize Bot
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-medium text-xs transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
