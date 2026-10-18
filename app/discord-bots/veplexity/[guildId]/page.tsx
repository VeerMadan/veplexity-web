"use client";

import { use, Suspense } from "react";
import VePlexitySaaSConsole from "@/app/components/VePlexitySaaSConsole";

function GuildConsoleWrapper({ params }: { params: Promise<{ guildId: string }> }) {
  const resolved = use(params);
  return <VePlexitySaaSConsole initialGuildId={resolved.guildId} />;
}

export default function VePlexityGuildDashboardPage({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0C0E14] text-white flex items-center justify-center font-mono text-xs">
          Connecting to VePlexity Server Console...
        </div>
      }
    >
      <GuildConsoleWrapper params={params} />
    </Suspense>
  );
}
