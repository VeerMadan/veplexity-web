"use client";

import React from "react";
import { dashboardAudio } from "@/lib/dashboardAudio";

interface TactileToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  activeLabel?: string;
  inactiveLabel?: string;
  disabled?: boolean;
  color?: "orange" | "fuchsia" | "emerald" | "red";
}

export const TactileToggle: React.FC<TactileToggleProps> = ({
  checked,
  onChange,
  activeLabel = "ACTIVE",
  inactiveLabel = "DISABLED",
  disabled = false,
  color = "orange",
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    const next = !checked;
    dashboardAudio.playToggle(next);
    onChange(next);
  };

  const colorStyles = {
    orange: {
      trackOn: "bg-gradient-to-r from-orange-600 to-amber-500 shadow-[0_0_15px_rgba(249,115,22,0.4)] border-orange-400/50",
      thumbOn: "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.5)]",
      badgeOn: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    },
    fuchsia: {
      trackOn: "bg-gradient-to-r from-fuchsia-600 to-pink-500 shadow-[0_0_15px_rgba(217,70,239,0.4)] border-fuchsia-400/50",
      thumbOn: "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.5)]",
      badgeOn: "text-fuchsia-300 bg-fuchsia-500/10 border-fuchsia-500/20",
    },
    emerald: {
      trackOn: "bg-gradient-to-r from-emerald-600 to-teal-500 shadow-[0_0_15px_rgba(16,185,129,0.4)] border-emerald-400/50",
      thumbOn: "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.5)]",
      badgeOn: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    red: {
      trackOn: "bg-gradient-to-r from-red-600 to-rose-500 shadow-[0_0_15px_rgba(239,68,68,0.4)] border-red-400/50",
      thumbOn: "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.5)]",
      badgeOn: "text-red-400 bg-red-500/10 border-red-500/20",
    },
  }[color];

  return (
    <div className="flex items-center gap-3 shrink-0">
      <span
        className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border transition-all duration-300 select-none ${
          checked
            ? colorStyles.badgeOn
            : "text-zinc-500 bg-zinc-900/60 border-zinc-800"
        }`}
      >
        {checked ? activeLabel : inactiveLabel}
      </span>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleClick}
        className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border p-0.5 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-orange-500/40 ${
          checked
            ? colorStyles.trackOn
            : "bg-[#181220] border-white/10 hover:border-white/20 shadow-inner"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <span
          className={`pointer-events-none inline-block h-5.5 w-5.5 transform rounded-full transition-transform duration-300 ease-out ${
            checked
              ? `translate-x-6 ${colorStyles.thumbOn}`
              : "translate-x-0 bg-zinc-400 shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
          }`}
        />
      </button>
    </div>
  );
};
