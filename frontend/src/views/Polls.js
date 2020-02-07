import React, { Component, useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import Axios from "axios";
import { Switch, Route } from "react-router";
import { Link } from "react-router-dom";

import { PollsContext } from "./../context/polls";
import CreatePoll from "./CreatePoll";
import PollsList from "../components/PollsBoard/PollsList";

export default function Polls(props) {
  const { authTokens } = useAuth();
  const [polls, setPolls] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get("/api/poll/", {
        headers: { Authorization: authTokens.auth_token }
      });
      if (result.status === 200) {
        setPolls(result.data);
        setIsDataLoaded(true);
      } else setIsError(true);
    };

    fetchData();
  }, []);
  return (
    <PollsContext.Provider value={{ polls, setPolls }}>
      <Switch>
        <Route exact path="/dashboard/polls">
          <Link className="btn btn-primary" to="/dashboard/polls/create">
            {" "}
            Create poll{" "}
          </Link>
          <hr />
          <PollsList />
        </Route>
        <Route path="/dashboard/polls/create">
          <CreatePoll />
        </Route>
      </Switch>
    </PollsContext.Provider>
  );
}
