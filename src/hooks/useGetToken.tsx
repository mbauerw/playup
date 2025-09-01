import {useState, useEffect, useCallback} from 'react';
import type { SpotifyTokenResponse } from '../types/spotify';

function useGetToken(code: string) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tokError, setTokError] = useState<string | null>(null);

  const verifier = localStorage.getItem("code_verifier");

  console.log("Verifier is here: " + verifier);
  

  const getToken = useCallback(async (): Promise<[string]> => {
    setLoading(true);
    setTokError(null);

    try {
      const params = new URLSearchParams();
      params.append("client_id", import.meta.env.VITE_clientId);
      params.append("grant_type", "authorization_code");
      params.append("code", code);
      params.append("redirect_uri", "http://127.0.0.1:5173/callback");
      params.append("code_verifier", verifier!);

      console.log('Requesting token...');

      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: SpotifyTokenResponse = await response.json();
      setToken(result.access_token);
      
      console.log('Token received successfully!');
      return [result.access_token];

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get token';
      setTokError(errorMessage);
      console.error('Token request failed:', errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

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