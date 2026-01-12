import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

export type Lang = "pt" | "en" | "es";

export interface ProjectFrontmatter {
  title: string;
  date?: string;
  description?: string;
  tags?: string[];
  slug?: string;
}

export interface ProjectData {
  slug: string;
  lang: Lang;
  content: string;
  metadata: ProjectFrontmatter;
}

const MDX_ROOT = path.join(process.cwd(), "mdx");

/**
 * Retorna o caminho absoluto de um arquivo MDX
 */
function getProjectPath(lang: Lang, slug: string) {
  return path.join(MDX_ROOT, lang, `${slug}.mdx`);
}

/**
 * Normaliza e valida o frontmatter
 * Evita metadata incompleta ou inconsistente
 */
function normalizeFrontmatter(
  data: Record<string, unknown>,
  slug: string
): ProjectFrontmatter {
  return {
    title: String(data.title ?? slug),
    date: typeof data.date === "string" ? data.date : undefined,
    description:
      typeof data.description === "string" ? data.description : undefined,
    tags: Array.isArray(data.tags)
      ? data.tags.map(String)
      : undefined,
    slug,
  };
}

/**
 * Lê e processa um arquivo MDX específico
 */
async function readMdxFile(
  lang: Lang,
  slug: string
): Promise<ProjectData | null> {
  const filePath = getProjectPath(lang, slug);

  try {
    const raw = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(raw);

    return {
      slug,
      lang,
      content,
      metadata: normalizeFrontmatter(data, slug),
    };
  } catch {
    return null;
  }
}

/**
 * Lê um projeto por slug e idioma.
 * Se não existir no idioma solicitado, faz fallback para EN.
 */
export async function getProjectBySlug(
  slug: string,
  lang: Lang
): Promise<ProjectData | null> {
  const project = await readMdxFile(lang, slug);
  if (project) return project;

  if (lang !== "en") {
    return await readMdxFile("en", slug);
  }

  return null;
}

/**
 * Lista todos os slugs disponíveis para um idioma.
 * ⚡ Cacheado para evitar múltiplas leituras de disco.
 */
export const listSlugsByLang = cache(
  async (lang: Lang): Promise<string[]> => {
    const dir = path.join(MDX_ROOT, lang);

    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });

      return entries
        .filter((e) => e.isFile() && e.name.endsWith(".mdx"))
        .map((e) => e.name.replace(/\.mdx$/, ""));
    } catch {
      return [];
    }
  }
);

/**
 * Retorna todos os projetos de um idioma.
 * Projetos mais recentes aparecem primeiro (quando date existir).
 */
export async function getAllProjects(lang: Lang): Promise<ProjectData[]> {
  const slugs = await listSlugsByLang(lang);

  const projects = await Promise.all(
    slugs.map((slug) => getProjectBySlug(slug, lang))
  );

  return projects
    .filter((p): p is ProjectData => p !== null)
    .sort((a, b) => {
      if (!a.metadata.date || !b.metadata.date) return 0;
      return (
        new Date(b.metadata.date).getTime() -
        new Date(a.metadata.date).getTime()
      );
    });
}
