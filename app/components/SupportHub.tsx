"use client";

import { motion } from "framer-motion";
import { Coffee, Heart, Sparkles, Shield, Zap, ExternalLink, QrCode, ArrowRight, CheckCircle2 } from "lucide-react";

export default function SupportHub() {
  const perks = [
    "👑 Exclusive VIP Supporter Role in our Discord HQ",
    "⚡ Priority access to upcoming bot modules & labs beta builds",
    "🎙️ Name recognized in official stream credits & broadcast archives",
    "🚀 Helps cover 24/7 cloud servers (Render, MongoDB Atlas, Vercel)",
    "🎥 Funds hardware R&D for the VePlexity Cam studio rig",
    "💖 Keeps all 97+ Discord bot commands 100% free for everyone",
  ];

  return (
    <section className="relative py-28 px-4 sm:px-6 z-10 bg-[#09040c] border-t border-white/5 overflow-hidden" id="support">
      
      {/* Ambient Glows */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[170px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-fuchsia-600/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-black tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
            <Coffee className="w-4 h-4 text-amber-400" />
            <span>FUEL THE VEPLEXITY NETWORK</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-6">
            Support on <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300">
              Buy Me a Coffee.
            </span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed font-normal">
            VePlexity is an independent network dedicated to software engineering, high-production streaming, and free community Discord automation. Your support keeps the servers humming 24/7.
          </p>
        </div>

        {/* Main Support Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Supporter Benefits & Donation Tiers Card */}
          <div className="lg:col-span-7 bg-[#0e0716] border-2 border-amber-500/25 rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-[0_0_50px_rgba(245,158,11,0.08)] relative overflow-hidden">
            <div className="relative z-10">
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center p-3 shadow-inner">
                  <img 
                    src="/bmc/bmc-logo-yellow.png" 
                    alt="Buy Me a Coffee" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">Backer Perks & Impact</h3>
                  <p className="text-xs text-amber-400 font-mono font-bold uppercase tracking-wider">
                    DIRECT DEVELOPER CONTRIBUTION
                  </p>
                </div>
              </div>

              {/* Perks List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {perks.map((perk, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-zinc-300 font-medium"
                  >
                    <span>{perk}</span>
                  </div>
                ))}
              </div>

              {/* Fast Donation Preset Buttons */}
              <div className="mb-8">
                <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider block mb-3">
                  Quick Contribution Tiers:
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <a
                    href="https://www.buymeacoffee.com/veplexity1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-white/5 hover:bg-amber-500/15 border border-white/10 hover:border-amber-500/40 text-center transition-all group"
                  >
                    <span className="text-lg font-black text-white group-hover:text-amber-300 block">☕ $5</span>
                    <span className="text-[11px] text-zinc-400 font-mono">1 Coffee</span>
                  </a>
                  <a
                    href="https://www.buymeacoffee.com/veplexity1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-center transition-all group"
                  >
                    <span className="text-lg font-black text-amber-300 block">☕☕ $15</span>
                    <span className="text-[11px] text-amber-400/80 font-mono font-bold">Popular</span>
                  </a>
                  <a
                    href="https://www.buymeacoffee.com/veplexity1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-white/5 hover:bg-amber-500/15 border border-white/10 hover:border-amber-500/40 text-center transition-all group"
                  >
                    <span className="text-lg font-black text-white group-hover:text-amber-300 block">☕☕☕ $25</span>
                    <span className="text-[11px] text-zinc-400 font-mono">VIP Supporter</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Official BMC Link Button */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4">
              <a
                href="https://www.buymeacoffee.com/veplexity1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 py-4 px-8 rounded-2xl bg-[#FFDD00] hover:bg-[#ffe338] text-black font-black uppercase tracking-wider text-sm flex items-center justify-center gap-3 transition-transform hover:scale-105 shadow-[0_0_30px_rgba(255,221,0,0.4)]"
              >
                <img 
                  src="/bmc/bmc-logo.png" 
                  alt="BMC" 
                  className="w-6 h-6 object-contain" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <span>Buy Me a Coffee (buymeacoffee.com/veplexity1)</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>

          {/* Mobile QR Code Scanner Card */}
          <div className="lg:col-span-5 bg-[#0c0512] border-2 border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col items-center justify-between text-center relative overflow-hidden">
            
            <div className="w-full">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-[11px] font-mono font-bold uppercase tracking-wider mb-4">
                <QrCode className="w-3.5 h-3.5 text-amber-400" />
                <span>INSTANT MOBILE SCAN</span>
              </div>

              <h4 className="text-xl font-black text-white mb-2">Scan & Donate Instantly</h4>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto mb-6">
                Point your phone camera to open Buy Me a Coffee directly with Apple Pay, Google Pay, UPI, or Credit Card.
              </p>

              {/* QR Code Container */}
              <div className="w-56 h-56 mx-auto bg-white p-3.5 rounded-2xl border-4 border-amber-500/40 shadow-[0_0_35px_rgba(245,158,11,0.25)] flex items-center justify-center">
                <img 
                  src="/bmc/bmc-qr-code.png" 
                  alt="Buy Me a Coffee QR Code" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="w-full mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-xs font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Verified Creator: Veer Madan (@veplexity1)</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
