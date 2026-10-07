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
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-10 mb-14">
          <div className="flex items-center gap-2 font-mono text-xs text-pink-400 uppercase tracking-widest mb-3 font-bold">
            <Heart className="w-4 h-4 fill-pink-500" />
            <span>PATRONAGE & INFRASTRUCTURE BACKING</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white">
            SUPPORT VEPLEXITY
          </h1>
          <p className="text-zinc-400 mt-3 max-w-2xl text-sm leading-relaxed font-medium">
            VePlexity is an independently engineered network. Direct community contributions help maintain 24/7 cloud nodes, database clusters, and ongoing software research.
          </p>
        </div>

        {/* Primary Patron Card & QR Code */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-8 sm:p-10 rounded-lg bg-[#0c0c0c] border border-white/15 mb-16 items-center">
          
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-pink-500/10 border border-pink-500/30 text-pink-400 font-mono text-xs font-bold uppercase">
              <span>OFFICIAL BUY ME A COFFEE CHANNEL</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              FUEL THE NEXT GENERATION OF TOOLS.
            </h2>

            <p className="text-sm text-zinc-400 leading-relaxed font-normal">
              Every contribution goes straight towards server operating expenses, high-speed API keys, and keeping the commercial bot free and accessible to Discord communities.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <a
                href="https://www.buymeacoffee.com/veplexity1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-wider text-xs transition-colors"
              >
                <Heart className="w-4 h-4 fill-black" />
                <span>SUPPORT ON BUY ME A COFFEE</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
              </a>

              <a
                href="https://discord.gg/R6ZrqpWEcc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded bg-black hover:bg-zinc-900 text-zinc-300 font-black uppercase tracking-wider text-xs border border-white/20 transition-colors"
              >
                <span>JOIN DISCORD HQ</span>
              </a>
            </div>

            <div className="font-mono text-[11px] text-zinc-500 pt-2">
              Direct Link: <span className="text-white font-bold">buymeacoffee.com/veplexity1</span>
            </div>
          </div>

          {/* QR Code Container */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-black rounded-lg border border-white/10 text-center">
            <div className="w-44 h-44 bg-white p-3 rounded shadow-md mb-3">
              <img
                src="/bmc/bmc-qr-code.png"
                alt="Buy Me a Coffee QR Code"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="font-mono text-xs text-zinc-400 flex items-center gap-1.5 justify-center font-bold uppercase">
              <QrCode className="w-3.5 h-3.5 text-pink-400" />
              <span>SCAN TO OPEN ON MOBILE</span>
            </div>
          </div>

        </div>

        {/* Backer Perks */}
        <div className="p-8 sm:p-10 rounded-lg bg-[#0c0c0c] border border-white/10 mb-16">
          <div className="mb-8">
            <span className="font-mono text-xs font-bold text-pink-400 uppercase tracking-wider">SUPPORTER ACKNOWLEDGMENT</span>
            <h3 className="text-2xl font-black uppercase tracking-tight text-white mt-1">WHAT BACKERS RECEIVE</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {perks.map((perk, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded bg-black border border-white/10">
                <Check className="w-4 h-4 text-pink-500 mt-0.5 shrink-0" />
                <span className="text-xs text-zinc-200 leading-relaxed font-medium">{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Allocation */}
        <div className="mb-16">
          <div className="mb-8">
            <span className="font-mono text-xs font-bold text-pink-400 uppercase tracking-wider">TRANSPARENCY</span>
            <h3 className="text-2xl font-black uppercase tracking-tight text-white mt-1">INFRASTRUCTURE COST ALLOCATION</h3>
            <p className="text-xs text-zinc-400 mt-1">How patronage maintains the VePlexity ecosystem.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fundingBreakdown.map((item, idx) => (
              <div key={idx} className="p-6 rounded-lg bg-[#0c0c0c] border border-white/10">
                <div className="flex items-center justify-between mb-2 font-mono text-xs">
                  <span className="font-black text-white">{item.title}</span>
                  <span className="text-pink-400 font-bold">{item.platform}</span>
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
