import React from "react";
import "../App.css";

const Song = ({ image, title, artist, alt }) => {
  return (
    <>
      <table className="card">
        <tbody>
          <tr>
            <td>
              <img className="Imageopt" src={image} alt={alt} />
              <h1 className="Text">{title}</h1>
              <p className="Text">{artist}</p>
              <div className="Center">
                <button onClick={alert} className="Button">
                  Select
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Song;
