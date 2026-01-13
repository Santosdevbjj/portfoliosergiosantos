import { MetadataRoute } from "next";

const baseUrl = "https://portfoliosergiosantos.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",      // Protege suas rotas de API
          "/_next/",    // Protege arquivos internos do Next.js
          "/private/", 
          "/admin/"
        ],
      },
    ],
    /** * Se você seguiu a recomendação de simplificar o sitemap, 
     * use 'sitemap.xml'. Se manteve o index, use 'sitemap-index.xml'.
     */
    sitemap: [`${baseUrl}/sitemap.xml`],
  };
}
