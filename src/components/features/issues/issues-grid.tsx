import { Issues } from "@/src/types/types";
import IssuesCard from "./issues-card";

type Props = {
  issues: Issues[];
  repo: string;
  owner: string;
};
export default function IssuesGrid({ issues, repo, owner }: Props) {
  return (
    <div className="flex flex-col gap-4 mt-6">
      {issues.map((issue) => (
        <IssuesCard
          issue={issue}
          key={issue.number}
          repo={repo}
          owner={owner}
        />
      ))}
    </div>
  );
}
