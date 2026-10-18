import { validateUserGuildAccess } from "@/lib/guildAuth";
import { fetchBotApi } from "@/lib/botApi";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ guildId: string }> }
) {
  const { guildId } = await params;

  // Enforce server-side authorization
  const authResult = await validateUserGuildAccess(guildId);
  if (!authResult.authorized) {
    return Response.json({ error: authResult.error }, { status: authResult.status });
  }

  try {
    const body = await req.json();
    const data = await fetchBotApi(`/api/guilds/${guildId}/announce`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    return Response.json(data);
  } catch (error: any) {
    console.error(`[Announce API] Error on guild ${guildId}:`, error);
    return Response.json({ error: error.message || "Failed to dispatch announcement" }, { status: 500 });
  }
}
