import React from "react";
import { useVoteForm } from "../../context/voteForm";

export default function VoteCastingOption(props) {
  const { selectedOptions } = useVoteForm();
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        id={props.option.id}
        checked={props.checked}
        onChange={e => props.onChange(props.option.id)}
      />
      <label
        htmlFor={props.option.id}
        className={`${props.checked ? "font-weight-bold" : ""}`}
      >
        {props.option.text}
      </label>
    </div>
  );
}
