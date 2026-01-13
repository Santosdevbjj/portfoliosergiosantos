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
  slug: string; // Slug é obrigatório para navegação
  featured?: boolean;
}

export interface ProjectData {
  slug: string;
  lang: Lang;
  content: string;
  metadata: ProjectFrontmatter;
}

// Caminho absoluto para a pasta de conteúdos
const MDX_ROOT = path.join(process.cwd(), "content/projects");

/**
 * Normaliza e valida o frontmatter com valores padrão seguros
 */
function normalizeFrontmatter(
  data: Record<string, any>,
  slug: string
): ProjectFrontmatter {
  return {
    title: String(data.title || slug),
    date: data.date ? String(data.date) : undefined,
    description: data.description ? String(data.description) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    slug,
    featured: Boolean(data.featured),
  };
}

/**
 * Lê e processa um arquivo MDX específico.
 * Usa process.cwd() para garantir compatibilidade com o ambiente de build da Vercel.
 */
async function readMdxFile(
  lang: Lang,
  slug: string
): Promise<ProjectData | null> {
  const filePath = path.join(MDX_ROOT, lang, `${slug}.mdx`);

  try {
    // Verifica existência do arquivo
    try {
      await fs.access(filePath);
    } catch {
      return null;
    }

    const raw = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(raw);

    // Ignora arquivos corrompidos ou vazios
    if (!content && Object.keys(data).length === 0) return null;

    return {
      slug,
      lang,
      content,
      metadata: normalizeFrontmatter(data, slug),
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(`[MDX Error] ${lang}/${slug}:`, error);
    }
    return null;
  }
}

/**
 * Obtém um projeto por slug e idioma com Fallback inteligente.
 * ⚡ Cacheado no nível da requisição.
 */
export const getProjectBySlug = cache(
  async (slug: string, lang: Lang): Promise<ProjectData | null> => {
    const project = await readMdxFile(lang, slug);
    
    if (project) return project;

    // Fallback: Se não existe no idioma atual, tenta no idioma padrão (PT)
    // Se o pedido já for PT e falhou, tenta EN.
    if (lang !== "pt") {
      return await readMdxFile("pt", slug);
    } else {
      return await readMdxFile("en", slug);
    }
  }
);

/**
 * Lista todos os slugs disponíveis para um idioma.
 */
export const listSlugsByLang = cache(
  async (lang: Lang): Promise<string[]> => {
    const dir = path.join(MDX_ROOT, lang);

    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      return entries
        .filter((e) => e.isFile() && (e.name.endsWith(".mdx") || e.name.endsWith(".md")))
        .map((e) => e.name.replace(/\.mdx$|\.md$/, ""));
    } catch {
      return [];
    }
  }
);

/**
 * Retorna todos os projetos ordenados por data.
 */
export async function getAllProjects(lang: Lang): Promise<ProjectData[]> {
  const slugs = await listSlugsByLang(lang);

  const projects = await Promise.all(
    slugs.map((slug) => getProjectBySlug(slug, lang))
  );

  return projects
    .filter((p): p is ProjectData => p !== null)
    .sort((a, b) => {
      const dateA = a.metadata.date ? new Date(a.metadata.date).getTime() : 0;
      const dateB = b.metadata.date ? new Date(b.metadata.date).getTime() : 0;
      return dateB - dateA; // Mais recentes primeiro
    });
}
