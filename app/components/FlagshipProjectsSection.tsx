"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Bot, Camera, Tv, Download, Terminal, Cpu, ShieldCheck, 
  Sparkles, ArrowRight, ExternalLink, Play, Layers, Zap, CheckCircle2 
} from "lucide-react";
import RevealText from "./RevealText";

interface ProjectData {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  status: string;
  category: string;
  accentColor: string;
  borderGlow: string;
  activeTabGradient: string;
  icon: React.ReactNode;
  heroImage?: string;
  previewType: "image" | "architecture" | "video_preview";
  description: string;
  architectureHighlights: string[];
  specs: { label: string; value: string }[];
  techStack: string[];
  primaryAction: { label: string; href: string; external?: boolean };
  secondaryAction?: { label: string; href: string; external?: boolean };
}

const FLAGSHIP_PROJECTS: ProjectData[] = [
  {
    id: "veplexity-bot",
    name: "VePlexity Bot",
    tagline: "Commercial Cloud Discord Infrastructure & 101 Command Engine",
    badge: "CLOUD NODE 24/7",
    status: "OPERATIONAL",
    category: "Cloud Daemon & Community Automation",
    accentColor: "from-orange-500 to-amber-500",
    borderGlow: "hover:border-orange-500/50",
    activeTabGradient: "from-orange-500 via-pink-500 to-fuchsia-500",
    icon: <Bot className="w-6 h-6 text-orange-400" />,
    heroImage: "/vp-no-bg.png",
    previewType: "architecture",
    description:
      "Enterprise-grade Discord daemon built on Node.js and Discord.js v14, deployed 24/7 on Render cloud web services with MongoDB Atlas cluster persistence. Featuring 101 slash commands, lossless FFmpeg music streaming, Gemini AI chat intelligence, automated moderation, and native Buy Me a Coffee VIP role synchronization.",
    architectureHighlights: [
      "101 modular slash commands divided across 5 core categories with zero-downtime hot reloads.",
      "Lossless audio playback pipeline streaming high-fidelity audio directly into voice channels.",
      "MongoDB Atlas cluster with connection pooling and automated session recovery (<15ms query time).",
      "Native BMC webhook endpoints & instant fail-safe role recovery (/vip grant & /claim-perks)."
    ],
    specs: [
      { label: "Slash Commands", value: "101 Modular Routes" },
      { label: "Cloud Node", value: "Render Web Service (24/7)" },
      { label: "Database", value: "MongoDB Atlas Cluster" },
      { label: "Intelligence", value: "Google Gemini AI API" },
    ],
    techStack: ["Node.js", "Discord.js v14", "MongoDB Atlas", "Docker", "Render", "Gemini AI"],
    primaryAction: { label: "Add to Server", href: "/invite", external: false },
    secondaryAction: { label: "Launch Dashboard", href: "/dashboard", external: false },
  },
  {
    id: "veplexity-cam",
    name: "VePlexity Cam",
    tagline: "Wireless & USB Ultra-Low-Latency HD WebCam Ecosystem",
    badge: "ANDROID & WINDOWS",
    status: "LIVE PRODUCTION",
    category: "Hardware Video Capture & DirectShow Driver",
    accentColor: "from-fuchsia-500 to-pink-500",
    borderGlow: "hover:border-fuchsia-500/50",
    activeTabGradient: "from-fuchsia-500 to-pink-600",
    icon: <Camera className="w-6 h-6 text-fuchsia-400" />,
    heroImage: "/projects/webcam-banner.jpg",
    previewType: "image",
    description:
      "A complete proprietary video bridge that converts modern Android smartphones into high-framerate, studio-grade PC webcams. Engineered with a custom Android capture client, local Wi-Fi UDP/TCP socket streaming, ADB USB reverse tethering, and a native Windows DirectShow virtual camera receiver driver.",
    architectureHighlights: [
      "Sub-18ms glass-to-glass latency over local 5GHz Wi-Fi and zero-jitter ADB USB tethering.",
      "Hardware-accelerated H.264/HEVC encoding utilizing phone GPU sensors up to 1080p60 & 4K.",
      "DirectShow Windows Virtual Camera hook recognized natively by OBS Studio, Discord, and Zoom.",
      "100% private zero-cloud stream: video buffers never leave the local LAN subnet."
    ],
    specs: [
      { label: "Stream Latency", value: "< 18ms (LAN / ADB)" },
      { label: "Max Resolution", value: "1080p 60FPS / 4K Sensor" },
      { label: "Client Platform", value: "Android (VePlexityCam.apk)" },
      { label: "Host Driver", value: "Windows DirectShow Receiver" },
    ],
    techStack: ["Android SDK", "Java / Flutter", "C++ Windows Driver", "DirectShow", "FFmpeg", "WebSockets"],
    primaryAction: { label: "Inspect Cam Architecture", href: "/labs#veplexity-cam", external: false },
    secondaryAction: { label: "Watch Live Rig Stream", href: "https://www.youtube.com/watch?v=dZvvx4SIkbM", external: true },
  },
  {
    id: "veplexity-vision",
    name: "VePlexity Vision",
    tagline: "Standalone Native Desktop Video Player & YouTube Streaming Hub",
    badge: "ELECTRON RUNTIME",
    status: "ACTIVE APP",
    category: "Desktop Media Client & Video Streaming",
    accentColor: "from-violet-500 to-fuchsia-500",
    borderGlow: "hover:border-violet-500/50",
    activeTabGradient: "from-purple-500 to-indigo-600",
    icon: <Tv className="w-6 h-6 text-purple-400" />,
    heroImage: "/projects/webcam-banner.jpg",
    previewType: "architecture",
    description:
      "A standalone desktop video player and online media streaming center packaged with Next.js, Electron, and Tailwind CSS. Eliminates heavy browser overhead by delivering hardware-accelerated local video playback, native YouTube player embeds, fluid Picture-in-Picture multitasking, and VePlexity's signature vice glass aesthetic.",
    architectureHighlights: [
      "Standalone Electron 24 desktop container with zero browser chrome clutter and low memory footprint.",
      "Hardware GPU accelerated local media decoding for MKV, MP4, WebM, and high-bitrate HEVC files.",
      "Integrated YouTube playback surface allowing fluid viewing without memory-heavy web browser tabs.",
      "Always-on-top Picture-in-Picture (PiP) viewport for concurrent coding, gaming, and editing workflows."
    ],
    specs: [
      { label: "Runtime", value: "Electron + Next.js" },
      { label: "Acceleration", value: "GPU Hardware Video Decode" },
      { label: "Multitasking", value: "Native Picture-in-Picture" },
      { label: "Design System", value: "Sunset Neon Glassmorphic" },
    ],
    techStack: ["Next.js", "Electron", "TypeScript", "Tailwind CSS", "HTML5 Media", "IPC Bridges"],
    primaryAction: { label: "Inspect Vision Dossier", href: "/labs#veplexity-vision", external: false },
    secondaryAction: { label: "Creator Portfolio", href: "https://veermadan.dev", external: true },
  },
  {
    id: "veplexity-downloader",
    name: "VePlexity Downloader",
    tagline: "Vice Native Edition Standalone 4K & Studio MP3 Extraction Suite",
    badge: "CROSS-PLATFORM EXE & APP",
    status: "STANDALONE RELEASE",
    category: "High-Performance Media Transcoding & Scraping",
    accentColor: "from-amber-500 to-orange-500",
    borderGlow: "hover:border-amber-500/50",
    activeTabGradient: "from-amber-500 to-orange-600",
    icon: <Download className="w-6 h-6 text-amber-400" />,
    heroImage: "/projects/downloader-logo.png",
    previewType: "image",
    description:
      "An architectural, zero-friction desktop media extraction and transcoding application powered by yt-dlp and embedded FFmpeg 6.0. Shipped as a 100% standalone Windows portable executable and a native macOS .app bundle with Finder/Dock integration. Features GTA VI dusk styling, 4K60 video multiplexing, 320 kbps MP3 conversion, and zero browser popups.",
    architectureHighlights: [
      "100% standalone portable Windows EXE — zero Python, Node.js, or external CLI dependencies required.",
      "Native macOS .app bundle with /Applications installer, macOS Dock integration, and spotlight support.",
      "Embedded FFmpeg audio/video muxing engine for 4K 60FPS video and 320 kbps studio MP3 / lossless WAV.",
      "Total UI lockdown (no DevTools, disabled right-click, custom glass dialogs) with automatic file explorer highlighting."
    ],
    specs: [
      { label: "Engine Core", value: "yt-dlp + Embedded FFmpeg 6.0" },
      { label: "Windows Target", value: "Standalone Portable EXE / Installer" },
      { label: "macOS Target", value: "Native .app Bundle & DMG" },
      { label: "Max Quality", value: "Lossless 4K60 & 320kbps MP3" },
    ],
    techStack: ["Python 3.11", "yt-dlp", "FFmpeg", "PyInstaller", "macOS AppleScript", "Custom HTML/CSS"],
    primaryAction: { label: "Inspect Downloader Architecture", href: "/labs#veplexity-downloader", external: false },
    secondaryAction: { label: "Creator Instagram", href: "https://www.instagram.com/veermxdan", external: true },
  },
];

