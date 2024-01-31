"use client";

import ArtistContextProvider from "@/context/Artist/provider";
import Image from "next/image";
import SongList from "./SongList";
import SongContextProvider from "@/context/Song/provider";
import Button from "../Button";


export default function SongSection() {

  return (
    <section className="flex flex-col items-center">
      <div className="space-y-4 mb-8">
        <h1 className="text-xl text-center font-medium tracking-tight text-zinc-900 sm:text-2xl"> Ouça as músicas do momento de graça na comunidade Scrobble </h1>
      </div>
      <SongContextProvider>
        <SongList />              
      </SongContextProvider>  
    </section>
 
  )
}
