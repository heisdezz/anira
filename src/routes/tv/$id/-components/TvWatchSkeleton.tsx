export default function TvWatchSkeleton() {
  return (
    <div className="container mx-auto flex gap-2">
      <div className=" flex-1 ">
        <div className="bg-base-200 skeleton py-8 rounded-md w-full mb-4"></div>
        <div className="aspect-video flex-1 bg-base-200 skeleton"></div>
      </div>
      <div className="flex-1 hidden max-w-xs lg:block skeleton min-h-[250px]"></div>
    </div>
  );
}
