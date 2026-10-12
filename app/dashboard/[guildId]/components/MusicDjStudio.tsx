"use client";

import React, { useState, useEffect } from "react";
import { 
  Music, Volume2, Play, Pause, SkipForward, 
  Sparkles, Zap, Radio, Check, Disc3, Flame 
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
    author: "VePlexity Master Audio",
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
        <div className="p-6 sm:p-8 rounded-3xl glass-liquid-card space-y-7 relative overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-pink-600/20 via-fuchsia-500/10 to-purple-500/20 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-400 shadow-lg shadow-fuchsia-500/10 shrink-0">
                <Music className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2.5">
                  <span>Music &amp; DJ Master Suite</span>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30 font-bold">
                    24/7 ZERO LAG
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                  High-fidelity audio streaming, DSP equalizers, and permanent voice channel stay.
                </p>
              </div>
            </div>

            <span className="px-3.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold shrink-0">
              💎 Free Lifetime VIP
            </span>
          </div>

          {/* Hydra Comparison Banner */}
          <div className="p-4.5 rounded-2xl glass-liquid border border-fuchsia-500/30 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <p className="font-extrabold text-xs sm:text-sm text-fuchsia-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-fuchsia-400" />
                <span>Hydra charges $5.00/mo for 24/7 stay — VePlexity gives it 100% Free!</span>
              </p>
              <p className="text-xs text-zinc-400">
                Full access to bassboost, 8D audio, and 24/7 stay with zero paywalls.
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs sm:text-sm font-black text-emerald-400 font-mono">$0.00 / FREE</span>
            </div>
          </div>

          {/* 24/7 Voice Channel Stay Toggle */}
          <div
            onClick={() => setStay247(!stay247)}
            className="p-5 rounded-2xl glass-liquid-card flex items-center justify-between gap-4 cursor-pointer select-none"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-fuchsia-500/15 border border-fuchsia-500/30 flex items-center justify-center text-xl shrink-0 shadow-inner">
                📻
              </div>
              <div>
                <p className="font-extrabold text-sm sm:text-base text-white">24/7 Voice Channel Stay</p>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Bot stays parked in the voice channel indefinitely, ready to instantly play music.
                </p>
              </div>
            </div>

            <TactileToggle
              checked={stay247}
              onChange={setStay247}
              color="fuchsia"
              activeLabel="STAY ARMED"
            />
          </div>

          {/* DSP Sound Filters Toggles */}
          <div className="space-y-2.5">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-orange-400" />
              <span>Real-Time DSP Hardware Audio Filters</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: "Bassboost 200%", val: bassBoost, set: setBassBoost, desc: "Deep low-end rumble" },
                { label: "8D Spatial Audio", val: spatial8D, set: setSpatial8D, desc: "Surround panning" },
                { label: "Nightcore Speed", val: nightcore, set: setNightcore, desc: "1.2x pitch acceleration" },
              ].map((filter, idx) => (
                <div
                  key={idx}
                  onClick={() => filter.set(!filter.val)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer select-none flex flex-col justify-between h-24 ${
                    filter.val
                      ? "bg-fuchsia-600/15 border-fuchsia-500/40 text-white shadow-md shadow-fuchsia-500/10"
                      : "bg-[#181122]/70 border-white/5 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">{filter.label}</span>
                    <span className={`w-2 h-2 rounded-full ${filter.val ? "bg-fuchsia-400 animate-pulse" : "bg-zinc-700"}`} />
                  </div>
                  <p className="text-[11px] text-zinc-400">{filter.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* DJ Role & Default Volume */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-300">DJ Controller Role</label>
              <select
                value={djRole}
                onChange={(e) => setDjRole(e.target.value)}
                className="w-full bg-[#1c1229] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-fuchsia-500/50"
              >
                <option value="">Everyone can DJ (Free for all)</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    @{r.name}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-zinc-500">Only members with this role can skip/stop.</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-zinc-300">
                <span>Default Playback Volume</span>
                <span className="font-mono text-orange-400">{defaultVolume}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={defaultVolume}
                onChange={(e) => setDefaultVolume(Number(e.target.value))}
                className="w-full h-2 bg-[#1c1229] rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <p className="text-[11px] text-zinc-500">Normalized to -14 LUFS standard broadcast volume.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── RIGHT: INTERACTIVE DJ DECK & AUDIO VISUALIZER (5 COLS) ─────────── */}
      <div className="xl:col-span-5 space-y-6 xl:sticky xl:top-24">
        <div className="p-6 sm:p-7 rounded-3xl glass-liquid-card space-y-5">
          {/* Deck Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Disc3 className={`w-4.5 h-4.5 text-fuchsia-400 ${isPlaying ? "animate-spin" : ""}`} />
              <span className="font-mono text-xs sm:text-sm uppercase tracking-wider font-bold text-white">
                Live DJ Turntable
              </span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-bold">
              24-Bit FLAC 48kHz
            </span>
          </div>

          {/* Equalizer Wave Spectrum */}
          <div className="p-4.5 rounded-2xl bg-[#09050d]/80 border border-white/10 space-y-3 shadow-inner">
            <div className="flex items-end justify-between h-24 gap-1 px-2">
              {[40, 75, 55, 90, 65, 80, 45, 95, 70, 85, 50, 90, 60, 75, 45, 80, 65, 90, 55, 70].map((h, i) => (
                <div
                  key={i}
                  className="w-full rounded-t-sm transition-all duration-300"
                  style={{
                    height: isPlaying ? `${h}%` : "15%",
                    background: i % 2 === 0
                      ? "linear-gradient(to top, #d946ef, #f97316)"
                      : "linear-gradient(to top, #ec4899, #8b5cf6)",
                    opacity: isPlaying ? 0.95 : 0.3,
                  }}
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1.5 border-t border-white/5">
              <span>20Hz SUB-BASS</span>
              <span>1kHz MIDS</span>
              <span>20kHz HIGHS</span>
            </div>
          </div>

          {/* Now Playing Card */}
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase text-zinc-400 font-bold">Currently Playing in VC:</p>
            <div className="p-4 rounded-xl glass-liquid space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-bold text-xs sm:text-sm text-white truncate">{currentTrack.title}</p>
                <span className="text-xs font-mono text-zinc-400 shrink-0">{currentTrack.duration}</span>
              </div>
              <p className="text-xs text-fuchsia-300 font-semibold">{currentTrack.author}</p>
            </div>
          </div>

          {/* Interactive Player Controls */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={handlePlayToggle}
              className="w-13 h-13 rounded-full neo-liquid-primary text-white flex items-center justify-center shadow-lg shadow-fuchsia-600/35 cursor-pointer transition hover:scale-105"
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
              className="p-3.5 rounded-full neo-liquid-btn text-zinc-300 hover:text-white transition cursor-pointer"
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
