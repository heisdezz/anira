import { pb } from "@/api/pocketbase";
import GridContainer from "@/components/GridContainer";
import StatePaginator from "@/components/StagePaginator";
import { useInternalPagination, useUser } from "@/helpers/hooks";
import type { BookmarkModel } from "@/helpers/types";
import { useQuery } from "@tanstack/react-query";
import type { ListResult } from "pocketbase";
import { Link } from "@tanstack/react-router";

export default function Bookmarks() {
  const [user] = useUser();
  const paginate = useInternalPagination();
  const query = useQuery<ListResult<BookmarkModel>>({
    queryKey: ["BookMarks", user?.id, paginate.currentPage],
    queryFn: async () => {
      let resp = await pb
        .collection("bookmarks")
        .getList<BookmarkModel>(paginate.currentPage, 10, {
          filter: `user_id = "${user?.id}"`,
        });
      return resp;
    },
    enabled: !!user,
  });

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-base-content">
        Please log in to view your bookmarks.
      </div>
    );
  if (query.isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (query.isError)
    return (
      <div className="min-h-screen flex items-center justify-center text-error text-2xl">
        Error loading bookmarks.
      </div>
    );
  if (!query.data?.items || query.data.items.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-base-content">
        No bookmarks found.
      </div>
    );

  return (
    <>
      <GridContainer disablePaginate>
        {query.data?.items.map((item) => (
          <div
            key={item.id}
            className="card card-compact w-full bg-base-100 shadow-xl image-full transition-transform duration-300 hover:scale-105 group"
          >
            <figure className="relative overflow-hidden rounded-box">
              <img
                src={item.img}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt={item.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base-300 via-transparent to-transparent opacity-70"></div>
            </figure>
            <div className="card-body justify-end p-4 relative z-10">
              <Link to={`/tv/${item.tv_id}/info`}>
                <h2 className="card-title text-base-content text-lg md:text-xl line-clamp-2">
                  {item.title}
                </h2>
              </Link>
              <div className="card-actions justify-end mt-2">
                <Link
                  to={`/tv/${item.tv_id}/info`}
                  className="btn btn-primary btn-sm md:btn-md transition-all duration-300 group-hover:btn-accent"
                >
                  View Info
                </Link>
              </div>
            </div>
          </div>
        ))}
      </GridContainer>
      <StatePaginator totalPages={query.data?.totalPages | 1} {...paginate} />
    </>
  );
}
