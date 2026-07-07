"use client";
import { useRepo } from "@/src/context/SavedContext";
import { ReposItem } from "@/src/types/types";
import { Bookmark } from "lucide-react";

type Props = {
  ownerName: string;
  repoName: string;
  repo: ReposItem;
};

export default function SaveBtn({ ownerName, repoName, repo }: Props) {
  const { addToSaved, savedRepos } = useRepo();
  const exist = savedRepos.some((i) => i.id === repo.id);

  return (
    <button
      className="bg-[#F6F8FA] w-full  text-center flex items-center justify-center py-1.5 text-[#1A1A19] rounded-lg gap-1 lg:text-lg cursor-pointer lg:w-4/5"
      onClick={() => addToSaved(repo)}
    >
      <Bookmark size={16} className={`${exist ? "fill-black" : ""}`} />
      {exist ? "Unsave repository" : " Save repository"}
    </button>
  );
}
