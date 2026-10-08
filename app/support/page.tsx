import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { Heart, Check, ExternalLink, QrCode } from "lucide-react";
import { 
  MotionReveal, 
  MotionStaggerContainer, 
  MotionStaggerItem 
} from "../components/MotionReveal";

export const metadata = {
  title: "Support & Patronage — VePlexity Studios",
  description: "Back VePlexity digital infrastructure, 24/7 cloud servers, and media research directly on Buy Me a Coffee.",
};

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
      title: "Cloud Bot Daemon Hosting",
      platform: "Render Web Service",
      description: "Keeps the commercial bot running 24/7 with zero sleep downtime and instant WebSocket connectivity.",
    },
    {
      title: "Cluster Database Persistence",
      platform: "MongoDB Atlas",
      description: "Dedicated replica sets storing user economy balances, XP levels, and moderation audit records.",
    },
    {
      title: "Domain & Web Edge Hosting",
      platform: "Vercel Edge & DNS",
      description: "Maintains veplexity.dev, SSL certificates, API endpoints, and web dashboard servers.",
    },
    {
      title: "Studio & Hardware Testing",
      platform: "Labs Hardware",
      description: "Capture cards, HDMI switches, and testing rigs for VePlexity Cam and broadcast workflows.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#05070a] text-[#e5e7eb] relative selection:bg-purple-500/30">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-5 sm:px-8 py-16 relative z-10">
        
        {/* Header */}
        <MotionReveal delay={0.05} yOffset={20}>
          <div className="border-b border-white/[0.06] pb-10 mb-14">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pink-400 mb-3">
              <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
              <span>Patronage & Infrastructure Backing</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Support <span className="veer-gradient-text">VePlexity</span>
            </h1>
            <p className="text-zinc-400 mt-3 max-w-2xl text-sm md:text-base leading-relaxed font-normal">
              VePlexity is an independently engineered network. Direct community contributions help maintain 24/7 cloud nodes, database clusters, and ongoing software research.
            </p>
          </div>
        </MotionReveal>

        {/* Primary Patron Card & QR Code */}
        <MotionReveal delay={0.15} yOffset={25}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-8 sm:p-10 rounded-2xl neo-glass mb-16 items-center">
            
            <div className="md:col-span-7 space-y-4">
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 inline-block">
                Buy Me a Coffee Portal
              </span>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
                Fuel the next generation of tools.
              </h2>

              <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                Every contribution goes straight towards server operating expenses, high-speed API keys, and keeping the commercial bot free and accessible to Discord communities.
              </p>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <a
                  href="https://www.buymeacoffee.com/veplexity1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl neo-btn-primary text-xs"
                >
                  <Heart className="w-4 h-4 fill-black" />
                  <span>Support on BMC</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>

                <a
                  href="https://discord.gg/R6ZrqpWEcc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl neo-btn-glass text-xs"
                >
                  <span>Join Discord HQ</span>
                </a>
              </div>

              <div className="text-xs text-zinc-500 pt-2 font-mono">
                Direct Link: <span className="text-purple-300 font-bold">buymeacoffee.com/veplexity1</span>
              </div>
            </div>

            {/* QR Code Container */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-black/40 rounded-xl border border-white/[0.06] text-center">
              <div className="w-40 h-40 bg-white p-3 rounded-xl shadow-md mb-3">
                <img
                  src="/bmc/bmc-qr-code.png"
                  alt="Buy Me a Coffee QR Code"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-xs text-zinc-400 flex items-center gap-1.5 justify-center font-medium">
                <QrCode className="w-3.5 h-3.5 text-purple-400" />
                <span>Scan to open on mobile</span>
              </div>
            </div>

          </div>
        </MotionReveal>

        {/* Backer Perks */}
        <MotionReveal delay={0.25} yOffset={25}>
          <div className="p-8 sm:p-10 rounded-2xl neo-glass mb-16">
            <div className="mb-6">
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Supporter Acknowledgment</span>
              <h3 className="text-2xl font-bold tracking-tight text-white mt-1">What Backers Receive</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {perks.map((perk, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span className="text-xs text-zinc-300 leading-relaxed font-normal">{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </MotionReveal>

        {/* Cost Allocation */}
        <div className="mb-16">
          <MotionReveal yOffset={30}>
            <div className="mb-6">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Transparency</span>
              <h3 className="text-2xl font-bold tracking-tight text-white mt-1">Infrastructure Cost Allocation</h3>
              <p className="text-xs text-zinc-400 mt-1 font-normal">How patronage maintains the VePlexity ecosystem.</p>
            </div>
          </MotionReveal>

          <MotionStaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fundingBreakdown.map((item, idx) => (
              <MotionStaggerItem key={idx}>
                <div className="p-6 rounded-2xl neo-glass h-full">
                  <div className="flex items-center justify-between mb-2 text-xs">
                    <span className="font-bold text-white">{item.title}</span>
                    <span className="text-purple-300 font-mono text-[11px]">{item.platform}</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </MotionStaggerItem>
            ))}
          </MotionStaggerContainer>
        </div>

      </main>

      <Footer />
    </div>
  );
}
