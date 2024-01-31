import Button from "./Button";

export default function Headers() {
  return (
    <header className="lg:mx-72 md:mx-0 md:px-24 bg-zinc-900 max-2xl border-t-8 border-orange-700">
      <nav className="flex items-center justify-between pt-6">
        <span className="text-neutral-100 font-bold text-xl flex gap-3 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" height={38} viewBox="0 0 448 512"><path fill="#ffffff" d="M448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM210.7 280.8c-1.8-5.5-3.4-10.8-5-15.9c-12.9-41.9-21-68.4-58-68.4c-22.4 0-45.1 16.1-45.1 61.2c0 35.2 18 57.2 43.3 57.2c28.6 0 47.6-21.3 47.6-21.3l11.7 31.9s-19.8 19.4-61.2 19.4c-51.3 0-79.9-30.1-79.9-85.8c0-57.9 28.6-92 82.5-92c67.9 0 79.3 35.3 96.4 88.4c1.4 4.4 2.9 8.9 4.4 13.5c8.8 26.8 24.2 46.2 61.2 46.2c24.9 0 38.1-5.5 38.1-19.1c0-17.5-16.9-21.2-40-26.4c-3.2-.7-6.5-1.4-9.9-2.2c-30.4-7.3-42.5-23.1-42.5-48c0-40 32.3-52.4 65.2-52.4c37.4 0 60.1 13.6 63 46.6l-36.7 4.4c-1.5-15.8-11-22.4-28.6-22.4c-16.1 0-26 7.3-26 19.8c0 11 4.8 17.6 20.9 21.3c2.2 .5 4.5 1 6.7 1.4c31.1 6.5 65.1 13.7 65.1 56.1c.1 36.7-30.7 50.6-76.1 50.6c-63.4 0-85.4-28.6-97.1-64.1z"/></svg>          
          Scrobble
        </span>

        <a className=" text-md text-neutral-100 font-medium"> 
          Descobrir artistas
        </a>

      </nav>
      <div className="mx-auto max-w-2xl md:py-24 lg:py-36">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-100 sm:text-6xl">
            Descubra o Scrobble
          </h1>
          <p className="mt-6 text-lg leading-8 text-neutral-300">
            Sinta músicas, encontre albuns e descubra artistas. Compartilhe com a gente um mix em constante expansão de músicas!
          </p>
          <Button text="Fazer o seu próprio upload" />
        </div>
      </div>
    </header>
  )
}

