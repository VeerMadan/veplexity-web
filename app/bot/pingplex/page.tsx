"use client";

import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { 
  Radio, Bell, Video, Play, Share2, Sparkles, 
  ExternalLink, Heart, Terminal, ArrowRight, Zap, ChevronRight,
  Shield, CheckCircle2, MessageSquare, Flame, Hash, Users
} from "lucide-react";
import { DiscordLogo } from "@/app/components/BrandIcons";

export default function PingPlexBotShowcasePage() {
  const platforms = [
    {
      name: "YouTube",
      badge: "Uploads & Streams",
      color: "text-red-400",
      border: "hover:border-red-500/50",
      description: "Instantly notifies your Discord server the moment a creator uploads a video, publishes a YouTube Short, or begins a live stream broadcast. Automatically embeds thumbnails and video titles.",
      commands: ["/alert setup youtube", "/alert list", "/alert test"],
    },
    {
      name: "Twitch",
      badge: "Live Broadcasts",
      color: "text-purple-400",
      border: "hover:border-purple-500/50",
      description: "Low-latency webhook streaming alerts. Posts instant live announcements with stream title, active game category, and direct stream links to maximize view counts.",
      commands: ["/alert setup twitch", "/alert toggle twitch"],
    },
    {
      name: "TikTok",
      badge: "Video Drops",
      color: "text-rose-400",
      border: "hover:border-rose-500/50",
      description: "Track your favorite TikTok creators and automatically relay new video posts into dedicated community channels with zero manual pasting.",
      commands: ["/alert setup tiktok"],
    },
    {
      name: "X (Twitter)",
      badge: "Real-Time Feeds",
      color: "text-sky-400",
      border: "hover:border-sky-500/50",
      description: "Sync tweets and status announcements in real-time. Keep your Discord server engaged with the latest news, patch notes, and community updates.",
      commands: ["/alert setup twitter"],
    },
    {
      name: "Reddit",
      badge: "Subreddit Watchers",
      color: "text-orange-400",
      border: "hover:border-orange-500/50",
      description: "Monitor subreddits for new discussions, memes, and game announcements. Filter posts by hot, new, or top categories seamlessly.",
      commands: ["/alert setup reddit"],
    },
    {
      name: "Custom Ping Roles",
      badge: "Smart Mentions",
      color: "text-amber-400",
      border: "hover:border-amber-500/50",
      description: "Assign specific roles (like @StreamSquad, @Subscribers, or @everyone) to receive notifications, preventing unnecessary notification fatigue for server members.",
      commands: ["/alert pingrole [role]", "/alert message [custom_text]"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0c0714] text-white selection:bg-fuchsia-500/30 overflow-hidden flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 py-16 relative z-10">
        
        {/* HERO SECTION - GTA 6 SUNSET NEON */}
        <div className="border-b border-fuchsia-500/10 pb-16 mb-16 relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-fuchsia-600/15 via-purple-600/15 to-rose-600/15 blur-[150px] rounded-full pointer-events-none" />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center gap-2.5 px-4 py-2 border border-fuchsia-500/40 text-fuchsia-400 rounded-xl font-mono text-xs font-black uppercase tracking-widest bg-gradient-to-r from-fuchsia-500/10 via-purple-500/10 to-transparent shadow-[0_0_20px_rgba(217,70,239,0.15)] w-fit"
          >
            <Radio className="w-4 h-4 text-fuchsia-400" />
            <span>PingPlex Creator Bot • Dedicated Alert Engine • 100% Free Feeds</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black text-white tracking-tighter leading-[1] mb-6 drop-shadow-[0_0_20px_rgba(217,70,239,0.3)] max-w-4xl"
          >
            PingPlex <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-400 to-rose-400">
              Creator Alerts Studio.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-zinc-300 max-w-3xl mb-10 leading-relaxed font-normal"
          >
            The dedicated zero-delay creator alert engine for Discord. Streamline live broadcast alerts for YouTube, Twitch, TikTok, X (Twitter), and Reddit with zero paywalls and sub-second webhook delivery.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/invite/pingplex"
              className="px-8 py-4 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-rose-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-black uppercase tracking-widest rounded-2xl flex items-center gap-3 transition-transform hover:scale-105 shadow-[0_0_30px_rgba(217,70,239,0.35)] active:scale-98"
            >
              <DiscordLogo className="w-5 h-5" fill="#ffffff" />
              <span>Add PingPlex Bot</span>
            </Link>

            <Link
              href="/discord-bots/pingplex"
              className="px-8 py-4 bg-[#180f24] text-fuchsia-300 border-2 border-fuchsia-500/30 hover:border-fuchsia-500/60 hover:bg-fuchsia-500/10 font-black uppercase tracking-widest rounded-2xl transition-all shadow-sm"
            >
              <span>Launch Creator Studio</span>
            </Link>

            <Link
              href="/bot/veplexity"
              className="px-6 py-4 bg-zinc-900/60 hover:bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 rounded-2xl font-bold uppercase tracking-wider text-xs flex items-center gap-2 transition-colors"
            >
              <span>Need Music &amp; Moderation? View VePlexity →</span>
            </Link>
          </motion.div>
        </div>

        {/* METRICS STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 md:p-10 rounded-[2rem] bg-[#140b20] border-2 border-fuchsia-500/20 mb-20 shadow-[0_0_40px_rgba(217,70,239,0.06)]">
          <div>
            <div className="text-xs text-fuchsia-400 font-black uppercase tracking-widest font-mono">SUPPORTED PLATFORMS</div>
            <div className="text-4xl font-black text-white mt-1">5 FEEDS</div>
            <div className="text-xs text-zinc-400 font-mono mt-1">YouTube, Twitch, TikTok, X, Reddit</div>
          </div>
          <div>
            <div className="text-xs text-purple-400 font-black uppercase tracking-widest font-mono">DELIVERY LATENCY</div>
            <div className="text-4xl font-black text-white mt-1">SUB-SECOND</div>
            <div className="text-xs text-zinc-400 font-mono mt-1">Direct WebSocket Webhooks</div>
          </div>
          <div>
            <div className="text-xs text-rose-400 font-black uppercase tracking-widest font-mono">FEED LIMITS</div>
            <div className="text-4xl font-black text-white mt-1">UNLIMITED</div>
            <div className="text-xs text-zinc-400 font-mono mt-1">Zero Paywalls for Creators</div>
          </div>
          <div>
            <div className="text-xs text-amber-400 font-black uppercase tracking-widest font-mono">PERMISSIONS NEEDED</div>
            <div className="text-4xl font-black text-white mt-1">SAFE (WEBHOOK)</div>
            <div className="text-xs text-zinc-400 font-mono mt-1">No Administrator Required</div>
          </div>
        </div>

        {/* PLATFORMS BREAKDOWN */}
        <div className="mb-24">
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter">
              Supported <span className="bg-gradient-to-r from-fuchsia-500 via-purple-400 to-rose-400 bg-clip-text text-transparent">Creator Feeds.</span>
            </h2>
            <p className="text-sm text-zinc-400 mt-2">
              Everything configured in seconds from the web studio or directly via slash commands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platforms.map((p, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className={`p-8 rounded-[2rem] bg-[#140b20] border-2 border-zinc-800/80 ${p.border} transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-fuchsia-500/10`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-xl font-black ${p.color}`}>{p.name}</span>
                    <span className="px-3 py-1 border border-fuchsia-500/30 text-fuchsia-300 rounded-lg text-[10px] font-black uppercase tracking-widest bg-black/40">
                      {p.badge}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-400 leading-relaxed font-normal mb-6">
                    {p.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-4 border-t border-zinc-800/80">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Commands:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {p.commands.map((cmd, i) => (
                      <code key={i} className="px-2 py-0.5 rounded bg-black/60 border border-zinc-800 text-[11px] font-mono text-fuchsia-300">
                        {cmd}
                      </code>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA BANNER */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-10 rounded-[2rem] bg-gradient-to-br from-[#1e0f2d] via-[#140b20] to-[#0c0714] border-2 border-fuchsia-500/30 gap-6 shadow-[0_0_40px_rgba(217,70,239,0.15)]">
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-white">Deploy PingPlex Bot Now</h3>
            <p className="text-sm text-zinc-400 mt-1 font-normal">Fast, safe authorization with alerts permissions (137976334336). Never miss a stream again.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/invite/pingplex"
              className="px-8 py-4 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-rose-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-black uppercase tracking-widest rounded-2xl text-xs hover:scale-105 transition-transform shadow-[0_0_20px_rgba(217,70,239,0.4)]"
            >
              Add to Server
            </Link>
            <Link
              href="/discord-bots/pingplex"
              className="px-6 py-4 bg-[#180f24] text-fuchsia-300 border border-fuchsia-500/40 rounded-2xl font-bold uppercase tracking-wider text-xs hover:bg-fuchsia-500/10 transition-colors"
            >
              Creator Studio
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
