"use client";

import Navigation from "@/components/Navigation";
import SongForms from "@/components/Song/SongForms";
import AlbumContextProvider from "@/context/Album/provider";
import ArtistContextProvider from "@/context/Artist/provider";

export default function CreateSong() {

  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      <ArtistContextProvider>
        <AlbumContextProvider>
          <SongForms />
        </AlbumContextProvider>
      </ArtistContextProvider>
    </div>
  );
}
