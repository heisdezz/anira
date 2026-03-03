import { client } from "@/api/client";
import type { API_RESULTS, TV_INFO_INTERFACE } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import TvInfo from "../_components/TvInfo";
import TvSkeleton from "../_components/Skeleton";
import { scale_up_img } from "@/helpers/funcs";
import type { AxiosError } from "axios";
import ErrorPage from "../_components/ErrorPage";
import { useParams } from "react-router";

export default function index() {
  const { id } = useParams<string>();
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
  const tv_data = query.data;

  if (query.isLoading) return <TvSkeleton />;
  if (!query.data || query.isError) {
    const error = query.error as AxiosError;
    return <ErrorPage query={query} />;
  }
  // const scaled = scale_up_img(tv_data.image)
  return (
    <>
      <div className="h-[150px] bg-base-200 relative">
        <img
          src={tv_data?.image}
          className="size-full object-cover "
          loading="lazy"
          alt=""
        />
        <div className="absolute top-0 left-0 w-full backdrop-blur-sm h-full bg-gradient-to-t from-base-100"></div>
      </div>
      <TvInfo info={tv_data} />
    </>
  );
}
