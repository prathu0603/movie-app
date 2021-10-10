import React, { useRef, useState } from "react";
import "./signup.css";

import { NavLink, useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

import { api } from "./../../api";

const Signup = () => {
  const history = useHistory();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const CreateUser = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    var tester =
      /^[-!#$%&'*+0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (
      !nameRef.current.value ||
      !emailRef.current.value ||
      !passwordRef.current.value ||
      !repeatPasswordRef.current.value
    ) {
      setMessage("Enter all Fields");
    } else if (!tester.test(emailRef.current.value)) {
      setMessage("Check Email Format");
    } else if (passwordRef.current.value !== repeatPasswordRef.current.value) {
      setMessage("Passwords doesn't match");
    } else {
      const data = await fetch(`${api}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      });

      if (data.status === 409) {
        setMessage("");
        setError("Email Already Registered");
      } else if (data.status === 200) {
        // setMessage(
        //   "Account Created, Activate By Clicking on Sent Mail (CHECK SPAM FOLDER !!!)"
        // );
        setLoading(false);
        window.alert("Registration Successful, Sign In");
        history.push("/signin");
      } else window.alert("Server Issue, Try After Sometime");
    }
    setLoading(false);
  };

  return (
    <div className="signup_container">
      <form className="signup_box" autoComplete="off">
        <h2>Sign Up</h2>
        <div className="alert_message">
          {message && <Alert variant="warning">{message}</Alert>}
        </div>
        <div className="alert_message">
          {error && <Alert variant="danger">{error}</Alert>}
        </div>

        <div>
          <input type="text" placeholder="Name" ref={nameRef} />
        </div>
        <div>
          <input type="email" placeholder="Email" ref={emailRef} />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
            autoComplete="off"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Repeat Password"
            ref={repeatPasswordRef}
            autoComplete="off"
          />
        </div>
        <button type="submit" onClick={CreateUser} disabled={loading}>
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}
              Creating Account
            </>
          ) : (
            <span>Sign Up</span>
          )}
        </button>
        <div>
          <p>
            Already on Capital Movies? &nbsp;
            <NavLink to="/signin"> Sign in</NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
