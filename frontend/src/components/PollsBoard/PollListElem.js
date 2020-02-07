import React, { useEffect, useState } from "react";
import { useVoteCasting } from "../../context/voteCasting";
import { Link } from "react-router-dom";

export default function PollListElem(props) {
  const { setCurrentPoll } = useVoteCasting();

  function castVote() {
    setCurrentPoll(props.poll);
  }

  const [summary, setSummary] = useState(<i>No votes casted yet</i>);
  useEffect(() => {
    if (props.poll.poll_options) {
      const totalVotes = props.poll.poll_options.map(po => po.votes).flat();
      if (totalVotes.length > 0) {
        const winningOption = props.poll.poll_options
          .map(pollOption => {
            return {
              text: pollOption.text,
              len: pollOption.votes.length
            };
          })
          .sort((o1, o2) => o1.len - o2.len)
          .pop();
        setSummary(
          <i>
            {winningOption.text} is leading ({winningOption.len}/
            {totalVotes.length})
          </i>
        );
      }
    }
  }, []);
  return (
    <li className="list-group-item">
      <div className="row align-elements-center">
        <div className="col-md-3">{props.poll.title}</div>
        <div className="col-md-3">{props.poll.question}</div>
        <div className="col-md-4 ">{summary}</div>
        <div className="col-md-2">
          <Link
            to="/dashboard/votes/cast"
            className="btn btn-primary btn-block"
            onClick={e => castVote()}
          >
            Cast a vote!
          </Link>
        </div>
      </div>
    </li>
  );
}
