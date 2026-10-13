import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/bot",
        destination: "/discord-bot",
        permanent: false,
      },
      {
        source: "/bot/:path*",
        destination: "/discord-bot/:path*",
        permanent: false,
      },
      {
        source: "/dashboard",
        destination: "/discord-bot",
        permanent: false,
      },
      {
        source: "/dashboard/:guildId",
        destination: "/discord-bot/veplexity/:guildId",
        permanent: false,
      },
      {
        source: "/discord-bots/plexping",
        destination: "/discord-bot/pingplex",
        permanent: false,
      },
      {
        source: "/discord-bots/plexping/:guildId",
        destination: "/discord-bot/pingplex/:guildId",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/discord-bot",
        destination: "/discord-bots",
      },
      {
        source: "/discord-bot/:path*",
        destination: "/discord-bots/:path*",
      },
    ];
  },
};

export default nextConfig;
