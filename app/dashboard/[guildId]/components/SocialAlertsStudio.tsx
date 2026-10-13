"use client";

import React, { useState } from "react";
import { 
  Radio, Bell, Send, Check, ExternalLink, Sparkles, 
  Hash, Users, AlertCircle, Play, Video, Share2, 
  MessageSquare, Flame, CheckCircle2, RefreshCw
} from "lucide-react";
import { TactileToggle } from "./TactileToggle";
import { dashboardAudio } from "@/lib/dashboardAudio";

export interface SocialPlatformConfig {
  enabled: boolean;
  target: string;
  message: string;
  channelId?: string | null;
  pingRole?: string | null;
}

export interface NotificationsConfig {
  enabled: boolean;
  channelId: string | null;
  pingRole: string | null;
  youtube: SocialPlatformConfig;
  twitch: SocialPlatformConfig;
  tiktok: SocialPlatformConfig;
  twitter: SocialPlatformConfig;
  reddit: SocialPlatformConfig;
}

interface ChannelItem {
  id: string;
  name: string;
  type: number;
}

interface RoleItem {
  id: string;
  name: string;
  color: number;
}

interface SocialAlertsStudioProps {
  channels: ChannelItem[];
  roles: RoleItem[];
  guildId: string;
  config: NotificationsConfig;
  onChange: (updated: NotificationsConfig) => void;
  onSendTest?: (platform: string, channelId: string) => Promise<void>;
  isPingPlexMode?: boolean;
}

type PlatformKey = "youtube" | "twitch" | "tiktok" | "twitter" | "reddit";

const PLATFORMS: {
  key: PlatformKey;
  name: string;
  color: string;
  bgActive: string;
  borderActive: string;
  icon: string;
  defaultPlaceholder: string;
  defaultTargetLabel: string;
  defaultExampleUrl: string;
  sampleAuthor: string;
  sampleTitle: string;
  sampleGame?: string;
  badgeText: string;
}[] = [
  {
    key: "youtube",
    name: "YouTube",
    color: "#FF0000",
    bgActive: "bg-red-500/10",
    borderActive: "border-red-500/40 text-red-400",
    icon: "▶",
    defaultPlaceholder: "https://youtube.com/@VePlexity or UCxxxx...",
    defaultTargetLabel: "YouTube Channel URL or ID",
    defaultExampleUrl: "https://youtube.com/watch?v=dQw4w9WgXcQ",
    sampleAuthor: "VePlexity Official",
    sampleTitle: "Next-Gen Discord Bot Feature Showcase & Demo",
    badgeText: "NEW UPLOAD",
  },
  {
    key: "twitch",
    name: "Twitch",
    color: "#9146FF",
    bgActive: "bg-purple-500/10",
    borderActive: "border-purple-500/40 text-purple-400",
    icon: "🟣",
    defaultPlaceholder: "streamer_username",
    defaultTargetLabel: "Twitch Channel Username",
    defaultExampleUrl: "https://twitch.tv/veplexity",
    sampleAuthor: "VePlexity",
    sampleTitle: "Chill 24/7 Lo-Fi & Community Discord Hangout",
    sampleGame: "Just Chatting",
    badgeText: "LIVE ON TWITCH",
  },
  {
    key: "tiktok",
    name: "TikTok",
    color: "#00F2FE",
    bgActive: "bg-cyan-500/10",
    borderActive: "border-cyan-500/40 text-cyan-400",
    icon: "🎵",
    defaultPlaceholder: "@veplexity",
    defaultTargetLabel: "TikTok @Username",
    defaultExampleUrl: "https://tiktok.com/@veplexity/video/123",
    sampleAuthor: "veplexity",
    sampleTitle: "POV: When your Discord bot plays 24/7 lossless audio ✨",
    badgeText: "NEW TIKTOK",
  },
  {
    key: "twitter",
    name: "X (Twitter)",
    color: "#1DA1F2",
    bgActive: "bg-sky-500/10",
    borderActive: "border-sky-500/40 text-sky-400",
    icon: "𝕏",
    defaultPlaceholder: "@VePlexityBot",
    defaultTargetLabel: "X / Twitter Handle",
    defaultExampleUrl: "https://x.com/VePlexityBot/status/123",
    sampleAuthor: "VePlexity",
    sampleTitle: "Update v2.4 is officially live with full Pingcord alerts integration!",
    badgeText: "NEW POST",
  },
  {
    key: "reddit",
    name: "Reddit",
    color: "#FF4500",
    bgActive: "bg-orange-500/10",
    borderActive: "border-orange-500/40 text-orange-400",
    icon: "🤖",
    defaultPlaceholder: "r/discordapp",
    defaultTargetLabel: "Subreddit (e.g. r/community)",
    defaultExampleUrl: "https://reddit.com/r/discordapp/comments/123",
    sampleAuthor: "u/VePlexityTeam",
    sampleTitle: "Announcing open telemetry and instant alerts for creators",
    badgeText: "NEW REDDIT POST",
  },
];

