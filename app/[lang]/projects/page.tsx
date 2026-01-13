import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, type Lang } from "@/lib/mdx";
import CalloutPersistent from "@/components/CalloutPersistent";
import { i18n, getDictionary } from "@/lib/i18n";
import { ArrowRight, BookOpen, Calendar } from "lucide-react";

interface PageProps {
  params: Promise<{ lang: Lang }>;
}

/** 🔎 SEO Dinâmico */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  
  const titles = {
    en: "Case Studies | Sérgio Santos",
    es: "Casos de Estudio | Sérgio Santos",
    pt: "Estudos de Caso | Sérgio Santos",
  };

  return {
    title: titles[lang] || titles.en,
    description: dict.portfolio.description,
    openGraph: {
      images: [`/og-image-${lang}.png`],
    }
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function ProjectsIndex({ params }: PageProps) {
  const { lang } = await params;
  const t = getDictionary(lang);
  
  let projects = [];
  try {
    // Busca todos os arquivos MDX da pasta content/projects/[lang]
    projects = await getAllProjects(lang);
  } catch (error) {
    console.error("Falha ao carregar projetos MDX:", error);
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      {/* Header Minimalista e Focado */}
      <header className="border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-900/10 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-widest mb-4">
            <BookOpen size={18} />
            {lang === 'pt' ? 'Documentação Técnica' : 'Technical Documentation'}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            {t.navigation.projects || "Projects"}
          </h1>
          <p className="mt-6 text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            {lang === 'pt' 
              ? "Análises aprofundadas de arquitetura, desafios de engenharia e resultados de negócio." 
              : "In-depth architecture analysis, engineering challenges, and business outcomes."}
          </p>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-12 space-y-12">
        <CalloutPersistent id={`projects-tip-${lang}`} type="info" lang={lang}>
          {lang === 'pt' ? "Estes são estudos de caso detalhados. Para ver todos os meus repositórios de código, visite a aba GitHub." :
           lang === 'es' ? "Estos son estudios de caso detallados. Para ver mis repositorios, visite la pestaña GitHub." :
           "These are detailed case studies. To see all my code repositories, visit the GitHub tab."}
        </CalloutPersistent>

        {projects.length === 0 ? (
          <div className="py-24 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem]">
            <p className="text-slate-500 dark:text-slate-400 font-medium italic">
              {t.sections.projectsEmpty}
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {projects.map((project) => (
              <article key={project.slug} className="group">
                <Link
                  href={`/${lang}/projects/${project.slug}`}
                  className="block p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/5"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.metadata.title}
                      </h2>
                      {project.metadata.date && (
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/50 px-4 py-1.5 rounded-full">
                          <Calendar size={14} />
                          {project.metadata.date}
                        </div>
                      )}
                    </div>
                    
                    {project.metadata.description && (
                      <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                        {project.metadata.description}
                      </p>
                    )}

                    <div className="pt-4 flex items-center text-blue-600 dark:text-blue-400 font-black text-sm uppercase tracking-wider">
                      <span>{lang === 'pt' ? 'Ler Estudo de Caso' : 'Read Case Study'}</span>
                      <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
