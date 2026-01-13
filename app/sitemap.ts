import { MetadataRoute } from "next";
import { i18n } from "@/lib/i18n";

/**
 * Sitemap dinâmico para Next.js 15.
 * Gera URLs para cada idioma e cada página principal.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portfoliosergiosantos.vercel.app";
  const now = new Date();

  // Rotas estáticas do seu portfólio
  const routes = ["", "/about", "/projects/list", "/contact"];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Gera entradas para cada idioma e cada rota
  i18n.locales.forEach((lang) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: now,
        changeFrequency: route === "/projects/list" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : 0.8,
      });
    });
  });

  return sitemapEntries;
}
