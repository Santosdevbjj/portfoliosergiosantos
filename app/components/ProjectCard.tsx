"use client";

import { GitHubRepo } from "../../lib/github";

type Props = {
  repo: GitHubRepo;
};

export default function ProjectCard({ repo }: Props) {
  return (
    <article className="border rounded-lg p-4 hover:shadow-md transition">
      <h3 className="text-lg font-semibold">{repo.name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {repo.description}
      </p>

      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline mt-2 inline-block"
      >
        Ver projeto →
      </a>
    </article>
  );
}
