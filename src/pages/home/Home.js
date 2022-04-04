import React, { useState, useEffect } from "react";
import SearchForm from "../../component/Search";
import Track from "../../component/CardSong";
import "../../App.css";
import Button from "../../component/Button";

export default function Home({ onChange, onSubmit, tracks, token }) {
  const [selected, setSelected] = useState([]);
  const [isCombine, setCombine] = useState([]);
  // * Untuk mendapatkan current user
  const [isUser, setUser] = useState("");
  // * Untuk membuat playlist
  const [isPlaylist, setPlaylist] = useState([]);
  // * Add track to playlist
  const [trackPlaylist, setTrackPlaylist] = useState([]);

  const [inputPlaylist, setInputPlaylist] = useState({
    title: "",
    description: "",
  });

  const createPlaylist = (e) => {
    e.preventDefault();
    fetch(`https://api.spotify.com/v1/users/${isUser.id}/playlists`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputPlaylist.title,
        description: inputPlaylist.description,
        public: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPlaylist(data);
      });
  };

  const handleInputPlaylist = (e) => {
    const { name, value } = e.target;
    setInputPlaylist({ ...inputPlaylist, [name]: value });
  };

  const addToPlayList = async () => {
    const url = `https://api.spotify.com/v1/playlists/${isPlaylist.id}/tracks`;
    const track = selected.map((elem) => elem.uri);
    await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: track,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });

    await fetch(
      `https://api.spotify.com/v1/playlists/${isPlaylist.id}/tracks`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTrackPlaylist(data.items);
      });
  };

  const handleClick = (track) => {
    const alreadySelected = selected.find((item) => item.id === track.id);

    if (alreadySelected) {
      setSelected(selected.filter((item) => item.id !== track.id));
    } else {
      setSelected([...selected, track]);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => result);
      setUser(response);
      // console.log(response);
    };
    getUsers();
  }, [token]);

  useEffect(() => {
    const combineItem = tracks.map((track) => ({
      ...track,
      isSelected: selected.find((item) => item.id === track.id),
    }));
    setCombine(combineItem);
  }, [selected, tracks]);

  const renderItem = () => {
    return (
      <>
        {isCombine.map((track, index) => (
          <React.Fragment key={index}>
            <Track
              images={track.album.images[1].url}
              title={track.name}
              artist={track.artists[0].name}
              alt={track.name}
              onClick={() => handleClick(track)}
            >
              {track.isSelected ? "Deselect" : "Select"}
              {/* {isSelected ? "Deselect" : "Select"} */}
            </Track>
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <>
      <h1>Create Playlist</h1>

      <p>Name: {isUser.display_name}</p>
      <p>ID: {isUser.id}</p>

      <form className="form-playlist" onSubmit={createPlaylist}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          maxLength="10"
          onChange={handleInputPlaylist}
          value={inputPlaylist.title}
        />
        <textarea
          type="text"
          placeholder="Description"
          name="description"
          onChange={handleInputPlaylist}
          value={inputPlaylist.description}
        />
        <input type="submit" value="Create Playlist" />
      </form>

      <h1>{isPlaylist.name} PlayList</h1>
      <h3>{isPlaylist.description}</h3>
      <div className="Wrapper">
        {trackPlaylist.map((item, index) => (
          <React.Fragment key={index}>
            <Track
              images={item.track.album.images[0].url}
              title={item.track.name}
              artist={item.track.artists[0].name}
              alt={item.track.name}
            >
              Play
            </Track>
          </React.Fragment>
        ))}
      </div>

      {/* <p>{isPlaylist.tracks.total}</p> */}

      <SearchForm onChange={onChange} onSubmit={onSubmit} />

      {selected.length === 0 ? null : <h1>Selected List</h1>}

      <div className="Wrapper">
        {selected.map((track, index) => (
          <React.Fragment key={index}>
            <Track
              images={track.album.images[1].url}
              title={track.name}
              artist={track.artists[0].name}
              alt={track.name}
              onClick={() => handleClick(track)}
            >
              Deselect
            </Track>
          </React.Fragment>
        ))}
      </div>
      {selected.length === 0 ? null : (
        <Button onClick={addToPlayList}>Save to Playlist</Button>
      )}

      {isCombine.length === 0 ? null : <h1>Track List</h1>}
      <div className="Wrapper">{renderItem()}</div>
    </>
  );
}
