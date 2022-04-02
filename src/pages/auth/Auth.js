import React, { Component } from "react";
import Track from "../../component/CardSong";

const { REACT_APP_CLIENT_ID } = process.env;

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      searchKey: "",
      searchResults: [],
    };
  }

  redirectToSpotify() {
    const scopes = "playlist-modify-private";

    const redirect_uri = "http://localhost:3000/";

    const loginUrl = `https://accounts.spotify.com/authorize?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${redirect_uri}&scope=${scopes}&response_type=token&show_dialog=true`;

    window.location = loginUrl;
  }

  componentDidMount() {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    console.log(token);
    this.setState({ token: token });
  }

  handleInput(e) {
    this.setState({ searchKey: e.target.value });
  }

  searchTrack(e) {
    e.preventDefault();

    fetch(
      `https://api.spotify.com/v1/search?type=track&include_external=audio&q=${this.state.searchKey}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.state.token}`,
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => this.setState({ searchResults: result.tracks.items }));
  }

  logout() {
    this.setState({ token: "" });
    window.localStorage.removeItem("token");
  }

  render() {
    const { token, searchResults } = this.state;

    const renderItem = () => {
      return (
        searchResults &&
        searchResults.map((track, index) => (
          <React.Fragment key={index}>
            <Track
              image={track.album.images[0].url}
              title={track.name}
              artist={track.artists[0].name}
              alt={track.name}
            />
          </React.Fragment>
        ))
      );
    };

    return (
      <>
        {token ? (
          <>
            <form className="form-search" onSubmit={(e) => this.searchTrack(e)}>
              <input
                onChange={(e) => {
                  this.handleInput(e);
                }}
                type="text"
                name="search"
                placeholder="Search for a song"
                value={this.state.searchKey}
              />
              <input type="submit" value="Search" />
            </form>

            <div className="Wrapper">{renderItem()}</div>
          </>
        ) : null}

        {!token ? (
          <button className="button" onClick={() => this.redirectToSpotify()}>
            Spotify
          </button>
        ) : (
          <button className="button" onClick={() => this.logout()}>
            Logout
          </button>
        )}
      </>
    );
  }
}
