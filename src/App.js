import "./App.css";
import React from "react";
import data from "./data/data-all";
import Song from "./component/CardSong";

function App() {
  return (
    <div className="App">
      <h1 className="title">Track List</h1>
      <div className="Wrapper">
        {data
          .filter((track, index, arr) => {
            return (
              arr.map((item) => item.album.id).indexOf(track.album.id) === index
            );
          })
          .map(({ album }) => (
            <React.Fragment key={album.id}>
              <Song
                image={album.images[1].url}
                title={album.name}
                artist={album.artists[0].name}
                alt={album.name}
              />
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}

export default App;
