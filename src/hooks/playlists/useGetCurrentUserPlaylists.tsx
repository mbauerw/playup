import { useState, useEffect, useCallback } from 'react';
import {spotifyApi} from '../../services/spotifyApi';
import type { CurrentUserPlaylists } from '../../types/playlist';

const useGetCurrentUserPlaylists = (token: string | null) => {
  const [playlists, setPlaylists] = useState<CurrentUserPlaylists | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrentUserPlaylists = useCallback(async (): Promise<CurrentUserPlaylists | null> => {
    console.log("Inside fetchCurrentUserPlaysts");

    if (!token) {
      setError('No token available');
      console.log("No Token Available");
      return null;
    }
    
    console.log("The Current Token in fetchCurrent UserPlaylists is ", JSON.stringify(token));

    setLoading(true);
    setError(null);

    try {
      const result: CurrentUserPlaylists = await spotifyApi.getCurrentUserPlaylists(token)
      setPlaylists(result);

      return playlists;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get token';
      setError(errorMessage);
      console.error('Token request failed:', errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token]);

  return {
    playlists,
    loading,
    error,
    fetchCurrentUserPlaylists
  };
}

export default useGetCurrentUserPlaylists;
