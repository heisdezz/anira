import { client } from "@/api/client";
import type { API_RESULTS, SPOTLIGHT_RESULT } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import {
  Bike,
  Calendar1Icon,
  Mic2Icon,
  MoveLeft,
  MoveRight,
  PlayIcon,
  SubtitlesIcon,
  TimerIcon,
} from "lucide-react";
import BackgroundGrid from "./BackgrounGrid";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "@tanstack/react-router";

interface RESULTS extends API_RESULTS<SPOTLIGHT_RESULT> {}

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const query = useQuery<RESULTS>({
    queryKey: ["top-airing"],
    queryFn: async () => {
      let response = await client.get(`spotlight`);
      let data = await response.data;
      return data;
    },
  });

  const trending_items = query.data?.results;

  // useEffect(() => {
  //   if (!emblaApi) return;
  //   onSelect();
  //   emblaApi.on("select", onSelect);
  // }, [emblaApi, onSelect]);

  // useEffect(() => {
  //   if (emblaApi && trending_items && trending_items.length > 0) {
  //     const intervalId = setInterval(() => {
  //       emblaApi.scrollNext();
  //     }, 5000);

  //     return () => clearInterval(intervalId);
  //   }
  // }, [emblaApi, trending_items]);

  if (query.isLoading) {
    return (
      <div className="bg-base-200 place-items-center grid h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (query.isError || !trending_items || trending_items.length === 0) {
    return (
      <div className="bg-base-200 place-items-center grid h-screen">
        <div className="flex flex-col items-center  gap-2">
          <div className="text-error">Failed to load Spotlight.</div>
          <button className="btn btn-primary" onClick={() => query.refetch()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className=" flex px-3 md:px-0  h-[calc(100dvh-80px)]">
      <div className=" mx-auto flex flex-1  rounded-md isolate  ">
        <BackgroundGrid />
        <div className="relative flex-1  flex">
          <div className="absolute right-0 z-20 flex gap-2 p-2">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className="btn btn-square btn-lg"
            >
              <MoveLeft />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              className="btn btn-square btn-lg"
            >
              <MoveRight />
            </button>
          </div>
          <section
            className="embla flex-1 bg-base-200 rounded-xl overflow-hidden flex "
            ref={emblaRef}
          >
            <div className="embla__container flex-1">
              {query.data?.results.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="embla__slide flex flex-1 relative flex-col md:flex-row"
                  >
                    <div className="flex-1 flex relative h-1/2 md:h-full">
                      <div className="bg-linear-to-t from-base-100/10 to-transparent via-base-200/20 absolute size-full md:bg-linear-to-r"></div>
                      <img
                        loading="lazy"
                        src={item.banner}
                        className="object-cover flex-1"
                        alt=""
                      />
                    </div>
                    <div className="absolute bottom-0 h-1/2 md:h-full w-full  pb-12 bg-linear-to-t via-base-200/20 to-transparent from-base-200 6 md:pl-12  via-70% md:bg-linear-to-r flex">
                      <section className="flex-1 p-4  container mx-auto flex">
                        <div className="space max-w-xl  mt-auto  space-y-3 md:space-y-6">
                          <p className="text-sm md:text-2xl font-bold text-primary ">
                            Spotlight #{item.rank}
                          </p>
                          <h2 className="text-2xl md:text-4xl font-bold">
                            {item.title}
                          </h2>
                          <div className="flex flex-wrap gap-2 md:gap-4 text-sm md:text-base ">
                            <span className="flex gap-1 md:gap-2 items-center">
                              <PlayIcon className="size-4 md:size-auto" />
                              {item.type}
                            </span>
                            <span className="flex gap-1 md:gap-2 items-center">
                              {" "}
                              <TimerIcon className="size-4 md:size-auto" />
                              {item.duration}
                            </span>
                            <span className="badge badge-accent badge-soft">
                              {item.quality}
                            </span>
                            <span className="flex gap-1 md:gap-2 items-center">
                              <Calendar1Icon className="size-4 md:size-auto" />
                              {item.releaseDate}
                            </span>
                            <span className="join">
                              <span className="badge join-item badge-primary badge-soft">
                                {/*<SubtitlesIcon className="size-4 md:size-auto" />*/}
                                Sub: {item.sub}
                              </span>
                              <span className="badge join-item badge-accent badge-soft">
                                Dub:{" "}
                                {/*<Mic2Icon className="size-4 md:size-auto" />*/}
                                {item.dub}
                              </span>
                            </span>
                          </div>
                          <p className="line-clamp-2 md:line-clamp-3 overflow-ellipsis text-sm md:text-base">
                            {item.description}
                          </p>
                          <div className="space-x-1 md:space-x-2">
                            <Link
                              to={"/tv/" + item.id + "/info"}
                              className="btn btn-primary btn-sm md:btn-xl"
                            >
                              Watch Now
                            </Link>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
