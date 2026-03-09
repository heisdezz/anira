import { client } from "@/api/client";
import type { TV_INFO_INTERFACE } from "@/constants";
// import SimplePlayer from "@/components/VideoPlayer.client";
import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import SimplePlayer from "#/components/VideoPlayer.client";
import { Suspense } from "react";
import TvDetails from "../../../-components/TvDetails";
import TvRecommendations from "../../../-components/Recommendations";
export const Route = createFileRoute("/tv/$id/watch/$episode/$number/")({
  component: index,
  errorComponent: ({ error }) => (
    <div className="min-h-screen grid place-items-center">error ocured</div>
  ),
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
  // return <>{JSON.stringify(loader_data)}</>;
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
              <Suspense
                key={episode}
                fallback={
                  <div className="skeleton aspect-video w-full bg-primary/5">
                    {/*Loading...*/}
                  </div>
                }
              >
                <>
                  <ClientOnly
                    fallback={
                      <div className="skeleton aspect-video w-full bg-primary/5"></div>
                    }
                  >
                    <SimplePlayer />
                  </ClientOnly>
                </>
              </Suspense>
              {/*<VideoPlayer2 />*/}
            </div>
            {/*<TvEpisodesList episodes={tv_data.episodes || []} />*/}
            <Suspense
              fallback={
                <div className="skeleton w-full bg-primary/5">
                  {/*Loading...*/}
                </div>
              }
            >
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
