import React from "react";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";
import Axios from "axios";

export default function LogOutButton(props) {
  const { authTokens, setAuthTokens } = useAuth();
  function logOut() {
    setAuthTokens();
    Axios.post(
      "http://localhost:8000/auth/token/logout/",
      {},
      { headers: { Authorization: `Token ${authTokens.auth_token}` } }
    );
  }
  return (
    <Link className="nav-link" onClick={logOut} to={props.url}>
      Log Out
    </Link>
  );
}
