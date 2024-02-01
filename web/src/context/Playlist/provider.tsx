"use client";

import { useCallback, useState } from "react";
import api from "@/services/api";
import { Playlist } from "@/utils/data";
import { PlaylistContext, PlaylistItem } from ".";

interface PlaylistContextProviderProps {
  children: React.ReactNode;
}

export default function PlaylistContextProvider(props: PlaylistContextProviderProps) {
  const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);

  async function handlePlaylistData(playlistsData: Playlist[]): Promise<PlaylistItem[]> {
    const playlists = playlistsData.map((playlist: Playlist) => {
      return {
        id: playlist["@key"],
        name: playlist.name,
        description: playlist.description,
        songs: playlist.songs
      };
    });
    return playlists;
  }

  const fetchPlaylists = useCallback(async (limit?: number) => {
    try {
      const response = await api.post("query/search", {
        query: {
          selector: {
            "@assetType": "playlist"
          },
          fields: ["@key", "name", "description", "songs"],
          limit
        }
      });

      const playlistsData = response.data.result;
      const playlists = await handlePlaylistData(playlistsData);
      setPlaylists(playlists);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  const values = {
    playlists,
    fetchPlaylists,
  };

  return <PlaylistContext.Provider value={values}>{props.children}</PlaylistContext.Provider>;
}
