import { validateUserGuildAccess } from "@/lib/guildAuth";
import { fetchBotApi } from "@/lib/botApi";

export async function GET(
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
    const data = await fetchBotApi(`/api/music/${guildId}`);
    return Response.json(data);
  } catch (error: any) {
    // Return empty fallback state if player is idle
    return Response.json({
      playing: false,
      track: null,
      queue: [],
      volume: 100,
      stay247: true,
      error: error.message
    });
  }
}
