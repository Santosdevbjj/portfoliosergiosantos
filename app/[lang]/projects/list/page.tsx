import { getDictionary, type Locale, i18n } from "@/lib/i18n";
import ProjectCard from "@/components/ProjectCard";
import { getPortfolioRepos, type GitHubRepo } from "@/lib/github";
import { Metadata } from "next";

interface PageProps {
  // CRÍTICO: Params agora é uma Promise no Next.js 15
  params: Promise<{ lang: Locale }>;
}

/** 🔎 SEO Dinâmico */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  
  return {
    title: `${dict.sections.projectsTitle} | Sérgio Santos`,
    description: dict.portfolio.description,
    openGraph: {
      images: [`/og-image-${lang}.png`],
    }
  };
}

/** 🚀 Pré-renderização estática dos idiomas */
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function ProjectsListPage({ params }: PageProps) {
  // Aguarda os parâmetros antes de usá-los
  const { lang: locale } = await params;
  const dict = getDictionary(locale);
  
  let projects: GitHubRepo[] = [];
  try {
    const repos = await getPortfolioRepos();
    // Transforma o objeto de categorias em uma lista única e plana (Flatten)
    // Isso garante que todos os seus repositórios do GitHub apareçam nesta lista
    projects = Object.values(repos).flat();
  } catch (error) {
    console.error("Erro ao buscar projetos para a listagem:", error);
  }

  // Mapeamento de localidade para o atributo HTML lang
  const htmlLangMap = { en: "en-US", es: "es-ES", pt: "pt-BR" };

  return (
    <main
      lang={htmlLangMap[locale]}
      className="container mx-auto max-w-6xl px-6 lg:px-8 py-12 md:py-24 space-y-12 min-h-screen"
    >
      <header className="text-center space-y-6">
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
          {dict.sections.projectsTitle}
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {dict.sections.projectsSubtitle || "Exploração técnica de repositórios e soluções de engenharia de dados."}
        </p>
      </header>

      <section aria-labelledby="projects-grid-title">
        {/* h2 oculto apenas para leitores de tela (SEO/Acessibilidade) */}
        <h2 id="projects-grid-title" className="sr-only">
          {dict.sections.projectsGridTitle || "Galeria de Projetos"}
        </h2>

        {projects.length === 0 ? (
          <div className="text-center py-24 bg-slate-50/50 dark:bg-slate-900/20 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 italic text-lg">
              {dict.sections.noProjectsFound || "Nenhum projeto encontrado no GitHub."}
            </p>
          </div>
        ) : (
          /* Grid responsivo: 1 coluna mobile, 2 tablet, 3 desktop */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((repo) => (
              <ProjectCard
                key={repo.id}
                repo={repo}
                dict={dict}
                lang={locale}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
