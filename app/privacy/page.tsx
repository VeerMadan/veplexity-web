import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { Lock, ShieldCheck, ArrowLeft, ExternalLink, CheckCircle2, XCircle } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | VePlexity Network",
  description: "Official Privacy Policy for VePlexity Bot, PingPlex, and VePlexity Network web services.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0a0512] text-zinc-100 flex flex-col font-sans selection:bg-rose-500/30">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-5 sm:px-8 py-16 space-y-12 relative z-10">
        {/* Header */}
        <div className="space-y-4 border-b border-zinc-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/15 via-rose-500/15 to-fuchsia-500/15 border border-rose-500/30 text-rose-300 font-mono text-xs font-bold">
            <Lock className="w-4 h-4 text-rose-400" />
            <span>DATA PROTECTION &amp; PRIVACY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            PRIVACY POLICY
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
              1. Overview &amp; Commitment
            </h2>
            <p>
              At <strong>VePlexity Network</strong>, we believe in radical privacy and data minimization. This Privacy Policy describes how data is handled across <strong>VePlexity Bot</strong>, <strong>PingPlex</strong>, and our web portal at <code>veplexity.dev</code>. We collect only what is strictly necessary to provide Discord server utilities.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide">
              2. Data We Collect
            </h2>
            <p>Our applications store only operational Discord IDs and configuration preferences:</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Guild & Channel IDs", desc: "Discord snowflakes used to associate settings with specific servers, modlog channels, and alert destinations." },
                { title: "Role IDs", desc: "Configured roles for auto-roles on join, reaction role menus, and moderator permission verification." },
                { title: "Moderation Case Metadata", desc: "Case index, reason, target user ID, moderator ID, and timestamp when /warn, /kick, or /ban is used." },
                { title: "Creator Alert Targets", desc: "Public YouTube channel IDs, Twitch usernames, TikTok handles, and subreddit names configured for PingPlex." },
                { title: "XP Progression (Optional)", desc: "User IDs, message counters, voice minutes, and levels if server leveling is enabled by administrators." },
                { title: "Temporary VC State", desc: "In-memory tracking of active dynamic voice rooms, cleanly discarded when empty." },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#120a1d] border border-zinc-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-300 font-bold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-zinc-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide">
              3. What We NEVER Collect
            </h2>

            <div className="space-y-2.5">
              {[
                "We do NOT read or persist full message contents or chat history transcripts.",
                "We do NOT collect, store, or process personal payment cards or banking information.",
                "We do NOT sell, rent, license, or monetize any server data to third parties or advertising brokers.",
                "We do NOT monitor, record, or store VOIP voice chat audio streams.",
              ].map((text, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-red-950/20 border border-red-500/20 text-xs sm:text-sm text-red-200">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide">
              4. Data Storage &amp; Encryption
            </h2>
            <p>
              All configuration databases are hosted in private MongoDB Atlas cloud clusters. All transmission between Discord&apos;s gateway, our bots, and the web dashboard is secured using modern TLS 1.3 encryption. Internal access requires secure credential rotation and strict authentication barriers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide">
              5. Right to Data Deletion (GDPR &amp; CCPA Compliance)
            </h2>
            <p>
              Server administrators have complete autonomy over their data. You may request the immediate deletion of all configurations, cases, and logs associated with your server at any time:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-zinc-300">
              <li>By removing the bot from your Discord server.</li>
              <li>By sending an email request to <code>privacy@veplexity.dev</code> with your Server ID (Guild Snowflake).</li>
            </ul>
            <p className="pt-1">
              Data deletion requests are executed within 48 hours, permanently purging all matching records from our cloud database.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide">
              6. Developer Policy Compliance
            </h2>
            <p>
              Our applications operate in full compliance with the{" "}
              <a
                href="https://discord.com/developers/docs/policies-and-agreements/developer-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rose-400 hover:text-rose-300 underline font-semibold"
              >
                Discord Developer Policy
              </a>{" "}
              and the{" "}
              <a
                href="https://discord.com/developers/docs/policies-and-agreements/developer-terms-of-service"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rose-400 hover:text-rose-300 underline font-semibold"
              >
                Discord Developer Terms of Service
              </a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide">
              7. Privacy Contact
            </h2>
            <p>To exercise your data privacy rights or report a vulnerability, contact:</p>
            <ul className="list-disc pl-6 space-y-1 text-zinc-300 font-mono text-xs">
              <li><strong>Email:</strong> privacy@veplexity.dev</li>
              <li><strong>Support Portal:</strong> <Link href="/support" className="text-rose-400 underline">veplexity.dev/support</Link></li>
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
            href="/terms"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-rose-400 hover:text-rose-300 transition-colors"
          >
            <span>Read Terms of Service →</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
