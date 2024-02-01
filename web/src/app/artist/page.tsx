import ArtistList from "@/components/Artist/ArtistList";
import Button from "@/components/Button";
import Navigation from "@/components/Navigation";
import ArtistContextProvider from "@/context/Artist/provider";

export default function Artist() {

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <section className="flex flex-col items-center space-y-10">
        <div>
          <h1 className="text-xl text-center font-bold tracking-tight text-zinc-900 sm:text-2xl"> Os artistas que são tendência e novidade na Scrobble  </h1>
        </div>

        <div className="flex gap-6 items-center pb-20">
          <input className="w-96 bg-zinc-100 rounded-sm px-5 py-4 text-lg shadow-sm border-0 focus:ring-0 placeholder:text-zinc-500" placeholder="Pesquisar artista" type="text" />
          <span className="font-bold text-zinc-900 text-lg">ou</span>
          <Button text="Faça o seu próprio upload de artista"/>
        </div>

        <ArtistContextProvider>
          <ArtistList />      
        </ArtistContextProvider>

      </section>
    </main>
  )
}
