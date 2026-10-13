import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { Lock, ArrowLeft, Radio, CheckCircle2, XCircle } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | PingPlex Creator Bot",
  description: "Official Privacy Policy for PingPlex Creator Stream & Video Alert Engine.",
};

export default function PingPlexPrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0512] text-zinc-100 flex flex-col font-sans selection:bg-fuchsia-500/30">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-5 sm:px-8 py-16 space-y-12 relative z-10">
        {/* Header */}
        <div className="space-y-4 border-b border-zinc-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-fuchsia-500/15 to-purple-500/15 border border-fuchsia-500/30 text-fuchsia-300 font-mono text-xs font-bold">
            <Lock className="w-4 h-4 text-fuchsia-400" />
            <span>PINGPLEX CREATOR BOT • OFFICIAL PRIVACY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            PRIVACY POLICY
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
              1. Information Collection &amp; Purpose
            </h2>
            <p>
              <strong>PingPlex</strong> is engineered with radical data minimization. We only store public identifiers necessary to route notifications from creator platforms into Discord channels:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {[
                { title: "Server Identifiers (Guild IDs)", desc: "Discord snowflakes used to map configured feeds and target notification channels." },
                { title: "Target Channel & Role IDs", desc: "Discord text channel IDs and optional ping role snowflakes configured by admins." },
                { title: "Public Creator Targets", desc: "Public YouTube channel IDs, Twitch usernames, TikTok handles, and subreddit names." },
                { title: "Message Template Preferences", desc: "Custom notification message text and dynamic variable syntax configured for announcements." },
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
              <span className="w-2 h-2 rounded-full bg-red-500" />
              2. Data We NEVER Collect or Store
            </h2>
            <div className="space-y-2.5">
              {[
                "We do NOT read, store, or monitor Discord user messages, chat history, or private conversations.",
                "We do NOT access private social media accounts or require user login credentials for third-party platforms.",
                "We do NOT collect, store, or process personal payment information.",
                "We do NOT sell, license, or transfer server data to advertisers or third-party brokers.",
              ].map((text, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-red-950/20 border border-red-500/20 text-xs sm:text-sm text-red-200">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-fuchsia-500" />
              3. Data Storage &amp; Infrastructure
            </h2>
            <p>
              PingPlex maintains an independent, isolated database cluster on MongoDB Atlas. All API communication between PingPlex&apos;s Render worker nodes and Discord&apos;s gateway is encrypted using TLS 1.3.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              4. Data Deletion Rights (GDPR &amp; CCPA)
            </h2>
            <p>
              Server administrators may permanently purge all stored alert targets and channel configurations at any time:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-zinc-300 font-mono text-xs">
              <li>By removing PingPlex from the Discord server.</li>
              <li>By sending a deletion request with your Guild ID to <code>privacy@veplexity.dev</code>.</li>
            </ul>
            <p className="pt-1">
              Matching database records will be permanently erased within 48 hours.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-fuchsia-500" />
              5. Contact Information
            </h2>
            <p>To exercise your data privacy rights or inquire about PingPlex telemetry:</p>
            <ul className="list-disc pl-6 space-y-1 text-zinc-300 font-mono text-xs">
              <li><strong>Email:</strong> privacy@veplexity.dev / support@veplexity.dev</li>
              <li><strong>Support Portal:</strong> <Link href="/support" className="text-fuchsia-400 underline">veplexity.dev/support</Link></li>
            </ul>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-zinc-800 flex items-center justify-between">
          <Link
            href="/discord-bot/pingplex"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to PingPlex</span>
          </Link>

          <Link
            href="/discord-bot/pingplex/terms"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
          >
            <span>PingPlex Terms of Service →</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
