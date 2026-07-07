"use client";
import { Labels } from "@/src/types/types";
import { Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  repo: string;
  owner: string;
  labels: Labels[];
  labelsParam: string | undefined;
};
export default function LabelFilter({
  repo,
  owner,
  labels,
  labelsParam,
}: Props) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>(
    labelsParam ? labelsParam.split(",") : [],
  );
  useEffect(() => {
    setSelectedIds(labelsParam ? labelsParam.split(",") : []);
  }, [labelsParam]);
  const router = useRouter();
  const filteredLabels = labels.filter((label) =>
    label.name.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleLabel = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };
  function filterSubmmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const param = new URLSearchParams(window.location.search);
    param.set("labels", selectedIds.join(","));
    if (selectedIds.length == 0) {
      param.delete("labels");
    }
    router.push(`/repos/${owner}/${repo}/issues?${param.toString()}`);
  }
  function resetHandler() {
    const params = new URLSearchParams(window.location.search);
    setSelectedIds([]);
    params.delete("labels");
    router.push(`/repos/${owner}/${repo}/issues?${params.toString()}`);
    setOpen(false);
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <div className="border border-[#9198a1] text-[#9198a1] font-inter rounded-lg p-2.5 flex gap-1 items-center  cursor-pointer ">
          <Tag size={18} />
          <span>Label</span>
          <span className="bg-[#1f6feb] px-0.5 rounded-lg text-white">
            {selectedIds.length}
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="bg-black outline-none rounded-tr-2xl rounded-tl-2xl w-[90vw] lg:w-[40vw]">
        <div className="px-8 py-9 ">
          <form onSubmit={filterSubmmitHandler}>
            <h2 className="font-inter text-base text-white border-b border-gray-500 text-center py-1">
              Appy labels to this issue
            </h2>
            <input
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Filter lables"
              className="bg-white w-full px-2 py-1 rounded-sm focus:outline-red-700"
            />
            <div className="mt-4">
              {filteredLabels.length === 0 ? (
                <p className="font-inter text-gray-100 text-sm text-center">
                  No labels match
                </p>
              ) : (
                ""
              )}
            </div>
            <div className=" h-80 overflow-y-auto flex flex-col gap-3  ">
              {filteredLabels.map((label) => {
                const checked = selectedIds.includes(label.name);

                return (
                  <div
                    key={label.id}
                    onClick={() => toggleLabel(label.name)}
                    className="flex items-start gap-2 py-2 px-3 border border-gray-600 hover:bg-gray-800 transition-all ease-in-out duration-200 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      readOnly
                      className=" pointer-events-none mt-1 w-4 h-4 shrink-0"
                    />
                    <span
                      className="w-4 h-4 rounded-full mt-1 shrink-0"
                      style={{ backgroundColor: `#${label.color}` }}
                    ></span>
                    <div className="flex flex-col">
                      <span className="text-white font-inter">
                        {label.name}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {label.description}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-8">
              <button
                type="reset"
                className="text-[#1f6feb] font-inter"
                onClick={resetHandler}
              >
                Clear labels
              </button>
              <button
                className="bg-[#2DA44E] px-8 py-2 text-white font-inter rounded-lg"
                type="submit"
                onClick={() => setOpen(false)}
              >
                Apply labels
              </button>
            </div>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
