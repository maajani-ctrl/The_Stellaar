import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['10.226.89.235', 'localhost:3000'],
} as any; // Using 'as any' because the type definition might not have caught up yet

export default nextConfig;
