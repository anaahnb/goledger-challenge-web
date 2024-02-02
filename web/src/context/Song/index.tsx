import { createContext } from "react";

interface SongProps {
  songs: SongItem[];
  song: SongItem | null;
  fetchSongs: (limit?: number) => Promise<void>;
  fetchSongById: (songId: string) => Promise<void>;
}

export interface SongItem {
  id: string;
  title: string;
  explicit: boolean;
  artists: string[];
  album: string;
}

export const SongContext = createContext({} as SongProps);
