import { auth } from "@/auth";
import { fetchBotApi } from "@/lib/botApi";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
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
