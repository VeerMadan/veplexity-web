import Image from "next/image";
import Link from "next/link";
import { MonitorPlay, MessageSquare, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0c0512] border-t-4 border-zinc-900 pt-16 pb-10 px-5 relative overflow-hidden z-10 mt-auto">
      
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-fuchsia-600/15 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Brand */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 via-pink-500/10 to-fuchsia-500/20 flex items-center justify-center border border-orange-500/30 p-2 shadow-[0_0_25px_rgba(249,115,22,0.3)]">
            <Image
              src="/vp-no-bg.png"
              alt="VePlexity Logo"
              width={56}
              height={56}
              className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(249,115,22,0.6)]"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-3xl font-black tracking-tighter text-white">
              VePlexity<span className="text-fuchsia-500">.</span>
            </span>
            <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase -mt-1 font-bold">
              Engineering Network
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-12">
          <Link href="/bot" className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-orange-400 transition-colors">
            VePlexity Bot
          </Link>
          <Link href="/news-wire" className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-fuchsia-400 transition-colors">
            Newswire
          </Link>
          <Link href="/labs" className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-orange-400 transition-colors">
            Labs R&D
          </Link>
          <Link href="/support" className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-fuchsia-400 transition-colors">
            Support
          </Link>
          <a href="https://youtube.com/@VePlexity" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-orange-400 transition-colors">
            <MonitorPlay className="w-4 h-4" /> YouTube
          </a>
          <a href="https://www.discord.gg/R6ZrqpWEcc" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-fuchsia-400 transition-colors">
            <MessageSquare className="w-4 h-4" /> Discord
          </a>
          <a href="https://veermadan.dev" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
            <ExternalLink className="w-4 h-4 text-fuchsia-400" /> Creator Portfolio
          </a>
        </div>

        {/* System Status & Copyright */}
        <div className="w-full pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-zinc-500">
            © {new Date().getFullYear()} VePlexity Network & Veer Madan. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
            <span className="text-xs font-mono text-green-500 font-bold uppercase tracking-widest">
              Systems Operational • Render 24/7 Node
            </span>
          </div>
        </div>
        
      </div>
    </footer>
  );
}