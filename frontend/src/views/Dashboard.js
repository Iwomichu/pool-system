import React, { Component, useState } from "react";
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
import { VoteCastingContext } from "../context/voteCasting";

export default function Dashboard(props) {
  const { path, url } = useRouteMatch();
  const location = useLocation();
  const [currentPoll, setCurrentPoll] = useState({});
  return (
    <div className="row">
      <div className="col-2 bg-light sidebar">
        <Sidebar />
      </div>
      <div className="col-9 px-4 pt-3 ml-sm-auto">
        <Breadcrumb />
        <hr />
        <VoteCastingContext.Provider value={{ currentPoll, setCurrentPoll }}>
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
        </VoteCastingContext.Provider>
      </div>
    </div>
  );
}
