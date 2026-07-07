import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

function getPageNumbers(
  currentPage: number,
  total: number,
): (number | "...")[] {
  const pages: (number | "...")[] = [];
  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }
  return pages;
}
type Props = {
  currentPage: number;
  total_count: number;
  query: string;
};

export default function RepoPagination({
  currentPage,
  total_count,
  query,
}: Props) {
  const totalPages = Math.ceil(Math.min(total_count, 1000) / 12);
  const pages = getPageNumbers(currentPage, totalPages);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;
  return (
    <div className="w-full flex justify-center items-center mb-8">
      <div className="flex items-center justify-center gap-2.5">
        <Link
          href={hasPrev ? `/repos?q=${query}&page=${currentPage - 1}` : ""}
          className="text-white border border-gray-600 rounded-lg p-2.5 flex items-center gap-1 font-inter "
          prefetch={false}
        >
          <ArrowLeft size={20} />
          Previous
        </Link>
        <div className="flex items-center  justify-center gap-3 ">
          {pages.map((page, i) =>
            page === "..." ? (
              <span key={page + i} className="text-white">
                ...
              </span>
            ) : (
              <Link
                key={page}
                href={`/repos?q=${query}&page=${page}`}
                className={` font-inter text-base ${currentPage === page ? "text-red-700 text-xl font-bold" : "text-white"}`}
              >
                {page}
              </Link>
            ),
          )}
        </div>
        <Link
          href={hasNext ? ` /repos?q=${query}&page=${currentPage + 1}` : ""}
          className="text-white border border-gray-600 rounded-lg p-2.5 flex items-center gap-1 font-inter"
          prefetch={false}
        >
          Next
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
