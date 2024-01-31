export interface Id {
  "@assetType": string;
  "@key": string;
}

export interface Song {
  "@key": string;
  title: string;
  explicit: boolean;
  artists: Id[];
  album: Id;
}

export interface Album {
  "@key": string;
  title: string;
  artist: Id;
  rating: number;
  releaseDate: string;
  songs: Id[];
}

export interface Artist {
  "@key": string;
  name: string;
  about: string;
}

export interface Playlist {
  "@key": string;
  name: string;
  description: string;
  songs: Id[];
}
