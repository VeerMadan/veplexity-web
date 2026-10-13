"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/discord-bots");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0a0512] flex flex-col items-center justify-center space-y-4">
      <div className="w-9 h-9 border-2 border-rose-500/20 border-t-rose-500 rounded-full animate-spin" />
      <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-bold">
        Redirecting to Bot Consoles...
      </p>
    </div>
  );
}
