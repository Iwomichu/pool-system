import React, { Component } from "react";

export class LogoutLink extends Component {
  render() {
    return (
      <ul className="navbar-nav mr-sm-2">
        <li className="nav-item">
          <a className="nav-link" href="#">
            Log out
          </a>
        </li>
      </ul>
    );
  }
}

export default LogoutLink;
