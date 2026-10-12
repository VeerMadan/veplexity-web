"use client";

import React, { useState } from "react";
import { 
  Lock, Shield, AlertTriangle, CheckCircle2, Zap, 
  Terminal, Sparkles, Send, RotateCcw, Volume2, Flame 
} from "lucide-react";
import { TactileToggle } from "./TactileToggle";
import { dashboardAudio } from "@/lib/dashboardAudio";

interface AutoModDefenseSimulatorProps {
  antiInvite: boolean;
  setAntiInvite: (v: boolean) => void;
  antiSpam: boolean;
  setAntiSpam: (v: boolean) => void;
  antiBadWords: boolean;
  setAntiBadWords: (v: boolean) => void;
  antiLinks: boolean;
  setAntiLinks: (v: boolean) => void;
  antiCaps: boolean;
  setAntiCaps: (v: boolean) => void;
}

export const AutoModDefenseSimulator: React.FC<AutoModDefenseSimulatorProps> = ({
  antiInvite,
  setAntiInvite,
  antiSpam,
  setAntiSpam,
  antiBadWords,
  setAntiBadWords,
  antiLinks,
  setAntiLinks,
  antiCaps,
  setAntiCaps,
}) => {
  const [testInput, setTestInput] = useState("https://discord.gg/free-nitro-2026");
  const [simulatedResult, setSimulatedResult] = useState<{
    blocked: boolean;
    reason?: string;
    payload?: string;
    ruleId?: string;
  } | null>({
    blocked: true,
    reason: "Unauthorized Discord Invite Link",
    payload: "https://discord.gg/free-nitro-2026",
    ruleId: "antiInvite"
  });
  const [defenseMode, setDefenseMode] = useState<"balanced" | "strict" | "fortress">("balanced");
  const [isSimulating, setIsSimulating] = useState(false);

  // Calculate defense score
  const activeCount = [antiInvite, antiSpam, antiBadWords, antiLinks, antiCaps].filter(Boolean).length;
  const defenseScore = Math.round((activeCount / 5) * 100);

  const presets = [
    { label: "🔗 Discord Invite", text: "Join my new server: https://discord.gg/vip-hangout", type: "antiInvite" },
    { label: "🚨 Phishing Scam", text: "Free Steam $50 Gift Card: http://claim-nitro.xyz/gift", type: "antiLinks" },
    { label: "💥 CAPS SHOUTING", text: "HEY EVERYONE WAKE UP AND JOIN THE VOICE CHANNEL RIGHT NOW", type: "antiCaps" },
    { label: "⚡ Mass Mentions", text: "@everyone @here ping ping spamming chat", type: "antiSpam" },
    { label: "🤬 Hate Speech", text: "You are totally garbage trash idiot dumb", type: "antiBadWords" },
    { label: "✨ Clean Chat", text: "Hey everyone! The new VePlexity bot update is awesome.", type: "clean" },
  ];

  const runSimulation = (text: string) => {
    setIsSimulating(true);
    setTestInput(text);

    setTimeout(() => {
      let blocked = false;
      let reason = "";
      let payload = "";
      let ruleId = "";

      // Check Discord Invites
      if (antiInvite && (text.includes("discord.gg/") || text.includes("discord.com/invite/"))) {
        blocked = true;
        reason = "Unauthorized Discord Invite Link";
        payload = text.match(/discord\.(?:gg|com\/invite)\/[^\s]+/)?.[0] || text;
        ruleId = "antiInvite";
      }
      // Check External Links
      else if (antiLinks && (text.includes("http://") || text.includes("https://") || text.includes(".xyz") || text.includes(".ru"))) {
        blocked = true;
        reason = "Suspicious External Phishing Link";
        payload = text.match(/https?:\/\/[^\s]+/)?.[0] || text;
        ruleId = "antiLinks";
      }
      // Check Excessive Caps
      else if (antiCaps && text.length > 10) {
        const letters = text.replace(/[^a-zA-Z]/g, "");
        const caps = text.replace(/[^A-Z]/g, "");
        if (letters.length > 5 && (caps.length / letters.length) > 0.65) {
          blocked = true;
          reason = "Excessive Shout Capitals (>70%)";
          payload = text;
          ruleId = "antiCaps";
        }
      }
      // Check Anti-Spam / Mass Mentions
      else if (antiSpam && (text.includes("@everyone") || text.includes("@here") || (text.match(/@/g) || []).length >= 3)) {
        blocked = true;
        reason = "Anti-Spam Mass Mentions Rate Exceeded";
        payload = text;
        ruleId = "antiSpam";
      }
      // Check Profanity
      else if (antiBadWords && (text.toLowerCase().includes("trash") || text.toLowerCase().includes("garbage") || text.toLowerCase().includes("idiot"))) {
        blocked = true;
        reason = "Profanity & Toxicity Keyword Trigger";
        payload = text;
        ruleId = "antiBadWords";
      }

      if (blocked) {
        dashboardAudio.playShieldDeflect();
        setSimulatedResult({ blocked: true, reason, payload, ruleId });
      } else {
        dashboardAudio.playClick();
        setSimulatedResult({ blocked: false, payload: text });
      }
      setIsSimulating(false);
    }, 180);
  };

  const handleModeSelect = (mode: "balanced" | "strict" | "fortress") => {
    dashboardAudio.playClick();
    setDefenseMode(mode);
    if (mode === "balanced") {
      setAntiInvite(true);
      setAntiSpam(true);
      setAntiBadWords(true);
      setAntiLinks(false);
      setAntiCaps(false);
    } else if (mode === "strict") {
      setAntiInvite(true);
      setAntiSpam(true);
      setAntiBadWords(true);
      setAntiLinks(true);
      setAntiCaps(false);
    } else {
      setAntiInvite(true);
      setAntiSpam(true);
      setAntiBadWords(true);
      setAntiLinks(true);
      setAntiCaps(true);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start w-full">
      {/* ─── LEFT: CONTROLS & MODULE CONFIG (7 COLS) ─────────────────────────── */}
      <div className="xl:col-span-7 space-y-6">
        {/* Main Defense Shield Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#120a1c] via-[#100b18] to-[#0c0512] border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.7)] space-y-7 relative overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          {/* Header Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600/20 via-rose-500/10 to-orange-500/20 border border-red-500/30 flex items-center justify-center text-red-400 shadow-lg shadow-red-500/10">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                  <span>Auto-Mod Defense Shield</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/15 text-red-300 border border-red-500/25">
                    HIGH SECURITY
                  </span>
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Automated real-time shields that monitor chat and delete malicious content instantly.
                </p>
              </div>
            </div>

            {/* Live Shield Health Ring */}
            <div className="flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-[#191024] border border-white/10 shrink-0">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-zinc-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={defenseScore === 100 ? "text-emerald-400" : defenseScore >= 60 ? "text-orange-400" : "text-red-400"}
                    strokeDasharray={`${defenseScore}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute font-mono text-[10px] font-black text-white">
                  {defenseScore}%
                </span>
              </div>
              <div className="text-left">
                <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">Defense Shield</p>
                <p className="text-xs font-bold text-white">
                  {activeCount}/5 Active
                </p>
              </div>
            </div>
          </div>

          {/* Quick Preset Strictness Selector */}
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>Security Profile Preset</span>
            </p>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: "balanced", label: "Balanced", desc: "Invites + Spam + Slurs" },
                { id: "strict", label: "Strict / Anti-Raid", desc: "+ Block External URLs" },
                { id: "fortress", label: "Fortress Lockdown", desc: "All 5 Shields Active" },
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => handleModeSelect(mode.id as any)}
                  className={`p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                    defenseMode === mode.id
                      ? "bg-gradient-to-r from-red-600/20 via-orange-600/15 to-transparent border-red-500/50 shadow-md shadow-red-500/10 text-white"
                      : "bg-[#181122]/70 hover:bg-[#1f162c] border-white/5 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <p className="text-xs font-black uppercase tracking-wide flex items-center justify-between">
                    <span>{mode.label}</span>
                    {defenseMode === mode.id && <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />}
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-0.5 truncate">{mode.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Filter Toggles List */}
          <div className="space-y-3 pt-1">
            {[
              {
                id: "antiInvite",
                label: "Block Discord Invites",
                desc: "Instantly deletes discord.gg, discord.com/invite, and vanity invite links posted by non-moderators.",
                value: antiInvite,
                setter: setAntiInvite,
                icon: "🚫",
                color: "red" as const
              },
              {
                id: "antiSpam",
                label: "Anti-Spam Rate Limiter",
                desc: "Stops chat flooding: deletes messages sent faster than 5 in 3s or messages containing mass user mentions (>4).",
                value: antiSpam,
                setter: setAntiSpam,
                icon: "⚡",
                color: "orange" as const
              },
              {
                id: "antiBadWords",
                label: "Profanity & Slur Filter",
                desc: "Scans for toxic hate speech, targeted slurs, and racial derogatory keywords with smart obfuscation bypass.",
                value: antiBadWords,
                setter: setAntiBadWords,
                icon: "🤬",
                color: "fuchsia" as const
              },
              {
                id: "antiLinks",
                label: "Block External Suspicious Links",
                desc: "Prevents phishing and account hijacking: blocks raw external links in public channels while whitelisting media.",
                value: antiLinks,
                setter: setAntiLinks,
                icon: "🛡️",
                color: "orange" as const
              },
              {
                id: "antiCaps",
                label: "Excessive Capitals Limiter",
                desc: "Auto-cleans shout messages: deletes messages with over 70% capital letters longer than 10 characters.",
                value: antiCaps,
                setter: setAntiCaps,
                icon: "📢",
                color: "red" as const
              }
            ].map((rule) => (
              <div
                key={rule.id}
                onClick={() => rule.setter(!rule.value)}
                className={`p-4.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer select-none ${
                  rule.value
                    ? "bg-[#181122] border-white/10 hover:border-white/20 shadow-md"
                    : "bg-[#130d1b]/60 border-white/5 hover:border-white/10 opacity-75"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-lg shrink-0 mt-0.5 border border-white/5">
                    {rule.icon}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-white flex items-center gap-2">
                      <span>{rule.label}</span>
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{rule.desc}</p>
                  </div>
                </div>

                <TactileToggle
                  checked={rule.value}
                  onChange={rule.setter}
                  color={rule.color}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── RIGHT: INTERACTIVE THREAT SIMULATOR & DISCORD PREVIEW (5 COLS) ──── */}
      <div className="xl:col-span-5 space-y-6 xl:sticky xl:top-20">
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#120a1c] via-[#140b20] to-[#0d0714] border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.7)] space-y-5">
          {/* Visualizer Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-orange-400" />
              <span className="font-mono text-xs uppercase tracking-wider font-bold text-white">
                Live Chat Simulator
              </span>
            </div>
            <span className="text-[10px] font-mono text-fuchsia-400 bg-fuchsia-500/10 px-2 py-0.5 rounded-full border border-fuchsia-500/20">
              Interactive Test Sandbox
            </span>
          </div>

          {/* Interactive Input Bar */}
          <div className="space-y-2">
            <label className="text-[11px] font-mono uppercase text-zinc-400 font-bold flex items-center justify-between">
              <span>Test Chat Input</span>
              <span className="text-zinc-500 font-normal">Press Enter or click presets</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") runSimulation(testInput);
                }}
                placeholder="Type a test message (e.g. discord.gg/nitro)..."
                className="flex-1 bg-[#1c1229] border border-white/10 focus:border-orange-500/60 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 outline-none transition"
              />
              <button
                onClick={() => runSimulation(testInput)}
                disabled={isSimulating}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-black font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-lg shadow-orange-500/20"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Test</span>
              </button>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="space-y-1.5">
            <p className="text-[10px] font-mono text-zinc-400 font-bold uppercase">Click Quick Test Preset:</p>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => runSimulation(preset.text)}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-[11px] text-zinc-300 hover:text-white transition cursor-pointer font-medium"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Discord Chat Preview Container */}
          <div className="rounded-2xl bg-[#313338] border border-black/40 p-4 font-sans text-xs shadow-2xl space-y-4">
            {/* Simulation Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[10px] font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>#general • Discord Client Preview</span>
              </span>
              <span className="text-zinc-500">Live Gateway</span>
            </div>

            {/* User message sent */}
            <div className="space-y-1">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white text-xs shrink-0 shadow">
                  A
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">Alex_Player</span>
                    <span className="text-[10px] text-zinc-400 font-mono">Today at 11:42 PM</span>
                  </div>

                  {simulatedResult?.blocked ? (
                    <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 font-mono text-xs line-through flex items-center justify-between gap-2">
                      <span className="truncate">{testInput}</span>
                      <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider shrink-0 font-sans not-italic">
                        [DELETED]
                      </span>
                    </div>
                  ) : (
                    <p className="text-xs text-zinc-200 bg-white/5 p-2 rounded-lg border border-white/5">
                      {testInput}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Bot Response */}
            {simulatedResult?.blocked ? (
              <div className="flex items-start gap-2.5 pt-1">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center text-sm shrink-0 shadow">
                  🛡️
                </div>
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white text-xs">VePlexity Shield</span>
                    <span className="px-1.5 py-0.2 rounded bg-[#5865F2] text-white text-[9px] font-extrabold">BOT</span>
                    <span className="text-[10px] text-zinc-400 font-mono">Today at 11:42 PM</span>
                  </div>
                  <div className="text-xs text-amber-200 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 shadow-inner">
                    <p className="font-semibold flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Action Enforced</span>
                    </p>
                    <p className="text-[11px] text-amber-300/90 mt-1">
                      ⚠️ <strong className="text-white">@Alex_Player</strong>, your message was deleted for violating <strong className="text-amber-200">{simulatedResult.reason}</strong>.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Message passed all active Auto-Mod security checks cleanly!</span>
              </div>
            )}

            {/* Audit Log Entry */}
            <div className="space-y-1.5 pt-2 border-t border-white/5">
              <p className="text-[10px] font-mono uppercase text-zinc-400 font-bold flex items-center justify-between">
                <span>Logged to #mod-logs (Audit Trail):</span>
                <span className="text-zinc-500">&lt;1ms Execution</span>
              </p>
              <div className="rounded-xl bg-[#2b2d31] border-l-4 border-red-500 p-3 space-y-1 text-xs">
                <p className="font-bold text-white flex items-center justify-between">
                  <span>🛡️ Auto-Mod Triggered: {simulatedResult?.blocked ? simulatedResult.reason : "No Threat Detected"}</span>
                  <span className="text-[10px] font-mono text-zinc-400">ID: #AM-8921</span>
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-300 pt-1">
                  <div><strong>User:</strong> @Alex_Player (981273)</div>
                  <div><strong>Channel:</strong> #general</div>
                </div>
                {simulatedResult?.payload && (
                  <p className="text-zinc-300 text-[11px] pt-0.5 truncate">
                    <strong>Payload:</strong>{" "}
                    <code className="text-red-300 font-mono text-[10px] bg-black/40 px-1.5 py-0.5 rounded">
                      {simulatedResult.payload}
                    </code>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
