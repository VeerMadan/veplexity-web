"use client";

import React, { Suspense } from "react";
import VePlexityProfessionalDashboard from "@/app/components/VePlexityProfessionalDashboard";

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0C0E14] flex flex-col items-center justify-center space-y-4">
          <div className="w-10 h-10 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
          <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-bold">
            Loading VePlexity Dashboard...
          </p>
        </div>
      }
    >
      <VePlexityProfessionalDashboard />
    </Suspense>
  );
}
