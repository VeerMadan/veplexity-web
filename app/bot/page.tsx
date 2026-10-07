import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { 
  Bot, Music, Shield, Sparkles, Sliders, Database, Gamepad2, 
  ExternalLink, Heart 
} from "lucide-react";

export const metadata = {
  title: "VePlexity Commercial Bot V2 — Production Discord Platform",
  description: "24/7 cloud Discord bot with 101 commands, lossless audio, Gemini AI assistant, and live web management dashboard.",
};

export default function BotPage() {
  const features = [
    {
      icon: Music,
      title: "LOSSLESS AUDIO DSP ENGINE",
      badge: "48KHZ VOIP",
      accent: "text-pink-400 bg-pink-500/10 border-pink-500/20",
      description: "Low-latency streaming architecture with queue looping, dynamic bass boost filters, volume calibration, and 24/7 voice stay in dedicated channels.",
    },
    {
      icon: Sparkles,
      title: "GOOGLE GEMINI AI ASSISTANT",
      badge: "MULTI-MODAL",
      accent: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      description: "Direct conversational AI module powered by Gemini. Supports custom server personas, contextual conversational memory, and image prompt generation.",
    },
    {
      icon: Shield,
      title: "ENTERPRISE MODERATION SUITE",
      badge: "AUTOMATED",
      accent: "text-red-400 bg-red-500/10 border-red-500/20",
      description: "Rule enforcement system with automated warning escalation, timed suspensions, channel lockdowns, and case-indexed audit logs.",
    },
    {
      icon: Sliders,
      title: "REAL-TIME CLOUD DASHBOARD",
      badge: "NEXT.JS 16",
      accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      description: "Configure prefixes, notification channels, reaction roles, and automated welcome dispatches in real-time from veplexity.dev/dashboard.",
    },
    {
      icon: Gamepad2,
      title: "MULTIPLAYER DISCORD GAMES",
      badge: "COMPONENT UI",
      accent: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      description: "Native Discord component mini-games including TicTacToe, Connect4, Rock-Paper-Scissors duels, and Trivia competitions directly in text channels.",
    },
    {
      icon: Database,
      title: "MONGODB ATLAS PERSISTENCE",
      badge: "SUB-15MS",
      accent: "text-pink-400 bg-pink-500/10 border-pink-500/20",
      description: "Enterprise cloud cluster storing user XP, server configurations, moderation records, and reaction role mappings with zero data loss.",
    },
  ];

  const commandCategories = [
    {
      category: "MUSIC & AUDIO DSP",
      commands: ["/play", "/skip", "/queue", "/volume", "/247", "/pause", "/resume", "/stop", "/lyrics"],
    },
    {
      category: "AI & INTELLIGENCE",
      commands: ["/gemini ask", "/gemini reset", "/gemini persona", "/gemini vision", "/imagine"],
    },
    {
      category: "SECURITY & MODERATION",
      commands: ["/ban", "/kick", "/timeout", "/warn", "/warnings", "/clearwarns", "/lock", "/unlock", "/purge"],
    },
    {
      category: "SYSTEM & CONFIGURATION",
      commands: ["/setup", "/setwelcome", "/reactionrole", "/announce", "/botinfo", "/serverinfo", "/stats", "/ping"],
    },
    {
      category: "INTERACTIVE & MINI-GAMES",
      commands: ["/tictactoe", "/connect4", "/rps", "/trivia", "/truth-or-dare", "/8ball", "/avatar"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 py-16">
        
        {/* HERO BILLBOARD */}
        <div className="border-b border-white/10 pb-16 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-900 border border-white/15 font-mono text-xs text-pink-400 uppercase tracking-widest mb-6 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>RENDER NODE 24/7 // 101 PRODUCTION COMMANDS</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter text-white max-w-4xl leading-[0.95]">
            VEPLEXITY COMMERCIAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-pink-500">
              DISCORD BOT V2.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 mt-6 max-w-2xl leading-relaxed font-medium">
            Production-grade Discord cloud infrastructure engineered by Veer Madan. Featuring lossless audio streaming, context-aware Gemini AI, full enterprise moderation, and live web management.
          </p>

          <div className="pt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/invite"
              className="px-8 py-4 rounded bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-wider text-xs transition-colors flex items-center gap-2"
            >
              <Bot className="w-4 h-4" />
              <span>ADD TO YOUR SERVER</span>
            </Link>

            <Link
              href="/dashboard"
              className="px-8 py-4 rounded bg-zinc-900 hover:bg-zinc-800 text-white border border-white/20 font-black uppercase tracking-wider text-xs transition-colors"
            >
              <span>LAUNCH DASHBOARD</span>
            </Link>

            <a
              href="https://www.buymeacoffee.com/veplexity1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 border border-pink-500/30 font-black uppercase tracking-wider text-xs transition-colors flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-pink-500" />
              <span>SUPPORT PERKS</span>
            </a>
          </div>
        </div>

        {/* METRICS STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 rounded-lg bg-[#0c0c0c] border border-white/10 mb-16 font-mono">
          <div>
            <div className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider">COMMANDS ACTIVE</div>
            <div className="text-3xl font-black text-white mt-1">101 PROD</div>
            <div className="text-emerald-400 text-xs font-bold mt-0.5">Slash Handlers Ready</div>
          </div>
          <div>
            <div className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider">CLOUD DAEMON</div>
            <div className="text-3xl font-black text-white mt-1">RENDER NODE</div>
            <div className="text-zinc-400 text-xs mt-0.5">24/7 Dedicated Daemon</div>
          </div>
          <div>
            <div className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider">PERSISTENCE</div>
            <div className="text-3xl font-black text-white mt-1">ATLAS MONGODB</div>
            <div className="text-zinc-400 text-xs mt-0.5">Sub-15ms Replica Set</div>
          </div>
          <div>
            <div className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider">API GATEWAY</div>
            <div className="text-3xl font-black text-white mt-1">DISCORD V10</div>
            <div className="text-zinc-400 text-xs mt-0.5">WebSocket Gateway</div>
          </div>
        </div>

        {/* ARCHITECTURE FEATURES */}
        <div className="mb-20">
          <div className="mb-10">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-pink-400">
              CORE SUBSYSTEMS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mt-1">
              PRODUCTION ARCHITECTURE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-lg bg-[#0c0c0c] border border-white/10 hover:border-pink-500/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded bg-zinc-900 border border-white/15 flex items-center justify-center text-pink-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${feat.accent}`}>
                        {feat.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-black uppercase tracking-tight text-white mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                      {feat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 101 COMMAND MATRIX */}
        <div className="p-8 sm:p-12 rounded-lg bg-[#0c0c0c] border border-white/10 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div>
              <span className="font-mono text-xs font-bold text-pink-400 uppercase tracking-wider">COMMAND INDEX</span>
              <h2 className="text-3xl font-black uppercase tracking-tight text-white mt-1">101 Slash Commands</h2>
            </div>
            <div className="text-xs text-zinc-400 font-mono">
              Type /help in Discord for interactive command explorer
            </div>
          </div>

          <div className="space-y-8">
            {commandCategories.map((cat, idx) => (
              <div key={idx} className="space-y-3">
                <div className="text-xs font-mono font-black text-white uppercase tracking-wider">
                  {cat.category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.commands.map((cmd) => (
                    <span
                      key={cmd}
                      className="px-3 py-1.5 rounded bg-black border border-white/10 text-xs font-mono text-zinc-300 hover:text-white hover:border-pink-500/50 transition-colors cursor-default"
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
        <div className="flex flex-col sm:flex-row items-center justify-between p-10 rounded-lg bg-[#0c0c0c] border border-white/15 gap-6">
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-white">Deploy to your Discord server</h3>
            <p className="text-xs text-zinc-400 mt-1">Zero downtime. Instant authorization.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/invite"
              className="px-8 py-3 rounded bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-wider text-xs transition-colors"
            >
              AUTHORIZE BOT
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded bg-zinc-900 text-white border border-white/20 font-black uppercase tracking-wider text-xs transition-colors"
            >
              DASHBOARD
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
