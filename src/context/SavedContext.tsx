"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Owner } from "../types/types";
type RepoItem = {
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
  created_at?: string;
  updated_at?: string;
};
type RepoContextType = {
  savedRepos: RepoItem[];
  addToSaved: (item: RepoItem) => void;
  isLoading: boolean;
};
const SavedContext = createContext<RepoContextType | null>(null);

export function RepoProvider({ children }: { children: React.ReactNode }) {
  const [savedRepos, setSavedRepos] = useState<RepoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const stored = localStorage.getItem("repo");
    if (stored) setSavedRepos(JSON.parse(stored));
    setIsLoading(false);
  }, []);

  useEffect(
    () => localStorage.setItem("repo", JSON.stringify(savedRepos)),
    [savedRepos],
  );

  function addToSaved(item: RepoItem) {
    setSavedRepos((prev) => {
      const exist = prev.find((i) => i.id === item.id);
      if (exist) {
        return prev.filter((repo) => repo.id !== item.id);
      }
      return [...prev, item];
    });
  }
  return (
    <SavedContext.Provider value={{ savedRepos, addToSaved, isLoading }}>
      {children}
    </SavedContext.Provider>
  );
}
export function useRepo() {
  const context = useContext(SavedContext);
  if (!context) {
    throw new Error("useRepo must be used within Saved Proivder");
  }
  return context;
}
