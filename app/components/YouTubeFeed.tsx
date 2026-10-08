"use client";

import { motion } from "framer-motion";
import { MonitorPlay, Radio, Play, ExternalLink, Sparkles, Clock, Eye, Video } from "lucide-react";
import { useState } from "react";

function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

export default function YouTubeFeed() {
  const [isPlaying, setIsPlaying] = useState(false);

  const streams = [
    {
      id: "dZvvx4SIkbM",
      title: "🔴 Comeback Day! - Welcome Back!",
      description: "The grand return of VePlexity! Live software architecture deep-dive, community catch-up, and roadmap announcement for the network.",
      status: "STREAM ARCHIVE",
      badgeColor: "bg-red-500/10 text-red-400 border-red-500/30",
      duration: "2H 30M",
      resolution: "1080p60 Studio",
      isLiveOrMain: true,
      url: "https://www.youtube.com/watch?v=dZvvx4SIkbM",
    },
    {
      id: "upcoming-1",
      title: "VePlexity Bot Production Deep-Dive & Architecture",
      description: "Live breakdown of the 101 command Discord engine, MongoDB Atlas cluster pipelines, and Next.js cloud dashboard.",
      status: "SCHEDULED BROADCAST",
      badgeColor: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30",
      duration: "Live Stream",
      resolution: "VePlexity Cam Multi-Angle",
      isLiveOrMain: false,
      url: "https://youtube.com/@VePlexity",
    },
    {
      id: "upcoming-2",
      title: "C++ Memory Hooking & Vice City Game Engine Labs",
      description: "Interactive reverse engineering session demonstrating runtime memory injection, DirectX render state hooks, and custom camera mods.",
      status: "UPCOMING VOD",
      badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/30",
      duration: "Deep-Dive",
      resolution: "Hardware 4K Capture",
      isLiveOrMain: false,
      url: "https://youtube.com/@VePlexity",
    },
  ];

  return (
    <section className="relative py-28 px-4 sm:px-6 z-10 bg-[#070308] border-t border-white/5" id="broadcasts">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <YoutubeIcon className="w-5 h-5 text-red-500" />
              <span className="text-xs font-mono font-black uppercase tracking-widest text-red-400">
                Official YouTube Broadcast Hub
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-400 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent tracking-tight">
              Latest Video Releases.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://youtube.com/@VePlexity"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-2xl bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/30 transition-all font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
            >
              <YoutubeIcon className="w-4 h-4 text-red-500" />
              <span>Subscribe @VePlexity</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>
        </div>

        {/* Featured Video Frame (Comeback Broadcast) */}
        <div className="mb-12">
          <div className="bg-[#0c0512] border-2 border-white/10 hover:border-orange-500/40 transition-all duration-300 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-[0_0_40px_rgba(249,115,22,0.1)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Video Player or Thumbnail */}
              <div className="lg:col-span-7 aspect-video rounded-2xl overflow-hidden bg-black relative border border-white/10 shadow-2xl">
                {isPlaying ? (
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/dZvvx4SIkbM?autoplay=1"
                    title="VePlexity Comeback Broadcast"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div 
                    onClick={() => setIsPlaying(true)}
                    className="w-full h-full bg-cover bg-center cursor-pointer group relative flex items-center justify-center"
                    style={{ backgroundImage: `url('https://img.youtube.com/vi/dZvvx4SIkbM/maxresdefault.jpg')` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    <button 
                      className="w-20 h-20 rounded-full bg-orange-500/90 text-white flex items-center justify-center backdrop-blur-md group-hover:scale-110 group-hover:bg-orange-500 transition-all shadow-[0_0_35px_rgba(249,115,22,0.7)] z-10"
                      aria-label="Play Video"
                    >
                      <Play className="w-8 h-8 fill-white ml-1" />
                    </button>

                    <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        LATEST BROADCAST
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-mono font-bold">
                        1080p60 Studio
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Video Info & Context */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 border border-orange-500/40 text-orange-400 rounded-lg text-xs font-mono font-black uppercase tracking-wider bg-orange-500/10">
                      FEATURED BROADCAST
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">2H 30M RUNTIME</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-4">
                    🔴 Comeback Day! - Welcome Back!
                  </h3>

                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    VePlexity is officially back on YouTube. Exploring upcoming software architectures, live developer banter, VePlexity Cam studio setup, and roadmap for our commercial bots.
                  </p>

                  <div className="space-y-2 mb-8">
                    <div className="flex items-center gap-2 text-xs text-zinc-300">
                      <Video className="w-4 h-4 text-fuchsia-400" />
                      <span>Captured using the <strong className="text-white">VePlexity Cam Studio</strong> multi-angle system</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-300">
                      <Clock className="w-4 h-4 text-orange-400" />
                      <span>Live stream archive available in full high bitrate 1080p60</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  <a
                    href="https://www.youtube.com/watch?v=dZvvx4SIkbM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-fuchsia-600 text-white font-black uppercase tracking-wider text-xs rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:scale-105 transition-all"
                  >
                    <YoutubeIcon className="w-4 h-4" /> Watch on YouTube
                  </a>
                  <a
                    href="https://youtube.com/@VePlexity"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                  >
                    View All VODs
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Secondary Broadcast Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {streams.slice(1).map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#0c0512] border border-white/10 hover:border-white/20 rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-mono font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${item.badgeColor}`}>
                    {item.status}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    {item.resolution}
                  </span>
                </div>

                <h4 className="text-xl font-black text-white mb-2 leading-snug">
                  {item.title}
                </h4>

                <p className="text-sm text-zinc-400 font-normal leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-orange-400 hover:text-orange-300 transition-colors w-fit"
              >
                <span>Channel Notification</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}