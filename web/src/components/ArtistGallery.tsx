import React from 'react';

interface Artist {
  src: string;
  alt: string;
}

interface ArtistsProps {
  artists: {
    images: Artist[];
  };
}

export default function ArtistsGallery({ artists }: ArtistsProps) {
  return (
    <div className="mx-auto max-w-2xl mt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
      <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
        <img
          src={artists.images[0].src}
          alt={artists.images[0].alt}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
          <img
            src={artists.images[1].src}
            alt={artists.images[1].alt}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
          <img
            src={artists.images[2].src}
            alt={artists.images[2].alt}
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
      <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
        <img
          src={artists.images[3].src}
          alt={artists.images[3].alt}
          className="h-full w-full object-cover object-center"
        />
      </div>
    </div>
  );
}
