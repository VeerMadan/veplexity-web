import { NextResponse } from "next/server";

export async function GET() {
  const clientId = (process.env.DISCORD_CLIENT_ID || process.env.AUTH_DISCORD_ID || "1556640364448714752").replace(/['"]/g, "").trim();
  const clientSecret = (process.env.DISCORD_CLIENT_SECRET || process.env.AUTH_DISCORD_SECRET || "zDTFcD9GugsF9N4IBZooMkHUjg9L2Izd").replace(/['"]/g, "").trim();
  const authSecret = (process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "ea716b7701b241a98f812aa9c53f624ae870ac6917ca63f031ed8049a1ec61b5").trim();

  let discordCheck = "unknown";
  let discordError = null;

  try {
    const creds = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const res = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${creds}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: "test_verification_code",
        redirect_uri: "https://www.veplexity.dev/api/auth/callback/discord",
      }),
    });

    const data = await res.json().catch(() => ({}));
    if (res.status === 400 && data.error === "invalid_grant") {
      discordCheck = "VALID_CREDENTIALS";
    } else if (res.status === 401 && data.error === "invalid_client") {
      discordCheck = "INVALID_CLIENT_SECRET";
      discordError = data;
    } else {
      discordCheck = `STATUS_${res.status}`;
      discordError = data;
    }
  } catch (err: any) {
    discordCheck = "FETCH_FAILED";
    discordError = err.message;
  }

  return NextResponse.json({
    status: "ok",
    nodeEnv: process.env.NODE_ENV,
    authUrl: process.env.AUTH_URL || "not_set",
    nextAuthUrl: process.env.NEXTAUTH_URL || "not_set",
    clientId: clientId ? `${clientId.slice(0, 6)}...${clientId.slice(-4)}` : "missing",
    secretLength: clientSecret ? clientSecret.length : 0,
    hasAuthSecret: !!authSecret,
    authSecretLength: authSecret ? authSecret.length : 0,
    discordCheck,
    discordError,
  });
}
