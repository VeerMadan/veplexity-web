import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { Heart, Check, ExternalLink, QrCode } from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-[#05070a] text-[#e5e7eb]">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-5 sm:px-8 py-16">
        
        {/* Header */}
        <div className="border-b border-white/5 pb-10 mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
            <Heart className="w-4 h-4 text-zinc-300" />
            <span>Patronage & Infrastructure Backing</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Support VePlexity
          </h1>
          <p className="text-zinc-400 mt-3 max-w-2xl text-sm md:text-base leading-relaxed font-normal">
            VePlexity is an independently engineered network. Direct community contributions help maintain 24/7 cloud nodes, database clusters, and ongoing software research.
          </p>
        </div>

        {/* Primary Patron Card & QR Code */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-8 sm:p-10 rounded-2xl bg-white/[0.02] border border-white/5 mb-16 items-center">
          
          <div className="md:col-span-7 space-y-4">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 inline-block">
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs transition-colors shadow-sm"
              >
                <Heart className="w-4 h-4 fill-black" />
                <span>Support on BMC</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>

              <a
                href="https://discord.gg/R6ZrqpWEcc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-xs border border-white/10 transition-colors"
              >
                <span>Join Discord HQ</span>
              </a>
            </div>

            <div className="text-xs text-zinc-500 pt-2 font-mono">
              Direct Link: <span className="text-zinc-300 font-bold">buymeacoffee.com/veplexity1</span>
            </div>
          </div>

          {/* QR Code Container */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-black/40 rounded-xl border border-white/5 text-center">
            <div className="w-40 h-40 bg-white p-3 rounded-xl shadow-md mb-3">
              <img
                src="/bmc/bmc-qr-code.png"
                alt="Buy Me a Coffee QR Code"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-xs text-zinc-400 flex items-center gap-1.5 justify-center font-medium">
              <QrCode className="w-3.5 h-3.5 text-zinc-300" />
              <span>Scan to open on mobile</span>
            </div>
          </div>

        </div>

        {/* Backer Perks */}
        <div className="p-8 sm:p-10 rounded-2xl bg-white/[0.02] border border-white/5 mb-16">
          <div className="mb-6">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Supporter Acknowledgment</span>
            <h3 className="text-2xl font-bold tracking-tight text-white mt-1">What Backers Receive</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {perks.map((perk, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span className="text-xs text-zinc-300 leading-relaxed font-normal">{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Allocation */}
        <div className="mb-16">
          <div className="mb-6">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Transparency</span>
            <h3 className="text-2xl font-bold tracking-tight text-white mt-1">Infrastructure Cost Allocation</h3>
            <p className="text-xs text-zinc-400 mt-1 font-normal">How patronage maintains the VePlexity ecosystem.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fundingBreakdown.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center justify-between mb-2 text-xs">
                  <span className="font-bold text-white">{item.title}</span>
                  <span className="text-zinc-400 font-mono text-[11px]">{item.platform}</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-normal">
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
