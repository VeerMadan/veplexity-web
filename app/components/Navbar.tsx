"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Terminal, Radio, Bot, Flame, ExternalLink, Menu, X, Coffee, Play } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "News Wire", href: "#newswire", icon: Radio },
    { name: "Broadcasts", href: "#broadcasts", icon: Play },
    { name: "Commercial Bot", href: "#commercial-bot", icon: Bot },
    { name: "Labs & R&D", href: "#labs", icon: Terminal },
    { name: "Support BMC", href: "#support", icon: Coffee },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4 pb-2 transition-all duration-300">
      <div 
        className={`max-w-7xl mx-auto rounded-2xl sm:rounded-full px-5 py-3 transition-all duration-300 flex items-center justify-between ${
          isScrolled 
            ? "bg-[#0c0512]/90 backdrop-blur-xl border border-fuchsia-500/20 shadow-[0_10px_35px_rgba(0,0,0,0.6)]" 
            : "bg-[#0e0716]/60 backdrop-blur-md border border-white/10"
        }`}
      >
        {/* Brand Identity */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-fuchsia-600/30 border border-orange-500/40 p-1 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 shadow-[0_0_15px_rgba(249,115,22,0.3)]">
            <img 
              src="/vp-logo-icon.png" 
              alt="VePlexity Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                // Fallback to text if icon file issue
                e.currentTarget.style.display = 'none';
              }} 
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-fuchsia-400 transition-all">
                VePlexity<span className="text-fuchsia-500">.</span>
              </span>
              <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hidden md:inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ONLINE
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1 bg-black/40 border border-white/5 px-4 py-1.5 rounded-full backdrop-blur-sm">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                className="px-3 py-1.5 rounded-full text-xs font-bold text-zinc-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5 uppercase tracking-wider"
              >
                <Icon className="w-3.5 h-3.5 text-zinc-400" />
                {item.name}
              </a>
            );
          })}
        </div>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://www.buymeacoffee.com/veplexity1"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
          >
            <Coffee className="w-4 h-4 text-amber-400" />
            <span>Support BMC</span>
          </a>

          <Link
            href="/dashboard"
            className="px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-orange-500 to-fuchsia-600 hover:from-orange-400 hover:to-fuchsia-500 text-white transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(217,70,239,0.4)] flex items-center gap-2"
          >
            <Bot className="w-4 h-4" />
            <span>Bot Dashboard</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-zinc-400 hover:text-white rounded-xl bg-white/5 border border-white/10"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-4 bg-[#0e0716]/95 border border-fuchsia-500/20 rounded-2xl backdrop-blur-2xl shadow-2xl flex flex-col gap-3">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-bold text-zinc-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-3"
              >
                <Icon className="w-4 h-4 text-fuchsia-400" />
                {item.name}
              </a>
            );
          })}

          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <a
              href="https://www.buymeacoffee.com/veplexity1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center justify-center gap-2"
            >
              <Coffee className="w-4 h-4 text-amber-400" />
              <span>Support on Buy Me a Coffee</span>
            </a>

            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-orange-500 to-fuchsia-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-fuchsia-600/30"
            >
              <Bot className="w-4 h-4" />
              <span>Launch Bot Dashboard</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
