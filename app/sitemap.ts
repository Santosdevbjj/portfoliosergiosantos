import { MetadataRoute } from "next";
import { getAllProjects, type Lang } from "@/lib/mdx";

const baseUrl = "https://portfoliosergiosantos.vercel.app/"; // ajuste para seu domínio real
const langs: Lang[] = ["pt", "en", "es"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [];

  // Páginas principais
  const staticPaths = ["/", "/about", "/projects", "/projects/list", "/contact"];

  for (const path of staticPaths) {
    // Para cada idioma, gera rota com alternates
    for (const lang of langs) {
      routes.push({
        url: `${baseUrl}/${lang}${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: path === "/" ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            langs.map((l) => [
              l === "pt" ? "pt-BR" : l === "en" ? "en-US" : "es-ES",
              `${baseUrl}/${l}${path}`,
            ])
          ),
        },
      });
    }
  }

  // Páginas dinâmicas de projetos
  for (const lang of langs) {
    const projects = await getAllProjects(lang);
    for (const project of projects) {
      routes.push({
        url: `${baseUrl}/${lang}/projects/${project.slug}`,
        lastModified: project.metadata.date
          ? new Date(project.metadata.date)
          : new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            langs.map((l) => [
              l === "pt" ? "pt-BR" : l === "en" ? "en-US" : "es-ES",
              `${baseUrl}/${l}/projects/${project.slug}`,
            ])
          ),
        },
      });
    }
  }

  return routes;
}
