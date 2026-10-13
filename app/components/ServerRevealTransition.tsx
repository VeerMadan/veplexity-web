"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface FlightRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface FlightGuildData {
  id: string;
  name: string;
  iconUrl?: string | null;
  initials?: string;
}

/**
 * ServerFlightCanvas
 * Hardware-accelerated Framer Motion button-to-fullscreen reveal flight.
 * Starts precisely at the clicked "Go" button's bounding box and smoothly expands
 * to 100vw x 100vh with cubic-bezier physics, seamlessly launching the destination console.
 */
export function ServerFlightCanvas({
  rect,
  guild,
  isExpanding,
}: {
  rect: FlightRect | null;
  guild: FlightGuildData | null;
  isExpanding?: boolean;
}) {
  return (
    <AnimatePresence>
      {rect && guild && (
        <motion.div
          key={`flight-canvas-${guild.id}`}
          initial={{
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            borderRadius: 14,
            opacity: 1,
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
            duration: 0.62,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            position: "fixed",
            zIndex: 99999,
            pointerEvents: "none",
          }}
          className="bg-[#090a0f] flex items-center justify-center overflow-hidden border-2 border-emerald-500 shadow-[0_0_80px_rgba(16,185,129,0.35)]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4 text-center px-6"
          >
            <div className="w-22 h-22 sm:w-24 sm:h-24 rounded-2xl bg-[#12141c] border-2 border-emerald-500/60 p-1.5 shadow-[0_0_40px_rgba(16,185,129,0.3)] flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-emerald-500/15 animate-ping rounded-2xl pointer-events-none" />
              {guild.iconUrl ? (
                <img
                  src={guild.iconUrl}
                  alt={guild.name}
                  className="w-full h-full object-cover rounded-xl relative z-10"
                />
              ) : (
                <span className="font-mono text-3xl font-black text-white relative z-10">
                  {guild.initials || "VP"}
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {guild.name}
              </h2>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>OPENING VEPLEXITY CONSOLE...</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * ServerDestinationReveal
 * Mounts full-screen on /dashboard/[guildId] and seamlessly dissolves,
 * revealing the loaded server management console underneath.
 */
export function ServerDestinationReveal({
  onComplete,
}: {
  isReady?: boolean;
  fallbackServerName?: string;
  fallbackServerIcon?: string | null;
  onComplete?: () => void;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 450);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="destination-reveal-veil"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99998,
            pointerEvents: "none",
          }}
          className="bg-[#090a0f] flex items-center justify-center"
        />
      )}
    </AnimatePresence>
  );
}

export function GeometricDashboardReveal() {
  return null;
}

export function ServerRevealTransition() {
  return null;
}

export function ServerFlightVeil() {
  return null;
}
