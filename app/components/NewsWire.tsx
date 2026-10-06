"use client";

import { motion } from "framer-motion";
import { Radio, Newspaper, ArrowUpRight, Flame, Shield, Sparkles, Terminal, Bell, Bot, Coffee } from "lucide-react";
import Link from "next/link";

interface NewsItem {
  id: string;
  tag: string;
  tagColor: string;
  date: string;
  title: string;
  summary: string;
  linkText: string;
  linkHref: string;
  isExternal?: boolean;
}

export default function NewsWire() {
  const newsItems: NewsItem[] = [
    {
      id: "news-1",
      tag: "FLAGSHIP RELEASE",
      tagColor: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30",
      date: "OCTOBER 2026 // LIVE",
      title: "VePlexity Commercial Discord Bot V2 Enters Production",
      summary: "Massive overhaul deployed across 24/7 cloud nodes with 97+ slash commands, lossless audio, Gemini AI smart chatbot, and a web dashboard.",
      linkText: "Explore Commercial Bot",
      linkHref: "#commercial-bot",
      isExternal: false,
    },
    {
      id: "news-2",
      tag: "STUDIO & BROADCAST",
      tagColor: "bg-orange-500/10 text-orange-400 border-orange-500/30",
      date: "OCTOBER 2026 // ARCHIVE",
      title: "VePlexity Cam: Multi-Angle Capture & OBS Automation",
      summary: "Our custom hardware capture rig and dynamic OBS macro system are operational, powering high-production 1080p60 YouTube streams and comeback broadcasts.",
      linkText: "Watch YouTube Stream",
      linkHref: "https://www.youtube.com/watch?v=dZvvx4SIkbM",
      isExternal: true,
    },
    {
      id: "news-3",
      tag: "R&D & REVERSE ENG",
      tagColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
      date: "FALL 2026 // LABS",
      title: "Game Engine Architecture & C++ Memory Injection",
      summary: "Deep-level runtime memory hooking and custom render pipelines targeting Grand Theft Auto sandbox engines and next-generation interactive modding.",
      linkText: "Inspect Lab Specs",
      linkHref: "#labs",
      isExternal: false,
    },
    {
      id: "news-4",
      tag: "COMMUNITY & BACKERS",
      tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      date: "ACTIVE // BACKER HUB",
      title: "Official Buy Me a Coffee Support Hub Activated",
      summary: "Support server infrastructure, cloud hosting costs, and hardware stream research directly. Backers receive VIP roles and early access.",
      linkText: "Back on BMC",
      linkHref: "https://www.buymeacoffee.com/veplexity1",
      isExternal: true,
    },
  ];

  const tickerItems = [
    "🔴 [BREAKING] VePlexity Commercial Bot V2 running on Render with 97+ slash commands",
    "⚡ [STUDIO] VePlexity Cam multi-angle switcher integrated with zero-latency HDMI capture",
    "🍃 [DATABASE] MongoDB Atlas cloud cluster fully synchronized with <15ms latency",
    "🎵 [AUDIO] Studio master tracks (Tera Asar, Aisi Tu) archived in Audio Engineering Lab",
    "☕ [BACKERS] Buy Me a Coffee supporter portal online — powering 24/7 cloud servers",
    "🚀 [DASHBOARD] Full web configuration portal live at veplexity.dev/dashboard",
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 z-10 bg-[#070308] border-t border-white/5" id="newswire">
      <div className="max-w-7xl mx-auto">
        
        {/* News Channel Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-xs font-mono font-black tracking-widest text-red-400 uppercase">
                The VePlexity Wire // 24/7 Live Dispatch
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
              Network <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-fuchsia-500">News & Transmissions.</span>
            </h2>
          </div>
          <p className="text-zinc-400 text-sm sm:text-base max-w-md font-normal leading-relaxed">
            Real-time dispatches covering project releases, broadcast events, hardware R&D, and commercial bot development.
          </p>
        </div>

        {/* Live News Ticker Ribbon */}
        <div className="w-full overflow-hidden rounded-xl bg-black/60 border border-white/10 mb-12 py-3 px-4 relative flex items-center shadow-inner">
          <div className="shrink-0 flex items-center gap-2 pr-4 border-r border-white/10 mr-4 z-10 bg-black/80">
            <Radio className="w-4 h-4 text-orange-400 animate-pulse" />
            <span className="text-[11px] font-mono font-black uppercase text-orange-400 tracking-wider">
              FLASH FEED:
            </span>
          </div>
          <div className="flex whitespace-nowrap overflow-x-auto no-scrollbar gap-8 text-xs font-mono text-zinc-300">
            {tickerItems.map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-2">
                {item}
                <span className="text-zinc-600 font-bold ml-6">//</span>
              </span>
            ))}
          </div>
        </div>

        {/* Dispatch Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.map((news, i) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0c0512] border border-white/10 hover:border-fuchsia-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(217,70,239,0.15)] group relative overflow-hidden"
            >
              {/* Background Accent glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-600/5 blur-3xl rounded-full pointer-events-none group-hover:bg-fuchsia-600/15 transition-all" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-mono font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${news.tagColor}`}>
                    {news.tag}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 font-bold">
                    {news.date}
                  </span>
                </div>

                <h3 className="text-lg font-black text-white group-hover:text-fuchsia-300 transition-colors leading-snug mb-3">
                  {news.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed mb-6">
                  {news.summary}
                </p>
              </div>

              <div>
                {news.isExternal ? (
                  <a
                    href={news.linkHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-orange-400 hover:text-orange-300 transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>{news.linkText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <a
                    href={news.linkHref}
                    className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-fuchsia-400 hover:text-fuchsia-300 transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>{news.linkText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
