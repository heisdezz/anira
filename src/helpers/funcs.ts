import { ClientResponseError, type BatchRequestResult } from "pocketbase";
import { customAlphabet } from "nanoid";
import { toast } from "sonner";

export const scale_up_img = (url: string) => {
  const newUrl = url.replace(
    /\/thumbnail\/(\d+)x(\d+)\//,
    (_, w, h) =>
      `/thumbnail/${String(Number(w) * 3)}x${String(Number(h) * 3)}/`,
  );
  return newUrl;
};

export const extract_episode_id = (str: string) => {
  const match = str.match(/\d+$/);
  return match ? Number(match[0]) : null;
};

export const extract_pb_error = (err: any) => {
  if (err instanceof ClientResponseError) {
    return err.message;
  }
  return "Error Occured";
};

const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
export const generateId = customAlphabet(alphabet, 15); // 26-char ULID length

const id = generateId();
console.log(id); // e.g. "01hfzx07xh5p4rmz0y2amt8r2g"
