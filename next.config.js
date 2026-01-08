/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  output: "standalone",

  compiler: {
    // Remove console.log em produção (mantém console.error)
    removeConsole: process.env.NODE_ENV === "production",
  },

  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};

module.exports = nextConfig;
