"use client";

import { useEffect, useState, use } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { 
  Shield, Bell, Bot, Music, Check, Sparkles, AlertCircle, 
  ArrowLeft, Save, RefreshCw, CheckCircle2, ChevronRight, Hash, Volume2
} from "lucide-react";

interface RoleItem {
  id: string;
  name: string;
  color: number;
  position: number;
  managed: boolean;
}

interface ChannelItem {
  id: string;
  name: string;
  type: number;
  parentId?: string | null;
}

interface GuildConfig {
  modRoles: string[];
  modLogChannel: string | null;
  welcome: {
    enabled: boolean;
    channelId: string | null;
    message: string;
  };
  chatbot: {
    enabled: boolean;
    channelId: string | null;
    mode: string;
  };
  music: {
    djRole: string | null;
    defaultVolume: number;
  };
}

interface GuildDetails {
  id: string;
  name: string;
  icon: string | null;
  memberCount: number;
  roles: RoleItem[];
  channels: {
    text: ChannelItem[];
    voice: ChannelItem[];
  };
  config: GuildConfig;
  recommendations: {
    modLogChannelId: string | null;
    welcomeChannelId: string | null;
    chatbotChannelId: string | null;
  };
}

export default function GuildDashboard({ params }: { params: Promise<{ guildId: string }> }) {
  const resolvedParams = use(params);
  const guildId = resolvedParams.guildId;
  const { data: session } = useSession();

  const [activeTab, setActiveTab] = useState<"moderation" | "welcome" | "ai" | "music">("moderation");
  const [guild, setGuild] = useState<GuildDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Form State
  const [modRoles, setModRoles] = useState<string[]>([]);
  const [modLogChannel, setModLogChannel] = useState<string>("");
  const [welcomeEnabled, setWelcomeEnabled] = useState(false);
  const [welcomeChannel, setWelcomeChannel] = useState<string>("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [aiEnabled, setAiEnabled] = useState(false);
  const [aiChannel, setAiChannel] = useState<string>("");
  const [aiMode, setAiMode] = useState("standard");
  const [djRole, setDjRole] = useState<string>("");
  const [defaultVolume, setDefaultVolume] = useState<number>(100);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchGuildData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/bot/guilds/${guildId}`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to load guild details");
      }
      const data: GuildDetails = await res.json();
      setGuild(data);

      // Populate form state from server config
      setModRoles(data.config?.modRoles || []);
      setModLogChannel(data.config?.modLogChannel || "");
      setWelcomeEnabled(!!data.config?.welcome?.enabled);
      setWelcomeChannel(data.config?.welcome?.channelId || "");
      setWelcomeMessage(data.config?.welcome?.message || "Welcome to {server}, {user}! We're thrilled to have you here 🎉");
      setAiEnabled(!!data.config?.chatbot?.enabled);
      setAiChannel(data.config?.chatbot?.channelId || "");
      setAiMode(data.config?.chatbot?.mode || "standard");
      setDjRole(data.config?.music?.djRole || "");
      setDefaultVolume(data.config?.music?.defaultVolume || 100);
    } catch (err: any) {
      console.error("[GuildDashboard] Fetch error:", err);
      showToast(err.message || "Could not connect to bot backend", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuildData();
  }, [guildId]);

  // Quick 1-Click Scanner: Auto-apply recommendations
  const applyScannerRecommendations = () => {
    if (!guild?.recommendations) return;
    if (guild.recommendations.modLogChannelId) {
      setModLogChannel(guild.recommendations.modLogChannelId);
    }
    if (guild.recommendations.welcomeChannelId) {
      setWelcomeEnabled(true);
      setWelcomeChannel(guild.recommendations.welcomeChannelId);
    }
    if (guild.recommendations.chatbotChannelId) {
      setAiEnabled(true);
      setAiChannel(guild.recommendations.chatbotChannelId);
    }
    showToast("Auto-detected channels applied! Click 'Save Changes' to commit.");
  };

  // Toggle role in modRoles
  const toggleModRole = (roleId: string) => {
    if (modRoles.includes(roleId)) {
      setModRoles(modRoles.filter((id) => id !== roleId));
    } else {
      setModRoles([...modRoles, roleId]);
    }
  };

  // Save Settings
  const handleSave = async () => {
    try {
      setSaving(true);
      const payload: GuildConfig = {
        modRoles,
        modLogChannel: modLogChannel || null,
        welcome: {
          enabled: welcomeEnabled,
          channelId: welcomeChannel || null,
          message: welcomeMessage,
        },
        chatbot: {
          enabled: aiEnabled,
          channelId: aiChannel || null,
          mode: aiMode,
        },
        music: {
          djRole: djRole || null,
          defaultVolume,
        },
      };

      const res = await fetch(`/api/bot/guilds/${guildId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to commit settings");
      }

      showToast("Server configurations saved successfully!");
      fetchGuildData();
    } catch (err: any) {
      showToast(err.message || "Failed to save configuration", "error");
    } finally {
      setSaving(false);
    }
  };

  // Calculate readiness score
  const readinessScore = () => {
    let score = 25; // Base bot connection
    if (modRoles.length > 0) score += 25;
    if (modLogChannel) score += 20;
    if (welcomeEnabled && welcomeChannel) score += 15;
    if (aiEnabled && aiChannel) score += 15;
    return Math.min(score, 100);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#070308] text-white flex flex-col items-center justify-center font-sans space-y-4">
        <div className="w-12 h-12 border-2 border-fuchsia-500/20 border-t-fuchsia-500 rounded-full animate-spin" />
        <p className="text-xs font-mono text-gray-400 tracking-widest uppercase">
          Auditing server telemetry & roles...
        </p>
      </main>
    );
  }

  const score = readinessScore();

  return (
    <main className="min-h-screen bg-[#070308] text-white flex flex-col font-sans relative overflow-x-hidden pb-24">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl border text-xs font-medium flex items-center gap-3 shadow-2xl backdrop-blur-xl transition-all ${
            toast.type === "success"
              ? "bg-emerald-950/90 border-emerald-500/40 text-emerald-300"
              : "bg-red-950/90 border-red-500/40 text-red-300"
          }`}
        >
          {toast.type === "success" ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-white/5 bg-[#070308]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center font-bold text-sm text-fuchsia-400">
                {guild?.icon ? (
                  <img src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=96`} alt="" className="w-full h-full object-cover" />
                ) : (
                  guild?.name.charAt(0)
                )}
              </div>
              <div>
                <h1 className="font-bold text-base text-white">{guild?.name || "Server"}</h1>
                <p className="text-[11px] text-gray-500">{guild?.memberCount || 0} Members • VePlexity Control</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-lg shadow-fuchsia-600/25 active:scale-95 disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </header>

      {/* Body Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full space-y-8">
        {/* 1-Click Server Readiness Scanner Bar */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-white/[0.03] to-white/[0.01] border border-white/10 backdrop-blur-xl relative overflow-hidden shadow-2xl space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-fuchsia-400" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-200">
                  Server Setup Readiness: {score}%
                </h2>
              </div>
              <p className="text-xs text-gray-400">
                Audit scan completed. Configure moderator roles and logging channels to achieve 100% security readiness.
              </p>
            </div>

            <button
              onClick={applyScannerRecommendations}
              className="py-2 px-4 rounded-xl bg-fuchsia-500/15 hover:bg-fuchsia-500/25 border border-fuchsia-500/30 text-fuchsia-300 font-medium text-xs transition-all flex items-center gap-2 self-start md:self-auto shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
              <span>1-Click Auto-Apply Recommendations</span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-fuchsia-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${score}%` }}
            />
          </div>

          {/* Quick Badges */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${
              modRoles.length > 0 ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-amber-500/10 border-amber-500/20 text-amber-400"
            }`}>
              {modRoles.length > 0 ? <Check className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
              <span>Mod Roles: {modRoles.length > 0 ? `${modRoles.length} Selected` : "Unconfigured"}</span>
            </span>

            <span className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${
              modLogChannel ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-white/5 border-white/10 text-gray-400"
            }`}>
              {modLogChannel ? <Check className="w-3 h-3" /> : <Hash className="w-3 h-3" />}
              <span>Mod Logs: {modLogChannel ? "Active" : "None"}</span>
            </span>

            <span className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${
              welcomeEnabled && welcomeChannel ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-white/5 border-white/10 text-gray-400"
            }`}>
              {welcomeEnabled && welcomeChannel ? <Check className="w-3 h-3" /> : <Bell className="w-3 h-3" />}
              <span>Welcomer: {welcomeEnabled ? "Enabled" : "Disabled"}</span>
            </span>

            <span className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${
              aiEnabled && aiChannel ? "bg-purple-500/10 border-purple-500/20 text-purple-400" : "bg-white/5 border-white/10 text-gray-400"
            }`}>
              <Bot className="w-3 h-3" />
              <span>AI Chatbot: {aiEnabled ? "Active" : "Disabled"}</span>
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-2 border-b border-white/5 pb-3 overflow-x-auto">
          {[
            { id: "moderation", label: "Moderation & Roles", icon: Shield },
            { id: "welcome", label: "Aesthetic Welcomer", icon: Bell },
            { id: "ai", label: "AI Chatbot Engine", icon: Bot },
            { id: "music", label: "Music & Audio DJ", icon: Music },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl font-medium text-xs tracking-wide transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-fuchsia-600/15 border border-fuchsia-500/40 text-fuchsia-400 shadow-sm"
                    : "bg-white/[0.02] border border-white/5 text-gray-400 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* ─── TAB 1: MODERATION & PERMISSIONS ─────────────────────────────── */}
        {activeTab === "moderation" && (
          <div className="space-y-6">
            {/* Moderator Roles Selector Card */}
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="space-y-1">
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-fuchsia-400" />
                  <span>Authorized Moderator Roles</span>
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed max-w-2xl">
                  Select which Discord roles have authority to execute moderation commands (<code className="text-fuchsia-300">/ban</code>, <code className="text-fuchsia-300">/kick</code>, <code className="text-fuchsia-300">/timeout</code>, <code className="text-fuchsia-300">/warn</code>, <code className="text-fuchsia-300">/purge</code>). Server Owners and members with Discord's Administrator permission automatically have full access.
                </p>
              </div>

              {/* Roles Chips Grid */}
              <div className="pt-2">
                <label className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-2 block">
                  Click to Toggle Roles ({modRoles.length} selected):
                </label>
                <div className="flex flex-wrap gap-2.5 max-h-64 overflow-y-auto pr-1">
                  {guild?.roles
                    ?.filter((r) => r.name !== "@everyone")
                    .map((role) => {
                      const isSelected = modRoles.includes(role.id);
                      const hexColor = role.color ? `#${role.color.toString(16).padStart(6, "0")}` : "#99aab5";
                      return (
                        <button
                          key={role.id}
                          onClick={() => toggleModRole(role.id)}
                          type="button"
                          className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-2 ${
                            isSelected
                              ? "bg-fuchsia-600/20 border-fuchsia-500 text-white shadow-md shadow-fuchsia-500/10"
                              : "bg-white/[0.02] border-white/10 text-gray-300 hover:border-white/25 hover:bg-white/[0.05]"
                          }`}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                            style={{ backgroundColor: hexColor }}
                          />
                          <span>{role.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-fuchsia-400 ml-1" />}
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* Mod Logs Channel Selector */}
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="space-y-1">
                <h3 className="font-bold text-base text-white">📜 Moderation Audit Logs Channel</h3>
                <p className="text-xs text-gray-400">
                  The private text channel where all moderator infractions, bans, kicks, and timeouts are formally logged.
                </p>
              </div>

              <select
                value={modLogChannel}
                onChange={(e) => setModLogChannel(e.target.value)}
                className="w-full max-w-md bg-[#070308] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-fuchsia-500/50 outline-none"
              >
                <option value="">Disabled / None</option>
                {guild?.channels?.text?.map((c) => (
                  <option key={c.id} value={c.id}>
                    #{c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* ─── TAB 2: AESTHETIC WELCOMER ───────────────────────────────────── */}
        {activeTab === "welcome" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-5">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <Bell className="w-4 h-4 text-fuchsia-400" />
                    <span>Automated Welcome System</span>
                  </h3>
                  <p className="text-xs text-gray-400">
                    Send an aesthetic welcome message whenever a new user joins your server.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={welcomeEnabled}
                  onChange={(e) => setWelcomeEnabled(e.target.checked)}
                  className="w-5 h-5 accent-fuchsia-500 cursor-pointer"
                />
              </div>

              {welcomeEnabled && (
                <div className="space-y-5 pt-3 border-t border-white/5">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5 block">
                      Welcome Channel
                    </label>
                    <select
                      value={welcomeChannel}
                      onChange={(e) => setWelcomeChannel(e.target.value)}
                      className="w-full max-w-md bg-[#070308] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-fuchsia-500/50 outline-none"
                    >
                      <option value="">Select a channel...</option>
                      {guild?.channels?.text?.map((c) => (
                        <option key={c.id} value={c.id}>
                          #{c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5 block">
                      Custom Welcome Message
                    </label>
                    <textarea
                      rows={3}
                      value={welcomeMessage}
                      onChange={(e) => setWelcomeMessage(e.target.value)}
                      className="w-full bg-[#070308] border border-white/15 rounded-xl p-3 text-sm text-white focus:border-fuchsia-500/50 outline-none"
                      placeholder="Welcome to {server}, {user}! 🎉"
                    />
                    <div className="flex items-center gap-2 mt-2 text-[11px] text-gray-500">
                      <span>Supported Variables:</span>
                      <code className="px-1.5 py-0.5 rounded bg-white/5 text-fuchsia-400">&#123;user&#125;</code>
                      <code className="px-1.5 py-0.5 rounded bg-white/5 text-fuchsia-400">&#123;server&#125;</code>
                      <code className="px-1.5 py-0.5 rounded bg-white/5 text-fuchsia-400">&#123;memberCount&#125;</code>
                    </div>
                  </div>

                  {/* Simulated Discord Preview */}
                  <div className="p-4 rounded-2xl bg-[#0e1015] border border-white/10 space-y-2">
                    <p className="text-[10px] uppercase font-mono tracking-wider text-gray-500">Live Discord Embed Preview</p>
                    <div className="border-l-4 border-fuchsia-500 pl-3 py-1 space-y-1">
                      <p className="text-xs font-bold text-white">👋 New Member Arrived!</p>
                      <p className="text-xs text-gray-300">
                        {welcomeMessage
                          .replace("{user}", `@NewMember`)
                          .replace("{server}", guild?.name || "Server")
                          .replace("{memberCount}", String((guild?.memberCount || 0) + 1))}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── TAB 3: AI CHATBOT ENGINE ────────────────────────────────────── */}
        {activeTab === "ai" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-5">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <Bot className="w-4 h-4 text-fuchsia-400" />
                    <span>Gemini AI Chatbot Engine</span>
                  </h3>
                  <p className="text-xs text-gray-400">
                    Allow members to freely chat and roleplay with VePlexity's AI inside designated channels.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={aiEnabled}
                  onChange={(e) => setAiEnabled(e.target.checked)}
                  className="w-5 h-5 accent-fuchsia-500 cursor-pointer"
                />
              </div>

              {aiEnabled && (
                <div className="space-y-5 pt-3 border-t border-white/5">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5 block">
                      Dedicated AI Text Channel
                    </label>
                    <select
                      value={aiChannel}
                      onChange={(e) => setAiChannel(e.target.value)}
                      className="w-full max-w-md bg-[#070308] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-fuchsia-500/50 outline-none"
                    >
                      <option value="">Select a channel...</option>
                      {guild?.channels?.text?.map((c) => (
                        <option key={c.id} value={c.id}>
                          #{c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 block">
                      AI Personality Preset
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: "standard", label: "Friendly & Helpful", desc: "Balanced, polite, and informative assistant." },
                        { id: "savage", label: "Savage & Roast", desc: "Witty, hilarious clapbacks and spicy roasts." },
                        { id: "anime", label: "Tsundere Anime", desc: "Feisty anime personality with reaction GIFs." },
                      ].map((mode) => (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() => setAiMode(mode.id)}
                          className={`p-4 rounded-2xl border text-left transition-all ${
                            aiMode === mode.id
                              ? "bg-fuchsia-600/20 border-fuchsia-500 shadow-md shadow-fuchsia-500/10"
                              : "bg-white/[0.02] border-white/10 hover:border-white/20"
                          }`}
                        >
                          <p className="font-bold text-sm text-white">{mode.label}</p>
                          <p className="text-xs text-gray-400 mt-1">{mode.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── TAB 4: MUSIC & AUDIO DJ ─────────────────────────────────────── */}
        {activeTab === "music" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-5">
              <div className="space-y-1">
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <Music className="w-4 h-4 text-fuchsia-400" />
                  <span>Music Playback & DJ Authority</span>
                </h3>
                <p className="text-xs text-gray-400">
                  Configure DJ permissions to prevent non-authorized members from skipping or stopping active songs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5 block">
                    Designated DJ Role
                  </label>
                  <select
                    value={djRole}
                    onChange={(e) => setDjRole(e.target.value)}
                    className="w-full bg-[#070308] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-fuchsia-500/50 outline-none"
                  >
                    <option value="">Everyone (No Role Required)</option>
                    {guild?.roles
                      ?.filter((r) => r.name !== "@everyone")
                      .map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5 block">
                    Default Volume Level ({defaultVolume}%)
                  </label>
                  <div className="flex items-center gap-3 bg-[#070308] border border-white/15 rounded-xl px-4 py-2.5">
                    <Volume2 className="w-4 h-4 text-gray-400" />
                    <input
                      type="range"
                      min="10"
                      max="150"
                      step="5"
                      value={defaultVolume}
                      onChange={(e) => setDefaultVolume(Number(e.target.value))}
                      className="w-full accent-fuchsia-500 cursor-pointer"
                    />
                    <span className="text-xs font-mono text-gray-300 w-12 text-right">{defaultVolume}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
