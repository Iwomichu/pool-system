import React, { Component } from "react";
import { Link, useRouteMatch, useLocation } from "react-router-dom";

export default function MenuLink(props) {
  const { path, url } = useRouteMatch();
  const location = useLocation();
  return (
    <li className="nav-item">
      <Link
        className={`nav-link ${
          location.pathname === `${url}${props.url}` ? "active" : ""
        }`}
        to={`${url}${props.url}`}
      >
        <span className="material-icons">{props.iconName}</span>{" "}
        <span className="align-top">{props.title}</span>
      </Link>
    </li>
  );
}
