import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'hoirqrkdgbmvpwutwuwj.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'admin.truepath406.com',
      },
      {
        protocol: 'https',
        hostname: 'unitedformulas.com',
      },
      {
        protocol: 'https',
        hostname: 'ufbackend.com',
      },
    ],
  },
};

export default nextConfig;
