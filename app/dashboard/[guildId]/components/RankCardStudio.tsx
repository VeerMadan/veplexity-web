"use client";

import React, { useState } from "react";
import { 
  Award, Sparkles, Zap, Star, CheckCircle2, 
  Send, RefreshCw, Trophy, Flame, Layers 
} from "lucide-react";
import { TactileToggle } from "./TactileToggle";
import { dashboardAudio } from "@/lib/dashboardAudio";

interface RankCardStudioProps {
  levelingEnabled: boolean;
  setLevelingEnabled: (v: boolean) => void;
  levelingChannel: string;
  setLevelingChannel: (v: string) => void;
  levelingMessage: string;
  setLevelingMessage: (v: string) => void;
  xpRate: number;
  setXpRate: (v: number) => void;
  channels: Array<{ id: string; name: string }>;
}

export const RankCardStudio: React.FC<RankCardStudioProps> = ({
  levelingEnabled,
  setLevelingEnabled,
  levelingChannel,
  setLevelingChannel,
  levelingMessage,
  setLevelingMessage,
  xpRate,
  setXpRate,
  channels,
}) => {
  const [cardTheme, setCardTheme] = useState<"sunset" | "cyber" | "midnight" | "violet">("sunset");
  const [simulatedLevel, setSimulatedLevel] = useState(42);
  const [isLevelingUp, setIsLevelingUp] = useState(false);

  const themeGradients = {
    sunset: "from-orange-600/30 via-pink-600/20 to-purple-900/40 border-orange-500/30",
    cyber: "from-emerald-600/30 via-teal-600/20 to-cyan-900/40 border-emerald-500/30",
    midnight: "from-zinc-800/40 via-zinc-900/40 to-black/60 border-zinc-700/30",
    violet: "from-fuchsia-600/30 via-purple-600/20 to-indigo-900/40 border-fuchsia-500/30",
  };

  const handleSimulateLevelUp = () => {
    setIsLevelingUp(true);
    dashboardAudio.playSuccessChime();
    setTimeout(() => {
      setSimulatedLevel((prev) => prev + 1);
      setIsLevelingUp(false);
    }, 400);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start w-full">
      {/* ─── LEFT: SETTINGS & CONFIG (7 COLS) ────────────────────────────────── */}
      <div className="xl:col-span-7 space-y-6">
        <div className="p-6 sm:p-8 rounded-3xl glass-liquid-card space-y-7 relative overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-amber-600/20 via-orange-500/10 to-yellow-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2.5">
                  <span>Leveling &amp; XP Progression Studio</span>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold">
                    ARCADE XP
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                  Reward active chatters and voice members with automatic XP, leaderboard ranks, and rank cards.
                </p>
              </div>
            </div>

            <span className="px-3.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold shrink-0">
              💎 Free Lifetime VIP
            </span>
          </div>

          {/* Master Enable Toggle */}
          <div
            onClick={() => setLevelingEnabled(!levelingEnabled)}
            className="p-5 rounded-2xl glass-liquid-card flex items-center justify-between gap-4 cursor-pointer select-none"
          >
            <div>
              <p className="font-extrabold text-sm sm:text-base text-white">Enable Leveling &amp; Rank System</p>
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                Automatically award 15-25 XP per chat message and 10 XP per minute in voice channels.
              </p>
            </div>

            <TactileToggle
              checked={levelingEnabled}
              onChange={setLevelingEnabled}
              color="orange"
            />
          </div>

          {/* XP Multiplier Slider */}
          <div className="space-y-3.5 p-5 sm:p-6 rounded-2xl glass-liquid">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-xs sm:text-sm text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-orange-400" />
                  <span>XP Rate Multiplier (Server Boost)</span>
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">Accelerate community progression speed.</p>
              </div>
              <span className="text-base font-black font-mono text-orange-400 px-3 py-1 rounded-xl bg-orange-500/10 border border-orange-500/20">
                {xpRate.toFixed(1)}x SPEED
              </span>
            </div>

            <input
              type="range"
              min="0.5"
              max="3"
              step="0.5"
              value={xpRate}
              onChange={(e) => {
                dashboardAudio.playClick();
                setXpRate(Number(e.target.value));
              }}
              className="w-full h-2 bg-[#100a18] rounded-lg appearance-none cursor-pointer accent-orange-500"
            />

            <div className="flex justify-between text-[10px] font-mono text-zinc-500">
              <span>0.5x Slow</span>
              <span>1.0x Standard</span>
              <span>2.0x Double XP Weekend</span>
              <span>3.0x Maximum</span>
            </div>
          </div>

          {/* Announcement Channel & Template */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-300">Level-Up Announcement Channel</label>
              <select
                value={levelingChannel}
                onChange={(e) => setLevelingChannel(e.target.value)}
                className="w-full bg-[#1c1229] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-orange-500/50"
              >
                <option value="">Same channel where user leveled up</option>
                {channels.map((c) => (
                  <option key={c.id} value={c.id}>
                    #{c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-300">Level-Up Template Message</label>
              <input
                type="text"
                value={levelingMessage}
                onChange={(e) => setLevelingMessage(e.target.value)}
                placeholder="GG {user}, you leveled up to Level {level}! 🎉"
                className="w-full bg-[#1c1229] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-orange-500/50"
              />
              <p className="text-[10px] font-mono text-zinc-500">Variables: {'{user}'}, {'{level}'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── RIGHT: LIVE RANK CARD VISUALIZER & SIMULATOR (5 COLS) ──────────── */}
      <div className="xl:col-span-5 space-y-6 xl:sticky xl:top-24">
        <div className="p-6 sm:p-7 rounded-3xl glass-liquid-card space-y-5">
          {/* Card Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Trophy className="w-4.5 h-4.5 text-amber-400" />
              <span className="font-mono text-xs sm:text-sm uppercase tracking-wider font-bold text-white">
                Live Discord Rank Card Preview
              </span>
            </div>
            <span className="text-[10px] font-mono text-amber-300 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30 font-bold">
              Interactive
            </span>
          </div>

          {/* Theme Selector Chips */}
          <div className="space-y-2">
            <p className="text-xs font-mono text-zinc-400 font-bold uppercase">Card Aesthetic Theme:</p>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: "sunset", label: "Sunset" },
                { id: "cyber", label: "Cyber" },
                { id: "midnight", label: "Obsidian" },
                { id: "violet", label: "Vice" },
              ].map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    dashboardAudio.playClick();
                    setCardTheme(theme.id as any);
                  }}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition cursor-pointer text-center neo-liquid-btn ${
                    cardTheme === theme.id
                      ? "bg-amber-500/25 border-amber-500/50 text-amber-200 shadow-md shadow-amber-500/20"
                      : "border-white/10 text-zinc-400 hover:text-white"
                  }`}
                >
                  {theme.label}
                </button>
              ))}
            </div>
          </div>

          {/* The Live Rendered Rank Card */}
          <div className={`p-6 rounded-2xl bg-gradient-to-br ${themeGradients[cardTheme]} border shadow-2xl relative overflow-hidden space-y-4`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-fuchsia-600 flex items-center justify-center font-black text-white text-xl shadow-lg border border-white/20">
                    V
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-5.5 h-5.5 rounded-full bg-emerald-500 border-2 border-black flex items-center justify-center text-[10px] font-black text-black">
                    ✓
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-black text-white">Veer Madan</h4>
                  <p className="text-xs font-mono text-zinc-300">#0001 • Server Architect</p>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-baseline gap-1 justify-end">
                  <span className="text-xs font-mono text-zinc-400 uppercase">RANK</span>
                  <span className="text-2xl font-black text-amber-400 font-mono">#1</span>
                </div>
                <div className="flex items-baseline gap-1 justify-end">
                  <span className="text-xs font-mono text-zinc-400 uppercase">LEVEL</span>
                  <span className="text-3xl font-black text-white font-mono">{simulatedLevel}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-300 font-bold">XP Progress</span>
                <span className="text-amber-300 font-bold">14,850 / 18,000 XP (82%)</span>
              </div>
              <div className="w-full h-3.5 bg-black/60 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-fuchsia-500 transition-all duration-500 shadow-[0_0_14px_rgba(249,115,22,0.6)]"
                  style={{ width: isLevelingUp ? "100%" : "82%" }}
                />
              </div>
            </div>
          </div>

          {/* Test Action Trigger */}
          <button
            onClick={handleSimulateLevelUp}
            disabled={isLevelingUp}
            className="w-full py-3.5 px-5 rounded-xl neo-liquid-primary text-white font-black uppercase tracking-wider text-xs sm:text-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-lg shadow-amber-500/20"
          >
            <Sparkles className="w-4.5 h-4.5" />
            <span>Simulate Level Up Alert</span>
          </button>
        </div>
      </div>
    </div>
  );
};
