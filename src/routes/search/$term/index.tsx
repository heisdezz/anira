import { createFileRoute } from "@tanstack/react-router";
import { client } from "@/api/client";
import Card from "@/components/Card";
import GridContainer from "@/components/GridContainer";
import type { QUERY_RESULTS } from "@/constants";
import { Search } from "lucide-react";

export const Route = createFileRoute("/search/$term/")({
  component: RouteComponent,
  validateSearch: (search): { currentPage?: any } => {
    return search;
  },
  loaderDeps: ({ search: { currentPage } }) => ({ currentPage }),
  loader: async ({ params, deps: { currentPage } }) => {
    const { term } = params;
    const response = await client.get(`/${term}`, {
      params: {
        page: currentPage,
      },
    });
    return response.data as QUERY_RESULTS;
  },
  head: () => ({
    meta: [
      { title: "Search Results" },
      { name: "description", content: "Search anime and movies" },
    ],
  }),
});

function RouteComponent() {
  const { term } = Route.useParams();
  const loader_data = Route.useLoaderData();
  const results = loader_data;
  const resultCount = results?.results?.length || 0;
  const decodedTerm = decodeURIComponent(term);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        {/* Search Icon & Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Search size={28} className="text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-base-content/60 font-medium">
              Showing results for
            </p>
            <h1 className="text-3xl font-bold text-primary break-words">
              "{decodedTerm}"
            </h1>
          </div>
        </div>

        {/* Accent Line */}
        <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full mb-4" />

        {/* Result Count */}
        <div className="flex items-center gap-2 text-base-content/70">
          <span className="text-sm font-medium">
            {resultCount === 0
              ? "No results found"
              : `Found ${resultCount} ${resultCount === 1 ? "result" : "results"}`}
          </span>
        </div>
      </div>

      {/* Results Grid or Empty State */}
      <div className="min-h-[520px]">
        {results?.results && results.results.length > 0 ? (
          <GridContainer totalPages={results.totalPages}>
            {results.results.map((item) => (
              <Card post={item} key={item.id} />
            ))}
          </GridContainer>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-12">
            <div className="p-6 bg-base-200 rounded-lg mb-4">
              <Search size={48} className="text-base-content/30" />
            </div>
            <h3 className="text-2xl font-bold text-base-content/80 mb-2">
              No results found
            </h3>
            <p className="text-base-content/60 text-center max-w-sm">
              We couldn't find anything matching "{decodedTerm}". Try adjusting
              your search or browse our categories instead.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
