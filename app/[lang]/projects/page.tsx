import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, type Lang } from "@/lib/mdx";
import CalloutPersistent from "@/components/CalloutPersistent";
import { i18n, getDictionary } from "@/lib/i18n";

interface PageProps {
  params: Promise<{ lang: Lang }>;
}

/** 🔎 SEO Dinâmico e Internacionalizado */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  
  const titles = {
    en: "Technical Projects | Sérgio Santos",
    es: "Proyectos Técnicos | Sérgio Santos",
    pt: "Projetos Técnicos | Sérgio Santos",
  };

  return {
    title: titles[lang] || titles.en,
    description: "Portfolio of technical data engineering and software projects.",
  };
}

/** 🚀 Gera os caminhos estáticos para cada idioma no build */
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function ProjectsIndex({ params }: PageProps) {
  // CRÍTICO: No Next.js 15, params DEVE ser aguardado (awaited)
  const { lang } = await params;
  
  // Sincroniza com o seu sistema de dicionários para manter o padrão
  const t = getDictionary(lang);
  
  let projects = [];
  try {
    projects = await getAllProjects(lang);
  } catch (error) {
    console.error("Falha ao carregar projetos MDX:", error);
    // Não quebramos o site, apenas seguimos com lista vazia
  }

  return (
    <main className="container mx-auto max-w-4xl px-6 py-12 md:py-24 space-y-12 min-h-screen">
      <header className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          {t.navigation.projects || "Projects"}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          {t.portfolio.description || "Exploração técnica de repositórios e soluções de engenharia."}
        </p>
      </header>

      {/* Dica persistente - usando os IDs de tradução do seu sistema */}
      <CalloutPersistent id={`projects-tip-${lang}`} type="info" lang={lang}>
        {lang === 'pt' ? "Você pode alternar o idioma a qualquer momento para ver os projetos em outras línguas." :
         lang === 'es' ? "Puedes cambiar el idioma en cualquier momento para ver los proyectos en outros idiomas." :
         "You can switch languages at any time to view the projects in other languages."}
      </CalloutPersistent>

      {projects.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50/50 dark:bg-slate-900/20">
          <p className="text-slate-500 dark:text-slate-400 italic">
            {t.sections.projectsEmpty || "Nenhum projeto disponível no momento."}
          </p>
        </div>
      ) : (
        <div className="grid gap-8">
          {projects.map((project) => (
            <article key={project.slug} className="group relative">
              <Link
                href={`/${lang}/projects/${project.slug}`}
                className="block p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-blue-500 dark:hover:border-blue-400 transition-all shadow-sm hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.metadata.title}
                  </h2>
                  {project.metadata.date && (
                    <time className="text-sm font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                      {project.metadata.date}
                    </time>
                  )}
                </div>
                
                {project.metadata.description && (
                  <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {project.metadata.description}
                  </p>
                )}

                <div className="mt-6 flex items-center text-blue-600 dark:text-blue-400 font-semibold text-sm">
                  <span>Ver detalhes do projeto</span>
                  <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="ArrowRightIcon" />
                    <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
