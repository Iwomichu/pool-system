import React, { Component } from "react";
import { Link } from "react-router-dom";

export class LogoutLink extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ul className="navbar-nav mr-sm-2">
        <li className="nav-item">
          <Link className="nav-link" to={this.props.logoutUrl}>
            Log out
          </Link>
        </li>
      </ul>
    );
  }
}

export default LogoutLink;
