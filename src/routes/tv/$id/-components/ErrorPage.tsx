import type { UseQueryResult } from "@tanstack/react-query";

export default function ErrorPage({ query }: { query?: UseQueryResult }) {
  const error = query?.error;
  return (
    <div className="min-h-screen flex bg-base-200">
      <div className="flex-1 grid place-items-center">
        <div className="grid gap-2">
          {" "}
          <h2 className="text-xl font-bold">{error["message"]}</h2>
          <div onClick={() => query.refetch} className="btn btn-error">
            Reload
          </div>
        </div>
      </div>
    </div>
  );
}
