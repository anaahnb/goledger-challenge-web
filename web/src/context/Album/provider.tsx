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

  const fetchArtistData = useCallback(async (artistId: string[]) => {
    try {
      const response = await api.post("query/search", {
        query: {
          selector: {
            "@assetType": "artist",
            "@key": { $in: artistId }
          },
          fields: ["@key", "name"]
        }
      });
      const artistData = response.data.result;

      return artistData; 
    } catch (error) {
      console.error("Error fetching artist data:", error);
      return null;
    }
  }, []);
  

  const handleAlbumData = async (albumsData: Album[]): Promise<AlbumItem[]> => {
    const albumsWithArtists = await Promise.all(albumsData.map(async (album: Album) => {
      const artistData = await fetchArtistData([album.artist["@key"]]);
      const artistName = artistData.length > 0 ? artistData[0].name : 'Desconhecido';

      console.log(artistName);

      return {
        id: album["@key"],
        title: album.title,
        artist: artistName,
        rating: album.rating,
        releaseDate: album.releaseDate,
      };
    }));
    return albumsWithArtists;
  };
  

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
      console.error("Error fetching albums:", error);
      throw error;
    }
  }, []);

  const values = {
    albums,
    fetchAlbums,
  };

  return <AlbumContext.Provider value={values}>{props.children}</AlbumContext.Provider>;
}
