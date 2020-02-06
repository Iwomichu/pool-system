import React, { Component } from "react";
import { usePollCreation } from "../../context/pollCreation";

export function InformationForm(props) {
  const { setTitle, setDescription, setQuestion } = usePollCreation();
  return (
    <form>
      <h3>Poll</h3>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          className="form-control"
          type="text"
          id="title"
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description (optional)</label>
        <input
          className="form-control"
          type="text"
          id="description"
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="question">Question</label>
        <input
          className="form-control"
          type="text"
          id="question"
          onChange={e => setQuestion(e.target.value)}
        />
      </div>
    </form>
  );
}
