import { ReposItem } from "@/src/types/types";
import Image from "next/image";
import Link from "next/link";
import { languageColors } from "@/src/constants/languageColors";
import { CircleDot, GitFork } from "lucide-react";
import SaveButton from "../features/saved/save-button";
type Props = {
  item: ReposItem;
};
export default function ReposCard({ item }: Props) {
  const langColor = languageColors[item.language ?? ""] || "#8b949e";
  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
  });
  return (
    <>
      <div className="h-full flex flex-col px-5 py-5 bg-[#0d1117] border border-[#3d444d] rounded-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={item.owner.avatar_url}
              alt={item.owner.login}
              width={40}
              height={40}
              className="rounded-full border border-red-500 lg:w-12 lg:h-12"
            />

            <span className="text-[#9198a1] font-inter text-sm font-medium lg:text-base">
              {item.owner.login}
            </span>
          </div>
          <SaveButton item={item} />
        </div>
        <div className="mt-3 flex items-center gap-1.5 ">
          <div className="w-6 h-6 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#9198a1"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5.5 lg:size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9"
              />
            </svg>
          </div>

          <Link
            href={`/repos/${item.owner.login}/${item.name}`}
            className="text-[#1f6feb] lg:text-lg font-inter font-medium break-all lg:text-nowrap overflow-hidden h-full "
          >
            {item.name}
          </Link>
        </div>
        <p className="text-[#9198a1] mt-1.5 text-sm lg:text-base break-all line-clamp-2 font-inter font-light md:text-nowrap overflow-clip">
          {item.description}
        </p>
        <div className="flex gap-3.5 items-center  mt-3.5 h-full">
          <div className="flex items-center gap-1">
            {item.language ? (
              <div
                className="w-4 h-4  rounded-full"
                style={{ backgroundColor: langColor }}
              />
            ) : null}
            <span className="text-[#9198a1] text-sm lg:text-base font-inter">
              {item.language ? item.language : ""}
            </span>
          </div>
          <div className="flex items-center gap-0.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#9198a1"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
            <span className="text-sm lg:text-base text-[#9198a1]">
              {formatter.format(item.stargazers_count)}
            </span>
          </div>
          <div className="flex gap-0.5 items-center">
            <GitFork size={16} color="#9198a1" />
            <span className="text-sm text-[#9198a1] lg:text-base">
              {formatter.format(item.forks_count)}
            </span>
          </div>
          <div className="flex gap-1 items-center">
            <CircleDot color="#9198a1" size={16} />
            <span className="text-sm text-[#9198a1] lg:text-base">
              {formatter.format(item.open_issues)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
