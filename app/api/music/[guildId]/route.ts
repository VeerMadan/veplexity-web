import { auth } from "@/auth";
import { fetchBotApi } from "@/lib/botApi";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ guildId: string }> }
) {
  const session = await auth();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { guildId } = await params;
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
