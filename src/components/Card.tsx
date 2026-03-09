import type { QUERY_RESULTS } from "@/constants";
import { SubtitlesIcon, Mic } from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function Card({ post }: { post: QUERY_RESULTS }) {
  const type = "tv";
  const link = `/${type}/${post.id}/info`;

  return (
    <Link
      to={link}
      className="group  flex flex-col overflow-hidden rounded-lg  transition-all duration-300 hover:shadow-lg"
    >
      {/* Image Container */}
      <figure className="relative aspect-[9/12] overflow-hidden ">
        <img
          loading="lazy"
          src={post.image}
          alt={post.title}
          className="h-full  w-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-box"
        />
        {/* Type Badge */}
        <div className="badge badge-primary absolute right-3 top-3 font-medium">
          {post.type}
        </div>
      </figure>

      {/* Content Container */}
      <div className="flex flex-1 flex-col gap-3 p-4 bg-linear-to-t from-base-200/60">
        {/* Title */}
        <h3 className="text-sm font-semibold leading-tight line-clamp-2 text-base-content">
          {post.title}
        </h3>

        {/* Info Footer */}
        <div className="mt-auto flex flex-row  items-center">
          {/* Duration */}

          {/* Availability Badges */}
          <div className="flex gap-2">
            {post.sub > 0 && (
              <div className="badge badge-primary badge-soft gap-1.5 badge-sm ring fade">
                <SubtitlesIcon size={14} />
                {/*CC*/}
              </div>
            )}
            {post.dub > 0 && (
              <div className="badge badge-accent badge-soft gap-1.5 badge-sm ring fade">
                <Mic size={14} />
              </div>
            )}
          </div>
          <div className="badge ring badge-soft badge-sm ml-2">{post.type}</div>
          <div className="text-xs text-base-content/60 ml-auto">
            {post.duration || `${post.episodes} episodes`}
          </div>
        </div>
      </div>
    </Link>
  );
}
