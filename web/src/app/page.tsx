import ArtistSection from "@/components/Artist/ArtistSection";
import ArtistsGallery from "@/components/ArtistGallery";
import Button from "@/components/Button";
import Headers from "@/components/Header";
import SongSection from "@/components/Song/SongSection";

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
    <div className="flex flex-col justify-center gap-10 mb-10">
      <Headers />
      <SongSection />
      <ArtistsGallery artists={artists} />
      <ArtistSection />
    </div>
  )
}

