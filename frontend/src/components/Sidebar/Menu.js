import React, { Component } from "react";
import MenuLink from "./MenuLink";
import { withRouter } from "react-router";

export class Menu extends Component {
  render() {
    const { path, url } = this.props.match;
    return (
      <ul className="nav flex-column mt-3 sidebar-menu">
        <MenuLink url={``} iconName="home" title="Home" />
        <MenuLink url={`/polls`} iconName="poll" title="Polls" />
        <MenuLink url={`/votes`} iconName="how_to_vote" title="Votes" />
      </ul>
    );
  }
}

export default withRouter(Menu);
