import React from "react";
import { Input, Card, Form, Button } from "../components/AuthForm";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <form>
          <div className="form-group">
            <label for="loginInput">Login</label>
            <input
              type="text"
              className="form-control"
              id="loginInput"
              aria-describedby="loginHelp"
            />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
          <br />
          <Link to="/signup">Don't have an account?</Link>
        </form>
      </div>
    </div>
  );
}
