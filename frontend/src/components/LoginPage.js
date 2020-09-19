import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { login, updateHeaderOptions } from "../api";
import jwt from "jwt-decode";

export function LoginPage(props) {
  let history = useHistory();
  let location = useLocation();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  //get the route the user was trying to reach to redirect on login
  //failing that will route to homepage
  //makes use of object destructuring
  let { from } = location.state || { from: { pathname: "/" } };

  const handleSubmit = (e) => {
    e.preventDefault();

    login({
      username: username,
      password: password,
    })
      .then((token) => {
        //handle token
        console.log(token);
        //const decoded = jwt(token);
        //console.log(decoded);

        localStorage.setItem("token", token); //store token
        props.setLoginStatus(true); //update login state for nav
        updateHeaderOptions(); //update the API header with new token
        history.push(from); //route to prior page or homepage
      })
      .catch((e) => {
        console.log(e);
        //do something to tell user it failed
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label data-testid="username">
          User:
          <input
            type="text"
            name="username"
            onChange={(e) => setUserName(e.currentTarget.value)}
            value={username}
          />
        </label>

        <label data-testid="password">
          Password:
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.currentTarget.value)}
            value={password}
          />
        </label>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

//export default LoginPage;
