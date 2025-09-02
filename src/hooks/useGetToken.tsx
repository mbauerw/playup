import {useState, useEffect, useCallback} from 'react';
import type { SpotifyTokenResponse } from '../types/auth';
import { getSpotifyToken } from '../services/getToken';

function useGetToken(code: string) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tokError, setTokError] = useState<string | null>(null);

  const verifier = localStorage.getItem("code_verifier");

  console.log("Verifier is here: " + verifier);
  

  const getToken = useCallback(async (): Promise<string>  => {
    setLoading(true);
    setTokError(null);

    try {
      if (!verifier) {
        throw new Error('Code verifier not found in localStorage');
      }
  
      const result: SpotifyTokenResponse = await getSpotifyToken(code, verifier);
      setToken(result.access_token);
      
      console.log('Token received successfully!');
      return result.access_token;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get token';
      setTokError(errorMessage);
      console.error('Token request failed:', errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [code, verifier]);

  const clearToken = useCallback(() => {
    setToken(null);
    setTokError(null);
  }, []);

  return { 
    token, 
    loading, 
    tokError, 
    getToken, 
    clearToken 
  };
}

export default useGetToken;