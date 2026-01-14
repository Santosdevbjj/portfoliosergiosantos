/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ativa o modo estrito para detectar efeitos colaterais (essencial no React 19)
  reactStrictMode: true,

  compiler: {
    // Remove consoles em produção para privacidade e performance, mantendo erros e avisos
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  // Geração de arquivos comprimidos (gzip/brotli)
  compress: true,
  
  // Segurança: Remove o header que indica que o site usa Next.js
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    // Cache agressivo de 1 ano para imagens externas (melhora o LCP no Core Web Vitals)
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "github.com" },
    ],
    // Breakpoints de imagem otimizados para o seu Tailwind (xs: 480px)
    deviceSizes: [480, 640, 750, 828, 1080, 1200, 1920],
  },

  // Suporte a extensões de arquivos de conteúdo
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  // Otimização para Docker/Vercel (gera um build muito mais leve)
  output: "standalone",

  async redirects() {
    return [
      {
        // Se o usuário acessar a raiz sem idioma, mandamos para /pt
        source: "/",
        destination: "/pt",
        permanent: true,
      },
    ];
  },

  // Ajuste opcional para Next 15: desativa avisos de hidratação por causa de extensões de browser
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

module.exports = nextConfig;
