"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Terminal, Music, Cpu, Shield, Gamepad2, Wrench, Sparkles, Coffee, ExternalLink } from "lucide-react";

interface CommandItem {
  name: string;
  category: "music" | "ai" | "moderation" | "fun" | "utility";
  desc: string;
  syntax: string;
  badge?: "free" | "vip" | "exclusive";
}

const COMMAND_LIST: CommandItem[] = [
  // Music & Studio Lossless
  { name: "/play", category: "music", desc: "Plays lossless audio from YouTube, Spotify, SoundCloud, or 11+ local FLAC library tracks with 0ms buffering.", syntax: "/play query:<name or url>", badge: "free" },
  { name: "/bassboost", category: "music", desc: "Applies 32-band high-fidelity bass amplification filters to the current voice channel stream.", syntax: "/bassboost level:<low/mid/high/extreme>", badge: "free" },
  { name: "/8d", category: "music", desc: "Enables rotating 360-degree binaural spatial 8D surround sound in real time.", syntax: "/8d enabled:<true/false>", badge: "free" },
  { name: "/loop", category: "music", desc: "Toggles seamless looping for the active track or the entire playback queue.", syntax: "/loop mode:<track/queue/off>", badge: "free" },
  { name: "/skip", category: "music", desc: "Skips to the next track in the queue with instantaneous Opus handoff.", syntax: "/skip", badge: "free" },
  { name: "/queue", category: "music", desc: "Displays paginated track queue with estimated playtime and audio bitrate.", syntax: "/queue", badge: "free" },
  { name: "/lyrics", category: "music", desc: "Fetches synchronized lyrics for the active track with automatic language fallback.", syntax: "/lyrics [song:<query>]", badge: "free" },
  { name: "/volume", category: "music", desc: "Adjusts audio gain without audio clipping or harmonic distortion (0-150%).", syntax: "/volume level:<1-150>", badge: "free" },
  { name: "/nowplaying", category: "music", desc: "Shows interactive now-playing card with real-time waveform progress and track tags.", syntax: "/nowplaying", badge: "free" },
  { name: "/filter", category: "music", desc: "Applies studio DSP effects: nightcore, vaporwave, karaoke vocal remover, and tremolo.", syntax: "/filter type:<filter_name>", badge: "free" },

  // AI & Generative
  { name: "/ai", category: "ai", desc: "Direct prompt session with Gemini 2.0 Flash neural engine with high-speed token output.", syntax: "/ai prompt:<query>", badge: "free" },
  { name: "/roast", category: "ai", desc: "Generates an unhinged, context-aware personalized roast targeting a user or topic.", syntax: "/roast user:<@member>", badge: "free" },
  { name: "/compliment", category: "ai", desc: "Generates a wholesome, personalized motivational compliment for any member.", syntax: "/compliment user:<@member>", badge: "free" },
  { name: "/flirt", category: "ai", desc: "Generates smooth, funny, or romantic pickup lines tailored to a user profile.", syntax: "/flirt target:<@member>", badge: "vip" },
  { name: "/pickup", category: "ai", desc: "Pulls from a curated list of 40+ cheesy, witty, and hilarious pickup lines.", syntax: "/pickup", badge: "free" },
  { name: "/imagine", category: "ai", desc: "Synthesizes creative conceptual prompts and visual story descriptions using Gemini.", syntax: "/imagine prompt:<concept>", badge: "vip" },

  // Moderation & Server Defense
  { name: "/ban", category: "moderation", desc: "Permanently bans a malicious member, wipes message history, and creates an audit case.", syntax: "/ban user:<@member> [reason:<text>]", badge: "free" },
  { name: "/kick", category: "moderation", desc: "Ejects a disruptive user with automatic DM reason delivery and case logging.", syntax: "/kick user:<@member> [reason:<text>]", badge: "free" },
  { name: "/timeout", category: "moderation", desc: "Mutes member across all server text and voice channels for a specified duration.", syntax: "/timeout user:<@member> duration:<time>", badge: "free" },
  { name: "/warn", category: "moderation", desc: "Issues a formal strike against a member with auto-escalation thresholds.", syntax: "/warn user:<@member> reason:<text>", badge: "free" },
  { name: "/warnings", category: "moderation", desc: "Queries complete infractions history and strike timestamps for any user.", syntax: "/warnings user:<@member>", badge: "free" },
  { name: "/nuke", category: "moderation", desc: "Clones and purges an entire text channel, wiping all messages while keeping permissions intact.", syntax: "/nuke [reason:<text>]", badge: "free" },
  { name: "/moveall", category: "moderation", desc: "Instantly teleports all members from one voice room to another target channel.", syntax: "/moveall from:<#vc1> to:<#vc2>", badge: "free" },
  { name: "/role", category: "moderation", desc: "Adds or revokes a server role from a member with safety hierarchy checks.", syntax: "/role user:<@member> role:<@role> action:<add/remove>", badge: "free" },
  { name: "/announce", category: "moderation", desc: "Dispatches a rich embed broadcast to any channel with optional @everyone ping.", syntax: "/announce channel:<#ch> title:<text> message:<text>", badge: "free" },
  { name: "/lock", category: "moderation", desc: "Locks channel permissions to prevent normal members from sending messages.", syntax: "/lock [channel:<#ch>]", badge: "free" },
  { name: "/unlock", category: "moderation", desc: "Restores normal messaging permissions in a previously locked channel.", syntax: "/unlock [channel:<#ch>]", badge: "free" },

  // Fun, Social & Games
  { name: "/truth", category: "fun", desc: "Pulls from 40+ spicy, funny, and engaging truth questions for community game sessions.", syntax: "/truth", badge: "free" },
  { name: "/dare", category: "fun", desc: "Pulls from 40+ hilarious Discord-friendly dares and creative voice challenges.", syntax: "/dare", badge: "free" },
  { name: "/trivia", category: "fun", desc: "Fetches live trivia questions with 4 interactive answer buttons and a 15-second countdown timer.", syntax: "/trivia", badge: "free" },
  { name: "/meme", category: "fun", desc: "Pulls trending high-voted memes from curated Reddit feeds with direct embed media.", syntax: "/meme", badge: "free" },
  { name: "/joke", category: "fun", desc: "Fetches two-part setups and punchlines with NSFW & hate filters strictly enforced.", syntax: "/joke", badge: "free" },
  { name: "/wyr", category: "fun", desc: "Would You Rather dilemmas with interactive A/B voting buttons and live counter.", syntax: "/wyr", badge: "free" },
  { name: "/ship", category: "fun", desc: "Calculates relationship compatibility meter (0-100%) between any two users with custom heart bar.", syntax: "/ship user1:<@user> user2:<@user>", badge: "free" },
  { name: "/tictactoe", category: "fun", desc: "Interactive 3x3 Discord button grid for real-time multiplayer Tic-Tac-Toe duels.", syntax: "/tictactoe opponent:<@user>", badge: "free" },
  { name: "/connect4", category: "fun", desc: "Full multiplayer Connect 4 game played directly inside Discord messages with column buttons.", syntax: "/connect4 opponent:<@user>", badge: "free" },
  { name: "/8ball", category: "fun", desc: "Mystic 8ball answers with 25 distinct outcomes across positive, neutral, and savage tiers.", syntax: "/8ball question:<text>", badge: "free" },
  { name: "/rate", category: "fun", desc: "Generates an objective rating (1-10) with visual Unicode progress bar.", syntax: "/rate thing:<text>", badge: "free" },
  { name: "/iq", category: "fun", desc: "Humorous IQ meter (1-200) with diagnostic commentary on mental faculties.", syntax: "/iq [user:<@user>]", badge: "free" },
  { name: "/vibe", category: "fun", desc: "Scans user energy and returns their current aesthetic vibe percentage (chill, chaotic, unhinged).", syntax: "/vibe [user:<@user>]", badge: "free" },
  { name: "/pat", category: "fun", desc: "Sends high-res anime pat animation targeting a user with customizable action text.", syntax: "/pat user:<@user>", badge: "free" },
  { name: "/hug", category: "fun", desc: "Sends an affectionate anime hug animation to any community member.", syntax: "/hug user:<@user>", badge: "free" },
  { name: "/slap", category: "fun", desc: "Delivers a comical anime slap GIF to keep chaotic members in check.", syntax: "/slap user:<@user>", badge: "free" },
  { name: "/bonk", category: "fun", desc: "Bonks a member with legendary doge bat animation into horny jail.", syntax: "/bonk user:<@user>", badge: "free" },
  { name: "/cry", category: "fun", desc: "Solo crying animation for when life or gaming matches go catastrophically wrong.", syntax: "/cry", badge: "free" },

  // Utility & Automation
  { name: "/pvc", category: "utility", desc: "Spawns dynamic Private Voice Channels that auto-delete when empty, with owner controls.", syntax: "/pvc [lock/unlock/name/limit]", badge: "free" },
  { name: "/welcomer", category: "utility", desc: "Configures aesthetic welcome cards with member count, avatar render, and custom rules.", syntax: "Managed via Web Dashboard", badge: "free" },
  { name: "/reaction-roles", category: "utility", desc: "Deploys self-assignable role menus with multi-choice or single-choice button panels.", syntax: "Managed via Web Dashboard", badge: "free" },
  { name: "/serverinfo", category: "utility", desc: "Comprehensive server overview: verification level, boost count, roles, and creation date.", syntax: "/serverinfo", badge: "free" },
  { name: "/userinfo", category: "utility", desc: "Deep profile analysis: joined date, Discord tenure, badge list, and permissions.", syntax: "/userinfo [user:<@user>]", badge: "free" },
  { name: "/stats", category: "utility", desc: "Live bot telemetry: WebSocket ping, connected guilds, RAM consumption, and audio nodes.", syntax: "/stats", badge: "free" }
];

