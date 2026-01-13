import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProjectBySlug, type Lang } from "@/lib/mdx";
import CalloutPersistent from "@/components/CalloutPersistent";
import { Metadata } from "next";
import { i18n } from "@/lib/i18n";

interface PageProps {
  params: Promise<{
    lang: Lang;
    slug: string;
  }>;
}

/** 🚀 Gera caminhos estáticos para TODOS os projetos no build */
export async function generateStaticParams() {
  // Nota: Idealmente aqui você buscaria todos os slugs para cada idioma
  // para que a Vercel gere as páginas estáticas instantaneamente.
  return []; 
}

/** 🔎 SEO Dinâmico */
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lang, slug } = await props.params;
  const project = await getProjectBySlug(slug, lang);
  
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.metadata.title} | Sérgio Santos`,
    description: project.metadata.description,
    openGraph: {
      title: project.metadata.title,
      description: project.metadata.description,
      type: "article",
    },
  };
}

const languageTip = {
  en: "Use the LanguageSwitcher to view this project in other languages.",
  es: "Usa el LanguageSwitcher para ver este proyecto en otros idiomas.",
  pt: "Use o LanguageSwitcher para ver este projeto em outros idiomas.",
};

export default async function ProjectPage(props: PageProps) {
  const { slug, lang } = await props.params;
  const project = await getProjectBySlug(slug, lang);

  if (!project) return notFound();

  const htmlLangMap = { en: "en-US", es: "es-ES", pt: "pt-BR" };

  return (
    <main
      lang={htmlLangMap[lang]}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 min-h-screen"
    >
      <article className="space-y-12">
        {/* HEADER TÉCNICO */}
        <header className="space-y-6 border-b border-slate-200 dark:border-slate-800 pb-10">
          <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight text-slate-900 dark:text-white">
            {project.metadata.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
            {project.metadata.date && (
              <time className="text-slate-500 dark:text-slate-400">
                {new Date(project.metadata.date).toLocaleDateString(htmlLangMap[lang], {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </time>
            )}
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs uppercase tracking-widest">
              {lang}
            </span>
          </div>

          {project.metadata.description && (
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed italic">
              {project.metadata.description}
            </p>
          )}
        </header>

        

        {/* CONTEÚDO MDX */}
        <section className="
          prose prose-slate dark:prose-invert 
          prose-technical dark:prose-darkTechnical
          max-w-none 
          prose-headings:scroll-mt-20
          prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800
          prose-img:rounded-2xl prose-img:mx-auto
        ">
          <MDXRemote 
            source={project.content} 
            components={{
              // Permite usar Callouts dentro do seu arquivo .mdx
              Callout: CalloutPersistent 
            }}
          />
        </section>

        {/* FOOTER DA PÁGINA */}
        <footer className="pt-10 border-t border-slate-200 dark:border-slate-800">
          <CalloutPersistent id={`lang-tip-${slug}`} type="info" lang={lang}>
            {languageTip[lang]}
          </CalloutPersistent>
        </footer>
      </article>
    </main>
  );
}
