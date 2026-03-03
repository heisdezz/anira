import { client } from "@/api/client";
import type { TV_INFO_INTERFACE } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import TvWatchSkeleton from "../../../_components/TvWatchSkeleton";
// import SimplePlayer from "@/components/VideoPlayer.client";
import { useParams } from "react-router";
import { ClientOnly } from "remix-utils/client-only";
import { pb } from "@/api/pocketbase";
import { useUser } from "@/helpers/hooks";
import RouteData from "./_components/RouteData";

export default function index() {
  const { id, episode, number } = useParams();
  const [user] = useUser();

  const query = useQuery<TV_INFO_INTERFACE>({
    queryKey: [id],
    queryFn: async () => {
      let resp = await client.get("info", {
        params: {
          id,
        },
      });
      return resp.data;
    },
  });

  if (query.isLoading) return <TvWatchSkeleton />;

  const tv_data = query.data;
  const clean = id.replace(/-\d+$/, "").replace(/-/g, " ");
  return (
    <>
      <ClientOnly>
        {() => {
          return <RouteData clean={clean} tv_data={tv_data} />;
        }}
      </ClientOnly>
    </>
  );
}
