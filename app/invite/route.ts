import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const guildId = searchParams.get("guild_id");
  const clientId = process.env.DISCORD_CLIENT_ID || "1556640364448714752";

  let inviteUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=8&integration_type=0&scope=bot+applications.commands`;
  if (guildId) {
    inviteUrl += `&guild_id=${guildId}&disable_guild_select=true`;
  }

  return NextResponse.redirect(inviteUrl);
}