export default function CommandArsenal() {
  const [selectedCat, setSelectedCat] = useState<"all" | "music" | "ai" | "moderation" | "fun" | "utility">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCommands = useMemo(() => {
    return COMMAND_LIST.filter((cmd) => {
      const matchesCat = selectedCat === "all" || cmd.category === selectedCat;
      const matchesSearch = 
        cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        cmd.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCat, searchQuery]);

  return (
    <section id="commands" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050208]">
      <div className="w-full max-w-[1400px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass border border-orange-500/30 text-orange-400 font-mono text-xs font-bold uppercase tracking-widest mb-4">
              <Terminal className="w-3.5 h-3.5" /> Full Capability Matrix
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white">
              97+ Slash <span className="bg-gradient-to-r from-orange-400 to-fuchsia-500 bg-clip-text text-transparent">Commands.</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mt-3">
              Browse the arsenal. Every command is engineered natively in Discord.js v14 with modal interactions, button menus, and zero hidden subscriptions.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search /command or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#12081c] border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-fuchsia-500 transition-all liquid-glass"
            />
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { id: "all", label: "All Commands (97+)", icon: <Sparkles className="w-3.5 h-3.5" /> },
            { id: "music", label: "Lossless Audio", icon: <Music className="w-3.5 h-3.5" /> },
            { id: "ai", label: "Gemini AI", icon: <Cpu className="w-3.5 h-3.5" /> },
            { id: "moderation", label: "Moderation & Shield", icon: <Shield className="w-3.5 h-3.5" /> },
            { id: "fun", label: "Games & Anime", icon: <Gamepad2 className="w-3.5 h-3.5" /> },
            { id: "utility", label: "Automation & PVC", icon: <Wrench className="w-3.5 h-3.5" /> }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer border ${
                selectedCat === cat.id
                  ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white border-fuchsia-500/50 shadow-lg shadow-fuchsia-500/25"
                  : "bg-black/30 border-white/5 text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Command Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCommands.map((cmd) => (
            <motion.div
              key={cmd.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              className="neo-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between group sheen-layer"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-black font-mono text-white group-hover:text-fuchsia-400 transition-colors">
                    {cmd.name}
                  </span>

                  {cmd.badge === "vip" ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                      <Coffee className="w-3 h-3" /> VIP Perk
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      100% Free
                    </span>
                  )}
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  {cmd.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                <span className="text-zinc-500 truncate max-w-[220px]">
                  {cmd.syntax}
                </span>
                <span className="text-[10px] uppercase font-bold text-fuchsia-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Slash v14
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* VIP / HQ Banner */}
        <div className="mt-12 p-8 rounded-3xl liquid-glass-glow border-2 border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Coffee className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">Want Exclusive VIP Perks & Stream Shoutouts?</h3>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl">
                Join our official Discord HQ <a href="https://www.discord.gg/R6ZrqpWEcc" target="_blank" rel="noreferrer" className="text-amber-400 underline font-bold">discord.gg/R6ZrqpWEcc</a> or support with a coffee to unlock custom role flairs, priority voice bitrate, and experimental generative AI modes!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <a
              href="https://www.buymeacoffee.com/veplexity1"
              target="_blank"
              rel="noreferrer"
              className="neo-btn-bmc px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 flex-1 md:flex-initial"
            >
              <Coffee className="w-4 h-4" /> Support on BMC
            </a>
            <a
              href="https://www.discord.gg/R6ZrqpWEcc"
              target="_blank"
              rel="noreferrer"
              className="neo-btn-glass px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center gap-1.5 flex-1 md:flex-initial"
            >
              <span>Join HQ</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
