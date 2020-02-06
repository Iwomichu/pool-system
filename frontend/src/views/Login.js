import React, { useState } from "react";
import { Input, Card, Form, Button } from "../components/AuthForm";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";
import Axios from "axios";

export default function Login() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { authTokens, setAuthTokens } = useAuth();

  function postLogin() {
    Axios.post("http://localhost:8000/auth/token/login/", {
      username: userName,
      password: password
    })
      .then(result => {
        if (result.status === 200) {
          setAuthTokens(result.data);
          setLoggedIn(true);
        } else {
          setError(true);
        }
      })
      .catch(e => {
        setError(true);
      });
  }

  if (isLoggedIn) return <Redirect to="/dashboard" />;
  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <form>
          <div className="form-group">
            <label htmlFor="loginInput">Login</label>
            <input
              type="text"
              className="form-control"
              id="loginInput"
              aria-describedby="loginHelp"
              onChange={e => {
                setUserName(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword"
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button type="button" className="btn btn-primary" onClick={postLogin}>
            Log In
          </button>
          <br />
          <Link to="/signup">Don't have an account?</Link>
          {isError ? <i>Credentials incorrect!</i> : ""}
        </form>
      </div>
    </div>
  );
}
