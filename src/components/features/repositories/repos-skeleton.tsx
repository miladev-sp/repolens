export default function ReposSekeleton() {
  return (
    <div className="px-8 w-full">
      <div className="grid gap-3.5 md:grid-cols-2 xl:grid-cols-3 mt-8 lg:px-8  mb-12 w-full">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            className="h-35 flex flex-col py-5 bg-gray-500 border border-[#3d444d] rounded-md animate-pulse"
            key={index}
          ></div>
        ))}
      </div>
    </div>
  );
}
