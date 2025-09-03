import type { 
  CurrentUser, 
  CurrentUserPlaylists, 
  GetPlaylistsParams,
  SpotifyTokenResponse 
} from '../types/types';

class SpotifyApiError extends Error {
  public status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'SpotifyApiError';
  }
}

const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';
const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/api';

const makeAuthenticatedRequest = async <T>(
  endpoint: string,
  accessToken: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(`${SPOTIFY_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new SpotifyApiError(
      `Spotify API Error: ${response.status} ${response.statusText}`,
      response.status
    );
  }

  return response.json();
};

export const spotifyApi = {
  // Authentication
  async getToken(code: string, verifier: string): Promise<SpotifyTokenResponse> {
    const params = new URLSearchParams();
    params.append("client_id", import.meta.env.VITE_clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://127.0.0.1:5173/callback");
    params.append("code_verifier", verifier);

    const response = await fetch(`https://accounts.spotify.com/api/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    });

    if (!response.ok) {
      throw new SpotifyApiError(`Token request failed: ${response.status}`);
    }

    return response.json();
  },

  // User endpoints
  async getCurrentUser(accessToken: string): Promise<CurrentUser> {
    return makeAuthenticatedRequest<CurrentUser>('/me', accessToken);
  },

  async getCurrentUserPlaylists(
    accessToken: string, 
    params: GetPlaylistsParams = {}
  ): Promise<CurrentUserPlaylists> {

    const { limit = 20, offset = 0 } = params;
    
    const queryString = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString()
    });
    
    return makeAuthenticatedRequest<CurrentUserPlaylists>(
      `/me/playlists?${queryString}`, 
      accessToken
    );
  },

  // Playlist endpoints
  async getPlaylist(accessToken: string, playlistId: string) {
    return makeAuthenticatedRequest(`/playlists/${playlistId}`, accessToken);
  },

  async createPlaylist(accessToken: string, userId: string, data: any) {
    return makeAuthenticatedRequest(`/users/${userId}/playlists`, accessToken, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  // Search endpoints
  async search(accessToken: string, query: string, type: string) {
    const queryString = new URLSearchParams({ q: query, type });
    return makeAuthenticatedRequest(`/search?${queryString}`, accessToken);
  },

  // Player endpoints
  async getCurrentPlayback(accessToken: string) {
    return makeAuthenticatedRequest('/me/player', accessToken);
  },

  async pausePlayback(accessToken: string) {
    return makeAuthenticatedRequest('/me/player/pause', accessToken, {
      method: 'PUT'
    });
  }
};

