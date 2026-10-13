import { auth } from "@/auth";
import { fetchBotApi, fetchPingPlexApi } from "@/lib/botApi";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if (!session) {
    return Response.json({ error: "Unauthorized: Please log in with Discord" }, { status: 401 });
  }

  const accessToken = (session as any).accessToken;
  if (!accessToken) {
    return Response.json({ error: "Missing Discord OAuth token. Please re-authenticate." }, { status: 401 });
  }

  try {
    // 1. Fetch user's Discord guilds (no-store to ensure instant live reflection of new server additions)
    const discordRes = await fetch("https://discord.com/api/v10/users/@me/guilds", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!discordRes.ok) {
      const err = await discordRes.text();
      return Response.json({ error: `Discord API error: ${err}` }, { status: discordRes.status });
    }

    const allGuilds: any[] = await discordRes.json();

    // 2. Filter for Admin or Manage Guild permissions (0x8 = Admin, 0x20 = Manage Server)
    const adminGuilds = allGuilds.filter((g) => {
      if (g.owner) return true;
      try {
        const perms = BigInt(g.permissions || "0");
        return (perms & BigInt(8)) === BigInt(8) || (perms & BigInt(32)) === BigInt(32);
      } catch {
        return false;
      }
    });

    // 3. Fetch guilds from both VePlexity and PingPlex backends concurrently
    const botGuildMap = new Map<string, { veplexity: boolean; pingplex: boolean }>();

    const [veplexityResult, pingplexResult] = await Promise.allSettled([
      fetchBotApi("/api/guilds"),
      fetchPingPlexApi("/api/guilds"),
    ]);

    if (veplexityResult.status === "fulfilled" && Array.isArray(veplexityResult.value)) {
      veplexityResult.value.forEach((bg: any) => {
        const current = botGuildMap.get(bg.id) || { veplexity: false, pingplex: false };
        current.veplexity = true;
        botGuildMap.set(bg.id, current);
      });
    } else if (veplexityResult.status === "rejected") {
      console.warn("[UserGuilds API] Could not fetch VePlexity bot guilds:", (veplexityResult as any).reason?.message);
    }

    if (pingplexResult.status === "fulfilled" && Array.isArray(pingplexResult.value)) {
      pingplexResult.value.forEach((bg: any) => {
        const current = botGuildMap.get(bg.id) || { veplexity: false, pingplex: false };
        current.pingplex = true;
        botGuildMap.set(bg.id, current);
      });
    } else if (pingplexResult.status === "rejected") {
      console.warn("[UserGuilds API] Could not fetch PingPlex bot guilds:", (pingplexResult as any).reason?.message);
    }

    // 4. Map with dual-bot status
    const result = adminGuilds.map((g) => {
      const botInfo = botGuildMap.get(g.id) || {
        veplexity: false,
        pingplex: false,
      };
      const botJoined = botInfo.veplexity || botInfo.pingplex;

      return {
        id: g.id,
        name: g.name,
        icon: g.icon,
        owner: Boolean(g.owner),
        permissions: g.permissions,
        botJoined,
        bots: botInfo,
        iconUrl: g.icon
          ? `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png?size=128`
          : null,
      };
    });

    return Response.json({
      guilds: result,
      botClientId: process.env.DISCORD_CLIENT_ID || "1556640364448714752",
      pingPlexClientId: process.env.PINGPLEX_CLIENT_ID || "1559520031916687430",
    });
  } catch (error: any) {
    console.error("[UserGuilds API] Error:", error);
    return Response.json({ error: error.message || "Failed to load servers" }, { status: 500 });
  }
}
