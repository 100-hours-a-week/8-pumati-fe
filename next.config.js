// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_S3_HOSTNAME,
        pathname: '/**',
      },
    ],
    allowedUrlKeys: ['url', 'w', 'q'],
  },
}
