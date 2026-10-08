"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#070a0e] border-t border-white/5 mt-auto text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 p-1 flex items-center justify-center">
                <img 
                  src="/vp-logo-icon.png" 
                  alt="VePlexity" 
                  className="w-full h-full object-contain"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-base tracking-tight">
                  VePlexity<span className="text-zinc-500 font-normal ml-1">Network</span>
                </span>
              </div>
            </div>
            <p className="text-zinc-400 leading-relaxed text-xs max-w-sm font-normal">
              Digital infrastructure, cloud bot platforms, and low-level software engineering founded and maintained by Veer Madan.
            </p>
            <div className="pt-1">
              <a
                href="https://veermadan.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors text-xs font-medium"
              >
                <span>Visit Developer Portfolio</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
              </a>
            </div>
          </div>

          {/* Navigation Column: Products */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Platform & Ecosystem
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/bot" className="text-zinc-400 hover:text-white transition-colors">
                  Commercial Discord Bot V2
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">
                  Web Management Dashboard
                </Link>
              </li>
              <li>
                <Link href="/invite" className="text-zinc-400 hover:text-white transition-colors">
                  Add Bot to Server
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column: Engineering */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              R&D & Engineering
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/news-wire" className="text-zinc-400 hover:text-white transition-colors">
                  Technical Newswire
                </Link>
              </li>
              <li>
                <Link href="/labs" className="text-zinc-400 hover:text-white transition-colors">
                  C++ Memory Hooks & Overlays
                </Link>
              </li>
              <li>
                <Link href="/labs" className="text-zinc-400 hover:text-white transition-colors">
                  Hardware Video & Cam Rig
                </Link>
              </li>
              <li>
                <Link href="/labs" className="text-zinc-400 hover:text-white transition-colors">
                  DSP Audio Loudness Algorithms
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column: Connect */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Community & Network
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://discord.gg/R6ZrqpWEcc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Discord Community World</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@VePlexity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
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
                  className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Buy Me a Coffee</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors">
                  Direct Contact
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-xs">
          <div>
            © {new Date().getFullYear()} VePlexity Network & Veer Madan. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-zinc-300 font-medium">All Cloud Nodes Active</span>
            <span>•</span>
            <span>Render 24/7 & Atlas Cluster</span>
          </div>
        </div>

      </div>
    </footer>
  );
}