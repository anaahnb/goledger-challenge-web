"use client";

import React, { useContext, useEffect, useState } from 'react';
import { ArtistContext, ArtistItem } from '@/context/Artist';
import SearchGroup from '@/components/SearchGroup';

interface ArtistListProps {
  limite?: number; 
}

export default function ArtistList({ limite }: ArtistListProps) {
  const { artists, fetchArtists } = useContext(ArtistContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArtists, setFilteredArtists] = useState<ArtistItem[]>([]);

  useEffect(() => {
    fetchArtists(limite);
  }, [fetchArtists, limite]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredArtists(artists);
      return;
    }

    const filtered = artists.filter(artist =>
      artist.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArtists(filtered);
  }, [searchTerm, artists]);

  const handleSearch = (term: string) => {
    setSearchTerm(term); // Atualize o termo de pesquisa
  };

  return (
    <div className="max-w-7xl flex flex-col items-center">
      <SearchGroup 
        onSearch={handleSearch} // Passe a função handleSearch para o componente SearchGroup
        placeholder="Pesquisar artista" 
        hrefCreate="/artist/create/" 
      />

      <div className="flex flex-wrap gap-6">
        {filteredArtists.map(artist => (
          <div className="relative w-56 space-y-4" key={artist.id}>
            <div className="h-56 bg-zinc-100 rounded-full"></div>
            <div className="space-y-1 capitalize">
              <h2 className="text-orange-700 text-xl text-center font-semibold capitalize">
                {artist.name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
