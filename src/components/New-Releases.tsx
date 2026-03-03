import { client } from "@/api/client";
import type { API_RESULTS, QUERY_RESULTS } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { AudioLinesIcon, Subtitles } from "lucide-react";
import type { PropsWithChildren } from "react";
import SideCard from "./SideCard";
import { nanoid } from "nanoid";

export default function NewReleases() {
  const query = useQuery<API_RESULTS<QUERY_RESULTS>, AxiosError>({
    queryKey: ["new-releases"],
    queryFn: async () => {
      const response = await client.get(`new-releases`);
      return response.data;
    },
  });

  const arr = Array.from({ length: 10 }).fill(null);
  if (query.isLoading) {
    return (
      <div className="w-xs space-y-4 p-4 rounded-md flex flex-col ">
        <h2 className="text-xl font-bold mb-4">New Releases</h2>
        <div className="gap-2  flex flex-col flex-1s">
          {arr.map((item) => {
            return (
              <div className=" flex-1 skeleton w-full " key={nanoid(10)}>
                <div className="h-[90px]"></div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (query.error) {
    return (
      <>
        <div className="w-xs space-y-4 p-4 rounded-md">
          <h2 className="text-xl font-bold mb-4">New Releases</h2>
          <div className="flex-1 gap-2 p-4 grid place-items-center">
            <div className="text-center space-y-2 bg-base-100 p-4 rounded-md">
              <h2>Error Occured</h2>
              <button className="btn btn-error">Refetch</button>
            </div>
          </div>
        </div>
      </>
    );
  }
  const items = query.data.results;
  return (
    <div className="w-xs space-y-4 p-4 ">
      <h2 className="text-xl font-bold mb-4">New Releases</h2>

      <div className="space-y-4 ">
        {items.map((item) => (
          <SideCard item={item} key={"new_release" + item.id} />
        ))}
      </div>
    </div>
  );
}

const NewReleasesContainer = (props: PropsWithChildren) => {
  return <></>;
};
