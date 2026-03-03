import { useState } from "react";
import type { TV_INFO_INTERFACE } from "@/constants";
import { extract_episode_id } from "@/helpers/funcs";
import { useNavigate, useParams } from "@tanstack/react-router";

export default function TvEpisodesList({
  episodes,
}: {
  episodes: TV_INFO_INTERFACE["episodes"];
}) {
  const { id, params, number } = useParams({
    strict: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const episodesPerPage = 100;

  const totalPages = Math.ceil(episodes.length / episodesPerPage);
  const startIndex = (currentPage - 1) * episodesPerPage;
  const endIndex = startIndex + episodesPerPage;
  const currentEpisodes = episodes.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const nav = useNavigate();

  return (
    <div className="mt-4 space-y-4 bg-base-200 p-4 rounded-md">
      <h2 className="text-lg ">Episodes</h2>
      <div className="grid grid-cols-[repeat(auto-fit,100px)]  gap-2">
        {currentEpisodes.map((episode) => {
          if (episode.number === parseInt(number)) {
            return (
              <div
                onClick={() => {
                  const ep_id = extract_episode_id(episode.id);
                  nav(`/tv/${id}/watch/${ep_id}/${episode.number}`, {
                    // params: {
                    //   id: id,
                    //   episode: String(ep_id),
                    //   number: String(episode.number),
                    // },
                  });
                }}
                key={episode.id}
                className="p-2 rounded-md w-[100px] btn btn-active btn-accent btn-soft"
              >
                <p>Ep:{episode.number}</p>
              </div>
            );
          }
          return (
            <div
              onClick={() => {
                const ep_id = extract_episode_id(episode.id);
                nav(`/tv/${id}/watch/${ep_id}/${episode.number}`, {
                  // params: {
                  //   id: id,
                  //   episode: String(ep_id),
                  //   number: String(episode.number),
                  // },
                });
              }}
              key={episode.id}
              className="p-2 rounded-md w-[100px] btn  btn-accent btn-soft"
            >
              <p>Ep:{episode.number}</p>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <div className="join flex-wrap">
            {" "}
            {/* Added flex-wrap for responsiveness */}
            <button
              className="join-item btn"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              «
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`join-item btn ${currentPage === page ? "btn-active" : ""}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="join-item btn"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
