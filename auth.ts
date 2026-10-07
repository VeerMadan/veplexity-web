import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "ea716b7701b241a98f812aa9c53f624ae870ac6917ca63f031ed8049a1ec61b5",
  providers: [
    Discord({
      clientId: (process.env.DISCORD_CLIENT_ID || process.env.AUTH_DISCORD_ID || "").replace(/['"]/g, "").trim(),
      clientSecret: (process.env.DISCORD_CLIENT_SECRET || process.env.AUTH_DISCORD_SECRET || "").replace(/['"]/g, "").trim(),
      authorization: {
        params: {
          scope: "identify guilds email",
        },
      },
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
