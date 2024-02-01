import Link from "next/link";
import Button from "../Button";
import AlbumContextProvider from "@/context/Album/provider";
import AlbumList from "./AlbumList";


export default function AlbumSection() {

  return (
    <section className="flex flex-col items-center">
      <div className="space-y-4 mb-8">
        <h1 className="text-xl text-center font-medium tracking-tight text-zinc-900 sm:text-2xl"> Lançamentos de álbuns adicionados pela galera do Scrobble </h1>
      </div>
      <AlbumContextProvider>
        <AlbumList />              
      </AlbumContextProvider>

      <div className="mt-20">
        <Link href={'/albums'}>
          <Button text="Encontrar outros álbuns" />  
        </Link>
      </div>
    </section>
 
  )
}
