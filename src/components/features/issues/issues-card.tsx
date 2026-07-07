import { Issues } from "@/src/types/types";
import { CircleCheck, CircleDot, MessageCircle } from "lucide-react";
import { differenceInDays, formatDistance } from "date-fns";
import Link from "next/link";
type Props = {
  issue: Issues;
  owner: string;
  repo: string;
};
export default function IssuesCard({ issue, owner, repo }: Props) {
  const dateCreated = new Date(issue.created_at);

  const createdAt =
    differenceInDays(new Date(), dateCreated) < 7
      ? `${formatDistance(dateCreated, new Date())} ago`
      : dateCreated.toDateString();
  return (
    <Link href={`/repos/${owner}/${repo}/issues/${issue.number}`}>
      <div className="border border-[#9198a1] px-2 py-4 rounded-lg lg:px-5">
        <div className="flex gap-2 ">
          {issue.state === "open" ? (
            <CircleDot
              color="#3FB950"
              size={20}
              className="shrink-0 lg:size-6"
            />
          ) : (
            <CircleCheck
              size={20}
              className="shrink-0 lg:size-6"
              color="#AB7DF8"
            />
          )}
          <div className="w-full">
            <p className="text-[#c4c8ce] font-inter text-lg ">{issue.title}</p>
            <div className="flex gap-2 flex-wrap mt-1.5">
              {issue.labels?.map((label) => (
                <span
                  style={{
                    backgroundColor: `#${label.color}33`,
                    color: `#${label.color}`,
                  }}
                  className="p-1 text-sm rounded-lg lg:text-base"
                  key={label.name}
                >
                  {label.name}
                </span>
              ))}
            </div>
            <div className="mt-3 flex flex-col gap-1.5 lg:flex-row-reverse justify-between w-full">
              <div>
                {issue.comments > 0 ? (
                  <div className="flex items-center gap-1">
                    <MessageCircle
                      size={16}
                      color="#99a1af"
                      className="lg:size-5"
                    />
                    <span className="text-[#99a1af] text-sm lg:text-base">
                      {issue.comments}
                    </span>
                  </div>
                ) : null}
              </div>
              <div>
                {issue.state === "open" ? (
                  <p className="text-gray-400 font-inter text-sm lg:text-base">
                    #{issue.number} by{" "}
                    <span className="text-gray-200">{issue.user.login}</span> .{" "}
                    {createdAt}
                  </p>
                ) : (
                  <p className="text-gray-400 font-inter text-sm lg:text-base ">
                    #{issue.number} by{" "}
                    <span className="text-gray-200">{issue.user.login}</span>{" "}
                    was closed{" "}
                    {!createdAt.includes("ago") ? `on ${createdAt}` : createdAt}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
