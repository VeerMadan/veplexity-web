"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { DiscordLogo } from "./BrandIcons";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Overview", href: "/" },
    { name: "Discord Bots", href: "/discord-bot" },
    { name: "Architecture", href: "/architecture" },
    { name: "Status", href: "/status" },
    { name: "Newswire", href: "/news-wire" },
    { name: "Support", href: "/support" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/discord-bot") {
      return (
        pathname === "/discord-bot" ||
        pathname.startsWith("/discord-bot/") ||
        pathname === "/discord-bots" ||
        pathname.startsWith("/discord-bots/") ||
        pathname === "/bot" ||
        pathname.startsWith("/bot/")
      );
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#070308]/75 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all">
      <div className="max-w-[1720px] mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Lockup */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            {/* Unboxed Crisp Logo */}
            <div className="relative shrink-0 flex items-center transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/vp-no-bg.png"
                alt="VePlexity Brand Logo"
                width={50}
                height={50}
                priority
                className="h-11 sm:h-12 w-auto object-contain filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.6)]"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-white group-hover:text-orange-400 transition-colors">
                VePlexity<span className="text-fuchsia-500">.</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase -mt-1 font-bold">
                Network Labs
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const active = isLinkActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
                    active
                      ? "text-white bg-white/10 border border-white/15 font-black shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
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
            href="/discord-bot"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-600 hover:from-orange-400 hover:to-rose-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-500/25 transition active:scale-95"
          >
            <DiscordLogo className="w-3.5 h-3.5" fill="#ffffff" />
            <span>Discord Bots</span>
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
            const active = isLinkActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 text-sm font-bold uppercase tracking-wider rounded-xl transition-colors ${
                  active
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
              href="/discord-bot"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 text-center text-xs font-bold text-white bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-600 hover:from-orange-400 hover:to-rose-500 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              <DiscordLogo className="w-3.5 h-3.5" fill="#ffffff" />
              <span>Explore Discord Bots</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
