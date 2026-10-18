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
    const data = await fetchBotApi(`/api/guilds/${guildId}`);
    return Response.json(data);
  } catch (error: any) {
    const status = error.status || 500;
    const isNotFound =
      status === 404 ||
      error.message?.toLowerCase().includes("not found") ||
      error.message?.toLowerCase().includes("neither bot");

    console.error(`[Guild API] Error fetching guild ${guildId} (status ${status}):`, error.message);
    return Response.json(
      {
        error: error.message || "Failed to load guild data",
        status,
        notInvited: isNotFound,
      },
      { status: isNotFound ? 404 : 500 }
    );
  }
}

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
    const data = await fetchBotApi(`/api/guilds/${guildId}/config`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    return Response.json(data);
  } catch (error: any) {
    console.error(`[Guild API] Error saving guild ${guildId} config:`, error);
    return Response.json({ error: error.message || "Failed to save configuration" }, { status: 500 });
  }
}
