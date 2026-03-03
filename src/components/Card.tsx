import { pb } from "@/api/pocketbase";
import type { QUERY_RESULTS } from "@/constants";
import { user_atom, useUser } from "@/helpers/hooks";
import { useMutation } from "@tanstack/react-query";
import { useStore } from "jotai";
import { Mic, SubtitlesIcon, Bookmark } from "lucide-react";
import { ClientResponseError } from "pocketbase";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

export default function Card({ post }: { post: QUERY_RESULTS }) {
  const type = "tv";
  // post.type === "Movie" || post.type === "Special" ? "movie" : "tv";
  const link = `/${type}/${post.id}/info`;
  const store = useStore();
  const str = post.id;
  const match = str.match(/-(\d+)$/)?.[1] ?? "";
  const mutation = useMutation({
    mutationFn: async () => {
      const user = store.get(user_atom);
      if (!user) {
        toast.error("You must be logged in to do that");
        throw new Error("User not logged in");
      }
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
        title: post.title,
        tv_id: post.id,
        img: post.image,
      });
    },
    onSuccess: () => {
      toast.success("Bookmarked!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return (
    <div>
      <Link
        //@ts-ignore
        to={link}
        key={post.id}
        className="card card-compact group bg-base-300 shadow-xl transition-all duration-300 hover:shadow-2xl "
      >
        <figure className="relative aspect-[9/12] overflow-hidden">
          <img
            loading="lazy"
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="badge badge-primary absolute right-2 top-2">
            {post.type}
          </div>
          <button
            className="btn btn-circle btn-accent shadow absolute left-2 top-2 z-10"
            onClick={(e) => {
              e.preventDefault();
              mutation.mutate();
            }}
            disabled={mutation.isPending}
          >
            <Bookmark size={16} fill="white" />
          </button>
        </figure>
        <div className="card-body p-3">
          <h2 className="card-title text-sm font-semibold line-clamp-2 h-[2lh]">
            {post.title}
          </h2>
          {/*<p>{post.nsfw && <>true</>}</p>*/}
          <div className="mt-auto flex items-center justify-between pt-2 text-xs text-base-content/70">
            <span>{post.duration || `${post.episodes} eps`}</span>
            <div className="flex gap-2">
              {post.sub > 0 && (
                <div className="badge badge-primary badge-soft">
                  Sub
                  {/*<SubtitlesIcon></SubtitlesIcon>*/}
                </div>
              )}
              {post.dub > 0 && (
                <div className="badge badge-accent badge-soft">
                  {/*<Mic />*/}Dub
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
