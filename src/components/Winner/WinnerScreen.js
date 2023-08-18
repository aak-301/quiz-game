import React from "react";
import "./winnerscreen.css";
import PdfScree from "./PdfScree";

function WinnerScreen(props) {
  return (
    <div className="winner-main">
      <div className="winner">Hurray {props.player} Won🎉 🥳</div>
      <div className="btn-wrapper">
        <div className="pdf">
          <div className="player-res">{props.players[0]} Results:</div>
          <PdfScree
            players={props.winnerPlayer}
            questions={props.questions}
            record={props.firstPlayerOpionsRecord}
          />
          <br></br>
          <div className="player-res">{props.players[1]} Results:</div>
          <PdfScree
            players={props.winnerPlayer}
            questions={props.questions}
            record={props.secondPlayerOpionsRecord}
          />
        </div>
      </div>
    </div>
  );
}

export default WinnerScreen;
