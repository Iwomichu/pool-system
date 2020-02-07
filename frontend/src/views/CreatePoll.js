import React, { useState } from "react";
import PollOptionListElem from "../components/PollCreation/PollOptionListElem";
import { PollCreationContext } from "../context/pollCreation";
import { useAuth } from "../context/auth";
import { InformationForm } from "../components/PollCreation/InformationForm";
import PollOptionList from "../components/PollCreation/PollOptionList";
import Axios from "axios";
import { Redirect } from "react-router";

export default function CreatePoll(props) {
  const { authTokens } = useAuth();
  const [stage, setStage] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [question, setQuestion] = useState("");
  const [optionsNextId, setOptionsNextId] = useState(0);
  const [isError, setError] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  const [options, setOptions] = useState([]);

  function nextStage() {
    if (stage < 1) setStage(stage + 1);
    else createPoll();
  }
  function previousStage() {
    if (stage > 0) setStage(stage - 1);
  }
  function createPoll() {
    console.log({ title, description, question, options });
    Axios.post(
      "http://localhost:8000/api/poll/",
      {
        title: title,
        description: description,
        question: question,
        poll_options: "[" + options.map(option => option.text).join(",") + "]"
      },
      {
        headers: {
          Authorization: `Token ${authTokens.auth_token}`
        }
      }
    )
      .then(result => setIsCreated(true))
      .catch(err => setError(true));
  }

  function deleteOption(index) {
    let elems = [...options];
    elems.splice(
      elems.findIndex(elem => elem.id === index),
      1
    );
    setOptions(elems);
  }

  if (isCreated) return <Redirect to="/dashboard/polls" />;
  let elem = <i>Something went wrong!</i>;
  switch (stage) {
    case 0:
      elem = <InformationForm />;
      break;
    case 1:
      elem = <PollOptionList />;
      break;
  }
  return (
    <PollCreationContext.Provider
      value={{
        stage,
        setStage,
        title,
        setTitle,
        description,
        setDescription,
        question,
        setQuestion,
        options,
        setOptions,
        optionsNextId,
        setOptionsNextId,
        deleteOption
      }}
    >
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="btn-group w-100" role="group">
            <button
              type="button"
              id="previousStage"
              className="btn btn-primary"
              disabled={stage === 0}
              onClick={e => previousStage()}
            >
              {" "}
              Go Back{" "}
            </button>
            <button
              type="button"
              id="nextStage"
              className="btn btn-primary"
              onClick={e => nextStage()}
            >
              {stage === 1 ? "Create" : "Continue"}
            </button>
          </div>
          <hr />
          {elem}
        </div>
      </div>
    </PollCreationContext.Provider>
  );
}
