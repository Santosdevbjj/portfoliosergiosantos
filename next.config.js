/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "github.com" },
    ],
    deviceSizes: [480, 640, 750, 828, 1080, 1200, 1920],
  },

  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

module.exports = nextConfig;
