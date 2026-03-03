import { Link } from "@tanstack/react-router";
import SearchBar from "./SearchBar";
import { MenuIcon } from "lucide-react";
import MainDrawerMenu from "./MainDrawerMenu";
import { Suspense } from "react";
import AuthButtons from "./AuthButtons";

export default function NavBar() {
  return (
    <div className="h-16 grid place-items-center sticky top-0 bg-base-100 z-20 isolate">
      <nav className="mx-auto container flex items-center gap-2 px-4 md:px-0">
        <Suspense
          fallback={
            <div className="btn btn-square btn-ghost">
              <MenuIcon />
            </div>
          }
        >
          <MainDrawerMenu />
        </Suspense>

        <Link to={"/"} className="text-xl font-bold">
          AniRaa
        </Link>
        <div className="ml-auto md:ml-0">
          <SearchBar />
        </div>
        <div className="ml-auto space-x-4 hidden md:flex ">
          <Link to={"/category/movies"} className="btn btn-neutral">
            Movies
          </Link>
          <Link to={"/category/Tv"} className="btn btn-neutral">
            Tv
          </Link>
          <AuthButtons />
          {/*<Link to={"/auth/login"} className="btn btn-primary">
            Login
          </Link>*/}
        </div>
      </nav>
    </div>
  );
}
