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
    const isNotFound = status === 404 || error.message?.toLowerCase().includes("not found");
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
