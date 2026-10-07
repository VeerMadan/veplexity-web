"use client";

import Link from "next/link";
import { Coffee, ArrowUpRight, Bot } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#08040d] border-t border-fuchsia-500/15 mt-auto text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-[#12081d] border border-fuchsia-500/30 p-1 flex items-center justify-center">
                <img 
                  src="/vp-logo-icon.png" 
                  alt="VePlexity" 
                  className="w-full h-full object-contain"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                />
              </div>
              <span className="font-bold text-white text-sm tracking-tight">
                VePlexity<span className="text-fuchsia-500">.</span>
              </span>
              <span className="text-[10px] font-mono text-orange-400 uppercase bg-orange-500/10 px-1 py-0.2 rounded border border-orange-500/20">
                Network
              </span>
            </div>
            <p className="text-zinc-400 leading-relaxed text-xs">
              Independent digital technology network founded by Veer Madan. Digital infrastructure, Discord platform engineering, and studio broadcast labs.
            </p>
            <div className="pt-1">
              <a
                href="https://veermadan.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-zinc-300 hover:text-white transition-colors"
              >
                <span>veermadan.dev</span>
                <ArrowUpRight className="w-3 h-3 text-fuchsia-400" />
              </a>
            </div>
          </div>

          {/* Navigation Column: Network */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-orange-400 font-semibold">
              Network
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/bot" className="hover:text-fuchsia-400 transition-colors">
                  Commercial Bot V2
                </Link>
              </li>
              <li>
                <Link href="/news-wire" className="hover:text-fuchsia-400 transition-colors">
                  News Wire & Dispatches
                </Link>
              </li>
              <li>
                <Link href="/labs" className="hover:text-fuchsia-400 transition-colors">
                  Software & Media Labs
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column: Resources */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-fuchsia-400 font-semibold">
              Platform & Access
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Web Dashboard
                </Link>
              </li>
              <li>
                <Link href="/invite" className="hover:text-white transition-colors">
                  Invite Bot
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-white transition-colors">
                  Patronage & Support
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column: Community */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
              Community & Backing
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://discord.gg/R6ZrqpWEcc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
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
                  className="hover:text-white transition-colors flex items-center gap-1.5"
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
                  className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 font-medium"
                >
                  <Coffee className="w-3.5 h-3.5" />
                  <span>Support on Buy Me a Coffee</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Telemetry Bar */}
        <div className="pt-6 border-t border-fuchsia-500/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px] font-mono">
          <div>
            © {new Date().getFullYear()} VePlexity Network & Veer Madan. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-zinc-300">Bot Node: Online (Render)</span>
            </div>
            <span>•</span>
            <div>Vercel Edge & MongoDB Atlas</div>
          </div>
        </div>

      </div>
    </footer>
  );
}