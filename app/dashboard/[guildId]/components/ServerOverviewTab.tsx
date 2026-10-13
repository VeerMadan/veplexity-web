"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings, ChevronRight, Search, 
  CheckCircle2, Sparkles, Filter, X
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
  accentColor: string; // "indigo" | "purple" | "emerald" | "amber" | "cyan" | "blue" | "red" | "rose" | "slate" | "pink" | "teal" | "orange" | "fuchsia" | "violet"
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

export function ServerOverviewTab({
  guild,
  guildIconUrl,
  guildInitials,
  setActiveTab,
  modules,
}: ServerOverviewTabProps) {
  const [activeCategory, setActiveCategory] = useState<ModuleCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <div className="space-y-7 w-full max-w-7xl mx-auto">
      {/* ─── 1. SIMPLIFIED, CLEAN SERVER BANNER ─────────────────────────────── */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[#10121a]/90 border border-zinc-800/80 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Subtle radial ambient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,rgba(88,101,242,0.12),transparent_70%)] pointer-events-none" />

        <div className="flex items-center gap-5 sm:gap-6 relative z-10">
          {/* Prominent Large Server Avatar */}
          <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-[#141622] border-2 border-[#5865F2]/40 overflow-hidden flex items-center justify-center font-bold text-2xl text-zinc-200 shrink-0 shadow-2xl">
            {guildIconUrl ? (
              <img
                src={guildIconUrl}
                alt={guild?.name || "Server"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <span className="font-mono text-2xl font-black text-white">
                {guildInitials}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {guild?.name}
              </h1>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ONLINE
              </span>
            </div>

            <p className="text-xs font-mono text-zinc-400">
              Server ID: <span className="text-zinc-300">{guild?.id}</span>
            </p>

            <div className="flex items-center gap-2 pt-1 flex-wrap text-xs">
              <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium">
                👥 {guild?.memberCount?.toLocaleString() || 0} Members
              </span>
              <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-emerald-400 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {activeModulesCount} of {modules.length} Modules Active
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Limited Access Demo
              </span>
              <span className="px-3 py-1 rounded-full bg-[#5865F2]/10 border border-[#5865F2]/30 text-[#5865F2] font-semibold">
                Free VIP Unlocked
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10 self-stretch md:self-auto justify-end">
          <Link
            href="/dashboard"
            className="btn-secondary px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-sm hover:border-zinc-600"
          >
            <span>Switch Server</span>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </Link>
        </div>
      </div>

      {/* ─── 2. CATEGORY FILTERS & SEARCH BAR ───────────────────────────────── */}
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
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 select-none ${
                  isSelected
                    ? "bg-[#5865F2] text-white shadow-md shadow-[#5865F2]/20"
                    : "bg-[#12141e] text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? "bg-white/20 text-white"
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
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#12141e] border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#5865F2] transition"
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

      {/* ─── 3. VIBRANT MEE6 & DYNO MODULE CARDS GRID ───────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {filteredModules.map((module) => {
          const Icon = module.icon;

          return (
            <motion.div
              key={module.id}
              whileHover={{ y: -3, transition: { duration: 0.15 } }}
              onClick={() => {
                dashboardAudio.playClick();
                setActiveTab(module.id);
              }}
              className="rounded-2xl bg-[#10121a] p-5 sm:p-6 flex flex-col justify-between gap-5 group border border-zinc-800/80 hover:border-[#5865F2]/50 hover:shadow-xl hover:shadow-[#5865F2]/10 transition-all cursor-pointer relative overflow-hidden"
            >
              {/* Subtle top accent gradient */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#5865F2]/40 to-transparent group-hover:via-[#5865F2] transition-colors" />

              {/* Top Row: Colorful Icon Box & Tactile Toggle */}
              <div className="flex items-start justify-between gap-4">
                <div
                  className={`w-13 h-13 rounded-2xl flex items-center justify-center font-bold text-lg border ${module.bgColor} shadow-md shrink-0 group-hover:scale-105 transition-transform duration-200`}
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

              {/* Middle Section: Title, Category Badge & 1-Sentence Desc */}
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-white group-hover:text-[#5865F2] transition-colors tracking-tight">
                    {module.name}
                  </h3>
                </div>

                <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800">
                  {module.categoryLabel}
                </span>

                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 pt-0.5">
                  {module.desc}
                </p>
              </div>

              {/* Bottom Row: Settings Button (Dyno Benchmark) & Status */}
              <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    dashboardAudio.playClick();
                    setActiveTab(module.id);
                  }}
                  className="py-1.5 px-3 rounded-lg bg-zinc-900 hover:bg-[#5865F2] text-zinc-300 hover:text-white border border-zinc-800 hover:border-[#5865F2] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>SETTINGS</span>
                </button>

                <div>
                  {module.active ? (
                    <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      ENABLED
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                      OFF
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredModules.length === 0 && (
        <div className="py-16 text-center rounded-2xl bg-[#10121a] border border-zinc-800 p-8 space-y-3">
          <p className="text-sm font-bold uppercase text-zinc-300">
            No Modules Found
          </p>
          <p className="text-xs text-zinc-500">
            No modules match &quot;{searchQuery}&quot; in {activeCategory} category.
          </p>
          <button
            onClick={() => {
              setActiveCategory("all");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-xl btn-secondary text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
