import { useState } from "react";

export default function useAuth() {
  const [token, setToken] = useState("");
  // const [searchKey, setSearchResults] = useSearch();

  // const searchTrack = (e) => {
  //   e.preventDefault();
  //   const url = `https://api.spotify.com/v1/search?q=${searchKey}&type=track`;
  //   fetch(url, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => setSearchResults(result.tracks.items));
  //   // console.log(token);
  //   // .then((result) => console.log(result.tracks.items));
  // };

  const logout = () => {
    window.localStorage.removeItem("token");
    setToken("");
  };

  return [token, setToken, logout];
}
