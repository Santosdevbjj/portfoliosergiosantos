import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProjectBySlug, type Lang } from "@/lib/mdx";
import CalloutPersistent from "@/components/CalloutPersistent";

interface PageProps {
  params: {
    lang: Lang;
    slug: string;
  };
}

const languageTip: Record<Lang, string> = {
  en: "Use the LanguageSwitcher to view this project in other languages.",
  es: "Usa el LanguageSwitcher para ver este proyecto en otros idiomas.",
  pt: "Use o LanguageSwitcher para ver este projeto em outros idiomas.",
};

export default async function ProjectPage({ params }: PageProps) {
  const project = await getProjectBySlug(params.slug, params.lang);

  if (!project) {
    return notFound();
  }

  const htmlLang =
    params.lang === "en"
      ? "en-US"
      : params.lang === "es"
      ? "es-ES"
      : "pt-BR";

  return (
    <main
      role="main"
      lang={htmlLang}
      className="max-w-5xl mx-auto px-4 lg:px-8 py-12"
    >
      <article
        aria-labelledby="project-title"
        className="space-y-8"
      >
        {/* HEADER */}
        <header className="space-y-3">
          <h1
            id="project-title"
            className="
              font-bold
              text-[clamp(2rem,4vw,3rem)]
              animate-textGradient
            "
          >
            {project.metadata.title}
          </h1>

          {project.metadata.date && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {project.metadata.date}
            </p>
          )}

          {project.metadata.description && (
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl">
              {project.metadata.description}
            </p>
          )}
        </header>

        {/* CALLOUT DE IDIOMA */}
        <CalloutPersistent
          id={`lang-tip-${params.slug}`}
          type="info"
          lang={params.lang}
        >
          {languageTip[params.lang]}
        </CalloutPersistent>

        {/* CONTEÚDO MDX */}
        <section
          className="prose prose-technical dark:prose-darkTechnical max-w-none"
          aria-label="Project technical content"
        >
          <MDXRemote source={project.content} />
        </section>
      </article>
    </main>
  );
}
