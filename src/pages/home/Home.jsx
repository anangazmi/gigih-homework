import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchForm from '../../component/form-search/Search';
import Button from '../../component/button/Button';
import Song from '../../component/track-components/CardSong';
import CreatePlaylist from '../../component/create-playlist/CreatePlaylist';
import useSearch from '../../hooks/useSearch';
import { setToken } from '../../redux/slice';

export default function Home() {
  const [searchKey, searchResults, setSearchResults, handleSearch] =
    useSearch();
  const [selected, setSelected] = useState([]);
  const [isCombine, setCombine] = useState([]);
  // * Get current user
  const [isUser, setUser] = useState('');
  // * Create playlist
  const [isPlaylist, setPlaylist] = useState([]);
  // * Add track to playlist
  const [trackPlaylist, setTrackPlaylist] = useState([]);

  const [inputPlaylist, setInputPlaylist] = useState({
    title: '',
    description: '',
  });

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const searchTrack = (e) => {
    e.preventDefault();
    const url = `https://api.spotify.com/v1/search?q=${searchKey}&type=track`;
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((result) => setSearchResults(result.tracks.items));
  };

  const createPlaylist = (e) => {
    e.preventDefault();
    fetch(`https://api.spotify.com/v1/users/${isUser.id}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: inputPlaylist.title,
        description: inputPlaylist.description,
        public: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
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
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uris: track,
      }),
    }).then((res) => res.json());

    await fetch(
      `https://api.spotify.com/v1/playlists/${isPlaylist.id}/tracks`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setTrackPlaylist(data.items);
      });

    setSelected([]);
  };

  const handleClick = (track) => {
    const alreadySelected = selected.find((item) => item.id === track.id);

    if (alreadySelected) {
      setSelected(selected.filter((item) => item.id !== track.id));
    } else {
      setSelected([...selected, track]);
    }
  };

  const logout = () => {
    window.localStorage.removeItem('token');
    dispatch(setToken(''));
  };

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((result) => result);
      setUser(response);
    };
    getUsers();
  }, [token]);

  useEffect(() => {
    const combineItem = searchResults.map((track) => ({
      ...track,
      isSelected: selected.find((item) => item.id === track.id),
    }));
    setCombine(combineItem);
  }, [selected, searchResults]);

  const renderItem = () => (
    <>
      {isCombine.map((track) => (
        <React.Fragment key={track.id}>
          <Song
            images={track.album.images[0].url}
            title={track.name}
            artist={track.artists[0].name}
            albumName={track.album.name}
            alt={track.name}
            onClick={() => handleClick(track)}
          >
            {track.isSelected ? 'Deselect' : 'Select'}
          </Song>
        </React.Fragment>
      ))}
    </>
  );

  return (
    <>
      <br />
      <SearchForm onChange={handleSearch} onSubmit={searchTrack} />
      <br />
      {isCombine.length === 0 ? null : (
        <h3 className="text-3xl font-bold underline">Track List</h3>
      )}
      <br />
      <div className="track-container">{renderItem()}</div>
      {selected.length === 0 ? null : (
        <h3 className="text-3xl font-bold underline">Selected List</h3>
      )}
      <br />
      <div className="track-container">
        {selected.map((track) => (
          <React.Fragment key={track.id}>
            <Song
              images={track.album.images[0].url}
              title={track.name}
              artist={track.artists[0].name}
              albumName={track.album.name}
              alt={track.name}
              onClick={() => handleClick(track)}
            >
              Deselect
            </Song>
          </React.Fragment>
        ))}
      </div>
      {selected.length === 0 ? null : (
        <Button onClick={addToPlayList}>Save to Playlist</Button>
      )}

      <CreatePlaylist
        profile={isUser}
        createSubmit={createPlaylist}
        handleInput={handleInputPlaylist}
        inputValue={inputPlaylist}
        playlist={isPlaylist}
        trackPlaylist={trackPlaylist}
      />
      <Button onClick={logout}> Log Out</Button>
    </>
  );
}
