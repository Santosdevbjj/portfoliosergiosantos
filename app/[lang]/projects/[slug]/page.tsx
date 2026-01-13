// app/[lang]/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProjectBySlug, type Lang } from "@/lib/mdx";
import CalloutPersistent from "@/components/CalloutPersistent";
import { Metadata } from "next";

interface PageProps {
  params: {
    lang: Lang;
    slug: string;
  };
}

// Otimização de SEO Dinâmico
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug, params.lang);
  if (!project) return { title: "Projeto não encontrado" };

  return {
    title: `${project.metadata.title} | Sérgio Santos`,
    description: project.metadata.description,
  };
}

const languageTip: Record<Lang, string> = {
  en: "Use the LanguageSwitcher to view this project in other languages.",
  es: "Usa el LanguageSwitcher para ver este proyecto en otros idiomas.",
  pt: "Use o LanguageSwitcher para ver este projeto em outros idiomas.",
};

export default async function ProjectPage({ params }: PageProps) {
  const { slug, lang } = params;
  const project = await getProjectBySlug(slug, lang);

  if (!project) {
    return notFound();
  }

  const htmlLangMap = {
    en: "en-US",
    es: "es-ES",
    pt: "pt-BR",
  };

  return (
    <main
      role="main"
      lang={htmlLangMap[lang]}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16"
    >
      <article
        aria-labelledby="project-title"
        className="space-y-10"
      >
        {/* HEADER - Foco em Hierarquia Visual */}
        <header className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-8">
          <h1
            id="project-title"
            className="
              font-extrabold
              text-[clamp(1.85rem,5vw,3.5rem)]
              leading-tight
              tracking-tight
              text-slate-900 dark:text-white
            "
          >
            {project.metadata.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            {project.metadata.date && (
              <time dateTime={project.metadata.date.toString()}>
                {new Date(project.metadata.date).toLocaleDateString(htmlLangMap[lang], {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            )}
            <span className="hidden sm:inline">•</span>
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded text-xs font-medium uppercase tracking-widest">
              {lang}
            </span>
          </div>

          {project.metadata.description && (
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-4xl leading-relaxed">
              {project.metadata.description}
            </p>
          )}
        </header>

        {/* CALLOUT DE IDIOMA - Posicionamento Estratégico */}
        <div className="my-6">
          <CalloutPersistent
            id={`lang-tip-${slug}`}
            type="info"
            lang={lang}
          >
            {languageTip[lang]}
          </CalloutPersistent>
        </div>

        {/* CONTEÚDO MDX - Tipografia Técnica */}
        <section
          className="
            prose prose-slate dark:prose-invert 
            prose-headings:font-bold 
            prose-a:text-blue-600 dark:prose-a:text-blue-400
            prose-img:rounded-xl prose-img:shadow-lg
            max-w-none 
            break-words
          "
          aria-label="Project technical content"
        >
          <MDXRemote source={project.content} />
        </section>
      </article>
    </main>
  );
}
