import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ guildId: string }> }
) {
  const { guildId } = await params;
  const url = new URL(request.url);
  url.pathname = `/discord-bots/pingplex/${guildId}`;
  return NextResponse.redirect(url, 307);
}
