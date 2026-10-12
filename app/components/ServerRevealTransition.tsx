"use client";

import React, { useEffect, useState } from "react";
import { DiscordLogo } from "./BrandIcons";

export interface FlightRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface ServerFlightVeilProps {
  isOpen: boolean;
  sourceRect: FlightRect | null;
  serverName: string;
  serverIcon?: string | null;
  serverInitials?: string;
  onComplete?: () => void;
}

/**
 * Shared-element button-to-fullscreen reveal flight (mvk-builders architecture)
 * Captures clicked button bounding rect, mounts at exact coordinates, and smoothly expands
 * into full viewport bleed with cubic-bezier(0.16, 1, 0.3, 1).
 */
export function ServerFlightVeil({
  isOpen,
  sourceRect,
  serverName,
  serverIcon,
  serverInitials = "VP",
  onComplete,
}: ServerFlightVeilProps) {
  const [veilStyle, setVeilStyle] = useState<React.CSSProperties | null>(null);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    if (!isOpen || !sourceRect) {
      setVeilStyle(null);
      setContentVisible(false);
      return;
    }

    // 1. Initialize flight veil matching exact button geometry
    setVeilStyle({
      position: "fixed",
      top: `${sourceRect.top}px`,
      left: `${sourceRect.left}px`,
      width: `${sourceRect.width}px`,
      height: `${sourceRect.height}px`,
      borderRadius: "9999px",
      backgroundColor: "#0d0f17",
      border: "1.5px solid #5865F2",
      boxShadow: "0 25px 80px rgba(88, 101, 242, 0.5)",
      overflow: "hidden",
      zIndex: 99999,
      transition: "none",
      opacity: 1,
      willChange: "top, left, width, height, border-radius, opacity",
      transform: "translate3d(0, 0, 0)",
      pointerEvents: "all",
    });

    // 2. Trigger refined, cinematic cubic-bezier expansion into full viewport
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setContentVisible(true);
        setVeilStyle({
          position: "fixed",
          top: "0px",
          left: "0px",
          width: "100vw",
          height: "100vh",
          borderRadius: "0px",
          backgroundColor: "#090a0f",
          border: "1.5px solid transparent",
          boxShadow: "0 30px 100px rgba(0, 0, 0, 0.9)",
          overflow: "hidden",
          zIndex: 99999,
          transition: "all 720ms cubic-bezier(0.16, 1, 0.3, 1)",
          opacity: 1,
          willChange: "top, left, width, height, border-radius, opacity",
          transform: "translate3d(0, 0, 0)",
          pointerEvents: "all",
        });
      });
    });

    const timer = setTimeout(() => {
      onComplete?.();
    }, 720);

    return () => clearTimeout(timer);
  }, [isOpen, sourceRect, onComplete]);

  if (!isOpen || !veilStyle) return null;

  return (
    <div style={veilStyle} className="pointer-events-none select-none">
      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-[#090a0f]">
        {/* Subtle Ambient Radial Blurple Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(88,101,242,0.18),transparent_70%)] pointer-events-none" />

        {/* Revealed Content */}
        <div
          className={`relative z-10 flex flex-col items-center gap-5 max-w-sm mx-auto transition-opacity duration-300 ${
            contentVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Avatar with pulsing halo */}
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#12141c] border-2 border-[#5865F2] overflow-hidden flex items-center justify-center shadow-2xl animate-pulse">
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
            </div>

            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#5865F2] flex items-center justify-center text-white border-2 border-[#090a0f] shadow-md">
              <DiscordLogo className="w-4 h-4" />
            </div>
          </div>

          {/* Server Name & Status */}
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight truncate max-w-xs">
              {serverName}
            </h3>
            <p className="text-xs text-zinc-400 font-medium">
              Synchronizing Server Modules...
            </p>
          </div>

          {/* Synchronizing Pill */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-300 shadow-lg">
            <div className="w-2 h-2 rounded-full bg-[#5865F2] animate-ping" />
            <span>DISCORD ENGINE CONNECTED</span>
          </div>

          {/* Progress Indicator */}
          <div className="w-48 h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div className="w-full h-full bg-[#5865F2] rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Destination Page Reveal (mounts full bleed and smoothly fades out)
 */
export function ServerDestinationReveal({
  isReady,
  fallbackServerName,
  fallbackServerIcon,
  onComplete,
}: {
  isReady: boolean;
  fallbackServerName?: string;
  fallbackServerIcon?: string | null;
  onComplete?: () => void;
}) {
  const [active, setActive] = useState(true);
  const [fading, setFading] = useState(false);
  const [flightData, setFlightData] = useState<{
    serverName?: string;
    serverIcon?: string | null;
  } | null>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("vep_server_flight");
      if (stored) {
        const parsed = JSON.parse(stored);
        setFlightData({
          serverName: parsed.name,
          serverIcon: parsed.icon,
        });
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (isReady && active && !fading) {
      // Hold for 250ms for seamless perceptual continuity, then fade out
      const holdTimer = setTimeout(() => {
        setFading(true);
        const fadeTimer = setTimeout(() => {
          setActive(false);
          try {
            sessionStorage.removeItem("vep_server_flight");
          } catch {}
          onComplete?.();
        }, 400);
        return () => clearTimeout(fadeTimer);
      }, 250);
      return () => clearTimeout(holdTimer);
    }
  }, [isReady, active, fading, onComplete]);

  if (!active) return null;

  const displayName =
    flightData?.serverName || fallbackServerName || "Discord Server";
  const displayIcon = flightData?.serverIcon || fallbackServerIcon;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: "#090a0f",
        opacity: fading ? 0 : 1,
        transition: "opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        pointerEvents: fading ? "none" : "all",
      }}
      className="flex flex-col items-center justify-center p-6 text-center select-none"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(88,101,242,0.18),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-5 max-w-sm mx-auto">
        <div className="relative">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#12141c] border-2 border-[#5865F2] overflow-hidden flex items-center justify-center shadow-2xl">
            {displayIcon ? (
              <img
                src={displayIcon}
                alt={displayName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-mono text-2xl font-black text-white">VP</span>
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#5865F2] flex items-center justify-center text-white border-2 border-[#090a0f] shadow-md">
            <DiscordLogo className="w-4 h-4" />
          </div>
        </div>

        <div className="space-y-1.5">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight truncate max-w-xs">
            {displayName}
          </h3>
          <p className="text-xs text-zinc-400 font-medium">
            Revealing Server Dashboard...
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-300 shadow-lg">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>CONSOLE READY</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Backward compatible ServerRevealTransition wrapper
 */
export function ServerRevealTransition({
  serverName,
  serverIcon,
  serverInitials = "VP",
  isVisible,
  onAnimationComplete,
}: {
  serverName: string;
  serverIcon?: string | null;
  serverInitials?: string;
  isVisible: boolean;
  onAnimationComplete?: () => void;
  mode?: "loading" | "reveal";
}) {
  return (
    <ServerDestinationReveal
      isReady={!isVisible}
      fallbackServerName={serverName}
      fallbackServerIcon={serverIcon}
      onComplete={onAnimationComplete}
    />
  );
}
