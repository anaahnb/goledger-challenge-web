import ArtistContextProvider from "@/context/Artist/provider";
import ArtistList from "./ArtistList";
import Button from "../Button";
import Link from "next/link";


export default function ArtistSection() {

  return (

    <section className="flex flex-col items-center">
      <div className="mb-16 mt-10">
        <Link href={'/artist'}>
          <Button text="Descobrir outros artistas" />
        </Link>
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
