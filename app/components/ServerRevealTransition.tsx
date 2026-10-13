"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface FlightRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

/**
 * Geometric Iris Dashboard Reveal
 * Directly unveils the server dashboard with an expanding geometric circular iris mask
 * without any intermediate loading pill or fake intro screens.
 */
export function GeometricDashboardReveal() {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(false);
      try {
        sessionStorage.removeItem("vep_dashboard_reveal");
      } catch {}
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="geometric-iris-reveal"
          initial={{ clipPath: "circle(0% at 50% 50%)", opacity: 1 }}
          animate={{ clipPath: "circle(150% at 50% 50%)", opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 pointer-events-none bg-[#090a0f]"
        />
      )}
    </AnimatePresence>
  );
}

/**
 * Backward compatible wrappers
 */
export function ServerDestinationReveal({
  onComplete,
}: {
  isReady?: boolean;
  fallbackServerName?: string;
  fallbackServerIcon?: string | null;
  onComplete?: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete?.(), 550);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return <GeometricDashboardReveal />;
}

export function ServerRevealTransition({
  onAnimationComplete,
}: {
  serverName?: string;
  serverIcon?: string | null;
  serverInitials?: string;
  isVisible?: boolean;
  onAnimationComplete?: () => void;
  mode?: "loading" | "reveal";
}) {
  return <GeometricDashboardReveal />;
}

export function ServerFlightVeil() {
  return null;
}
