import { Metadata } from "next";
import Link from "next/link";
import { getAllProjects, type Lang } from "@/lib/mdx"; // Certifique-se que este arquivo existe
import CalloutPersistent from "@/components/CalloutPersistent";
import { i18n } from "@/lib/i18n";

interface PageProps {
  params: { lang: Lang };
}

/** 🔎 SEO Dinâmico para a Listagem de Projetos */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const titles = {
    en: "Technical Projects | Sérgio Santos",
    es: "Proyectos Técnicos | Sérgio Santos",
    pt: "Projetos Técnicos | Sérgio Santos",
  };
  return {
    title: titles[params.lang] || titles.en,
  };
}

/** 🚀 Gera os caminhos estáticos para build ultra-rápido */
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function ProjectsIndex({ params }: PageProps) {
  const { lang } = params;
  
  // Tratamento de erro preventivo para o build
  let projects = [];
  try {
    projects = await getAllProjects(lang);
  } catch (error) {
    console.error("Falha ao carregar projetos MDX:", error);
  }

  const translations = {
    title: { en: "Projects", es: "Proyectos", pt: "Projetos" },
    desc: {
      en: "A curated list of technical projects with detailed documentation.",
      es: "Una lista curada de proyectos técnicos con documentación detallada.",
      pt: "Uma lista curada de projetos técnicos com documentação detalhada.",
    },
    empty: {
      en: "No projects available at the moment.",
      es: "No hay proyectos disponibles en este momento.",
      pt: "Nenhum projeto disponível no momento.",
    },
    tip: {
      en: "You can switch languages at any time to view the projects in other languages.",
      es: "Puedes cambiar el idioma en cualquier momento para ver los proyectos en otros idiomas.",
      pt: "Você pode alternar o idioma a qualquer momento para ver os projetos em outros idiomas.",
    }
  };

  return (
    <section className="container mx-auto max-w-4xl py-10 space-y-8 min-h-screen">
      <header className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
          {translations.title[lang]}
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          {translations.desc[lang]}
        </p>
      </header>

      <CalloutPersistent id={`projects-tip-${lang}`} type="info" lang={lang}>
        {translations.tip[lang]}
      </CalloutPersistent>

      {projects.length === 0 ? (
        <div className="py-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
          <p className="text-slate-600 dark:text-slate-300">
            {translations.empty[lang]}
          </p>
        </div>
      ) : (
        <ul className="space-y-6">
          {projects.map((project) => (
            <li key={project.slug} className="pb-6 border-b border-slate-200 dark:border-slate-700">
              <article>
                <Link
                  href={`/${lang}/projects/${project.slug}`}
                  className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-md"
                >
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {project.metadata.title}
                  </h2>
                  <div className="flex gap-4 items-center mt-1">
                    {project.metadata.date && (
                      <time className="text-sm text-slate-500 dark:text-slate-400">
                        {project.metadata.date}
                      </time>
                    )}
                  </div>
                  {project.metadata.description && (
                    <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">
                      {project.metadata.description}
                    </p>
                  )}
                </Link>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
