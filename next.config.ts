import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // hostname: process.env.NEXT_PUBLIC_S3_HOSTNAME!,
        hostname: 's3-pumati-prod.s3.ap-northeast-2.amazonaws.com'
      },
    ],
  },
};

export default nextConfig;
