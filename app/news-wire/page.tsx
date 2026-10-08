import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { Radio, ArrowUpRight, ExternalLink } from "lucide-react";

interface Dispatch {
  id: string;
  category: string;
  date: string;
  time: string;
  title: string;
  summary: string;
  details: string[];
  link?: {
    label: string;
    href: string;
    isExternal?: boolean;
  };
}

export const metadata = {
  title: "The Newswire — VePlexity Official Dispatches",
  description: "Official releases, technical changelogs, live broadcast alerts, and developer dispatches from VePlexity Studios.",
};

export default function NewsWirePage() {
  const dispatches: Dispatch[] = [
    {
      id: "NW-2026-10-07",
      category: "Flagship Release",
      date: "October 7, 2026",
      time: "11:30 IST",
      title: "Commercial Discord Bot V2 Enters Production Across 101 Commands",
      summary: "VePlexity Bot V2 is officially live as a multi-server commercial platform hosted 24/7 on Render cloud nodes with full MongoDB Atlas state persistence.",
      details: [
        "101 modular slash commands loaded across Music, AI, Moderation, Utility, and Fun categories.",
        "Lossless music streaming engine with 24/7 channel retention and dynamic queue control.",
        "Integrated Google Gemini AI assistant with persona tuning and multi-modal comprehension.",
        "Web management dashboard live at veplexity.dev/dashboard for instantaneous server configuration.",
        "Direct Buy Me a Coffee support actions integrated into all major bot help and stats commands.",
      ],
      link: {
        label: "Inspect Bot Architecture",
        href: "/bot",
        isExternal: false,
      },
    },
    {
      id: "NW-2026-10-06",
      category: "Studio Broadcast",
      date: "October 6, 2026",
      time: "20:00 IST",
      title: "VePlexity Studio: Comeback Broadcast & Hardware Capture Rig Live",
      summary: "Full comeback live stream published on the official YouTube channel, marking the transition to the new multi-angle hardware capture and OBS automation system.",
      details: [
        "Low-latency HDMI camera matrix tested under live broadcast load.",
        "Dynamic OBS automation script switching scenes on voice detection and game telemetry.",
        "Live Q&A with community members covering upcoming bot and laboratory updates.",
      ],
      link: {
        label: "Watch Comeback Stream",
        href: "https://www.youtube.com/watch?v=dZvvx4SIkbM",
        isExternal: true,
      },
    },
    {
      id: "NW-2026-10-04",
      category: "Community Patronage",
      date: "October 4, 2026",
      time: "16:45 IST",
      title: "Official Buy Me a Coffee Support Hub Deployed",
      summary: "Community patronage infrastructure established to directly support cloud server upkeep, domain infrastructure, and studio hardware development.",
      details: [
        "Direct link active at buymeacoffee.com/veplexity1.",
        "High-resolution scan QR code deployed across website, bot embeds, and dashboard.",
        "Supporters receive custom VIP Discord roles, early build access, and direct priority support.",
      ],
      link: {
        label: "Open Support Hub",
        href: "/support",
        isExternal: false,
      },
    },
    {
      id: "NW-2026-09-28",
      category: "R&D Division",
      date: "September 28, 2026",
      time: "14:15 IST",
      title: "C++ Memory Hooking & Game Engine Architecture Experiments",
      summary: "Completed Phase 1 of custom runtime memory injection research targeting sandbox engines and dynamic DirectX render overlays.",
      details: [
        "Reverse engineering memory pointers for telemetry extraction in real-time.",
        "Custom lightweight DLL injection harness without third-party frameworks.",
        "Zero-drop frame rate overlay engine for diagnostic in-game HUDs.",
      ],
      link: {
        label: "View Lab Specs",
        href: "/labs",
        isExternal: false,
      },
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#05070a] text-[#e5e7eb]">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-5 sm:px-8 py-16">
        
        {/* Header */}
        <div className="border-b border-white/5 pb-10 mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
            <Radio className="w-4 h-4 text-zinc-300" />
            <span>Editorial Dispatches • Official Press</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            The Technical Newswire
          </h1>
          <p className="text-zinc-400 mt-3 max-w-2xl text-sm md:text-base leading-relaxed font-normal">
            The chronologically verified publication channel for VePlexity releases, software changelogs, broadcasts, and network infrastructure.
          </p>
        </div>

        {/* Feed List */}
        <div className="space-y-8">
          {dispatches.map((item) => (
            <article
              key={item.id}
              className="p-8 sm:p-10 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all"
            >
              {/* Meta row */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 text-xs text-zinc-400 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-zinc-300">
                    {item.category}
                  </span>
                  <span className="text-zinc-500 font-mono text-xs">{item.id}</span>
                </div>
                <div className="text-zinc-400 font-medium">
                  {item.date} • {item.time}
                </div>
              </div>

              {/* Title & Summary */}
              <h2 className="text-2xl font-bold tracking-tight text-white mb-3 leading-snug">
                {item.title}
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-normal">
                {item.summary}
              </p>

              {/* Bullet points */}
              <div className="space-y-2.5 mb-8 bg-black/40 p-5 rounded-xl border border-white/5">
                <div className="text-xs font-semibold uppercase text-zinc-300 tracking-wider mb-2">
                  Technical Highlights
                </div>
                <ul className="space-y-2 text-xs text-zinc-400 list-disc list-inside leading-relaxed font-normal">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="marker:text-zinc-500">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              {item.link && (
                <div className="pt-2">
                  {item.link.isExternal ? (
                    <a
                      href={item.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-black bg-white hover:bg-zinc-200 px-5 py-2.5 rounded-xl transition-colors shadow-sm"
                    >
                      <span>{item.link.label}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <Link
                      href={item.link.href}
                      className="inline-flex items-center gap-2 text-xs font-bold text-black bg-white hover:bg-zinc-200 px-5 py-2.5 rounded-xl transition-colors shadow-sm"
                    >
                      <span>{item.link.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
