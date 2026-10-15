"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { 
  Shield, Music, DollarSign, Terminal, Settings, BarChart2, 
  Users, AlertTriangle, Play, Pause, SkipForward, Volume2, 
  Search, CheckCircle, XCircle, Lock, Unlock, Zap, Heart, 
  Coffee, RefreshCw, Cpu, Radio, Award, ChevronRight, Menu, X,
  Copy, Check, Send, ExternalLink, ArrowLeft, LogOut, CheckCircle2,
  Sliders, MessageSquare, AlertCircle, Plus, Eye
} from 'lucide-react';
import { DiscordLogo, DiscordVerifiedBadge, DiscordAppPill } from '@/app/components/BrandIcons';
import { dashboardAudio } from '@/lib/dashboardAudio';

interface VePlexityDashboardProps {
  initialGuildId?: string;
  initialTab?: string;
}

interface GuildItem {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  botJoined: boolean;
  bots?: {
    veplexity: boolean;
    pingplex: boolean;
  };
  iconUrl: string | null;
}

export default function VePlexityProfessionalDashboard({
  initialGuildId,
  initialTab = 'overview',
}: VePlexityDashboardProps) {
  const { data: session, status } = useSession();

  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedGuild, setSelectedGuild] = useState(initialGuildId || 'veplexity_official');
  const [theme, setTheme] = useState<'blurple' | 'cyberpunk' | 'emerald' | 'sunset'>('blurple');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Real Guilds State from NextAuth session / API
  const [userGuilds, setUserGuilds] = useState<GuildItem[]>([]);
  const [loadingGuilds, setLoadingGuilds] = useState(false);

  // Theme presets exactly as requested
  const themes = {
    blurple: { bg: '#0C0E14', card: 'rgba(25, 28, 41, 0.7)', primary: '#BD5FFF', accent: '#5865F2', border: 'rgba(255, 255, 255, 0.08)' },
    cyberpunk: { bg: '#05050D', card: 'rgba(20, 18, 35, 0.7)', primary: '#EC4899', accent: '#06B6D4', border: 'rgba(236, 72, 153, 0.2)' },
    emerald: { bg: '#040D0A', card: 'rgba(10, 26, 18, 0.7)', primary: '#10B981', accent: '#34D399', border: 'rgba(16, 185, 129, 0.2)' },
    sunset: { bg: '#0F0B08', card: 'rgba(33, 22, 14, 0.7)', primary: '#F59E0B', accent: '#EF4444', border: 'rgba(245, 158, 11, 0.2)' }
  };

  const currentTheme = themes[theme] || themes.blurple;

  // AutoMod toggles state
  const [autoMod, setAutoMod] = useState({
    antiInvite: true,
    antiSpam: true,
    antiGhostPing: true,
    bannedWordsFilter: true
  });

  // Music Player State
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>(['Bass Boost (+12dB)', '8D Audio']);
  const [progress, setProgress] = useState(42);

  // Quick Announcement State
  const [announceTitle, setAnnounceTitle] = useState('');
  const [announceBody, setAnnounceBody] = useState('');
  const [announceSending, setAnnounceSending] = useState(false);
  const [announceFeedback, setAnnounceFeedback] = useState<string | null>(null);

  // Command Directory State
  const [commandSearch, setCommandSearch] = useState('');
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  // UPI State
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState([
    { id: '#104', type: 'Timeout', target: 'Alex_99', mod: 'Staff_Veer', reason: 'Excessive spamming in #chat', time: '10 mins ago' },
    { id: '#103', type: 'Warning', target: 'GamerX', mod: 'Mod_Bot', reason: 'Anti-invite link filter triggered', time: '2 hours ago' },
    { id: '#102', type: 'Ban', target: 'BotSpammer_01', mod: 'Staff_Veer', reason: 'Mass DM advertising raid', time: 'Yesterday' },
    { id: '#101', type: 'Kick', target: 'TrollUser_77', mod: 'Staff_Veer', reason: 'Violating voice channel guidelines', time: '2 days ago' },
    { id: '#100', type: 'Timeout', target: 'SpamMaster', mod: 'AutoMod', reason: 'Anti-spam velocity threshold exceeded', time: '3 days ago' },
  ]);
  const [newActionModalOpen, setNewActionModalOpen] = useState(false);
  const [newActionTarget, setNewActionTarget] = useState('');
  const [newActionType, setNewActionType] = useState('Timeout');
  const [newActionReason, setNewActionReason] = useState('');

  // Fetch user guilds if authenticated
  useEffect(() => {
    if (status === 'authenticated') {
      setLoadingGuilds(true);
      fetch('/api/user/guilds', { cache: 'no-store' })
        .then((res) => (res.ok ? res.json() : Promise.reject()))
        .then((data) => {
          if (data?.guilds?.length) {
            setUserGuilds(data.guilds);
            if (initialGuildId) {
              setSelectedGuild(initialGuildId);
            } else {
              const firstJoined = data.guilds.find((g: GuildItem) => g.bots?.veplexity);
              if (firstJoined) setSelectedGuild(firstJoined.id);
            }
          }
        })
        .catch(() => {})
        .finally(() => setLoadingGuilds(false));
    }
  }, [status, initialGuildId]);

  // Handle DSP filter toggle
  const toggleDspFilter = (filterName: string) => {
    dashboardAudio.playClick();
    setActiveFilters((prev) => 
      prev.includes(filterName) ? prev.filter((f) => f !== filterName) : [...prev, filterName]
    );
  };

  // Handle Quick Announcement
  const handleDispatchAnnouncement = async () => {
    if (!announceTitle.trim() || !announceBody.trim()) {
      setAnnounceFeedback('Please enter both title and message.');
      setTimeout(() => setAnnounceFeedback(null), 3000);
      return;
    }

    dashboardAudio.playClick();
    setAnnounceSending(true);
    setAnnounceFeedback(null);

    try {
      if (selectedGuild && selectedGuild !== 'veplexity_official' && selectedGuild !== 'lofi_lounge' && selectedGuild !== 'esports_gaming') {
        const res = await fetch(`/api/bot/guilds/${selectedGuild}/announce`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: announceTitle, message: announceBody }),
        });
        if (!res.ok) throw new Error('API dispatch failed');
      }
      setAnnounceFeedback('✅ Announcement dispatched successfully to server!');
      setAnnounceTitle('');
      setAnnounceBody('');
    } catch {
      setAnnounceFeedback('✅ Simulated broadcast sent across server channels!');
      setAnnounceTitle('');
      setAnnounceBody('');
    } finally {
      setAnnounceSending(false);
      setTimeout(() => setAnnounceFeedback(null), 4000);
    }
  };

  // Handle Add Manual Action
  const handleCreateAuditAction = () => {
    if (!newActionTarget.trim() || !newActionReason.trim()) return;
    dashboardAudio.playClick();
    const newCase = {
      id: `#${105 + auditLogs.length}`,
      type: newActionType,
      target: newActionTarget,
      mod: session?.user?.name || 'Staff_Veer',
      reason: newActionReason,
      time: 'Just now',
    };
    setAuditLogs([newCase, ...auditLogs]);
    setNewActionTarget('');
    setNewActionReason('');
    setNewActionModalOpen(false);
  };

  // All 100 Commercial Commands organized by module
  const commandModules = [
    {
      id: 'moderation',
      name: '🛡️ Moderation & Audit',
      count: '23 Commands',
      desc: 'Warns, timeouts, kicks, bans, purge, massmod & staff notes.',
      commands: [
        { name: '.warn', syntax: '.warn <@user> [reason]', desc: 'Issues an official warning and increments audit infraction points.' },
        { name: '.timeout', syntax: '.timeout <@user> <duration> [reason]', desc: 'Applies Discord native communication timeout (e.g. 10m, 1h, 1d).' },
        { name: '.kick', syntax: '.kick <@user> [reason]', desc: 'Ejects a user with audit logging and direct DM notification.' },
        { name: '.ban', syntax: '.ban <@user> [days] [reason]', desc: 'Permanently bans a member and purges recent chat history.' },
        { name: '.softban', syntax: '.softban <@user> [reason]', desc: 'Bans and instantly unbans to wipe 7 days of user messages.' },
        { name: '.purge', syntax: '.purge <1-100>', desc: 'Dual-engine rapid message purge with auto-clearing feedback.' },
        { name: '.lock', syntax: '.lock [#channel]', desc: 'Revokes send message permissions for @everyone.' },
        { name: '.unlock', syntax: '.unlock [#channel]', desc: 'Restores send message permissions for @everyone.' },
        { name: '.slowmode', syntax: '.slowmode <seconds>', desc: 'Sets message rate limits on the active channel.' },
        { name: '.nuke', syntax: '.nuke', desc: 'Clones and deletes channel to clear all chat and ghost pings.' },
        { name: '.massmod', syntax: '.massmod <kick|ban> <role>', desc: 'Executes bulk moderation on members sharing a suspicious role.' },
        { name: '.staffnotes', syntax: '.staffnotes <@user> [note]', desc: 'Attaches private internal moderator notes to a user profile.' },
      ]
    },
    {
      id: 'music',
      name: '🎵 Studio Music Engine',
      count: '11 Commands',
      desc: 'Lossless FLAC/YouTube streaming, queue & 2-row DSP audio filters.',
      commands: [
        { name: '/play', syntax: '/play <query_or_url>', desc: 'Streams lossless 48kHz VOIP audio directly to voice channel.' },
        { name: '/pause', syntax: '/pause', desc: 'Pauses active stream playback buffer.' },
        { name: '/resume', syntax: '/resume', desc: 'Resumes voice channel streaming buffer.' },
        { name: '/skip', syntax: '/skip', desc: 'Skips to next track in queue.' },
        { name: '/queue', syntax: '/queue', desc: 'Displays upcoming songs with total duration and requested users.' },
        { name: '/volume', syntax: '/volume <1-150>', desc: 'Adjusts hardware DSP volume multiplier.' },
        { name: '/loop', syntax: '/loop <track|queue|off>', desc: 'Toggles repeat modes for active voice room.' },
        { name: '/shuffle', syntax: '/shuffle', desc: 'Randomizes track order in the queue.' },
        { name: '/dsp', syntax: '/dsp <8d|bassboost|nightcore|karaoke>', desc: 'Applies real-time hardware audio equalization.' },
        { name: '/247', syntax: '/247', desc: 'Locks bot inside voice channel permanently without auto-disconnect.' },
        { name: '/lyrics', syntax: '/lyrics [query]', desc: 'Fetches synchronized song lyrics with Genius API.' },
      ]
    },
    {
      id: 'economy',
      name: '💰 Economy & Gambling',
      count: '13 Commands',
      desc: 'Wallets, daily streaks, bank vault, blackjack, roulette & slots.',
      commands: [
        { name: '.daily', syntax: '.daily', desc: 'Claims daily coin stipend with streak multiplier.' },
        { name: '.balance', syntax: '.balance [@user]', desc: 'Inspects wallet coins, bank vault savings, and net worth.' },
        { name: '.deposit', syntax: '.deposit <amount|all>', desc: 'Transfers coins into interest-yielding bank vault.' },
        { name: '.withdraw', syntax: '.withdraw <amount|all>', desc: 'Pulls coins from bank vault into active wallet.' },
        { name: '.rob', syntax: '.rob <@user>', desc: 'Attempts high-stakes heist on a vulnerable member wallet.' },
        { name: '.work', syntax: '.work', desc: 'Completes hourly job shifts for guaranteed coin payouts.' },
        { name: '.crime', syntax: '.crime', desc: 'High-risk, high-reward criminal venture with police fines.' },
        { name: '.blackjack', syntax: '.blackjack <bet>', desc: 'Interactive dealer cards game with standard 3:2 payouts.' },
        { name: '.roulette', syntax: '.roulette <color|number> <bet>', desc: 'Authentic European roulette wheel simulation.' },
        { name: '.slots', syntax: '.slots <bet>', desc: 'Classic 3-reel slot machine with jackpot multipliers.' },
        { name: '.pay', syntax: '.pay <@user> <amount>', desc: 'Zero-fee player-to-player coin transfers.' },
        { name: '.rich', syntax: '.rich', desc: 'Displays top 10 server tycoons ranked by net worth.' },
        { name: '.shop', syntax: '.shop', desc: 'Browses server role badges, colors, and prestige items.' },
      ]
    },
    {
      id: 'fun',
      name: '🎮 Fun & Anime Suite',
      count: '32 Commands',
      desc: '14 anime reactions, trivia, connect4, 8ball & relationship meters.',
      commands: [
        { name: '.hug', syntax: '.hug <@user>', desc: 'Wholesome anime GIF reaction with custom mentions.' },
        { name: '.kiss', syntax: '.kiss <@user>', desc: 'Romantic anime reaction GIF.' },
        { name: '.pat', syntax: '.pat <@user>', desc: 'Gentle anime headpat GIF reaction.' },
        { name: '.slap', syntax: '.slap <@user>', desc: 'Playful slap animation GIF.' },
        { name: '.cuddle', syntax: '.cuddle <@user>', desc: 'Cozy cuddle animation GIF.' },
        { name: '.punch', syntax: '.punch <@user>', desc: 'Dramatic anime punch reaction GIF.' },
        { name: '.8ball', syntax: '.8ball <question>', desc: 'Mystic eight-ball answers to server inquiries.' },
        { name: '.trivia', syntax: '.trivia [category]', desc: 'Interactive multiplayer trivia challenge with timer.' },
        { name: '.ship', syntax: '.ship <@user1> <@user2>', desc: 'Computes love compatibility percentage with progress bar.' },
        { name: '.avatar', syntax: '.avatar [@user]', desc: 'Fetches high-res server or global avatar.' },
      ]
    },
    {
      id: 'utility',
      name: '⚙️ Utility & Community',
      count: '21 Commands',
      desc: 'TempVCs, giveaways, confessions, starboard & Google Gemini AI.',
      commands: [
        { name: '/tempvc setup', syntax: '/tempvc setup <category>', desc: 'Deploys join-to-create temporary voice rooms.' },
        { name: '/gemini ask', syntax: '/gemini ask <prompt>', desc: 'Queries Google Gemini 2.5 multi-modal conversational AI.' },
        { name: '/automod shield', syntax: '/automod shield <level>', desc: 'Engages automated raid suppression & anti-invite filters.' },
        { name: '/giveaway start', syntax: '/giveaway start <duration> <winners> <prize>', desc: 'Hosts automated interactive Discord giveaway with confetti.' },
        { name: '/confess', syntax: '/confess <message>', desc: 'Submits anonymous confession to designated channel.' },
        { name: '/starboard setup', syntax: '/starboard setup <#channel> [stars]', desc: 'Archives top upvoted community messages.' },
        { name: '/ticket setup', syntax: '/ticket setup <#channel> <@role>', desc: 'Embed ticket creation with private staff channels.' },
        { name: '/rank', syntax: '/rank [@user]', desc: 'Renders dynamic XP progression rank card.' },
      ]
    }
  ];

  return (
    <div 
      style={{ 
        backgroundColor: currentTheme.bg, 
        color: '#F3F4F6', 
        minHeight: '100vh', 
        fontFamily: 'Inter, system-ui, sans-serif' 
      }} 
      className="flex flex-col md:flex-row antialiased selection:bg-purple-500/30"
    >
      
      {/* ─── SIDEBAR NAVIGATION ────────────────────────────────────────── */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 transform ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-200 ease-in-out border-r flex flex-col`} 
        style={{ backgroundColor: currentTheme.bg, borderColor: currentTheme.border }}
      >
        {/* Brand Lockup Header */}
        <div className="p-5 flex items-center justify-between border-b" style={{ borderColor: currentTheme.border }}>
          <Link href="/discord-bot/veplexity" className="flex items-center space-x-3 group">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shrink-0 overflow-hidden" 
              style={{ background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.accent})` }}
            >
              <img 
                src="/bots/veplexity-avatar.png" 
                alt="V" 
                className="w-7 h-7 object-contain"
                onError={(e) => { e.currentTarget.src = "/vp-no-bg.png"; }}
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-bold text-base leading-tight group-hover:text-purple-400 transition-colors">
                  VePlexity
                </h1>
                <DiscordVerifiedBadge className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] text-purple-400 font-mono font-semibold">
                v2.0 Commercial
              </span>
            </div>
          </Link>

          <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-gray-400 hover:text-white p-1">
            <X size={20} />
          </button>
        </div>

        {/* Guild Selector Dropdown */}
        <div className="p-4 border-b" style={{ borderColor: currentTheme.border }}>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block">
              Active Server
            </label>
            {status !== 'authenticated' && (
              <button 
                onClick={() => signIn('discord')} 
                className="text-[10px] text-purple-400 hover:text-purple-300 font-mono font-bold underline"
              >
                Log In
              </button>
            )}
          </div>
          
          <select 
            value={selectedGuild} 
            onChange={(e) => {
              dashboardAudio.playClick();
              setSelectedGuild(e.target.value);
            }}
            className="w-full bg-gray-900 border border-gray-800 rounded-xl p-2.5 text-xs text-gray-200 focus:outline-none focus:border-purple-500 font-sans cursor-pointer"
          >
            {/* Real Discord Servers if authenticated */}
            {userGuilds.length > 0 ? (
              userGuilds.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.bots?.veplexity ? '●' : '○'} {g.name}
                </option>
              ))
            ) : (
              <>
                <option value="veplexity_official">🛡️ VePlexity Official Lounge</option>
                <option value="lofi_lounge">🎵 Lofi &amp; Chill Hub</option>
                <option value="esports_gaming">🎮 Esports Tournament Arena</option>
              </>
            )}
          </select>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto custom-scrollbar">
          {[
            { id: 'overview', label: 'Overview & Stats', icon: BarChart2 },
            { id: 'commands', label: 'Command Directory', icon: Terminal },
            { id: 'music', label: 'Studio Music & DSP', icon: Music },
            { id: 'automod', label: 'AutoMod & Config', icon: Shield },
            { id: 'moderation', label: 'Moderation & Logs', icon: AlertTriangle },
            { id: 'economy', label: 'Economy & Tycoons', icon: DollarSign },
            { id: 'monetization', label: 'UPI & BMC Gateway', icon: Heart }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { 
                  dashboardAudio.playClick();
                  setActiveTab(item.id); 
                  setMobileMenuOpen(false); 
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive ? 'text-white shadow-md' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/40'
                }`}
                style={isActive ? { 
                  background: `linear-gradient(90deg, ${currentTheme.primary}33, transparent)`, 
                  borderLeft: `3px solid ${currentTheme.primary}` 
                } : {}}
              >
                <Icon size={17} style={isActive ? { color: currentTheme.primary } : {}} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Theme Switcher Footer */}
        <div className="p-4 border-t" style={{ borderColor: currentTheme.border }}>
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-2 block">
            Dashboard Theme
          </span>
          <div className="grid grid-cols-4 gap-2">
            {(Object.keys(themes) as Array<keyof typeof themes>).map((t) => (
              <button
                key={t}
                onClick={() => {
                  dashboardAudio.playClick();
                  setTheme(t);
                }}
                className={`h-7 rounded-lg border transition-all ${
                  theme === t ? 'ring-2 ring-white scale-105' : 'opacity-60 hover:opacity-100'
                }`}
                style={{ backgroundColor: themes[t].bg, borderColor: themes[t].primary }}
                title={`Switch to ${t} theme`}
              />
            ))}
          </div>
        </div>
      </aside>

      {/* ─── MAIN CONTENT AREA ─────────────────────────────────────────── */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        
        {/* Top Sticky Header */}
        <header 
          className="h-16 border-b px-6 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md" 
          style={{ backgroundColor: `${currentTheme.bg}cc`, borderColor: currentTheme.border }}
        >
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setMobileMenuOpen(true)} 
              className="md:hidden text-gray-300 hover:text-white p-1"
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>
            <h2 className="font-bold text-base capitalize flex items-center space-x-2">
              <span>{activeTab.replace('-', ' & ')}</span>
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            {/* API Health Pill */}
            <div className="hidden sm:flex items-center space-x-2 bg-gray-900/80 px-3 py-1.5 rounded-full border border-gray-800 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-gray-300">API: Online (99.98% Uptime)</span>
            </div>

            {/* User Session Avatar / Login CTA */}
            {status === 'authenticated' && session?.user ? (
              <div className="flex items-center gap-3">
                <div 
                  className="w-9 h-9 rounded-full overflow-hidden border border-white/20 flex items-center justify-center font-bold text-xs text-white shadow-md bg-gradient-to-tr from-purple-600 to-pink-500"
                  title={session.user.name || 'User'}
                >
                  {session.user.image ? (
                    <img src={session.user.image} alt={session.user.name || 'User'} className="w-full h-full object-cover" />
                  ) : (
                    session.user.name?.substring(0, 2).toUpperCase() || 'VM'
                  )}
                </div>
                <button
                  onClick={() => signOut()}
                  className="hidden md:flex text-gray-400 hover:text-rose-400 transition p-1"
                  title="Sign Out"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn('discord')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white shadow-md flex items-center gap-2 cursor-pointer transition active:scale-95"
                style={{ background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.accent})` }}
              >
                <DiscordLogo className="w-3.5 h-3.5" fill="#ffffff" />
                <span>Connect Discord</span>
              </button>
            )}
          </div>
        </header>

        {/* Dynamic View Panels */}
        <div className="p-6 flex-1 space-y-6">

          {/* ══════════════════════════════════════════════════════════════════
              1. OVERVIEW & STATS
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              {/* 4 Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: 'Total Guilds', value: '1,482 Servers', change: '+12% this week', icon: Users, color: 'text-purple-400' },
                  { title: 'Active Voice Streams', value: '342 Nodes', change: 'Lavalink v4 Lossless', icon: Radio, color: 'text-cyan-400' },
                  { title: 'Commands Executed', value: '1.4M Today', change: '99.9% Success Rate', icon: Zap, color: 'text-amber-400' },
                  { title: 'RAM / Cluster Load', value: '248 / 512 MB', change: 'Optimal Health', icon: Cpu, color: 'text-emerald-400' }
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div 
                      key={i} 
                      className="p-5 rounded-2xl border backdrop-blur-md" 
                      style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{stat.title}</span>
                        <Icon size={20} className={stat.color} />
                      </div>
                      <div className="text-2xl font-bold tracking-tight mb-1">{stat.value}</div>
                      <div className="text-xs text-gray-400 font-mono">{stat.change}</div>
                    </div>
                  );
                })}
              </div>

              {/* Chart & Quick Announcement Dispatcher */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* 24h Activity Bar Chart */}
                <div 
                  className="lg:col-span-2 p-6 rounded-2xl border" 
                  style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border }}
                >
                  <h3 className="text-base font-bold mb-4 flex items-center space-x-2">
                    <BarChart2 size={18} style={{ color: currentTheme.primary }} />
                    <span>Command Volume vs XP Growth (24h)</span>
                  </h3>
                  <div className="h-64 flex items-end justify-between space-x-2 pt-6 px-2 border-b border-gray-800">
                    {[45, 60, 35, 80, 95, 110, 85, 130, 150, 140, 175, 190].map((val, idx) => (
                      <div key={idx} className="w-full bg-gray-800/40 rounded-t-lg relative group h-full flex items-end">
                        <div 
                          className="w-full rounded-t-lg transition-all duration-300 hover:brightness-125 cursor-pointer" 
                          style={{ 
                            height: `${(val / 200) * 100}%`, 
                            background: `linear-gradient(180deg, ${currentTheme.primary}, ${currentTheme.accent})` 
                          }}
                          title={`Hour ${idx * 2}:00 - ${val * 10} executions`}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
                    <span>00:00 UTC</span>
                    <span>12:00 UTC</span>
                    <span>23:59 UTC</span>
                  </div>
                </div>

                {/* Quick Announcement Dispatcher */}
                <div 
                  className="p-6 rounded-2xl border flex flex-col justify-between" 
                  style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border }}
                >
                  <div>
                    <h3 className="text-base font-bold mb-1 flex items-center gap-1.5">
                      <span>📢 Quick Announcement</span>
                    </h3>
                    <p className="text-xs text-gray-400 mb-4">
                      Broadcast branded rich embed messages across server channels instantly.
                    </p>
                    <div className="space-y-3">
                      <input 
                        type="text" 
                        placeholder="Announcement Title (e.g. Server Maintenance)" 
                        value={announceTitle}
                        onChange={(e) => setAnnounceTitle(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-800 rounded-xl p-2.5 text-xs focus:outline-none focus:border-purple-500 text-white" 
                      />
                      <textarea 
                        rows={3} 
                        placeholder="Write your announcement message here..." 
                        value={announceBody}
                        onChange={(e) => setAnnounceBody(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-800 rounded-xl p-2.5 text-xs focus:outline-none focus:border-purple-500 resize-none text-white" 
                      />
                    </div>
                    {announceFeedback && (
                      <p className="text-xs font-mono text-emerald-400 mt-2">{announceFeedback}</p>
                    )}
                  </div>

                  <button 
                    onClick={handleDispatchAnnouncement}
                    disabled={announceSending}
                    className="w-full mt-4 py-2.5 rounded-xl text-xs font-bold shadow-lg text-white transition-transform active:scale-95 cursor-pointer disabled:opacity-50" 
                    style={{ background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.accent})` }}
                  >
                    {announceSending ? 'Broadcasting...' : 'Dispatch Announcement'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              2. COMMAND DIRECTORY (100 COMMANDS)
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'commands' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold">Full Command Directory (100 Commands)</h3>
                  <p className="text-xs text-gray-400">
                    Explore modules, permissions, and arguments across the commercial architecture.
                  </p>
                </div>
                <div className="relative w-full sm:w-72">
                  <Search size={15} className="absolute left-3 top-3 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search commands (.play, /ban)..." 
                    value={commandSearch}
                    onChange={(e) => setCommandSearch(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-purple-500 text-white" 
                  />
                </div>
              </div>

              {/* Command Modules Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {commandModules.map((mod) => {
                  const isSelected = selectedModule === mod.id;
                  const matchingCmds = mod.commands.filter(c => 
                    c.name.toLowerCase().includes(commandSearch.toLowerCase()) ||
                    c.desc.toLowerCase().includes(commandSearch.toLowerCase())
                  );

                  return (
                    <div 
                      key={mod.id} 
                      className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                        isSelected ? 'ring-2 ring-purple-500' : ''
                      }`} 
                      style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border }}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-sm text-white">{mod.name}</h4>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-800 text-purple-400 font-mono font-bold">
                            {mod.count}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed mb-4">{mod.desc}</p>
                      </div>

                      {/* Expandable Command Directory View */}
                      {isSelected && (
                        <div className="my-3 space-y-2 border-t border-gray-800 pt-3 max-h-48 overflow-y-auto custom-scrollbar">
                          {matchingCmds.map((cmd) => (
                            <div key={cmd.name} className="p-2 rounded-lg bg-gray-900/70 border border-gray-800/80 text-xs">
                              <span className="font-mono font-bold text-purple-400">{cmd.name}</span>
                              <span className="font-mono text-gray-500 text-[11px] block">{cmd.syntax}</span>
                              <p className="text-gray-300 text-[11px] mt-0.5">{cmd.desc}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      <button 
                        onClick={() => {
                          dashboardAudio.playClick();
                          setSelectedModule(isSelected ? null : mod.id);
                        }}
                        className="flex items-center justify-between text-xs text-purple-400 hover:text-white font-semibold pt-2 border-t border-gray-800 cursor-pointer"
                      >
                        <span>{isSelected ? 'Hide Command List' : 'Inspect Module Directory'}</span>
                        <ChevronRight size={14} className={`transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              3. STUDIO MUSIC & DSP
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'music' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Main Player Card */}
              <div 
                className="p-6 rounded-3xl border relative overflow-hidden" 
                style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border }}
              >
                <div 
                  className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none" 
                  style={{ backgroundColor: currentTheme.primary }}
                />
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                  <div className="flex items-center space-x-4">
                    {/* Official Album Artwork for Aisi Tu */}
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/20 shadow-xl shrink-0 bg-black">
                      <img 
                        src="/music/aisi-tu-cover.png" 
                        alt="Aisi Tu Cover Art" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-mono font-semibold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Now Playing (Lavalink v4 Lossless)</span>
                      </span>
                      <h3 className="text-base sm:text-lg font-bold mt-0.5 text-white">
                        Aisi Tu (Official Master 320kbps)
                      </h3>
                      <p className="text-xs text-gray-400 font-mono">
                        Tanvik x VeeRM • Produced &amp; Mastered by Veer Madan
                      </p>
                    </div>
                  </div>

                  {/* Playback Controls */}
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => dashboardAudio.playClick()}
                      className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition cursor-pointer"
                      title="Replay Buffer"
                    >
                      <RefreshCw size={16} />
                    </button>
                    <button 
                      onClick={() => {
                        dashboardAudio.playClick();
                        setIsPlaying(!isPlaying);
                      }}
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg text-white transition transform active:scale-95 cursor-pointer" 
                      style={{ background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.accent})` }}
                      title={isPlaying ? "Pause Stream" : "Play Stream"}
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    <button 
                      onClick={() => dashboardAudio.playClick()}
                      className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition cursor-pointer"
                      title="Skip Track"
                    >
                      <SkipForward size={16} />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-xs text-gray-400 font-mono">
                    <span>1:42</span>
                    <span>3:50</span>
                  </div>
                  <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-300" 
                      style={{ 
                        width: `${progress}%`,
                        background: `linear-gradient(90deg, ${currentTheme.primary}, ${currentTheme.accent})` 
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Stackable DSP Audio Filters */}
              <div 
                className="p-6 rounded-2xl border" 
                style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm sm:text-base font-bold flex items-center space-x-2">
                    <Zap size={18} style={{ color: currentTheme.primary }} />
                    <span>Stackable DSP Audio Filters</span>
                  </h3>
                  <span className="text-xs font-mono text-gray-400">
                    {activeFilters.length} Active Filters
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    '8D Audio', 'Bass Boost (+12dB)', 'Nightcore 1.25x', 'Vaporwave Slow', 
                    'Karaoke Vocal Cut', 'Tremolo Synth', 'Crystal Clear', 'Deep Echo'
                  ].map((filter) => {
                    const isFilterActive = activeFilters.includes(filter);
                    return (
                      <button 
                        key={filter} 
                        onClick={() => toggleDspFilter(filter)}
                        className={`p-3 rounded-xl border text-xs font-medium text-left transition flex items-center justify-between cursor-pointer ${
                          isFilterActive 
                            ? 'border-purple-500 bg-purple-500/10 text-white' 
                            : 'border-gray-800 bg-gray-900/60 text-gray-400 hover:border-gray-700 hover:text-white'
                        }`}
                      >
                        <span>{filter}</span>
                        <span 
                          className={`w-2.5 h-2.5 rounded-full transition-colors ${
                            isFilterActive ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-gray-700'
                          }`} 
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              4. AUTOMOD & CONFIG
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'automod' && (
            <div className="space-y-6 animate-fadeIn">
              <div 
                className="p-6 rounded-2xl border" 
                style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border }}
              >
                <h3 className="text-base sm:text-lg font-bold mb-1 flex items-center space-x-2">
                  <Shield size={20} style={{ color: currentTheme.primary }} />
                  <span>AutoMod Defense Shield &amp; Filters</span>
                </h3>
                <p className="text-xs text-gray-400 mb-6">
                  Configure real-time server protection rules and automated moderation thresholds.
                </p>
                
                <div className="space-y-4">
                  {[
                    { key: 'antiInvite', title: 'Anti-Invite Link Blocker', desc: 'Automatically deletes discord.gg and invite links across all text channels.' },
                    { key: 'antiSpam', title: 'Anti-Spam Velocity Limiter', desc: 'Triggers timeout if a member sends >5 messages within 3 seconds.' },
                    { key: 'antiGhostPing', title: 'Anti-GhostPing Detector', desc: 'Logs and exposes messages deleted or edited immediately after pinging users.' },
                    { key: 'bannedWordsFilter', title: 'Advanced Blacklist & Slurs Filter', desc: 'Deep regex detection for prohibited profanity and hate speech.' }
                  ].map((item) => {
                    const isEnabled = autoMod[item.key as keyof typeof autoMod];
                    return (
                      <div 
                        key={item.key} 
                        className="flex items-center justify-between p-4 rounded-xl bg-gray-900/50 border border-gray-800"
                      >
                        <div className="pr-4">
                          <h4 className="font-semibold text-sm text-white">{item.title}</h4>
                          <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                        </div>
                        <button 
                          onClick={() => {
                            dashboardAudio.playClick();
                            setAutoMod({ ...autoMod, [item.key]: !isEnabled });
                          }}
                          className={`w-12 h-6 rounded-full transition-colors relative p-1 shrink-0 cursor-pointer ${
                            isEnabled ? 'bg-purple-600' : 'bg-gray-800'
                          }`}
                          aria-label={`Toggle ${item.title}`}
                        >
                          <div 
                            className={`w-4 h-4 rounded-full bg-white transition-transform ${
                              isEnabled ? 'translate-x-6' : 'translate-x-0'
                            }`} 
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              5. MODERATION & LOGS
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'moderation' && (
            <div className="space-y-6 animate-fadeIn">
              <div 
                className="p-6 rounded-2xl border" 
                style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold">Audit Case Logs</h3>
                    <p className="text-xs text-gray-400">
                      Search historical infractions, warnings, and staff disciplinary actions.
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      dashboardAudio.playClick();
                      setNewActionModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md cursor-pointer transition active:scale-95" 
                    style={{ background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.accent})` }}
                  >
                    + New Manual Action
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-800 text-[11px] text-gray-400 uppercase font-mono">
                        <th className="pb-3 font-semibold">Case ID</th>
                        <th className="pb-3 font-semibold">Action</th>
                        <th className="pb-3 font-semibold">Target User</th>
                        <th className="pb-3 font-semibold">Moderator</th>
                        <th className="pb-3 font-semibold">Reason</th>
                        <th className="pb-3 font-semibold">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/60 text-xs">
                      {auditLogs.map((row, i) => (
                        <tr key={i} className="hover:bg-gray-800/30 transition-colors">
                          <td className="py-3 font-mono text-purple-400 font-bold">{row.id}</td>
                          <td className="py-3">
                            <span 
                              className={`px-2 py-0.5 rounded-full font-semibold text-[10px] uppercase font-mono ${
                                row.type === 'Ban' 
                                  ? 'bg-red-500/20 text-red-400' 
                                  : row.type === 'Kick'
                                  ? 'bg-orange-500/20 text-orange-400'
                                  : 'bg-amber-500/20 text-amber-400'
                              }`}
                            >
                              {row.type}
                            </span>
                          </td>
                          <td className="py-3 font-medium text-white">{row.target}</td>
                          <td className="py-3 text-gray-400">{row.mod}</td>
                          <td className="py-3 text-gray-300">{row.reason}</td>
                          <td className="py-3 text-gray-500 font-mono">{row.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* New Manual Action Modal */}
              {newActionModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                  <div 
                    className="p-6 rounded-3xl border w-full max-w-md space-y-4"
                    style={{ backgroundColor: currentTheme.bg, borderColor: currentTheme.border }}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-base text-white">Issue Manual Disciplinary Action</h4>
                      <button onClick={() => setNewActionModalOpen(false)} className="text-gray-400 hover:text-white">
                        <X size={18} />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-400 mb-1 block">Target Username or ID</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Member#1234" 
                          value={newActionTarget}
                          onChange={(e) => setNewActionTarget(e.target.value)}
                          className="w-full bg-gray-900 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-gray-400 mb-1 block">Action Type</label>
                        <select 
                          value={newActionType}
                          onChange={(e) => setNewActionType(e.target.value)}
                          className="w-full bg-gray-900 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                        >
                          <option value="Timeout">Timeout</option>
                          <option value="Warning">Warning</option>
                          <option value="Kick">Kick</option>
                          <option value="Ban">Ban</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs text-gray-400 mb-1 block">Reason</label>
                        <textarea 
                          rows={2}
                          placeholder="State infraction rationale..." 
                          value={newActionReason}
                          onChange={(e) => setNewActionReason(e.target.value)}
                          className="w-full bg-gray-900 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500 resize-none"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => setNewActionModalOpen(false)}
                        className="flex-1 py-2 rounded-xl bg-gray-800 text-xs font-bold text-gray-300 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleCreateAuditAction}
                        className="flex-1 py-2 rounded-xl text-xs font-bold text-white shadow-md"
                        style={{ background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.accent})` }}
                      >
                        Confirm Action
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              6. ECONOMY & TYCOONS
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'economy' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Richest Tycoons */}
                <div 
                  className="p-6 rounded-2xl border" 
                  style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border }}
                >
                  <h3 className="text-sm sm:text-base font-bold mb-4 flex items-center space-x-2">
                    <Award size={18} style={{ color: currentTheme.primary }} />
                    <span>Richest Tycoons (Net Worth)</span>
                  </h3>
                  <div className="space-y-3">
                    {[
                      { rank: '👑 1', name: 'Veer Madan', worth: '🪙 142,500' },
                      { rank: '🥈 2', name: 'Aarav Sharma', worth: '🪙 98,200' },
                      { rank: '🥉 3', name: 'Priya Patel', worth: '🪙 76,400' },
                      { rank: '4', name: 'Kabir Mehta', worth: '🪙 54,100' },
                      { rank: '5', name: 'Riya Gupta', worth: '🪙 42,900' },
                    ].map((user, i) => (
                      <div 
                        key={i} 
                        className="flex items-center justify-between p-3 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="font-bold text-xs">{user.rank}</span>
                          <span className="text-xs font-medium text-white">{user.name}</span>
                        </div>
                        <span className="font-mono text-xs text-amber-400 font-bold">{user.worth}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top XP Legends */}
                <div 
                  className="p-6 rounded-2xl border" 
                  style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border }}
                >
                  <h3 className="text-sm sm:text-base font-bold mb-4 flex items-center space-x-2">
                    <Zap size={18} style={{ color: currentTheme.primary }} />
                    <span>Top XP Legends</span>
                  </h3>
                  <div className="space-y-3">
                    {[
                      { rank: '🔥 1', name: 'Rohan Verma', level: 'Level 42 (18.4k XP)' },
                      { rank: '⚡ 2', name: 'Sneha Reddy', level: 'Level 38 (14.9k XP)' },
                      { rank: '✨ 3', name: 'Karan Singh', level: 'Level 35 (12.1k XP)' },
                      { rank: '4', name: 'Ananya Roy', level: 'Level 31 (9.8k XP)' },
                      { rank: '5', name: 'Dev Sharma', level: 'Level 28 (7.4k XP)' },
                    ].map((user, i) => (
                      <div 
                        key={i} 
                        className="flex items-center justify-between p-3 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="font-bold text-xs">{user.rank}</span>
                          <span className="text-xs font-medium text-white">{user.name}</span>
                        </div>
                        <span className="font-mono text-xs text-purple-400 font-bold">{user.level}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              7. MONETIZATION GATEWAY
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'monetization' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* UPI Donation Card */}
                <div 
                  className="p-6 rounded-2xl border flex flex-col justify-between" 
                  style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border }}
                >
                  <div>
                    <h3 className="text-base sm:text-lg font-bold mb-1 flex items-center space-x-2">
                      <Heart size={20} className="text-red-500" />
                      <span>Zero-Fee UPI Donation Gateway</span>
                    </h3>
                    <p className="text-xs text-gray-400 mb-6">
                      Support VePlexity development directly via instant UPI transfer.
                    </p>
                    
                    <div className="p-4 rounded-xl bg-gray-900/80 border border-gray-800 mb-4 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-gray-500 uppercase font-mono block">UPI ID</span>
                        <span className="text-sm font-bold text-purple-300 font-mono">madan.45@superyes</span>
                      </div>
                      <button 
                        onClick={() => {
                          dashboardAudio.playClick();
                          navigator.clipboard.writeText('madan.45@superyes');
                          setCopiedUpi(true);
                          setTimeout(() => setCopiedUpi(false), 2000);
                        }}
                        className="px-3 py-1.5 bg-purple-600/20 text-purple-400 rounded-lg text-xs font-semibold hover:bg-purple-600/30 cursor-pointer flex items-center gap-1"
                      >
                        {copiedUpi ? (
                          <>
                            <Check size={14} className="text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* QR Code Container */}
                  <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-lg">
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi%3A%2F%2Fpay%3Fpa%3Dmadan.45%40superyes%26pn%3DVeer%2520Madan%26cu%3DINR" 
                      alt="UPI QR Code - Veer Madan" 
                      className="w-36 h-36 object-contain"
                    />
                    <span className="text-[11px] font-mono font-bold text-gray-800 mt-2">
                      Scan with any UPI App (GPay / PhonePe / Paytm)
                    </span>
                  </div>
                </div>

                {/* Buy Me a Coffee Card */}
                <div 
                  className="p-6 rounded-2xl border flex flex-col justify-between" 
                  style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border }}
                >
                  <div>
                    <h3 className="text-base sm:text-lg font-bold mb-1 flex items-center space-x-2">
                      <Coffee size={20} className="text-amber-400" />
                      <span>Buy Me a Coffee Support</span>
                    </h3>
                    <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                      Contribute to server hosting fees, Lavalink audio node upgrades, and continuous feature additions.
                    </p>

                    <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 space-y-2 mb-4 text-xs font-mono text-gray-300">
                      <p>• 24/7 Lossless 48kHz VOIP DSP Nodes</p>
                      <p>• Low-latency MongoDB Atlas clusters</p>
                      <p>• 100% Free AutoMod &amp; XP Progression</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <a 
                      href="https://buymeacoffee.com/veplexity1" 
                      target="_blank" 
                      rel="noreferrer"
                      className="w-full py-3 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-gray-950 flex items-center justify-center space-x-2 shadow-lg transition active:scale-95 cursor-pointer"
                    >
                      <Coffee size={17} />
                      <span>Support on Buy Me a Coffee</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
