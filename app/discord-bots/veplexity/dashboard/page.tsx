"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import VePlexitySaaSConsole from "@/app/components/VePlexitySaaSConsole";

function VePlexityDashboardInner() {
  const searchParams = useSearchParams();
  const guildParam = searchParams.get("guild") || undefined;
  const tabParam = searchParams.get("tab") || undefined;

  return <VePlexitySaaSConsole initialGuildId={guildParam} initialTab={tabParam} />;
}

export default function VePlexityDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0C0E14] text-white flex items-center justify-center font-mono text-xs">
          Loading VePlexity Commercial Console...
        </div>
      }
    >
      <VePlexityDashboardInner />
    </Suspense>
  );
}
