"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DiscordLogo } from "./BrandIcons";

interface ServerRevealTransitionProps {
  serverName: string;
  serverIcon?: string | null;
  serverInitials?: string;
  isVisible: boolean;
  onAnimationComplete?: () => void;
  mode?: "loading" | "reveal";
}

export function ServerRevealTransition({
  serverName,
  serverIcon,
  serverInitials = "VP",
  isVisible,
  onAnimationComplete,
  mode = "loading",
}: ServerRevealTransitionProps) {
  const [phase, setPhase] = useState<"pill" | "expanding">("pill");

  useEffect(() => {
    if (isVisible) {
      setPhase("pill");
      const timer = setTimeout(() => {
        setPhase("expanding");
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="server-reveal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#090a0f] overflow-hidden"
          onAnimationComplete={onAnimationComplete}
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(88,101,242,0.15),transparent_70%)] pointer-events-none" />

          {/* Morphing Expanding Pill */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 15 }}
            animate={
              phase === "pill"
                ? { scale: 1, opacity: 1, y: 0 }
                : {
                    scale: [1, 1.08, 22],
                    opacity: [1, 1, 0],
                    transition: {
                      duration: 0.7,
                      times: [0, 0.2, 1],
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }
            }
            className="relative flex flex-col items-center gap-5 p-7 sm:p-8 rounded-3xl bg-[#0d0f17] border border-zinc-800 shadow-[0_20px_60px_rgba(0,0,0,0.8)] max-w-sm w-full mx-4 text-center"
          >
            {/* Server Avatar / Logo with Pulsing Ring */}
            <div className="relative">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(88, 101, 242, 0.5)",
                    "0 0 0 20px rgba(88, 101, 242, 0)",
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
                className="w-22 h-22 sm:w-24 sm:h-24 rounded-full bg-zinc-900 border-2 border-zinc-700 overflow-hidden flex items-center justify-center shadow-2xl"
              >
                {serverIcon ? (
                  <img
                    src={serverIcon}
                    alt={serverName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-mono text-2xl font-black text-white">
                    {serverInitials}
                  </span>
                )}
              </motion.div>

              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#5865F2] flex items-center justify-center text-white border-2 border-[#0d0f17] shadow-md">
                <DiscordLogo className="w-4 h-4" />
              </div>
            </div>

            {/* Server Name & Loading Status */}
            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-white tracking-tight truncate max-w-xs">
                {serverName}
              </h3>
              <p className="text-xs text-zinc-400 font-medium">
                {phase === "pill" ? "Synchronizing Server Console..." : "Revealing Dashboard..."}
              </p>
            </div>

            {/* Pulsing Pill Chip */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300">
              <div className="w-2 h-2 rounded-full bg-[#5865F2] animate-ping" />
              <span>SYNCHRONIZING MODULES</span>
            </div>

            {/* Progress Sweep */}
            <div className="w-full h-1 bg-zinc-800/80 rounded-full overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 1.1,
                  ease: "easeInOut",
                }}
                className="w-1/2 h-full bg-[#5865F2] rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
