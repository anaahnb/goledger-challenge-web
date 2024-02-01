"use client";

import { useCallback, useState } from "react";
import api from "@/services/api";
import { Album } from "@/utils/data";
import { AlbumContext, AlbumItem } from ".";

interface AlbumContextProviderProps {
  children: React.ReactNode;
}

export default function AlbumContextProvider(props: AlbumContextProviderProps) {
  const [albums, setAlbums] = useState<AlbumItem[]>([]);

  async function handleAlbumData(albumsData: Album[]): Promise<AlbumItem[]> {
    const albums = albumsData.map((album: Album) => {
      return {
        id: album["@key"],
        title: album.title,
        artist: album.artist["@key"],
        rating: album.rating,
        releaseDate: album.releaseDate
      };
    });
    return albums;
  }

  const fetchAlbums = useCallback(async (limit?: number) => {
    try {
      const response = await api.post("query/search", {
        query: {
          selector: {
            "@assetType": "album"
          },
          fields: ["@key", "title", "artist", "rating", "releaseDate"],
          limit
        }
      });

      const albumsData = response.data.result;
      const albums = await handleAlbumData(albumsData);
      setAlbums(albums);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  const values = {
    albums,
    fetchAlbums,
  };

  return <AlbumContext.Provider value={values}>{props.children}</AlbumContext.Provider>;
}
