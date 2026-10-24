"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  motion, 
  useMotionValue, 
  useTransform, 
  useSpring,
  AnimatePresence 
} from "framer-motion";
import { 
  ChevronRight, ExternalLink, Music, Radio, Shield, Zap, 
  Sparkles, Copy, Check, Server, Sliders, Bot, Headphones, 
  ArrowRight, ShieldCheck
} from "lucide-react";
import { DiscordLogo, DiscordVerifiedBadge, DiscordAppPill } from "@/app/components/BrandIcons";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { dashboardAudio } from "@/lib/dashboardAudio";

/* ─── 3D TILT INTERACTIVE BOT SELECTION CARD ────────────────────────────── */
interface BotCardProps {
  id: "veplexity" | "pingplex";
  name: string;
  tagline: string;
  avatarUrl: string;
  fallbackAvatar: string;
  statusText: string;
  statusBadge: string;
  accentRgb: string; // e.g. "249, 115, 22"
  accentGradient: string;
  borderHoverColor: string;
  shadowGlow: string;
  exploreHref: string;
  inviteHref: string;
  dashboardHref: string;
  dashboardLabel: string;
  features: Array<{ icon: React.ElementType; label: string }>;
  termsHref: string;
  privacyHref: string;
  onExplore: (href: string) => void;
}

