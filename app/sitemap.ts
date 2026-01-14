import { MetadataRoute } from "next";

/**
 * 🗺️ Gerador de Sitemap Dinâmico (i18n)
 * Essencial para que motores de busca indexem corretamente as versões PT, EN e ES.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portfoliosergiosantos.vercel.app";
  const locales = ["pt", "en", "es"];
  const now = new Date();

  // Rotas fundamentais do seu ecossistema
  const routes = ["", "/about", "/projects", "/contact"];

  return routes.flatMap((route) => {
    return locales.map((lang) => {
      const isDefault = lang === "pt";
      const path = route === "" ? "" : route;
      const url = `${baseUrl}/${lang}${path}`;

      return {
        url,
        lastModified: now,
        changeFrequency: (route === "/projects" ? "weekly" : "monthly") as any,
        priority: route === "" ? 1.0 : 0.8,
        // 🌐 Alternates: Informa ao Google a relação entre os idiomas
        // Isso evita punições por "conteúdo duplicado" entre as versões traduzidas
        alternates: {
          languages: {
            pt: `${baseUrl}/pt${path}`,
            en: `${baseUrl}/en${path}`,
            es: `${baseUrl}/es${path}`,
            "x-default": `${baseUrl}/pt${path}`, // Define PT como padrão global
          },
        },
      };
    });
  });
}
