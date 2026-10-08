"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { Heart, Check, ExternalLink, QrCode } from "lucide-react";

export default function SupportPage() {
  const perks = [
    "VIP Supporter role in the official Discord HQ",
    "Early access to new bot slash commands and beta releases",
    "Direct priority technical support line with developer Veer Madan",
    "Supporter badge acknowledgment across community leaderboards",
    "Your username listed in the official /botinfo and /stats command credits",
  ];

  const fundingBreakdown = [
    {
      title: "CLOUD BOT DAEMON HOSTING",
      platform: "RENDER WEB SERVICE",
      description: "Keeps the commercial bot running 24/7 with zero sleep downtime and instant WebSocket connectivity.",
    },
    {
      title: "CLUSTER DATABASE PERSISTENCE",
      platform: "MONGODB ATLAS",
      description: "Dedicated replica sets storing user economy balances, XP levels, and moderation audit records.",
    },
    {
      title: "DOMAIN & WEB EDGE HOSTING",
      platform: "VERCEL EDGE & DNS",
      description: "Maintains veplexity.dev, SSL certificates, API endpoints, and web dashboard servers.",
    },
    {
      title: "STUDIO & HARDWARE TESTING",
      platform: "LABS HARDWARE",
      description: "Capture cards, HDMI switches, and testing rigs for VePlexity Cam and broadcast workflows.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#070308] text-white selection:bg-fuchsia-500/30 overflow-hidden flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-5 sm:px-8 py-16 relative z-10">
        
        {/* Header */}
        <div className="border-b border-white/5 pb-10 mb-14 relative">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />

          <div className="flex items-center gap-2 font-mono text-xs text-orange-500 uppercase tracking-widest mb-3 font-black">
            <Heart className="w-4 h-4 fill-orange-500 text-orange-500" />
            <span>PATRONAGE & INFRASTRUCTURE BACKING</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-white">
            Support <span className="bg-gradient-to-r from-orange-500 to-fuchsia-500 bg-clip-text text-transparent">VePlexity.</span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl text-lg leading-relaxed font-normal">
            VePlexity is an independently engineered network. Direct community contributions help maintain 24/7 cloud nodes, database clusters, and ongoing software research.
          </p>
        </div>

        {/* Primary Patron Card & QR Code */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 p-8 sm:p-10 rounded-[2rem] bg-[#0c0512] border-[4px] border-zinc-900 mb-16 items-center shadow-[0_0_40px_rgba(217,70,239,0.1)]"
        >
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xl bg-orange-500/10 border border-orange-500 text-orange-400 font-mono text-xs font-black uppercase tracking-widest">
              <span>BUY ME A COFFEE PORTAL</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
              Fuel the next generation of tools.
            </h2>

            <p className="text-sm text-gray-400 leading-relaxed font-normal">
              Every contribution goes straight towards server operating expenses, high-speed API keys, and keeping the commercial bot free and accessible to Discord communities.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <a
                href="https://www.buymeacoffee.com/veplexity1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-br from-orange-500 to-fuchsia-600 text-white font-black uppercase tracking-widest text-xs transition-transform hover:scale-105 shadow-[0_0_20px_rgba(217,70,239,0.4)]"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Support on BMC</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
              </a>

              <a
                href="https://discord.gg/R6ZrqpWEcc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-black text-fuchsia-400 border border-fuchsia-500/30 font-bold uppercase tracking-wider text-xs hover:bg-fuchsia-500/10 transition-colors"
              >
                <span>Join Discord HQ</span>
              </a>
            </div>

            <div className="text-xs text-zinc-500 pt-2 font-mono">
              Direct Link: <span className="text-orange-400 font-bold">buymeacoffee.com/veplexity1</span>
            </div>
          </div>

          {/* QR Code Container */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-black rounded-2xl border border-zinc-800 text-center">
            <div className="w-44 h-44 bg-white p-3 rounded-xl shadow-md mb-3">
              <img
                src="/bmc/bmc-qr-code.png"
                alt="Buy Me a Coffee QR Code"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-xs text-zinc-400 flex items-center gap-1.5 justify-center font-bold uppercase tracking-wider font-mono">
              <QrCode className="w-4 h-4 text-orange-400" />
              <span>SCAN TO OPEN ON MOBILE</span>
            </div>
          </div>
        </motion.div>

        {/* Backer Perks */}
        <div className="p-8 sm:p-10 rounded-[2rem] bg-[#0c0512] border-[4px] border-zinc-900 mb-16">
          <div className="mb-8">
            <span className="font-mono text-xs font-black text-orange-500 uppercase tracking-widest">SUPPORTER ACKNOWLEDGMENT</span>
            <h3 className="text-2xl font-black uppercase tracking-tight text-white mt-1">What Backers Receive</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {perks.map((perk, idx) => (
              <div key={idx} className="flex items-start gap-3 p-5 rounded-2xl bg-black border border-zinc-800">
                <Check className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-300 leading-relaxed font-normal">{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Allocation */}
        <div className="mb-16">
          <div className="mb-8">
            <span className="font-mono text-xs font-black text-fuchsia-400 uppercase tracking-widest">TRANSPARENCY</span>
            <h3 className="text-2xl font-black uppercase tracking-tight text-white mt-1">Infrastructure Cost Allocation</h3>
            <p className="text-sm text-gray-400 mt-1">How patronage maintains the VePlexity ecosystem.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fundingBreakdown.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#0c0512] border-[3px] border-zinc-900">
                <div className="flex items-center justify-between mb-2 font-mono text-xs">
                  <span className="font-black text-white">{item.title}</span>
                  <span className="text-orange-400 font-bold">{item.platform}</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
