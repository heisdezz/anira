import type { RecordModel } from "pocketbase";

export interface HistoryModel extends RecordModel {
  url: string;
  id: string;
  unique_id: string;
  episode_id: string;
  episode_number: string;
  img_url: string;
  user_id: string;
  title: string;
}

export interface BookmarkModel extends RecordModel {
  url: string;
  tv_id: string;
  id: string;
  img: string;
  user_id: string;
  title: string;
}

export interface WatchHistory extends RecordModel {
  created: string;
  episode_id: string;
  episode_number: string;
  id: string;
  img_url: string;
  info_id: string;
  time_elasped: number;
  title: string;
  updated: string;
  url: string;
  user_id: string;
}
