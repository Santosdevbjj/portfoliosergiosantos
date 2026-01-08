export type GitHubRepo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  topics: string[];
};

const GITHUB_USER = "Santosdevbjj";

export async function getPortfolioRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 3600 },
    }
  );

  const repos: GitHubRepo[] = await res.json();

  return repos.filter((repo) => repo.topics.includes("portfolio"));
}
