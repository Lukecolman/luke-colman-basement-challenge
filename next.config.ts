import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io"
      }
    ]
  },
  async redirects() {
    return [
      { source: "/terms", destination: "/blog", permanent: true },
      { source: "/terms-and-conditions", destination: "/blog", permanent: true },
      { source: "/privacy", destination: "/blog", permanent: true },
      { source: "/trust-center", destination: "/blog", permanent: true }
    ];
  }
};

export default nextConfig;
