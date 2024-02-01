"use client";

import { createContext } from "react";

interface PlaylistProps {
  playlists: PlaylistItem[];
  fetchPlaylists: (limit?: number) => Promise<void>;
}

export interface PlaylistItem {
  id: string;
  name: string;
  description: string;
  songs: Id[];
}

export interface Id {
  "@assetType": string;
  "@key": string;
}

export const PlaylistContext = createContext({} as PlaylistProps);
