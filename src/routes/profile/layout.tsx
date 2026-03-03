import { Outlet } from "react-router";
import { ClientOnly } from "remix-utils/client-only";

export default function index() {
  return (
    <ClientOnly
      fallback={
        <>
          <div className="min-h-screen bg-base-200 grid place-items-center skeleton"></div>
        </>
      }
    >
      {() => <Outlet />}
    </ClientOnly>
  );
}
