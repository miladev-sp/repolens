export type Owner = {
  login: string;
  avatar_url: string;
  html_url: string;
  id: number;
};
export type Repos = {
  total_count?: number;
  items: ReposItem[];
};

export type ReposItem = {
  id: number;
  owner: Owner;
  name: string;
  html_url: string;
  description: string;
  forks_count: number;
  watchers_count: number;
  open_issues: number;
  stargazers_count: number;
  language: string;
  status: string;
};

export type RepoDetail = {
  id: number;
  owner: Owner;
  name: string;
  html_url: string;
  description: string;
  forks_count: number;
  watchers_count: number;
  open_issues: number;
  stargazers_count: number;
  language: string;
  created_at: string;
  updated_at: string;
  status: string;
};
type labels = {
  name: string;
  color: String;
};

export type Issues = {
  title: string;
  number: number;
  state: string;
  user: Owner;
  labels: labels[];
  comments: number;
  created_at: string;
  updated_at: string;
  colsed_at?: string;
};

export type Labels = {
  id: number;
  name: string;
  color: string;
  description: string;
};

export type status = {
  status: string;
};
