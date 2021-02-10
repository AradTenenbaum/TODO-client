import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

function NavBar() {
  const context = useContext(AuthContext);
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    if (context.user) setIsUser(true);
    else setIsUser(false);
  }, [context.user]);

  // delete token and user
  const logingOut = () => {
    setIsUser(false);
    context.logout();
  };
  const logNav = isUser ? (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item active">
      <Link
          className="nav-link"
          aria-current="page"
          to="/"
        >
          {context.user.username}
        </Link>
        
      </li>
      <li className="nav-item active">
        <Link
          onClick={logingOut}
          className="nav-link"
          aria-current="page"
          to="/login"
        >
          Logout
        </Link>
      </li>
    </ul>
  ) : (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item active">
        <Link className="nav-link" aria-current="page" to="/login">
          Login
        </Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          ToDoApp
        </Link>
        <div className="collapse navbar-collapse">{logNav}</div>
      </div>
    </nav>
  );
}

export default NavBar;
