import React, { useState } from "react";
import { useVoteCasting } from "../context/voteCasting";
import VoteCastingOption from "../components/VoteCasting/VoteCastingOption";
import { VoteFormContext } from "../context/voteForm";
import SingleVoteForm from "../components/VoteCasting/SingleVoteForm";
import Axios from "axios";
import { useAuth } from "../context/auth";
import { Redirect } from "react-router";

export default function CastVote(props) {
  const { authTokens } = useAuth();
  const { currentPoll } = useVoteCasting();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [voteCasted, setVoteCasted] = useState(false);

  function castVote() {
    Promise.all(
      selectedOptions.map(selectedOption => {
        //TODO: zmienic userid
        return Axios.put(
          "/api/poll/vote/",
          { poll_option: selectedOption, user: 1 },
          {
            headers: {
              Authorization: "Token " + authTokens.auth_token
            }
          }
        );
      })
    ).then(result => {
      setVoteCasted(true);
    });
  }
  if (voteCasted) return <Redirect to="/dashboard/polls" />;
  return (
    <VoteFormContext.Provider value={{ selectedOptions, setSelectedOptions }}>
      <SingleVoteForm />
      <hr />
      <button className="btn btn-primary" onClick={e => castVote(e)}>
        Cast
      </button>
    </VoteFormContext.Provider>
  );
}
