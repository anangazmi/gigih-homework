import React, { ReactNode } from 'react';
import Button from '../button/Button';

type SongProps = {
  images:string; 
  title:string;
  artist:string;
  albumName:string;
  onClick:() => void;
  children:ReactNode
}

function Song(props:SongProps) {
  const {images, title, artist, albumName, onClick, children} = props
  return (
    <table className="card">
      <tbody>
        <tr>
          <td className="card-wrap">
            <img className="Imageopt" src={images} alt={title} />
            <div className="card-information">
              <div className="head-information">
                <h1 className="font-sans font-bold py-2">{title}</h1>
                <p className="font-sans font-semibold">{artist}</p>
              </div>
              <p className="font-sans font-normal py-2">{albumName}</p>
              <Button onClick={onClick}>{children}</Button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Song;
