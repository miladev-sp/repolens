import LabelFilter from "./label-filter";
import { Labels, Owner } from "@/src/types/types";
import { getAssignees, getLabelsList } from "@/src/lib/github";
import AssigneeFilter from "./assignee-filter";
import SortFilter from "./sort-filter";
type Props = {
  owner: string;
  repo: string;
  labelsParam: string | undefined;
  searchParams: {
    state?: string;
    labels?: string;
    assignee?: string;
    sort?: string;
    direction?: string;
    page?: string;
  };
  assigneeParam: string | undefined;
  sortParam: string | undefined;
  orderParam: string | undefined;
};
export const revalidate = 3600;
export default async function IssuesFilter({
  owner,
  repo,
  labelsParam,
  searchParams,
  assigneeParam,
  sortParam,
  orderParam,
}: Props) {
  const labelsList: Labels[] = await getLabelsList(owner, repo);
  const assignees: Owner[] = await getAssignees(owner, repo);
  return (
    <div className="mt-2.5 flex gap-3.5  ">
      <LabelFilter
        owner={owner}
        repo={repo}
        labels={labelsList}
        labelsParam={labelsParam}
      />
      <AssigneeFilter
        assignees={assignees}
        searchParams={searchParams}
        owner={owner}
        repo={repo}
        assigneeParam={assigneeParam}
      />
      <SortFilter
        owner={owner}
        repo={repo}
        sortParam={sortParam}
        orderParam={orderParam}
      />
    </div>
  );
}
