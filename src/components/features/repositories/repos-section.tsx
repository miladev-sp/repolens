import { Repos } from "@/src/types/types";
import ReposCardGrid from "../../ui/repos-card-grid";
import RepoPagination from "./repo-pagination";
import { searchRepositories } from "@/src/lib/github";
type Props = {
  resolvedPage: string;
  resolvedQuery: string;
};
export default async function ReposSection({
  resolvedPage,
  resolvedQuery,
}: Props) {
  const repos: Repos = await searchRepositories(resolvedQuery, resolvedPage);

  return (
    <div>
      {repos.items.length === 0 ? (
        <div className="h-[60vh] flex items-center justify-center">
          <h2 className="font-jersey text-red-700 text-3xl lg:text-4xl text-center">
            No repos found for{" "}
            <span className="text-gray-600 font-inter text-2xl lg:text-3xl">
              {resolvedQuery}
            </span>
          </h2>
        </div>
      ) : null}
      <ReposCardGrid repos={repos} />

      {repos.total_count ? (
        <RepoPagination
          total_count={repos.total_count}
          currentPage={Number(resolvedPage)}
          query={resolvedQuery}
        />
      ) : null}
    </div>
  );
}
