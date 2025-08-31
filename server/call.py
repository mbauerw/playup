curl -X POST "https://accounts.spotify.com/api/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=client_credentials&client_id=fcc754186cae434197475f0ea29ac7c4&client_secret=d4b6643e62214511b85925f86be11939"


{"access_token":"BQAH2qaPIpbugBUR5JEDy_8TA5IKAazqFzQP2zbqXZXU-6Ysazb44vjln7fLkPwrvJ99WP8PJLdgGHKPYT2dIDEEH4waHbCUFR_k6u4iTVrmevpy1O928VYac_lx6HmrcD0gYA4Zhyo","token_type":"Bearer","expires_in":3600}%

curl "https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb" \
     -H "Authorization: Bearer  BQAH2qaPIpbugBUR5JEDy_8TA5IKAazqFzQP2zbqXZXU-6Ysazb44vjln7fLkPwrvJ99WP8PJLdgGHKPYT2dIDEEH4waHbCUFR_k6u4iTVrmevpy1O928VYac_lx6HmrcD0gYA4Zhyo"