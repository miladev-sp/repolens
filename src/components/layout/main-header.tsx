"use client";
import { useRepo } from "@/src/context/SavedContext";
import Image from "next/image";
import Link from "next/link";
import search from "@/public/search.svg";
export default function MainHeader() {
  const { savedRepos } = useRepo();
  return (
    <header className="flex justify-between px-8 items-center py-3.5 bg-black">
      <div>
        <Link href={"/"}>
          <h2 className="text-red-700 font-jersey text-3xl lg:text-6xl">
            REPOLENS
          </h2>
        </Link>
      </div>
      <div className="flex items-center">
        <div>
          <Link href={`/repos`}>
            <Image src={search} alt="serach" priority width={32} height={32} />
          </Link>
        </div>
        <div className="relative">
          <Link href={"/saved"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-11 lg:size-12 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>
          </Link>
          {savedRepos.length > 0 ? (
            <Link href={"/saved"}>
              <span className="absolute top-1.5 right-4 font-inter font-bold text-lg lg:right-4.5">
                {savedRepos.length}
              </span>
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
