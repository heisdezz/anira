import { user_atom, useUser } from "@/helpers/hooks";
import { getDefaultStore } from "jotai";
import { use, useLayoutEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { toast } from "sonner";
export default function index() {
  const [user] = useUser();
  const nav = useNavigate();
  console.log("parent_layout");
  // useLayoutEffect(() => {
  //   if (user) {
  //     toast.info("you are already logged in");
  //     nav("/", {
  //       viewTransition: true,
  //     });
  //   }
  // }, [user]);

  return (
    <>
      <Outlet />
    </>
  );
}
