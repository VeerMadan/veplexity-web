"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Bot } from "lucide-react";

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
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#070b12]/75 border-b border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Lockup */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 p-1 flex items-center justify-center transition-transform group-hover:scale-105 shadow-[0_2px_10px_rgba(124,58,237,0.15),inset_0_1px_0_rgba(255,255,255,0.2)]">
              <img 
                src="/vp-logo-icon.png" 
                alt="VePlexity" 
                className="w-full h-full object-contain"
                onError={(e) => { e.currentTarget.style.display = 'none'; }} 
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                VePlexity<span className="text-purple-400 font-semibold ml-1">Network</span>
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
                  className={`px-3.5 py-1.5 text-xs rounded-xl transition-all ${
                    isActive
                      ? "text-white bg-white/[0.08] border border-white/10 font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)]"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
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
            href="https://veermadan.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors px-3 py-1.5 rounded-xl hover:bg-white/[0.04]"
          >
            <span>veermadan.dev</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-purple-400" />
          </a>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold neo-btn-primary"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-zinc-400 hover:text-white rounded-xl bg-white/[0.04] border border-white/10"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-[#070b12]/95 backdrop-blur-2xl px-6 py-5 space-y-2">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3.5 py-2 text-sm rounded-xl transition-colors ${
                  isActive
                    ? "text-white bg-white/[0.08] font-semibold border border-white/10"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <a
              href="https://veermadan.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 text-center text-xs font-medium text-zinc-400 hover:text-white rounded-xl bg-white/[0.04]"
            >
              Portfolio: veermadan.dev ↗
            </a>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-3 text-center text-xs font-bold neo-btn-primary"
            >
              Launch Bot Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
