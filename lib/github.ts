// lib/github.ts

export type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  topics: string[];
};

const GITHUB_USER = "Santosdevbjj";
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`;

/**
 * Busca repositórios públicos do GitHub marcados como "portfolio"
 * Executa no servidor com cache (ISR)
 */
export async function getPortfolioRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(GITHUB_API_URL, {
      headers: {
        Accept: "application/vnd.github.mercy-preview+json",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error("GitHub API error:", res.status, res.statusText);
      return [];
    }

    const repos: GitHubRepo[] = await res.json();

    return repos
      .filter(
        (repo) =>
          Array.isArray(repo.topics) &&
          repo.topics.includes("portfolio")
      )
      .map((repo) => ({
        ...repo,
        description: repo.description ?? "",
        topics: repo.topics ?? [],
      }));
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    return [];
  }
}
