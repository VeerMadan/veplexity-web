"use client";

import React, { useState } from "react";
import { 
  Award, Sparkles, Zap, Star, CheckCircle2, 
  RefreshCw, Trophy
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
  const [cardTheme, setCardTheme] = useState<"obsidian" | "blurple" | "slate" | "emerald">("obsidian");
  const [simulatedLevel, setSimulatedLevel] = useState(42);
  const [isLevelingUp, setIsLevelingUp] = useState(false);

  const themeStyles = {
    obsidian: {
      card: "bg-zinc-950 border-zinc-800 text-white",
      bar: "bg-[#5865F2]",
      badge: "text-zinc-400 font-mono",
    },
    blurple: {
      card: "bg-[#101426] border-[#5865F2]/40 text-white",
      bar: "bg-[#5865F2]",
      badge: "text-[#5865F2] font-mono",
    },
    slate: {
      card: "bg-zinc-900 border-zinc-700 text-white",
      bar: "bg-zinc-300",
      badge: "text-zinc-300 font-mono",
    },
    emerald: {
      card: "bg-[#0b1c14] border-emerald-800/60 text-white",
      bar: "bg-emerald-500",
      badge: "text-emerald-400 font-mono",
    },
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
        <div className="pro-card p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-zinc-800">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-100 shrink-0">
                <Award className="w-6 h-6 text-[#5865F2]" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2.5">
                  <span>Leveling &amp; Rank Progression</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#5865F2]/10 text-[#5865F2] border border-[#5865F2]/20 font-semibold">
                    XP ENGINE
                  </span>
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Reward active chatters and voice members with automatic XP, leaderboard tiers, and rank cards.
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs font-semibold shrink-0">
              Free VIP Feature
            </span>
          </div>

          {/* Master Enable Toggle */}
          <div
            onClick={() => setLevelingEnabled(!levelingEnabled)}
            className="p-4.5 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition flex items-center justify-between gap-4 cursor-pointer select-none"
          >
            <div>
              <p className="font-semibold text-sm text-white">Enable Leveling &amp; Rank System</p>
              <p className="text-xs text-zinc-400 mt-0.5">
                Automatically award 15-25 XP per chat message and 10 XP per minute in voice channels.
              </p>
            </div>

            <TactileToggle
              checked={levelingEnabled}
              onChange={setLevelingEnabled}
              color="emerald"
            />
          </div>

          {/* XP Multiplier Slider */}
          <div className="space-y-3 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-xs sm:text-sm text-white flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#5865F2]" />
                  <span>XP Rate Multiplier</span>
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">Adjust progression speed for your community.</p>
              </div>
              <span className="text-sm font-bold font-mono text-white px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700">
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
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#5865F2]"
            />

            <div className="flex justify-between text-[10px] font-mono text-zinc-500">
              <span>0.5x Slow</span>
              <span>1.0x Standard</span>
              <span>2.0x Double XP</span>
              <span>3.0x Max</span>
            </div>
          </div>

          {/* Announcement Channel & Template */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Level-Up Announcement Channel</label>
              <select
                value={levelingChannel}
                onChange={(e) => setLevelingChannel(e.target.value)}
                className="w-full pro-input px-3 py-2 text-xs text-white"
              >
                <option value="">Same channel where user leveled up</option>
                {channels.map((c) => (
                  <option key={c.id} value={c.id}>
                    #{c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Level-Up Template Message</label>
              <input
                type="text"
                value={levelingMessage}
                onChange={(e) => setLevelingMessage(e.target.value)}
                placeholder="GG {user}, you leveled up to Level {level}!"
                className="w-full pro-input px-3 py-2 text-xs text-white"
              />
              <p className="text-[10px] font-mono text-zinc-500">Variables: {'{user}'}, {'{level}'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── RIGHT: LIVE RANK CARD PREVIEW (5 COLS) ─────────────────────────── */}
      <div className="xl:col-span-5 space-y-6">
        <div className="pro-card p-6 space-y-5">
          {/* Card Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-zinc-300" />
              <span className="font-mono text-xs uppercase tracking-wider font-bold text-white">
                Rank Card Preview
              </span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-md border border-zinc-700 font-semibold">
              PREVIEW
            </span>
          </div>

          {/* Theme Selector Chips */}
          <div className="space-y-1.5">
            <p className="text-xs font-mono text-zinc-400 font-semibold uppercase">Color Aesthetic:</p>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: "obsidian", label: "Obsidian" },
                { id: "blurple", label: "Blurple" },
                { id: "slate", label: "Slate" },
                { id: "emerald", label: "Emerald" },
              ].map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    dashboardAudio.playClick();
                    setCardTheme(theme.id as any);
                  }}
                  className={`py-1.5 px-2 rounded-md text-xs font-semibold border transition cursor-pointer text-center ${
                    cardTheme === theme.id
                      ? "bg-zinc-800 border-[#5865F2] text-white"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  {theme.label}
                </button>
              ))}
            </div>
          </div>

          {/* The Live Rendered Rank Card */}
          <div className={`p-5 rounded-xl border ${themeStyles[cardTheme].card} space-y-4 transition-colors`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <div className="w-13 h-13 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-white text-lg border border-zinc-700">
                    U
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-black" />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white">Server Member</h4>
                  <p className="text-xs font-mono text-zinc-400">#0001 • Top Contributor</p>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-baseline gap-1 justify-end">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase">RANK</span>
                  <span className="text-lg font-bold text-white font-mono">#1</span>
                </div>
                <div className="flex items-baseline gap-1 justify-end">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase">LEVEL</span>
                  <span className="text-2xl font-black text-white font-mono">{simulatedLevel}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400">XP Progress</span>
                <span className="text-zinc-300 font-semibold">14,850 / 18,000 XP (82%)</span>
              </div>
              <div className="w-full h-2.5 bg-zinc-900 rounded-full overflow-hidden p-0.5 border border-zinc-800">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${themeStyles[cardTheme].bar}`}
                  style={{ width: isLevelingUp ? "100%" : "82%" }}
                />
              </div>
            </div>
          </div>

          {/* Test Action Trigger */}
          <button
            onClick={handleSimulateLevelUp}
            disabled={isLevelingUp}
            className="w-full py-2.5 px-4 rounded-lg bg-[#5865F2] hover:bg-[#4752c4] text-white font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Test Level Up Sound &amp; Progress</span>
          </button>
        </div>
      </div>
    </div>
  );
};
