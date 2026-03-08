import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/test")({
  component: RouteComponent,
  server: {
    handlers: {
      GET: () => {
        return new Response("Hello,world!");
      },
    },
  },
});

function RouteComponent() {
  return <div>Hello "/tv/$id/test"!</div>;
}
