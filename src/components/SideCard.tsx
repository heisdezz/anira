import type { QUERY_RESULTS } from "@/constants";
import { AudioLinesIcon, Subtitles } from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function SideCard({ item }: { item: QUERY_RESULTS }) {
  const type = "tv";
  // post.type === "Movie" || post.type === "Special" ? "movie" : "tv";
  const link = `/${type}/${item.id}/info`;

  return (
    <div>
      <Link
        to={link}
        key={item.id}
        className="flex bg-base-100 rounded-md shadow-xl hover:shadow-2xl transition duration-200"
      >
        <figure className="flex-1 max-w-20 min-w-20 aspect-[9/12] flex-shrink-0">
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="ml-2 py-2 flex flex-col justify-center">
          <h3 className="font-bold text-sm line-clamp-1 h-[1lh]">
            {item.title}
          </h3>
          <div className="text-sm text-base-content/80 space-x-2 mt-1">
            <div className="badge badge-soft badge-primary badge-sm">
              {item.type}
            </div>
            <span className="text-xs">{item.duration}</span>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <span className="text-xs label">
              Episodes: <span className="font-medium">{item.episodes}</span>
            </span>
            <div className="join">
              <div className="join-item badge badge-primary badge-soft badge-xs">
                {/*<Subtitles />*/}Subs
                {item.sub && <span className="text-success">{item.sub}</span>}
              </div>
              <div className="join-item badge badge-accent badge-soft badge-xs">
                {/*<AudioLinesIcon />*/}Dubs
                {item.sub && <span className="text-success">{item.dub}</span>}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
