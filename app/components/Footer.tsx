"use client";

import { Terminal, MonitorPlay, MessageSquare, ExternalLink, Shield, Coffee, Heart, ArrowUp } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050208] border-t-2 border-white/10 pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden z-10">
      
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-fuchsia-600/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          
          {/* Brand Info (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl liquid-glass p-1 border border-fuchsia-500/30 flex items-center justify-center">
                  <img src="/vp-logo-icon.png" alt="VP" className="w-full h-full object-contain" />
                </div>
                <span className="text-2xl font-black tracking-tight text-white">
                  VePlexity<span className="text-fuchsia-500">.</span>
                </span>
              </div>

              <p className="text-zinc-400 text-sm max-w-sm leading-relaxed mb-6">
                Next-generation lossless studio music, Gemini 2.0 multi-personality AI, instant auto-mod defense, and automated server infrastructure. Built for modern Discord communities.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://www.buymeacoffee.com/veplexity1"
                target="_blank"
                rel="noreferrer"
                className="neo-btn-bmc px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2"
              >
                <img src="/bmc/bmc-logo-no-background.png" alt="BMC" className="w-4 h-4 object-contain" />
                <span>Buy Coffee</span>
              </a>

              <a
                href="https://www.discord.gg/R6ZrqpWEcc"
                target="_blank"
                rel="noreferrer"
                className="neo-btn-glass px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white flex items-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5 text-fuchsia-400" />
                <span>Join Discord HQ</span>
              </a>
            </div>
          </div>

          {/* Quick Links (3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 mb-4">Platform</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/dashboard" className="text-zinc-400 hover:text-fuchsia-400 transition-colors flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5" /> Bot Dashboard
                </Link>
              </li>
              <li>
                <a href="/invite" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-fuchsia-400 transition-colors flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5" /> Add to Discord
                </a>
              </li>
              <li>
                <a href="#playground" className="text-zinc-400 hover:text-white transition-colors">
                  Interactive Simulator
                </a>
              </li>
              <li>
                <a href="#commands" className="text-zinc-400 hover:text-white transition-colors">
                  97+ Command Matrix
                </a>
              </li>
              <li>
                <a href="#vip" className="text-zinc-400 hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5 text-amber-400" /> VIP Perks
                </a>
              </li>
            </ul>
          </div>

          {/* Media & Community (4 Cols) */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 mb-4">Network & Creator</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="https://youtube.com/@VePlexity" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-red-400 transition-colors flex items-center gap-2">
                  <MonitorPlay className="w-3.5 h-3.5" /> YouTube @VePlexity
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/watch?v=dZvvx4SIkbM" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-orange-400 transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Latest Comeback Stream
                </a>
              </li>
              <li>
                <a href="https://veermadan.dev" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5" /> Creator Portfolio (veermadan.dev)
                </a>
              </li>
              <li>
                <a href="https://www.discord.gg/R6ZrqpWEcc" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-fuchsia-400 transition-colors flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5" /> discord.gg/R6ZrqpWEcc
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar & Live Telemetry */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-zinc-500">
            © {new Date().getFullYear()} VePlexity Network. Crafted with pride by Veer Madan.
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full liquid-glass border border-white/5 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>All Systems Operational (99.98%)</span>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl liquid-glass border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}