import React, { useEffect } from "react";
import "./Auth.css";
import Button from "../../component/Button";
import useSearch from "../../hooks/useSearch";
import Home from "../home/Home";
import { useDispatch, useSelector } from "react-redux";
import { tokenAuth } from "../../redux/auth-actions";
import { redirectToSpotify } from "../../controller/Auth";

export default function AuthSpotify() {
  const [searchKey, searchResults, setSearchResults, handleSearch] =
    useSearch();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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

  const logout = () => {
    window.localStorage.removeItem("token");
    dispatch(tokenAuth(""));
  };

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      console.log(token);
      dispatch(tokenAuth(token));
    }
  });

  return (
    <>
      {token && (
        <Home
          tracks={searchResults}
          onChange={handleSearch}
          onSubmit={searchTrack}
          token={token}
        />
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
