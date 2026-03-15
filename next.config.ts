const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: "https",
              hostname: "placehold.co"
          },
          {
              protocol: "https",
              hostname: "m.media-amazon.com"
          },
      ]
  },

    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
