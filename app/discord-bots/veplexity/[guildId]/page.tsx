"use client";

import { use, Suspense } from "react";
import ProfessionalBotDashboard from "@/app/components/ProfessionalBotDashboard";

function GuildDashboardInner({ params }: { params: Promise<{ guildId: string }> }) {
  const resolvedParams = use(params);
  return <ProfessionalBotDashboard initialGuildId={resolvedParams.guildId} botType="veplexity" />;
}

export default function GuildDashboardPage({ params }: { params: Promise<{ guildId: string }> }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0C0E14] flex flex-col items-center justify-center space-y-4 text-white">
          <div className="w-9 h-9 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
          <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-bold">
            Loading VePlexity Console...
          </p>
        </div>
      }
    >
      <GuildDashboardInner params={params} />
    </Suspense>
  );
}
