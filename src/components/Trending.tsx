import { client } from "@/api/client";
import type { API_RESULTS, QUERY_RESULTS } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import GridSearchBar from "./GridSearchBar";
import GridContainer from "./GridContainer";
import Card from "./Card";
import { usePagination } from "@/helpers/hooks";

export default function Trending() {
  const { currentPage, totalPages, handlePageChange } = usePagination();

  const query = useQuery<API_RESULTS<QUERY_RESULTS>>({
    queryKey: ["trending", currentPage],
    queryFn: async () => {
      let resp = await client.get("top-airing", {
        params: { page: currentPage },
      });
      return resp.data;
    },
  });

  if (query.isLoading) {
    return (
      <div className="container mx-auto">
        <GridContainer>
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-xl animate-pulse"
            >
              <div className="aspect-[9/12] bg-base-300"></div>
              <div className="card-body">
                <div className="h-4 bg-base-300 rounded w-3/4"></div>
                <div className="h-4 bg-base-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </GridContainer>
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className="container mx-auto mt-8 h-[520px]">
        <div className="alert alert-error">
          <span>Error loading trending anime.</span>
          <div
            className="btn btn-primary btn-soft"
            onClick={() => {
              query.refetch();
            }}
          >
            Reload
          </div>
        </div>
      </div>
    );
  }

  const posts = query.data.results;
  return (
    <div className="container mx-auto mt-8">
      <GridContainer title="Trending" totalPages={query.data?.totalPages}>
        {posts.map((post) => (
          <Card post={post} key={post.id} />
        ))}
      </GridContainer>
    </div>
  );
}
