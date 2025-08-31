import { useState, useEffect, useCallback } from 'react';


const useGetProfile = (token: string | null) => {

  const url = "https://api.spotify.com/v1/me";
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}`}
  }

  const [profile, setProfile] = useState<any | null>(null);


  const fetchProfile = useCallback(async (): Promise<any> => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`}
      });
      const result = await response.json();
      setProfile(result);
      return result;
    }
    catch (error) {
      console.log("Profile Error: "  + error);
      throw error;
    }

  }, [token, options])

  return {profile, fetchProfile}

}

export default useGetProfile;