export function SocialAlertsStudio({
  channels,
  roles,
  guildId,
  config,
  onChange,
  onSendTest,
  isPingPlexMode,
}: SocialAlertsStudioProps) {
  const [activePlatform, setActivePlatform] = useState<PlatformKey>("youtube");
  const [testSending, setTestSending] = useState(false);
  const [testSuccess, setTestSuccess] = useState(false);

  const textChannels = channels.filter((c) => c.type === 0 || c.type === 5);
  const currentPlatformMeta = PLATFORMS.find((p) => p.key === activePlatform)!;
  const currentPlatformConfig = config[activePlatform];

  const updateGlobal = (patch: Partial<NotificationsConfig>) => {
    onChange({ ...config, ...patch });
  };

  const updatePlatformConfig = (patch: Partial<SocialPlatformConfig>) => {
    onChange({
      ...config,
      [activePlatform]: {
        ...config[activePlatform],
        ...patch,
      },
    });
  };

  const insertVariable = (variable: string) => {
    dashboardAudio.playClick();
    const current = currentPlatformConfig.message;
    updatePlatformConfig({ message: current + " " + variable });
  };

  const handleTestNotification = async () => {
    const targetChannel = currentPlatformConfig.channelId || config.channelId;
    if (!targetChannel) {
      alert("Please select a target channel first!");
      return;
    }
    dashboardAudio.playAction();
    setTestSending(true);
    setTestSuccess(false);
    try {
      if (onSendTest) {
        await onSendTest(activePlatform, targetChannel);
      } else {
        // Fallback simulated success
        await new Promise((res) => setTimeout(res, 1200));
      }
      setTestSuccess(true);
      setTimeout(() => setTestSuccess(false), 3500);
    } catch (e) {
      // Handled
    } finally {
      setTestSending(false);
    }
  };

  // Compute live rendered preview text
  const previewChannelId = currentPlatformConfig.channelId || config.channelId;
  const previewChannel = channels.find((c) => c.id === previewChannelId)?.name || "stream-alerts";
  const previewRole = currentPlatformConfig.pingRole || config.pingRole || "@everyone";

  const renderedMessage = (currentPlatformConfig.message || "")
    .replace(/\{author\}/g, currentPlatformMeta.sampleAuthor)
    .replace(/\{title\}/g, currentPlatformMeta.sampleTitle)
    .replace(/\{url\}/g, currentPlatformMeta.defaultExampleUrl)
    .replace(/\{game\}/g, currentPlatformMeta.sampleGame || "Gaming")
    .replace(/\{role\}/g, previewRole)
    .replace(/\{subreddit\}/g, currentPlatformConfig.target || "r/community");

  return (
    <div className="space-y-6 w-full">
      {/* Module Master Banner */}
      <div className={`p-6 rounded-2xl pro-card flex flex-col md:flex-row items-start md:items-center justify-between gap-5 border ${
        isPingPlexMode ? "border-fuchsia-500/30 bg-[#0d0a14]" : "border-zinc-800"
      }`}>
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
            isPingPlexMode
              ? "bg-fuchsia-500/10 border border-fuchsia-500/25 text-fuchsia-400"
              : "bg-[#5865F2]/10 border border-[#5865F2]/25 text-[#5865F2]"
          }`}>
            <Radio className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {isPingPlexMode ? "PingPlex Creator Alerts Studio" : "Social Media Alerts & Streams"}
              </h2>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                isPingPlexMode
                  ? "bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30"
                  : "bg-[#5865F2]/10 text-[#5865F2] border border-[#5865F2]/20"
              }`}>
                {isPingPlexMode ? "📡 PINGPLEX v2.0" : "PINGCORD ENGINE"}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              {isPingPlexMode
                ? "Zero-delay real-time notification engine. PingPlex monitors your creator feeds and broadcasts rich embeds to Discord channels with custom roles and zero paywalls."
                : "Post instant notifications when channels go live or publish new videos. Supports YouTube, Twitch, TikTok, X (Twitter), and Reddit with custom roles and embeds."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-zinc-300">Module Status</span>
          <TactileToggle
            checked={config.enabled}
            onChange={(checked) => updateGlobal({ enabled: checked })}
            label="Toggle Social Alerts"
          />
        </div>
      </div>

      {/* Global Defaults Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 rounded-2xl bg-[#0d0f17] border border-zinc-800">
        {/* Default Channel */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
            <Hash className="w-4 h-4 text-[#5865F2]" />
            <span>Default Announcement Channel</span>
          </label>
          <select
            value={config.channelId || ""}
            onChange={(e) => updateGlobal({ channelId: e.target.value || null })}
            className="w-full pro-input py-2.5 px-3.5 text-xs font-medium cursor-pointer"
          >
            <option value="">Select a channel...</option>
            {textChannels.map((c) => (
              <option key={c.id} value={c.id}>
                #{c.name}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-zinc-500">
            Used as the default target channel unless overridden per platform.
          </p>
        </div>

        {/* Default Ping Role */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4 text-[#5865F2]" />
            <span>Default Mention Role</span>
          </label>
          <select
            value={config.pingRole || "@everyone"}
            onChange={(e) => updateGlobal({ pingRole: e.target.value || null })}
            className="w-full pro-input py-2.5 px-3.5 text-xs font-medium cursor-pointer"
          >
            <option value="@everyone">@everyone</option>
            <option value="@here">@here</option>
            <option value="none">No Mention (Silent)</option>
            {roles.map((r) => (
              <option key={r.id} value={`<@&${r.id}>`}>
                @{r.name}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-zinc-500">
            Role pinged when a creator goes live or publishes content.
          </p>
        </div>
      </div>

      {/* Platform Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {PLATFORMS.map((plat) => {
          const isSelected = activePlatform === plat.key;
          const isEnabled = config[plat.key]?.enabled;
          return (
            <button
              key={plat.key}
              onClick={() => {
                dashboardAudio.playClick();
                setActivePlatform(plat.key);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition select-none cursor-pointer border ${
                isSelected
                  ? `${plat.bgActive} ${plat.borderActive} border`
                  : "bg-[#0f111a] border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              <span className="text-sm">{plat.icon}</span>
              <span>{plat.name}</span>
              <span
                className={`w-2 h-2 rounded-full ${
                  isEnabled ? "bg-emerald-400 shadow-sm shadow-emerald-400/50" : "bg-zinc-600"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Active Platform Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Platform Settings (7 cols) */}
        <div className="lg:col-span-7 space-y-5 p-6 rounded-2xl pro-card border border-zinc-800">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
            <div className="flex items-center gap-3">
              <span className="text-xl">{currentPlatformMeta.icon}</span>
              <div>
                <h3 className="font-bold text-base text-white">
                  {currentPlatformMeta.name} Alerts
                </h3>
                <p className="text-xs text-zinc-400">
                  Configure live alerts and automated video uploads
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-xs text-zinc-400 font-medium">
                {currentPlatformConfig.enabled ? "Active" : "Disabled"}
              </span>
              <TactileToggle
                checked={currentPlatformConfig.enabled}
                onChange={(checked) => updatePlatformConfig({ enabled: checked })}
                label={`Enable ${currentPlatformMeta.name}`}
              />
            </div>
          </div>

          {/* Target Account / URL */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
              {currentPlatformMeta.defaultTargetLabel}
            </label>
            <input
              type="text"
              placeholder={currentPlatformMeta.defaultPlaceholder}
              value={currentPlatformConfig.target || ""}
              onChange={(e) => updatePlatformConfig({ target: e.target.value })}
              className="w-full pro-input py-2.5 px-3.5 text-xs font-mono"
            />
            <p className="text-[11px] text-zinc-500">
              Provide the exact creator channel URL, handle, or ID to monitor.
            </p>
          </div>

          {/* Channel Override & Role Override */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Specific Channel
              </label>
              <select
                value={currentPlatformConfig.channelId || ""}
                onChange={(e) => updatePlatformConfig({ channelId: e.target.value || null })}
                className="w-full pro-input py-2 px-3 text-xs"
              >
                <option value="">Use Server Default</option>
                {textChannels.map((c) => (
                  <option key={c.id} value={c.id}>
                    #{c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Specific Mention Role
              </label>
              <select
                value={currentPlatformConfig.pingRole || ""}
                onChange={(e) => updatePlatformConfig({ pingRole: e.target.value || null })}
                className="w-full pro-input py-2 px-3 text-xs"
              >
                <option value="">Use Server Default</option>
                <option value="@everyone">@everyone</option>
                <option value="@here">@here</option>
                <option value="none">None</option>
                {roles.map((r) => (
                  <option key={r.id} value={`<@&${r.id}>`}>
                    @{r.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Message Template Builder */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Notification Message Template
              </label>
              <span className="text-[10px] font-mono text-zinc-500">Discord Markdown Supported</span>
            </div>

            {/* 1-Click Message Template Presets */}
            <div className="space-y-1.5 p-3 rounded-xl bg-[#0b0d14] border border-zinc-800/80">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-fuchsia-400 font-bold flex items-center gap-1.5">
                  <span>⚡ 1-CLICK PRESET TEMPLATES</span>
                </span>
                <span className="text-[10px] text-zinc-500">Click to load preset</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 pt-1">
                {[
                  {
                    icon: "🔥",
                    name: "Hype Alert",
                    template: "{role} 🚨 **{author}** just dropped something CRAZY! Go check it out: {url}",
                  },
                  {
                    icon: "🎮",
                    name: "Stream Live",
                    template: "{role} 🔴 **{author}** is now LIVE playing **{game}**! Come chill: {url}",
                  },
                  {
                    icon: "✨",
                    name: "Minimalist Clean",
                    template: "{role} **{author}** • {title} \n{url}",
                  },
                  {
                    icon: "☕",
                    name: "Community Chill",
                    template: "{role} New drop from **{author}**! Grab snacks and enjoy: {url}",
                  },
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      dashboardAudio.playClick();
                      updatePlatformConfig({ message: preset.template });
                    }}
                    title={preset.template}
                    className="px-2.5 py-1.5 rounded-lg bg-[#141624] hover:bg-fuchsia-950/40 border border-zinc-800 hover:border-fuchsia-500/50 text-[11px] font-semibold text-zinc-300 hover:text-white transition flex items-center gap-1.5 cursor-pointer text-left truncate group shadow-xs"
                  >
                    <span>{preset.icon}</span>
                    <span className="truncate group-hover:text-fuchsia-300">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <textarea
              rows={4}
              value={currentPlatformConfig.message || ""}
              onChange={(e) => updatePlatformConfig({ message: e.target.value })}
              className="w-full pro-input p-3 text-xs font-mono resize-none leading-relaxed"
              placeholder="Enter message template..."
            />

            {/* Variable Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] font-bold text-zinc-400 mr-1">Insert Tags:</span>
              {[
                { tag: "{author}", desc: "Creator Name" },
                { tag: "{title}", desc: "Stream / Video Title" },
                { tag: "{url}", desc: "Direct Link" },
                { tag: "{role}", desc: "Mention Role" },
                ...(activePlatform === "twitch" ? [{ tag: "{game}", desc: "Category / Game" }] : []),
                ...(activePlatform === "reddit" ? [{ tag: "{subreddit}", desc: "Subreddit Name" }] : []),
              ].map((v) => (
                <button
                  key={v.tag}
                  type="button"
                  onClick={() => insertVariable(v.tag)}
                  className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-[#5865F2]/20 hover:border-[#5865F2]/40 border border-zinc-700 text-zinc-300 hover:text-white text-[11px] font-mono font-medium transition cursor-pointer"
                  title={v.desc}
                >
                  {v.tag}
                </button>
              ))}
            </div>
          </div>

          {/* Test Notification Trigger */}
          <div className="pt-2 flex items-center justify-between border-t border-zinc-800/80">
            <div className="flex items-center gap-2">
              {testSuccess && (
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  Test notification posted!
                </span>
              )}
            </div>

            <button
              onClick={handleTestNotification}
              disabled={testSending || !config.enabled}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                testSending
                  ? "bg-zinc-800 text-zinc-400 cursor-not-allowed"
                  : "btn-secondary"
              }`}
            >
              {testSending ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Sending Test Alert...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-[#5865F2]" />
                  <span>Send Test Alert to #{previewChannel}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Live Discord Chat Embed Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#5865F2]" />
              <span>Live Discord Preview</span>
            </span>
            <span className="text-[10px] font-mono text-zinc-500">#{previewChannel}</span>
          </div>

          {/* Authentic Discord Chat Message Box */}
          <div className="p-4 rounded-2xl bg-[#313338] border border-zinc-700/60 shadow-2xl text-zinc-200 font-sans space-y-3">
            {/* Discord Message Header */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center text-white shrink-0 shadow-md">
                <Radio className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-sm text-white hover:underline cursor-pointer">
                    VePlexity
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#5865F2] text-white uppercase font-sans">
                    BOT
                  </span>
                  <span className="text-[11px] text-[#949ba4] font-medium ml-1">
                    Today at 8:45 PM
                  </span>
                </div>

                {/* Role mention in Discord blurple highlight */}
                {previewRole && previewRole !== "none" && (
                  <div className="mt-1 text-xs">
                    <span className="px-1 py-0.5 rounded bg-[#5865f2]/20 text-[#c9cdfb] font-semibold">
                      {previewRole}
                    </span>
                  </div>
                )}

                {/* Rendered Message Prose */}
                <p className="text-xs text-[#dbdee1] mt-1.5 whitespace-pre-wrap leading-relaxed font-sans">
                  {renderedMessage || "No notification message configured."}
                </p>
              </div>
            </div>

            {/* Rich Embed Card with Platform Accent Border */}
            <div
              className="ml-13 rounded-lg bg-[#2b2d31] p-3.5 border-l-4 space-y-2.5 shadow-sm"
              style={{ borderLeftColor: currentPlatformMeta.color }}
            >
              {/* Embed Author */}
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-white font-bold"
                  style={{ backgroundColor: currentPlatformMeta.color }}
                >
                  {currentPlatformMeta.icon}
                </div>
                <span className="text-xs font-semibold text-white">
                  {currentPlatformMeta.sampleAuthor}
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-black/40 text-zinc-300 font-bold ml-auto">
                  {currentPlatformMeta.badgeText}
                </span>
              </div>

              {/* Embed Title & Description */}
              <div>
                <h4 className="text-xs font-bold text-[#00a8fc] hover:underline cursor-pointer">
                  {currentPlatformMeta.sampleTitle}
                </h4>
                {activePlatform === "twitch" && (
                  <p className="text-[11px] text-[#949ba4] mt-0.5">
                    Playing: <strong className="text-white">{currentPlatformMeta.sampleGame}</strong>
                  </p>
                )}
              </div>

              {/* Media Thumbnail Placeholder Banner */}
              <div className="w-full h-32 rounded-md bg-[#1e1f22] border border-zinc-700/50 flex flex-col items-center justify-center text-zinc-500 space-y-1 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <Play className="w-8 h-8 text-white/80 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono text-zinc-400 z-10 font-bold">
                  Click to Watch on {currentPlatformMeta.name}
                </span>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-[10px] text-[#949ba4] pt-1 border-t border-zinc-800">
                <span>VePlexity Pingcord Relay</span>
                <span className="font-mono">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
