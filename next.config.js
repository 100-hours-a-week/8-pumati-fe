module.exports = {
  images: {
    remotePatterns: [
      new URL(`https://${process.env.NEXT_PUBLIC_S3_HOSTNAME!}/**`),
    ],
  },
};