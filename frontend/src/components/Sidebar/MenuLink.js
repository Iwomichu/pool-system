import React, { Component } from "react";
import { Link } from "react-router-dom";

export class MenuLink extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <li className="nav-item">
        <Link className="nav-link active" to={this.props.url}>
          <span className="material-icons">{this.props.iconName}</span>{" "}
          <span className="align-top">{this.props.title}</span>
        </Link>
      </li>
    );
  }
}

export default MenuLink;
