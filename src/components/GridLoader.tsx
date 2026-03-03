import type { PropsWithChildren } from "react";
import SimplePaginator from "./SimplePaginator";
import GridSearchBar from "./GridSearchBar";
import SkeletonCard from "./SkeletonCard";
import { nanoid } from "nanoid";
interface GridContainerProps {
  children?: React.ReactNode;
  title?: string;
  searchBar?: boolean;
  totalPages?: number;
}

export default function GridLoader(props: GridContainerProps) {
  const arr = Array.from({ length: 40 }).fill(null);
  return (
    <div className="">
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
      <section className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2">
        {arr.map((_, index) => (
          <SkeletonCard key={nanoid(10)} />
        ))}
      </section>
      <div className="mt-8 mb-20 grid place-items-center">
        <SimplePaginator totalPage={props.totalPages} />
      </div>
    </div>
  );
}
