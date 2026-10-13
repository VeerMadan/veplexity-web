import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
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
