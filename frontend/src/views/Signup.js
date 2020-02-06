import React, { useState } from "react";
import { Card, Input, Form, Button } from "../components/AuthForm";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [isError, setIsError] = useState(false);
  function signUp(e) {
    e.preventDefault();
    console.log(`${userName}, ${email}, ${password}`);
    Axios.post("/auth/users/", {
      username: userName,
      email: email,
      password: password
    })
      .then(result => {
        if (result.status === 201) {
          setIsRegistered(true);
        } else {
          console.log(result);
          setIsError(true);
        }
      })
      .catch(err => setIsError(true));
  }
  if (isRegistered) return <Redirect to="/" />;
  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <form onSubmit={signUp}>
          <div className="form-group">
            <label htmlFor="emailInput">Email address</label>
            <input
              type="email"
              className="form-control"
              id="emailInput"
              aria-describedby="emailHelp"
              required
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="loginInput">Login</label>
            <input
              type="text"
              className="form-control"
              id="loginInput"
              aria-describedby="loginHelp"
              required
              onChange={e => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              required
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
          <br />
          <Link to="/login">Already have an account?</Link>
          <br />
          {isError ? <i>Credentials incorrect!</i> : ""}
        </form>
      </div>
    </div>
  );
}
