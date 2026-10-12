"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DiscordLogo } from "./BrandIcons";

interface ServerRevealTransitionProps {
  serverName: string;
  serverIcon?: string | null;
  serverInitials?: string;
  isVisible: boolean;
  onAnimationComplete?: () => void;
}

export function ServerRevealTransition({
  serverName,
  serverIcon,
  serverInitials = "VP",
  isVisible,
  onAnimationComplete,
}: ServerRevealTransitionProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="server-reveal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#090a0f] overflow-hidden"
          onAnimationComplete={onAnimationComplete}
        >
          {/* Subtle Ambient Pulse */}
          <div className="absolute inset-0 bg-radial from-[#5865F2]/10 via-transparent to-transparent pointer-events-none" />

          {/* Morphing Reveal Pill */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 24,
            }}
            className="relative flex flex-col items-center gap-6 p-8 rounded-3xl bg-[#0f1118] border border-zinc-800 shadow-2xl max-w-sm w-full mx-4 text-center"
          >
            {/* Server Avatar / Logo with smooth pulse */}
            <div className="relative">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(88, 101, 242, 0.4)",
                    "0 0 0 16px rgba(88, 101, 242, 0)",
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.6,
                  ease: "easeInOut",
                }}
                className="w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-700/80 overflow-hidden flex items-center justify-center shadow-lg"
              >
                {serverIcon ? (
                  <img
                    src={serverIcon}
                    alt={serverName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-mono text-xl font-black text-zinc-100">
                    {serverInitials}
                  </span>
                )}
              </motion.div>

              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#5865F2] flex items-center justify-center text-white border-2 border-[#0f1118]">
                <DiscordLogo className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Server Name & Status Pill */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white tracking-tight truncate max-w-xs">
                {serverName}
              </h3>
              <p className="text-xs text-zinc-400 font-medium">
                Initializing Server Management Console...
              </p>
            </div>

            {/* Smooth Loading Indicator Pill */}
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300">
              <div className="w-2 h-2 rounded-full bg-[#5865F2] animate-ping" />
              <span>SYNCHRONIZING PERMISSIONS</span>
            </div>

            {/* Clean Progress Line */}
            <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
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
