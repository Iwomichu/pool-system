import React from "react";

export default function PollListElem(props) {
  const winningOption = props.poll.poll_options
    .map(pollOption => {
      return {
        text: pollOption.text,
        len: pollOption.votes.length
      };
    })
    .sort((o1, o2) => o1.len - o2.len)[0];
  const totalVotes = props.poll.poll_options
    .map(po => po.votes.length)
    .reduce((l1, l2) => l1 + l2);
  console.log({ winningOption, totalVotes });
  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-md-3">{props.poll.title}</div>
        <div className="col-md-3">{props.poll.question}</div>
        <div className="col-md-5 ">
          {winningOption.text} is leading ({winningOption.len}/{totalVotes})
        </div>
      </div>
    </li>
  );
}
