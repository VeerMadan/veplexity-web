import { auth } from "@/auth";
import { fetchBotApi } from "@/lib/botApi";

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
