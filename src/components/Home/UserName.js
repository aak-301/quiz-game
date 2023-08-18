import React from "react";
import "./username.css";

function UserName(props) {
  const inputPlayerName = (event) => {
    props.setPlayerName(event.target.value);
  };

  const submitForm = (e) => {
    e.preventDefault();
    props.onSubmitPlayerName();
    props.setPlayerName("");
    if (props.player == 1) props.setActivePlayer(2);
    else props.setActivePlayer(1);
  };

  return (
    <div className="main">
      <div className="quiz">Quiz Game</div>
      <div className="description">
        <p>
          Multi Player Quiz Game.Play with your friend and have fun
          <br></br>One wuestion wil be asked.And each player gets a chance to
          answer it.
          <br></br>
          <br></br>For correct anwer - (+5 points)
          <br></br>For wrong anwer - (-2 points)
        </p>
      </div>
      <div className="bottom">
        <form onSubmit={submitForm} className="form">
          <div className="label">Enter Player{props.player} Name:</div>
          <input
            className="input"
            type="text"
            name="name"
            onChange={inputPlayerName}
          />
          <br></br>
          <button type="submit" className="btn">
            ENTER
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserName;
