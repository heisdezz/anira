import type { PropsWithChildren } from "react";

export default function SimpleContainer(props: PropsWithChildren) {
  return <div className="container mx-auto">{props.children}</div>;
}
