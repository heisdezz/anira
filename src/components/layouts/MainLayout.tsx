import type { PropsWithChildren } from "react";
import Trending from "../Trending";
import NewReleases from "../New-Releases";

export default function MainLayout(props: PropsWithChildren) {
  return (
    <div className="container mx-auto flex gap-2 mt-4">
      <div className="flex-1 bg-gradient-to-t "> {props.children}</div>
      <div className="flex-1 hidden lg:block max-w-xs bg-base-200 rounded-md">
        <NewReleases />
        {/*<Trending />*/}
      </div>
    </div>
  );
}
