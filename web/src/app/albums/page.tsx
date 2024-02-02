import AlbumList from "@/components/Album/AlbumList";
import Navigation from "@/components/Navigation";
import SearchGroup from "@/components/SearchGroup";
import AlbumContextProvider from "@/context/Album/provider";

export default function Album() {

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <section className="flex flex-col items-center space-y-10">
        <div>
          <h1 className="text-xl text-center font-bold tracking-tight text-zinc-900 sm:text-2xl"> Lançamentos de álbuns adicionados pela galera do Scrobble  </h1>
        </div>

        {/* <SearchGroup hrefCreate="/songs/create" placeholder="Pesquisar artista" /> */}

        <AlbumContextProvider>
          <AlbumList showSearchGroup/>      
        </AlbumContextProvider>

      </section>
    </main>
  )
}
