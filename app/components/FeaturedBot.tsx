"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Bot, Music, Shield, Cpu, Sparkles, ExternalLink, ArrowRight, 
  Terminal, Zap, CheckCircle2, Sliders, Database, Gamepad2, Coffee 
} from "lucide-react";

export default function FeaturedBot() {
  const highlights = [
    {
      icon: Music,
      title: "Lossless Audio & 24/7 DJ",
      desc: "High-fidelity audio streaming with queue management, bass boost, volume normalization, and 24/7 voice stay.",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Bot,
      title: "Gemini AI Natural Chatbot",
      desc: "Context-aware AI conversational engine with custom system personas, vision reasoning, and /imagine capabilities.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: Shield,
      title: "Enterprise Moderation",
      desc: "Detailed audit case logging, warning escalation thresholds, bulk message pruning, channel locks, and auto-mod filters.",
      color: "from-orange-500 to-amber-500",
    },
    {
      icon: Sliders,
      title: "Full Cloud Web Dashboard",
      desc: "Manage all guild settings live from your browser at veplexity.dev/dashboard with zero bot restart downtime.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Gamepad2,
      title: "Multiplayer Mini-Games",
      desc: "Full interactive Discord components for TicTacToe, Connect4, Rock-Paper-Scissors duels, Trivia, and Truth or Dare.",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: Database,
      title: "MongoDB Atlas Cloud Sync",
      desc: "Enterprise cloud persistence syncing server economies, level XP, mod cases, and configuration under 15ms.",
      color: "from-fuchsia-500 to-pink-500",
    },
  ];

  return (
    <section className="relative py-28 px-4 sm:px-6 z-10 bg-[#09040c] border-t border-white/5 overflow-hidden" id="commercial-bot">
      
      {/* Background neon ambient flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-fuchsia-600/10 via-orange-600/10 to-transparent blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Banner Pill */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 to-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-300 text-xs font-mono font-black tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(217,70,239,0.2)]">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span>FLAGSHIP COMMERCIAL HIGHLIGHT // RELEASE V2.0</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight mb-6">
            The Commercial <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-fuchsia-500">
              Discord Super-Bot.
            </span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-xl max-w-3xl leading-relaxed font-normal">
            Engineered specifically to replace 10 different single-purpose bots with one sleek, unified commercial architecture. 
            Loaded with 97+ production commands, lossless audio pipelines, and full cloud control.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-[#0e0716] border border-white/10 hover:border-fuchsia-500/40 rounded-2xl p-7 transition-all duration-300 hover:shadow-[0_0_35px_rgba(217,70,239,0.15)] group relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} p-0.5 mb-6 group-hover:scale-110 transition-transform`}>
                    <div className="w-full h-full bg-[#0c0512] rounded-[10px] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-white group-hover:text-fuchsia-300 transition-colors mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Commercial Bot Call-To-Action Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#12081d] via-[#0d0514] to-[#07020a] border-2 border-fuchsia-500/30 relative overflow-hidden shadow-[0_0_50px_rgba(217,70,239,0.2)]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-600/20 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-400 mb-2 block">
                READY FOR IMMEDIATE DEPLOYMENT
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Upgrade Your Discord Server Today
              </h3>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Connect your server directly through our Next.js cloud dashboard or invite the bot with zero configuration required. All 97+ commands are live 24/7.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto shrink-0">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 via-pink-500 to-fuchsia-600 text-white font-black uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2.5 transition-all hover:scale-105 shadow-[0_0_30px_rgba(217,70,239,0.5)] text-sm"
              >
                <Bot className="w-5 h-5" />
                <span>Open Dashboard</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>

              <Link
                href="/invite"
                className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 font-black uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2.5 transition-all text-sm"
              >
                <span>Invite to Server</span>
                <ExternalLink className="w-4 h-4" />
              </Link>

              <a
                href="https://www.buymeacoffee.com/veplexity1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-black uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 transition-all text-sm"
              >
                <Coffee className="w-5 h-5 text-amber-400" />
                <span>Support BMC</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