export default function FlagshipProjectsSection() {
  const [selectedId, setSelectedId] = useState<string>("veplexity-bot");
  const activeProject = FLAGSHIP_PROJECTS.find((p) => p.id === selectedId) || FLAGSHIP_PROJECTS[0];

  return (
    <section className="relative py-28 px-5 z-10 bg-[#070308] border-t border-white/5" id="flagship-software">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-orange-600/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-fuchsia-600/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 border border-orange-500/40 text-orange-400 rounded-xl font-mono text-xs font-black uppercase tracking-widest bg-orange-500/10 w-fit mb-4">
              <Layers className="w-4 h-4" /> Proprietary Engineering Portfolio
            </div>
            <RevealText
              text="Flagship Software &"
              highlightText="Digital Systems."
              as="h2"
              className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[1.05]"
            />
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mt-4 leading-relaxed">
              Real standalone software products engineered from the ground up by Veer Madan across low-level drivers, cloud daemons, desktop clients, and media extractors.
            </p>
          </div>

          <Link
            href="/labs"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-400 hover:text-orange-300 transition-colors px-5 py-3 rounded-xl bg-orange-500/5 border border-orange-500/20 w-fit"
          >
            <span>Full Laboratory Matrix</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Tab Selector Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {FLAGSHIP_PROJECTS.map((proj) => {
            const isSelected = proj.id === selectedId;
            return (
              <button
                key={proj.id}
                onClick={() => setSelectedId(proj.id)}
                className={`p-4 sm:p-5 rounded-2xl sm:rounded-[1.75rem] text-left transition-all duration-300 flex flex-col justify-between relative overflow-hidden border-[3px] ${
                  isSelected
                    ? "bg-[#0c0512] border-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.25)] scale-[1.02]"
                    : "bg-[#0c0512]/60 border-zinc-900 hover:border-zinc-700 hover:bg-[#0c0512]"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div className={`p-2.5 rounded-xl bg-black border border-white/10 ${isSelected ? "text-orange-400" : "text-zinc-400"}`}>
                    {proj.icon}
                  </div>
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${
                    isSelected ? "bg-orange-500/20 text-orange-300 border border-orange-500/40" : "text-zinc-500 bg-white/5"
                  }`}>
                    {proj.status}
                  </span>
                </div>

                <div>
                  <h4 className={`text-base sm:text-lg font-black tracking-tight ${isSelected ? "text-white" : "text-zinc-300"}`}>
                    {proj.name}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-zinc-500 line-clamp-1 mt-0.5 font-medium">
                    {proj.category}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Project Main Dossier Card (Commit 60be601 Architecture Reborn) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`bg-[#0c0512] border-[4px] border-zinc-900 ${activeProject.borderGlow} rounded-[2rem] p-7 sm:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]`}
          >
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-fuchsia-600/15 to-orange-600/10 blur-[90px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
              
              {/* Left Column: Core Dossier Details */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  
                  {/* Category & Badge Row */}
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="px-3.5 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/40 text-orange-400 font-mono text-xs font-black uppercase tracking-widest">
                      {activeProject.badge}
                    </span>
                    <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider">
                      {activeProject.category}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tighter mb-3 drop-shadow-[0_0_15px_rgba(217,70,239,0.25)]">
                    {activeProject.name}
                  </h3>
                  <p className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-fuchsia-400 mb-6">
                    {activeProject.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
                    {activeProject.description}
                  </p>

                  {/* Architectural Highlights */}
                  <div className="mb-8 space-y-3">
                    <h5 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold mb-3 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-orange-400" /> Key Engineering Innovations
                    </h5>
                    <div className="grid grid-cols-1 gap-2.5">
                      {activeProject.architectureHighlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-black/60 border border-white/5">
                          <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                          <span className="text-xs sm:text-sm text-zinc-300 font-medium leading-snug">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Tech Stack Pills */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-8">
                    {activeProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-xs font-bold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4">
                    {activeProject.primaryAction.external ? (
                      <a
                        href={activeProject.primaryAction.href}
                        target="_blank"
                        rel="noreferrer"
                        className="px-8 py-4 bg-gradient-to-br from-orange-500 to-fuchsia-600 text-white font-black uppercase tracking-widest rounded-2xl flex items-center gap-2.5 transition-transform hover:scale-105 shadow-[0_0_25px_rgba(217,70,239,0.35)]"
                      >
                        <span>{activeProject.primaryAction.label}</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <Link
                        href={activeProject.primaryAction.href}
                        className="px-8 py-4 bg-gradient-to-br from-orange-500 to-fuchsia-600 text-white font-black uppercase tracking-widest rounded-2xl flex items-center gap-2.5 transition-transform hover:scale-105 shadow-[0_0_25px_rgba(217,70,239,0.35)]"
                      >
                        <span>{activeProject.primaryAction.label}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}

                    {activeProject.secondaryAction && (
                      activeProject.secondaryAction.external ? (
                        <a
                          href={activeProject.secondaryAction.href}
                          target="_blank"
                          rel="noreferrer"
                          className="px-6 py-4 bg-black/80 text-zinc-300 hover:text-white border-[2px] border-zinc-800 hover:border-zinc-600 font-bold uppercase tracking-wider text-xs rounded-2xl transition-colors flex items-center gap-2"
                        >
                          <span>{activeProject.secondaryAction.label}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <Link
                          href={activeProject.secondaryAction.href}
                          className="px-6 py-4 bg-black/80 text-zinc-300 hover:text-white border-[2px] border-zinc-800 hover:border-zinc-600 font-bold uppercase tracking-wider text-xs rounded-2xl transition-colors flex items-center gap-2"
                        >
                          <span>{activeProject.secondaryAction.label}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Specs & System Matrix */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* Visual Preview Box */}
                <div className="relative rounded-2xl overflow-hidden border-[3px] border-zinc-800 bg-black p-4 flex flex-col items-center justify-center min-h-[260px] group shadow-[0_0_30px_rgba(0,0,0,0.6)]">
                  {activeProject.heroImage && (
                    <div className="relative w-full h-56 flex items-center justify-center overflow-hidden rounded-xl">
                      <Image
                        src={activeProject.heroImage}
                        alt={activeProject.name}
                        fill
                        className="object-contain p-2 filter drop-shadow-[0_0_15px_rgba(249,115,22,0.4)] group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  {/* System Live Overlay */}
                  <div className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1 rounded-lg bg-black/80 border border-green-500/30 font-mono text-[11px] text-green-400 font-bold backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    SYSTEM READY
                  </div>
                </div>

                {/* 4-Field Technical Metrics Matrix */}
                <div className="grid grid-cols-2 gap-3.5">
                  {activeProject.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="bg-black/70 border border-zinc-800/80 p-4 rounded-xl flex flex-col justify-between"
                    >
                      <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-bold mb-1">
                        {spec.label}
                      </span>
                      <span className="text-sm sm:text-base font-black text-white font-mono">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Developer Credit Lockup */}
                <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/30">
                      <ShieldCheck className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white uppercase tracking-wider">
                        Sole Developer & Architect
                      </p>
                      <p className="text-[11px] font-mono text-zinc-400">
                        Veer Madan (VePlexity Systems)
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://veermadan.dev"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-black uppercase tracking-widest text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1"
                  >
                    <span>Portfolio</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
