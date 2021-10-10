import React, { useState, useRef } from "react";
import "./signin.css";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { NavLink, useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

import { MovieState } from "../../Context/MovieProvider";
import { api } from "./../../api";

const Signin = () => {
  const {
    state: { user },
    dispatch,
  } = MovieState();

  const [hide, setHide] = useState(false);

  const history = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const LoginUser = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    var tester =
      /^[-!#$%&'*+0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (!emailRef.current.value || !passwordRef.current.value) {
      setMessage("Enter all Fields");
    } else if (!tester.test(emailRef.current.value)) {
      setMessage("Check Email Format");
    } else {
      setLoading(true);
      const data = await fetch(`${api}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      });

      if (data.status === 401) {
        setMessage("");
        setError("Invalid Credentials");
      } else if (data.status === 200) {
        setLoading(false);
        const data1 = await data.json();
        await localStorage.setItem("user", true);
        await localStorage.setItem("userId", data1.user._id);
        await localStorage.setItem("userToken", data1.token);
        await localStorage.setItem("movies", JSON.stringify(data1.user.movies));
        await dispatch({
          type: "USER",
          payload: JSON.parse(localStorage.getItem("user")),
        });
        await dispatch({
          type: "INITIAL",
          payload: JSON.parse(localStorage.getItem("movies")),
        });
        history.push("/");
      } else window.alert("Server Issue, Try After Sometime");
    }
    setLoading(false);
  };

  return (
    <div className="signin_container">
      <form className="signin_box" autoComplete="off">
        <h2>Sign In</h2>
        <div className="alert_message">
          {message && <Alert variant="warning">{message}</Alert>}
        </div>
        <div className="alert_message">
          {error && <Alert variant="danger">{error}</Alert>}
        </div>
        <div>
          <input type="email" placeholder="Email" ref={emailRef} />
        </div>
        <div className="signin_password_wraper">
          <input
            className="signin_password"
            type={hide ? "text" : "password"}
            placeholder="Password"
            ref={passwordRef}
            autoComplete="off"
          />
          <span className="eyeicon">
            {hide ? (
              <AiFillEye
                size="1.5rem"
                color="white"
                onClick={() => setHide(!hide)}
              />
            ) : (
              <AiFillEyeInvisible
                size="1.5rem"
                color="white"
                onClick={() => setHide(!hide)}
              />
            )}
          </span>
        </div>
        <button type="submit" onClick={LoginUser} disabled={loading}>
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}
              Wait For Login
            </>
          ) : (
            <span>Sign In</span>
          )}
        </button>
        <div>
          <p>
            <NavLink to="/signup">Forgot Password</NavLink>
            &nbsp;
            <RiLockPasswordFill />
          </p>
        </div>
        <div>
          <p>
            New to Capital Movies? &nbsp;
            <NavLink to="/signup"> Sign up now</NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signin;
