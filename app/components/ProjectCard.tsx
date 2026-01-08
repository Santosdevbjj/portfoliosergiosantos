import { GitHubRepo } from '@/lib/github';

interface Props {
  repo: GitHubRepo;
}

export default function ProjectCard({ repo }: Props) {
  return (
    <article className="p-4 rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br hover:from-purple-400 hover:to-pink-400">
      <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 animate-textGradient mb-2">
        {repo.name}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{repo.description || 'Descrição não disponível.'}</p>
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform duration-300"
      >
        Ver projeto →
      </a>
    </article>
  );
}
