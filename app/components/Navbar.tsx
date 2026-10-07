"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Coffee, Bot, ArrowUpRight, Terminal, Radio, Shield } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Overview", href: "/" },
    { name: "Bot V2", href: "/bot" },
    { name: "News Wire", href: "/news-wire" },
    { name: "Labs", href: "/labs" },
    { name: "Support", href: "/support" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-200 bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Lockup */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700/80 p-1 flex items-center justify-center transition-colors group-hover:border-zinc-500">
              <img 
                src="/vp-logo-icon.png" 
                alt="VePlexity" 
                className="w-full h-full object-contain"
                onError={(e) => { e.currentTarget.style.display = 'none'; }} 
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                VePlexity
              </span>
              <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
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
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    isActive
                      ? "text-white bg-zinc-800/90"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right CTA / External Links */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://www.buymeacoffee.com/veplexity1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-300 bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/30 rounded-md transition-colors"
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>Support</span>
          </a>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-black bg-white hover:bg-zinc-200 rounded-md transition-colors"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-white rounded-md bg-zinc-900 border border-zinc-800"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-[#09090b] px-4 py-4 space-y-2">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "text-white bg-zinc-800"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
            <a
              href="https://www.buymeacoffee.com/veplexity1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 text-center text-xs font-medium text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-md"
            >
              Support on Buy Me a Coffee
            </a>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2 px-3 text-center text-xs font-medium text-black bg-white hover:bg-zinc-200 rounded-md"
            >
              Launch Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
