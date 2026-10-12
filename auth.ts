import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

// Sanitize and normalize URL in production
if (process.env.NODE_ENV === "production") {
  if (process.env.NEXTAUTH_URL && process.env.NEXTAUTH_URL.includes("localhost")) {
    delete process.env.NEXTAUTH_URL;
  }
  if (process.env.AUTH_URL && process.env.AUTH_URL.includes("localhost")) {
    delete process.env.AUTH_URL;
  }
  // Ensure canonical www is matched if set to apex domain
  if (process.env.AUTH_URL === "https://veplexity.dev") {
    process.env.AUTH_URL = "https://www.veplexity.dev";
  }
  if (process.env.NEXTAUTH_URL === "https://veplexity.dev") {
    process.env.NEXTAUTH_URL = "https://www.veplexity.dev";
  }
}

const DISCORD_CLIENT_ID = (
  process.env.DISCORD_CLIENT_ID ||
  process.env.AUTH_DISCORD_ID ||
  "1556640364448714752"
).replace(/['"]/g, "").trim();

const DISCORD_CLIENT_SECRET = (
  process.env.DISCORD_CLIENT_SECRET ||
  process.env.AUTH_DISCORD_SECRET ||
  "zDTFcD9GugsF9N4IBZooMkHUjg9L2Izd"
).replace(/['"]/g, "").trim();

const AUTH_SECRET = (
  process.env.AUTH_SECRET ||
  process.env.NEXTAUTH_SECRET ||
  "ea716b7701b241a98f812aa9c53f624ae870ac6917ca63f031ed8049a1ec61b5"
).trim();

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: true,
  trustHost: true,
  secret: AUTH_SECRET,
  pages: {
    signIn: "/dashboard",
    error: "/dashboard",
  },
  providers: [
    Discord({
      clientId: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
      authorization: "https://discord.com/api/oauth2/authorize?scope=identify+guilds+email",
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub;
      }
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
});
