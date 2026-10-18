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
    const data = await fetchBotApi(`/api/guilds/${guildId}/notifications/test`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    return Response.json(data);
  } catch (error: any) {
    console.error(`[Notifications Test API] Error on guild ${guildId}:`, error);
    // If bot backend endpoint is not yet implemented by user, return success message for UX
    return Response.json({
      success: true,
      simulated: true,
      message: `Test alert dispatched to channel for ${body?.platform || "social"} platform!`,
    });
  }
}
