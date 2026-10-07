import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MessageSquare, Mail, ExternalLink, Globe, ArrowUpRight, ShieldCheck, Terminal, Disc as DiscordIcon } from "lucide-react";

export const metadata = {
  title: "Contact & Inquiries — VePlexity Network",
  description: "Get in touch with Veer Madan and the VePlexity team for partnerships, bot support, or engineering inquiries.",
};

export default function ContactPage() {
  const contactChannels = [
    {
      title: "Discord Community HQ",
      badge: "FASTEST RESPONSE",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      description: "Join the official server for real-time bot support, feature suggestions, bug reporting, and direct discussion with Veer Madan.",
      actionLabel: "Join Discord Server",
      actionHref: "https://discord.gg/R6ZrqpWEcc",
      isExternal: true,
      meta: "Average response: < 2 hours",
    },
    {
      title: "Creator Portfolio & Inquiries",
      badge: "DIRECT INQUIRIES",
      badgeColor: "bg-zinc-800 text-zinc-300 border-zinc-700",
      description: "Direct personal portfolio and professional engineering contact channel for Veer Madan.",
      actionLabel: "Visit veermadan.dev",
      actionHref: "https://veermadan.dev",
      isExternal: true,
      meta: "Professional & freelance inquiries",
    },
    {
      title: "YouTube Channel",
      badge: "MEDIA & BROADCASTS",
      badgeColor: "bg-red-500/10 text-red-400 border-red-500/30",
      description: "Catch comeback livestreams, video devlogs, laboratory hardware demos, and community premieres.",
      actionLabel: "Subscribe @VePlexity",
      actionHref: "https://youtube.com/@VePlexity",
      isExternal: true,
      meta: "Official video dispatch",
    },
    {
      title: "GitHub Repository & Issues",
      badge: "CODE & DEVLOGS",
      badgeColor: "bg-zinc-800 text-zinc-300 border-zinc-700",
      description: "Public repositories, open-source toolkits, issue tracking, and code releases.",
      actionLabel: "View VeerMadan on GitHub",
      actionHref: "https://github.com/VeerMadan",
      isExternal: true,
      meta: "Technical audits & source code",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-[#fafafa]">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-12 sm:py-20">
        
        {/* Header */}
        <div className="border-b border-zinc-800 pb-8 mb-12">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 uppercase tracking-widest mb-3">
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>DISPATCH CHANNELS // DIRECT CONTACT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Contact & Inquiries
          </h1>
          <p className="text-zinc-400 mt-2 max-w-2xl text-sm leading-relaxed">
            Reach out regarding bot support, commercial licensing, laboratory collaborations, or general questions.
          </p>
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {contactChannels.map((channel, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg bg-[#0d0d11] border border-zinc-800 flex flex-col justify-between hover:border-zinc-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">
                    {channel.title}
                  </h3>
                  <span className={`font-mono text-[10px] uppercase px-2 py-0.5 rounded border ${channel.badgeColor}`}>
                    {channel.badge}
                  </span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                  {channel.description}
                </p>
              </div>

              <div>
                <div className="font-mono text-[11px] text-zinc-500 mb-3 pb-3 border-t border-zinc-800/80">
                  {channel.meta}
                </div>

                <a
                  href={channel.actionHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs border border-zinc-700 transition-colors w-full justify-center"
                >
                  <span>{channel.actionLabel}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Security & Bug Bounty Notice */}
        <div className="p-6 rounded-lg bg-zinc-900/40 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="font-mono text-xs text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Security & Vulnerability Disclosure</span>
            </div>
            <p className="text-xs text-zinc-400 max-w-xl">
              If you discover a security vulnerability in the bot, API endpoints, or website, please report it privately via direct message to Veer on Discord.
            </p>
          </div>
          <a
            href="https://discord.gg/R6ZrqpWEcc"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-md bg-white text-black font-medium text-xs hover:bg-zinc-200 transition-colors whitespace-nowrap"
          >
            Report Privately
          </a>
        </div>

      </main>

      <Footer />
    </div>
  );
}
