import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, ExternalLink, Bot, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Terms of Service | VePlexity Commercial Bot",
  description: "Official Terms of Service for VePlexity Commercial Bot and Server Management Console.",
};

export default function VePlexityTermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0512] text-zinc-100 flex flex-col font-sans selection:bg-rose-500/30">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-5 sm:px-8 py-16 space-y-12 relative z-10">
        {/* Header */}
        <div className="space-y-4 border-b border-zinc-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/15 to-rose-500/15 border border-rose-500/30 text-rose-300 font-mono text-xs font-bold">
            <Bot className="w-4 h-4 text-orange-400" />
            <span>VEPLEXITY BOT • OFFICIAL TERMS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            TERMS OF SERVICE
          </h1>

          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
            <span>Last Updated: October 13, 2026</span>
            <span>•</span>
            <span className="text-orange-400 font-bold">Bot ID: 1556640364448714752</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              1. Agreement to Terms
            </h2>
            <p>
              Welcome to <strong>VePlexity Bot</strong> (&ldquo;the Bot&rdquo;, &ldquo;the Service&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;), developed and operated by VePlexity Network. By inviting VePlexity Bot to your Discord guild, executing its slash or hybrid prefix commands (<code>.</code>, <code>?</code>, <code>!</code>), or accessing the VePlexity Management Console at <code>veplexity.dev/discord-bots/veplexity</code>, you agree to be bound by these Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              2. Scope of Services &amp; 100 Commands
            </h2>
            <p>VePlexity Bot provides comprehensive community management infrastructure:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {[
                { title: "100% Free Moderation", desc: "Permanent free access to /ban, /kick, /warn, /timeout, .purge, /lock, and case-indexed mod logs." },
                { title: "24/7 Lossless Audio DSP", desc: "48kHz VOIP streaming with bass boost filters, volume calibration, queue looping, and 24/7 stay." },
                { title: "XP Leveling & Rank Cards", desc: "Custom rank card generator, voice & text XP tracking, level-up milestones, and role rewards." },
                { title: "Dynamic Temp Voice Hubs", desc: "Join-to-create voice channels that automatically spawn and clean up when members leave." },
                { title: "Google Gemini AI", desc: "Conversational multi-modal AI personas, server context memory, and automated assistance." },
                { title: "Reaction Roles & Menus", desc: "Interactive button and select menu role assignment without third-party paywalls." },
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
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              3. Discord Policy Adherence &amp; Age Requirements
            </h2>
            <p>
              Users must be at least 13 years old or the minimum legal age required in their country of residence. You must abide by the{" "}
              <a href="https://discord.com/terms" target="_blank" rel="noopener noreferrer" className="text-rose-400 underline font-bold">
                Discord Terms of Service
              </a>{" "}
              and{" "}
              <a href="https://discord.com/guidelines" target="_blank" rel="noopener noreferrer" className="text-rose-400 underline font-bold">
                Discord Community Guidelines
              </a>.
            </p>
            <p>
              Using VePlexity Bot to facilitate server raids, harassment, hate speech, automated spamming, or exploitation of Discord&apos;s API will result in immediate global server blacklisting without notice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              4. Administrator Responsibility
            </h2>
            <p>
              Server administrators maintain complete authority over channel permissions, role assignments, and moderator disciplinary actions. VePlexity provides automation tools; community administrators are solely accountable for actions taken by their moderators using our bot.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              5. Service Uptime &amp; Limitations
            </h2>
            <p>
              The Service is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis. While our 24/7 dedicated hosting nodes on Render maintain continuous uptime, we do not warrant uninterrupted operation. VePlexity is not liable for service disruptions caused by Discord API outages, cloud provider latency, or voice node reconnection cycles.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              6. Support &amp; Contact
            </h2>
            <p>For questions regarding these Terms or bot administration:</p>
            <ul className="list-disc pl-6 space-y-1 text-zinc-300 font-mono text-xs">
              <li><strong>Support Portal:</strong> <Link href="/support" className="text-rose-400 underline">veplexity.dev/support</Link></li>
              <li><strong>Support Email:</strong> support@veplexity.dev</li>
              <li><strong>Lead Developer:</strong> Veer Madan (<a href="https://veermadan.dev" target="_blank" rel="noopener noreferrer" className="text-rose-400 underline">veermadan.dev</a>)</li>
            </ul>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-zinc-800 flex items-center justify-between">
          <Link
            href="/discord-bot/veplexity"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to VePlexity Bot</span>
          </Link>

          <Link
            href="/discord-bot/veplexity/privacy"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-rose-400 hover:text-rose-300 transition-colors"
          >
            <span>VePlexity Privacy Policy →</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
