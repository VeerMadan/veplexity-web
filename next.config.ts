import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/discord-bots",
        permanent: false,
      },
      {
        source: "/dashboard/:guildId",
        destination: "/discord-bots/veplexity/:guildId",
        permanent: false,
      },
      {
        source: "/discord-bots/plexping",
        destination: "/discord-bots/pingplex",
        permanent: false,
      },
      {
        source: "/discord-bots/plexping/:guildId",
        destination: "/discord-bots/pingplex/:guildId",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
