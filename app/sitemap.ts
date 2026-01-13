import { MetadataRoute } from "next";
import { i18n } from "@/lib/i18n";
import { getAllProjects } from "@/lib/mdx"; // Importando para indexar conteúdos MDX

const baseUrl = "https://portfoliosergiosantos.vercel.app";
const locales = i18n.locales;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [];

  // Mapeamento de idiomas para o padrão hreflang
  const languagesMap = {
    pt: `${baseUrl}/pt`,
    en: `${baseUrl}/en`,
    es: `${baseUrl}/es`,
  };

  // 1. Páginas Principais (Home) para cada idioma
  for (const lang of locales) {
    routes.push({
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: languagesMap,
      },
    });
  }

  // 2. Indexação de Projetos MDX (Dinâmico)
  // Isso garante que se você criar /pt/projects/analise-dados, o Google o encontre
  try {
    for (const lang of locales) {
      const projects = await getAllProjects(lang);
      
      projects.forEach((project) => {
        routes.push({
          url: `${baseUrl}/${lang}/projects/${project.slug}`,
          lastModified: project.metadata.date ? new Date(project.metadata.date) : new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
          alternates: {
            languages: {
              pt: `${baseUrl}/pt/projects/${project.slug}`,
              en: `${baseUrl}/en/projects/${project.slug}`,
              es: `${baseUrl}/es/projects/${project.slug}`,
            },
          },
        });
      });
    }
  } catch (error) {
    console.error("Erro ao gerar sitemap para projetos:", error);
  }

  return routes;
}
