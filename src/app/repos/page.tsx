import RepoSearch from "@/src/components/features/repositories/repo-search";
import { Suspense } from "react";
import ReposSection from "@/src/components/features/repositories/repos-section";
import ReposSekeleton from "@/src/components/features/repositories/repos-skeleton";

type Props = {
  searchParams: {
    q?: string;
    page?: string;
  };
};

export default async function ReposPage({ searchParams }: Props) {
  const { q, page } = await searchParams;
  const resolvedQuery = q || "";
  const resolvedPage = page || "1";

  return (
    <div className="flex flex-col  justify-center  w-full flex-1">
      <RepoSearch query={resolvedQuery} />
      {resolvedQuery ? (
        <Suspense
          key={`${resolvedPage}-${resolvedQuery}`}
          fallback={<ReposSekeleton />}
        >
          <ReposSection
            resolvedPage={resolvedPage}
            resolvedQuery={resolvedQuery}
          />
        </Suspense>
      ) : null}
    </div>
  );
}
