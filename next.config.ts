import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://society6.com/cdn/**'), new URL('https://images.ctfassets.net/**')
    ],
  },
};

export default nextConfig;
