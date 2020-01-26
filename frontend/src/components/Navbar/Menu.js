import React, { Component } from "react";
import Link from "./Link";

export class Menu extends Component {
  render() {
    return (
      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto ml-lg-5 layout-nav-ul">
          <Link />
          <Link />
          <Link />
        </ul>
      </div>
    );
  }
}

export default Menu;
