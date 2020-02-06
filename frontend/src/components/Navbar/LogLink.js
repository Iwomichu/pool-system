import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import LogOutButton from "./LogOutButton";
import LogInButton from "./LogInButton";

export default function LogLink(props) {
  const { authTokens, setAuthTokens } = useAuth();

  const elem = authTokens ? (
    <LogOutButton url={props.logoutUrl} />
  ) : (
    <LogInButton url={props.loginUrl} />
  );
  return (
    <ul className="navbar-nav mr-sm-2">
      <li className="nav-item">{elem}</li>
    </ul>
  );
}
