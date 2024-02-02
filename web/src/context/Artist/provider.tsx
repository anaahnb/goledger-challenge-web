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
  const [errorMessage, setErrorMessage] = useState<string>("");

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

  const searchArtist = useCallback(async (artistName: string) => {
    try {
      const response = await api.post("query/readAsset", {
        key: {
          "@assetType": "artist",
          "name": artistName
        }
      });

      const artistData = response.data.result;
      if (artistData) {
        const artistItem: ArtistItem = {
          id: artistData["@key"],
          name: artistData.name,
          about: artistData.about
        };
        return artistItem;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  const checkArtistLink = useCallback(async (artistId: string): Promise<boolean> => {
    try {
      const responseMusic = await api.post("query/search", {
        query: {
          selector: {
            "@assetType": "song",
            "artists.@key": artistId
          },
          fields: ["@key"],
          limit: 1
        }
      });
  
      const musicData = responseMusic.data.result;
      if (musicData && musicData.length > 0) {
        return true;
      }
  
      const responseAlbum = await api.post("query/search", {
        query: {
          selector: {
            "@assetType": "album",
            "artists.@key": artistId
          },
          fields: ["@key"],
          limit: 1
        }
      });
  
      const albumData = responseAlbum.data.result;
      if (albumData && albumData.length > 0) {
        return true;
      }
  
      return false;
    } catch (error) {
      console.error('Erro ao verificar vínculos do artista:', error);
      throw error;
    }
  }, []);  

  const deleteArtist = useCallback(async (artistId: string) => {
    try {
      const isLinked = await checkArtistLink(artistId);
      if (isLinked) {
        throw new Error('Não é possível excluir este artista pois está vinculado a uma música ou álbum.');
      }

      await api.delete(`invoke/deleteAsset`, {
        data: {
          key: {
            "@assetType": "artist",
            "@key": artistId
          }
        }
      });

      fetchArtists();
    } catch (error) {
      console.error('Erro ao excluir artista:', error);
      throw error;
    }
  }, [fetchArtists, checkArtistLink]);

  const values = {
    artists,
    fetchArtists,
    searchArtist,
    deleteArtist,
  };

  return <ArtistContext.Provider value={values}>{props.children}</ArtistContext.Provider>;
}
