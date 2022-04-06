import "./App.css";
import React from "react";
import AuthSpotify from "./pages/auth/AuthSpotify";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AuthSpotify />
      </div>
    </Provider>
  );
}

export default App;
