"use client";

import { useContext, useEffect, useState } from "react";
import { AlbumContext } from "@/context/Album";
import SearchGroup from "@/components/SearchGroup";
import Loading from "@/components/Loading";

interface AlbumListProps {
  limite?: number;
  showSearchGroup?: boolean; 
}

export default function AlbumList({ limite, showSearchGroup = false }: AlbumListProps) {
  const { albums, fetchAlbums, searchAlbums } = useContext(AlbumContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (!searchTerm) {
      fetchAlbums(limite)
        .then(() => setLoading(false)) 
        .catch(() => setLoading(false)); 
    } else {
      searchAlbums(searchTerm);
    }
  }, [fetchAlbums, searchAlbums, limite, searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="max-w-7xl flex flex-col items-center">
      {showSearchGroup && (
        <SearchGroup
          onSearch={handleSearch}
          placeholder="Pesquisar álbum"
          hrefCreate="/albums/create/"
        />
      )}

      {loading ? (
        <Loading type='spin' color='#b43629'/>
      ) : (
        <div className="flex flex-wrap gap-6">
          {albums.map((album) => (
            <div className="relative w-56 space-y-4" key={album.id}>
              <div className="h-56 bg-zinc-100"></div>
              <div className="space-y-1 capitalize">
                <h2 className="text-orange-700 text-xl font-semibold capitalize">
                  {album.title}
                </h2>
                <p className="flex items-center gap-2">
                  <span aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                      height={18}
                    >
                      <path d="M96 96V256c0 53 43 96 96 96s96-43 96-96H208c-8.8 0-16-7.2-16-16s7.2-16 16-16h80V192H208c-8.8 0-16-7.2-16-16s7.2-16 16-16h80V128H208c-8.8 0-16-7.2-16-16s7.2-16 16-16h80c0-53-43-96-96-96S96 43 96 96zM320 240v16c0 70.7-57.3 128-128 128s-128-57.3-128-128V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v24z" />
                    </svg>
                  </span>
                  {album.artist}
                </p>
                <p className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    height={18}
                  >
                    <path
                      fill="#000000"
                      d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                    />
                  </svg>
                  {album.rating}/10
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
