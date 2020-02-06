import React from "react";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";

export default function LogInButton(props) {
  const { authTokens } = useAuth();
  return (
    <Link className="nav-link" to={props.url}>
      Log In
    </Link>
  );
}
