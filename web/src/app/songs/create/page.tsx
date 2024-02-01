"use client";

import Navigation from "@/components/Navigation";
import SongForms from "@/components/Song/SongForms";

export default function CreateSong() {

  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      <SongForms />
    </div>
  );
}
