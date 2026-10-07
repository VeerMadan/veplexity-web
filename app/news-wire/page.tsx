import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { Radio, ArrowUpRight, ExternalLink, Calendar, Tag, Bot, Terminal, Coffee, Play } from "lucide-react";

interface Dispatch {
  id: string;
  category: "RELEASE" | "BROADCAST" | "R&D" | "PATRONAGE";
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
  title: "The News Wire — VePlexity Network Dispatches",
  description: "Official releases, technical changelogs, live broadcast alerts, and developer dispatches from VePlexity Network.",
};

export default function NewsWirePage() {
  const dispatches: Dispatch[] = [
    {
      id: "NW-2026-10-07",
      category: "RELEASE",
      date: "OCTOBER 7, 2026",
      time: "11:30 IST",
      title: "Commercial Discord Bot V2 Enters Production on Render Node",
      summary: "VePlexity Bot V2 is officially live as a commercial multi-server Discord bot hosted 24/7 on Render cloud nodes with full MongoDB Atlas state persistence.",
      details: [
        "101 modular slash commands loaded across Music, AI, Moderation, Utility, and Fun categories.",
        "Lossless music streaming engine with 24/7 channel retention and dynamic queue control.",
        "Integrated Google Gemini AI assistant with persona tuning and multi-modal comprehension.",
        "Web management dashboard live at veplexity.dev/dashboard for instantaneous server configuration.",
        "Direct Buy Me a Coffee support actions integrated into all major bot help and stats commands.",
      ],
      link: {
        label: "Inspect Bot V2 Architecture",
        href: "/bot",
        isExternal: false,
      },
    },
    {
      id: "NW-2026-10-06",
      category: "BROADCAST",
      date: "OCTOBER 6, 2026",
      time: "20:00 IST",
      title: "VePlexity Studio: Comeback Broadcast & Rig Operational",
      summary: "Full comeback live stream published on the official YouTube channel, marking the transition to the new multi-angle hardware capture and OBS automation system.",
      details: [
        "Low-latency HDMI camera matrix tested under live broadcast load.",
        "Dynamic OBS automation script switching scenes on voice detection and game telemetry.",
        "Live Q&A with community members covering upcoming bot and laboratory updates.",
      ],
      link: {
        label: "Watch Comeback Stream on YouTube",
        href: "https://www.youtube.com/watch?v=dZvvx4SIkbM",
        isExternal: true,
      },
    },
    {
      id: "NW-2026-10-04",
      category: "PATRONAGE",
      date: "OCTOBER 4, 2026",
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
      category: "R&D",
      date: "SEPTEMBER 28, 2026",
      time: "14:15 IST",
      title: "C++ Memory Hooking & Game Engine Architecture Experiments",
      summary: "Completed Phase 1 of custom runtime memory injection research targeting sandbox engines and dynamic DirectX render overlays.",
      details: [
        "Reverse engineering memory pointers for telemetry extraction in real-time.",
        "Custom lightweight DLL injection harness without third-party frameworks.",
        "Zero-drop frame rate overlay engine for diagnostic in-game HUDs.",
      ],
      link: {
        label: "View Labs Specification",
        href: "/labs",
        isExternal: false,
      },
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-[#fafafa]">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-12 sm:py-20">
        
        {/* Header */}
        <div className="border-b border-zinc-800 pb-8 mb-12">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 uppercase tracking-widest mb-3">
            <Radio className="w-4 h-4 text-emerald-400" />
            <span>DISPATCH ROOM // PUBLIC FEED</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            The News Wire
          </h1>
          <p className="text-zinc-400 mt-2 max-w-2xl text-sm leading-relaxed">
            The permanent, chronologically verified publication channel for VePlexity releases, software changelogs, broadcasts, and network infrastructure.
          </p>
        </div>

        {/* Feed List */}
        <div className="space-y-8">
          {dispatches.map((item) => (
            <article
              key={item.id}
              className="p-6 sm:p-8 rounded-lg bg-[#0d0d11] border border-zinc-800 transition-colors hover:border-zinc-700"
            >
              {/* Meta row */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 font-mono text-xs text-zinc-500 pb-4 border-b border-zinc-800/80">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold">
                    {item.category}
                  </span>
                  <span>{item.id}</span>
                </div>
                <div>
                  {item.date} • {item.time}
                </div>
              </div>

              {/* Title & Summary */}
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                {item.title}
              </h2>
              <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                {item.summary}
              </p>

              {/* Bullet points */}
              <div className="space-y-2 mb-6 bg-zinc-900/50 p-4 rounded border border-zinc-800/80">
                <div className="text-[11px] font-mono uppercase text-zinc-500 mb-2">Technical Highlights:</div>
                <ul className="space-y-1.5 text-xs text-zinc-400 list-disc list-inside leading-relaxed">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="marker:text-zinc-600">
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
                      className="inline-flex items-center gap-2 text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-md transition-colors"
                    >
                      <span>{item.link.label}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                    </a>
                  ) : (
                    <Link
                      href={item.link.href}
                      className="inline-flex items-center gap-2 text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-md transition-colors"
                    >
                      <span>{item.link.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
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
