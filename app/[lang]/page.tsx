import { Metadata } from "next";
import PageWrapper from "@/components/PageWrapper";
import HeroSection from "@/components/HeroSection";
import FeaturedProject from "@/components/FeaturedProject";
import ProjectsSection from "@/components/ProjectsSection";
import FeaturedArticleSection from "@/components/FeaturedArticleSection";
import AboutSection from "@/components/AboutSection";
import { getDictionary } from "@/lib/i18n";
import {
  getPortfolioRepos,
  CATEGORIES_ORDER,
  type GitHubRepo,
} from "@/lib/github";

/**
 * CONFIGURAÇÕES DE PERFORMANCE - NEXT.JS 15
 * revalidate: 3600 -> ISR (Incremental Static Regeneration)
 * O site é estático, mas o Next.js tenta atualizar os dados do GitHub em background 1x por hora.
 */
export const revalidate = 3600;

interface Props {
  params: Promise<{ lang: "pt" | "en" | "es" }>;
}

/** * 🔎 SEO DINÂMICO
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = getDictionary(lang);
  
  return {
    title: `Sérgio Santos | ${t.navigation.home}`,
    description: t.meta.description, // Usando a descrição centralizada no i18n
    openGraph: {
      title: `Sérgio Santos | ${t.navigation.home}`,
      description: t.meta.description,
      images: [`/og-image-${lang}.png`],
      type: "website",
      locale: lang === "en" ? "en_US" : lang === "es" ? "es_ES" : "pt_BR",
    },
  };
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  const t = getDictionary(lang);

  // Busca segura dos repositórios categorizados
  let repos: Record<string, GitHubRepo[]> = {};
  
  try {
    // getPortfolioRepos já retorna o objeto Record<CategoryKey, GitHubRepo[]>
    repos = await getPortfolioRepos();
  } catch (error) {
    console.error("Falha ao carregar repositórios do GitHub:", error);
  }

  // Verifica se há pelo menos um projeto em qualquer categoria
  const hasProjects = Object.values(repos).some(
    (categoryList) => categoryList && categoryList.length > 0
  );

  return (
    <PageWrapper lang={lang}>
      {/* Hero Section: Primeira dobra do site */}
      <HeroSection dict={t} lang={lang} />

      <main role="main" className="space-y-24 md:space-y-32 pb-20">
        
        {/* Perfil Profissional (Integrando o About do Bradesco/Experiência) */}
        <AboutSection locale={lang} />

        {/* Case de Sucesso: Projeto de Predição de Risco (Destaque manual) */}
        <section className="bg-slate-50 dark:bg-slate-900/30 py-16 md:py-24">
          <FeaturedProject dict={t} />
        </section>

        {/* Autoridade Técnica: Artigo Premiado na DIO */}
        <section 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" 
          aria-labelledby="featured-article-title"
        >
          <FeaturedArticleSection dict={t.sections} article={t.featuredArticle} />
        </section>

        {/* Portfólio de Engenharia: Dados dinâmicos do GitHub */}
        <section 
          id="projects"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24" 
          aria-labelledby="projects-title"
        >
          <div className="text-center md:text-left mb-16">
             <h2 id="projects-title" className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                {t.sections.projectsTitle}
             </h2>
             <div className="h-1.5 w-20 bg-blue-600 mt-4 mx-auto md:mx-0 rounded-full" />
             <p className="mt-6 text-slate-600 dark:text-slate-400 max-w-2xl text-lg">
                {t.portfolio.description}
             </p>
          </div>

          {!hasProjects ? (
            /* Fallback visual se a API falhar ou não houver tags 'portfolio' */
            <div className="py-24 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] bg-slate-50/50 dark:bg-slate-900/10">
              <p className="text-slate-400 text-lg font-medium">
                {t.sections.projectsEmpty || "Conectando ao GitHub..."}
              </p>
            </div>
          ) : (
            /* Renderiza as categorias conforme a CATEGORIES_ORDER */
            <div className="space-y-32">
              {CATEGORIES_ORDER.map((key) => {
                const projects = repos[key];
                const categoryTitle = t.projectCategories[key];

                // Só renderiza a seção se houver projetos para aquela categoria
                if (!projects || projects.length === 0) return null;

                return (
                  <div key={key} className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
                    <ProjectsSection 
                      title={categoryTitle || key}
                      projects={projects}
                      lang={lang}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </PageWrapper>
  );
}
