import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    return [
      {
        source: "/api/:path*",
        destination: apiUrl
          ? `${apiUrl}/:path*`
          : "http://localhost:4000/api/:path*",
      },
    ];
  },
};
export default nextConfig;
