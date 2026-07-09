import { Repos } from "../types/types";

const BASE_URL = "https://api.github.com";
function getHeaders() {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}
export async function searchRepositories(query: string, page = "1") {
  const res = await fetch(
    `${BASE_URL}/search/repositories?q=${encodeURIComponent(query)}&page=${page}&per_page=12`,
    { headers: getHeaders() },
  );

  return res.json();
}

export async function repositoryDetails(owner: string, repo: string) {
  const res = await fetch(`${BASE_URL}/repos/${owner}/${repo}`, {
    headers: getHeaders(),
  });
  return res.json();
}

type LanguageBytes = Record<string, number>;

interface LanguageBreakdown {
  language: string;
  bytes: number;
  percent: number;
}

export async function getLanguageBreakdown(
  owner: string,
  repo: string,
): Promise<LanguageBreakdown[]> {
  const res = await fetch(`${BASE_URL}/repos/${owner}/${repo}/languages`, {
    headers: getHeaders(),
  });
  const bytes: LanguageBytes = await res.json();

  const total = Object.values(bytes).reduce((sum, b) => sum + b, 0);

  return Object.entries(bytes)
    .map(
      ([lang, count]): LanguageBreakdown => ({
        language: lang,
        bytes: count,
        percent: +((count / total) * 100).toFixed(1),
      }),
    )
    .sort((a, b) => b.bytes - a.bytes);
}

export async function getLanguages(owner: string, repo: string) {
  const res = await fetch(`${BASE_URL}/repos/${owner}/${repo}/languages`, {
    headers: getHeaders(),
  });
  const data = await res.json();
  const languages = Object.keys(data);
  return languages;
}

export async function getReposIssues(
  owner: string,
  repo: string,
  options?: {
    state?: string;
    labels?: string;
    assignee?: string;
    sort?: string;
    direction?: string;
    page?: string;
  },
) {
  const params = new URLSearchParams({
    per_page: "12",
    sort: "created",
    direction: "desc",
    state: "all",
  });

  if (options?.state) params.set("state", options.state);
  if (options?.labels) params.set("labels", options.labels);
  if (options?.assignee) params.set("assignee", options.assignee);
  if (options?.sort) params.set("sort", options.sort);
  if (options?.direction) params.set("direction", options.direction);
  if (options?.page) params.set("page", options.page);

  const res = await fetch(
    `${BASE_URL}/repos/${owner}/${repo}/issues?${params.toString()}`,
    { headers: getHeaders(), next: { revalidate: 60 } },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch issues: ${res.status}`);
  }

  const data = await res.json();
  const issues = data.filter((item: Repos) => !("pull_request" in item));
  return issues;
}

export async function getAllissues(repo: string, owner: string) {
  const res = await fetch(
    `${BASE_URL}/search/issues?q=repo:${owner}/${repo}+type:issue`,
    {
      headers: getHeaders(),
      next: { revalidate: 60 },
    },
  );
  return await res.json();
}

export async function getOpenIssuesCount(owner: string, repo: string) {
  const query = encodeURIComponent(
    `repo:${owner}/${repo} type:issue state:open`,
  );

  const res = await fetch(`${BASE_URL}/search/issues?q=${query}`, {
    headers: getHeaders(),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`GitHub API Error: ${res.status}`);
  }

  const data = await res.json();

  return data.total_count;
}

export async function getCloseIssuesCount(owner: string, repo: string) {
  const query = encodeURIComponent(
    `repo:${owner}/${repo} is:issue state:closed`,
  );

  const res = await fetch(`${BASE_URL}/search/issues?q=${query}`, {
    headers: getHeaders(),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`GitHub API Error: ${res.status}`);
  }

  const data = await res.json();
  return data.total_count;
}

export async function getLabelsList(owner: string, repo: string) {
  const res = await fetch(`${BASE_URL}/repos/${owner}/${repo}/labels`, {
    headers: getHeaders(),
  });
  return await res.json();
}

export async function getAssignees(owner: string, repo: string) {
  const res = await fetch(`${BASE_URL}/repos/${owner}/${repo}/assignees`, {
    headers: getHeaders(),
  });
  return await res.json();
}
export async function getIssuesCount(
  owner: string,
  repo: string,
  options?: {
    state?: string;
    labels?: string;
    assignee?: string;
  },
) {
  const q = [
    `repo:${owner}/${repo}`,
    "type:issue",
    options?.state && `state:${options.state}`,
    options?.labels && `label:"${options.labels}"`,
    options?.assignee && `assignee:${options?.assignee}`,
  ]
    .filter(Boolean)
    .join(" ");
  const res = await fetch(
    `${BASE_URL}/search/issues?q=${encodeURIComponent(q)}`,
    {
      headers: getHeaders(),
    },
  );
  const data = await res.json();
  return data.total_count;
}
