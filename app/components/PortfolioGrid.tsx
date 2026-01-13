"use client";

import { useEffect, useState } from "react";
import {
  getPortfolioRepos,
  CATEGORIES_ORDER,
  type GitHubRepo,
} from "@/lib/github";
import { translations, type Locale } from "@/lib/i18n";

type CategoryKey = (typeof CATEGORIES_ORDER)[number];

interface PortfolioGridProps {
  lang: Locale;
}

export default function PortfolioGrid({ lang }: PortfolioGridProps) {
  const dict = translations[lang];

  const [reposByCategory, setReposByCategory] = useState<
    Record<CategoryKey, GitHubRepo[]>
  >({} as Record<CategoryKey, GitHubRepo[]>);

  const [activeCategory, setActiveCategory] = useState<CategoryKey>(
    CATEGORIES_ORDER[0]
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      setLoading(true);
      const categorized = await getPortfolioRepos();
      setReposByCategory(categorized as Record<CategoryKey, GitHubRepo[]>);
      setLoading(false);
    }
    fetchRepos();
  }, []);

  const descriptionFallback =
    lang === "en"
      ? "Description not available."
      : lang === "es"
      ? "Descripción no disponible."
      : "Descrição não disponível.";

  const emptyCategoryMessage =
    lang === "en"
      ? "No projects in this category."
      : lang === "es"
      ? "No hay proyectos en esta categoría."
      : "Nenhum projeto nesta categoria.";

  return (
    <section
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      aria-labelledby="portfolio-title"
    >
      <h2
        id="portfolio-title"
        className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6"
      >
        {dict.sections.projectsTitle}
      </h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
        {CATEGORIES_ORDER.map((category) => {
          const label = dict.projectCategories[category] ?? category;
          const isActive = activeCategory === category;

          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              aria-pressed={isActive}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-600 text-white dark:bg-indigo-500"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Conteúdo */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4"
            >
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4" />
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2" />
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-4" />
            </div>
          ))}
        </div>
      ) : reposByCategory[activeCategory]?.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {reposByCategory[activeCategory].map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition p-4"
              aria-label={`Open repository ${repo.name} on GitHub`}
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                {repo.name}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
                {repo.description || descriptionFallback}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{repo.language ?? "N/A"}</span>
                <span>⭐ {repo.stargazers_count ?? 0}</span>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          {emptyCategoryMessage}
        </p>
      )}
    </section>
  );
}
