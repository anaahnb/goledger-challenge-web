export interface Id {
  "@assetType": string;
  "@key": string;
}

export interface Song {
  "@key": string;
  title: string;
  albumKey: string;
  artistKeys: string[];
  explicit: boolean;
}

export interface Album {
  "@key": string;
  title: string;
  artist: Artist;
  rating: number;
  releaseDate: string;
  songs: Id[];
}

export interface Artist {
  "@key": string;
  name: string;
  about: string;
  explicit: boolean;
}

export interface Playlist {
  "@key": string;
  name: string;
  description: string;
  songs: Id[];
}

export interface ArtistFormData extends Artist {
  "@assetType": "artist";
}

export interface CreateArtist extends Omit<Artist, "@key"> {}
export interface UpdateArtist extends Partial<ArtistFormData> {}

export interface CreateSong extends Omit<Song, "@key"> {}
