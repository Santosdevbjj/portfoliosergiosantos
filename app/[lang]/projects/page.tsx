import { Metadata } from "next";
import Link from "next/link";
import { getAllProjects, type Lang } from "@/lib/mdx";
import CalloutPersistent from "@/components/CalloutPersistent";
import { i18n, getDictionary } from "@/lib/i18n";
import { ArrowRight, BookOpen, Calendar, Rocket } from "lucide-react";

interface PageProps {
  params: Promise<{ lang: Lang }>;
}

/** 🔎 SEO Dinâmico: Sincronizado com o Dicionário */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getDictionary(lang);
  
  return {
    title: `${t.sections.featuredProjects} | Sérgio Santos`,
    description: t.portfolio.description,
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
  const t = await getDictionary(lang);
  
  let projects = [];
  try {
    projects = await getAllProjects(lang);
  } catch (error) {
    console.error("Erro ao carregar projetos MDX:", error);
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 pt-20">
      {/* Header com Foco em Autoridade Técnica */}
      <header className="border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-900/10 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 font-black text-xs uppercase tracking-[0.2em] mb-6">
            <Rocket size={16} />
            {lang === 'pt' ? 'Portfólio de Engenharia' : lang === 'es' ? 'Portafolio de Ingeniería' : 'Engineering Portfolio'}
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
            {t.sections.featuredProjects}
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed font-medium">
            {t.portfolio.description}
          </p>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-12 space-y-16">
        {/* Callout para guiar o usuário entre Estudos de Caso vs GitHub */}
        <CalloutPersistent id={`projects-tip-${lang}`} type="info" lang={lang}>
          {lang === 'pt' ? "Estes são estudos de caso detalhados. Para ver o código-fonte de todos os meus repositórios, visite a " :
           lang === 'es' ? "Estos son estudios de caso detallados. Para ver el código de mis repositorios, visite la " :
           "These are detailed case studies. To see the source code for all my repositories, visit the "}
           <Link href={`/${lang}/projects/list`} className="font-bold underline decoration-blue-500 underline-offset-4">
             {lang === 'pt' ? "Lista de Repositórios" : lang === 'es' ? "Lista de Repositorios" : "Repository List"}
           </Link>.
        </CalloutPersistent>

        {projects.length === 0 ? (
          <div className="py-24 text-center border-2 border-dashed border-slate-200 dark:border-slate-800/50 rounded-[2.5rem] bg-slate-50/50 dark:bg-slate-900/5">
            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-sm animate-pulse">
              {t.common.loading}
            </p>
          </div>
        ) : (
          <div className="grid gap-8">
            {projects.map((project, index) => (
              <article key={project.slug} className="group animate-reveal" style={{ animationDelay: `${index * 100}ms` }}>
                <Link
                  href={`/${lang}/projects/${project.slug}`}
                  className="block p-8 md:p-12 rounded-[2.5rem] border border-slate-200 dark:border-slate-800/50 bg-white dark:bg-slate-900/20 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1"
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black text-[10px] uppercase tracking-widest bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-lg">
                        <BookOpen size={12} />
                        Case Study
                      </div>
                      {project.metadata.date && (
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500">
                          <Calendar size={14} />
                          {project.metadata.date}
                        </div>
                      )}
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.metadata.title}
                    </h2>
                    
                    {project.metadata.description && (
                      <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium line-clamp-3">
                        {project.metadata.description}
                      </p>
                    )}

                    <div className="pt-4 flex items-center text-blue-600 dark:text-blue-400 font-black text-xs uppercase tracking-[0.2em]">
                      <span>{lang === 'pt' ? 'Analisar Solução' : lang === 'es' ? 'Analizar Solución' : 'Analyze Solution'}</span>
                      <ArrowRight className="ml-3 w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
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
