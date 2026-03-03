import { useRef } from "react";
import ReactAllPlayer from "react-all-player";
import type { HlsConfig } from "react-all-player/dist/types";
import type Hls from "react-all-player/dist/types/hls.js";
export default function TestPlayer() {
  const url =
    "http://localhost:5173/stream?url=https%3A%2F%2Fdl.netmagcdn.com%3A2228%2Fhls-playback%2Fc938e5e5c42ab30a67c0a9e31ed16a856de36625b30144b7b2b0dba5e258c071efb3b26bb57bc6777994b0cc0c740bc9ca3d36ec8ecb06b5a5496b05df7b01f02a8052b069cb3942667136dceccc169384473085cbefe95e83a9cb710cb2ea5b3c1ef849c85e2676990026030d1c212acd9e9c3da1e6c1ce07d8229913f296534ab5ce14b91d0494b917ce80da1f2b52%2Fmaster.m3u8";
  const playerRef = useRef<any>(null);
  const hlsRef = useRef<Hls | null>(null);

  // hlsRef.current.
  const config = {
    progressive: true,
    // startLevel: 2,
    maxBufferLength: 4,
    maxBufferSize: 2097152, // 2 MB
  } satisfies Partial<HlsConfig>;
  return (
    <div className="aspect-video">
      <ReactAllPlayer
        // hlsRef={hlsRef}

        onHlsInit={(item) => {
          console.log(item.levels, "levels");
        }}
        className="aspect-video"
        sources={[{ file: url, label: "Hls", type: "hls" }]}
        ref={playerRef}
        autoPlay={false}
        hlsConfig={config}
      />
    </div>
  );
}
