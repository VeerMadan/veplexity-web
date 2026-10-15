"use client";

import { use, Suspense } from "react";
import VePlexityProfessionalDashboard from "@/app/components/VePlexityProfessionalDashboard";

function GuildDashboardInner({ params }: { params: Promise<{ guildId: string }> }) {
  const resolvedParams = use(params);
  return <VePlexityProfessionalDashboard initialGuildId={resolvedParams.guildId} />;
}

export default function VePlexityGuildDashboardPage({ params }: { params: Promise<{ guildId: string }> }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0C0E14] flex flex-col items-center justify-center space-y-4">
          <div className="w-10 h-10 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
          <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-bold">
            Loading Dedicated Server Console...
          </p>
        </div>
      }
    >
      <GuildDashboardInner params={params} />
    </Suspense>
  );
}
