// import logo from "./logo.svg";
import "./App.css";
import Song from "./component/CardSong";
import data from "./data";

function App() {
  return (
    <div className="App">
      <Song
        image={data.album.images[1].url}
        title={data.album.name}
        artist={data.album.artists[0].name}
      />
    </div>
  );
}

export default App;
