import {useState, useEffect, useCallback} from 'react';
import type { SpotifyTokenResponse } from '../types/auth';
import {spotifyApi} from '../services/spotifyApi';


function useGetToken(code: string) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifier = localStorage.getItem("code_verifier");

  //console.log("Verifier is here: " + verifier);
  

  const fetchToken = useCallback(async (): Promise<string>  => {
    setLoading(true);
    setError(null);

    try {
      if (!verifier) {
        throw new Error('Code verifier not found in localStorage');
      }
  
      const result: SpotifyTokenResponse = await spotifyApi.getToken(code, verifier);
      setToken(result.access_token);
      
      return result.access_token;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get token';
      setError(errorMessage);
      console.error('Token request failed:', errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [code, verifier]);

  const clearToken = useCallback(() => {
    setToken(null);
    setError(null);
  }, []);

  return { 
    token, 
    loading, 
    error, 
    fetchToken, 
    clearToken 
  };
}

export default useGetToken;