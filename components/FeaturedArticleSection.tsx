import { Dictionary } from "@/lib/i18n";
import { Award, ExternalLink, Newspaper, Share2 } from "lucide-react";

interface Props {
  dict: Dictionary["sections"];
  article: Dictionary["featuredArticle"];
}

export default function FeaturedArticleSection({ dict, article }: Props) {
  return (
    <section
      aria-labelledby="featured-heading"
      aria-describedby="featured-description"
      className="
        w-full overflow-hidden
        rounded-[3rem]
        border border-slate-200 dark:border-slate-800/60
        bg-white dark:bg-slate-900/40
        shadow-2xl shadow-blue-500/5
        backdrop-blur-sm
        transition-all duration-700
        hover:border-blue-500/40
        group
      "
    >
      <div className="flex flex-col md:flex-row min-h-[380px]">
        {/* ================= CONTEÚDO TEXTUAL ================= */}
        <div className="flex-1 p-6 sm:p-10 md:p-16 space-y-8 flex flex-col justify-center">
          {/* Badge */}
          <div className="flex items-center gap-3">
            <span
              className="
                inline-flex items-center gap-2
                px-4 py-2
                rounded-xl
                bg-blue-600 text-white
                text-[10px] font-black
                uppercase tracking-[0.3em]
                shadow-lg shadow-blue-500/20
              "
            >
              <Award size={14} aria-hidden className="animate-pulse" />
              {dict.featuredArticle}
            </span>
          </div>

          {/* Título e descrição */}
          <div className="space-y-4 max-w-3xl">
            <h2
              id="featured-heading"
              className="
                text-[clamp(2rem,4vw,3rem)]
                font-black
                tracking-tighter
                leading-[1.1]
                text-slate-900 dark:text-white
              "
            >
              {article.title}
            </h2>

            <p
              id="featured-description"
              className="
                text-[clamp(1.05rem,2.5vw,1.25rem)]
                font-medium
                leading-relaxed
                text-slate-500 dark:text-slate-400
              "
            >
              {article.description}
            </p>
          </div>

          {/* Awards */}
          {([article.award1, article.award2].filter(Boolean).length > 0) && (
            <div className="flex flex-wrap gap-3">
              {[article.award1, article.award2]
                .filter(Boolean)
                .map((award, i) => (
                  <div
                    key={i}
                    className="
                      flex items-center gap-2
                      px-4 py-2
                      rounded-xl
                      text-[10px] font-black
                      uppercase tracking-widest
                      text-amber-600 dark:text-amber-500
                      bg-amber-50 dark:bg-amber-900/20
                      border border-amber-100 dark:border-amber-900/30
                    "
                  >
                    <Award size={12} aria-hidden />
                    {award}
                  </div>
                ))}
            </div>
          )}

          {/* Links */}
          <div className="pt-8 border-t border-slate-100 dark:border-slate-800/50 flex flex-col gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
              {article.readOn}
            </span>

            <div className="flex flex-wrap gap-4">
              {[
                { name: "DIO", url: article.links.dio },
                { name: "LinkedIn", url: article.links.linkedin },
                { name: "Medium", url: article.links.medium },
              ]
                .filter((l) => Boolean(l.url))
                .map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${dict.featuredArticle} - ${platform.name}`}
                    className="
                      flex items-center gap-2
                      px-4 py-2
                      rounded-xl
                      text-xs font-bold
                      bg-slate-50 dark:bg-slate-800/50
                      text-slate-600 dark:text-slate-300
                      border border-transparent
                      transition-all
                      hover:border-slate-200 dark:hover:border-slate-700
                      hover:text-blue-600
                      focus-visible:outline-none
                      focus-visible:ring-2 focus-visible:ring-blue-500
                    "
                  >
                    {platform.name}
                    <ExternalLink size={14} className="opacity-50" />
                  </a>
                ))}
            </div>
          </div>
        </div>

        {/* ================= ÁREA VISUAL ================= */}
        <div
          className="
            relative
            w-full md:w-[38%]
            p-10 md:p-12
            flex items-center justify-center
            bg-slate-50 dark:bg-slate-900/50
            border-t md:border-t-0 md:border-l
            border-slate-100 dark:border-slate-800/50
            overflow-hidden
          "
        >
          {/* Fundo decorativo */}
          <div
            aria-hidden
            className="
              absolute inset-0
              opacity-[0.05] dark:opacity-[0.08]
              transition-transform duration-[2000ms]
              group-hover:scale-150
            "
            style={{
              backgroundImage:
                "radial-gradient(#3b82f6 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Card */}
          <div
            className="
              relative z-10
              w-full max-w-[220px]
              aspect-square
              rounded-[2.5rem]
              bg-white dark:bg-slate-900
              border border-slate-100 dark:border-slate-800
              shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)]
              flex flex-col items-center justify-center p-8
              transform transition-all duration-700
              group-hover:-rotate-3 group-hover:scale-105
            "
          >
            <div className="p-5 rounded-[2rem] bg-blue-50 dark:bg-blue-900/20 mb-6">
              <Newspaper size={48} className="text-blue-600" aria-hidden />
            </div>

            <div className="space-y-2 w-full">
              <div className="h-2 w-24 bg-slate-100 dark:bg-slate-800 rounded-full mx-auto" />
              <div className="h-2 w-16 bg-slate-100 dark:bg-slate-800 rounded-full opacity-50 mx-auto" />
            </div>

            {/* Selo */}
            <div
              aria-hidden
              className="
                absolute -top-4 -right-4
                h-14 w-14
                rounded-2xl
                bg-blue-600 text-white
                flex items-center justify-center
                shadow-2xl shadow-blue-500/40
                rotate-12
                transition-transform duration-500
                group-hover:rotate-[25deg]
              "
            >
              <Share2 size={24} />
            </div>
          </div>

          {/* Glow lateral */}
          <div
            aria-hidden
            className="
              absolute -right-20 top-1/2 -translate-y-1/2
              w-40 h-80
              bg-blue-600/10
              blur-[100px]
            "
          />
        </div>
      </div>
    </section>
  );
}
