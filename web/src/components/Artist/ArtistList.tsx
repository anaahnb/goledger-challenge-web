"use client";

import React, { useContext, useEffect, useState } from 'react';
import { ArtistContext, ArtistItem } from '@/context/Artist';
import SearchGroup from '@/components/SearchGroup'; 
import DropdownButton from '../DropdownButton';

interface ArtistListProps {
  limite?: number;
  showSearchGroup?: boolean; 
}

export default function ArtistList({ limite, showSearchGroup = false }: ArtistListProps) {
  const { artists, fetchArtists, deleteArtist } = useContext(ArtistContext);
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
    setSearchTerm(term);
  };

  const handleDeleteArtist = async (id: string) => {
    try {
      await deleteArtist(id);
      const updatedArtists = artists.filter(artist => artist.id !== id);
      setFilteredArtists(updatedArtists);
    } catch (error) {
      console.error('Erro ao excluir artista:', error);
    }
  };

  return (
    <div className="max-w-7xl flex flex-col items-center">
      {showSearchGroup && (
        <SearchGroup 
          onSearch={handleSearch} 
          placeholder="Pesquisar artista" 
          hrefCreate="/artist/create/" 
        />
      )}

      <div className="flex flex-wrap gap-6">
        {filteredArtists.map(artist => (
          <div className="relative w-56 space-y-4" key={artist.id}>
            <div className="h-56 bg-zinc-100 rounded-full"></div>
            <div className="space-y-1 capitalize">
              <div className='flex gap-4 justify-center items-center'>
                <h2 className="text-orange-700 text-xl text-center font-semibold capitalize">
                  {artist.name}
                </h2>
                <DropdownButton
                  options={[
                    { label: 'Excluir', onClick: () => handleDeleteArtist(artist.id) },
                    { label: 'Editar', onClick: () => handleDeleteArtist(artist.id) },
                  ]}
                />

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
