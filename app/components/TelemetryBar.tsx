"use client";

import React from "react";
import { motion } from "framer-motion";
import { Terminal, Cpu, Zap, Activity, ShieldCheck, Layers } from "lucide-react";

export default function TelemetryBar() {
  const telemetryMetrics = [
    {
      label: "Flagship Software Deployments",
      value: "04",
      unit: "ENGINES",
      desc: "Bot, Cam, Vision & Downloader",
      icon: <Layers className="w-5 h-5 text-orange-400" />,
    },
    {
      label: "Production Slash Commands",
      value: "101",
      unit: "ROUTES",
      desc: "Hot-reloaded across 5 categories",
      icon: <Terminal className="w-5 h-5 text-fuchsia-400" />,
    },
    {
      label: "Wireless Cam Glass Latency",
      value: "<18",
      unit: "MS",
      desc: "Sub-frame UDP/ADB video stream",
      icon: <Zap className="w-5 h-5 text-amber-400" />,
    },
    {
      label: "Media Transcoding Engine",
      value: "4K60",
      unit: "STUDIO",
      desc: "Lossless FFmpeg & 320k MP3 pipeline",
      icon: <Activity className="w-5 h-5 text-purple-400" />,
    },
  ];

  return (
    <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-5 w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#0c0512] border-[4px] border-zinc-900 rounded-[2rem] p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden"
      >
        {/* Subtle glowing stripe */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-zinc-900">
          {telemetryMetrics.map((metric, i) => (
            <div key={i} className={`flex flex-col justify-between ${i > 0 ? "pt-6 lg:pt-0 lg:pl-8" : ""}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                  {metric.label}
                </span>
                <div className="p-1.5 rounded-lg bg-black border border-white/5">
                  {metric.icon}
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tight font-mono">
                  {metric.value}
                </span>
                <span className="text-xs font-mono font-black text-orange-400 tracking-wider">
                  {metric.unit}
                </span>
              </div>

              <p className="text-xs text-zinc-400 font-medium">
                {metric.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
