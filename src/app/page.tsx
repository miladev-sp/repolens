import Link from "next/link";

export default function Page() {
  return (
    <main className="flex-col flex items-center justify-center h-[78vh]">
      <h1 className="text-white font-jersey text-7xl text-center">
        Explore all repositories from{" "}
        <span className="bg-[#6639BA] rounded-2xl p-1">GITHUB</span> with{" "}
        <span className="text-red-700">REPOLENS</span>
      </h1>
      <Link
        href={"/repos"}
        className="px-3.5 py-1 bg-white text-red-700 font-inter border border-[#6639BA] rounded-lg text-2xl mt-3.5"
      >
        Explore Repos
      </Link>
    </main>
  );
}
