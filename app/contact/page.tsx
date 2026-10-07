import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MessageSquare, ExternalLink, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Contact & Security — VePlexity Studios",
  description: "Get in touch with Veer Madan and the VePlexity team for partnerships, bot support, or engineering inquiries.",
};

export default function ContactPage() {
  const contactChannels = [
    {
      title: "DISCORD COMMUNITY HQ",
      badge: "REAL-TIME",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      description: "Join the official server for real-time bot support, feature suggestions, bug reporting, and direct discussion with Veer Madan.",
      actionLabel: "JOIN DISCORD SERVER",
      actionHref: "https://discord.gg/R6ZrqpWEcc",
      meta: "Average response: < 2 hours",
    },
    {
      title: "CREATOR PORTFOLIO & INQUIRIES",
      badge: "DIRECT LINE",
      badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/30",
      description: "Direct personal portfolio and professional engineering contact channel for Veer Madan.",
      actionLabel: "VISIT VEERMADAN.DEV",
      actionHref: "https://veermadan.dev",
      meta: "Professional & freelance inquiries",
    },
    {
      title: "YOUTUBE BROADCAST CHANNEL",
      badge: "OFFICIAL MEDIA",
      badgeColor: "bg-red-500/10 text-red-400 border-red-500/30",
      description: "Comeback livestreams, video devlogs, laboratory hardware demos, and community premieres.",
      actionLabel: "SUBSCRIBE @VEPLEXITY",
      actionHref: "https://youtube.com/@VePlexity",
      meta: "Official video dispatch",
    },
    {
      title: "GITHUB REPOSITORIES",
      badge: "SOURCE CODE",
      badgeColor: "bg-white/10 text-white border-white/20",
      description: "Public repositories, open-source toolkits, issue tracking, and code releases.",
      actionLabel: "VIEW ON GITHUB",
      actionHref: "https://github.com/VeerMadan",
      meta: "Technical audits & source code",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-10 mb-14">
          <div className="flex items-center gap-2 font-mono text-xs text-pink-400 uppercase tracking-widest mb-3 font-bold">
            <MessageSquare className="w-4 h-4" />
            <span>DISPATCH CHANNELS // DIRECT CONTACT</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white">
            CONTACT & INQUIRIES
          </h1>
          <p className="text-zinc-400 mt-3 max-w-2xl text-sm leading-relaxed font-medium">
            Reach out regarding bot support, commercial licensing, laboratory collaborations, or general questions.
          </p>
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {contactChannels.map((channel, idx) => (
            <div
              key={idx}
              className="p-8 rounded-lg bg-[#0c0c0c] border border-white/10 flex flex-col justify-between hover:border-pink-500/50 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-black uppercase tracking-tight text-white">
                    {channel.title}
                  </h3>
                  <span className={`font-mono text-[10px] uppercase font-bold px-2.5 py-0.5 rounded border ${channel.badgeColor}`}>
                    {channel.badge}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed mb-6 font-normal">
                  {channel.description}
                </p>
              </div>

              <div>
                <div className="font-mono text-[11px] text-zinc-500 mb-4 pb-3 border-t border-white/10 font-bold uppercase">
                  {channel.meta}
                </div>

                <a
                  href={channel.actionHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-wider text-xs transition-colors w-full justify-center"
                >
                  <span>{channel.actionLabel}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Security Notice */}
        <div className="p-8 rounded-lg bg-[#0c0c0c] border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="font-mono text-xs text-white uppercase tracking-wider flex items-center gap-2 font-black">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SECURITY & VULNERABILITY DISCLOSURE</span>
            </div>
            <p className="text-xs text-zinc-400 max-w-xl">
              If you discover a security vulnerability in the bot, API endpoints, or website, please report it privately via direct message to Veer on Discord.
            </p>
          </div>
          <a
            href="https://discord.gg/R6ZrqpWEcc"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded bg-zinc-900 hover:bg-zinc-800 text-white border border-white/20 font-black uppercase tracking-wider text-xs transition-colors whitespace-nowrap"
          >
            REPORT PRIVATELY
          </a>
        </div>

      </main>

      <Footer />
    </div>
  );
}
