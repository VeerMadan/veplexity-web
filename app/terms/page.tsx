import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { ShieldCheck, FileText, ArrowLeft, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Terms of Service | VePlexity Network",
  description: "Official Terms of Service for VePlexity Bot, PingPlex, and VePlexity Network web services.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#0a0512] text-zinc-100 flex flex-col font-sans selection:bg-rose-500/30">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-5 sm:px-8 py-16 space-y-12 relative z-10">
        {/* Header */}
        <div className="space-y-4 border-b border-zinc-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/15 via-rose-500/15 to-fuchsia-500/15 border border-rose-500/30 text-rose-300 font-mono text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-rose-400" />
            <span>LEGAL &amp; COMPLIANCE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            TERMS OF SERVICE
          </h1>

          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
            <span>Last Updated: October 13, 2026</span>
            <span>•</span>
            <span>Applies to: VePlexity Bot &amp; PingPlex</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide">
              1. Acceptance of Terms
            </h2>
            <p>
              Welcome to <strong>VePlexity Network</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), provider of <strong>VePlexity Bot</strong> and <strong>PingPlex</strong> (&ldquo;the Services&rdquo;, &ldquo;the Bots&rdquo;). By inviting our Discord applications to your server, executing slash or prefix commands, or utilizing our web dashboard interfaces at <code>veplexity.dev</code>, you expressly agree to be bound by these Terms of Service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide">
              2. Description of Services
            </h2>
            <p>Our applications provide automated Discord community infrastructure, including:</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
              <li><strong>VePlexity Bot:</strong> 100% free moderation tools (<code>/ban</code>, <code>/kick</code>, <code>/warn</code>, <code>.purge</code>, <code>/lock</code>), 24/7 lossless audio streaming, join-to-create temporary voice channels, XP leveling progression, and Google Gemini AI conversational chatbot features.</li>
              <li><strong>PingPlex:</strong> Real-time creator alert engine dispatching notifications for YouTube uploads and live streams, Twitch broadcasts, TikTok video releases, X (Twitter) feeds, and Reddit subreddits.</li>
              <li><strong>Web Dashboard:</strong> Visual configuration portals hosted under <code>veplexity.dev</code> for server administrators.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide">
              3. Discord Policy Compliance &amp; Eligibility
            </h2>
            <p>
              You must meet Discord&apos;s minimum age requirement (at least 13 years of age, or the legal age of digital consent in your jurisdiction). By using our bots, you agree to strictly comply with Discord&apos;s official policies:
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="https://discord.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-rose-400 hover:text-rose-300 underline"
              >
                <span>Discord Terms of Service</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://discord.com/guidelines"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-rose-400 hover:text-rose-300 underline"
              >
                <span>Discord Community Guidelines</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="pt-2">
              Using our services for harassment, hate speech, spamming, raiding, intellectual property infringement, or any malicious activity is strictly prohibited and will result in immediate blacklisting.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide">
              4. Server Administrator Responsibilities
            </h2>
            <p>
              Server administrators retain full responsibility for managing bot permissions and the disciplinary actions executed by their moderation staff. VePlexity provides automation tools; server owners remain solely accountable for actions taken within their communities.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide">
              5. Intellectual Property
            </h2>
            <p>
              All software, custom branding, graphics, and interface designs related to VePlexity and PingPlex are the proprietary intellectual property of Veer Madan and the VePlexity development team.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide">
              6. Availability &amp; Disclaimer of Warranties
            </h2>
            <p>
              Our services are provided on an <strong>&ldquo;AS IS&rdquo;</strong> and <strong>&ldquo;AS AVAILABLE&rdquo;</strong> basis. While we strive for 99.9% uptime across our nodes, we do not guarantee uninterrupted availability. VePlexity shall not be held liable for any damages resulting from downtime, Discord API outages, or third-party platform rate limits.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide">
              7. Contact &amp; Inquiries
            </h2>
            <p>For questions or support regarding these Terms, contact our legal &amp; engineering team:</p>
            <ul className="list-disc pl-6 space-y-1 text-zinc-300 font-mono text-xs">
              <li><strong>Email:</strong> support@veplexity.dev / legal@veplexity.dev</li>
              <li><strong>Support Server:</strong> <Link href="/support" className="text-rose-400 underline">veplexity.dev/support</Link></li>
              <li><strong>Creator Portfolio:</strong> <a href="https://veermadan.dev" target="_blank" rel="noopener noreferrer" className="text-rose-400 underline">veermadan.dev</a></li>
            </ul>
          </section>
        </div>

        {/* Back Link */}
        <div className="pt-8 border-t border-zinc-800 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Overview</span>
          </Link>

          <Link
            href="/privacy"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-rose-400 hover:text-rose-300 transition-colors"
          >
            <span>Read Privacy Policy →</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
