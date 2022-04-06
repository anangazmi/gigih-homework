import React from "react";
import "../App.css";
import Button from "./Button";

const Song = ({ images, title, artist, onClick, children }) => {
  return (
    <>
      <table className="card">
        <tbody>
          <tr>
            <td>
              <img className="Imageopt" src={images} alt={title} />
              <h1 className="Text">{title}</h1>
              <p className="Text">{artist}</p>
              <Button onClick={onClick}>{children}</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Song;
