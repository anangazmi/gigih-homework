import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../component/button/Button';
import { setToken } from '../../redux/slice';

const { REACT_APP_CLIENT_ID } = process.env;
const SCOPES = 'playlist-modify-private';
const REDIRECT_URI = 'https://gigih-homework-green.vercel.app/';

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
      dispatch(setToken(token));
    }
  });

  return (
    <>
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex h-screen flex-col">
          <div className="py-4">
            <h2 className="font-sans font-extrabold text-xl text-green-500">
              Gigih Playlist
            </h2>
          </div>
          <div className="flex grow flex-col justify-center text-center">
            <div className="space-y-3">
              <h1 className="font-sans font-bold">
                Welcome to Gigih Playlist!
              </h1>
              <p>This project is a implementation of spotify&apos;s playlist</p>
              <div className="auth-wrap">
                <Button onClick={redirectToSpotify}>Login with Spotify</Button>
              </div>
              <div className="flex justify-center">
                <p className="text-sm">©2022 Azmi Irfala</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
