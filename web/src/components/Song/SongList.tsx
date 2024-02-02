"use client";

import { useContext, useEffect, useState } from 'react';
import { SongContext, SongItem } from '@/context/Song';
import SearchGroup from '@/components/SearchGroup';
import Loading from '../Loading';

interface SongListProps {
  limite?: number;
  showSearchGroup?: boolean;
}

export default function SongList({ limite, showSearchGroup = false }: SongListProps) {
  const { songs, fetchSongs } = useContext(SongContext);
  const [filteredSongs, setFilteredSongs] = useState<SongItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setLoading(true); 
    fetchSongs(limite).then(() => setLoading(false)); 
  }, [fetchSongs, limite]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredSongs(songs);
      return;
    }

    const filtered = songs.filter(song =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSongs(filtered);
  }, [searchTerm, songs]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="flex flex-col items-center max-w-7xl">
      {showSearchGroup && (
        <SearchGroup
          onSearch={handleSearch}
          placeholder="Pesquisar música"
          hrefCreate="/songs/create"
        />
      )}

      {loading ? (
          <Loading type='spin' color='#b43629'/>
      ) : (
        <div className="flex flex-wrap gap-6 max-w-7xl">
          {filteredSongs.map((song) => (
            <div className="w-56 space-y-4" key={song.id}>
              <div className="h-56 bg-zinc-100"></div>
              <div className="space-y-1 capitalize">
                <div className='flex gap-2 items-center'>
                  <h2 className="text-orange-700 font-semibold capitalize">
                    {song.title}
                  </h2>
                  {song.explicit && (
                    <span aria-label="Explícito" title="Explícito">
                      <svg className='text-orange-700' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M6.826 10.88H10.5V12h-5V4.002h5v1.12H6.826V7.4h3.457v1.073H6.826z"/>
                        <path d="M2.5 0A2.5 2.5 0 0 0 0 2.5v11A2.5 2.5 0 0 0 2.5 16h11a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 13.5 0zM1 2.5A1.5 1.5 0 0 1 2.5 1h11A1.5 1.5 0 0 1 15 2.5v11a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 13.5z"/>
                      </svg>
                    </span>
                  )}
                </div>
                <p className="flex items-center gap-2">
                  <span aria-hidden="true">
                    {' '}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" height={18}>
                      <path d="M96 96V256c0 53 43 96 96 96s96-43 96-96H208c-8.8 0-16-7.2-16-16s7.2-16 16-16h80V192H208c-8.8 0-16-7.2-16-16s7.2-16 16-16h80V128H208c-8.8 0-16-7.2-16-16s7.2-16 16-16h80c0-53-43-96-96-96S96 43 96 96zM320 240v16c0 70.7-57.3 128-128 128s-128-57.3-128-128V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v24z" />
                    </svg>{' '}
                  </span>
                  {song.artists}
                </p>
                <p className="flex items-center gap-2">
                  <span aria-hidden="true">
                    {' '}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height={18}>
                      <path fill="#000000" d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 32a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm-96-32a96 96 0 1 0 192 0 96 96 0 1 0 -192 0zM96 240c0-35 17.5-71.1 45.2-98.8S205 96 240 96c8.8 0 16-7.2 16-16s-7.2-16-16-16c-45.4 0-89.2 22.3-121.5 54.5S64 194.6 64 240c0 8.8 7.2 16 16 16s16-7.2 16-16z" />
                    </svg>{' '}
                  </span>
                  {song.album}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
