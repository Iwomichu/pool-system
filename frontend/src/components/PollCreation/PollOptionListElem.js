import React, { Component } from "react";
import { usePollCreation } from "../../context/pollCreation";

export default function PollOptionListElem(props) {
  const { deleteOption } = usePollCreation();
  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-md-10">{props.option.text}</div>
        <div className="col-md-1">
          <button
            onClick={() => deleteOption(props.option.id)}
            className="btn btn-primary btn-sm"
          >
            X
          </button>
        </div>
      </div>
    </li>
  );
}
