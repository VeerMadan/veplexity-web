import { auth } from "@/auth";
import { fetchBotApi } from "@/lib/botApi";

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
    // 1. Fetch user's Discord guilds
    const discordRes = await fetch("https://discord.com/api/v10/users/@me/guilds", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: { revalidate: 30 },
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

    // 3. Fetch bot's joined guilds to determine which servers have the bot
    let botGuildIds = new Set<string>();
    try {
      const botGuilds = await fetchBotApi("/api/guilds");
      if (Array.isArray(botGuilds)) {
        botGuilds.forEach((bg: any) => botGuildIds.add(bg.id));
      }
    } catch (e) {
      console.warn("[UserGuilds API] Could not fetch bot guilds list:", e);
    }

    // 4. Map with bot status
    const result = adminGuilds.map((g) => ({
      id: g.id,
      name: g.name,
      icon: g.icon,
      owner: !!g.owner,
      permissions: g.permissions,
      botJoined: botGuildIds.has(g.id),
      iconUrl: g.icon
        ? `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png?size=128`
        : null,
    }));

    return Response.json({
      guilds: result,
      botClientId: process.env.DISCORD_CLIENT_ID || "1556640364448714752",
    });
  } catch (error: any) {
    console.error("[UserGuilds API] Error:", error);
    return Response.json({ error: error.message || "Failed to load servers" }, { status: 500 });
  }
}
