import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // 404 za adrese van /sr i /en (layout je u app/[lang])
    globalNotFound: true,
  },
};

export default nextConfig;
