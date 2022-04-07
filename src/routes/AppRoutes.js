import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import AuthSpotify from "../pages/auth/AuthSpotify";
import Home from "../pages/home/Home";

const AppRoutes = () => {
  const { token } = useSelector((state) => state.auth);

  console.log(token);

  return (
    <Router>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/">
          {token ? <Redirect to="/home" /> : <AuthSpotify />}
        </Route>
      </Switch>
    </Router>
  );
};

export { AppRoutes };
