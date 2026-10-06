"use client";

import { motion } from "framer-motion";
import { Coffee, Sparkles, Shield, Heart, ExternalLink, QrCode, CheckCircle2 } from "lucide-react";

export default function SupportHub() {
  const perks = [
    {
      title: "Universal VIP Command Access",
      desc: "Unlock premium generative commands including /flirt, /imagine, and custom audio filters across every server VePlexity operates in.",
      icon: <Sparkles className="w-5 h-5 text-amber-400" />
    },
    {
      title: "Gold Supporter Badge & Role",
      desc: "Get the prestigious Gold VIP Supporter role inside the official Discord HQ (discord.gg/R6ZrqpWEcc) with custom color aesthetics.",
      icon: <Shield className="w-5 h-5 text-amber-400" />
    },
    {
      title: "Priority 384kbps Lossless Audio",
      desc: "Instant priority routing on high-bitrate Opus voice nodes with zero audio buffering, even during peak server traffic.",
      icon: <Coffee className="w-5 h-5 text-amber-400" />
    },
    {
      title: "Stream & Video Rollout Credits",
      desc: "Your name featured in the end credits of VePlexity YouTube broadcasts, devlogs, and production engineering releases.",
      icon: <Heart className="w-5 h-5 text-amber-400" />
    }
  ];

  return (
    <section id="vip" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#09040e]">
      
      {/* Amber/Gold Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase tracking-widest mb-4">
            <Coffee className="w-3.5 h-3.5" /> VIP Backer Program
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white">
            Support The Vision, <br />
            <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">Unlock VIP Perks.</span>
          </h2>
          <p className="text-zinc-400 text-lg mt-4 leading-relaxed">
            VePlexity provides 95% of all features completely free. If you love what we're building and want to power 24/7 server hosting, buy us a coffee to unlock exclusive creator perks!
          </p>
        </div>

        {/* Liquid Glass Showcase Card */}
        <div className="rounded-[3rem] liquid-glass-glow border-2 border-amber-500/30 p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-[0_30px_90px_-20px_rgba(245,158,11,0.15)]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Perks List (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <img
                    src="/bmc/bmc-full-logo-no-background.png"
                    alt="Buy Me a Coffee"
                    className="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_0_20px_rgba(255,208,0,0.4)]"
                  />
                  <div className="h-6 w-[1px] bg-white/10" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                    Official Support Channel
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
                  {perks.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-amber-500/40 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          {p.icon}
                        </div>
                        <h4 className="text-sm font-extrabold text-white mb-2">{p.title}</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://www.buymeacoffee.com/veplexity1"
                  target="_blank"
                  rel="noreferrer"
                  className="neo-btn-bmc px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2.5 shadow-xl shadow-amber-500/25"
                >
                  <img src="/bmc/bmc-logo-no-background.png" alt="BMC" className="w-5 h-5 object-contain" />
                  <span>Buy A Coffee on BMC</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href="https://www.discord.gg/R6ZrqpWEcc"
                  target="_blank"
                  rel="noreferrer"
                  className="neo-btn-glass px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white flex items-center gap-2 border border-white/10"
                >
                  <span>💬 Join HQ to Claim Role</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              </div>
            </div>

            {/* Right Column: QR Code & Visual Badge Card (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-sm rounded-3xl liquid-glass p-8 border-2 border-white/15 shadow-2xl flex flex-col items-center text-center relative sheen-layer">
                
                {/* QR Code Frame */}
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl bg-white p-3 shadow-2xl mb-6 relative group overflow-hidden flex items-center justify-center border-4 border-amber-400/80">
                  <img
                    src="/bmc/bmc-qr-code.png"
                    alt="Scan to support on Buy Me a Coffee"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <QrCode className="w-8 h-8 text-amber-400 mb-2" />
                    <span className="text-xs font-mono font-bold text-center">Scan with camera to open buymeacoffee.com/veplexity1</span>
                  </div>
                </div>

                <h4 className="text-base font-black text-white">Scan or Click to Support</h4>
                <p className="text-xs text-zinc-400 font-mono mt-1 mb-6">
                  One-time or monthly tips help fund 24/7 dedicated VPS nodes & APIs.
                </p>

                {/* BMC Button Graphic */}
                <a
                  href="https://www.buymeacoffee.com/veplexity1"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:scale-105 transition-transform"
                >
                  <img
                    src="/bmc/bmc-button.png"
                    alt="Buy Me A Coffee Button"
                    className="h-11 w-auto object-contain drop-shadow-lg"
                  />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
