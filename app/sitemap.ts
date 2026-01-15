import { MetadataRoute } from "next";

/**
 * 🗺️ Sitemap dinâmico com suporte a i18n
 * Garante indexação correta das versões PT, EN e ES.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://portfoliosergiosantos.vercel.app";

  const isPreview =
    process.env.VERCEL_ENV === "preview" ||
    process.env.NODE_ENV !== "production";

  // 🔒 Não gerar sitemap em ambientes de preview/dev
  if (isPreview) {
    return [];
  }

  const locales: Array<"pt" | "en" | "es"> = ["pt", "en", "es"];
  const now = new Date();

  // Rotas principais do site
  const routes = ["", "/about", "/projects", "/contact"];

  return routes.flatMap((route) =>
    locales.map((lang) => {
      const path = route === "" ? "" : route;
      const url = `${baseUrl}/${lang}${path}`;

      return {
        url,
        lastModified: now,
        changeFrequency: route === "/projects" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : 0.8,

        // 🌐 Relação entre idiomas (SEO multilíngue)
        alternates: {
          languages: {
            pt: `${baseUrl}/pt${path}`,
            en: `${baseUrl}/en${path}`,
            es: `${baseUrl}/es${path}`,
            "x-default": `${baseUrl}/pt${path}`,
          },
        },
      };
    })
  );
}
