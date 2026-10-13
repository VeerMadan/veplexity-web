import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { Radio, ArrowLeft, ExternalLink, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Terms of Service | PingPlex Creator Bot",
  description: "Official Terms of Service for PingPlex Creator Stream & Video Alert Engine.",
};

export default function PingPlexTermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0512] text-zinc-100 flex flex-col font-sans selection:bg-fuchsia-500/30">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-5 sm:px-8 py-16 space-y-12 relative z-10">
        {/* Header */}
        <div className="space-y-4 border-b border-zinc-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-fuchsia-500/15 to-purple-500/15 border border-fuchsia-500/30 text-fuchsia-300 font-mono text-xs font-bold">
            <Radio className="w-4 h-4 text-fuchsia-400" />
            <span>PINGPLEX CREATOR BOT • OFFICIAL TERMS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            TERMS OF SERVICE
          </h1>

          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
            <span>Last Updated: October 13, 2026</span>
            <span>•</span>
            <span className="text-fuchsia-400 font-bold">Bot ID: 1559520031916687430</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-fuchsia-500" />
              1. Acceptance of Terms
            </h2>
            <p>
              Welcome to <strong>PingPlex</strong> (&ldquo;the Bot&rdquo;, &ldquo;the Service&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;), a zero-delay creator stream and video notification engine developed by VePlexity Network. By inviting PingPlex to your Discord server or using the PingPlex Creator Studio at <code>veplexity.dev/discord-bots/pingplex</code>, you agree to these Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              2. Scope of Alert Services
            </h2>
            <p>PingPlex monitors public third-party creator feeds and relays live announcements into designated Discord channels:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {[
                { title: "YouTube Video & Streams", desc: "Monitors public YouTube channels for new video uploads, Shorts, and live broadcasts." },
                { title: "Twitch Webhook Alerts", desc: "Low-latency stream start announcements with stream titles and game categories." },
                { title: "TikTok Drops", desc: "Real-time alerts whenever a tracked creator shares a new public TikTok video." },
                { title: "X (Twitter) Feed Sync", desc: "Relays creator tweets and status updates into community channels." },
                { title: "Subreddit Watchers", desc: "Tracks specified subreddits for hot, new, or top community discussion posts." },
                { title: "Custom Mention Roles", desc: "Customizes announcement embeds with designated ping roles and dynamic variables." },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#140b20] border border-zinc-800 space-y-1">
                  <div className="flex items-center gap-2 text-fuchsia-300 font-bold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-zinc-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-fuchsia-500" />
              3. Third-Party Platform Compliance
            </h2>
            <p>
              PingPlex accesses only public RSS feeds and authorized developer APIs provided by YouTube, Twitch, Reddit, and related platforms. Our service is not affiliated with or endorsed by YouTube, Twitch Interactive, TikTok, X Corp, or Reddit Inc.
            </p>
            <p>
              Users must ensure that tracked channels comply with the{" "}
              <a href="https://discord.com/terms" target="_blank" rel="noopener noreferrer" className="text-fuchsia-400 underline font-bold">
                Discord Terms of Service
              </a>{" "}
              and applicable third-party content guidelines.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              4. Server Administrator Responsibility
            </h2>
            <p>
              Administrators are solely responsible for configuring channel destinations, announcement permissions, and mention roles. PingPlex provides automated dispatch tools; server owners remain accountable for content relayed into their communities.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-fuchsia-500" />
              5. Disclaimer of Warranties
            </h2>
            <p>
              PingPlex is provided &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo;. Notification delivery relies on external platform feed updates. While our polling workers operate with sub-minute intervals, we do not guarantee zero-delay delivery during third-party API rate limits or outages.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              6. Contact Information
            </h2>
            <p>For questions or support regarding PingPlex:</p>
            <ul className="list-disc pl-6 space-y-1 text-zinc-300 font-mono text-xs">
              <li><strong>Support Portal:</strong> <Link href="/support" className="text-fuchsia-400 underline">veplexity.dev/support</Link></li>
              <li><strong>Support Email:</strong> support@veplexity.dev</li>
              <li><strong>Lead Developer:</strong> Veer Madan (<a href="https://veermadan.dev" target="_blank" rel="noopener noreferrer" className="text-fuchsia-400 underline">veermadan.dev</a>)</li>
            </ul>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-zinc-800 flex items-center justify-between">
          <Link
            href="/discord-bots/pingplex"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to PingPlex</span>
          </Link>

          <Link
            href="/discord-bots/pingplex/privacy"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
          >
            <span>PingPlex Privacy Policy →</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
