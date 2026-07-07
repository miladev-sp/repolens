import SaveBtn from "@/src/components/features/saved/save-button-repo-detail";
import { languageColors } from "@/src/constants/languageColors";
import {
  getLanguageBreakdown,
  getLanguages,
  repositoryDetails,
} from "@/src/lib/github";
import { RepoDetail } from "@/src/types/types";
import {
  BookMarked,
  Eye,
  GitFork,
  Star,
  Link as Linki,
  CircleDot,
  CalendarPlus,
  CalendarClock,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: Promise<{ repo: string; owner: string }>;
};

export default async function RepoDetailsPage({ params }: Props) {
  const repoName = (await params).repo;
  const ownerName = (await params).owner;
  const repo: RepoDetail = await repositoryDetails(ownerName, repoName);
  const langBreakDown = await getLanguageBreakdown(ownerName, repoName);
  const languages = await getLanguages(ownerName, repoName);
  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
  });
  const langColor = languageColors[repo.language ?? ""] || "#8b949e";
  const dateCreated = new Date(repo.created_at);
  const dateUpdated = new Date(repo.updated_at);
  return (
    <div className="mx-8 min-h-[75vh] mt-8 lg:grid lg:grid-cols-[2fr_1.5fr]  ">
      <div>
        <div className="lg:flex lg:items-center lg:gap-12 lg:justify-between ">
          <div className="flex items-center gap-2  ">
            <Image
              src={repo.owner.avatar_url}
              alt={repo.owner.login}
              width={40}
              height={40}
              className="rounded-full border border-red-500 lg:w-12 lg:h-12"
            />
            <Link
              href={repo.owner.html_url}
              className="text-base font-inter text-[#9198a1] lg:text-lg"
            >
              {ownerName}
            </Link>
          </div>
          <div className="flex items-center gap-2 mt-5 lg:m-0 font-inter text-base lg:text-lg text-[#9198a1] lg:text-nowrap lg:flex-1 overflow-clip">
            <BookMarked color="#9198a1" size={24} />
            <Link href={`/repos/${ownerName}`} className="text-[#1f6feb]">
              {ownerName}
            </Link>{" "}
            /{" "}
            <Link href={repo.html_url} className="text-[#1f6feb]">
              {repo.name}
            </Link>
          </div>
          <div className="flex gap-2 lg:flex-1">
            <div className="border border-[#9198a1] w-max rounded-lg font-inter text-[#9198a1] flex items-center justify-center p-2 gap-0.5 mt-3.5 lg:mt-0 text-sm font-bold lg:text-base ">
              <Eye size={16} color="#9198a1" />
              <span>{formatter.format(repo.watchers_count)}</span>
            </div>
            <div className="border border-[#9198a1] w-max rounded-lg font-inter text-[#9198a1] flex items-center justify-center p-2 gap-0.5 mt-3.5 lg:mt-0 text-sm font-bold lg:text-base ">
              <GitFork size={16} color="#9198a1" />
              <span>{formatter.format(repo.forks_count)}</span>
            </div>
            <div className="border border-[#9198a1] w-max rounded-lg font-inter text-[#9198a1] flex items-center justify-center p-2 gap-0.5 mt-3.5 lg:mt-0 text-sm font-bold lg:text-base ">
              <Star size={16} color="#9198a1" />
              <span>{formatter.format(repo.stargazers_count)}</span>
            </div>
          </div>
        </div>
        <hr className="text-[#9198a1] mt-3.5" />
        <p className="text-[#9198a1] font-inter font-light text-base mt-2 lg:text-lg">
          {repo.description}
        </p>
        <div className="flex items-center gap-3 mt-4 flex-wrap">
          {languages.map((lang) => (
            <span
              key={lang}
              className="bg-[#ddf4ff] text-[#2C69E1] px-2 py-1 rounded-xl text-sm lg:text-base"
            >
              {lang}
            </span>
          ))}
        </div>
        <hr className="text-[#9198a1] mt-3.5" />
        <Link
          href={repo.html_url}
          className="text-[#1f6feb] flex items-center gap-1 mt-3.5 lg:text-lg"
        >
          <Linki size={18} />
          {repo.html_url.slice(8)}
        </Link>
        <hr className="text-[#9198a1] mt-3.5" />
        <div className="mt-3.5">
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
            <div className="flex items-center gap-1 text-[#9198a1] w-full lg:text-lg   ">
              <Star size={16} />
              <span>{repo.stargazers_count}</span>
            </div>
            <div className="flex items-center gap-1 text-[#9198a1] w-full lg:text-lg  ">
              <GitFork size={16} />
              <span>{repo.forks_count}</span>
            </div>
            <div className="flex items-center gap-1 text-[#9198a1] w-full lg:text-lg  ">
              <Eye size={16} />
              <span>{repo.watchers_count}</span>
            </div>
            <div className="flex items-center gap-1 text-[#9198a1] w-full lg:text-lg ">
              <CircleDot size={16} />
              <span>{repo.open_issues}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 mt-4">
          {repo.language ? (
            <div
              className="w-4 h-4  rounded-full"
              style={{ backgroundColor: langColor }}
            />
          ) : null}
          <span className="text-[#9198a1] text-base  font-inter lg:text-lg">
            {repo.language
              ? `${repo.language}:  ${langBreakDown[0].percent}%`
              : ""}
          </span>
        </div>
        <div className="text-[#9198a1] font-inter text-sm mt-3 flex items-center gap-1 lg:text-base">
          <CalendarPlus size={16} />
          <span>Created {dateCreated.toDateString()}</span>
        </div>
        <div className="text-[#9198a1] font-inter text-sm mt-3 flex items-center gap-1 lg:text-base">
          <CalendarClock size={16} />
          <span>Updated {dateUpdated.toDateString()}</span>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-2 lg:items-center ">
        <Link
          href={`/repos/${ownerName}/${repoName}/issues`}
          className="bg-[#F6F8FA] w-full  text-center flex items-center justify-center py-1.5 text-[#1A1A19] rounded-lg gap-1 lg:text-lg lg:w-4/5 "
        >
          <CircleDot size={16} />
          View issues
        </Link>
        <SaveBtn repo={repo} ownerName={ownerName} repoName={repoName} />
        <Link
          href={repo.html_url}
          target="_blanked"
          className="bg-[#2DA44E] w-full  text-center flex items-center justify-center py-1.5 text-white rounded-lg gap-1 lg:text-lg lg:w-4/5"
        >
          <ExternalLink size={16} />
          View on GitHub
        </Link>
      </div>
    </div>
  );
}
