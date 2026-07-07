"use client";

import ReposCardGrid from "@/src/components/ui/repos-card-grid";
import { useRepo } from "@/src/context/SavedContext";
import Loading from "../loading";

export default function SavedPage() {
  const { savedRepos, isLoading } = useRepo();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="mt-4 min-h-[75vh]">
      <h1 className="text-center font-jersey text-red-700 text-6xl md:text-8xl">
        SAVED REPOS
      </h1>
      <ReposCardGrid repos={{ items: savedRepos }} />
      {savedRepos.length === 0 ? (
        <p className="text-center text-white font-inter text-xl md:text-2xl">
          You dont have any repo saved here!
        </p>
      ) : null}
    </div>
  );
}
