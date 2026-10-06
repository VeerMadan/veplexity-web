"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, Sparkles, 
  ShieldAlert, Send, Flame, Heart, Cpu, Check, Disc3, 
  Layers, Radio, Lock, Coffee, RefreshCw, AlertTriangle
} from "lucide-react";

type PlaygroundTab = "music" | "ai" | "automod" | "roles";

export default function BotPlayground() {
  const [activeTab, setActiveTab] = useState<PlaygroundTab>("music");

  // --- 1. Music Player Simulator State ---
  const tracks = [
    { title: "VePlexity — Midnight Resonance", artist: "VePlexity Records", duration: "03:42", quality: "24-bit / 96kHz FLAC", art: "linear-gradient(135deg, #f97316, #d946ef)" },
    { title: "Cyberpunk Phonk Overdrive", artist: "Kordhell & VePlexity", duration: "02:18", quality: "Studio Master FLAC", art: "linear-gradient(135deg, #a855f7, #3b82f6)" },
    { title: "Late Night Coding Lofi", artist: "ChilledCow feat. VP", duration: "04:05", quality: "Lossless Audio 320kbps", art: "linear-gradient(135deg, #06b6d4, #10b981)" }
  ];
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [bassBoost, setBassBoost] = useState(true);
  const [eightD, setEightD] = useState(false);
  const [volume, setVolume] = useState(85);
  const [progress, setProgress] = useState(38);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // --- 2. AI Persona Simulator State ---
  const aiPersonas = [
    { id: "roast", name: "Savage Roaster", emoji: "🔥", color: "from-orange-500 to-red-500" },
    { id: "flirt", name: "Flirty Wingman", emoji: "💖", color: "from-pink-500 to-rose-400" },
    { id: "architect", name: "Tech Architect", emoji: "🧠", color: "from-purple-500 to-indigo-500" },
    { id: "philosopher", name: "Deep Thinker", emoji: "🌌", color: "from-emerald-500 to-cyan-500" }
  ];
  const [selectedPersona, setSelectedPersona] = useState("roast");
  const [customInput, setCustomInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [aiResponse, setAiResponse] = useState({
    title: "🔥 VePlexity Savage AI Verdict",
    text: "Your server is so inactive that tumbleweeds are paying rent in the general channel. Even Discord's offline bots have more active status updates than you.",
    author: "VePlexity Gemini 2.0 AI"
  });

  const promptOptions: Record<string, { prompt: string; response: string }[]> = {
    roast: [
      { 
        prompt: "Roast my gaming setup", 
        response: "You call that cable management? It looks like a bowl of poisoned spaghetti fought an electric chair and lost. Even your GPU is begging for thermal mercy." 
      },
      { 
        prompt: "Roast someone who sleeps with socks on", 
        response: "Sleeping with socks on? You're basically one bad day away from putting cereal after milk and committing tax fraud on Club Penguin." 
      },
      { 
        prompt: "Roast my Discord role names", 
        response: "Having 45 rainbow-colored aesthetic roles when there are only 3 active people in your server is peak psychological cope." 
      }
    ],
    flirt: [
      { 
        prompt: "Pickup line for a programmer", 
        response: "Are you an asynchronous function? Because my entire heartbeat stops and awaits your response. 💖" 
      },
      { 
        prompt: "Pickup line for a Discord mod", 
        response: "Are you a 24/7 moderation bot? Because you've banned every other distraction from my mind. 🌹" 
      }
    ],
    architect: [
      { 
        prompt: "Explain Lavalink v4 audio pipeline", 
        response: "Lavalink v4 utilizes JDA-Audio with Magma/Koe native Opus encoders. By offloading PCM decoding to an external Java daemon, the Node.js event loop maintains 0ms latency for 500+ concurrent voice rooms. ⚡" 
      },
      { 
        prompt: "Best database for Discord bot scaling?", 
        response: "For sub-millisecond guild configs: Supabase (PostgreSQL) with Row-Level Security, backed by a local Redis cluster for volatile state like temp VCs and music queues. 🛠️" 
      }
    ],
    philosopher: [
      {
        prompt: "What is the meaning of a Discord ping?",
        response: "A single ping is the brief illusion of human connection, collapsing into existential dread the moment you realize it was just an @everyone notification about server rules. 🌌"
      }
    ]
  };

  const triggerAiPrompt = (promptText: string, replyText: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setAiResponse({
        title: `🤖 VePlexity [${selectedPersona.toUpperCase()}] Response`,
        text: replyText,
        author: `Prompt: "${promptText}"`
      });
    }, 700);
  };

  // --- 3. Auto-Mod Defense Matrix State ---
  const [antiSpam, setAntiSpam] = useState(true);
  const [antiInvite, setAntiInvite] = useState(true);
  const [raidShield, setRaidShield] = useState(true);
  const [modLogs, setModLogs] = useState([
    { id: 1, action: "AUTO-DELETE", target: "discord.gg/scam-link", reason: "Unauthorized Discord Invite Detected", time: "Just now", badge: "bg-red-500/20 text-red-400 border-red-500/40" },
    { id: 2, action: "TIMEOUT 10M", target: "@SpamAccount#8912", reason: "Exceeded 5 messages/2s rate limit", time: "1m ago", badge: "bg-amber-500/20 text-amber-400 border-amber-500/40" },
    { id: 3, action: "QUARANTINE", target: "@RaidToken#0014", reason: "Pattern match: Rapid Mass Join Signature", time: "3m ago", badge: "bg-purple-500/20 text-purple-400 border-purple-500/40" }
  ]);

  const triggerSimulatedRaid = () => {
    const newEntry = {
      id: Date.now(),
      action: "SHIELD AUTO-DEFENSE",
      target: `@BotSwarm_${Math.floor(Math.random() * 9000 + 1000)}`,
      reason: "Simulated raid wave neutralized in 0.018s",
      time: "Just now",
      badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
    };
    setModLogs((prev) => [newEntry, ...prev.slice(0, 4)]);
  };

  // --- 4. Reaction Roles & VIP State ---
  const [selectedRoles, setSelectedRoles] = useState<string[]>(["Audiophile 🎧", "VIP Supporter ☕"]);
  const availableRoles = [
    { name: "Audiophile 🎧", color: "border-fuchsia-500 text-fuchsia-300 bg-fuchsia-500/10", perk: "Unlocks 24-bit FLAC audio stream" },
    { name: "VIP Supporter ☕", color: "border-amber-500 text-amber-300 bg-amber-500/10", perk: "Unlocks /flirt, /imagine & stream shoutouts" },
    { name: "Developer 💻", color: "border-blue-500 text-blue-300 bg-blue-500/10", perk: "Access to private API dev channels" },
    { name: "Gamer 🎮", color: "border-emerald-500 text-emerald-300 bg-emerald-500/10", perk: "Pings for community game nights" }
  ];

  const toggleRole = (name: string) => {
    if (selectedRoles.includes(name)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== name));
    } else {
      setSelectedRoles([...selectedRoles, name]);
    }
  };

  return (
    <section id="playground" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#07030a]/60">
      
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-fuchsia-600/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass border border-fuchsia-500/30 text-fuchsia-300 font-mono text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Interactive Sandbox
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white">
              Test-Drive <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent">VePlexity Live.</span>
            </h2>
            <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl mt-3">
              Experience the lossless music player, Gemini 2.0 AI persona engine, auto-mod defense shield, and role mechanics directly on this page.
            </p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 liquid-glass p-1.5 rounded-2xl border border-white/10 self-start md:self-auto">
            <button
              onClick={() => setActiveTab("music")}
              className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "music"
                  ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg shadow-fuchsia-500/25"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Disc3 className={`w-4 h-4 ${activeTab === "music" ? "animate-spin" : ""}`} />
              <span>Lossless Audio</span>
            </button>

            <button
              onClick={() => setActiveTab("ai")}
              className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "ai"
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/25"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Gemini AI Personas</span>
            </button>

            <button
              onClick={() => setActiveTab("automod")}
              className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "automod"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Auto-Mod Defense</span>
            </button>

            <button
              onClick={() => setActiveTab("roles")}
              className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "roles"
                  ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-lg shadow-amber-500/25"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>VIP & Roles</span>
            </button>
          </div>
        </div>

        {/* Discord Simulator Window Frame */}
        <div className="w-full rounded-[2.5rem] liquid-glass-glow border-2 border-white/10 p-4 sm:p-8 lg:p-10 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)] relative overflow-hidden">
          
          {/* Mac/Discord Chrome Header */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-rose-500/80 border border-rose-600/50" />
                <div className="w-3.5 h-3.5 rounded-full bg-amber-500/80 border border-amber-600/50" />
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/80 border border-emerald-600/50" />
              </div>
              <div className="h-4 w-[1px] bg-white/10 mx-2" />
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-400">
                <span className="text-fuchsia-400">#</span>
                <span>veplexity-studio-preview</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 bg-black/40 px-3 py-1 rounded-full border border-white/5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Discord API WebSocket: Connected</span>
            </div>
          </div>

          {/* TAB 1: LOSSLESS AUDIO STUDIO */}
          {activeTab === "music" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Disc & Controls (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col items-center text-center">
                <div className="relative group mb-6">
                  {/* Glowing Vinyl Album Cover */}
                  <div 
                    className="w-48 h-48 sm:w-60 sm:h-60 rounded-3xl p-6 shadow-2xl flex flex-col justify-between border-2 border-white/20 relative overflow-hidden transition-transform duration-500 group-hover:scale-105"
                    style={{ background: tracks[currentTrackIndex].art }}
                  >
                    <div className="flex justify-between items-center text-white/90">
                      <Disc3 className={`w-8 h-8 ${isPlaying ? "animate-spin" : ""}`} />
                      <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-black/40 backdrop-blur-md">
                        24-BIT FLAC
                      </span>
                    </div>

                    <div>
                      <h4 className="text-lg font-black text-white text-left leading-tight drop-shadow-md">
                        {tracks[currentTrackIndex].title}
                      </h4>
                      <p className="text-xs text-white/80 text-left font-medium mt-1">
                        {tracks[currentTrackIndex].artist}
                      </p>
                    </div>

                    {/* Specular sheen */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                  </div>

                  {/* Equalizer Waveform Bars */}
                  <div className="flex items-center justify-center gap-1.5 mt-5 h-8">
                    {[40, 75, 90, 60, 100, 85, 45, 95, 70, 80, 50, 90, 65].map((h, i) => (
                      <div
                        key={i}
                        className="w-1.5 bg-gradient-to-t from-fuchsia-600 to-orange-400 rounded-full transition-all duration-300"
                        style={{
                          height: isPlaying ? `${Math.max(15, (h * (progress % 20 + 10)) / 25)}%` : "15%",
                          opacity: isPlaying ? 0.9 : 0.3
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Track Switcher */}
                <div className="flex gap-2 w-full max-w-sm">
                  {tracks.map((t, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentTrackIndex(idx);
                        setProgress(10);
                        setIsPlaying(true);
                      }}
                      className={`flex-1 py-1.5 px-2 rounded-xl text-[10px] font-bold uppercase tracking-wider truncate transition-all cursor-pointer ${
                        currentTrackIndex === idx
                          ? "liquid-glass border border-fuchsia-500/60 text-white"
                          : "bg-black/30 text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      Track {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Simulated Discord Audio Embed (7 Cols) */}
              <div className="lg:col-span-7">
                <div className="bg-[#12081c]/80 rounded-2xl border-l-4 border-fuchsia-500 p-6 border border-white/5 shadow-2xl">
                  
                  {/* Discord Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src="/vp-logo-icon.png" alt="VP" className="w-10 h-10 rounded-full border border-fuchsia-500/40 p-0.5" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-black absolute -bottom-0.5 -right-0.5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-white text-sm">VePlexity</span>
                          <span className="bg-fuchsia-600 text-[10px] font-black uppercase px-1.5 py-0.5 rounded text-white font-mono">BOT</span>
                        </div>
                        <span className="text-[11px] text-zinc-500">Lossless JDA Audio Node #1</span>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20">
                      {tracks[currentTrackIndex].quality}
                    </span>
                  </div>

                  {/* Song Title & Duration */}
                  <div className="mb-4">
                    <h3 className="text-xl font-black text-white">{tracks[currentTrackIndex].title}</h3>
                    <p className="text-xs text-zinc-400 font-mono mt-1">Requested by @VeerMadan • Engine: yt-dlp + Native Opus</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="w-full bg-zinc-800/80 rounded-full h-2 overflow-hidden mb-2 relative">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-fuchsia-500 h-full rounded-full transition-all duration-300 relative"
                        style={{ width: `${progress}%` }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow" />
                      </div>
                    </div>
                    <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                      <span>01:{progress < 10 ? `0${progress}` : progress}</span>
                      <span>{tracks[currentTrackIndex].duration}</span>
                    </div>
                  </div>

                  {/* Audio FX Toggles */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                    <button
                      onClick={() => setBassBoost(!bassBoost)}
                      className={`p-2.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                        bassBoost
                          ? "bg-orange-500/20 border-orange-500 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.3)]"
                          : "bg-black/40 border-white/10 text-zinc-400 hover:text-white"
                      }`}
                    >
                      <Flame className="w-3.5 h-3.5" />
                      Bass Boost {bassBoost ? "ON" : "OFF"}
                    </button>

                    <button
                      onClick={() => setEightD(!eightD)}
                      className={`p-2.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                        eightD
                          ? "bg-fuchsia-500/20 border-fuchsia-500 text-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.3)]"
                          : "bg-black/40 border-white/10 text-zinc-400 hover:text-white"
                      }`}
                    >
                      <Radio className="w-3.5 h-3.5" />
                      8D Surround {eightD ? "ON" : "OFF"}
                    </button>

                    <button
                      onClick={() => setVolume((v) => (v === 100 ? 50 : 100))}
                      className="p-2.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 bg-black/40 border border-white/10 text-zinc-300 hover:text-white cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      {volume}% Vol
                    </button>

                    <button
                      onClick={() => setProgress(0)}
                      className="p-2.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 bg-black/40 border border-white/10 text-zinc-300 hover:text-white cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Loop 🔂
                    </button>
                  </div>

                  {/* Real Discord Bot Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                    <button
                      onClick={() => {
                        setCurrentTrackIndex((prev) => (prev > 0 ? prev - 1 : tracks.length - 1));
                        setProgress(0);
                      }}
                      className="neo-btn-glass px-4 py-2 rounded-xl text-xs font-bold text-zinc-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
                    >
                      <SkipBack className="w-4 h-4" /> Previous
                    </button>

                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="neo-btn-primary px-5 py-2 rounded-xl text-xs font-black text-white flex items-center gap-1.5 cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                      {isPlaying ? "Pause" : "Play"}
                    </button>

                    <button
                      onClick={() => {
                        setCurrentTrackIndex((prev) => (prev < tracks.length - 1 ? prev + 1 : 0));
                        setProgress(0);
                      }}
                      className="neo-btn-glass px-4 py-2 rounded-xl text-xs font-bold text-zinc-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
                    >
                      <SkipForward className="w-4 h-4" /> Skip
                    </button>

                    <span className="ml-auto text-[11px] font-mono text-emerald-400 self-center flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Lossless Jitter: 0.1ms
                    </span>
                  </div>

                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: GEMINI AI PERSONAS */}
          {activeTab === "ai" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Column: Persona Chooser & Quick Prompts (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col gap-5">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-3">1. Select AI Persona</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {aiPersonas.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPersona(p.id)}
                        className={`p-3 rounded-2xl text-left transition-all border cursor-pointer ${
                          selectedPersona === p.id
                            ? "liquid-glass-glow border-fuchsia-500/60 shadow-lg text-white"
                            : "bg-black/30 border-white/5 text-zinc-400 hover:text-white"
                        }`}
                      >
                        <div className="text-xl mb-1">{p.emoji}</div>
                        <div className="text-xs font-black uppercase tracking-wider">{p.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-3">2. Click a Sample Prompt</h4>
                  <div className="flex flex-col gap-2">
                    {(promptOptions[selectedPersona] || []).map((item, i) => (
                      <button
                        key={i}
                        onClick={() => triggerAiPrompt(item.prompt, item.response)}
                        className="neo-card p-3 rounded-xl text-left text-xs font-semibold text-zinc-300 hover:text-white hover:border-fuchsia-500/40 flex items-center justify-between group cursor-pointer"
                      >
                        <span>"{item.prompt}"</span>
                        <Send className="w-3.5 h-3.5 text-zinc-500 group-hover:text-fuchsia-400 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Simulated Discord Chat Feed (7 Cols) */}
              <div className="lg:col-span-7 bg-[#12081c]/80 rounded-2xl border border-white/10 p-6 shadow-2xl flex flex-col min-h-[340px] justify-between">
                <div>
                  {/* User Message */}
                  <div className="flex items-start gap-3 mb-6">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-xs text-white">
                      VM
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-cyan-300">VeerMadan</span>
                        <span className="text-[11px] text-zinc-500">Today at 4:20 PM</span>
                      </div>
                      <p className="text-sm text-zinc-300 mt-1 font-mono">
                        /{selectedPersona} target:@user
                      </p>
                    </div>
                  </div>

                  {/* AI Discord Reply Embed */}
                  <div className="flex items-start gap-3">
                    <img src="/vp-logo-icon.png" alt="VP" className="w-9 h-9 rounded-full border border-fuchsia-500/40 p-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-extrabold text-sm text-white">VePlexity</span>
                        <span className="bg-fuchsia-600 text-[10px] font-black uppercase px-1.5 py-0.5 rounded text-white font-mono">BOT</span>
                        <span className="text-[11px] text-zinc-500">Today at 4:20 PM</span>
                      </div>

                      {/* Typing indicator or embed */}
                      {isTyping ? (
                        <div className="flex items-center gap-2 text-xs font-mono text-fuchsia-400 bg-black/40 px-3 py-2 rounded-xl border border-white/5 w-fit">
                          <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-bounce" />
                          <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-bounce delay-100" />
                          <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-bounce delay-200" />
                          <span className="ml-1">VePlexity Gemini 2.0 is reasoning...</span>
                        </div>
                      ) : (
                        <div className="bg-[#1b0d2a]/90 border-l-4 border-fuchsia-500 p-5 rounded-r-2xl border border-white/5 shadow-xl">
                          <div className="text-xs font-mono uppercase tracking-widest text-fuchsia-400 font-bold mb-2">
                            {aiResponse.title}
                          </div>
                          <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-sans">
                            {aiResponse.text}
                          </p>
                          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                            <span>{aiResponse.author}</span>
                            <span className="text-emerald-400">Latency: 218ms</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Input emulator */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={`Type a prompt for /${selectedPersona}...`}
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && customInput.trim()) {
                        triggerAiPrompt(customInput, `Response generated by Gemini 2.0 for "${customInput}": Keep creating and building high-level Discord tools! 🔥`);
                        setCustomInput("");
                      }
                    }}
                    className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-fuchsia-500"
                  />
                  <button
                    onClick={() => {
                      if (customInput.trim()) {
                        triggerAiPrompt(customInput, `Response generated by Gemini 2.0 for "${customInput}": Keep creating and building high-level Discord tools! 🔥`);
                        setCustomInput("");
                      }
                    }}
                    className="neo-btn-primary px-4 py-2.5 rounded-xl text-xs font-bold text-white cursor-pointer"
                  >
                    Send
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: AUTO-MOD DEFENSE MATRIX */}
          {activeTab === "automod" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Defense Controls (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Security Parameters</h4>

                <div className="flex items-center justify-between p-4 rounded-2xl liquid-glass border border-white/5">
                  <div>
                    <div className="text-sm font-black text-white">Rate-Limit Anti-Spam</div>
                    <div className="text-xs text-zinc-400">Blocks &gt; 5 messages within 2 seconds</div>
                  </div>
                  <button
                    onClick={() => setAntiSpam(!antiSpam)}
                    className={`w-12 h-6 rounded-full transition-colors p-1 cursor-pointer ${antiSpam ? "bg-emerald-500" : "bg-zinc-700"}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${antiSpam ? "translate-x-6" : "translate-x-0"}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl liquid-glass border border-white/5">
                  <div>
                    <div className="text-sm font-black text-white">Anti-Invite Link Sniffer</div>
                    <div className="text-xs text-zinc-400">Instant delete on unauthorized invite URLs</div>
                  </div>
                  <button
                    onClick={() => setAntiInvite(!antiInvite)}
                    className={`w-12 h-6 rounded-full transition-colors p-1 cursor-pointer ${antiInvite ? "bg-emerald-500" : "bg-zinc-700"}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${antiInvite ? "translate-x-6" : "translate-x-0"}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl liquid-glass border border-white/5">
                  <div>
                    <div className="text-sm font-black text-white">Anti-Raid Lockdown Shield</div>
                    <div className="text-xs text-zinc-400">Mass-join heuristics auto-quarantine</div>
                  </div>
                  <button
                    onClick={() => setRaidShield(!raidShield)}
                    className={`w-12 h-6 rounded-full transition-colors p-1 cursor-pointer ${raidShield ? "bg-emerald-500" : "bg-zinc-700"}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${raidShield ? "translate-x-6" : "translate-x-0"}`} />
                  </button>
                </div>

                {/* Test Raid Button */}
                <button
                  onClick={triggerSimulatedRaid}
                  className="neo-btn-primary p-4 rounded-2xl text-xs font-black uppercase tracking-wider text-white flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <AlertTriangle className="w-4 h-4" />
                  Simulate Raid Attack Wave
                </button>
              </div>

              {/* Real-time ModLog Stream (7 Cols) */}
              <div className="lg:col-span-7 bg-[#12081c]/80 rounded-2xl border border-white/10 p-6 shadow-2xl">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-300">
                    <ShieldAlert className="w-4 h-4 text-emerald-400" />
                    <span>#audit-logs • Real-Time Stream</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase text-emerald-400">0.018s Avg Reaction</span>
                </div>

                <div className="flex flex-col gap-3">
                  {modLogs.map((log) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-black border ${log.badge}`}>
                          {log.action}
                        </span>
                        <div>
                          <span className="font-extrabold text-white">{log.target}</span>
                          <span className="text-zinc-400 block text-[11px]">{log.reason}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 whitespace-nowrap">{log.time}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: REACTION ROLES & VIP */}
          {activeTab === "roles" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Embed with Role Buttons (7 Cols) */}
              <div className="lg:col-span-7 bg-[#12081c]/80 rounded-2xl border-l-4 border-amber-500 p-6 border border-white/5 shadow-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🎭</span>
                  <h3 className="text-lg font-black text-white">VePlexity Self-Assignable Roles</h3>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed mb-6 font-mono">
                  Click the buttons below to equip or remove roles instantly. Your member permissions update in real-time across the server.
                </p>

                {/* Role Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {availableRoles.map((r) => {
                    const active = selectedRoles.includes(r.name);
                    return (
                      <button
                        key={r.name}
                        onClick={() => toggleRole(r.name)}
                        className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                          active
                            ? `${r.color} shadow-lg shadow-black/50`
                            : "bg-black/40 border-white/10 text-zinc-400 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-black text-xs uppercase tracking-wider">{r.name}</span>
                          {active && <Check className="w-4 h-4 text-emerald-400" />}
                        </div>
                        <span className="text-[10px] text-zinc-400">{r.perk}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="text-[11px] font-mono text-zinc-500">
                  Tip: Join <a href="https://www.discord.gg/R6ZrqpWEcc" target="_blank" rel="noreferrer" className="text-fuchsia-400 underline">discord.gg/R6ZrqpWEcc</a> or support on Buy Me a Coffee to get the permanent VIP Supporter badge!
                </div>
              </div>

              {/* Right Column: Live User Profile Card Preview (5 Cols) */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-sm rounded-3xl liquid-glass-glow border-2 border-white/15 p-6 shadow-2xl">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-500 to-fuchsia-500 p-0.5 relative">
                      <div className="w-full h-full rounded-2xl bg-black flex items-center justify-center font-black text-lg text-white">
                        YOU
                      </div>
                      <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-black absolute -bottom-1 -right-1" />
                    </div>
                    <div>
                      <div className="text-base font-black text-white">Server Member</div>
                      <div className="text-xs text-zinc-400 font-mono">ID: 470472629091041281</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-[11px] font-mono uppercase text-zinc-400 font-bold mb-2">Equipped Roles ({selectedRoles.length})</div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedRoles.map((role) => (
                        <span
                          key={role}
                          className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-white/10 text-white border border-white/15 flex items-center gap-1"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400" />
                          {role}
                        </span>
                      ))}
                      {selectedRoles.length === 0 && (
                        <span className="text-xs text-zinc-500 italic">No roles selected</span>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-zinc-500">VIP Rank:</span>
                    <span className={selectedRoles.includes("VIP Supporter ☕") ? "text-amber-400 font-bold" : "text-zinc-500"}>
                      {selectedRoles.includes("VIP Supporter ☕") ? "☕ GOLD SUPPORTER" : "FREE TIER"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
}
