"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings, ChevronRight, Search, 
  CheckCircle2, Sparkles, Filter, X,
  Radio, Music, Award, Lock, Users,
  Gift, Star, Gamepad2, Zap, Bot,
  Shield, FileText, Bell, Megaphone,
  Copy, Check
} from "lucide-react";
import { TactileToggle } from "./TactileToggle";
import { dashboardAudio } from "@/lib/dashboardAudio";

export type ModuleCategory = "all" | "essentials" | "engagement" | "security" | "social" | "utilities";

export interface OverviewModuleItem {
  id: string;
  name: string;
  desc: string;
  category: ModuleCategory;
  categoryLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  bgColor: string;
  active: boolean;
  onToggle: (val: boolean) => void;
}

interface GuildDetails {
  id: string;
  name: string;
  icon: string | null;
  memberCount: number;
}

interface ServerOverviewTabProps {
  guild: GuildDetails | null;
  guildIconUrl: string | null;
  guildInitials: string;
  setActiveTab: (tab: any) => void;
  modules: OverviewModuleItem[];
}

const CATEGORY_TABS: Array<{ id: ModuleCategory; label: string }> = [
  { id: "all", label: "All Modules" },
  { id: "essentials", label: "Essentials" },
  { id: "engagement", label: "Engagement & XP" },
  { id: "security", label: "Security & Mod" },
  { id: "social", label: "Social Alerts" },
  { id: "utilities", label: "Utilities" },
];

// Specialized live preview telemetry badge for each module cartridge
function getModulePreviewBadge(id: string) {
  switch (id) {
    case "notifications":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-[10px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span>YouTube • Twitch • X • TikTok Live</span>
        </span>
      );
    case "music":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300 font-mono text-[10px] font-bold">
          <span className="flex items-end gap-0.5 h-2.5">
            <span className="w-0.5 h-2 bg-sky-400 animate-pulse" />
            <span className="w-0.5 h-3 bg-sky-400" />
            <span className="w-0.5 h-1.5 bg-sky-400 animate-pulse" />
          </span>
          <span>24/7 Lossless Stream • -14 LUFS DSP</span>
        </span>
      );
    case "leveling":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-[10px] font-bold">
          <span>⭐ Rank Studio • 2x Voice XP Multiplier</span>
        </span>
      );
    case "automod":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 font-mono text-[10px] font-bold">
          <span>🛡️ 0-Day Anti-Raid • Link & Spam Shield</span>
        </span>
      );
    case "welcome":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-[10px] font-bold">
          <span>👋 Canvas Graphic Cards • Instant Auto-Role</span>
        </span>
      );
    case "reactionroles":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 font-mono text-[10px] font-bold">
          <span>🎭 Interactive Discord Button & Dropdown Picker</span>
        </span>
      );
    case "rewards":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] font-bold">
          <span>🎙️ Voice Time Farming • Activity Role Tiers</span>
        </span>
      );
    case "starboard":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-[10px] font-bold">
          <span>⭐ Community Hall of Fame Pinning</span>
        </span>
      );
    case "community":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/30 text-fuchsia-300 font-mono text-[10px] font-bold">
          <span>🎂 Automated Birthday Shoutouts • Counting Streaks</span>
        </span>
      );
    case "boosters":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-[10px] font-bold">
          <span>⚡ Automatic Server Booster Appreciation</span>
        </span>
      );
    case "ai":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 font-mono text-[10px] font-bold">
          <span>🤖 Gemini 1.5 Flash Conversational Brain</span>
        </span>
      );
    default:
      return null;
  }
}

