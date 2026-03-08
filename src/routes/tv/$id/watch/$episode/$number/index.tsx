import { client } from "@/api/client";
import type { TV_INFO_INTERFACE } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import TvWatchSkeleton from "../../../_components/TvWatchSkeleton";
// import SimplePlayer from "@/components/VideoPlayer.client";
import { pb } from "@/api/pocketbase";
import { useUser } from "@/helpers/hooks";
import { createFileRoute } from "@tanstack/react-router";
import RouteData from "./-components/RouteData";
import SimplePlayer from "#/components/VideoPlayer.client";
import TvEpisodesList from "../../../_components/TvEpisodesList";
import { Suspense } from "react";
import TvDetails from "../../../_components/TvDetails";
import TvRecommendations from "../../../_components/Recommendations";
export const Route = createFileRoute("/tv/$id/watch/$episode/$number/")({
  component: index,
  ssr: true,
  loader: async ({ params }) => {
    const { id } = params;
    console.log("server loader");
    let resp = await client.get("info", {
      params: {
        id,
      },
    });
    return resp.data as TV_INFO_INTERFACE;
  },
});

function index() {
  const { id, episode, number } = Route.useParams();
  const loader_data = Route.useLoaderData();
  // const query = useQuery<TV_INFO_INTERFACE>({
  //   queryKey: [id],
  //   queryFn: async () => {
  //     let resp = await client.get("info", {
  //       params: {
  //         id,
  //       },
  //     });
  //     return resp.data;
  //   },
  // });

  // return <>{JSON.stringify(loader_data)}</>;
  // if (query.isLoading) return <TvWatchSkeleton />;

  const tv_data: any = loader_data;
  const clean = id.replace(/-\d+$/, "").replace(/-/g, " ");
  return (
    <>
      <div className="">
        <div className="container mx-auto flex gap-2">
          <div className="flex-1 ">
            <div className=" p-4 rounded-md mb-4 bg-base-200 ">
              <span>Watch:</span> {clean} Episode:{number}
            </div>
            <div className="w-full aspect-video ">
              <SimplePlayer />
              {/*<VideoPlayer2 />*/}
            </div>
            <TvEpisodesList episodes={tv_data.episodes || []} />
            <Suspense>
              <TvDetails info={tv_data} />
            </Suspense>
          </div>
          <div className="flex-1 hidden lg:block max-w-xs bg-base-200">
            <TvRecommendations items={tv_data?.recommendations} />
          </div>
          {/*{id}
          {episode}*/}
        </div>
      </div>
    </>
  );
}
