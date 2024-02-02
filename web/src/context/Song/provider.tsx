"use client";

import { useCallback, useState } from "react";
import api from "@/services/api";
import { SongContext, SongItem } from ".";

interface SongContextProviderProps {
  children: React.ReactNode;
}

export default function SongContextProvider(props: SongContextProviderProps) {
  const [songs, setSongs] = useState<SongItem[]>([]);
  const [song, setSong] = useState<SongItem | null>(null);

  async function handleSongsWithRefs(songsData: any[]): Promise<SongItem[]> {
    const songsWithRefs = await Promise.all(
      songsData.map(async (song: any) => {
        const artistKeys = song.artists.map((artist: any) => artist["@key"]);
        const artistResponse = await api.post("query/search", {
          query: {
            selector: {
              "@assetType": "artist",
              "@key": { $in: artistKeys }
            },
            fields: ["name"]
          }
        });
        const artistNames = artistResponse.data.result.map(({ name }: { name: string }) => name);

        const albumResponse = await api.post("query/search", {
          query: {
            selector: {
              "@assetType": "album",
              "@key": song.album["@key"]
            },
            fields: ["title"]
          }
        });
        const albumTitle = albumResponse.data.result[0].title;

        return {
          id: song["@key"],
          title: song.title,
          explicit: song.explicit,
          artists: artistNames,
          album: albumTitle
        };
      })
    );

    return songsWithRefs;
  }

  const fetchSongs = useCallback(async (limite?: number) => {
    try {
      const response = await api.post("query/search", {
        query: {
          selector: {
            "@assetType": "song"
          },
          fields: ["@key", "title", "artists", "explicit", "album"],
          limit: limite
        }
      });

      const songsData = response.data.result;
      const songs = await handleSongsWithRefs(songsData);
      setSongs(songs);
    } catch (error) {
      console.error("Error fetching albums:", error);
      throw error;
    }
  }, []);

  const fetchSongById = useCallback(async (songId: string) => {
    try {
      const response = await api.post("query/search", {
        query: {
          selector: {
            "@assetType": "song",
            "@key": songId
          },
          fields: ["@key", "title", "artists", "explicit", "album"]
        }
      });
      const songsData = response.data.result;
      const songWithRefs = await handleSongsWithRefs(songsData);

      setSong(songWithRefs[0]);
    } catch (error) {
      setSong(null);
      console.error(error);
    }
  }, []);

  const values = {
    songs,
    song,
    fetchSongs,
    fetchSongById,
  };

  return <SongContext.Provider value={values}>{props.children}</SongContext.Provider>;
}
