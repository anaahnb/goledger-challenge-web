import Navigation from "@/components/Navigation";
import SearchGroup from "@/components/SearchGroup";
import SongList from "@/components/Song/SongList";
import SongContextProvider from "@/context/Song/provider";

export default function Song() {

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <section className="flex flex-col items-center space-y-10">
        <div>
          <h1 className="text-xl text-center font-bold tracking-tight text-zinc-900 sm:text-2xl"> As músicas que são tendência e novidade na Scrobble  </h1>
        </div>

        <SongContextProvider>
          <SongList showSearchGroup/>      
        </SongContextProvider>

      </section>
    </main>
  )
}
