import { auth } from "@/auth";

export interface GuildAccessValidationResult {
  authorized: boolean;
  status: number;
  error?: string;
  isOwner?: boolean;
  permissions?: string;
}

/**
 * Validates that the current authenticated user has administrative or management
 * permissions (ADMINISTRATOR 0x8 or MANAGE_GUILD 0x20 or Guild Owner) on the specified Discord guild.
 * Prevents unauthorized access or IDOR vulnerabilities.
 */
export async function validateUserGuildAccess(guildId: string): Promise<GuildAccessValidationResult> {
  const session = await auth();
  if (!session) {
    return { authorized: false, status: 401, error: "Unauthorized: Please log in with Discord" };
  }

  // Handle demo preview servers safely
  if (guildId.startsWith("demo-")) {
    return { authorized: true, status: 200, isOwner: false };
  }

  const accessToken = (session as any).accessToken;
  if (!accessToken) {
    return { authorized: false, status: 401, error: "Missing Discord OAuth token" };
  }

  try {
    const res = await fetch("https://discord.com/api/v10/users/@me/guilds", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return { authorized: false, status: res.status, error: "Failed to verify Discord permissions" };
    }

    const guilds: any[] = await res.json();
    const targetGuild = guilds.find((g) => g.id === guildId);

    if (!targetGuild) {
      return { authorized: false, status: 403, error: "Forbidden: You are not a member of this server" };
    }

    if (targetGuild.owner) {
      return { authorized: true, status: 200, isOwner: true, permissions: targetGuild.permissions };
    }

    try {
      const perms = BigInt(targetGuild.permissions || "0");
      const isAdmin = (perms & BigInt(8)) === BigInt(8);
      const isManager = (perms & BigInt(32)) === BigInt(32);

      if (isAdmin || isManager) {
        return { authorized: true, status: 200, isOwner: false, permissions: targetGuild.permissions };
      }
    } catch {
      return { authorized: false, status: 403, error: "Forbidden: Could not parse guild permissions" };
    }

    return { authorized: false, status: 403, error: "Forbidden: You do not have Manage Server or Administrator permissions on this server" };
  } catch (err: any) {
    console.error(`[validateUserGuildAccess] Error verifying guild ${guildId}:`, err);
    return { authorized: false, status: 500, error: "Internal error checking authorization" };
  }
}
