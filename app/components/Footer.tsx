"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/10 mt-auto text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-zinc-900 border border-white/15 p-1 flex items-center justify-center">
                <img 
                  src="/vp-logo-icon.png" 
                  alt="VePlexity" 
                  className="w-full h-full object-contain"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-white text-base tracking-tighter uppercase">
                  VEPLEXITY
                </span>
                <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                  STUDIOS & DIGITAL LABS
                </span>
              </div>
            </div>
            <p className="text-zinc-400 leading-relaxed text-xs max-w-sm">
              Independent software development, game engine reverse engineering, and digital infrastructure founded by Veer Madan.
            </p>
            <div className="pt-1">
              <a
                href="https://veermadan.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-zinc-300 hover:text-white transition-colors font-bold uppercase tracking-wider text-[11px]"
              >
                <span>veermadan.dev</span>
                <ArrowUpRight className="w-3 h-3 text-pink-500" />
              </a>
            </div>
          </div>

          {/* Navigation Column: Products */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-white">
              PROJECTS & PLATFORM
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <Link href="/bot" className="hover:text-pink-400 transition-colors">
                  Commercial Discord Bot V2
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-pink-400 transition-colors">
                  Server Web Dashboard
                </Link>
              </li>
              <li>
                <Link href="/invite" className="hover:text-pink-400 transition-colors">
                  Add Bot to Discord
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column: Dispatches & Engineering */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-white">
              EDITORIAL & R&D
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <Link href="/news-wire" className="hover:text-pink-400 transition-colors">
                  Official Newswire
                </Link>
              </li>
              <li>
                <Link href="/labs" className="hover:text-pink-400 transition-colors">
                  VePlexity Cam Studio Rig
                </Link>
              </li>
              <li>
                <Link href="/labs" className="hover:text-pink-400 transition-colors">
                  C++ Memory Injection & Game Hooks
                </Link>
              </li>
              <li>
                <Link href="/labs" className="hover:text-pink-400 transition-colors">
                  Audio Mastering & DSP
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column: Community */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-white">
              NETWORK & CONNECT
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <a
                  href="https://discord.gg/R6ZrqpWEcc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Discord Community HQ</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@VePlexity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors flex items-center gap-1.5"
                >
                  <span>YouTube Channel</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.buymeacoffee.com/veplexity1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Support on Buy Me a Coffee</span>
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-pink-400 transition-colors">
                  Contact & Security
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px] font-mono">
          <div>
            © {new Date().getFullYear()} VEPLEXITY STUDIOS & VEER MADAN. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-zinc-300 font-bold">ALL SYSTEMS OPERATIONAL</span>
            </div>
            <span>•</span>
            <div>RENDER NODE 24/7 & MONGODB ATLAS</div>
          </div>
        </div>

      </div>
    </footer>
  );
}