export function ServerOverviewTab({
  guild,
  guildIconUrl,
  guildInitials,
  setActiveTab,
  modules,
}: ServerOverviewTabProps) {
  const [activeCategory, setActiveCategory] = useState<ModuleCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(false);

  const filteredModules = useMemo(() => {
    return modules.filter((m) => {
      const matchesCategory =
        activeCategory === "all" || m.category === activeCategory;
      const matchesQuery =
        !searchQuery ||
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [modules, activeCategory, searchQuery]);

  const activeModulesCount = useMemo(
    () => modules.filter((m) => m.active).length,
    [modules]
  );

  const handleCopyId = () => {
    if (guild?.id) {
      navigator.clipboard.writeText(guild.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto">
      {/* ─── 1. HIGH-PRECISION SERVER COMMAND DECK ─────────────────────────────── */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0d0f17] border border-zinc-800/80 shadow-2xl relative overflow-hidden">
        {/* Luminous Mesh Backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.12),transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[radial-gradient(ellipse_at_bottom_left,rgba(88,101,242,0.08),transparent_70%)] pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5 sm:gap-6">
            {/* Holographic Server Avatar Cradle */}
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-[#121522] border-2 border-emerald-500/50 p-1 shadow-[0_0_30px_rgba(16,185,129,0.2)] overflow-hidden flex items-center justify-center shrink-0 relative group">
              <div className="absolute inset-0 bg-emerald-500/10 animate-pulse pointer-events-none" />
              {guildIconUrl ? (
                <img
                  src={guildIconUrl}
                  alt={guild?.name || "Server"}
                  className="w-full h-full object-cover rounded-xl relative z-10"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <span className="font-mono text-2xl font-black text-white relative z-10">
                  {guildInitials}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {guild?.name}
                </h1>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 font-black flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  FLEET ENGINE ONLINE
                </span>
              </div>

              {/* Live Telemetry Chips */}
              <div className="flex items-center gap-2.5 flex-wrap text-xs">
                <button
                  onClick={handleCopyId}
                  title="Click to copy Server ID"
                  className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white font-mono text-[11px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>ID: {guild?.id}</span>
                  {copiedId ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3 text-zinc-500" />
                  )}
                </button>

                <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium">
                  👥 {guild?.memberCount?.toLocaleString() || 0} Members
                </span>

                <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-mono font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{activeModulesCount} of {modules.length} Armed</span>
                </span>

                <span className="px-3 py-1 rounded-full bg-[#5865F2]/15 border border-[#5865F2]/40 text-[#5865F2] font-mono text-[11px] font-bold">
                  💎 VIP Perks Active
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-stretch lg:self-auto justify-end">
            <Link
              href="/dashboard"
              className="btn-secondary px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-sm hover:border-zinc-700"
            >
              <span>Switch Server</span>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* ─── 2. CATEGORY HUD & SEARCH BAR ───────────────────────────────── */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-1">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORY_TABS.map((tab) => {
            const count =
              tab.id === "all"
                ? modules.length
                : modules.filter((m) => m.category === tab.id).length;
            const isSelected = activeCategory === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  dashboardAudio.playClick();
                  setActiveCategory(tab.id);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 select-none ${
                  isSelected
                    ? "bg-zinc-100 text-zinc-950 shadow-md shadow-white/10"
                    : "bg-[#0d0f17] text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected
                      ? "bg-zinc-900 text-zinc-100"
                      : "bg-zinc-800 text-zinc-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative shrink-0 w-full md:w-72">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#0d0f17] border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ─── 3. VIBRANT HIGH-TECH MODULE CARTRIDGES GRID ───────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredModules.map((module) => {
          const Icon = module.icon;
          const previewBadge = getModulePreviewBadge(module.id);

          return (
            <motion.div
              key={module.id}
              whileHover={{ y: -4, transition: { duration: 0.18 } }}
              onClick={() => {
                dashboardAudio.playClick();
                setActiveTab(module.id);
              }}
              className="rounded-2xl bg-[#0d0f17] p-5 flex flex-col justify-between gap-4 group border border-zinc-800/80 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-200 cursor-pointer relative overflow-hidden"
            >
              {/* Luminous Top Accent Glow */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent group-hover:via-emerald-400 transition-colors" />

              {/* Top Row: 3D Squircle Icon & Tactile Toggle */}
              <div className="flex items-start justify-between gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg border ${module.bgColor} shadow-md shrink-0 group-hover:scale-105 transition-transform duration-200`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <div
                  className="pt-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <TactileToggle
                    checked={module.active}
                    onChange={(checked) => module.onToggle(checked)}
                    label={`Toggle ${module.name}`}
                  />
                </div>
              </div>

              {/* Middle Section: Title, Category Badge & Live Cue */}
              <div className="space-y-2 flex-1">
                <div>
                  <h3 className="font-black text-base text-white group-hover:text-emerald-300 transition-colors tracking-tight line-clamp-1">
                    {module.name}
                  </h3>
                  <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-500 bg-zinc-900/90 px-2 py-0.5 rounded border border-zinc-800 mt-1">
                    {module.categoryLabel}
                  </span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                  {module.desc}
                </p>

                {previewBadge && (
                  <div className="pt-1">
                    {previewBadge}
                  </div>
                )}
              </div>

              {/* Bottom Row: Configure Studio Button */}
              <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[11px] font-mono">
                  {module.active ? (
                    <span className="flex items-center gap-1 text-emerald-400 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      ACTIVE
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-zinc-500 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                      STANDBY
                    </span>
                  )}
                </div>

                <span className="py-1 px-2.5 rounded-lg bg-zinc-900 group-hover:bg-emerald-500 text-zinc-300 group-hover:text-zinc-950 font-black text-xs transition-colors flex items-center gap-1">
                  <span>STUDIO</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 stroke-[3]" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredModules.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-[#0d0f17] border border-zinc-800 text-zinc-400 space-y-2">
          <p className="font-bold text-sm text-white">No modules found</p>
          <p className="text-xs">No active bot feature matches &ldquo;{searchQuery}&rdquo;</p>
        </div>
      )}
    </div>
  );
}
