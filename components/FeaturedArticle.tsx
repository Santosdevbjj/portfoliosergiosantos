"use client";

import { DEFAULT_LOCALE, getDictionary, Locale } from "@/lib/i18n";
import { useMemo } from "react";
import Link from "next/link";

interface Props {
  locale?: Locale;
}

export default function FeaturedArticle({ locale = DEFAULT_LOCALE }: Props) {
  const dict = useMemo(() => getDictionary(locale), [locale]);
  const links = dict.featuredArticle.links;

  return (
    <section
      id="featured-article"
      role="region"
      aria-labelledby="featured-article-title"
      lang={locale === "en" ? "en-US" : locale === "es" ? "es-ES" : "pt-BR"}
      className="container mx-auto max-w-5xl px-4 lg:px-8 py-10 sm:py-16 space-y-6 sm:space-y-8 bg-surface-light dark:bg-surface-dark transition-colors duration-300 text-center"
    >
      {/* Título multilíngue */}
      <h2
        id="featured-article-title"
        className="font-bold text-[clamp(1.75rem,3vw+1rem,2.5rem)] text-gray-900 dark:text-gray-100"
      >
        {dict.sections.featuredArticle}
      </h2>

      {/* Subtítulo */}
      <p className="text-[clamp(1rem,2.5vw,1.25rem)] text-gray-700 dark:text-gray-300 leading-relaxed">
        {dict.featuredArticle.title}
      </p>

      {/* Descrição */}
      <p className="text-[clamp(0.875rem,2vw,1rem)] text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
        {dict.featuredArticle.description}
      </p>

      {/* Prêmios */}
      <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-purple-600 dark:text-purple-400">
        <span>{dict.featuredArticle.award1}</span>
        <span>{dict.featuredArticle.award2}</span>
      </div>

      {/* Botões das plataformas */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {/* Botão DIO */}
        {links.dio && (
          <Link
            href={links.dio}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir artigo na DIO"
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform duration-300"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
            </svg>
            DIO
          </Link>
        )}

        {/* Botão LinkedIn */}
        {links.linkedin && (
          <Link
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir artigo no LinkedIn"
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:scale-105 transition-transform duration-300"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.98 3.5C4.98 4.9 3.9 6 2.5 6S0 4.9 0 3.5 1.1 1 2.5 1s2.48 1.1 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.1c.5-1 1.8-2.2 3.7-2.2 4 0 4.7 2.6 4.7 6V24h-4v-7.9c0-1.9-.1-4.3-2.6-4.3-2.6 0-3 2-3 4.1V24h-4V8z" />
            </svg>
            LinkedIn
          </Link>
        )}

        {/* Botão Medium */}
        {links.medium && (
          <Link
            href={links.medium}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir artigo no Medium"
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-black text-white font-semibold hover:scale-105 transition-transform duration-300"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2 4v16h20V4H2zm18 14H4V6h16v12z" />
            </svg>
            Medium
          </Link>
        )}
      </div>
    </section>
  );
}
