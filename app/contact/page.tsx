import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MessageSquare, ExternalLink, ShieldCheck } from "lucide-react";

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
      meta: "Average response: < 2 hours",
    },
    {
      title: "Creator Portfolio & Inquiries",
      badge: "DIRECT INQUIRIES",
      badgeColor: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30",
      description: "Direct personal portfolio and professional engineering contact channel for Veer Madan.",
      actionLabel: "Visit veermadan.dev",
      actionHref: "https://veermadan.dev",
      meta: "Professional & freelance inquiries",
    },
    {
      title: "YouTube Channel",
      badge: "MEDIA & BROADCASTS",
      badgeColor: "bg-red-500/10 text-red-400 border-red-500/30",
      description: "Comeback livestreams, video devlogs, laboratory hardware demos, and community premieres.",
      actionLabel: "Subscribe @VePlexity",
      actionHref: "https://youtube.com/@VePlexity",
      meta: "Official video dispatch",
    },
    {
      title: "GitHub Repositories",
      badge: "CODE & DEVLOGS",
      badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/30",
      description: "Public repositories, open-source toolkits, issue tracking, and code releases.",
      actionLabel: "View VeerMadan on GitHub",
      actionHref: "https://github.com/VeerMadan",
      meta: "Technical audits & source code",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#08040d] text-[#fafafa]">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-12 sm:py-20">
        
        {/* Header */}
        <div className="border-b border-fuchsia-500/20 pb-8 mb-12">
          <div className="flex items-center gap-2 font-mono text-xs text-orange-400 uppercase tracking-widest mb-3">
            <MessageSquare className="w-4 h-4 text-orange-400" />
            <span>DISPATCH CHANNELS // DIRECT CONTACT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Contact & Inquiries<span className="text-fuchsia-500">.</span>
          </h1>
          <p className="text-zinc-300 mt-2 max-w-2xl text-sm leading-relaxed">
            Reach out regarding bot support, commercial licensing, laboratory collaborations, or general questions.
          </p>
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {contactChannels.map((channel, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-[#0e0717] border border-white/10 flex flex-col justify-between hover:border-fuchsia-500/40 hover:bg-[#12091e] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">
                    {channel.title}
                  </h3>
                  <span className={`font-mono text-[10px] uppercase px-2.5 py-0.5 rounded border ${channel.badgeColor}`}>
                    {channel.badge}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed mb-6">
                  {channel.description}
                </p>
              </div>

              <div>
                <div className="font-mono text-[11px] text-zinc-500 mb-3 pb-3 border-t border-white/10">
                  {channel.meta}
                </div>

                <a
                  href={channel.actionHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#150a22] hover:bg-gradient-to-r hover:from-orange-500 hover:to-fuchsia-600 text-white font-semibold text-xs border border-fuchsia-500/20 transition-all w-full justify-center shadow-sm"
                >
                  <span>{channel.actionLabel}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Security Notice */}
        <div className="p-6 rounded-xl bg-[#0e0717] border border-fuchsia-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="font-mono text-xs text-orange-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Security & Vulnerability Disclosure</span>
            </div>
            <p className="text-xs text-zinc-300 max-w-xl">
              If you discover a security vulnerability in the bot, API endpoints, or website, please report it privately via direct message to Veer on Discord.
            </p>
          </div>
          <a
            href="https://discord.gg/R6ZrqpWEcc"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-fuchsia-600 hover:from-orange-400 hover:to-fuchsia-500 text-white font-bold text-xs transition-all whitespace-nowrap shadow-md shadow-fuchsia-600/20"
          >
            Report Privately
          </a>
        </div>

      </main>

      <Footer />
    </div>
  );
}
