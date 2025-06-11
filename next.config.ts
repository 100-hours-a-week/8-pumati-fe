import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_S3_HOSTNAME!,
      },
    ],
  },
};

export default nextConfig;
