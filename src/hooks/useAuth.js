import { useState } from 'react';

const { REACT_APP_CLIENT_ID } = process.env;
const SCOPES = 'playlist-modify-private';
const REDIRECT_URI = 'http://localhost:3000/';

export default function useAuth() {
  const [token, setToken] = useState('');

  const redirectToSpotify = () => {
    const loginUrl = `https://accounts.spotify.com/authorize?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&response_type=token&show_dialog=true`;

    window.location = loginUrl;
  };

  const logout = () => {
    window.localStorage.removeItem('token');
    setToken('');
  };

  return [token, setToken, logout, redirectToSpotify];
}
