import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    qualities: [75, 100],
  },
  turbopack: {
    root: path.join(process.cwd()),
  },
};

export default nextConfig;
