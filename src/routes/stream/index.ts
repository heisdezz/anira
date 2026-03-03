// import type { LoaderFunctionArgs } from "react-router";

import type { LoaderFunctionArgs } from "react-router";

export const config = {
  runtime: "edge", // tells Vercel this should be an edge function
};
export async function loader({ request }: LoaderFunctionArgs) {
  const original = new URL(request.url).searchParams.get("url");
  if (!original) return new Response("Missing URL", { status: 400 });

  // If request is not m3u8 (segments), just pipe
  if (!original.endsWith(".m3u8")) {
    const segRes = await fetch(original);
    return new Response(segRes.body, {
      headers: segRes.headers,
    });
  }

  const response = await fetch(original);
  let text = await response.text();

  // Base URL to resolve relative paths
  const baseURL = original.substring(0, original.lastIndexOf("/") + 1);

  // Rewrite relative URLs in playlist
  text = text.replace(/^((?!#).+)$/gm, (line) => {
    if (line.startsWith("http")) return line;
    return `/stream?url=${encodeURIComponent(baseURL + line)}`;
  });

  return new Response(text, {
    headers: {
      "Content-Type": "application/vnd.apple.mpegurl",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

// export const config = { runtime: "edge" };

// export default async function loader({ request }: LoaderFunctionArgs) {
//   const original = new URL(request.url).searchParams.get("url");
//   if (!original) return new Response("Missing URL", { status: 400 });

//   // If request is not m3u8 (segments), just pipe
//   if (!original.endsWith(".m3u8")) {
//     const segRes = await fetch(original);
//     return new Response(segRes.body, {
//       headers: {
//         "Content-Type":
//           segRes.headers.get("content-type") || "application/octet-stream",
//         "Access-Control-Allow-Origin": "*",
//       },
//     });
//   }

//   const response = await fetch(original);
//   let text = await response.text();

//   // Base URL to resolve relative paths
//   const baseURL = original.substring(0, original.lastIndexOf("/") + 1);

//   // Rewrite relative URLs in playlist
//   text = text.replace(/^((?!#).+)$/gm, (line) => {
//     if (line.startsWith("http")) return line;
//     return `/stream?url=${encodeURIComponent(baseURL + line)}`;
//   });

//   return new Response(text, {
//     headers: {
//       "Content-Type": "application/vnd.apple.mpegurl",
//       "Access-Control-Allow-Origin": "*",
//     },
//   });
// }
