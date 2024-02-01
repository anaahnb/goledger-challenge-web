"use client";

import { createContext } from "react";

interface ArtistProps {
  artists: ArtistItem[];
  fetchArtists: (limit?: number) => Promise<void>;
  searchArtist: (artistName: string) => Promise<ArtistItem | undefined>; // Adicionando a função searchArtist
}

export interface ArtistItem {
  id: string;
  name: string;
  about: string;
}

export const ArtistContext = createContext({} as ArtistProps);
