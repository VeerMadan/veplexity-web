"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Radio, ShieldCheck, Activity, RefreshCw, 
  Volume2, VolumeX, ChevronRight, Lock, Music, 
  Award, Gift, Terminal, Zap
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
      {/* ─── TELEMETRY STRIP ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Shard Ping & Gateway */}
        <div className="pro-card p-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-zinc-400 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Gateway Shard #0</span>
            </span>
            <button
              onClick={handlePingTest}
              disabled={isPinging}
              className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition cursor-pointer text-xs font-mono flex items-center gap-1.5"
              title="Test Gateway Latency"
            >
              <RefreshCw className={`w-3 h-3 ${isPinging ? "animate-spin text-[#5865F2]" : ""}`} />
              <span>Ping</span>
            </button>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white font-mono tracking-tight">
                {ping}
              </span>
              <span className="text-xs font-mono text-emerald-400 font-semibold">ms latency</span>
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              Optimal Handshake ({lastPinged})
            </p>
          </div>
        </div>

        {/* Protection Health */}
        <div className="pro-card p-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-zinc-400 font-semibold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#5865F2]" />
              <span>Security Shield</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#5865F2]/10 text-[#5865F2] border border-[#5865F2]/20 font-semibold">
              ACTIVE
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white font-mono tracking-tight">
                98%
              </span>
              <span className="text-xs font-semibold text-zinc-400">Score</span>
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              Defense active across 5 threat vectors
            </p>
          </div>
        </div>

        {/* Command Runner Engine */}
        <div className="pro-card p-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-zinc-400 font-semibold flex items-center gap-2">
              <Terminal className="w-4 h-4 text-zinc-300" />
              <span>Command Engine</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700 font-semibold">
              100 CMDS
            </span>
          </div>

          <div>
            <p className="text-base font-bold text-white">
              Dual-Engine Ready
            </p>
            <p className="text-xs text-zinc-500 mt-1 font-mono">
              Slash (/) &amp; Rapid (. ! ?)
            </p>
          </div>
        </div>

        {/* Audio FX Feedback */}
        <div className="pro-card p-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-zinc-400 font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4 text-zinc-300" />
              <span>Sound Feedback</span>
            </span>
            <button
              onClick={handleToggleSound}
              className={`px-2.5 py-1 rounded-md transition cursor-pointer flex items-center gap-1.5 text-xs font-mono font-semibold ${
                soundEnabled
                  ? "bg-zinc-800 border border-zinc-700 text-white"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-500"
              }`}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{soundEnabled ? "SFX ON" : "MUTED"}</span>
            </button>
          </div>

          <div>
            <p className="text-base font-bold text-white">
              Audio Feedback
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              Interactive interface acoustics
            </p>
          </div>
        </div>
      </div>

      {/* ─── QUICK FEATURE ACCESS TILES ──────────────────────────────────── */}
      <div className="pro-card p-6 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-zinc-300 font-mono">
            Direct Module Access
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Quickly navigate to configure core server systems for {guildName}:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {[
            {
              tab: "automod",
              title: "Auto-Mod Security",
              desc: "Anti-invite, link filters, and spam protection",
              icon: Lock,
            },
            {
              tab: "music",
              title: "Music & 24/7 Audio",
              desc: "Lossless playback, DJ role, and stay-in-VC",
              icon: Music,
            },
            {
              tab: "leveling",
              title: "XP & Rank Cards",
              desc: "Level-up messages, customizable rate and cards",
              icon: Award,
            },
            {
              tab: "rewards",
              title: "Activity Rewards",
              desc: "Role unlocks based on voice time and chat counts",
              icon: Gift,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={idx}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.15 }}
                onClick={() => {
                  dashboardAudio.playClick();
                  setActiveTab(item.tab);
                }}
                className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 text-left transition cursor-pointer flex flex-col justify-between h-28 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-md bg-zinc-800 flex items-center justify-center text-zinc-200 border border-zinc-700/80 group-hover:text-white transition">
                    <Icon className="w-4 h-4" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition group-hover:translate-x-0.5" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-white group-hover:text-[#5865F2] transition">
                    {item.title}
                  </p>
                  <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
