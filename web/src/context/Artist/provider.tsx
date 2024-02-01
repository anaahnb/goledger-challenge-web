"use client";

import { useCallback, useState } from "react";
import api from "@/services/api"; 
import { Artist } from "@/utils/data"; 
import { ArtistContext, ArtistItem } from ".";

interface ArtistContextProviderProps {
  children: React.ReactNode;
}

export default function ArtistContextProvider(props: ArtistContextProviderProps) {
  const [artists, setArtists] = useState<ArtistItem[]>([]);

  async function handleArtistData(artistsData: Artist[]): Promise<ArtistItem[]> {
    const artists = artistsData.map((artist: Artist) => {
      return {
        id: artist["@key"],
        name: artist.name,
        about: artist.about
      };
    });
    return artists;
  }

  const fetchArtists = useCallback(async (limit?: number) => {
    try {
      const response = await api.post("query/search", {
        query: {
          selector: {
            "@assetType": "artist"
          },
          fields: ["@key", "name", "about"],
          limit
        }
      });

      const artistsData = response.data.result;
      const artists = await handleArtistData(artistsData);
      setArtists(artists);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);



  const values = {
    artists,
    fetchArtists,
  };

  return <ArtistContext.Provider value={values}>{props.children}</ArtistContext.Provider>;
}
