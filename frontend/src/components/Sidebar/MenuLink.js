import React, { Component } from "react";

export class MenuLink extends Component {
  render() {
    return (
      <li className="nav-item">
        <a className="nav-link active" href="#">
          <span className="material-icons">home</span>{" "}
          <span className="align-top">Dashboard</span>
        </a>
      </li>
    );
  }
}

export default MenuLink;
