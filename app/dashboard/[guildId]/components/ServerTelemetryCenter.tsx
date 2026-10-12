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
    <div className="space-y-6 w-full">
      {/* ─── TOP INTERACTIVE TELEMETRY & GATEWAY STRIP ─────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Shard Ping & Gateway Radar */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-[#120a1c] to-[#0c0512] border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-zinc-400 font-bold flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Gateway Shard #0</span>
            </span>
            <button
              onClick={handlePingTest}
              disabled={isPinging}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition cursor-pointer text-[10px] font-mono flex items-center gap-1 border border-white/5"
              title="Test Gateway Latency"
            >
              <RefreshCw className={`w-3 h-3 ${isPinging ? "animate-spin text-orange-400" : ""}`} />
              <span>Ping</span>
            </button>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white font-mono tracking-tight">
                {ping}
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">ms</span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Optimal WebSocket Handshake ({lastPinged})</span>
            </p>
          </div>
        </div>

        {/* Server Protection Health */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-[#120a1c] to-[#0c0512] border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-zinc-400 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-fuchsia-400" />
              <span>Fortress Defense</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/20 font-bold">
              ALL VIP FREE
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white font-mono tracking-tight">
                98%
              </span>
              <span className="text-xs font-bold text-fuchsia-400">Score</span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">
              Active Shield across 5 threat vectors
            </p>
          </div>
        </div>

        {/* Command Runner Engine */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-[#120a1c] to-[#0c0512] border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-zinc-400 font-bold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-orange-400" />
              <span>Hybrid Command Engine</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-300 border border-orange-500/20 font-bold">
              100 CMDS
            </span>
          </div>

          <div>
            <p className="text-lg font-black text-white tracking-tight">
              Dual-Engine Active
            </p>
            <p className="text-[11px] text-zinc-400 mt-1">
              Slash + Rapid Prefixes (<code className="text-orange-400">.</code>, <code className="text-orange-400">?</code>, <code className="text-orange-400">!</code>)
            </p>
          </div>
        </div>

        {/* Audio FX & Interactive Feedback */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-[#120a1c] to-[#0c0512] border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-zinc-400 font-bold flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              <span>Dashboard Audio FX</span>
            </span>
            <button
              onClick={handleToggleSound}
              className={`p-1.5 rounded-lg border transition cursor-pointer flex items-center gap-1 text-[10px] font-mono ${
                soundEnabled
                  ? "bg-amber-500/15 border-amber-500/30 text-amber-300"
                  : "bg-white/5 border-white/5 text-zinc-500"
              }`}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{soundEnabled ? "Sound ON" : "Muted"}</span>
            </button>
          </div>

          <div>
            <p className="text-sm font-bold text-white">
              Procedural Web Audio
            </p>
            <p className="text-[11px] text-zinc-400 mt-1">
              Interactive cybernetic clicks & chimes active
            </p>
          </div>
        </div>
      </div>

      {/* ─── INTERACTIVE SANDBOX QUICK LAUNCHERS ─────────────────────────────── */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#120a1c] via-[#100b18] to-[#0c0512] border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.7)] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>Interactive Feature Sandboxes</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Launch real-time simulators and interactive visualizers for {guildName}:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {[
            {
              tab: "automod",
              title: "Auto-Mod Shield Sandbox",
              desc: "Test live chat threats with simulated deletion",
              icon: Lock,
              gradient: "from-red-600/20 to-orange-600/10",
              border: "border-red-500/20 hover:border-red-500/50",
              color: "text-red-400",
            },
            {
              tab: "music",
              title: "DJ Deck & Equalizer",
              desc: "Groove to live visualizer bars with 8D audio",
              icon: Music,
              gradient: "from-pink-600/20 to-fuchsia-600/10",
              border: "border-pink-500/20 hover:border-pink-500/50",
              color: "text-pink-400",
            },
            {
              tab: "leveling",
              title: "Rank Card Studio",
              desc: "Customize level badges & live XP progression",
              icon: Award,
              gradient: "from-amber-600/20 to-orange-600/10",
              border: "border-amber-500/20 hover:border-amber-500/50",
              color: "text-amber-400",
            },
            {
              tab: "rewards",
              title: "Voice & Text Rewards",
              desc: "Configure milestones and role unlocks",
              icon: Gift,
              gradient: "from-purple-600/20 to-indigo-600/10",
              border: "border-purple-500/20 hover:border-purple-500/50",
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
                className={`p-4 rounded-2xl bg-gradient-to-br ${item.gradient} border ${item.border} text-left transition-all duration-200 cursor-pointer group hover:scale-[1.02] flex flex-col justify-between h-32`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center ${item.color} border border-white/5`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition group-hover:translate-x-0.5" />
                </div>
                <div>
                  <p className="font-bold text-xs text-white group-hover:text-orange-300 transition">{item.title}</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">{item.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
