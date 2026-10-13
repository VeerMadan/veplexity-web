"use client";

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
 * Deprecated overlay: returned null to ensure clean, instant, native navigation
 * without jarring or intrusive full-screen fixed overlays.
 */
export function CardZoomRevealCanvas() {
  return null;
}
