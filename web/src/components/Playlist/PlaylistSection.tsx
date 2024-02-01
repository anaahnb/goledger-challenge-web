"use client";

import { useContext, useEffect } from "react";
import PlaylistGallery from "./PlaylistGallery"
import { PlaylistContext } from "@/context/Playlist";

export default function PlaylistSection() {

  const { playlists, fetchPlaylists } = useContext(PlaylistContext);

  useEffect(() => {
    fetchPlaylists(6);
  }, [fetchPlaylists]);


  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-14 sm:px-6 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h1 className="text-xl text-left font-medium tracking-tight text-zinc-900 sm:text-2xl"> Playlists   </h1>
          <p className="mt-4">
            Encontrar playlists. Curta as várias playlists criadas para você pelo Scrobble, por artistas e por outros ouvintes em todo o mundo.
          </p>
            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              {playlists && playlists.map((playlist) => (
                <div key={playlist.id} className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-orange-700">{playlist.name}</dt>
                  <dd className="mt-2 text-sm">{playlist.description}</dd>
                </div>
              ))}
            </dl>
          </div>

        <PlaylistGallery />
        
      </div>
    </div>
  )
}
