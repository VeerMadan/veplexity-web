"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Terminal, Shield, Sparkles, MessageSquare, ExternalLink, Menu, X, Coffee } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-3 pb-2 transition-all duration-300">
      <div 
        className={`max-w-[1400px] mx-auto rounded-2xl transition-all duration-300 px-4 sm:px-6 py-3 flex items-center justify-between ${
          scrolled 
            ? "liquid-glass shadow-[0_15px_30px_-10px_rgba(0,0,0,0.8)] border-white/10" 
            : "bg-black/30 backdrop-blur-md border border-white/5"
        }`}
      >
        {/* Brand Logo & Live Pill */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden liquid-glass p-1 border border-fuchsia-500/30 group-hover:border-fuchsia-400 transition-all duration-300 shadow-[0_0_15px_rgba(217,70,239,0.3)]">
            <img 
              src="/vp-logo-icon.png" 
              alt="VePlexity" 
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-fuchsia-500/10 pointer-events-none" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white group-hover:text-fuchsia-300 transition-colors">
                VePlexity<span className="text-fuchsia-500">.</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                v2.0 Live
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          <a 
            href="#playground" 
            className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
          >
            Live Simulator
          </a>
          <a 
            href="#commands" 
            className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
          >
            97+ Commands
          </a>
          <a 
            href="#vip" 
            className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-amber-300 hover:text-amber-200 hover:bg-amber-500/10 transition-all flex items-center gap-1.5"
          >
            <Coffee className="w-3.5 h-3.5" /> VIP Perks
          </a>
          <a 
            href="#media" 
            className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
          >
            Broadcasts
          </a>
          <a 
            href="https://www.discord.gg/R6ZrqpWEcc" 
            target="_blank" 
            rel="noreferrer"
            className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5"
          >
            Discord HQ <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://www.buymeacoffee.com/veplexity1"
            target="_blank"
            rel="noreferrer"
            className="neo-btn-bmc px-3.5 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-all"
          >
            <img src="/bmc/bmc-logo-no-background.png" alt="BMC" className="w-4 h-4 object-contain" />
            <span className="hidden md:inline">Support</span>
          </a>

          <Link
            href="/dashboard"
            className="neo-btn-primary px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-white flex items-center gap-2"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>

          <a
            href="/invite"
            target="_blank"
            rel="noreferrer"
            className="neo-btn-glass px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-fuchsia-300 flex items-center gap-1.5 hover:border-fuchsia-500/60"
          >
            <MessageSquare className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>Add Bot</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-white/5 text-zinc-300 hover:text-white border border-white/10"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 max-w-[1400px] mx-auto liquid-glass-glow rounded-2xl p-5 border border-fuchsia-500/30 flex flex-col gap-3">
          <a 
            href="#playground" 
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 rounded-xl text-sm font-bold text-zinc-200 hover:bg-white/5"
          >
            Live Simulator
          </a>
          <a 
            href="#commands" 
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 rounded-xl text-sm font-bold text-zinc-200 hover:bg-white/5"
          >
            97+ Commands Matrix
          </a>
          <a 
            href="#vip" 
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 rounded-xl text-sm font-bold text-amber-300 hover:bg-amber-500/10 flex items-center gap-2"
          >
            <Coffee className="w-4 h-4" /> VIP Perks & BMC
          </a>
          <a 
            href="#media" 
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 rounded-xl text-sm font-bold text-zinc-200 hover:bg-white/5"
          >
            Broadcasts & Media
          </a>
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="neo-btn-primary w-full py-3 rounded-xl text-center font-bold text-sm uppercase tracking-wider text-white flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4" /> Open Dashboard
            </Link>
            <a
              href="/invite"
              target="_blank"
              rel="noreferrer"
              className="neo-btn-glass w-full py-3 rounded-xl text-center font-bold text-sm uppercase tracking-wider text-fuchsia-300 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" /> Add to Discord
            </a>
            <a
              href="https://www.buymeacoffee.com/veplexity1"
              target="_blank"
              rel="noreferrer"
              className="neo-btn-bmc w-full py-3 rounded-xl text-center font-bold text-sm uppercase tracking-wider text-black flex items-center justify-center gap-2"
            >
              <Coffee className="w-4 h-4" /> Buy Me a Coffee
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
