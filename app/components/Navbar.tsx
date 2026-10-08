"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Terminal, ArrowUpRight, Bot } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Overview", href: "/" },
    { name: "Bot V2", href: "/bot" },
    { name: "Newswire", href: "/news-wire" },
    { name: "Labs & R&D", href: "/labs" },
    { name: "Support", href: "/support" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#070308]/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Lockup */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/30 transition-transform group-hover:scale-105 shadow-[0_0_20px_rgba(249,115,22,0.2)]">
              <Terminal className="w-5 h-5 text-orange-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-white group-hover:text-orange-400 transition-colors">
                VePlexity<span className="text-fuchsia-500">.</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
                    isActive
                      ? "text-white bg-white/10 border border-white/10 font-black shadow-[0_0_15px_rgba(217,70,239,0.2)]"
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
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="https://veermadan.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
          >
            <span>veermadan.dev</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-fuchsia-400" />
          </a>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-fuchsia-600 text-white font-black uppercase tracking-wider text-xs rounded-xl shadow-[0_0_20px_rgba(217,70,239,0.35)] hover:scale-105 transition-transform"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-zinc-400 hover:text-white rounded-xl bg-zinc-900 border border-zinc-800"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-[#0c0512] px-6 py-6 space-y-2">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 text-sm font-bold uppercase tracking-wider rounded-xl transition-colors ${
                  isActive
                    ? "text-white bg-white/10 border border-white/10"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <a
              href="https://veermadan.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 text-center text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white rounded-xl bg-black border border-zinc-800"
            >
              Creator Portfolio: veermadan.dev ↗
            </a>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 px-4 text-center text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-orange-500 to-fuchsia-600 rounded-xl shadow-[0_0_20px_rgba(217,70,239,0.35)]"
            >
              Launch Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
