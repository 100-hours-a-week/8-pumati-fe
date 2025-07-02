import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [40, 64, 72, 100, 128, 224, 400],
    imageSizes: [],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_S3_HOSTNAME!,
      },
    ],
  },
};

export default nextConfig;
