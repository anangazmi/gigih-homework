// import logo from "./logo.svg";
import "./App.css";
import data from "./data";

function App() {
  return (
    <div className="App">
      <img src={data.album.images[1].url} alt="" />
      <p>{data.album.name}</p>
      <p>{data.album.artists[0].name}</p>
      <button> Select </button>
    </div>
  );
}

export default App;
