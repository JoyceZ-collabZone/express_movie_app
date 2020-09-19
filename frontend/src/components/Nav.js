import React from "react";
import { Link } from "react-router-dom";

function Nav(props) {
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    props.logout(false);
  };
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add">Add</Link>
        </li>
        <li>
          {props.loginStatus && (
            <Link to="/login" onClick={handleLogout}>
              Logout
            </Link>
          )}
          {!props.loginStatus && <Link to="/login">Login</Link>}
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
