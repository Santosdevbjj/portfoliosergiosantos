import { notFound } from 'next/navigation';
import { getPortfolioRepos, GitHubRepo } from '@/lib/github';
import { getDictionary, TECHNOLOGY_ORDER } from '@/lib/i18n';
import ProjectSection from '../components/ProjectSection';
import PageWrapper from '../components/PageWrapper';

interface PageProps {
  params: { lang: string };
}

const SUPPORTED_LANGS = ['pt', 'en'] as const;

export default async function Page({ params }: PageProps) {
  const { lang } = params;

  if (!SUPPORTED_LANGS.includes(lang as any)) {
    notFound();
  }

  const [repos, dict] = await Promise.all([getPortfolioRepos(), getDictionary(lang)]);

  return (
    <PageWrapper>
      <section
        lang={lang === "en" ? "en-US" : "pt-BR"}
        aria-label={lang === "en" ? "Portfolio projects" : "Projetos do portfólio"}
        className="container mx-auto px-4 lg:px-8 py-8 sm:py-12 space-y-6 sm:space-y-8"
      >
        <header className="space-y-4">
          <h1 className="font-bold text-[clamp(2rem,3vw+1rem,4rem)] text-gray-900 dark:text-gray-100">
            {dict.portfolio.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl text-[clamp(1rem,2.5vw,1.25rem)] leading-relaxed">
            {dict.portfolio.description}
          </p>
        </header>

        {TECHNOLOGY_ORDER.map((tech) => {
          const filteredRepos = repos.filter((r: GitHubRepo) => r.topics?.includes(tech));
          if (!filteredRepos.length) return null;

          const fallbackTitle = tech
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase());

          return (
            <ProjectSection
              key={tech}
              title={dict.categories?.[tech] ?? fallbackTitle}
              repos={filteredRepos}
            />
          );
        })}
      </section>
    </PageWrapper>
  );
}
