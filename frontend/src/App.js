import React, { useEffect, useState } from "react";
// import logo from './logo.svg';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import jwt from "jwt-decode";
import moment from "moment";

import Nav from "./components/Nav";
import Add from "./components/Add";
import Edit from "./components/Edit";
import Home from "./components/Home";
import { LoginPage } from "./components/LoginPage";
import PrivateRoute from './components/PrivateRouter';
// When App loads the first time/refreshed
export const isLoggedIn = () => {
  const token = window.localStorage.getItem("token");

  if (token) {
    const decoded = jwt(token);    
    const expires = moment.unix(decoded.exp);
    
    //todo set timoute for expiry to auto logout
    //bonus: auto refresh token if user is active and expiry approaches

    //true if token exists & expiry < current time
    return moment().isBefore(expires);
  } else {
    return false;
  }
};

function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  return (
    <Router>
      <div>
        <Nav logout={setLoggedIn} loginStatus={loggedIn} />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <PrivateRoute path="/add" setLoginStatus={setLoggedIn}>
            {
              //uses an extended route to handle auth checks
              //also takes in the "setLoginStatus" function to update nav etc
            }
            <Add />
          </PrivateRoute>
          <Route path="/edit/:id">
            {
            // auth could be per route using ternary
            //this is achieving the same as the /add route (without preserving return page post login)
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
            }
            {
                loggedIn ? 
                  <Edit /> :  
                  <Redirect to={'/login'} />
            }
            </Route>
          <Route path="/edit">
            <Redirect to="/" />
          </Route>
          <Route path="/login">
            <LoginPage setLoginStatus={setLoggedIn} />
          </Route>
          <Route path="/">{loggedIn && <Home />}</Route>
        </Switch>
      </div>
    </Router>
  );
}


export default App;