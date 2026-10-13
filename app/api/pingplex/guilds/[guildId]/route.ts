import { auth } from "@/auth";
import { fetchPingPlexApi } from "@/lib/botApi";

export const dynamic = "force-dynamic";

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
    const data = await fetchPingPlexApi(`/api/guilds/${guildId}`);
    // Normalize bot joined status
    if (data && !data.bots) {
      data.bots = {
        pingplex: Boolean(data.bot?.joined ?? true),
        veplexity: false,
      };
    }
    return Response.json(data);
  } catch (error: any) {
    const status = error.status || 500;
    const isNotFound =
      status === 404 ||
      error.message?.toLowerCase().includes("not found") ||
      error.message?.toLowerCase().includes("not a member");

    console.error(`[PingPlex Guild API] Error fetching guild ${guildId} (status ${status}):`, error.message);
    return Response.json(
      {
        error: error.message || "Failed to load guild data from PingPlex",
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
    const data = await fetchPingPlexApi(`/api/guilds/${guildId}/config`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    return Response.json(data);
  } catch (error: any) {
    console.error(`[PingPlex Guild API] Error saving guild ${guildId} config:`, error);
    return Response.json({ error: error.message || "Failed to save configuration" }, { status: 500 });
  }
}
