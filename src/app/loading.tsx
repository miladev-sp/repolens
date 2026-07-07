import Image from "next/image";
import search from "@/public/search.svg";
export default function Loading() {
  return (
    <div className=" h-[80vh] flex items-center justify-center">
      <h2 className="font-jersey text-[#C10007] font-bold text-7xl lg:text-9xl">
        Loading...
      </h2>
      <Image
        src={search}
        alt=""
        width={80}
        height={80}
        className="lg:w-32 lg:h-32"
      />
    </div>
  );
}
