import { client } from "@/api/client";
import type { STREAM_RESPONSE } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import ReactHlsPlayer from "react-hls-video-player";
import ReactVidPlayer from "react-all-player";
import type { Source } from "react-all-player/dist/types";
export default function VideoPlayer2() {
  const { id, episode } = useParams();
  const episode_link = id + "$episode$" + episode;
  const query = useQuery<STREAM_RESPONSE>({
    queryKey: ["episode", episode_link],
    queryFn: async () => {
      // let resp = await client.get("watch/" + "/one-piece-100?ep=1234");
      // return resp.data;
      let resp = await client.get("https://yuma-anime-api.vercel.app/watch", {
        params: {
          episodeId: episode_link,
        },
      });
      return resp.data;
    },
  });
  const sources = [
    {
      file: "/stream?url=https://dc.netmagcdn.com:2228/hls-playback/a6685db1e9a1a7487113d7b3bda5ca854143e176c41e0fd6cc63146e8b09048349035c1a643677f99687674c62cc3c9049f1193e0b7624714cc76ecbe8942374a8d018ee9ac0f17683d0cb9782ff25c16a2fd147dab526e9fdb29114b4d654d17e3111909753c1a3b8d84b0a06fc41bebb9a41ece92e7666ecc88402f9c2112d7a7918a8fce209b2424f7c74c21d0ebe/master.m3u8",
    },
  ] satisfies Source[];
  return (
    <div className="h-120 bg-base-200 rounded-box flex">
      {/*{JSON.stringify(query.data)}*/}
      <ReactVidPlayer
        sources={sources}
        className="size-full"

        // hlsConfig={{
        //   maxLoadingDelay: 4,
        //   minAutoBitrate: 0,
        //   lowLatencyMode: true,
        // }}
      />
    </div>
  );
}
