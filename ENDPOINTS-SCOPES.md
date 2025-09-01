# Get User Info

get recently played tracks: 
  - scope: user-read-recently-played
  - ENDPOINT: https://api.spotify.com/v1/me/player/recently-played
  - https://developer.spotify.com/documentation/web-api/reference/get-recently-played

get user's top items:
  - scope: user-top-read
  - ENDPOINT: https://api.spotify.com/v1/me/top/{type}
  - https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks

get followed artists:
  - scope: user-follow-read
  - ENDPOINT: https://api.spotify.com/v1/me/following
  - https://developer.spotify.com/documentation/web-api/reference/get-followed


# Get Playlist Info

Get a playlist owned by a spotify user
- scope: none
- EP: https://api.spotify.com/v1/playlists/{playlist_id}
- https://developer.spotify.com/documentation/web-api/reference/get-playlist

Get Current user's playlist
- scope: playlist-read-private
- EP: https://api.spotify.com/v1/me/playlists
- https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists


# Get track/artist info

get track:
  - scope: none
  - EP: https://api.spotify.com/v1/tracks/{id}
  - https://developer.spotify.com/documentation/web-api/reference/get-track

# Search for info

search for item:
  - scope: none
  - ENDPOINT: https://api.spotify.com/v1/search
  - https://developer.spotify.com/documentation/web-api/reference/search