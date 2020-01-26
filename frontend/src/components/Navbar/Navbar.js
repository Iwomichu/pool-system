import React, { Component } from "react";
import Menu from "./Menu";
import LogoutLink from "./LogoutLink";

export class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary p-0 pl-3 fixed-top">
        <a className="navbar-brand" href="#">
          Poll system
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Menu />
        <LogoutLink />
      </nav>
    );
  }
}

export default Navbar;
