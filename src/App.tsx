import { useEffect, useState } from 'react'
import './App.css'
import useGetToken from './hooks/useGetToken'
import useGetArtistData from './hooks/useGetArtistData'
import usePkceAuth from './hooks/usePkceAuth'
import useGetProfile from './hooks/useGetProfile'
import useGetCurrentUserPlaylists from './hooks/playlists/useGetCurrentUserPlaylists'

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

function App() {
  // const scope = 'user-read-private user-read-email playlist-read-private';
  // pkce vars
  const {code, isLoading, error, initiateAuth, clearAuth} = usePkceAuth();

  // token vars
  const {token, loading, error: tokError, fetchToken, clearToken} = useGetToken(code);  
  
  // playlist vars
  const {playlists, loading: playlistsLoading, error: playlistsError, fetchCurrentUserPlaylists} = useGetCurrentUserPlaylists(token);

  // artist direct vars
  const aMonkey = "7Ln80lUS6He07XvHI8qqHH?si=STCSgHE_RMScHZiuYI53VA"
  const {data, getData} = useGetArtistData(token, aMonkey);


  // profile vars
  const {profile, fetchProfile} = useGetProfile(token);


  const handleClearToken = () => {
    clearToken();
  };

  const handleGetArtistData = async () => {
    try {
      const artistData = await getData();
      console.log('Artist data retrieved:', artistData);
    } catch (error) {
      console.error('Failed to get artist data:', error);
    }
  };

  const handleGetPkce = async () => {
    try {
      initiateAuth();
      //console.log('The Code is as follows: ', code);

    } catch (error){
      console.error('Failed to get Auth:', error);
    }
  }

  const handleGetToken = async () => {
    try {
      fetchToken();
      //console.log('We got them tokens', token);
    }
    catch (error){
      console.error('Failed to get Token:', error);
    }
  }

  const handleGetProfile = async () => {
    if (code){
      try {
        fetchProfile();
        //console.log("Heyyyo profile: " + JSON.stringify(profile));
      }
      catch (error){
        console.log(error);
      }
    }
    
  }

  const handleGetPlaylists = async () => {
    if (!token){
      console.log('No token available for playlists');
      return;
    }
      try{
        const result = await fetchCurrentUserPlaylists();
        console.log('Playlists retrieved:', JSON.stringify(result));
      } catch (error){
        console.log('damn playlists', error);
      }
    }


  return (
    <div>
      <p>Token: {token ? 'Token received' : 'No token'}</p>
      {tokError && <p style={{ color: 'red' }}>Error: {tokError}</p>}
      {token && <p className='text-2xl text-white'> {JSON.stringify(token)}</p>}
      
      <button onClick={handleGetArtistData} disabled={loading || !token}>
        {loading ? 'Getting Artist Data...' : 'Get Artist Data'}
      </button>

      <button onClick={handleGetPkce}>
        {loading ? 'Getting Auth...' : 'Get Auth'}
      </button>

      <button onClick={handleGetToken}>
        {loading ? 'Getting Token...' : 'Get Token'}
      </button>

      <button onClick={handleGetProfile} disabled={loading}>
        {loading ? 'Getting Profile...' : 'Get Profile'}
      </button>

      <button onClick={handleGetPlaylists} >
        {playlistsLoading ? 'Getting Playlists...' : 'Get Playlist'}
      </button>
      
      <button onClick={handleClearToken} disabled={loading}>
        Clear Token
      </button>

      {/* Display artist data if available */}
      {code && (
        <div>
          <h3> COOOOOOODEE</h3>
          <pre>{JSON.stringify(code, null, 2)}</pre>
        </div>
      )}
      {profile && (
        <div>
        <h3> Profile</h3>
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </div>
      )}
      {data && (
        <div>
          <h3>Artist Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
      {playlists && (
        <div>
          <h3>PLAYLISTS:</h3>
          <pre>{JSON.stringify(playlists, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App