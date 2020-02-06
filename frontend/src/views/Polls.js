import React, { Component, useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import Axios from "axios";
import { Switch, Route } from "react-router";
import { Link } from "react-router-dom";

import { PollsContext } from "./../context/polls";
import CreatePoll from "./CreatePoll";

export default function Polls(props) {
  const { authTokens } = useAuth();
  const [polls, setPolls] = useState([]);
  useEffect(() => {
    // Axios.get
    //
  });
  return (
    <PollsContext.Provider value={{ polls, setPolls }}>
      <Switch>
        <Route exact path="/dashboard/polls">
          <Link to="/dashboard/polls/create"> Create poll </Link>
        </Route>
        <Route path="/dashboard/polls/create">
          <CreatePoll />
        </Route>
      </Switch>
    </PollsContext.Provider>
  );
}
