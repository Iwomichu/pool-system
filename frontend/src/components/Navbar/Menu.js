import React, { Component } from "react";
import TopmenuLink from "./TopmenuLink";

export class Menu extends Component {
  render() {
    return (
      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto ml-lg-5 layout-nav-ul">
          <TopmenuLink url="/dashboard" title="Pulpit" />
          <TopmenuLink url="/contact" title="Kontakt" />
          <TopmenuLink url="/about" title="O nas" />
        </ul>
      </div>
    );
  }
}

export default Menu;
