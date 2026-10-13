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
    <div className="space-y-5 w-full max-w-7xl mx-auto">
      {/* ─── 1. COMPACT, SLEEK SERVER BANNER ─────────────────────────────── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#10121a]/90 border border-zinc-800/80 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        {/* Subtle radial ambient glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(ellipse_at_top_right,rgba(88,101,242,0.1),transparent_70%)] pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          {/* Compact Server Avatar */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#141622] border-2 border-[#5865F2]/40 overflow-hidden flex items-center justify-center font-bold text-xl text-zinc-200 shrink-0 shadow-lg">
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
              <span className="font-mono text-xl font-black text-white">
                {guildInitials}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {guild?.name}
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ONLINE
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-[11px] font-mono text-zinc-400">
                ID: {guild?.id}
              </span>
              <span className="text-zinc-600">•</span>
              <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px] font-medium">
                👥 {guild?.memberCount?.toLocaleString() || 0} Members
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-emerald-400 text-[11px] font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                {activeModulesCount} of {modules.length} Modules Active
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#5865F2]/10 border border-[#5865F2]/30 text-[#5865F2] text-[11px] font-semibold">
                Free VIP Unlocked
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10 self-stretch md:self-auto justify-end">
          <Link
            href="/dashboard"
            className="btn-secondary px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm hover:border-zinc-600"
          >
            <span>Switch Server</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
          </Link>
        </div>
      </div>

      {/* ─── 2. CATEGORY FILTERS & SEARCH BAR ───────────────────────────────── */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pb-1">
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
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 select-none ${
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
        <div className="relative shrink-0 w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-[#12141e] border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#5865F2] transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* ─── 3. SLEEK & COMPACT MODULE CARDS GRID ───────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredModules.map((module) => {
          const Icon = module.icon;

          return (
            <motion.div
              key={module.id}
              whileHover={{ y: -2, transition: { duration: 0.15 } }}
              onClick={() => {
                dashboardAudio.playClick();
                setActiveTab(module.id);
              }}
              className="rounded-xl bg-[#10121a] p-4 flex flex-col justify-between gap-3.5 group border border-zinc-800/80 hover:border-[#5865F2]/50 hover:shadow-lg hover:shadow-[#5865F2]/5 transition-all cursor-pointer relative overflow-hidden"
            >
              {/* Subtle top accent line */}
              <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#5865F2]/30 to-transparent group-hover:via-[#5865F2] transition-colors" />

              {/* Top Row: Icon Box & Tactile Toggle */}
              <div className="flex items-start justify-between gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base border ${module.bgColor} shadow-sm shrink-0 group-hover:scale-105 transition-transform duration-200`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div
                  className="pt-0.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <TactileToggle
                    checked={module.active}
                    onChange={(checked) => module.onToggle(checked)}
                    label={`Toggle ${module.name}`}
                  />
                </div>
              </div>

              {/* Middle Section: Title, Category Badge & Desc */}
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-sm text-white group-hover:text-[#5865F2] transition-colors tracking-tight line-clamp-1">
                    {module.name}
                  </h3>
                </div>

                <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800/80">
                  {module.categoryLabel}
                </span>

                <p className="text-[11px] text-zinc-400 leading-relaxed line-clamp-2 pt-0.5">
                  {module.desc}
                </p>
              </div>

              {/* Bottom Row: Clean Configure Link */}
              <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors flex items-center gap-1.5">
                  <Settings className="w-3 h-3" />
                  <span>Configure</span>
                </span>
                <span className="text-xs font-semibold text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition-all flex items-center gap-0.5">
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
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
