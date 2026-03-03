import SideCard from "@/components/SideCard";
import type { TV_INFO_INTERFACE } from "@/constants";
import { AudioLinesIcon, Subtitles } from "lucide-react";

export default function TvRecommendations({
  items,
}: {
  items: TV_INFO_INTERFACE["recommendations"];
}) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Recommendations</h2>
      <div className="space-y-4 ">
        {items.map((item) => (
          <SideCard key={"recocommendations" + item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
