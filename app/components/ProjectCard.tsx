import { GitHubRepo } from '@/lib/github';

interface Props {
  repo: GitHubRepo;
}

export default function ProjectCard({ repo }: Props) {
  return (
    <article className="w-full sm:w-1/2 lg:w-1/3 p-4 sm:p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <h3 className="font-bold text-[clamp(1rem,2.5vw,1.25rem)] text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 animate-textGradient mb-2">
        {repo.name}
      </h3>
      <p className="text-[clamp(0.875rem,2vw,1rem)] text-gray-600 dark:text-gray-300 mb-4">
        {repo.description || 'Descrição não disponível.'}
      </p>
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ver projeto ${repo.name} no GitHub`}
        className="inline-block px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform duration-300"
      >
        Ver projeto →
      </a>
    </article>
  );
}
