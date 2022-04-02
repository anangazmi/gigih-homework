import React, { useEffect, useState } from "react";
import "../App.css";
import Button from "./Button";

const Song = ({ tracks }) => {
  const [isSelected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!isSelected);
    let current_selected = JSON.parse(localStorage.getItem("selected"));

    if (isSelected === false) {
      current_selected[tracks.id] = tracks;
    } else {
      delete current_selected[tracks.id];
    }
    localStorage.setItem("selected", JSON.stringify(current_selected));
  };

  useEffect(() => {
    let current_selected = JSON.parse(localStorage.getItem("selected"));
    if (current_selected[tracks.id]) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  });

  return (
    <>
      <table className="card">
        <tbody>
          <tr>
            <td>
              <img
                className="Imageopt"
                src={tracks.album.images[0].url}
                alt={tracks.name}
              />
              <h1 className="Text">{tracks.name}</h1>
              <p className="Text">{tracks.artists[0].name}</p>
              <Button onClick={handleClick}>
                {isSelected ? "Deselect" : "Select"}
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Song;
