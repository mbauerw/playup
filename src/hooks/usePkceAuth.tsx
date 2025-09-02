import { useState, useEffect, useCallback } from 'react';
import type { UsePkceAuthReturn } from '../types/auth';

// Move utility functions outside the hook to prevent recreation
const generateRandomString = (length: number): string => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const sha256 = async (plain: string): Promise<ArrayBuffer> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
};

const base64encode = (input: ArrayBuffer): string => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};



const usePkceAuth = (): UsePkceAuthReturn => {
  const [code, setCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clientId = import.meta.env.VITE_clientId;
  const redirectUri = 'http://127.0.0.1:5173/callback';
  const scope = 'user-read-private user-read-email playlist-read-private playlist-modify-private user-follow-read';

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');
    const authError = urlParams.get('error');

    if (authError) {
      setError(`Authentication failed: ${authError}`);
    } else if (authCode) {
      setCode(authCode);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const generateCodeChallenge = async (codeVerifier: string): Promise<string> => {
    const hashed = await sha256(codeVerifier);
    return base64encode(hashed);
  };

  const initiateAuth = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      if (!clientId) {
        throw new Error('Client ID not found in environment variables');
      }

      // Generate PKCE parameters
      const codeVerifier = generateRandomString(64);
      const codeChallenge = await generateCodeChallenge(codeVerifier);

      // Store code verifier for later use
      localStorage.setItem('code_verifier', codeVerifier);

      // Build authorization URL
      const authUrl = new URL("https://accounts.spotify.com/authorize");
      const params = {
        response_type: 'code',
        client_id: clientId,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
      };

      authUrl.search = new URLSearchParams(params).toString();
      
      // Redirect to Spotify authorization
      window.location.href = authUrl.toString();
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to initiate authentication';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [clientId, redirectUri, scope]);

  const clearAuth = useCallback((): void => {
    setCode('null');
    setError(null);
    localStorage.removeItem('code_verifier');
  }, []);

  return {
    code,
    isLoading,
    error,
    initiateAuth,
    clearAuth
  };
};

export default usePkceAuth;
