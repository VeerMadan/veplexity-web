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

/**
 * Pure Cinematic Zoom Reveal Transition
 * Eliminates artificial boxes, borders, and static text overlays.
 * Seamlessly expands the card origin to full viewport with velvety liquid blur and smooth fade-out.
 */
export function CardZoomRevealCanvas({
  rect,
  bot,
}: {
  rect: ZoomRevealRect | null;
  bot: ZoomRevealBotData | null;
}) {
  if (!rect || !bot) return null;

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
          opacity: 0.95,
        }}
        animate={{
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
          opacity: [0.95, 1, 0.9, 0],
        }}
        transition={{
          duration: 0.55,
          times: [0, 0.4, 0.8, 1],
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          position: "fixed",
          zIndex: 99999,
          pointerEvents: "none",
        }}
        className="bg-[#07030a]/92 backdrop-blur-2xl flex items-center justify-center overflow-hidden border-none"
      >
        {/* Soft atmospheric ambient glow */}
        <div 
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
            bot.accentColor === "orange"
              ? "bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.18)_0%,rgba(244,63,94,0.08)_40%,transparent_70%)]"
              : "bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.18)_0%,rgba(168,85,247,0.08)_40%,transparent_70%)]"
          }`}
        />

        {/* Unboxed logo smoothly scaling up and dissolving */}
        <motion.div
          initial={{ opacity: 0.8, scale: 0.85 }}
          animate={{ opacity: [0.8, 1, 0.95, 0], scale: [0.85, 1.15, 1.3] }}
          transition={{ duration: 0.52, times: [0, 0.4, 1], ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center"
        >
          <img
            src={bot.avatarUrl}
            alt={bot.name}
            className="w-32 h-32 sm:w-40 sm:h-40 object-contain filter drop-shadow-[0_16px_36px_rgba(0,0,0,0.8)]"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
