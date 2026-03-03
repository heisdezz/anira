import { Frown } from "lucide-react";

export default function EmptyList({ list }: { list: any[] }) {
  if (list.length > 0) {
    return null;
  }
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center  text-gray-500 bg-base-300 my-4 ring ring-current/20 rounded-box py-12 shadow">
      <Frown className="h-12 w-12 mb-2" />
      <span className="text-lg font-medium">No Data Found</span>
      <span className="text-sm">
        It looks like there's nothing to display here.
      </span>
    </div>
  );
}
