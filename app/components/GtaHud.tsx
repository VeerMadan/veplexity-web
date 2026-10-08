"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Smartphone, Volume2, VolumeX, Star, Radio, Terminal, 
  Heart, Shield, ExternalLink, X, MapPin, Play, Pause, 
  RotateCcw, Sparkles, Send, Layers, Award, Coffee, ChevronRight
} from "lucide-react";
import Link from "next/link";
import { gtaAudio } from "../../lib/gtaAudio";

export default function GtaHud() {
  // HUD State
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [wantedLevel, setWantedLevel] = useState(2);
  const [phoneOpen, setPhoneOpen] = useState(false);
  const [phoneApp, setPhoneApp] = useState<string | null>(null);
  const [cheatNotice, setCheatNotice] = useState<string | null>(null);
  const [mapModalOpen, setMapModalOpen] = useState(false);

  // Time & Location
  const [timeStr, setTimeStr] = useState("12:00");
  const [streetName, setStreetName] = useState("VICE CITY // OCEAN BEACH");

  // Radio Player State
  const [radioPlaying, setRadioPlaying] = useState(false);
  const [radioStation, setRadioStation] = useState(0);

  const radioStations = [
    { name: "VICE FM // SYNTHWAVE", track: "Nightcall / Miami Horizon" },
    { name: "RADIO LOS SANTOS", track: "West Coast Trap & Beats" },
    { name: "NON-STOP POP FM", track: "2020s High-Energy Pop" },
    { name: "VEPLEXITY AUDIO LAB", track: "48kHz Lossless DSP Stream" },
  ];

  // Terminal / Bot simulator state
  const [cmdInput, setCmdInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "VePlexity OS v2.4 initialized.",
    "Connected to Render Node 24/7.",
    "Type /ping, /stats, or /help below:"
  ]);

  // Cheat code input
  const [cheatInput, setCheatInput] = useState("");
  const keyBuffer = useRef("");

  // Clock Ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  // Global Keyboard listener for Cheat Codes & Phone shortcut (P)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle phone on 'p' or 'P' if not typing in an input
      if ((e.key === "p" || e.key === "P") && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setPhoneOpen((prev) => {
          if (!prev) gtaAudio.phoneOpen();
          else gtaAudio.click();
          return !prev;
        });
        return;
      }

      // Record keystrokes for cheat codes
      if (!(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        keyBuffer.current = (keyBuffer.current + e.key.toUpperCase()).slice(-15);
        
        if (keyBuffer.current.includes("VEPLEXITY")) {
          triggerCheat("CHEAT ACTIVATED: 5-STAR VEPLEXITY STATUS", 5);
          keyBuffer.current = "";
        } else if (keyBuffer.current.includes("HEESOYAM")) {
          triggerCheat("CHEAT ACTIVATED: HEALTH & CASH $250,000", 3);
          keyBuffer.current = "";
        } else if (keyBuffer.current.includes("PANZER")) {
          triggerCheat("CHEAT ACTIVATED: RHINO TANK DEPLOYED", 4);
          keyBuffer.current = "";
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const triggerCheat = (msg: string, stars: number) => {
    gtaAudio.cheatSuccess();
    setCheatNotice(msg);
    setWantedLevel(stars);
    setTimeout(() => setCheatNotice(null), 4500);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    gtaAudio.enabled = next;
    if (next) gtaAudio.click();
  };

  const handlePhoneClick = () => {
    if (!phoneOpen) {
      gtaAudio.phoneOpen();
      setPhoneOpen(true);
    } else {
      gtaAudio.click();
      setPhoneOpen(false);
    }
  };

  const handleOpenApp = (appName: string) => {
    gtaAudio.click();
    setPhoneApp(appName);
  };

  const handleCloseApp = () => {
    gtaAudio.click();
    setPhoneApp(null);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmdInput.trim()) return;
    gtaAudio.click();

    const cmd = cmdInput.trim().toLowerCase();
    let response = `Command not recognized. Try /help or /ping`;

    if (cmd === "/ping") {
      response = `🏓 Pong! WebSocket Gateway: 18ms | Render Node: Online`;
    } else if (cmd === "/stats") {
      response = `📊 101 Commands | MongoDB Atlas Sub-15ms | 24/7 Render Daemon`;
    } else if (cmd === "/help") {
      response = `📖 Modules: /play, /gemini, /ban, /tictactoe, /setup (101 total)`;
    } else if (cmd === "/botinfo") {
      response = `🤖 VePlexity Bot V2 | Created by Veer Madan | Node.js 20 & Discord.js v14`;
    } else if (cmd.includes("play")) {
      response = `🎵 Streaming lossless audio: 48kHz stereo via @discordjs/voice`;
    }

    setTerminalLogs((prev) => [...prev.slice(-6), `> ${cmdInput}`, response]);
    setCmdInput("");
  };

  const handleCheatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cheatInput.trim()) return;
    const c = cheatInput.trim().toUpperCase();
    if (c === "VEPLEXITY" || c === "VEER") {
      triggerCheat("CHEAT ACTIVATED: MASTER DEVELOPER LEVEL", 5);
    } else if (c === "HEESOYAM" || c === "CASH") {
      triggerCheat("CHEAT ACTIVATED: $250,000 & FULL ARMOR", 4);
    } else if (c === "LEAVEMEALONE" || c === "LAWYER") {
      triggerCheat("CHEAT ACTIVATED: 0-STAR WANTED LEVEL", 0);
    } else {
      triggerCheat(`CHEAT ACTIVATED: ${c}`, 3);
    }
    setCheatInput("");
  };

  return (
    <>
      {/* ─── TOP-RIGHT WANTED LEVEL & AUDIO HUD ───────────────────────────── */}
      <div className="fixed top-20 right-4 sm:right-6 z-40 flex items-center gap-3 pointer-events-auto">
        
        {/* Wanted Level Stars (GTA Authentic) */}
        <div 
          onClick={() => {
            const next = wantedLevel >= 5 ? 1 : wantedLevel + 1;
            setWantedLevel(next);
            gtaAudio.starDing();
          }}
          className="flex items-center gap-1 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded border border-white/15 cursor-pointer hover:border-pink-500/50 transition-colors shadow-lg"
          title="Click to increase Wanted Level / Street Cred"
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-3.5 h-3.5 transition-all ${
                star <= wantedLevel
                  ? "fill-pink-500 text-pink-500 animate-pulse drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"
                  : "text-zinc-600 fill-transparent"
              }`}
            />
          ))}
        </div>

        {/* SFX Toggle */}
        <button
          onClick={toggleSound}
          className={`p-2 rounded bg-black/80 border text-xs transition-colors backdrop-blur-md ${
            soundEnabled
              ? "border-pink-500/40 text-pink-400 hover:text-white hover:border-pink-500"
              : "border-white/10 text-zinc-500 hover:text-zinc-300"
          }`}
          title={soundEnabled ? "Mute GTA Audio SFX" : "Enable GTA Audio SFX"}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

      </div>

      {/* ─── CHEAT CODE ACTIVATED BANNER ─────────────────────────────────── */}
      <AnimatePresence>
        {cheatNotice && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded bg-black/95 border-2 border-pink-500 text-white font-mono text-xs sm:text-sm font-black uppercase tracking-widest shadow-[0_0_30px_rgba(236,72,153,0.6)] flex items-center gap-3 backdrop-blur-md pointer-events-none"
          >
            <Sparkles className="w-4 h-4 text-pink-400 animate-spin" />
            <span>{cheatNotice}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── BOTTOM-LEFT GTA MINIMAP RADAR ────────────────────────────────── */}
      <div className="fixed bottom-4 left-4 sm:left-6 z-40 flex flex-col items-start gap-1.5 pointer-events-auto select-none">
        
        {/* Radar Circular Screen */}
        <div 
          onClick={() => {
            gtaAudio.click();
            setMapModalOpen(true);
          }}
          className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-black/90 border-2 border-white/20 p-1 backdrop-blur-md cursor-pointer hover:border-pink-500 transition-all shadow-2xl group overflow-hidden"
          title="Click to open Full System Radar Map"
        >
          {/* Radar Grid Circles */}
          <div className="absolute inset-2 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute inset-6 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-[1px] bg-white/10" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="h-full w-[1px] bg-white/10" />
          </div>

          {/* Radar Sweep Rotating Line */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="absolute inset-0 origin-center pointer-events-none"
          >
            <div className="w-1/2 h-full border-r border-pink-500/60 bg-gradient-to-l from-pink-500/20 to-transparent" />
          </motion.div>

          {/* Center Player Marker */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-2.5 h-2.5 bg-white rotate-45 border border-black shadow" />
          </div>

          {/* Interactive Node Blips */}
          {/* Node 1: Bot (Render) */}
          <div className="absolute top-6 right-7 flex items-center gap-1 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
            <span className="text-[8px] font-mono font-bold text-pink-400 bg-black/60 px-0.5 rounded">BOT</span>
          </div>

          {/* Node 2: DB (Atlas) */}
          <div className="absolute bottom-6 right-6 flex items-center gap-1 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[8px] font-mono font-bold text-emerald-300 bg-black/60 px-0.5 rounded">DB</span>
          </div>

          {/* Node 3: HQ (Discord) */}
          <div className="absolute top-7 left-6 flex items-center gap-1 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-[8px] font-mono font-bold text-cyan-300 bg-black/60 px-0.5 rounded">HQ</span>
          </div>

          {/* Expand Overlay on Hover */}
          <div className="absolute inset-0 bg-pink-500/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <span className="text-[9px] font-mono font-black text-white bg-black/90 px-1.5 py-0.5 rounded border border-pink-500/50">
              EXPAND
            </span>
          </div>
        </div>

        {/* Health & Armor Status Bars */}
        <div className="w-28 sm:w-32 space-y-1 bg-black/80 p-1.5 rounded border border-white/10 backdrop-blur-md">
          {/* Health Bar (Uptime) */}
          <div className="flex items-center gap-1.5">
            <Heart className="w-2.5 h-2.5 text-emerald-400 fill-emerald-400 shrink-0" />
            <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div className="w-full h-full bg-emerald-400" />
            </div>
          </div>
          {/* Armor Bar (Atlas Cloud Persistence) */}
          <div className="flex items-center gap-1.5">
            <Shield className="w-2.5 h-2.5 text-cyan-400 fill-cyan-400 shrink-0" />
            <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div className="w-full h-full bg-cyan-400" />
            </div>
          </div>
        </div>

        {/* GPS Street Stamp & Live Clock */}
        <div className="font-mono text-[9px] text-zinc-400 bg-black/80 px-2 py-0.5 rounded border border-white/10 backdrop-blur-md flex items-center gap-2">
          <span className="font-bold text-white">{timeStr}</span>
          <span>•</span>
          <span className="truncate max-w-[130px] font-semibold text-pink-400">{streetName}</span>
        </div>

      </div>

      {/* ─── BOTTOM-RIGHT PHONE BUTTON ───────────────────────────────────── */}
      <div className="fixed bottom-4 right-4 sm:right-6 z-40 flex items-center gap-2 pointer-events-auto">
        <button
          onClick={handlePhoneClick}
          className="px-4 py-2 rounded bg-black/90 border border-white/20 hover:border-pink-500 text-white font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 backdrop-blur-md shadow-2xl transition-all hover:scale-105 active:scale-95 group"
        >
          <Smartphone className="w-4 h-4 text-pink-500 group-hover:animate-bounce" />
          <span>PHONE [P]</span>
        </button>
      </div>

      {/* ─── INTERACTIVE GTA SMARTPHONE (iFruit / VePlexity OS) ───────────── */}
      <AnimatePresence>
        {phoneOpen && (
          <motion.div
            initial={{ opacity: 0, y: 150, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 150, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-16 right-4 sm:right-6 z-50 w-[300px] sm:w-[330px] h-[520px] bg-zinc-950 border-4 border-zinc-800 rounded-[36px] shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden text-white pointer-events-auto"
          >
            {/* Phone Top Speaker & Camera Notch */}
            <div className="w-full h-7 bg-black flex items-center justify-between px-6 pt-1 text-[10px] font-mono text-zinc-400 select-none">
              <span>{timeStr}</span>
              <div className="w-16 h-3 bg-zinc-800 rounded-full" />
              <span className="text-emerald-400">5G ●●</span>
            </div>

            {/* Phone Screen Area */}
            <div className="flex-1 bg-gradient-to-b from-[#14081c] via-black to-[#0d0716] p-4 flex flex-col justify-between overflow-y-auto">
              
              {/* If no app is active: Phone Home Screen */}
              {!phoneApp && (
                <div className="space-y-6">
                  
                  {/* Lockscreen Header */}
                  <div className="text-center py-4">
                    <div className="text-3xl font-black font-mono tracking-tight text-white">{timeStr}</div>
                    <div className="text-[10px] font-mono uppercase text-pink-400 tracking-wider">VePlexity OS v2.4</div>
                  </div>

                  {/* App Grid */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    
                    {/* App 1: Bot Terminal */}
                    <button
                      onClick={() => handleOpenApp("terminal")}
                      className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex flex-col items-center gap-1.5 transition-all active:scale-95 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                        <Terminal className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-zinc-300">Terminal</span>
                    </button>

                    {/* App 2: Radio Station */}
                    <button
                      onClick={() => handleOpenApp("radio")}
                      className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex flex-col items-center gap-1.5 transition-all active:scale-95 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-pink-600/20 border border-pink-500/40 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                        <Radio className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-zinc-300">Radio</span>
                    </button>

                    {/* App 3: Discord HQ */}
                    <a
                      href="https://discord.gg/R6ZrqpWEcc"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => gtaAudio.click()}
                      className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex flex-col items-center gap-1.5 transition-all active:scale-95 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                        <ExternalLink className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-zinc-300">Discord</span>
                    </a>

                    {/* App 4: Cheat Codes */}
                    <button
                      onClick={() => handleOpenApp("cheats")}
                      className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex flex-col items-center gap-1.5 transition-all active:scale-95 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-zinc-300">Cheats</span>
                    </button>

                    {/* App 5: Patron / BMC */}
                    <a
                      href="https://www.buymeacoffee.com/veplexity1"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => gtaAudio.click()}
                      className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex flex-col items-center gap-1.5 transition-all active:scale-95 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                        <Heart className="w-5 h-5 fill-pink-500" />
                      </div>
                      <span className="text-[10px] font-bold text-zinc-300">Support</span>
                    </a>

                    {/* App 6: Dashboard */}
                    <Link
                      href="/dashboard"
                      onClick={() => {
                        gtaAudio.click();
                        setPhoneOpen(false);
                      }}
                      className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex flex-col items-center gap-1.5 transition-all active:scale-95 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                        <Layers className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-zinc-300">Dash</span>
                    </Link>

                  </div>

                </div>
              )}

              {/* ─── APP 1: TERMINAL / BOT TESTER ─── */}
              {phoneApp === "terminal" && (
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                      <span className="text-xs font-bold text-purple-400">BOT REMOTE TERMINAL</span>
                      <button onClick={handleCloseApp} className="p-1 text-zinc-400 hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="bg-black/90 p-2.5 rounded font-mono text-[10px] text-zinc-300 h-64 overflow-y-auto space-y-1 border border-white/10">
                      {terminalLogs.map((log, i) => (
                        <div key={i} className={log.startsWith(">") ? "text-pink-400 font-bold" : "text-zinc-300"}>
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleTerminalSubmit} className="pt-2 flex gap-1">
                    <input
                      type="text"
                      placeholder="e.g. /ping or /stats"
                      value={cmdInput}
                      onChange={(e) => setCmdInput(e.target.value)}
                      className="flex-1 bg-black border border-white/20 rounded px-2.5 py-1 text-xs font-mono text-white outline-none focus:border-purple-500"
                    />
                    <button type="submit" className="px-3 py-1 bg-purple-600 hover:bg-purple-500 rounded text-xs font-bold">
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              )}

              {/* ─── APP 2: RADIO STATION ─── */}
              {phoneApp === "radio" && (
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-4">
                      <span className="text-xs font-bold text-pink-400">VICE CITY RADIO</span>
                      <button onClick={handleCloseApp} className="p-1 text-zinc-400 hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {radioStations.map((station, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setRadioStation(idx);
                            setRadioPlaying(true);
                            gtaAudio.click();
                          }}
                          className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                            radioStation === idx
                              ? "bg-pink-600/20 border-pink-500 text-white"
                              : "bg-black/50 border-white/10 text-zinc-400 hover:text-zinc-200"
                          }`}
                        >
                          <div className="font-mono text-xs font-bold">{station.name}</div>
                          <div className="text-[10px] text-zinc-400 mt-0.5">{station.track}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-black/80 rounded-xl border border-white/15 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-pink-400">{radioStations[radioStation].name}</div>
                      <div className="text-[10px] text-zinc-400">{radioPlaying ? "ON AIR // STREAMING" : "PAUSED"}</div>
                    </div>
                    <button
                      onClick={() => {
                        gtaAudio.click();
                        setRadioPlaying(!radioPlaying);
                      }}
                      className="p-2 rounded-full bg-pink-500 hover:bg-pink-400 text-white"
                    >
                      {radioPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* ─── APP 4: CHEAT CODES ─── */}
              {phoneApp === "cheats" && (
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
                      <span className="text-xs font-bold text-amber-400">CHEAT CODE DIALER</span>
                      <button onClick={handleCloseApp} className="p-1 text-zinc-400 hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="text-[10px] font-mono text-zinc-400">CLICK OR TYPE CHEATS:</div>
                      <button
                        onClick={() => triggerCheat("CHEAT ACTIVATED: 5-STAR VEPLEXITY STATUS", 5)}
                        className="w-full text-left p-2 rounded bg-white/5 border border-white/10 hover:border-pink-500 text-xs font-mono font-bold text-pink-300"
                      >
                        VEPLEXITY → 5-Star Status
                      </button>
                      <button
                        onClick={() => triggerCheat("CHEAT ACTIVATED: FULL ARMOR & REPUTATION", 4)}
                        className="w-full text-left p-2 rounded bg-white/5 border border-white/10 hover:border-emerald-500 text-xs font-mono font-bold text-emerald-300"
                      >
                        HEESOYAM → Full Health & Cash
                      </button>
                      <button
                        onClick={() => triggerCheat("CHEAT ACTIVATED: RHINO TANK SPAWNED", 3)}
                        className="w-full text-left p-2 rounded bg-white/5 border border-white/10 hover:border-cyan-500 text-xs font-mono font-bold text-cyan-300"
                      >
                        PANZER → Deploy Tank
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleCheatSubmit} className="pt-2 flex gap-1">
                    <input
                      type="text"
                      placeholder="ENTER CHEAT..."
                      value={cheatInput}
                      onChange={(e) => setCheatInput(e.target.value)}
                      className="flex-1 bg-black border border-white/20 rounded px-2.5 py-1 text-xs font-mono text-white outline-none focus:border-amber-500 uppercase"
                    />
                    <button type="submit" className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded text-xs">
                      DIAL
                    </button>
                  </form>
                </div>
              )}

              {/* Bottom Home Pill Button */}
              <div className="pt-3 flex justify-center">
                <button
                  onClick={() => {
                    gtaAudio.click();
                    if (phoneApp) setPhoneApp(null);
                    else setPhoneOpen(false);
                  }}
                  className="w-24 h-1 bg-white/40 hover:bg-white rounded-full transition-colors"
                />
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FULL GPS SYSTEM MAP MODAL (ON RADAR CLICK) ───────────────────── */}
      <AnimatePresence>
        {mapModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl rounded-2xl bg-zinc-950 border-2 border-pink-500 p-6 sm:p-8 space-y-6 text-white shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/15">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-mono text-lg font-black uppercase text-white">
                      VEPLEXITY GLOBAL GPS RADAR
                    </h3>
                    <p className="text-xs font-mono text-zinc-400">Live Infrastructure Coordinates & Telemetry</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    gtaAudio.click();
                    setMapModalOpen(false);
                  }}
                  className="p-2 text-zinc-400 hover:text-white rounded bg-zinc-900 border border-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Grid of Nodes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-black border border-pink-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-pink-400">📍 [NODE 01] RENDER CLOUD DAEMON</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">LIVE</span>
                  </div>
                  <p className="text-zinc-400 text-[11px]">Hosts commercial Discord bot daemon 24/7 with 101 production slash commands.</p>
                </div>

                <div className="p-4 rounded-xl bg-black border border-emerald-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-400">📍 [NODE 02] ATLAS MONGODB CLUSTER</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">SUB-15MS</span>
                  </div>
                  <p className="text-zinc-400 text-[11px]">Cloud replica set storing economies, server configurations, and XP.</p>
                </div>

                <div className="p-4 rounded-xl bg-black border border-cyan-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-400">📍 [NODE 03] DISCORD WORLD HQ</span>
                    <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">ACTIVE</span>
                  </div>
                  <p className="text-zinc-400 text-[11px]">Central community server where bot permissions and VIP roles synchronize.</p>
                </div>

                <div className="p-4 rounded-xl bg-black border border-purple-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-400">📍 [NODE 04] VEPLEXITY CAM STUDIO</span>
                    <span className="text-[10px] text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">1080P60</span>
                  </div>
                  <p className="text-zinc-400 text-[11px]">Hardware HDMI camera rig and automated OBS-WebSocket stream switcher.</p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    gtaAudio.click();
                    setMapModalOpen(false);
                  }}
                  className="px-6 py-2.5 rounded bg-white hover:bg-zinc-200 text-black font-black uppercase text-xs"
                >
                  CLOSE RADAR
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
