import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { Coffee, Shield, Check, ExternalLink, QrCode, Server, Sparkles, Heart } from "lucide-react";

export const metadata = {
  title: "Support & Patronage — VePlexity Network",
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
    <div className="min-h-screen flex flex-col bg-[#09090b] text-[#fafafa]">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-12 sm:py-20">
        
        {/* Header */}
        <div className="border-b border-zinc-800 pb-8 mb-12">
          <div className="flex items-center gap-2 font-mono text-xs text-amber-400 uppercase tracking-widest mb-3">
            <Coffee className="w-4 h-4" />
            <span>PATRONAGE & INFRASTRUCTURE BACKING</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Support VePlexity
          </h1>
          <p className="text-zinc-400 mt-2 max-w-2xl text-sm leading-relaxed">
            VePlexity is an independently engineered network. Direct community contributions help maintain 24/7 cloud nodes, database clusters, and ongoing software research.
          </p>
        </div>

        {/* Primary Patron Card & QR Code */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-8 rounded-lg bg-[#0d0d11] border border-zinc-800 mb-16 items-center">
          
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs">
              <span>OFFICIAL BUY ME A COFFEE CHANNEL</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Fuel the next generation of tools.
            </h2>

            <p className="text-sm text-zinc-400 leading-relaxed">
              Every single coffee purchased goes straight towards server operating expenses, high-speed API keys, and keeping the commercial bot free and accessible to Discord communities.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="https://www.buymeacoffee.com/veplexity1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-amber-400 hover:bg-amber-300 text-black font-semibold text-sm transition-colors"
              >
                <Coffee className="w-4 h-4" />
                <span>Support on Buy Me a Coffee</span>
                <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
              </a>

              <a
                href="https://discord.gg/R6ZrqpWEcc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-medium text-sm border border-zinc-800 transition-colors"
              >
                <span>Join Discord Community</span>
              </a>
            </div>

            <div className="font-mono text-[11px] text-zinc-500 pt-2">
              Direct Link: <span className="text-zinc-300">buymeacoffee.com/veplexity1</span>
            </div>
          </div>

          {/* QR Code Container */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-zinc-900/60 rounded-md border border-zinc-800 text-center">
            <div className="w-44 h-44 bg-white p-3 rounded-md shadow-sm mb-3">
              <img
                src="/bmc/bmc-qr-code.png"
                alt="Buy Me a Coffee QR Code"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="font-mono text-xs text-zinc-400 flex items-center gap-1.5 justify-center">
              <QrCode className="w-3.5 h-3.5 text-amber-400" />
              <span>Scan to open on mobile</span>
            </div>
          </div>

        </div>

        {/* Backer Perks */}
        <div className="p-6 sm:p-8 rounded-lg bg-[#0d0d11] border border-zinc-800 mb-16">
          <div className="mb-6">
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider">SUPPORTER ACKNOWLEDGMENT</div>
            <h3 className="text-xl font-bold text-white mt-1">What Backers Receive</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {perks.map((perk, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded bg-zinc-900/40 border border-zinc-800/80">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span className="text-xs text-zinc-300 leading-relaxed">{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Transparent Cost Allocation */}
        <div className="mb-16">
          <div className="mb-6">
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider">TRANSPARENCY</div>
            <h3 className="text-xl font-bold text-white mt-1">Infrastructure Cost Allocation</h3>
            <p className="text-xs text-zinc-400 mt-1">How patronage maintains the VePlexity ecosystem.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fundingBreakdown.map((item, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-[#0d0d11] border border-zinc-800">
                <div className="flex items-center justify-between mb-1.5 font-mono text-xs">
                  <span className="font-bold text-white">{item.title}</span>
                  <span className="text-zinc-500">{item.platform}</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
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
