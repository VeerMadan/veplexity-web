"use client";

import React, { useState } from "react";
import { 
  Music, Volume2, Play, Pause, SkipForward, 
  Radio, Check, Disc3, Sparkles, Sliders
} from "lucide-react";
import { TactileToggle } from "./TactileToggle";
import { dashboardAudio } from "@/lib/dashboardAudio";

interface MusicDjStudioProps {
  djRole: string;
  setDjRole: (v: string) => void;
  defaultVolume: number;
  setDefaultVolume: (v: number) => void;
  stay247: boolean;
  setStay247: (v: boolean) => void;
  roles: Array<{ id: string; name: string }>;
}

export const MusicDjStudio: React.FC<MusicDjStudioProps> = ({
  djRole,
  setDjRole,
  defaultVolume,
  setDefaultVolume,
  stay247,
  setStay247,
  roles,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [bassBoost, setBassBoost] = useState(true);
  const [spatial8D, setSpatial8D] = useState(false);
  const [nightcore, setNightcore] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({
    title: "Midnight Vice City - LoFi Synthwave (24-bit Lossless)",
    author: "VePlexity Audio Node",
    duration: "3:42",
  });

  const handlePlayToggle = () => {
    dashboardAudio.playClick();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start w-full">
      {/* ─── LEFT: CONTROLS & SETTINGS (7 COLS) ─────────────────────────────── */}
      <div className="xl:col-span-7 space-y-6">
        <div className="pro-card p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-zinc-800">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-100 shrink-0">
                <Music className="w-6 h-6 text-[#5865F2]" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2.5">
                  <span>Music &amp; DJ Audio Suite</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#5865F2]/10 text-[#5865F2] border border-[#5865F2]/20 font-semibold">
                    24/7 LOSSLESS
                  </span>
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  High-fidelity audio streaming, DSP equalizers, and permanent voice channel presence.
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs font-semibold shrink-0">
              Free VIP Feature
            </span>
          </div>

          {/* 24/7 Voice Channel Stay Toggle */}
          <div
            onClick={() => setStay247(!stay247)}
            className="p-4.5 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition flex items-center justify-between gap-4 cursor-pointer select-none"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 shrink-0 mt-0.5">
                <Radio className="w-4 h-4 text-[#5865F2]" />
              </div>
              <div>
                <p className="font-semibold text-sm text-white">24/7 Voice Channel Stay</p>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Bot stays parked in the voice channel indefinitely, ready to immediately play audio.
                </p>
              </div>
            </div>

            <TactileToggle
              checked={stay247}
              onChange={setStay247}
              color="emerald"
              activeLabel="ACTIVE"
            />
          </div>

          {/* DSP Sound Filters Toggles */}
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase text-zinc-400 font-semibold flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-zinc-400" />
              <span>Real-Time Audio DSP Filters</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { label: "Bassboost 200%", val: bassBoost, set: setBassBoost, desc: "Low-end punch" },
                { label: "8D Spatial Audio", val: spatial8D, set: setSpatial8D, desc: "Stereo panning" },
                { label: "Nightcore Speed", val: nightcore, set: setNightcore, desc: "1.2x pitch up" },
              ].map((filter, idx) => (
                <div
                  key={idx}
                  onClick={() => filter.set(!filter.val)}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer select-none flex flex-col justify-between h-20 ${
                    filter.val
                      ? "bg-zinc-800 border-[#5865F2] text-white"
                      : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs">{filter.label}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${filter.val ? "bg-[#5865F2]" : "bg-zinc-700"}`} />
                  </div>
                  <p className="text-[11px] text-zinc-400">{filter.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* DJ Role & Default Volume */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">DJ Controller Role</label>
              <select
                value={djRole}
                onChange={(e) => setDjRole(e.target.value)}
                className="w-full pro-input px-3 py-2 text-xs text-white"
              >
                <option value="">Everyone can DJ (Free for all)</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    @{r.name}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-zinc-500">Only members with this role can skip/stop playback.</p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                <span>Default Playback Volume</span>
                <span className="font-mono text-zinc-400">{defaultVolume}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={defaultVolume}
                onChange={(e) => setDefaultVolume(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#5865F2]"
              />
              <p className="text-[11px] text-zinc-500">Normalized to standard broadcast loudness.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── RIGHT: DJ DECK & AUDIO VISUALIZER (5 COLS) ─────────────────────── */}
      <div className="xl:col-span-5 space-y-6">
        <div className="pro-card p-6 space-y-5">
          {/* Deck Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <Disc3 className={`w-4 h-4 text-[#5865F2] ${isPlaying ? "animate-spin" : ""}`} />
              <span className="font-mono text-xs uppercase tracking-wider font-bold text-white">
                Audio Stream Monitor
              </span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 font-semibold">
              24-Bit FLAC 48kHz
            </span>
          </div>

          {/* Equalizer Wave Spectrum */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-3">
            <div className="flex items-end justify-between h-20 gap-1 px-1">
              {[35, 70, 50, 85, 60, 75, 40, 90, 65, 80, 45, 85, 55, 70, 40, 75, 60, 85, 50, 65].map((h, i) => (
                <div
                  key={i}
                  className="w-full rounded-t-sm transition-all duration-300"
                  style={{
                    height: isPlaying ? `${h}%` : "10%",
                    backgroundColor: isPlaying ? "#5865F2" : "#27272a",
                    opacity: isPlaying ? 0.9 : 0.4,
                  }}
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-1 border-t border-zinc-850">
              <span>20Hz SUB</span>
              <span>1kHz MIDS</span>
              <span>20kHz HIGHS</span>
            </div>
          </div>

          {/* Now Playing Card */}
          <div className="space-y-1.5">
            <p className="text-xs font-mono uppercase text-zinc-400 font-semibold">Currently Playing in VC:</p>
            <div className="p-3.5 rounded-lg bg-zinc-900 border border-zinc-800 space-y-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-xs sm:text-sm text-white truncate">{currentTrack.title}</p>
                <span className="text-xs font-mono text-zinc-400 shrink-0">{currentTrack.duration}</span>
              </div>
              <p className="text-xs text-zinc-400">{currentTrack.author}</p>
            </div>
          </div>

          {/* Interactive Player Controls */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              onClick={handlePlayToggle}
              className="w-11 h-11 rounded-full bg-[#5865F2] hover:bg-[#4752c4] text-white flex items-center justify-center cursor-pointer transition shadow-sm"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            <button
              onClick={() => {
                dashboardAudio.playClick();
                setCurrentTrack({
                  title: "Synthwave Sunset Overdrive (Lossless Audio)",
                  author: "VePlexity Radio DJ",
                  duration: "4:15",
                });
              }}
              className="p-3 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition cursor-pointer"
              title="Skip Track"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
