import AlbumSection from "@/components/Album/AlbumSection";
import ArtistSection from "@/components/Artist/ArtistSection";
import ArtistsGallery from "@/components/ArtistGallery";
import Footer from "@/components/Footer";
import Headers from "@/components/Header";
import PlaylistSection from "@/components/Playlist/PlaylistSection";
import SongSection from "@/components/Song/SongSection";
import PlaylistContextProvider from "@/context/Playlist/provider";

export default function Page() {
  
  const artists = {
    images: [
      {
        src: 'https://pbs.twimg.com/media/FfmKAiFaEAIUFTu?format=jpg&name=4096x4096',
        alt: 'Two each of gray, white, and black shirts laying flat.',
      },
      {
        src: 'https://pbs.twimg.com/media/FYxkvfcXkAQvVxf?format=jpg&name=large',
        alt: 'Model wearing plain black basic tee.',
      },
      {
        src: 'https://pbs.twimg.com/media/FfmKZVpagAAiVMG?format=jpg&name=4096x4096',
        alt: 'Model wearing plain gray basic tee.',
      },
      {
        src: 'https://pbs.twimg.com/media/FYxkw6qX0AYdtgC?format=jpg&name=large',
        alt: 'Model wearing plain white basic tee.',
      },
    ]
  }

  return (
    <div className="flex flex-col justify-center gap-10 pb-10 bg-white min-h-screen">
      <Headers />
      
      <SongSection />

      <ArtistsGallery artists={artists} />

      <ArtistSection />

      <PlaylistContextProvider>
        <PlaylistSection />
      </PlaylistContextProvider>

      <AlbumSection />
      <Footer />
    </div>
  )
}

