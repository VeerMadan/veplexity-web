import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { Lock, ArrowLeft, Bot, CheckCircle2, XCircle } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | VePlexity Commercial Bot",
  description: "Official Privacy Policy for VePlexity Commercial Bot and Server Management Console.",
};

export default function VePlexityPrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0512] text-zinc-100 flex flex-col font-sans selection:bg-rose-500/30">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-5 sm:px-8 py-16 space-y-12 relative z-10">
        {/* Header */}
        <div className="space-y-4 border-b border-zinc-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/15 to-rose-500/15 border border-rose-500/30 text-rose-300 font-mono text-xs font-bold">
            <Lock className="w-4 h-4 text-rose-400" />
            <span>VEPLEXITY BOT • OFFICIAL PRIVACY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            PRIVACY POLICY
          </h1>

          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
            <span>Last Updated: October 13, 2026</span>
            <span>•</span>
            <span className="text-rose-400 font-bold">Bot ID: 1556640364448714752</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              1. Information Collection &amp; Purpose
            </h2>
            <p>
              <strong>VePlexity Bot</strong> strictly adheres to the principle of data minimization. We only store data required to remember server configurations and manage automated actions configured by server administrators:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {[
                { title: "Server Identifiers (Guild IDs)", desc: "To map server settings, welcome messages, leveling rules, and modlog channels." },
                { title: "Channel & Role IDs", desc: "Configured by admins for modlogs, temp VC hubs, auto-roles, and suggestion feeds." },
                { title: "Moderation Case Metadata", desc: "Case index, reason, target user ID, moderator ID, and timestamp when /warn, /kick, or /ban is used." },
                { title: "XP Progression (Optional)", desc: "User IDs, message counter, voice minutes, and levels if leveling is enabled by administrators." },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#120a1d] border border-zinc-800 space-y-1">
                  <div className="flex items-center gap-2 text-rose-300 font-bold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
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
                "We do NOT store or log user message chat contents or direct message history.",
                "We do NOT record, intercept, or listen to voice chat audio streams.",
                "We do NOT collect, process, or store financial credentials or payment cards.",
                "We do NOT sell, license, or transfer user or server telemetry to third-party data brokers.",
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
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              3. Data Retention &amp; Security
            </h2>
            <p>
              All configurations and moderation logs are securely stored in MongoDB Atlas cloud clusters with encrypted-at-rest storage and TLS 1.3 transport encryption. Access to production databases is strictly restricted to authenticated application servers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              4. Right to Data Deletion (GDPR &amp; CCPA)
            </h2>
            <p>
              Server owners retain absolute ownership of their server data. You may request the immediate and permanent deletion of all data associated with your server:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-zinc-300 font-mono text-xs">
              <li>By removing VePlexity Bot from your server.</li>
              <li>By emailing your Guild ID to <code>privacy@veplexity.dev</code>.</li>
            </ul>
            <p className="pt-1">
              All matching server configurations, moderation logs, and leveling counters will be permanently deleted from our database within 48 hours.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              5. Privacy Inquiries
            </h2>
            <p>To exercise your privacy rights or contact our data protection team:</p>
            <ul className="list-disc pl-6 space-y-1 text-zinc-300 font-mono text-xs">
              <li><strong>Email:</strong> privacy@veplexity.dev</li>
              <li><strong>Support Discord:</strong> <Link href="/support" className="text-rose-400 underline">veplexity.dev/support</Link></li>
            </ul>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-zinc-800 flex items-center justify-between">
          <Link
            href="/discord-bots/veplexity"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to VePlexity Bot</span>
          </Link>

          <Link
            href="/discord-bots/veplexity/terms"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-rose-400 hover:text-rose-300 transition-colors"
          >
            <span>VePlexity Terms of Service →</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
