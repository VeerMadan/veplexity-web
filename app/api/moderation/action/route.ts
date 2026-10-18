import { validateUserGuildAccess } from "@/lib/guildAuth";
import { fetchBotApi } from "@/lib/botApi";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const guildId = body?.guildId;

    if (!guildId) {
      return Response.json({ error: "Missing required guildId parameter" }, { status: 400 });
    }

    // Enforce server-side authorization check
    const authResult = await validateUserGuildAccess(guildId);
    if (!authResult.authorized) {
      return Response.json({ error: authResult.error }, { status: authResult.status });
    }

    const data = await fetchBotApi(`/api/moderation/action`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    return Response.json(data);
  } catch (error: any) {
    console.error("[Moderation Action API] Error:", error);
    return Response.json(
      { error: error.message || "Failed to execute moderation action" },
      { status: 500 }
    );
  }
}
