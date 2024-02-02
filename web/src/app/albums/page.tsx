import AlbumList from "@/components/Album/AlbumList";
import Navigation from "@/components/Navigation";
import SearchGroup from "@/components/SearchGroup";
import SongList from "@/components/Song/SongList";
import AlbumContextProvider from "@/context/Album/provider";
import SongContextProvider from "@/context/Song/provider";

export default function Song() {

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <section className="flex flex-col items-center space-y-10">
        <div>
          <h1 className="text-xl text-center font-bold tracking-tight text-zinc-900 sm:text-2xl"> As músicas que são tendência e novidade na Scrobble  </h1>
        </div>

        {/* <SearchGroup hrefCreate="/songs/create" placeholder="Pesquisar artista" /> */}

        <AlbumContextProvider>
          <AlbumList />      
        </AlbumContextProvider>

      </section>
    </main>
  )
}
