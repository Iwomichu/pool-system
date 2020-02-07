import React from "react";
import { useVoteCasting } from "../../context/voteCasting";
import VoteCastingOption from "./VoteCastingOption";
import { useVoteForm } from "../../context/voteForm";

export default function SingleVoteForm(props) {
  const { currentPoll } = useVoteCasting();
  const { selectedOptions, setSelectedOptions } = useVoteForm();

  function selectOption(id) {
    setSelectedOptions([id]);
  }

  return (
    <form>
      <h4>{currentPoll.title}</h4>
      <h5>{currentPoll.description}</h5>
      <hr />
      <h2>{currentPoll.question}</h2>
      <div className="mt-3">
        {currentPoll.poll_options.map(option => (
          <VoteCastingOption
            checked={option.id === selectedOptions[0]}
            key={option.id}
            option={option}
            onChange={selectOption}
          />
        ))}
      </div>
    </form>
  );
}
