import React from "react";
import { usePollCreation } from "../../context/pollCreation";
import { useState } from "react";

export default function PollOptionForm(props) {
  const {
    options,
    setOptions,
    optionsNextId,
    setOptionsNextId
  } = usePollCreation();

  const [text, setText] = useState("");

  function addOption() {
    const newOptions = [...options, { id: optionsNextId, text: text }];
    setOptions(newOptions);
    setOptionsNextId(optionsNextId + 1);
  }

  return (
    <li className="list-group-item">
      <form className="form-inline">
        <div className="form-group">
          <input
            type="text"
            id="optionText"
            className="form-control"
            onChange={e => setText(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn btn-success"
          onClick={e => addOption()}
        >
          Add
        </button>
      </form>
    </li>
  );
}
