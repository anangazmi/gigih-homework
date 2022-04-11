import React, { useEffect } from 'react';
import './Auth.css';
import { useDispatch } from 'react-redux';
import Button from '../../component/button/Button';
import { tokenAuth } from '../../redux/auth-actions';

const { REACT_APP_CLIENT_ID } = process.env;
const SCOPES = 'playlist-modify-private';
const REDIRECT_URI = 'http://localhost:3000/';

export default function AuthSpotify() {
  const dispatch = useDispatch();

  const redirectToSpotify = () => {
    const loginUrl = `https://accounts.spotify.com/authorize?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&response_type=token&show_dialog=true`;

    window.location = loginUrl;
  };

  useEffect(() => {
    const { hash } = window.location;

    if (hash) {
      const token = hash
        .substring(1)
        .split('&')
        .find((elem) => elem.startsWith('access_token'))
        .split('=')[1];
      window.location.hash = '';
      dispatch(tokenAuth(token));
    }
  });

  return (
    <div className="auth-wrap">
      <Button onClick={redirectToSpotify}>Login Spotify</Button>
    </div>
  );
}
