export interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface SpotifyImage {
  height: number | null;
  url: string;
  width: number | null;
}

export interface SpotifyExternalUrls {
  spotify: string;
}

export interface SpotifyExplicitContent {
  filter_enabled: boolean;
  filter_locked: boolean;
}

export interface Followers {
  href: string | null;
  total: number;
}

export interface SpotifyUser {
  display_name: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  type: 'user';
  uri: string;
}

export interface CurrentUser {
  country: string;
  display_name: string;
  email: string;
  explicit_content: SpotifyExplicitContent;
  external_urls: SpotifyExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: SpotifyImage[];
  product: string;
  type: string;
  uri: string;
}

export interface GetPlaylistsParams {
  limit?: number;
  offset?: number;
}