import Link from "next/link";
import Button from "../Button";
import SongList from "./SongList";
import SongContextProvider from "@/context/Song/provider";


export default function SongSection() {

  return (
    <section className="flex flex-col items-center">
      <div className="space-y-4 mb-8">
        <h1 className="text-xl text-center font-medium tracking-tight text-zinc-900 sm:text-2xl"> Ouça as músicas do momento de graça na comunidade Scrobble </h1>
      </div>
      <SongContextProvider>
        <SongList />              
      </SongContextProvider>

      <div className="mt-20">
        <Link href={'/songs'}>
          <Button text="Sentir outras músicas" />  
        </Link>
      </div>
    </section>
 
  )
}
