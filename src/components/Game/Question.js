import React from "react";
import './question.css';

function Question(props) {
  return <div className="question">{props.question}</div>;
}

export default Question;
