/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ Removido o i18n daqui, pois você já gerencia isso no middleware.ts
  // Manter os dois causa erros de redirecionamento infinito.

  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  compress: true,

  images: {
    // ✅ domains está depreciado em versões novas, use remotePatterns para segurança
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
    deviceSizes: [480, 640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128],
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // ✅ Ajuste na CSP para permitir os domínios de avatares e logs
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval';",
              "style-src 'self' 'unsafe-inline';",
              "img-src 'self' data: https: https://avatars.githubusercontent.com;",
              "font-src 'self' data:;",
              "connect-src 'self' https: https://in.logtail.com;", // Permitindo o Logtail
              "frame-ancestors 'none';",
            ].join(" "),
          },
        ],
      },
    ];
  },

  experimental: {
    optimizePackageImports: ["react", "react-dom"],
  },
};

module.exports = nextConfig;
