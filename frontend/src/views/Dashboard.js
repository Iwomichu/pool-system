import React, { Component } from "react";
import Sidebar from "./../components/Sidebar/Sidebar";
import Greeter from "./../components/Greeter";
import {
  Switch,
  Route,
  useRouteMatch,
  withRouter,
  useLocation
} from "react-router";
import Home from "./Home";
import Polls from "./Polls";
import Votes from "./Votes";
import Breadcrumb from "../components/Breadcrumb";

export default function Dashboard(props) {
  const { path, url } = useRouteMatch();
  const location = useLocation();
  return (
    <div className="row">
      <div className="col-2 bg-light sidebar">
        <Sidebar />
      </div>
      <div className="col-9 px-4 pt-3 ml-sm-auto">
        <Breadcrumb />
        <hr />
        <Switch>
          <Route exact path={`${path}`}>
            <Home />
          </Route>
          <Route path={`${path}/polls`}>
            <Polls />
          </Route>
          <Route path={`${path}/votes`}>
            <Votes />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
