import React, { Component, useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { VotesContext } from "../context/votes";
import Axios from "axios";
import { Switch, Route, useRouteMatch } from "react-router";
import CastVote from "./CastVote";

export default function Votes(props) {
  const { path } = useRouteMatch();
  const { authTokens } = useAuth();
  const [votes, setVotes] = useState([]);
  useEffect(() => {
    const fetchVotes = async () => {
      // const result = Axios.get;
      setVotes([]);
    };

    fetchVotes();
  }, []);
  return (
    <VotesContext.Provider value={{ votes }}>
      <Switch>
        <Route exact path={`${path}/`}>
          Lista
        </Route>
        <Route path={`${path}/cast`}>
          <CastVote />
        </Route>
      </Switch>
    </VotesContext.Provider>
  );
}
