import { Heart } from "lucide-react";

export default function MainFooter() {
  return (
    <div>
      <hr className="text-gray-600 w-full mt-4" />
      <div className="w-full px-5 lg:px-8">
        <p className="text-center text-gray-400 flex justify-center items-center gap-1.5 my-3">
          Built with <Heart fill="red" className="text-red-700" /> by Miladev
        </p>
      </div>
    </div>
  );
}
