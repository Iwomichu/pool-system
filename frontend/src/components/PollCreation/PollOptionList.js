import React from "react";
import { usePollCreation } from "../../context/pollCreation";
import PollOptionListElem from "./PollOptionListElem";
import PollOptionForm from "./PollOptionForm";

export default function PollOptionList(props) {
  const { options } = usePollCreation();
  return (
    <ul className="list-group">
      {options.map(option => (
        <PollOptionListElem key={option.id} option={option} />
      ))}
      <PollOptionForm />
    </ul>
  );
}
