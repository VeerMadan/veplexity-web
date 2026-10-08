"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MessageSquare, ExternalLink, ShieldCheck } from "lucide-react";

export default function ContactPage() {
  const contactChannels = [
    {
      title: "Discord Community HQ",
      badge: "REAL-TIME",
      badgeColor: "border-fuchsia-500 text-fuchsia-400 bg-fuchsia-500/10",
      description: "Join the official server for real-time bot support, feature suggestions, bug reporting, and direct discussion with Veer Madan.",
      actionLabel: "Join Discord Server",
      actionHref: "https://discord.gg/R6ZrqpWEcc",
      meta: "Average response: < 2 hours",
    },
    {
      title: "Creator Portfolio & Inquiries",
      badge: "DIRECT LINE",
      badgeColor: "border-orange-500 text-orange-400 bg-orange-500/10",
      description: "Direct personal portfolio and professional engineering contact channel for Veer Madan.",
      actionLabel: "Visit veermadan.dev",
      actionHref: "https://veermadan.dev",
      meta: "Professional & freelance inquiries",
    },
    {
      title: "YouTube Broadcast Channel",
      badge: "OFFICIAL MEDIA",
      badgeColor: "border-red-500 text-red-400 bg-red-500/10",
      description: "Comeback livestreams, video devlogs, laboratory hardware demos, and community premieres.",
      actionLabel: "Subscribe @VePlexity",
      actionHref: "https://youtube.com/@VePlexity",
      meta: "Official video dispatches",
    },
    {
      title: "GitHub Repositories",
      badge: "SOURCE CODE",
      badgeColor: "border-zinc-500 text-zinc-300 bg-zinc-800",
      description: "Public repositories, open-source toolkits, issue tracking, and code releases.",
      actionLabel: "View on GitHub",
      actionHref: "https://github.com/VeerMadan",
      meta: "Technical audits & source code",
    },
  ];

  return (
    <div className="min-h-screen bg-[#070308] text-white selection:bg-fuchsia-500/30 overflow-hidden flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-5 sm:px-8 py-16 relative z-10">
        
        {/* Header */}
        <div className="border-b border-white/5 pb-10 mb-14 relative">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-fuchsia-600/10 blur-[150px] rounded-full pointer-events-none" />

          <div className="flex items-center gap-2 font-mono text-xs text-orange-500 uppercase tracking-widest mb-3 font-black">
            <MessageSquare className="w-4 h-4 text-orange-400" />
            <span>DISPATCH CHANNELS • DIRECT CONTACT</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-white">
            Contact & <span className="bg-gradient-to-r from-orange-500 to-fuchsia-500 bg-clip-text text-transparent">Inquiries.</span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl text-lg leading-relaxed font-normal">
            Reach out regarding bot support, commercial licensing, laboratory collaborations, or general technical questions.
          </p>
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {contactChannels.map((channel, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="p-8 sm:p-10 rounded-[2rem] bg-[#0c0512] border-[4px] border-zinc-900 flex flex-col justify-between hover:border-orange-500/50 transition-colors duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-black tracking-tight text-white">
                    {channel.title}
                  </h3>
                  <span className={`font-mono text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-xl border ${channel.badgeColor}`}>
                    {channel.badge}
                  </span>
                </div>

                <p className="text-sm text-gray-400 leading-relaxed mb-8 font-normal">
                  {channel.description}
                </p>
              </div>

              <div>
                <div className="font-mono text-xs text-zinc-500 mb-6 pb-3 border-t border-white/5 uppercase font-bold">
                  {channel.meta}
                </div>

                <a
                  href={channel.actionHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-br from-orange-500 to-fuchsia-600 text-white font-black uppercase tracking-widest text-xs w-full justify-center shadow-[0_0_20px_rgba(217,70,239,0.35)] hover:scale-105 transition-transform"
                >
                  <span>{channel.actionLabel}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Security Notice */}
        <div className="p-8 sm:p-10 rounded-[2rem] bg-[#0c0512] border-[4px] border-zinc-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-[0_0_40px_rgba(249,115,22,0.05)]">
          <div className="space-y-1">
            <div className="text-xs text-white uppercase tracking-wider flex items-center gap-2 font-black font-mono">
              <ShieldCheck className="w-5 h-5 text-green-400" />
              <span>SECURITY & VULNERABILITY DISCLOSURE</span>
            </div>
            <p className="text-sm text-gray-400 max-w-xl font-normal leading-relaxed">
              If you discover a security vulnerability in the bot, API endpoints, or website, please report it privately via direct message to Veer on Discord.
            </p>
          </div>
          <a
            href="https://discord.gg/R6ZrqpWEcc"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-2xl bg-black hover:bg-zinc-900 text-zinc-200 border border-zinc-800 font-bold uppercase tracking-wider text-xs transition-colors whitespace-nowrap"
          >
            Report Privately
          </a>
        </div>

      </main>

      <Footer />
    </div>
  );
}
