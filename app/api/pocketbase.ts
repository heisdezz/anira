// import PocketBase from "pocketbase";

// export const pb = new PocketBase(import.meta.env.VITE_PB_URL);

import { PocketBaseTS } from "pocketbase-ts";
import type { TypedPocketBase } from "pocketbase-types";

export const pb = new PocketBaseTS(
  "http://127.0.0.1:8090",
) as Partial<TypedPocketBase>;
