import VideoPlayer2 from "#/components/VideoPlayer2";
import TvRecommendations from "#/routes/tv/$id/-components/Recommendations";
import TvDetails from "#/routes/tv/$id/-components/TvDetails";
import TvEpisodesList from "#/routes/tv/$id/-components/TvEpisodesList";

import type { TV_INFO_INTERFACE } from "@/constants";
import { useParams } from "@tanstack/react-router";

export default function RouteData({
  clean,
  tv_data,
}: {
  clean: string;
  tv_data: TV_INFO_INTERFACE;
}) {
  const { id, episode, number } = useParams({
    strict: false,
  });

  return (
    <div>
      <div className="">
        <div className="container mx-auto flex gap-2">
          <div className="flex-1 ">
            <div className=" p-4 rounded-md mb-4 bg-base-200 ">
              <span>Watch:</span> {clean} Episode:{number}
            </div>
            <div className="w-full  ">
              <VideoPlayer2 />
            </div>
            <TvEpisodesList episodes={tv_data.episodes || []} />
            <TvDetails info={tv_data} />
          </div>
          <div className="flex-1 hidden lg:block max-w-xs bg-base-200">
            <TvRecommendations items={tv_data?.recommendations} />
          </div>
          {/*{id}
          {episode}*/}
        </div>
      </div>
    </div>
  );
}
