export const getSpotifyToken = async (code: string, verifier: string) => {
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

  return response.json();
};