"use client";

import ArtistContextProvider from "@/context/Artist/provider";
import ArtistList from "./ArtistList";
import Image from "next/image";
import Button from "../Button";


export default function ArtistSection() {

  return (

    <section className="flex flex-col items-center">
      <div className="mb-16">
        <Button type="primary" text="Explorar os artistas do momento" />
      </div>

      <div className="space-y-4 mb-8">
        <h1 className="text-xl text-center font-medium tracking-tight text-zinc-900 sm:text-2xl"> Os artistas que são tendência e novidade na Scrobble  </h1>
      </div>

      <ArtistContextProvider>
        <ArtistList />      
      </ArtistContextProvider>
    </section>
 
  )
}
