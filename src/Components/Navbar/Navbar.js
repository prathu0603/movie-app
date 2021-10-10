import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";

import "./navbar.css";
import logo from "./../../Assets/logo.png";
import Dropdown from "react-bootstrap/Dropdown";

import { MovieState } from "../../Context/MovieProvider";

const Navbar = () => {
  const history = useHistory();
  const {
    state: { user },
    dispatch,
  } = MovieState();
  const Logout = async () => {
    await localStorage.setItem("user", false);
    await localStorage.removeItem("userToken");
    await localStorage.removeItem("userId");
    await localStorage.removeItem("movies");
    await dispatch({
      type: "USER",
      payload: JSON.parse(localStorage.getItem("user")),
    });
    history.push("/signin");
  };

  return (
    <nav className="navbar">
      <div className="navbar_logo">
        <span onClick={() => history.push("/")}>Capital</span>
        <img src={logo} onClick={() => history.push("/")} />
      </div>

      <ul className="navbar_links">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-autoclose-true">
            Select Movie Section
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/">Home Page</Dropdown.Item>
            <Dropdown.Item href="/discover/popular">
              Popular Movies
            </Dropdown.Item>
            <Dropdown.Item href="/discover/latest">Latest Movies</Dropdown.Item>

            {user && (
              <Dropdown.Item href="/discover/favourites">
                Favourite Movies
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>

        {user ? (
          <>
            {/* <li>
              <NavLink to="/profile">My Profile</NavLink>
            </li> */}
            <li>
              <button className="btn btn-danger" onClick={Logout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button
                className="btn btn-success"
                onClick={() => history.push("/signin")}
              >
                Signin
              </button>
            </li>
            <li>
              <button
                className="btn btn-warning"
                onClick={() => history.push("/signup")}
              >
                Signup
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
