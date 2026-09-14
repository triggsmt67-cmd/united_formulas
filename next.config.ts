import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/industries/janitorial-cleaning-companies',
        destination: '/industries/commercial-janitorial',
        permanent: true,
      },
      {
        source: '/industries/schools-education',
        destination: '/industries/schools-educational-facilities',
        permanent: true,
      },
      {
        source: '/category/disinfectants-deodorizers',
        destination: '/category/disinfectant',
        permanent: true,
      },
    ];
  },
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
