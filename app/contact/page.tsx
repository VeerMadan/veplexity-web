import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MessageSquare, ExternalLink, ShieldCheck } from "lucide-react";
import { 
  MotionReveal, 
  MotionStaggerContainer, 
  MotionStaggerItem 
} from "../components/MotionReveal";

export const metadata = {
  title: "Contact & Security — VePlexity Studios",
  description: "Get in touch with Veer Madan and the VePlexity team for partnerships, bot support, or engineering inquiries.",
};

export default function ContactPage() {
  const contactChannels = [
    {
      title: "Discord Community HQ",
      badge: "Real-Time",
      description: "Join the official server for real-time bot support, feature suggestions, bug reporting, and direct discussion with Veer Madan.",
      actionLabel: "Join Discord Server",
      actionHref: "https://discord.gg/R6ZrqpWEcc",
      meta: "Average response: < 2 hours",
    },
    {
      title: "Creator Portfolio & Inquiries",
      badge: "Direct Line",
      description: "Direct personal portfolio and professional engineering contact channel for Veer Madan.",
      actionLabel: "Visit veermadan.dev",
      actionHref: "https://veermadan.dev",
      meta: "Professional & freelance inquiries",
    },
    {
      title: "YouTube Broadcast Channel",
      badge: "Official Media",
      description: "Comeback livestreams, video devlogs, laboratory hardware demos, and community premieres.",
      actionLabel: "Subscribe @VePlexity",
      actionHref: "https://youtube.com/@VePlexity",
      meta: "Official video dispatches",
    },
    {
      title: "GitHub Repositories",
      badge: "Source Code",
      description: "Public repositories, open-source toolkits, issue tracking, and code releases.",
      actionLabel: "View on GitHub",
      actionHref: "https://github.com/VeerMadan",
      meta: "Technical audits & source code",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#05070a] text-[#e5e7eb] relative selection:bg-purple-500/30">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-5 sm:px-8 py-16 relative z-10">
        
        {/* Header */}
        <MotionReveal delay={0.05} yOffset={20}>
          <div className="border-b border-white/[0.06] pb-10 mb-14">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 mb-3">
              <MessageSquare className="w-4 h-4 text-purple-400" />
              <span>Dispatch Channels • Direct Contact</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Contact & <span className="veer-gradient-text">Inquiries</span>
            </h1>
            <p className="text-zinc-400 mt-3 max-w-2xl text-sm md:text-base leading-relaxed font-normal">
              Reach out regarding bot support, commercial licensing, laboratory collaborations, or general technical questions.
            </p>
          </div>
        </MotionReveal>

        {/* Channels Grid */}
        <MotionStaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {contactChannels.map((channel, idx) => (
            <MotionStaggerItem key={idx}>
              <div className="p-8 rounded-2xl neo-glass flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold tracking-tight text-white">
                      {channel.title}
                    </h3>
                    <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-purple-300">
                      {channel.badge}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-normal">
                    {channel.description}
                  </p>
                </div>

                <div>
                  <div className="text-xs text-zinc-500 mb-4 pb-3 border-t border-white/[0.06]">
                    {channel.meta}
                  </div>

                  <a
                    href={channel.actionHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl neo-btn-primary text-xs w-full justify-center"
                  >
                    <span>{channel.actionLabel}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </MotionStaggerItem>
          ))}
        </MotionStaggerContainer>

        {/* Security Notice */}
        <MotionReveal yOffset={25}>
          <div className="p-8 rounded-2xl neo-glass flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="text-xs text-white uppercase tracking-wider flex items-center gap-2 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Security & Vulnerability Disclosure</span>
              </div>
              <p className="text-xs text-zinc-400 max-w-xl font-normal leading-relaxed">
                If you discover a security vulnerability in the bot, API endpoints, or website, please report it privately via direct message to Veer on Discord.
              </p>
            </div>
            <a
              href="https://discord.gg/R6ZrqpWEcc"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl neo-btn-glass text-xs whitespace-nowrap"
            >
              Report Privately
            </a>
          </div>
        </MotionReveal>

      </main>

      <Footer />
    </div>
  );
}
