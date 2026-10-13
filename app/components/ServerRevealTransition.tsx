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
 * Mounts at the exact bounding rectangle of the clicked "Go" button,
 * then smoothly expands to 100vw x 100vh using the MVK-Builders flight curve.
 */
export function ServerFlightCanvas({
  rect,
  guild,
  isExpanding,
}: {
  rect: FlightRect | null;
  guild: FlightGuildData | null;
  isExpanding: boolean;
}) {
  const [style, setStyle] = useState<React.CSSProperties | null>(null);

  useEffect(() => {
    if (!rect) return;

    // 1. Initial position exactly matching button geometry
    setStyle({
      position: "fixed",
      top: `${rect.top}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      borderRadius: "14px",
      backgroundColor: "#090a0f",
      border: "1.5px solid #10b981",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.8)",
      overflow: "hidden",
      zIndex: 99999,
      transition: "none",
      opacity: 1,
      pointerEvents: "none",
    });

    // 2. Expand to 100vw x 100vh full bleed
    const frame1 = requestAnimationFrame(() => {
      const frame2 = requestAnimationFrame(() => {
        setStyle({
          position: "fixed",
          top: "0px",
          left: "0px",
          width: "100vw",
          height: "100vh",
          borderRadius: "0px",
          backgroundColor: "#090a0f",
          border: "1.5px solid transparent",
          boxShadow: "none",
          overflow: "hidden",
          zIndex: 99999,
          transition: "all 620ms cubic-bezier(0.16, 1, 0.3, 1)",
          opacity: 1,
          pointerEvents: "none",
        });
      });
      return () => cancelAnimationFrame(frame2);
    });

    return () => cancelAnimationFrame(frame1);
  }, [rect]);

  if (!rect || !style) return null;

  return (
    <div style={style} className="flex flex-col items-center justify-center">
      {/* Content smoothly emerges as canvas expands to full bleed */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-4 text-center px-6"
      >
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#12141c] border-2 border-emerald-500/40 p-1 shadow-2xl flex items-center justify-center overflow-hidden">
          {guild?.iconUrl ? (
            <img
              src={guild.iconUrl}
              alt={guild?.name || "Server"}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <span className="font-mono text-2xl font-black text-white">
              {guild?.initials || "VP"}
            </span>
          )}
        </div>

        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            {guild?.name}
          </h2>
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Opening Server Console...</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * ServerDestinationReveal
 * Mounts full-screen on /dashboard/[guildId] and seamlessly fades out,
 * revealing the loaded server dashboard underneath.
 */
export function ServerDestinationReveal({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [flightData, setFlightData] = useState<FlightGuildData | null>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("vep_server_flight");
      if (saved) {
        const parsed = JSON.parse(saved);
        setFlightData(parsed);
        setVisible(true);

        // Fade out smoothly
        const raf = requestAnimationFrame(() => {
          setTimeout(() => {
            setOpacity(0);
          }, 80);
        });

        const timer = setTimeout(() => {
          setVisible(false);
          sessionStorage.removeItem("vep_server_flight");
          onComplete?.();
        }, 450);

        return () => {
          cancelAnimationFrame(raf);
          clearTimeout(timer);
        };
      }
    } catch {
      // Ignore
    }
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#090a0f",
        zIndex: 99998,
        transition: "opacity 360ms cubic-bezier(0.16, 1, 0.3, 1)",
        opacity,
        pointerEvents: "none",
      }}
      className="flex flex-col items-center justify-center"
    >
      {flightData && (
        <div className="flex flex-col items-center gap-4 text-center px-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#12141c] border-2 border-emerald-500/40 p-1 shadow-2xl flex items-center justify-center overflow-hidden">
            {flightData.iconUrl ? (
              <img
                src={flightData.iconUrl}
                alt={flightData.name}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <span className="font-mono text-2xl font-black text-white">
                {flightData.initials || "VP"}
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            {flightData.name}
          </h2>
        </div>
      )}
    </div>
  );
}

/**
 * Backward compatible wrappers
 */
export function GeometricDashboardReveal() {
  return null;
}

export function ServerRevealTransition() {
  return null;
}

export function ServerFlightVeil() {
  return null;
}
