import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from '../component/layout/Header';

import AuthSpotify from '../pages/auth/AuthSpotify';
import Home from '../pages/home/Home';

function AppRoutes() {
  const { token } = useSelector((state) => state.auth);
  console.log(token);
  return (
    // <Router>
    //   <Switch>
    //     <Route path="/home">{token ? <Home /> : <Redirect to="/" />}</Route>
    //     <Route path="/">
    //       {token ? <Redirect to="/home" /> : <AuthSpotify />}
    //     </Route>
    //   </Switch>
    // </Router>
    <Routes>
      <Route
        path="/home"
        element={token ? <Header /> : <Navigate to="/" replace />}
      >
        <Route index element={<Home />} />
      </Route>
      <Route
        path="/"
        element={token ? <Navigate to="/home" /> : <AuthSpotify />}
      />
    </Routes>
  );
}

export { AppRoutes };
