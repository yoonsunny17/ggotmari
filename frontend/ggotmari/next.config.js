/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "parsley-bucket.s3.ap-northeast-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ggotmari.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },

  async redirects() {
    return [
      // {
      //   source: "/login",
      //   destination: "/",
      //   permanent: true,
      // },
      {
        source: "/404",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
