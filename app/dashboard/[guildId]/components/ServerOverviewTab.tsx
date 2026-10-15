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

export type ModuleCategory = "all" | "essentials" | "engagement" | "security" | "utilities";

export interface OverviewModuleItem {
  id: string;
  name: string;
  desc: string;
  category: ModuleCategory;
  categoryLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  bgColor: string;
  badges?: string[];
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

const CATEGORY_TABS: Array<{ id: ModuleCategory; label: string; countSuffix: number }> = [
  { id: "all", label: "All Modules", countSuffix: 15 },
  { id: "essentials", label: "Essentials", countSuffix: 3 },
  { id: "engagement", label: "Engagement & XP", countSuffix: 6 },
  { id: "security", label: "Security & Mod", countSuffix: 3 },
  { id: "utilities", label: "Utilities", countSuffix: 3 },
];

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

  const availableCategories = useMemo(() => {
    return CATEGORY_TABS.filter((cat) => {
      if (cat.id === "all") return true;
      return modules.some((m) => m.category === cat.id);
    });
  }, [modules]);

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
      <div 
        className="p-5 sm:p-6 rounded-2xl border shadow-2xl relative overflow-hidden backdrop-blur-xl"
        style={{
          backgroundColor: "var(--card-bg, rgba(25, 28, 41, 0.7))",
          borderColor: "var(--border-divider, rgba(255, 255, 255, 0.08))",
        }}
      >
        {/* Luminous Mesh Backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,var(--primary,rgba(189,95,255,0.18)),transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[radial-gradient(ellipse_at_bottom_left,var(--accent,rgba(255,221,0,0.12)),transparent_70%)] pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5 sm:gap-6">
            {/* Holographic Server Avatar Cradle */}
            <div 
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl border-2 p-1 overflow-hidden flex items-center justify-center shrink-0 relative group shadow-lg"
              style={{
                backgroundColor: "rgba(12, 14, 20, 0.8)",
                borderColor: "var(--primary, #BD5FFF)",
              }}
            >
              <div 
                className="absolute inset-0 opacity-20 animate-pulse pointer-events-none" 
                style={{ backgroundColor: "var(--primary, #BD5FFF)" }}
              />
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
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold flex items-center gap-1.5 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#2ECC71] animate-pulse" />
                  <span>FLEET ENGINE ONLINE</span>
                </span>
              </div>

              {/* Live Telemetry Chips */}
              <div className="flex items-center gap-2.5 flex-wrap text-xs">
                <button
                  onClick={handleCopyId}
                  title="Click to copy Server ID"
                  className="px-2.5 py-1 rounded-full bg-black/40 border border-white/10 text-zinc-400 hover:text-white font-mono text-[11px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>ID: {guild?.id}</span>
                  {copiedId ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3 text-zinc-500" />
                  )}
                </button>

                <span className="px-3 py-1 rounded-full bg-black/40 border border-white/10 text-zinc-300 font-medium">
                  👥 {guild?.memberCount?.toLocaleString() || 0} Members
                </span>

                <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>{activeModulesCount} of {modules.length} Armed</span>
                </span>

                <span 
                  className="px-3 py-1 rounded-full font-mono text-[11px] font-bold border"
                  style={{
                    backgroundColor: "rgba(255, 221, 0, 0.12)",
                    borderColor: "rgba(255, 221, 0, 0.4)",
                    color: "#FFDD00",
                  }}
                >
                  ⚡ VIP Perks Active
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-stretch lg:self-auto justify-end">
            <Link
              href="/discord-bots"
              className="px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-sm bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20 text-white"
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
          {availableCategories.map((tab) => {
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
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 select-none border ${
                  isSelected
                    ? "text-white shadow-lg"
                    : "text-zinc-400 hover:text-white border-white/10 hover:border-white/20"
                }`}
                style={
                  isSelected
                    ? {
                        background: "linear-gradient(135deg, var(--primary, #BD5FFF) 0%, #7928CA 100%)",
                        borderColor: "var(--primary, #BD5FFF)",
                      }
                    : {
                        backgroundColor: "var(--card-bg, rgba(25, 28, 41, 0.7))",
                      }
                }
              >
                <span>{tab.label} ({count})</span>
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
            className="w-full pl-9 pr-8 py-2 rounded-xl border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none transition font-medium backdrop-blur-md"
            style={{
              backgroundColor: "var(--card-bg, rgba(25, 28, 41, 0.7))",
            }}
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {filteredModules.map((module) => {
          const Icon = module.icon;

          return (
            <motion.div
              key={module.id}
              whileHover={{ y: -4, transition: { duration: 0.18 } }}
              onClick={() => {
                dashboardAudio.playClick();
                setActiveTab(module.id);
              }}
              className="rounded-2xl p-5 flex flex-col justify-between gap-4 group border transition-all duration-200 cursor-pointer relative overflow-hidden backdrop-blur-md hover:shadow-2xl"
              style={{
                backgroundColor: "var(--card-bg, rgba(25, 28, 41, 0.7))",
                borderColor: "var(--border-divider, rgba(255, 255, 255, 0.08))",
              }}
            >
              {/* Luminous Top Accent Glow on hover */}
              <div 
                className="absolute top-0 inset-x-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity" 
                style={{
                  background: "linear-gradient(90deg, transparent, var(--primary, #BD5FFF), transparent)",
                }}
              />

              {/* Top Row: Squircle Icon & Tactile Toggle */}
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

              {/* Middle Section: Title, Category Badge & Live Cues */}
              <div className="space-y-2 flex-1">
                <div>
                  <h3 className="font-black text-base text-white group-hover:text-purple-300 transition-colors tracking-tight line-clamp-1">
                    {module.name}
                  </h3>
                  <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 bg-black/40 px-2 py-0.5 rounded border border-white/10 mt-1">
                    {module.categoryLabel}
                  </span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                  {module.desc}
                </p>

                {/* Module Badges per 3.2 Matrix */}
                {module.badges && module.badges.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {module.badges.map((badge, bIdx) => (
                      <span
                        key={bIdx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-white/5 border border-white/10 text-zinc-300"
                      >
                        <span>{badge}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Row: Configure Studio Button */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[11px] font-mono">
                  {module.active ? (
                    <span className="flex items-center gap-1 text-emerald-400 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2ECC71] animate-pulse" />
                      ACTIVE
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-zinc-500 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                      STANDBY
                    </span>
                  )}
                </div>

                <span 
                  className="py-1 px-2.5 rounded-lg bg-white/5 group-hover:bg-purple-600/40 text-zinc-300 group-hover:text-white font-black text-xs transition-colors flex items-center gap-1 border border-transparent group-hover:border-purple-500/40"
                >
                  <span>STUDIO</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 stroke-[3]" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredModules.length === 0 && (
        <div 
          className="p-12 text-center rounded-2xl border text-zinc-400 space-y-2 backdrop-blur-md"
          style={{
            backgroundColor: "var(--card-bg, rgba(25, 28, 41, 0.7))",
            borderColor: "var(--border-divider, rgba(255, 255, 255, 0.08))",
          }}
        >
          <p className="font-bold text-sm text-white">No modules found</p>
          <p className="text-xs">No active bot feature matches &ldquo;{searchQuery}&rdquo;</p>
        </div>
      )}
    </div>
  );
}
