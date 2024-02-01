"use client";

import { ArtistContext } from '@/context/Artist';
import React, { useContext, useEffect, useState } from 'react';

interface ArtistListProps {
  limite?: number; 
}

export default function ArtistList({limite}: ArtistListProps) {

  const { artists, fetchArtists } = useContext(ArtistContext);
  // const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    fetchArtists(limite);
  }, [fetchArtists, limite]);

  console.log(artists)

  return (

    <div className="flex flex-wrap gap-6 max-w-7xl" 
    // onMouseEnter={() => setShowButton(true)} onMouseLeave={() => setShowButton(false)} 
    >
      {artists &&
        artists.map((artist) => (
          <div className="relative w-56 space-y-4" key={artist.id}>
            <div className="h-56 bg-zinc-100 rounded-full">
                {/* {showButton && (
                  <div className='absolute top-28'>
                    <button onClick={() => alert('Botão clicado!')}></button>
                  </div>
                )} */}
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
