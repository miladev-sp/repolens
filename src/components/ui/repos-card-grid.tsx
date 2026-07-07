import { Repos } from "@/src/types/types";
import ReposCard from "./repos-card";
type Props = {
  repos: Repos;
};
export default function ReposCardGrid({ repos }: Props) {
  return (
    <div className="grid gap-3.5 md:grid-cols-2 xl:grid-cols-3 mt-8 px-5 lg:px-8  mb-12 w-full">
      {repos?.items?.map((item) => (
        <ReposCard item={item} key={item.id} />
      ))}
    </div>
  );
}
