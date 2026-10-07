import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { Radio, ArrowUpRight, ExternalLink } from "lucide-react";

interface Dispatch {
  id: string;
  category: string;
  tagColor: string;
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
      category: "FLAGSHIP RELEASE",
      tagColor: "bg-pink-500/10 text-pink-400 border-pink-500/30",
      date: "OCTOBER 7, 2026",
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
        label: "INSPECT BOT ARCHITECTURE",
        href: "/bot",
        isExternal: false,
      },
    },
    {
      id: "NW-2026-10-06",
      category: "STUDIO BROADCAST",
      tagColor: "bg-white/10 text-white border-white/20",
      date: "OCTOBER 6, 2026",
      time: "20:00 IST",
      title: "VePlexity Studio: Comeback Broadcast & Hardware Capture Rig Live",
      summary: "Full comeback live stream published on the official YouTube channel, marking the transition to the new multi-angle hardware capture and OBS automation system.",
      details: [
        "Low-latency HDMI camera matrix tested under live broadcast load.",
        "Dynamic OBS automation script switching scenes on voice detection and game telemetry.",
        "Live Q&A with community members covering upcoming bot and laboratory updates.",
      ],
      link: {
        label: "WATCH COMEBACK STREAM",
        href: "https://www.youtube.com/watch?v=dZvvx4SIkbM",
        isExternal: true,
      },
    },
    {
      id: "NW-2026-10-04",
      category: "COMMUNITY PATRONAGE",
      tagColor: "bg-pink-500/10 text-pink-400 border-pink-500/30",
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
        label: "OPEN SUPPORT HUB",
        href: "/support",
        isExternal: false,
      },
    },
    {
      id: "NW-2026-09-28",
      category: "R&D DIVISION",
      tagColor: "bg-white/10 text-white border-white/20",
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
        label: "VIEW LAB SPECS",
        href: "/labs",
        isExternal: false,
      },
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header (Rockstar Newswire Style) */}
        <div className="border-b border-white/10 pb-10 mb-14">
          <div className="flex items-center gap-2 font-mono text-xs text-pink-400 uppercase tracking-widest mb-3 font-bold">
            <Radio className="w-4 h-4" />
            <span>EDITORIAL DISPATCHES // OFFICIAL PRESS</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white">
            THE NEWSWIRE
          </h1>
          <p className="text-zinc-400 mt-3 max-w-2xl text-sm leading-relaxed font-medium">
            The chronologically verified publication channel for VePlexity releases, software changelogs, broadcasts, and network infrastructure.
          </p>
        </div>

        {/* Feed List */}
        <div className="space-y-10">
          {dispatches.map((item) => (
            <article
              key={item.id}
              className="p-8 sm:p-10 rounded-lg bg-[#0c0c0c] border border-white/10 transition-all hover:border-pink-500/50"
            >
              {/* Meta row */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 font-mono text-xs text-zinc-400 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-0.5 rounded font-black uppercase border ${item.tagColor}`}>
                    {item.category}
                  </span>
                  <span className="text-zinc-500 font-bold">{item.id}</span>
                </div>
                <div className="text-zinc-400 font-bold">
                  {item.date} • {item.time}
                </div>
              </div>

              {/* Title & Summary */}
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-4">
                {item.title}
              </h2>
              <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-normal">
                {item.summary}
              </p>

              {/* Bullet points */}
              <div className="space-y-2 mb-8 bg-black p-5 rounded border border-white/10">
                <div className="text-[11px] font-mono uppercase text-pink-400 font-bold mb-3 tracking-wider">
                  TECHNICAL HIGHLIGHTS:
                </div>
                <ul className="space-y-2 text-xs text-zinc-300 list-disc list-inside leading-relaxed">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="marker:text-pink-500">
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
                      className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black bg-white hover:bg-zinc-200 px-6 py-3 rounded transition-colors"
                    >
                      <span>{item.link.label}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <Link
                      href={item.link.href}
                      className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black bg-white hover:bg-zinc-200 px-6 py-3 rounded transition-colors"
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
