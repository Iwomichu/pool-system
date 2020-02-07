import React from "react";
import { usePolls } from "../../context/polls";
import PollListElem from "./PollListElem";

export default function PollsList(props) {
  const { polls, setPolls } = usePolls();

  return (
    <ul className="list-group">
      {polls.map(poll => (
        <PollListElem key={poll.id} poll={poll} />
      ))}
    </ul>
  );
}
