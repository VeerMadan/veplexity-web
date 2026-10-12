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
  activeLabel = "ENABLED",
  inactiveLabel = "DISABLED",
  disabled = false,
  color = "emerald",
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
      trackOn: "bg-[#5865F2] border-[#5865F2]",
      thumbOn: "bg-white shadow-sm",
      badgeOn: "text-[#5865F2] bg-[#5865F2]/10 border-[#5865F2]/30",
    },
    fuchsia: {
      trackOn: "bg-[#5865F2] border-[#5865F2]",
      thumbOn: "bg-white shadow-sm",
      badgeOn: "text-[#5865F2] bg-[#5865F2]/10 border-[#5865F2]/30",
    },
    emerald: {
      trackOn: "bg-emerald-600 border-emerald-600",
      thumbOn: "bg-white shadow-sm",
      badgeOn: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    },
    red: {
      trackOn: "bg-rose-600 border-rose-600",
      thumbOn: "bg-white shadow-sm",
      badgeOn: "text-rose-400 bg-rose-500/10 border-rose-500/30",
    },
  }[color];

  return (
    <div className="flex items-center gap-2.5 shrink-0">
      <span
        className={`text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md border transition-colors select-none ${
          checked
            ? colorStyles.badgeOn
            : "text-zinc-500 bg-zinc-900 border-zinc-800"
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
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border p-0.5 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#090a0f] focus:ring-[#5865F2]/50 ${
          checked
            ? colorStyles.trackOn
            : "bg-zinc-800 border-zinc-700 hover:border-zinc-600"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <span
          className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full transition-transform duration-200 ease-in-out ${
            checked
              ? `translate-x-5 ${colorStyles.thumbOn}`
              : "translate-x-0 bg-zinc-400"
          }`}
        />
      </button>
    </div>
  );
};
