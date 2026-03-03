export default function TvSkeleton() {
  return (
    <>
      <div className="h-[150px] bg-base-200 relative skeleton">
        {/*<img
        src={tv_data?.image}
        className="size-full object-cover"
        loading="lazy"
        alt=""
      />*/}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-base-100"></div>
      </div>
      <div className="flex gap-2 min-h-dvh container mx-auto">
        <div className="skeleton flex-1"></div>
        <div className="skeleton flex-1 max-w-xs hidden lg:block"></div>
      </div>
    </>
  );
}
