import React, { Component } from "react";
import Menu from "./Menu";

export class Sidebar extends Component {
  render() {
    return (
      <div className="text-left d-none d-md-block">
        <Menu />
      </div>
    );
  }
}

export default Sidebar;
