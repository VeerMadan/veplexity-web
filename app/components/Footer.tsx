"use client";

import { Terminal, MonitorPlay, MessageSquare, ExternalLink, Bot, Coffee, Heart, Radio } from "lucide-react";
import Link from "next/link";

function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#08030b] border-t-2 border-white/10 pt-20 pb-12 px-4 sm:px-6 relative overflow-hidden z-10">
      
      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-fuchsia-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/30 p-1">
                <img 
                  src="/vp-logo-icon.png" 
                  alt="VePlexity Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                VePlexity<span className="text-fuchsia-500">.</span>
              </span>
            </Link>

            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed font-normal">
              The flagship media and software development network founded by Veer Madan. Home of the VePlexity Commercial Discord Bot, YouTube broadcast channels, and engineering labs.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a 
                href="https://veermadan.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all"
              >
                <span>Creator Portfolio</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              </a>

              <a 
                href="https://www.buymeacoffee.com/veplexity1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-300 hover:text-amber-200 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 transition-all"
              >
                <Coffee className="w-3.5 h-3.5 text-amber-400" />
                <span>Buy Me a Coffee</span>
              </a>
            </div>
          </div>

          {/* Navigation Col 1: Network */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
              Media & Content
            </h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <a href="https://youtube.com/@VePlexity" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <YoutubeIcon className="w-3.5 h-3.5 text-red-500" /> YouTube Channel
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/watch?v=dZvvx4SIkbM" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <MonitorPlay className="w-3.5 h-3.5 text-orange-400" /> Comeback Broadcast
                </a>
              </li>
              <li>
                <a href="#newswire" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-fuchsia-400" /> Live News Wire
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Col 2: Discord Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
              Discord Platform
            </h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="/dashboard" className="hover:text-fuchsia-400 transition-colors flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-fuchsia-400" /> Web Dashboard
                </Link>
              </li>
              <li>
                <Link href="/invite" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" /> Add Bot to Server
                </Link>
              </li>
              <li>
                <a href="https://www.discord.gg/R6ZrqpWEcc" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-400" /> Discord Community HQ
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Col 3: Labs & Backing */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
              Labs & Support
            </h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <a href="#labs" className="hover:text-white transition-colors">
                  VePlexity Cam Studio
                </a>
              </li>
              <li>
                <a href="#labs" className="hover:text-white transition-colors">
                  C++ Game Engine Hooks
                </a>
              </li>
              <li>
                <a href="#labs" className="hover:text-white transition-colors">
                  Audio Mastering Labs
                </a>
              </li>
              <li>
                <a href="https://www.buymeacoffee.com/veplexity1" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5" /> Support on BMC
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Telemetry Status Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <p>© {new Date().getFullYear()} VePlexity Network & Veer Madan. All rights reserved.</p>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-bold">Bot Node: Online (Render)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-zinc-400">Atlas: Synced</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-zinc-400">Web: Vercel</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}