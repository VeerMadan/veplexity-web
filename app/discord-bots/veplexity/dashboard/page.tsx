"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import VePlexityProfessionalDashboard from "@/app/components/VePlexityProfessionalDashboard";

function DashboardContent() {
  const searchParams = useSearchParams();
  const guild = searchParams?.get("guild") || undefined;
  const tab = searchParams?.get("tab") || "overview";

  return <VePlexityProfessionalDashboard initialGuildId={guild} initialTab={tab} />;
}

export default function VePlexityDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0C0E14] flex flex-col items-center justify-center space-y-4">
          <div className="w-10 h-10 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
          <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-bold">
            Initializing VePlexity Commercial Console...
          </p>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
