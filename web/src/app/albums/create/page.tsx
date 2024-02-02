"use client";

import AlbumForm from "@/components/Album/AlbumForm";
import Navigation from "@/components/Navigation";
import ArtistContextProvider from "@/context/Artist/provider";

export default function CreateAlbum() {

  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      <ArtistContextProvider>
        <AlbumForm />
      </ArtistContextProvider>
    </div>
  );
}