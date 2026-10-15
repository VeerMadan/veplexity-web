import { auth } from "@/auth";
import { fetchBotApi } from "@/lib/botApi";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const guildId = req.nextUrl.searchParams.get("guildId");
  if (!guildId) {
    return Response.json({ error: "Missing guildId parameter" }, { status: 400 });
  }

  try {
    const data = await fetchBotApi(`/api/moderation/cases?guildId=${encodeURIComponent(guildId)}`);
    return Response.json(data);
  } catch (error: any) {
    return Response.json({ cases: [], error: error.message });
  }
}
