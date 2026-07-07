"use client";
import { useRepo } from "@/src/context/SavedContext";
import { Bookmark } from "lucide-react";
import { ReposItem } from "@/src/types/types";

type Props = {
  item: ReposItem;
};

export default function SaveButton({ item }: Props) {
  const { addToSaved, savedRepos } = useRepo();
  const exist = savedRepos.some((repo) => repo.id === item.id);
  return (
    <Bookmark
      color="white"
      className={`cursor-pointer hover:fill-white ${exist ? "fill-white" : ""}`}
      onClick={() => addToSaved(item)}
    />
  );
}
