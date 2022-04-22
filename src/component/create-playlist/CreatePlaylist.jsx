import React from 'react';
import Song from '../track-components/CardSong';

export default function CreatePlaylist(props) {
  const {
    profile,
    createSubmit,
    handleInput,
    inputValue,
    playlist,
    trackPlaylist,
  } = props;

  return (
    <div className="playlist-container">
      <h1 className="text-3xl font-bold underline">Create Playlist</h1>
      <br />
      {/* <div>
        <h3>{profile.display_name}</h3>
        <p>{`ID ${profile.id}`}</p>
      </div>
      <br /> */}
      <div className="justify-center flex">
        <form className="flex-col w-1/4" onSubmit={createSubmit}>
          <input
            className="text-black mb-2 p-2 w-full"
            type="text"
            placeholder="Title"
            name="title"
            maxLength="10"
            onChange={handleInput}
            value={inputValue.title}
          />
          <textarea
            className="text-black mb-2 p-2 w-full"
            type="text"
            placeholder="Description"
            name="description"
            onChange={handleInput}
            value={inputValue.description}
          />
          <input
            className="create-button"
            type="submit"
            value="Create Playlist"
          />
        </form>
      </div>
      {playlist.length === 0 ? null : <h1>{`${playlist.name} Playlist`}</h1>}

      <h3>{playlist.description}</h3>
      <div className="Wrapper">
        {trackPlaylist.map((item) => (
          <React.Fragment key={item.track.id}>
            <Song
              images={item.track.album.images[0].url}
              title={item.track.name}
              artist={item.track.artists[0].name}
              alt={item.track.name}
            >
              Play
            </Song>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
