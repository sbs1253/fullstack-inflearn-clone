import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { remotePatterns: [{ hostname: "cdn.inflearn.com" }] },
  /* config options here */
};

export default nextConfig;
