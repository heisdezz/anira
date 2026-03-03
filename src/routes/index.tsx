import Hero from "#/components/Hero";
import Trending from "#/components/Trending";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <>
      <Hero />
      <Trending />
    </>
  );
}
