const { REACT_APP_CLIENT_ID } = process.env;
const SCOPES = 'playlist-modify-private';
const REDIRECT_URI = 'https://gigih-homework-green.vercel.app/';

const redirectToSpotify = () => {
  const loginUrl = `https://accounts.spotify.com/authorize?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&response_type=token&show_dialog=true`;

  window.location = loginUrl;
};

export { redirectToSpotify };
