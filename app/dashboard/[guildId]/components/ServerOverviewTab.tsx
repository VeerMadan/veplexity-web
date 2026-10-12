"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Terminal, Settings, ChevronRight } from "lucide-react";
import { TactileToggle } from "./TactileToggle";
import { dashboardAudio } from "@/lib/dashboardAudio";

export interface OverviewModuleItem {
  id: string;
  name: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
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

export function ServerOverviewTab({
  guild,
  guildIconUrl,
  guildInitials,
  setActiveTab,
  modules,
}: ServerOverviewTabProps) {
  return (
    <div className="space-y-7 w-full">
      {/* Server Banner Header with Prominent Large Avatar */}
      <div className="p-6 sm:p-8 rounded-2xl pro-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full border border-zinc-800/80 shadow-xl">
        <div className="flex items-center gap-5 sm:gap-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-zinc-800 border-2 border-zinc-700 overflow-hidden flex items-center justify-center font-bold text-2xl text-zinc-200 shrink-0 shadow-2xl">
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
              <span className="font-mono text-2xl text-white">{guildInitials}</span>
            )}
          </div>
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {guild?.name}
            </h1>
            <p className="text-xs font-mono text-zinc-400">Server ID: {guild?.id}</p>
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Bot Connected &amp; Online
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-medium border border-zinc-700">
                {guild?.memberCount} Members
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 font-medium">
                All Features Free &amp; Unlocked
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 font-medium flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                Dual-Engine: Slash &amp; Prefixes
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 self-stretch md:self-auto justify-end">
          <Link
            href="/dashboard"
            className="btn-secondary px-4 py-2.5 rounded-xl text-xs font-bold"
          >
            Switch Server
          </Link>
        </div>
      </div>

      {/* Module Cards Grid (Dyno & MEE6 Standard) */}
      <div className="space-y-4 w-full">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-base font-extrabold text-white tracking-tight">
              Server Features &amp; Modules
            </h2>
            <p className="text-xs text-zinc-400">
              Toggle modules directly on cards or click Settings to configure
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 font-bold">
            {modules.length} MODULES
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <motion.div
                key={module.id}
                whileHover={{ y: -3, transition: { duration: 0.15 } }}
                className="rounded-2xl pro-card p-5 sm:p-6 flex flex-col justify-between gap-5 group border border-zinc-800/80 hover:border-zinc-700 transition shadow-lg"
              >
                {/* Top: Big Icon & Direct Active Toggle Switch */}
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg border ${module.bgColor} shrink-0`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="pt-1">
                    <TactileToggle
                      checked={module.active}
                      onChange={(checked) => module.onToggle(checked)}
                      label={`Toggle ${module.name}`}
                    />
                  </div>
                </div>

                {/* Middle: Title & Description */}
                <div className="space-y-1.5 flex-1">
                  <h3 className="font-bold text-base text-white group-hover:text-[#5865F2] transition tracking-tight">
                    {module.name}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                    {module.desc}
                  </p>
                </div>

                {/* Bottom: Dedicated SETTINGS Button */}
                <button
                  onClick={() => {
                    dashboardAudio.playClick();
                    setActiveTab(module.id);
                  }}
                  className="w-full py-2.5 px-3.5 rounded-xl btn-secondary text-xs font-bold flex items-center justify-center gap-2 group-hover:bg-[#5865F2] group-hover:text-white group-hover:border-[#5865F2] transition cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>SETTINGS</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-auto" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