function SelectionBotCard({
  id,
  name,
  tagline,
  avatarUrl,
  fallbackAvatar,
  statusText,
  statusBadge,
  accentRgb,
  accentGradient,
  borderHoverColor,
  shadowGlow,
  exploreHref,
  inviteHref,
  dashboardHref,
  dashboardLabel,
  features,
  termsHref,
  privacyHref,
  onExplore,
}: BotCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 3D Tilt Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 22 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    setMousePos({ x: mouseX, y: mouseY });
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative rounded-[32px] bg-[#0c0514]/85 border-2 border-white/[0.08] ${borderHoverColor} p-7 sm:p-9 flex flex-col justify-between backdrop-blur-2xl transition-colors duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_24px_50px_rgba(0,0,0,0.7)] ${shadowGlow}`}
    >
      {/* Dynamic Cursor Spotlight Glare */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${accentRgb}, 0.16), transparent 65%)`,
        }}
      />

      {/* Top Ambient Glow */}
      <div 
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-40 opacity-40 blur-3xl transition-opacity group-hover:opacity-75"
        style={{ background: `radial-gradient(ellipse at top, rgba(${accentRgb}, 0.35), transparent 70%)` }}
      />

      <div className="relative z-10 space-y-6" style={{ transform: "translateZ(30px)" }}>
        
        {/* Top Header Row: Status & Category Pill */}
        <div className="flex items-center justify-between">
          <span 
            className="text-[11px] font-mono px-3 py-1 rounded-full font-bold uppercase tracking-wider border shadow-sm"
            style={{
              backgroundColor: `rgba(${accentRgb}, 0.12)`,
              borderColor: `rgba(${accentRgb}, 0.3)`,
              color: `rgb(${accentRgb})`,
            }}
          >
            {statusBadge}
          </span>

          <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{statusText}</span>
          </div>
        </div>

        {/* Center: Scaled Crisp Unboxed Avatar (Zero box wrapper around PNG) */}
        <div className="flex flex-col items-center text-center space-y-4 pt-2">
          <motion.div 
            animate={isHovered ? { y: -8, scale: 1.05 } : { y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="relative flex items-center justify-center cursor-pointer"
            onClick={() => onExplore(exploreHref)}
          >
            {/* Soft Ambient Behind Avatar */}
            <div 
              className="absolute w-36 h-36 rounded-full blur-2xl opacity-40 group-hover:opacity-90 transition-opacity duration-500"
              style={{ backgroundColor: `rgba(${accentRgb}, 0.4)` }}
            />

            <img
              src={avatarUrl}
              alt={`${name} Avatar`}
              className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 object-contain filter drop-shadow-[0_16px_30px_rgba(0,0,0,0.8)]"
              onError={(e) => { e.currentTarget.src = fallbackAvatar; }}
            />
          </motion.div>

          {/* Title & Verified Badges */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-300"
                style={{
                  backgroundImage: isHovered ? accentGradient : undefined,
                }}
              >
                {name}
              </h2>
              <DiscordVerifiedBadge className="w-6 h-6 shrink-0" />
              <DiscordAppPill />
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 font-medium max-w-sm mx-auto">
              {tagline}
            </p>
          </div>
        </div>

        {/* Visual 4-Chip Feature Strip (Minimal Text, Icon Dominant) */}
        <div className="grid grid-cols-2 gap-2.5 pt-2">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="flex items-center gap-2 p-2.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-xs font-mono text-zinc-200 transition-colors shadow-sm"
              >
                <div 
                  className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `rgba(${accentRgb}, 0.15)` }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: `rgb(${accentRgb})` }} />
                </div>
                <span className="truncate font-semibold">{feat.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Deck: Primary Explore + Sub Actions */}
      <div className="relative z-10 pt-6 space-y-3" style={{ transform: "translateZ(35px)" }}>
        
        {/* Main Explore CTA (Large Neo-Glass Button) */}
        <button
          onClick={() => onExplore(exploreHref)}
          className="w-full py-4 px-6 rounded-2xl text-white font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2.5 shadow-xl transition-all duration-300 active:scale-[0.98] group/btn cursor-pointer relative overflow-hidden"
          style={{
            background: accentGradient,
            boxShadow: `0 12px 30px rgba(${accentRgb}, 0.3), inset 0 1px 0 rgba(255,255,255,0.25)`,
          }}
        >
          <span className="relative z-10">EXPLORE {name.toUpperCase()}</span>
          <ChevronRight className="w-4 h-4 relative z-10 transition-transform duration-200 group-hover/btn:translate-x-1.5" />
          
          {/* Gentle Shimmer */}
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
        </button>

        {/* Secondary Quick Action Row: Add to Server & Launch Dashboard */}
        <div className="grid grid-cols-2 gap-2.5">
          <a
            href={inviteHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => dashboardAudio.playClick()}
            className="py-2.5 px-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] hover:border-white/20"
          >
            <DiscordLogo className="w-3.5 h-3.5" fill="#ffffff" />
            <span>Add to Server</span>
            <ExternalLink className="w-3 h-3 text-zinc-400" />
          </a>

          <Link
            href={dashboardHref}
            onClick={() => dashboardAudio.playClick()}
            className="py-2.5 px-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] hover:border-white/20"
          >
            <Server className="w-3.5 h-3.5" style={{ color: `rgb(${accentRgb})` }} />
            <span>{dashboardLabel}</span>
          </Link>
        </div>

        {/* Minimal Legal Links Strip */}
        <div className="flex items-center justify-center gap-3 pt-1 text-[11px] font-mono text-zinc-500">
          <Link href={termsHref} className="hover:text-zinc-300 transition-colors underline">
            Terms of Service
          </Link>
          <span>•</span>
          <Link href={privacyHref} className="hover:text-zinc-300 transition-colors underline">
            Privacy Policy
          </Link>
        </div>

      </div>
    </motion.div>
  );
}

/* ─── MAIN DISCORD BOTS SELECTION PAGE ──────────────────────────────────── */
export default function DiscordBotsHubPage() {
  const router = useRouter();
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const upiId = "madan.45@superyes";

  const handleExplore = (href: string) => {
    dashboardAudio.playClick();
    setIsNavigating(true);
    setTimeout(() => {
      router.push(href);
    }, 180);
  };

  const handleCopyUpi = () => {
    try {
      dashboardAudio.playClick();
      navigator.clipboard.writeText(upiId);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2200);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-[#06020a] text-zinc-100 flex flex-col font-sans relative selection:bg-rose-500/30 overflow-x-hidden">
      <Navbar />

      {/* Atmospheric GTA 6 Sunset Ambient Glows */}
      <div className="fixed top-0 left-1/4 w-[750px] h-[750px] bg-[radial-gradient(circle,rgba(249,115,22,0.14)_0%,transparent_70%)] blur-[170px] pointer-events-none" />
      <div className="fixed top-1/3 right-1/4 w-[750px] h-[750px] bg-[radial-gradient(circle,rgba(217,70,239,0.12)_0%,transparent_70%)] blur-[170px] pointer-events-none" />

      {/* Subtle Technical Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 relative z-10 flex flex-col justify-center space-y-10">
        
        {/* ─── 1. MINIMALIST CINEMATIC HEADER (MINIMUM TEXT, MAXIMUM IMPACT) ─ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-3 max-w-2xl mx-auto"
        >
          {/* Animated Sunset Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/15 via-rose-500/15 to-fuchsia-500/15 border border-rose-500/30 text-[11px] font-mono text-rose-300 font-bold uppercase tracking-widest shadow-lg shadow-rose-500/5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span>DISCORD ECOSYSTEM // DUAL APPLICATIONS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-none">
            SELECT YOUR <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-500 to-fuchsia-500 drop-shadow-[0_0_35px_rgba(244,63,94,0.35)]">
              DISCORD BOT
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 font-normal max-w-md mx-auto">
            Choose a platform below to explore interactive live command simulators, server features, and cloud dashboards.
          </p>
        </motion.div>

        {/* ─── 2. THE DUAL BOT SELECTION CARDS (3D TILT, EYE CANDY, MINIMAL TEXT) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-stretch max-w-5xl mx-auto w-full">
          
          {/* ════ CARD 1: VEPLEXITY BOT ════ */}
          <SelectionBotCard
            id="veplexity"
            name="VePlexity"
            tagline="All-in-One Flagship Community & 48kHz Audio Powerhouse"
            avatarUrl="/bots/veplexity-avatar.png"
            fallbackAvatar="/vp-no-bg.png"
            statusText="Lossless Online"
            statusBadge="COMMERCIAL BOT"
            accentRgb="249, 115, 22"
            accentGradient="linear-gradient(135deg, #f97316 0%, #f43f5e 50%, #d946ef 100%)"
            borderHoverColor="hover:border-orange-500/60"
            shadowGlow="hover:shadow-[0_0_50px_rgba(249,115,22,0.22)]"
            exploreHref="/discord-bot/veplexity"
            inviteHref="/invite"
            dashboardHref="/discord-bots/veplexity/dashboard"
            dashboardLabel="Dashboard"
            termsHref="/discord-bot/veplexity/terms"
            privacyHref="/discord-bot/veplexity/privacy"
            onExplore={handleExplore}
            features={[
              { icon: Music, label: "48kHz Lossless DSP" },
              { icon: Shield, label: "100% Free AutoMod" },
              { icon: Bot, label: "Google Gemini 2.5 AI" },
              { icon: Headphones, label: "24/7 Channel Lock" },
            ]}
          />

          {/* ════ CARD 2: PINGPLEX BOT ════ */}
          <SelectionBotCard
            id="pingplex"
            name="PingPlex"
            tagline="Zero-Delay Creator Social Alert & Live Webhook Engine"
            avatarUrl="/bots/pingplex-avatar.png"
            fallbackAvatar="/bots/pp.png"
            statusText="Render Live"
            statusBadge="CREATOR ALERTS"
            accentRgb="217, 70, 239"
            accentGradient="linear-gradient(135deg, #d946ef 0%, #9333ea 50%, #f43f5e 100%)"
            borderHoverColor="hover:border-fuchsia-500/60"
            shadowGlow="hover:shadow-[0_0_50px_rgba(217,70,239,0.22)]"
            exploreHref="/discord-bot/pingplex"
            inviteHref="/invite/pingplex"
            dashboardHref="/discord-bots/pingplex/dashboard"
            dashboardLabel="Studio"
            termsHref="/discord-bot/pingplex/terms"
            privacyHref="/discord-bot/pingplex/privacy"
            onExplore={handleExplore}
            features={[
              { icon: Radio, label: "YouTube Atom RSS" },
              { icon: Zap, label: "Twitch EventSub" },
              { icon: Sliders, label: "1-Click Presets" },
              { icon: Sparkles, label: "Unlimited Free Feeds" },
            ]}
          />

        </div>

        {/* ─── 3. FLOATING MINIMAL FOOTER DOCK (LEGAL & SUPPORT ONLY) ──────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="max-w-5xl mx-auto w-full p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-400 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-white">96 Slash Commands</span>
            <span>•</span>
            <span>Zero Paywalls</span>
            <span>•</span>
            <span>24/7 Hosting Nodes</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyUpi}
              className="px-2.5 py-1 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 transition flex items-center gap-1.5 cursor-pointer text-[11px]"
            >
              <span>🇮🇳 UPI: {upiId}</span>
              {copiedUpi ? (
                <Check className="w-3 h-3 text-emerald-400" />
              ) : (
                <Copy className="w-3 h-3 text-zinc-400" />
              )}
            </button>

            <a
              href="https://www.buymeacoffee.com/veplexity1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors underline text-[11px]"
            >
              ☕ Buy Me a Coffee
            </a>
          </div>
        </motion.div>

      </main>

      <Footer />
    </div>
  );
}
