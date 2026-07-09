import IssuesGrid from "@/src/components/features/issues/issues-grid";
import IssuePagination from "@/src/components/features/issues/issues-pagination";
import TopBar from "@/src/components/features/issues/top-bar";
import IssuesFilter from "@/src/components/features/issues/top-bar-filters";
import { getReposIssues } from "@/src/lib/github";
import { Issues } from "@/src/types/types";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";

type Props = {
  params: Promise<{ owner: string; repo: string }>;
  searchParams: {
    state?: string;
    labels?: string;
    assignee?: string;
    sort?: string;
    direction?: string;
    page?: string;
  };
};
export const revalidate = 3600;
export default async function IssuesPage({ params, searchParams }: Props) {
  const ownerName = (await params).owner;
  const repoName = (await params).repo;
  const { state, labels, assignee, sort, direction, page } = await searchParams;
  const currentPage = Number(page) || 1;
  const issues: Issues[] = await getReposIssues(ownerName, repoName, {
    state,
    labels,
    assignee,
    sort,
    direction,
    page,
  });

  const suspenseKey = `${state}-${labels}-${assignee}-${sort}-${direction}-${page}-${issues}`;

  return (
    <div className="flex-1 mx-8 mt-3.5">
      <div className="flex text-[#9198a1] font-inter justify-between text-base ">
        <div>
          <span>{ownerName}</span> /{" "}
          <Link
            href={`/repos/${ownerName}/${repoName}`}
            className="text-[#1f6feb]"
          >
            {repoName}
          </Link>
        </div>
        <span>Issues</span>
      </div>
      <hr className="bg-[#57585ab6] mt-3.5 h-px  border-0" />
      <TopBar
        repo={repoName}
        owner={ownerName}
        state={state}
        searchParams={await searchParams}
      />

      <hr className="bg-[#57585ab6] mt-3.5 h-px  border-0" />
      <Suspense fallback={<Loading />} key={suspenseKey}>
        <IssuesFilter
          owner={ownerName}
          repo={repoName}
          labelsParam={labels}
          searchParams={await searchParams}
          assigneeParam={assignee}
          sortParam={sort}
          orderParam={direction}
        />

        <IssuesGrid issues={issues} owner={ownerName} repo={repoName} />
        {issues.length > 0 ? (
          <IssuePagination
            repo={repoName}
            owner={ownerName}
            options={{
              state: state,
              labels: labels,
              assignee: assignee,
              sort: sort,
              direction: direction,
            }}
            currentPage={currentPage}
          />
        ) : null}
      </Suspense>
    </div>
  );
}
