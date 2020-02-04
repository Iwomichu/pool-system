import React, { Component } from "react";
import { Link } from "react-router-dom";

export class TopmenuLink extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <li className="nav-item active mr-sm-5">
        <Link className="nav-link" to={this.props.url}>
          {this.props.title} <span className="sr-only">(current)</span>
        </Link>
      </li>
    );
  }
}

export default TopmenuLink;
