"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import search from "@/public/search.svg";
type Props = {
  query: string;
};
export default function RepoSearch({ query }: Props) {
  const router = useRouter();

  return (
    <div className="w-full px-9 mt-3.5 ">
      <form>
        <div className="relative">
          <input
            type="text"
            name="query"
            placeholder="Search by owner name or repo name..."
            className="bg-gray-500 placeholder:text-white placeholder:font-inter font-inter w-full px-5 py-4 rounded-2xl  text-white placeholder:text-sm placeholder:lg:text-base"
            required
            onChange={(e) => {
              router.push(`/repos?q=${encodeURIComponent(e.target.value)}`);
            }}
          />

          <button className=" absolute top-4.25 right-4.75 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
      </form>
      {query === "" ? (
        <div className=" flex items-center justify-center  min-h-[65vh] lg:min-h-[69vh]">
          <h2 className="font-jersey text-[#C10007] font-bold text-7xl lg:text-9xl">
            REPOLENS
          </h2>
          <Image
            src={search}
            alt=""
            width={80}
            height={80}
            className="lg:w-32 lg:h-32"
          />
        </div>
      ) : null}
    </div>
  );
}
