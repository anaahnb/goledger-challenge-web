"use client";

import ArtistForms from "@/components/Artist/ArtistForms";
import Navigation from "@/components/Navigation";

export default function CreateArtist() {

  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      <ArtistForms />
    </div>
  );
}
