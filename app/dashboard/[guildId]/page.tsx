"use client";

import { useEffect, use, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function GuildRedirectInner({ params }: { params: Promise<{ guildId: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const isPingPlex = searchParams?.get("bot") === "pingplex";
    const target = isPingPlex
      ? `/discord-bots/pingplex/${resolvedParams.guildId}`
      : `/discord-bots/veplexity/${resolvedParams.guildId}`;
    router.replace(target);
  }, [resolvedParams.guildId, router, searchParams]);

  return (
    <div className="min-h-screen bg-[#0a0512] flex flex-col items-center justify-center space-y-4">
      <div className="w-9 h-9 border-2 border-rose-500/20 border-t-rose-500 rounded-full animate-spin" />
      <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-bold">
        Loading Dedicated Console Deck...
      </p>
    </div>
  );
}

export default function DashboardGuildRedirect({ params }: { params: Promise<{ guildId: string }> }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0512] flex items-center justify-center">
          <div className="w-9 h-9 border-2 border-rose-500/20 border-t-rose-500 rounded-full animate-spin" />
        </div>
      }
    >
      <GuildRedirectInner params={params} />
    </Suspense>
  );
}
