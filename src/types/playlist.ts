import type { SpotifyImage, SpotifyUser, SpotifyExternalUrls } from "./spotify";

export interface SpotifyPlaylistOwner {
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  type: "user";
  uri: string;
  display_name: string;
}

export interface SpotifyPlaylistTracks {
  href: string;
  total: number;
}


export interface SpotifyPlaylist {
  collaborative: boolean;
  description: string | null;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  owner: SpotifyUser;
  primary_color: string | null;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: 'playlist';
  uri: string;
}

export interface CurrentUserPlaylists {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: SpotifyPlaylist[];
}

export interface GetPlaylistsParams {
  limit?: number;
  offset?: number;
}