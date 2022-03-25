import React from "react";

function Song(props) {
  return (
    <>
      <img src={props.image} alt="" />
      <p>{props.title}</p>
      <p>{props.artist}</p>
      <button> Select </button>
    </>
  );
}

export default Song;
