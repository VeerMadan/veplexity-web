"use client";
import { Terminal, MonitorPlay, MessageSquare, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0c0512] border-t-4 border-zinc-900 pt-16 pb-8 px-5 relative overflow-hidden z-10">
      
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-fuchsia-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Brand */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/30">
            <Terminal className="w-5 h-5 text-orange-400" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            VePlexity<span className="text-fuchsia-500">.</span>
          </span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <a href="https://youtube.com/@VePlexity" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-orange-400 transition-colors">
            <MonitorPlay className="w-4 h-4" /> YouTube
          </a>
          <a href="https://www.discord.gg/R6ZrqpWEcc" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-fuchsia-400 transition-colors">
            <MessageSquare className="w-4 h-4" /> Discord
          </a>
          {/* Link back to your main portfolio */}
          <a href="https://veermadan.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
            <ExternalLink className="w-4 h-4" /> Creator Portfolio
          </a>
        </div>

        {/* System Status & Copyright */}
        <div className="w-full pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-zinc-500">
            © {new Date().getFullYear()} VePlexity Network. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-mono text-green-500 uppercase tracking-widest">
              Systems Operational
            </span>
          </div>
        </div>
        
      </div>
    </footer>
  );
}