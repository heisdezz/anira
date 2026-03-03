import { Link } from "@tanstack/react-router";

export default function AppDrawer() {
  const onClick = () => {
    let item = document.getElementById(
      "my-drawer-1",
    ) as HTMLInputElement | null;
    if (!item) return;
    item.click();
    item = null;
    return;
  };
  return (
    <div className="bg-base-200 min-h-full w-80 flex flex-col">
      <div className="h-16 flex items-center px-4">
        <Link onClick={onClick} to={"/"} className="text-xl font-bold">
          AniRaa
        </Link>
      </div>
      <div className=" flex-1 flex">
        <ul className="menu w-full border-t flex-1 border-current/10 bg-base-300 ">
          <li>
            <h2 className="menu-title">Links</h2>
            <ul className="space-y-2">
              <li>
                <Link onClick={onClick} to={"/category/movies"} className="">
                  Movies
                </Link>
              </li>
              <li>
                <Link onClick={onClick} to={"/category/tv"} className="">
                  Tv
                </Link>
              </li>
              <li>
                <Link onClick={onClick} to={"/profile"} className="">
                  Profile
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
