import { client } from "@/api/client";
import BackgroundGrid from "@/components/BackgrounGrid";
import Card from "@/components/Card";
import GridContainer from "@/components/GridContainer";
import GridLoader from "@/components/GridLoader";
import MainLayout from "@/components/layouts/MainLayout";
import type { API_RESULTS, QUERY_RESULTS } from "@/constants";
import { usePagination } from "@/helpers/hooks";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { AxiosError } from "axios";

export const Route = createFileRoute("/category/tv/")({
  head: () => ({
    meta: [
      { title: "Category: TV Shows" },
      { name: "description", content: "Browse TV shows" },
    ],
  }),
  component: CategoryTvPage,
});

function CategoryTvPage() {
  const { currentPage } = usePagination();
  const query = useQuery<API_RESULTS<QUERY_RESULTS>, AxiosError>({
    queryKey: ["category", "tv", currentPage],
    queryFn: async () => {
      const resp = await client.get("/tv", {
        params: {
          page: currentPage,
        },
      });
      return resp.data;
    },
  });

  if (query.isLoading) {
    return (
      <MainLayout>
        <GridLoader title="Category: TV" />
      </MainLayout>
    );
  }

  const results = query.data.results;
  return (
    <div className="container mx-auto">
      <BackgroundGrid />
      <MainLayout>
        <GridContainer title="Category: TV" totalPages={query.data.totalPages}>
          {results.map((item) => (
            <Card key={item.id} post={item} />
          ))}
        </GridContainer>
      </MainLayout>
    </div>
  );
}
