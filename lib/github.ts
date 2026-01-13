// lib/github.ts

import type { Dictionary } from "./i18n";

/* ----------------------------- Types ----------------------------- */

export type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  topics: string[];
  language?: string;
  stargazers_count?: number;
  updated_at?: string;
};

const DEFAULT_USER = "Santosdevbjj";

/**
 * Categorias alinhadas 100% com i18n.projectCategories
 */
export const CATEGORIES_ORDER = [
  "dataScience",
  "azureDatabricks",
  "neo4j",
  "powerBI",
  "database",
  "python",
  "dotnet",
  "java",
  "machineLearning",
  "aws",
  "cybersecurity",
  "logic",
  "html",
  "articlesRepo",
] as const;

export type CategoryKey = (typeof CATEGORIES_ORDER)[number];

/* ------------------------ Fetch Repos ----------------------------- */

/**
 * Busca repositórios do GitHub marcados como parte do portfólio
 */
export async function getPortfolioRepos(
  user: string = DEFAULT_USER,
  mainTopic: string = "portfolio"
): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=100`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 }, // cache de 1 hora
      }
    );

    if (!res.ok) {
      console.error("GitHub API error:", res.status, res.statusText);
      return [];
    }

    const repos: GitHubRepo[] = await res.json();

    return repos
      .filter(
        (repo) =>
          Array.isArray(repo.topics) && repo.topics.includes(mainTopic)
      )
      .map((repo) => ({
        ...repo,
        description: repo.description ?? null,
        topics: repo.topics ?? [],
        stargazers_count: repo.stargazers_count ?? 0,
      }));
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    return [];
  }
}

/* --------------------- Categorize Repos --------------------------- */

/**
 * Organiza repositórios por categoria (topics)
 */
export function categorizeRepos(
  repos: GitHubRepo[]
): Record<CategoryKey, GitHubRepo[]> {
  const categorized = {} as Record<CategoryKey, GitHubRepo[]>;

  CATEGORIES_ORDER.forEach((category) => {
    categorized[category] = repos
      .filter((repo) => repo.topics?.includes(category))
      .sort((a, b) => {
        const dateA = a.updated_at ? Date.parse(a.updated_at) : 0;
        const dateB = b.updated_at ? Date.parse(b.updated_at) : 0;
        return dateB - dateA;
      });
  });

  return categorized;
}
