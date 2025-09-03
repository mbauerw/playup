import {useState, useEffect, useCallback} from 'react';
import type { Followers } from '../types/spotify';

interface ExternalUrls {
  spotify: string;
}


interface SpotifyImage {
  height: number;
  url: string;
  width: number; 
}

interface SpotifyArtist {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

const useGetArtistData = (token : string | null, artistId : string | null) => {

  const url = `https://api.spotify.com/v1/artists/${artistId}`;

  const [data, setData] = useState<SpotifyArtist | null>(null);
  
  const getData = useCallback(async (): Promise<SpotifyArtist> => {
    try {

      console.log('Requesting data...');

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: SpotifyArtist = await response.json();
      setData(result);
      
      console.log('Artist Data received successfully!');
      return result;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get Artist Data';
      console.error('Artist Data request failed:', errorMessage);
      throw err;
    } finally {
      console.log("ooopsie");
    }
  }, [url, token]);

  return {data, getData};

}

export default useGetArtistData;

