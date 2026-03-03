import type { TV_INFO_INTERFACE } from "@/constants";
import { Bookmark } from "lucide-react";
import TvRecommendations from "./Recommendations";
import TvEpisodesList from "./TvEpisodesList";
import TvRelatedShows from "./TvRelatedShows";
import { toast } from "sonner";
import { pb } from "@/api/pocketbase";
import { useUser } from "@/helpers/hooks";
import { ClientResponseError } from "pocketbase";
import { useMutation } from "@tanstack/react-query";

export default function TvInfo({ info }: { info: TV_INFO_INTERFACE }) {
  const str = info.id;
  const match = str.match(/-(\d+)$/)?.[1] ?? "";
  const [user] = useUser();
  const mutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("User not logged in");
      const new_id = user.id + match;
      let resp = await pb
        .collection("bookmarks")
        .getOne(new_id)
        .catch((err) => {
          if (err instanceof ClientResponseError) {
            if (err.status === 404) {
              return;
            }
            throw err;
          }
        });
      if (resp) return;
      await pb.collection("bookmarks").create({
        id: new_id,
        user_id: user.id,
        title: info.title,
        tv_id: info.id,
        img: info.image,
      });
    },
    onSuccess: () => {},
    onError: (error) => {},
  });
  return (
    <div className="container mx-auto flex gap-2 min-h-dvh">
      <div className="flex-1 bg-gradient-to-t ">
        <div className="flex flex-col md:flex-row bg-gradient-to-t from-base-200 via-transparent shadow">
          <div className="mx-auto w-fit ">
            <img
              src={info.image}
              className="w-3xs aspect-[9/12] self-start "
              alt=""
            />
            <button
              className="btn btn-block mt-4 btn-primary"
              onClick={async () => {
                toast.promise(mutation.mutateAsync(), {
                  loading: "Adding bookmark...",
                  error: "Failed to add bookmark",
                  success: "Bookmark added",
                });
              }}
            >
              <Bookmark /> Bookmark
            </button>
          </div>
          <div className="space-y-4 ml-3 flex-1 w-fit">
            <h2 className="text-2xl font-bold mt-4">{info.title}</h2>
            <p>{info.japaneseTitle}</p>
            <section className="grid-cols-2 grid text-sm gap-2">
              <div>
                <span className="">Status: </span>
                {info.status}
              </div>
              <div>
                <span className="">Season: </span>
                {info.season}
              </div>
              <div>
                <span className="">Dub: </span>
                {info.hasDub}
              </div>
              <div>
                <span className="">Sub: </span>
                {info.hasSub}
              </div>
              <div>
                <span className="">Episodes: </span>
                {info.totalEpisodes}
              </div>
              <div>
                <span className="">SuborDub: </span>
                {info.subOrDub}
              </div>
              <div>
                <span className="">Type: </span>
                {info.type}
              </div>
            </section>
            <section className="flex gap-2 flex-wrap">
              {info.genres.map((item) => {
                return (
                  <span className="badge badge-primary badge-sm">{item}</span>
                );
              })}
            </section>
            <p className="p-4 text-sm bg-base-200 roudned-md">
              {info.description}
            </p>
          </div>
        </div>
        <TvEpisodesList episodes={info.episodes} />
        <TvRelatedShows shows={info.relatedAnime} />
      </div>
      <div className="flex-1 hidden lg:block max-w-xs bg-base-200">
        <TvRecommendations items={info.recommendations} />
      </div>
    </div>
  );
}
