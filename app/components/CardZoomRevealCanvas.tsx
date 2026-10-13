"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ZoomRevealRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface ZoomRevealBotData {
  name: string;
  avatarUrl: string;
  tagline: string;
  accentColor: "orange" | "fuchsia";
}

export function CardZoomRevealCanvas({
  rect,
  bot,
}: {
  rect: ZoomRevealRect | null;
  bot: ZoomRevealBotData | null;
}) {
  if (!rect || !bot) return null;

  const isOrange = bot.accentColor === "orange";

  return (
    <AnimatePresence>
      <motion.div
        key={`card-zoom-canvas-${bot.name}`}
        initial={{
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          borderRadius: 24,
          opacity: 0.9,
        }}
        animate={{
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.52,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          position: "fixed",
          zIndex: 99999,
          pointerEvents: "none",
        }}
        className={`bg-[#0a0512] flex items-center justify-center overflow-hidden border-2 ${
          isOrange ? "border-orange-500/80 shadow-[0_0_100px_rgba(249,115,22,0.4)]" : "border-fuchsia-500/80 shadow-[0_0_100px_rgba(217,70,239,0.4)]"
        }`}
      >
        {/* Ambient radial blast */}
        <div 
          className={`absolute inset-0 pointer-events-none ${
            isOrange 
              ? "bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.25)_0%,rgba(244,63,94,0.15)_40%,transparent_75%)]"
              : "bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.25)_0%,rgba(168,85,247,0.15)_40%,transparent_75%)]"
          }`}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.08, duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-5 text-center px-6 relative z-10"
        >
          {/* Logo container with expanding zoom */}
          <div className="relative group">
            <div 
              className={`absolute -inset-2 rounded-3xl opacity-75 blur-xl animate-pulse ${
                isOrange ? "bg-gradient-to-r from-orange-500 to-rose-600" : "bg-gradient-to-r from-fuchsia-600 to-purple-600"
              }`} 
            />
            <div 
              className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-2 p-2 bg-[#12081f] flex items-center justify-center shadow-2xl ${
                isOrange ? "border-orange-500/80" : "border-fuchsia-500/80"
              }`}
            >
              <img
                src={bot.avatarUrl}
                alt={bot.name}
                className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              {bot.name}
            </h2>
            <div 
              className={`inline-flex items-center gap-2 px-4 py-1 rounded-full border text-xs font-mono font-bold uppercase tracking-wider ${
                isOrange 
                  ? "bg-orange-500/20 border-orange-500/40 text-orange-300"
                  : "bg-fuchsia-500/20 border-fuchsia-500/40 text-fuchsia-300"
              }`}
            >
              <span className={`w-2 h-2 rounded-full animate-ping ${isOrange ? "bg-orange-400" : "bg-fuchsia-400"}`} />
              <span>{bot.tagline}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
