"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Bot, Heart, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "OVERVIEW", href: "/" },
    { name: "BOT V2", href: "/bot" },
    { name: "NEWSWIRE", href: "/news-wire" },
    { name: "LABS & R&D", href: "/labs" },
    { name: "SUPPORT", href: "/support" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-black/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        
        {/* Brand Lockup (Rockstar Studio Style) */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/15 p-1 flex items-center justify-center transition-transform group-hover:scale-105">
              <img 
                src="/vp-logo-icon.png" 
                alt="VePlexity Logo" 
                className="w-full h-full object-contain"
                onError={(e) => { e.currentTarget.style.display = 'none'; }} 
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tighter text-white uppercase group-hover:text-pink-500 transition-colors">
                VEPLEXITY
              </span>
              <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase">
                STUDIOS & LABS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (Rockstar Newswire Style) */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3.5 py-1.5 text-xs font-black tracking-wider transition-all rounded ${
                    isActive
                      ? "text-white bg-white/10 border-b-2 border-pink-500"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://www.buymeacoffee.com/veplexity1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-black tracking-wider text-pink-400 bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 rounded transition-colors"
          >
            <Heart className="w-3.5 h-3.5 fill-pink-500" />
            <span>SUPPORT</span>
          </a>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-black tracking-wider text-black bg-white hover:bg-zinc-200 rounded transition-all shadow-sm"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>DASHBOARD</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-zinc-400 hover:text-white rounded bg-zinc-900 border border-white/10"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-black px-6 py-6 space-y-3">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 text-sm font-black tracking-wider rounded transition-colors ${
                  isActive
                    ? "text-white bg-white/10 border-l-4 border-pink-500"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <a
              href="https://www.buymeacoffee.com/veplexity1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 text-center text-xs font-black tracking-wider text-pink-400 bg-pink-500/10 border border-pink-500/30 rounded"
            >
              SUPPORT ON BUY ME A COFFEE
            </a>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-3 text-center text-xs font-black tracking-wider text-black bg-white rounded"
            >
              LAUNCH BOT DASHBOARD
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
