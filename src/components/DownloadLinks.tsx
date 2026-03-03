import type { STREAM_RESPONSE } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { parse } from "hls-parser";
import { InfoIcon } from "lucide-react";

export default function DownloadLinks({ data }: { data: STREAM_RESPONSE }) {
  const masterUrl = data.sources[0]?.url;

  const query = useQuery({
    queryKey: [masterUrl],
    queryFn: async () => {
      const resp = await axios.get(
        `/stream?url=${encodeURIComponent(masterUrl)}`,
      );
      return resp.data;
    },
    enabled: !!masterUrl, // only run if URL exists
  });

  if (query.isLoading) {
    return <div className="mt-4 p-2 bg-base-100">Loading...</div>;
  }
  if (query.isError || !query.data) {
    return <div className="mt-4 p-2 bg-base-100">Error</div>;
  }

  const playlist = parse(query.data);
  console.log(playlist);
  let variants = [];
  if (playlist.isMasterPlaylist) {
    variants = playlist.variants.filter((item) => !item.isIFrameOnly);
  }
  return (
    <div className="p-4 bg-base-200 mt-4 space-y-2 rounded-md">
      <h2 className=" ">Download Links</h2>
      <div className="alert alert-info alert-soft mb-4 ">
        <InfoIcon />
        <p>Use an external downloader when trying to download</p>
      </div>
      <div className="flex gap-2 items-center">
        {variants.map((variant, index) => (
          <div
            key={index}
            className="btn w-fit btn-primary"
            onClick={() => {
              const absoluteUrl = new URL(variant.uri, masterUrl).toString();
              console.log(absoluteUrl);
              const a = document.createElement("a");
              a.href = absoluteUrl;
              a.download = `video-${variant.resolution?.height || "stream"}.m3u8`;
              a.click();

              // const absoluteUrl = new URL(variant.uri, masterUrl).toString();
              // window.open(absoluteUrl, "_blank");
            }}
          >
            {variant.resolution
              ? `${variant.resolution.height}p`
              : `${(variant.bandwidth / 1000).toFixed(0)} kbps`}
          </div>
        ))}
      </div>
    </div>
  );
}
