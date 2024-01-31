import { createContext } from "react";

interface ArtistProps {
  artists: ArtistItem[];
  fetchArtists: (limit?: number) => Promise<void>;
}

export interface ArtistItem {
  id: string;
  name: string;
  about: string;
}

export const ArtistContext = createContext({} as ArtistProps);
