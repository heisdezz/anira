import { pb } from "@/api/pocketbase";
import type { TV_INFO_INTERFACE } from "@/constants";
import { useUser } from "@/helpers/hooks";
import type { HistoryModel } from "@/helpers/types";
import { useMutation } from "@tanstack/react-query";
import { Bookmark } from "lucide-react";
import { ClientResponseError } from "pocketbase";
import { useLocation, useParams } from "react-router";
import { useTimer } from "react-timer-hook-ts";

export default function TvDetails({ info }: { info: TV_INFO_INTERFACE }) {
  const [user] = useUser();
  const { episode, number } = useParams();
  const url = useLocation();
  // const mutation = useMutation({
  //   mutationFn: async () => {
  //     if (!user) return;
  //     const id = user.id + parseInt(episode);
  //     let resp = await pb
  //       .collection("history")
  //       .getOne(id)
  //       .catch((err) => {
  //         if (err instanceof ClientResponseError) {
  //           if (err.status == 404) {
  //             return;
  //           }
  //         }
  //         throw err;
  //       });
  //     if (resp) return;
  //     return await pb.collection("history").create<HistoryModel>({
  //       id: id,
  //       user_id: user.id,
  //       url: url.pathname,
  //       title: info.title,
  //       info_id: info.id,
  //       img_url: info.image,
  //       episode_number: number,
  //       episode_id: episode,
  //     });
  //   },
  // });
  //
  // const mutation = useMutation({
  //   mutationFn: async () => {
  //     if (!user) return;

  //     const id = user.id + parseInt(episode);

  //     try {
  //       const existing = await pb.collection("history").getOne(id);

  //       // Update if exists
  //       return await pb.collection("history").update<HistoryModel>(id, {
  //         user_id: user.id,
  //         url: url.pathname,
  //         title: info.title,
  //         info_id: info.id,
  //         img_url: info.image,
  //         episode_number: number,
  //         episode_id: episode,
  //       });
  //     } catch (err) {
  //       if (err instanceof ClientResponseError) {
  //         if (err.status === 404) {
  //           // create new record
  //           return await pb.collection("history").create<HistoryModel>({
  //             id,
  //             user_id: user.id,
  //             url: url.pathname,
  //             title: info.title,
  //             info_id: info.id,
  //             img_url: info.image,
  //             episode_number: number,
  //             episode_id: episode,
  //           });
  //         } else if (err.status === 403) {
  //           console.warn(
  //             "Forbidden: you don't have permission to access this record",
  //           );
  //           return null; // stop mutation, don’t retry
  //         }
  //       }
  //       throw err; // rethrow other errors
  //     }
  //   },
  //   onError: (err) => console.error("PocketBase error:", err),
  // });

  const { time } = useTimer({
    initialTime: 30,
    onTimerEnd: () => {
      // if (!mutation.isPending && !mutation.isSuccess) {
      //   mutation.mutateAsync();
      // }
    },
  });

  return (
    <>
      <div className="flex mt-4 via-transparent rounded-md flex-col md:flex-row bg-gradient-to-t from-base-300 ">
        {/*{time}*/}
        <div className="mx-auto w-fit ">
          {/*<button
            className="btn btn-block mt-4 btn-primary"
            onClick={() => {
              toast.promise(() => mutation.mutateAsync(), {
                loading: "bookmarking",
                success: () => <div>Bookmarked!</div>,
                error: () => <div>Error bookmarking</div>,
              });
            }}
          >
            <Bookmark /> Bookmark
          </button>*/}
          <img
            src={info.image}
            className="w-3xs aspect-[9/12] self-start "
            alt=""
          />
          <button className="btn btn-block mt-4 btn-primary">
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
          <p className="p-4 text-sm bg-base-200 roudned-md  rounded-md">
            {info.description}
          </p>
        </div>
      </div>
    </>
  );
}
