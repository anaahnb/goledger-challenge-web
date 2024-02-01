import ArtistList from "@/components/Artist/ArtistList";
import Navigation from "@/components/Navigation";
import ArtistContextProvider from "@/context/Artist/provider";

export default function Artist() {

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <section className="flex flex-col items-center space-y-10">
        <div>
          <h1 className="text-xl text-center font-bold tracking-tight text-zinc-900 sm:text-2xl">Os artistas que são tendência e novidade na Scrobble</h1>
        </div>

        <ArtistContextProvider>
          <ArtistList />
        </ArtistContextProvider>

      </section>
    </main>
  );
}
