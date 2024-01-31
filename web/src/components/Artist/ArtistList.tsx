"use client";

import React, { useContext, useEffect } from 'react';
import { ArtistContext } from '@/context/Artist';

export default function ArtistList() {
  const { artists, fetchArtists } = useContext(ArtistContext);
 
  useEffect(() => {
     fetchArtists(6);
  }, [fetchArtists]);
 
  return (
    
    <div className='flex flex-wrap gap-6'>
      {artists && artists.map((artist) => (
        <div className='w-56 space-y-4'>
          <div className='h-56 bg-zinc-200 rounded-full' key={artist.id}></div>
          <div className='space-y-1 capitalize'>
            <h2 className='text-orange-700 text-xl text-center font-semibold capitalize'>
              {artist.name}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}

