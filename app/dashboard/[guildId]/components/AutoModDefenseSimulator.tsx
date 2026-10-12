"use client";

import React, { useState } from "react";
import { 
  Lock, Shield, AlertTriangle, CheckCircle2, Zap, 
  Terminal, Send, RotateCcw, Volume2, Flame,
  Ban, Link2, AlertOctagon, Megaphone, Check
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
    { label: "Discord Invite", text: "Join my new server: https://discord.gg/vip-hangout", type: "antiInvite" },
    { label: "Phishing Link", text: "Free Steam $50 Gift Card: http://claim-nitro.xyz/gift", type: "antiLinks" },
    { label: "Excessive Caps", text: "HEY EVERYONE WAKE UP AND JOIN THE VOICE CHANNEL RIGHT NOW", type: "antiCaps" },
    { label: "Mass Mentions", text: "@everyone @here ping ping spamming chat", type: "antiSpam" },
    { label: "Profanity Slurs", text: "You are totally garbage trash idiot dumb", type: "antiBadWords" },
    { label: "Clean Chat", text: "Hey everyone! The new VePlexity bot update is awesome.", type: "clean" },
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
        <div className="pro-card p-6 sm:p-8 space-y-6">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-zinc-800">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-100 shrink-0">
                <Shield className="w-6 h-6 text-[#5865F2]" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2.5">
                  <span>Auto-Mod Defense Rules</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#5865F2]/10 text-[#5865F2] border border-[#5865F2]/20 font-semibold">
                    REAL-TIME
                  </span>
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Automated filters that intercept messages and enforce server integrity instantly.
                </p>
              </div>
            </div>

            {/* Defense Health Ring */}
            <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 shrink-0">
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
                    className={defenseScore === 100 ? "text-emerald-400" : defenseScore >= 60 ? "text-amber-400" : "text-rose-400"}
                    strokeDasharray={`${defenseScore}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute font-mono text-xs font-bold text-white">
                  {defenseScore}%
                </span>
              </div>
              <div className="text-left">
                <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">Shield Status</p>
                <p className="text-xs font-bold text-white">
                  {activeCount}/5 Active
                </p>
              </div>
            </div>
          </div>

          {/* Preset Strictness Selector */}
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase text-zinc-400 font-semibold">
              Security Profile Preset
            </p>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: "balanced", label: "Balanced", desc: "Invites + Spam + Slurs" },
                { id: "strict", label: "Strict", desc: "+ Block External URLs" },
                { id: "fortress", label: "Fortress", desc: "All 5 Rules Active" },
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => handleModeSelect(mode.id as any)}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                    defenseMode === mode.id
                      ? "bg-zinc-800 border-[#5865F2] text-white"
                      : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                  }`}
                >
                  <p className="text-xs font-bold flex items-center justify-between">
                    <span>{mode.label}</span>
                    {defenseMode === mode.id && <span className="w-1.5 h-1.5 rounded-full bg-[#5865F2]" />}
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-0.5 truncate">{mode.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Filter Toggles List */}
          <div className="space-y-2.5 pt-1">
            {[
              {
                id: "antiInvite",
                label: "Block Discord Invites",
                desc: "Deletes discord.gg and vanity invite links posted by non-moderators.",
                value: antiInvite,
                setter: setAntiInvite,
                icon: Ban,
                color: "red" as const
              },
              {
                id: "antiSpam",
                label: "Anti-Spam Rate Limiter",
                desc: "Prevents chat flooding (>5 messages in 3s) and mass user mentions (>4).",
                value: antiSpam,
                setter: setAntiSpam,
                icon: Zap,
                color: "orange" as const
              },
              {
                id: "antiBadWords",
                label: "Profanity & Slur Filter",
                desc: "Scans for toxic hate speech, targeted slurs, and malicious harassment.",
                value: antiBadWords,
                setter: setAntiBadWords,
                icon: AlertOctagon,
                color: "fuchsia" as const
              },
              {
                id: "antiLinks",
                label: "Block External Links",
                desc: "Blocks suspicious external domains and raw unverified hyperlinks.",
                value: antiLinks,
                setter: setAntiLinks,
                icon: Link2,
                color: "orange" as const
              },
              {
                id: "antiCaps",
                label: "Excessive Capitals Filter",
                desc: "Deletes shouting messages containing over 70% uppercase letters.",
                value: antiCaps,
                setter: setAntiCaps,
                icon: Megaphone,
                color: "red" as const
              }
            ].map((rule) => {
              const RuleIcon = rule.icon;
              return (
                <div
                  key={rule.id}
                  onClick={() => rule.setter(!rule.value)}
                  className={`p-4 rounded-xl border transition flex items-center justify-between gap-4 cursor-pointer select-none ${
                    rule.value
                      ? "bg-zinc-900/90 border-zinc-700"
                      : "bg-zinc-900/40 border-zinc-800/80 opacity-75 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0 mt-0.5 border border-zinc-700 text-zinc-300">
                      <RuleIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-white">
                        {rule.label}
                      </p>
                      <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{rule.desc}</p>
                    </div>
                  </div>

                  <TactileToggle
                    checked={rule.value}
                    onChange={rule.setter}
                    color="emerald"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── RIGHT: THREAT SIMULATOR & CLIENT PREVIEW (5 COLS) ─────────────── */}
      <div className="xl:col-span-5 space-y-6">
        <div className="pro-card p-6 space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-zinc-400" />
              <span className="font-mono text-xs uppercase tracking-wider font-bold text-white">
                Live Chat Simulator
              </span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-2.5 py-0.5 rounded-md border border-zinc-700 font-semibold">
              SANDBOX
            </span>
          </div>

          {/* Interactive Input Bar */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-zinc-400 font-semibold flex items-center justify-between">
              <span>Test Chat Input</span>
              <span className="text-zinc-500 font-normal">Press Enter or click preset</span>
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
                className="flex-1 pro-input px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500"
              />
              <button
                onClick={() => runSimulation(testInput)}
                disabled={isSimulating}
                className="px-4 py-2.5 rounded-lg bg-[#5865F2] hover:bg-[#4752c4] text-white font-semibold text-xs transition cursor-pointer shrink-0 flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Test</span>
              </button>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="space-y-1.5">
            <p className="text-xs font-mono text-zinc-400 font-semibold uppercase">Presets:</p>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => runSimulation(preset.text)}
                  className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-300 hover:text-white transition cursor-pointer font-medium"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Discord Chat Preview Container */}
          <div className="rounded-xl bg-[#313338] border border-zinc-800 p-4 font-sans text-xs space-y-3.5">
            {/* Simulation Header */}
            <div className="flex items-center justify-between border-b border-zinc-700/60 pb-2 text-[10px] font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>#general • Discord Preview</span>
              </span>
              <span className="text-zinc-500">Live Gateway</span>
            </div>

            {/* User message sent */}
            <div className="space-y-1">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center font-bold text-white text-xs shrink-0">
                  U
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-xs">TestUser</span>
                    <span className="text-[10px] text-zinc-400 font-mono">Today at 11:42 PM</span>
                  </div>

                  {simulatedResult?.blocked ? (
                    <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-800/60 text-rose-300 font-mono text-xs line-through flex items-center justify-between gap-2">
                      <span className="truncate">{testInput}</span>
                      <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider shrink-0 not-italic font-sans">
                        [DELETED]
                      </span>
                    </div>
                  ) : (
                    <p className="text-xs text-zinc-200 bg-black/20 p-2 rounded-lg border border-white/5">
                      {testInput}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Bot Response */}
            {simulatedResult?.blocked ? (
              <div className="flex items-start gap-2.5 pt-1">
                <div className="w-8 h-8 rounded-full bg-[#5865F2] flex items-center justify-center text-white shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white text-xs">VePlexity</span>
                    <span className="px-1.5 py-0.2 rounded bg-[#5865F2] text-white text-[9px] font-bold">BOT</span>
                    <span className="text-[10px] text-zinc-400 font-mono">Today at 11:42 PM</span>
                  </div>
                  <div className="text-xs text-amber-200 bg-amber-950/30 p-2.5 rounded-lg border border-amber-800/50">
                    <p className="font-semibold flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Security Violation Enforced</span>
                    </p>
                    <p className="text-[11px] text-amber-300/90 mt-1">
                      Message deleted for violating <strong className="text-white">{simulatedResult.reason}</strong>.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/50 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Message passed all active Auto-Mod rules cleanly.</span>
              </div>
            )}

            {/* Audit Log Entry */}
            <div className="space-y-1 pt-2 border-t border-zinc-700/60">
              <p className="text-[10px] font-mono uppercase text-zinc-400 font-semibold flex items-center justify-between">
                <span>Audit Trail (#mod-logs):</span>
                <span className="text-zinc-500">&lt;1ms Execution</span>
              </p>
              <div className="rounded-lg bg-[#2b2d31] border-l-2 border-rose-500 p-2.5 space-y-1 text-xs">
                <p className="font-semibold text-white flex items-center justify-between">
                  <span>Auto-Mod: {simulatedResult?.blocked ? simulatedResult.reason : "Passed"}</span>
                  <span className="text-[10px] font-mono text-zinc-400">#AM-8921</span>
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-400 pt-0.5">
                  <div>User: @TestUser</div>
                  <div>Channel: #general</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
