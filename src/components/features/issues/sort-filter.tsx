"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ArrowDownUp,
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  Check,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const sort = [
  { name: "Created on", id: "created" },
  { name: "Last updated", id: "updated" },
  { name: "Total comments", id: "comments" },
];
{
}
type Props = {
  owner: string;
  repo: string;
  sortParam: string | undefined;
  orderParam: string | undefined;
};

export default function SortFilter({
  owner,
  repo,
  sortParam,
  orderParam,
}: Props) {
  const [selectedSort, setSelectedSort] = useState<string | undefined>(
    "Created on",
  );
  const [selectedOrder, setSelectedOrder] = useState("Newest");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const order = orderParam === "asc" ? "Oldest" : "Newest";
    let sort;
    if (sortParam === "updated") {
      sort = "Last updated";
    } else if (sortParam === "created") {
      sort = "Created on";
    } else if (sortParam === "comments") {
      sort = "Total comments";
    }
    setSelectedOrder(orderParam ? order : "Newest");
    setSelectedSort(sortParam ? sort : "Created on");
  }, []);

  function clickSortHandler(id: string, name: string) {
    setOpen(false);
    setSelectedSort(name);
    const param = new URLSearchParams(window.location.search);
    param.set("sort", id);
    router.push(`/repos/${owner}/${repo}/issues?${param.toString()}`);
  }
  function clickOrderHandler(order: string) {
    setOpen(false);
    setSelectedOrder(order);
    const param = new URLSearchParams(window.location.search);
    if (order === "Oldest") {
      param.set("direction", "asc");
    } else if (order === "Newest") {
      param.set("direction", "desc");
    }
    router.push(`/repos/${owner}/${repo}/issues?${param.toString()}`);
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <div className="border border-[#9198a1] text-[#9198a1] font-inter rounded-lg p-2.5 flex gap-1 items-center  cursor-pointer ">
          <ArrowDownUp size={18} />

          <span className="text-white">{selectedOrder}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="bg-black outline-none rounded-tr-2xl rounded-tl-2xl w-max p-4">
        <span className="text-[#9198a1] font-inter text-sm">Sort by</span>
        <ul className="flex flex-col gap-2.5">
          {sort.map((s) => (
            <li
              key={s.id}
              className="text-white font-inter flex gap-1 cursor-pointer"
              onClick={() => clickSortHandler(s.id, s.name)}
            >
              <div className="w-4 h-4">
                {selectedSort === s.name && <Check size={16} color="#9198a1" />}
              </div>
              {s.name}
            </li>
          ))}
        </ul>
        <hr />
        <ul className="flex flex-col gap-2.5">
          <li
            className="text-white font-inter flex gap-1 cursor-pointer"
            onClick={() => clickOrderHandler("Oldest")}
          >
            <div className="w-4 h-4">
              {selectedOrder === "Oldest" && (
                <Check size={16} color="#9198a1" />
              )}
            </div>
            <ArrowUpNarrowWide size={16} color="#9198a1" />
            Oldest
          </li>

          <li
            className="text-white font-inter flex gap-1 cursor-pointer"
            onClick={() => clickOrderHandler("Newest")}
          >
            <div className="w-4 h-4">
              {selectedOrder === "Newest" && (
                <Check size={16} color="#9198a1" />
              )}
            </div>
            <ArrowDownWideNarrow size={16} color="#9198a1" />
            Newest
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
