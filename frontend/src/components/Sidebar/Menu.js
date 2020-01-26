import React, { Component } from "react";
import MenuLink from "./MenuLink";

export class Menu extends Component {
  render() {
    return (
      <ul className="nav flex-column mt-3">
        <MenuLink />
        <MenuLink />
        <MenuLink />
      </ul>
    );
  }
}

export default Menu;
