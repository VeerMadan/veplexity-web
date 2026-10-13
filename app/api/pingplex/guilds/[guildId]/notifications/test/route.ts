import { auth } from "@/auth";
import { fetchPingPlexApi } from "@/lib/botApi";

export const dynamic = "force-dynamic";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ guildId: string }> }
) {
  const session = await auth();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { guildId } = await params;
  try {
    const body = await req.json();
    const data = await fetchPingPlexApi(`/api/guilds/${guildId}/notifications/test`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    return Response.json(data);
  } catch (error: any) {
    console.error(`[PingPlex Test Alert API] Error testing alert in guild ${guildId}:`, error);
    return Response.json({ error: error.message || "Failed to send test notification" }, { status: 500 });
  }
}
