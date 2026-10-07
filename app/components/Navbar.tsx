"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Coffee, Bot, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Overview", href: "/" },
    { name: "Commercial Bot", href: "/bot" },
    { name: "News Wire", href: "/news-wire" },
    { name: "Labs & R&D", href: "/labs" },
    { name: "Support", href: "/support" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#08040d]/90 backdrop-blur-md border-b border-fuchsia-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Lockup */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-[#12081d] border border-fuchsia-500/30 p-1 flex items-center justify-center transition-all group-hover:border-orange-500/50 group-hover:scale-105">
              <img 
                src="/vp-logo-icon.png" 
                alt="VePlexity Logo" 
                className="w-full h-full object-contain"
                onError={(e) => { e.currentTarget.style.display = 'none'; }} 
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-fuchsia-400 transition-all">
                VePlexity<span className="text-fuchsia-500">.</span>
              </span>
              <span className="text-[10px] font-mono tracking-wider text-orange-400 uppercase bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/20">
                Network
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    isActive
                      ? "text-white bg-fuchsia-500/15 border border-fuchsia-500/30"
                      : "text-zinc-300 hover:text-white hover:bg-white/5"
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-md transition-colors"
          >
            <Coffee className="w-3.5 h-3.5 text-amber-400" />
            <span>Support</span>
          </a>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-fuchsia-600 hover:from-orange-400 hover:to-fuchsia-500 rounded-md transition-all shadow-md shadow-fuchsia-600/25"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-white rounded-md bg-[#12081d] border border-fuchsia-500/20"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-fuchsia-500/20 bg-[#0c0514] px-4 py-4 space-y-2">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-white bg-fuchsia-500/20 border border-fuchsia-500/30"
                    : "text-zinc-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-fuchsia-500/20 flex flex-col gap-2">
            <a
              href="https://www.buymeacoffee.com/veplexity1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 text-center text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-md"
            >
              Support on Buy Me a Coffee
            </a>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2 px-3 text-center text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-fuchsia-600 rounded-md"
            >
              Launch Bot Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
