export interface API_RESULTS<T = any> {
  currentPage: number;
  hasNextPage: boolean;
  totalPages: number;
  results: T[];
}
export interface TV_INFO_INTERFACE {
  id: string;
  title: string;
  malID: number;
  alID: number;
  japaneseTitle: string;
  image: string;
  description: string;
  type: string;
  url: string;
  recommendations: QUERY_RESULTS[];
  relatedAnime: QUERY_RESULTS[];
  subOrDub: string;
  hasSub: boolean;
  hasDub: boolean;
  genres: string[];
  status: string;
  season: string;
  totalEpisodes: number;
  episodes: {
    id: string;
    number: number;
    title: string;
    isFiller: boolean;
    isSubbed: boolean;
    isDubbed: boolean;
    url: string;
  }[];
}
export interface QUERY_RESULTS {
  id: string;
  title: string;
  url: string;
  image: string;
  duration: string;
  watchList: string;
  japaneseTitle: string;
  type: "TV" | "Movie" | "ONA" | "Special";
  nsfw: boolean;
  sub: number;
  dub: number;
  episodes: number;
}

export interface SPOTLIGHT_RESULT {
  id: string;
  title: string;
  japaneseTitle: string;
  banner: string;
  rank: number;
  url: string;
  type: string;
  duration: string;
  releaseDate: string;
  quality: string;
  sub: number;
  dub: number;
  episodes: number;
  description: string;
}

export interface STREAM_RESPONSE {
  headers: {
    Referer: string;
  };
  intro: {
    end: number;
    start: number;
  };
  outro: {
    end: number;
    start: number;
  };
  previews: {
    type: string;
    url: string;
  }[];
  sources: {
    isM3U8: boolean;
    quality: string;
    url: string;
  }[];
  subtitles: {
    lang: string;
    url: string;
  }[];
}
