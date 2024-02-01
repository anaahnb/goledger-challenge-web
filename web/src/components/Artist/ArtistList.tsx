"use client";

import { ArtistContext } from '@/context/Artist';
import React, { useContext, useEffect } from 'react';

export default function ArtistList() {

  const { artists, fetchArtists } = useContext(ArtistContext);

  useEffect(() => {
    fetchArtists(6);
  }, [fetchArtists]);

  console.log(artists)

  return (
    <div className="flex flex-wrap gap-6">
      {artists &&
        artists.map((artist) => (
          <div className="relative w-56 space-y-4" key={artist.id}>
            <div className="h-56 bg-zinc-100 rounded-full">
            </div>
            <div className="space-y-1 capitalize">
              <h2 className="text-orange-700 text-xl text-center font-semibold capitalize">
                {artist.name}
              </h2>
            </div>
          </div>
        ))}
    </div>
  );
}
