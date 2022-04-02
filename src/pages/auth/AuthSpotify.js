import React, { useEffect, useState } from "react";
import "./Auth.css";
import Button from "../../component/Button";
import useAuth from "../../hooks/useAuth";
import useSearch from "../../hooks/useSearch";
import Track from "../../component/CardSong";

export default function AuthSpotify() {
  const [token, setToken, logout] = useAuth();
  const [data, setData] = useState([]);
  const [searchKey, searchResults, setSearchResults, handleSearch] =
    useSearch();

  const { REACT_APP_CLIENT_ID } = process.env;

  const redirectToSpotify = () => {
    const scopes = "playlist-modify-private";
    const redirect_uri = "http://localhost:3000/";
    const loginUrl = `https://accounts.spotify.com/authorize?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${redirect_uri}&scope=${scopes}&response_type=token&show_dialog=true`;

    window.location = loginUrl;
  };

  const searchTrack = (e) => {
    e.preventDefault();
    const url = `https://api.spotify.com/v1/search?q=${searchKey}&type=track`;
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => setSearchResults(result.tracks.items));
    console.log(token);
  };

  if (localStorage.getItem("selected") === null) {
    localStorage.setItem("selected", JSON.stringify({}));
  }

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  });

  useEffect(() => {
    const getData = () => {
      const data = JSON.parse(localStorage.getItem("selected"));
      setData(data);
    };

    getData();
  }, [data]);

  return (
    <>
      {token && (
        <>
          <form className="form-search" onSubmit={searchTrack}>
            <input
              className="input-search"
              onChange={handleSearch}
              type="text"
              name="search"
              placeholder="Search for a song"
            />
            <input className="input-submit" type="submit" value="Search" />
          </form>

          {Object.values(data).length === 0 ? null : <h1>Selected List</h1>}
          <div className="Wrapper">
            {data &&
              Object.values(data).map((track, index) => (
                <React.Fragment key={index}>
                  <Track tracks={track} />
                </React.Fragment>
              ))}
          </div>
          {searchResults.length === 0 ? null : <h1>Track List</h1>}
          <div className="Wrapper">
            {searchResults
              .filter((item) => !(item.id in data))
              .map((track, index) => (
                <React.Fragment key={index}>
                  <Track tracks={track} />
                </React.Fragment>
              ))}
          </div>
        </>
      )}

      {!token ? (
        <div className="auth-wrap">
          <Button onClick={redirectToSpotify}>Login Spotify</Button>
        </div>
      ) : (
        <Button onClick={logout}> Log Out</Button>
      )}
    </>
  );
}
