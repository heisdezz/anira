import { pb } from "@/api/pocketbase";
import { useUser } from "@/helpers/hooks";
import { useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router";
import WatchHistory from "./_components.tsx/WatchHistory";
import Bookmarks from "./_components.tsx/BookMarks";

export default function index() {
  const [user] = useUser();
  const nav = useNavigate();
  useLayoutEffect(() => {
    if (!user) {
      nav("/auth/login");
    }
  }, [user]);
  if (!user) return;
  return (
    <>
      <div className="h-[150px] bg-base-200 relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-base-100  via-base-200/50 z-20"></div>
        <img
          src="auth_bg.webp"
          className="size-full object-cover blur-sm"
          alt=""
        />
      </div>
      <div className="container mx-auto min-h-screen ">
        <section className=" mt-2 space-y-4">
          <div className="size-32 rounded-full bg-primary/5 ring-primary/50 aspect-square ring grid place-items-center text-xl font-bold capitalize ">
            {user.username.slice(0, 2)}
          </div>
          <div className="px-2 space-y-1">
            <div>@{user.username}</div>
            <div className="label">{user.email}</div>
          </div>
        </section>
        <section className="mt-6 bg-base-200 p-4 rounded-lg">
          <h2 className="text-2xl font-bold">Continue Watching</h2>
          <div className="p-4 bg-base-100 ring ring-current/20 mt-4 rounded-lg">
            <WatchHistory />
          </div>
        </section>
        <section className="mt-6 bg-base-200 p-4 rounded-lg">
          <h2 className="text-2xl font-bold">BookMarks</h2>
          <div className="p-4 bg-base-100 ring ring-current/20 mt-4 rounded-lg">
            <Bookmarks />
          </div>
        </section>
      </div>
    </>
  );
}
