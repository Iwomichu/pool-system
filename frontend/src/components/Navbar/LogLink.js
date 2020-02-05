import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";

export default function LogLink(props) {
  const { authTokens } = useAuth();
  const params = authTokens
    ? { url: props.logoutUrl, text: "Log Out" }
    : { url: props.loginUrl, text: "Log In" };
  return (
    <ul className="navbar-nav mr-sm-2">
      <li className="nav-item">
        <Link className="nav-link" to={params.url}>
          {params.text}
        </Link>
      </li>
    </ul>
  );
}
