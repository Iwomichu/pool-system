import React, { Component } from "react";

export class Link extends Component {
  render() {
    return (
      <li className="nav-item active mr-sm-5">
        <a className="nav-link" href="#">
          Home <span className="sr-only">(current)</span>
        </a>
      </li>
    );
  }
}

export default Link;
