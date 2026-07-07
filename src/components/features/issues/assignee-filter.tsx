"use client";
import { Owner } from "@/src/types/types";
import { Check, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
type Props = {
  assignees: Owner[];
  searchParams: {
    state?: string;
    labels?: string;
    assignee?: string;
    sort?: string;
    direction?: string;
    page?: string;
  };
  owner: string;
  repo: string;
  assigneeParam: string | undefined;
};
export default function AssigneeFilter({
  assignees,
  searchParams,
  owner,
  repo,
  assigneeParam,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState<string>("");
  const [search, setSearch] = useState("");
  const router = useRouter();
  const filteredAssingees = assignees.filter((a) =>
    a.login.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    setSelectedAssignee(assigneeParam ? assigneeParam : "");
  }, []);

  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });

  const toggleAssignee = (name: string) => {
    const next = selectedAssignee.includes(name) ? "" : name;

    setSelectedAssignee(next);

    const params = new URLSearchParams(searchParams);

    if (next.length) {
      params.set("assignee", next);
    } else {
      params.delete("assignee");
    }

    router.push(`/repos/${owner}/${repo}/issues?${params.toString()}`);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <div className="border border-[#9198a1] text-[#9198a1] font-inter rounded-lg p-2.5 flex gap-1 items-center  cursor-pointer">
          <User size={18} />
          <span>
            Assignee: <span className="text-white">{selectedAssignee}</span>
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="bg-black outline-none rounded-tr-2xl rounded-tl-2xl">
        <div className="px-8  py-9 ">
          <h2 className="font-inter text-base text-white border-b border-gray-500 text-center py-1">
            Add assignees to this issue
          </h2>

          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="search"
            placeholder="Filter lables"
            className="bg-white w-full px-2 py-1 rounded-sm focus:outline-red-700"
          />
          <div className="mt-4">
            {filteredAssingees.length === 0 ? (
              <p className="font-inter text-gray-100 text-sm text-center">
                No assignees match
              </p>
            ) : (
              ""
            )}
          </div>
          <div className=" h-80 overflow-y-auto flex flex-col gap-3  ">
            {filteredAssingees.map((assignee) => {
              const checked = selectedAssignee.includes(assignee.login);

              return (
                <button key={assignee.id} onClick={() => setOpen(false)}>
                  <div
                    onClick={() => toggleAssignee(assignee.login)}
                    className="flex items-start gap-2 py-2 px-3 border border-gray-600 hover:bg-gray-800 transition-all ease-in-out duration-200 cursor-pointer"
                  >
                    <div className="flex gap gap-1.5 ">
                      {assignee.login === selectedAssignee && (
                        <Check size={24} color="#9198a1" />
                      )}

                      <Image
                        src={assignee.avatar_url}
                        width={30}
                        height={30}
                        alt={assignee.login}
                        className="rounded-full"
                      />
                      <span className="text-white font-inter">
                        {assignee.login}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
