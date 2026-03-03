import type { LoaderFunctionArgs } from "react-router";

const url =
  "https://df.netmagcdn.com:2228/hls-playback/3b7354d40e4002f1bcadd80759a98acbecfa66b73b69fdd31a1f8a46d32cf5547c87ffe62a04d1f26fb78b3f327c006e27646413cb6344f30c73e92e17df6f74e9d4cd3bbcb45ff4c1f2570af6baf9f0bb6908e548946010780a65289c57d17616a140720dd8c704d531675bda7e9e384df41c5967c6b8b7306d92aac872e7fc6869808694ca0637dcfce64d76cda23d/master.m3u8";

export async function loader({ request }: LoaderFunctionArgs) {
  let original = new URL(request.url).searchParams.get("url");
  // if (!original) return new Response("Missing URL", { status: 400 });
  original = url;
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
