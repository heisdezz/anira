import type { TV_INFO_INTERFACE } from "@/constants";
import { Bookmark } from "lucide-react";

export default function TvDetails({ info }: { info: TV_INFO_INTERFACE }) {
  return (
    <div className="mt-4 rounded-lg   ">
      <div className="flex flex-col md:flex-row  ">
        {/* Poster Section */}
        <div className="flex flex-col  gap-3 flex-1 max-w-xs relative isolate rounded-l-lg overflow-clip">
          <img
            src={info.image}
            className="-z-10 blur-lg brightness-50  absolute size-full inset-0   rounded-l-lg rounded-lg shadow-lg object-cover"
            alt={info.title}
          />
          <img
            src={info.image}
            className="w-48 aspect-[9/12] z-20 m-auto rounded-xl shadow-lg object-cover"
            alt={info.title}
          />
          {/*<button className="btn btn-primary btn-sm gap-2">
            <Bookmark size={18} />
            Bookmark
          </button>*/}
        </div>

        {/* Details Section */}
        <div className="flex-1 space-y-4 p-4  rounded-r-lg from-base-200/50  bg-linear-to-t">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-1">
              {info.title}
            </h1>
            <p className="text-sm text-base-content/70">{info.japaneseTitle}</p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            <div>
              <span className="font-semibold text-base-content/70">Status</span>
              <p className="font-medium">{info.status}</p>
            </div>
            <div>
              <span className="font-semibold text-base-content/70">Season</span>
              <p className="font-medium">{info.season}</p>
            </div>
            <div>
              <span className="font-semibold text-base-content/70">Type</span>
              <p className="font-medium">{info.type}</p>
            </div>
            <div>
              <span className="font-semibold text-base-content/70">
                Episodes
              </span>
              <p className="font-medium">{info.totalEpisodes}</p>
            </div>
            <div>
              <span className="font-semibold text-base-content/70">Dub</span>
              <p className="font-medium">{info.hasDub}</p>
            </div>
            <div>
              <span className="font-semibold text-base-content/70">Sub</span>
              <p className="font-medium">{info.hasSub}</p>
            </div>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 pt-2">
            {info.genres.map((item) => (
              <span key={item} className="badge badge-primary">
                {item}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-base-content/80 pt-2">
            {info.description}
          </p>
        </div>
      </div>
    </div>
  );
}
