import { getCloseIssuesCount, getOpenIssuesCount } from "@/src/lib/github";

import { CircleDot } from "lucide-react";
import Link from "next/link";

type Props = {
  repo: string;
  owner: string;
  state: string | undefined;
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
export default async function TopBar({
  owner,
  repo,
  state,
  searchParams,
}: Props) {
  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
  });
  const [open, closed] = await Promise.all([
    getOpenIssuesCount(owner, repo),
    getCloseIssuesCount(owner, repo),
  ]);
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([Key, value]) => {
    if (value) params.set(Key, value);
  });

  const openParams = new URLSearchParams(params);
  openParams.set("state", "open");
  const closedParams = new URLSearchParams(params);
  closedParams.set("state", "closed");
  const allParams = new URLSearchParams(params);
  allParams.delete("state");
  return (
    <div className="flex items-center gap-4 mt-5 flex-wrap">
      <Link
        href={`/repos/${owner}/${repo}/issues?${openParams.toString()}`}
        className={`flex gap-1 items-center p-1.5 font-inter font-bold text-[#9198a1] border rounded-lg ${state === "open" ? "bg-gray-700 text-white" : ""}`}
      >
        <CircleDot size={18} />
        Open {formatter.format(open)}
      </Link>
      <Link
        href={`/repos/${owner}/${repo}/issues?${closedParams.toString()}`}
        className={`p-1.5 font-inter font-bold text-[#9198a1] border rounded-lg ${state === "closed" ? "bg-gray-700 text-white" : ""}`}
      >
        Closed {formatter.format(closed)}
      </Link>
      <Link
        href={`/repos/${owner}/${repo}/issues?${allParams.toString()}`}
        className={`p-1.5 font-inter font-bold text-[#9198a1] border rounded-lg  ${state === undefined ? "bg-gray-700 text-white" : ""}`}
      >
        All
      </Link>
    </div>
  );
}
