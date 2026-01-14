import Link from "next/link";
import type { Locale, Translations } from "@/lib/i18n";
import { BookOpen, ArrowRight, Newspaper, ExternalLink } from "lucide-react";

interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
}

interface Props {
  locale: Locale;
  dict: Translations;
  articles: Article[];
}

export default function ArticlesSection({ locale, dict, articles }: Props) {
  const htmlLangMap = { en: "en-US", es: "es-ES", pt: "pt-BR" };

  return (
    <section
      id="articles"
      role="region"
      aria-labelledby="articles-title"
      lang={htmlLangMap[locale]}
      className="max-w-7xl mx-auto px-6 lg:px-8 py-20 sm:py-32 space-y-16"
    >
      {/* HEADER DA SEÇÃO */}
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 dark:border-blue-800/50">
          <Newspaper size={14} />
          {dict.navigation.articles || "Articles"}
        </div>
        <h2
          id="articles-title"
          className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tighter"
        >
          {dict.sections.articlesTitle}
        </h2>
        <div className="h-2 w-24 bg-blue-600 rounded-full" />
      </div>

      {/* GRID DE ARTIGOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.length > 0 ? (
          articles.map((article) => {
            const isExternal = article.url.startsWith('http');
            return (
              <article
                key={article.id}
                aria-labelledby={`article-${article.id}-title`}
                className="group relative flex flex-col p-8 md:p-10 rounded-[2.5rem] bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50 transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] hover:-translate-y-2 backdrop-blur-sm"
              >
                {/* Background Glow sutil no hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]" />

                <div className="relative z-10">
                  <div className="mb-8 p-4 w-fit rounded-2xl bg-slate-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 group-hover:rotate-3">
                    <BookOpen size={24} />
                  </div>

                  <h3
                    id={`article-${article.id}-title`}
                    className="text-2xl font-black text-slate-900 dark:text-white mb-4 leading-tight tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                  >
                    {article.title}
                  </h3>

                  <p className="text-base text-slate-500 dark:text-slate-400 mb-10 flex-grow leading-relaxed font-medium">
                    {article.description}
                  </p>

                  <Link
                    href={article.url}
                    target={isExternal ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 group/link"
                  >
                    {dict.sections.readArticle}
                    {isExternal ? (
                      <ExternalLink size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                    ) : (
                      <ArrowRight size={14} className="group-hover/link:translate-x-2 transition-transform" />
                    )}
                  </Link>
                </div>
              </article>
            );
          })
        ) : (
          <div className="col-span-full py-24 text-center border-2 border-dashed border-slate-200 dark:border-slate-800/50 rounded-[3rem] bg-slate-50/50 dark:bg-slate-900/20">
            <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest">
              {dict.sections.noArticles}
            </p>
          </div>
        )}
      </div>

      {/* CTA FINAL – REPOSITÓRIO COMPLETO */}
      <div className="text-center pt-12 relative">
         {/* Linha decorativa de fundo */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-slate-100 dark:bg-slate-800 -z-10" />
        
        <Link
          href={`/${locale}/articles`}
          className="inline-flex items-center gap-4 px-10 py-5 rounded-2xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-black text-xs uppercase tracking-[0.3em] hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white transition-all hover:scale-105 shadow-2xl shadow-blue-500/20"
        >
          {dict.projectCategories.articlesRepo}
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
