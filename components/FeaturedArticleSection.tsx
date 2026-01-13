"use client";

import { Dictionary } from "@/lib/i18n";

interface Props {
  dict: Dictionary["sections"];
  article: Dictionary["featuredArticle"];
}

export default function FeaturedArticleSection({ dict, article }: Props) {
  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-900/20 p-8 rounded-3xl border border-blue-100 dark:border-blue-900/30 shadow-sm">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1 space-y-4">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wider">
            {dict.featuredArticle}
          </span>
          <h2 className="text-3xl font-bold leading-tight">
            {article.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {article.description}
          </p>
          
          <div className="flex flex-wrap gap-3 py-2">
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
              {article.award1}
            </span>
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
              {article.award2}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <span className="text-sm font-semibold uppercase text-slate-500">
              {article.readOn}
            </span>
            <a href={article.links.dio} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <img src="/icons/dio.svg" alt="DIO" className="h-6 w-auto dark:invert" />
            </a>
            <a href={article.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <img src="/icons/linkedin.svg" alt="LinkedIn" className="h-6 w-auto" />
            </a>
            <a href={article.links.medium} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <img src="/icons/medium.svg" alt="Medium" className="h-6 w-auto dark:invert" />
            </a>
          </div>
        </div>
        
        {/* Placeholder para uma imagem ou ilustração do artigo */}
        <div className="hidden md:block w-1/3">
          <div className="aspect-video bg-blue-200 dark:bg-blue-800 rounded-2xl flex items-center justify-center text-blue-500 dark:text-blue-300">
             <span className="text-5xl font-bold">📝</span>
          </div>
        </div>
      </div>
    </div>
  );
}
