import type { PropsWithChildren } from "react";
import SimplePaginator from "./SimplePaginator";
import GridSearchBar from "./GridSearchBar";
interface GridContainerProps {
  children: React.ReactNode;
  title?: string;
  searchBar?: boolean;
  totalPages?: number;
  disablePaginate?: boolean;
}

export default function GridContainer(props: GridContainerProps) {
  return (
    <div className="px-3 md:px-0 isolate">
      <div className="flex items-center ">
        {props?.title?.trim() && (
          <h2 className="text-xl font-bold">{props.title}</h2>
        )}
        {props.searchBar && (
          <div className="ml-auto">
            <GridSearchBar />
          </div>
        )}
      </div>
      <section className="mt-4 min-h-[520px] grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2">
        {props.children}
      </section>

      {!props.disablePaginate && (
        <div className="mt-8 mb-12 grid place-items-center z-20">
          <SimplePaginator totalPage={props.totalPages} />
        </div>
      )}
    </div>
  );
}
