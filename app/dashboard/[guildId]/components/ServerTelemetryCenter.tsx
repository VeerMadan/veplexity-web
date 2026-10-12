"use client";

import React, { useState } from "react";
import { 
  Zap, Radio, Activity, ShieldCheck, Cpu, 
  Terminal, Sparkles, Volume2, VolumeX, RefreshCw, 
  ChevronRight, ArrowRight, Music, Award, Gift, Lock 
} from "lucide-react";
import { dashboardAudio } from "@/lib/dashboardAudio";

interface ServerTelemetryCenterProps {
  guildName: string;
  memberCount: number;
  setActiveTab: (tab: any) => void;
}

export const ServerTelemetryCenter: React.FC<ServerTelemetryCenterProps> = ({
  guildName,
  memberCount,
  setActiveTab,
}) => {
  const [ping, setPing] = useState(14);
  const [isPinging, setIsPinging] = useState(false);
  const [lastPinged, setLastPinged] = useState("Just now");
  const [soundEnabled, setSoundEnabled] = useState(dashboardAudio.enabled);

  const handlePingTest = () => {
    setIsPinging(true);
    dashboardAudio.playPingBlip();
    setTimeout(() => {
      const newPing = Math.floor(Math.random() * 8) + 11; // 11-18ms
      setPing(newPing);
      setIsPinging(false);
      setLastPinged("Just now");
      dashboardAudio.playClick();
    }, 450);
  };

  const handleToggleSound = () => {
    const next = dashboardAudio.toggleSound();
    setSoundEnabled(next);
  };

  return (
    <div className="space-y-6 sm:space-y-8 w-full">
      {/* ─── TOP INTERACTIVE TELEMETRY & GATEWAY STRIP ─────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Shard Ping & Gateway Radar */}
        <div className="p-6 sm:p-7 rounded-3xl glass-liquid-card flex flex-col justify-between space-y-4 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-zinc-300 font-bold flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Gateway Shard #0</span>
            </span>
            <button
              onClick={handlePingTest}
              disabled={isPinging}
              className="px-2.5 py-1.5 rounded-xl neo-liquid-btn text-zinc-300 hover:text-white transition cursor-pointer text-xs font-mono flex items-center gap-1.5"
              title="Test Gateway Latency"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? "animate-spin text-orange-400" : ""}`} />
              <span>Ping</span>
            </button>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
                {ping}
              </span>
              <span className="text-sm font-mono text-emerald-400 font-bold">ms</span>
            </div>
            <p className="text-xs text-zinc-400 mt-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <span>Optimal Handshake ({lastPinged})</span>
            </p>
          </div>
        </div>

        {/* Server Protection Health */}
        <div className="p-6 sm:p-7 rounded-3xl glass-liquid-card flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-zinc-300 font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-fuchsia-400" />
              <span>Fortress Defense</span>
            </span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30 font-bold">
              VIP FREE
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
                98%
              </span>
              <span className="text-sm font-bold text-fuchsia-400">Score</span>
            </div>
            <p className="text-xs text-zinc-400 mt-2">
              Active Shield across 5 threat vectors
            </p>
          </div>
        </div>

        {/* Command Runner Engine */}
        <div className="p-6 sm:p-7 rounded-3xl glass-liquid-card flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-zinc-300 font-bold flex items-center gap-2">
              <Terminal className="w-4 h-4 text-orange-400" />
              <span>Hybrid Engine</span>
            </span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-orange-500/15 text-orange-300 border border-orange-500/30 font-bold">
              100 CMDS
            </span>
          </div>

          <div>
            <p className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Dual-Engine Active
            </p>
            <p className="text-xs text-zinc-400 mt-2">
              Slash + Rapid Prefixes (<code className="text-orange-400 font-bold">.</code>, <code className="text-orange-400 font-bold">?</code>, <code className="text-orange-400 font-bold">!</code>)
            </p>
          </div>
        </div>

        {/* Audio FX & Interactive Feedback */}
        <div className="p-6 sm:p-7 rounded-3xl glass-liquid-card flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-zinc-300 font-bold flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              <span>Audio Feedback</span>
            </span>
            <button
              onClick={handleToggleSound}
              className={`px-2.5 py-1.5 rounded-xl neo-liquid-btn transition cursor-pointer flex items-center gap-1.5 text-xs font-mono font-bold ${
                soundEnabled
                  ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                  : "bg-white/5 border-white/10 text-zinc-500"
              }`}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-amber-400" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{soundEnabled ? "SFX ON" : "MUTED"}</span>
            </button>
          </div>

          <div>
            <p className="text-base sm:text-lg font-black text-white">
              Procedural Web Audio
            </p>
            <p className="text-xs text-zinc-400 mt-2">
              Interactive cybernetic clicks & chimes active
            </p>
          </div>
        </div>
      </div>

      {/* ─── INTERACTIVE SANDBOX QUICK LAUNCHERS ─────────────────────────────── */}
      <div className="p-7 sm:p-9 rounded-3xl glass-liquid space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-orange-400" />
              <span>Interactive Feature Sandboxes</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Launch real-time simulators and interactive visualizers for {guildName}:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              tab: "automod",
              title: "Auto-Mod Shield Sandbox",
              desc: "Test live chat threats with simulated deletion",
              icon: Lock,
              gradient: "from-red-600/20 via-orange-600/10 to-transparent",
              border: "border-red-500/30 hover:border-red-500/60",
              color: "text-red-400",
            },
            {
              tab: "music",
              title: "DJ Deck & Equalizer",
              desc: "Groove to live visualizer bars with 8D audio",
              icon: Music,
              gradient: "from-pink-600/20 via-fuchsia-600/10 to-transparent",
              border: "border-pink-500/30 hover:border-pink-500/60",
              color: "text-pink-400",
            },
            {
              tab: "leveling",
              title: "Rank Card Studio",
              desc: "Customize level badges & live XP progression",
              icon: Award,
              gradient: "from-amber-600/20 via-orange-600/10 to-transparent",
              border: "border-amber-500/30 hover:border-amber-500/60",
              color: "text-amber-400",
            },
            {
              tab: "rewards",
              title: "Voice & Text Rewards",
              desc: "Configure milestones and role unlocks",
              icon: Gift,
              gradient: "from-purple-600/20 via-indigo-600/10 to-transparent",
              border: "border-purple-500/30 hover:border-purple-500/60",
              color: "text-purple-400",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => {
                  dashboardAudio.playClick();
                  setActiveTab(item.tab);
                }}
                className={`p-5 sm:p-6 rounded-2xl bg-gradient-to-br ${item.gradient} border ${item.border} text-left transition-all duration-300 cursor-pointer group glass-liquid-card flex flex-col justify-between h-36`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center ${item.color} border border-white/10 shadow-inner`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-white transition group-hover:translate-x-1" />
                </div>
                <div>
                  <p className="font-extrabold text-sm sm:text-base text-white group-hover:text-orange-300 transition">{item.title}</p>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-1">{item.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
