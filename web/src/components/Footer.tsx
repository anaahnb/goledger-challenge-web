export default function Footer() {
  return (
    <footer className="m-4">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400"> 
          © 2024 <a href="https://flowbite.com/" className="hover:underline"> Scrobble</a>. Todos os direitos reservados para Last.fm
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
              <a href="/artist" className="hover:underline me-4 md:me-6">Artistas</a>
          </li>
          <li>
              <a href="/songs" className="hover:underline me-4 md:me-6">Músicas</a>
          </li>
          <li>
              <a href="/albums" className="hover:underline me-4 md:me-6">Álbuns</a>
          </li>
          <li>
              <a href="/playlists" className="hover:underline">Playlists</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}