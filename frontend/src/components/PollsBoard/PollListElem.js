import React from "react";

export default function PollListElem(props) {
  let summary = <i>No votes casted yet</i>;
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
        .sort((o1, o2) => o1.len - o2.len)[0];
      console.log({ winningOption, totalVotes });
      summary = (
        <i>
          {winningOption.text} is leading ({winningOption.len}/
          {totalVotes.length})
        </i>
      );
    }
  }
  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-md-3">{props.poll.title}</div>
        <div className="col-md-3">{props.poll.question}</div>
        <div className="col-md-4 ">{summary}</div>
        <div className="col-md-2">
          <button className="btn btn-primary btn-block">Cast a vote!</button>
        </div>
      </div>
    </li>
  );
}
