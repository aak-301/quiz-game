import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Options from "./Options";
import Question from "./Question";
import "./gamescreen.css";
import WinnerScreen from "../Winner/WinnerScreen";

function GameScreen(props) {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setloading] = useState("");
  const [secondPlayerChoosenOption, setSecondPlayerChoosenOption] =
    useState("");
  const [firstPlayerChoosenOption, setFirstPlayerChoosenOption] = useState("");
  const [firstPlayerOpionsRecord, setFirstPlayerOpionsRecord] = useState([]);
  const [secondPlayerOpionsRecord, setsecondPlayerOpionsRecord] = useState([]);

  const getOptions = (correctAns, incorrectAns) => {
    let otpionArray = [];
    let j = 0;
    const len = incorrectAns.length;
    let correctIndex = Math.floor(Math.random() * (len + 1));
    for (let i = 0; i <= len; i++) {
      if (i == correctIndex) {
        otpionArray.push(correctAns);
      } else {
        otpionArray.push(incorrectAns[j++]);
      }
    }

    return otpionArray;
  };

  const getResponse = async (num) => {
    setloading(true);
    try {
      let response = await axios.get(
        `https://opentdb.com/api.php?amount=${num}`
      );
      let result = [];
      console.log(response.data.results);
      response.data.results.map((res) => {
        let questionMap = {};
        questionMap["question"] = res["question"];
        questionMap["correct_answer"] = res["correct_answer"];
        questionMap["incorrect_answers"] = res["incorrect_answers"];
        questionMap["difficulty"] = res["difficulty"];
        questionMap["options"] = getOptions(
          res["correct_answer"],
          res["incorrect_answers"]
        );
        result = [...result, questionMap];
      });
      result = [...questions, ...result];
      setQuestions(result);
      setloading(false);
    } catch (e) {
      console.log(e);
      setError("Something went Wrong");
      setloading(false);
    }
  };
  useEffect(() => {
    getResponse(5);
  }, []);

  const getNextPosts = () => {
    getResponse(1);
  };

  const selectedOptions = async (choosenOption, index) => {
    if (props.activePlayer === 1) {
      props.setActivePlayer(2);
      setFirstPlayerChoosenOption(choosenOption);
      setFirstPlayerOpionsRecord([...firstPlayerOpionsRecord, choosenOption]);
      return;
    }
    if (props.activePlayer === 2) {
      setSecondPlayerChoosenOption(choosenOption);
      setsecondPlayerOpionsRecord([...secondPlayerOpionsRecord, choosenOption]);
    }

    if (questions[index]["correct_answer"] === firstPlayerChoosenOption) {
      props.setFirstPlayerScore(props.firstPlayerScore + 5);
    } else {
      props.setFirstPlayerScore(props.firstPlayerScore - 2);
    }
    if (questions[index]["correct_answer"] === choosenOption) {
      props.setSecondPlayerScore(props.secondPlayerScore + 5);
    } else {
      props.setSecondPlayerScore(props.secondPlayerScore - 2);
    }
    if (props.currentQuestions >= 4) {
      if (props.firstPlayerScore === props.secondPlayerScore) {
        getNextPosts();
      } else {
        if (props.firstPlayerScore > props.secondPlayerScore) {
          props.setWinnerPlayer(props.players[0]);
        } else {
          props.setWinnerPlayer(props.players[1]);
        }
        return;
      }
    }
    setTimeout(function () {
      props.setActivePlayer(1);
      props.setCurrentQuestions(props.currentQuestions + 1);
    }, 1000);
  };

  return (
    <div className="main-app">
      {props.winnerPlayer.length > 0 && (
        <WinnerScreen
        players={props.players}
          player={props.winnerPlayer}
          questions={questions}
          firstPlayerOpionsRecord={firstPlayerOpionsRecord}
          secondPlayerOpionsRecord={secondPlayerOpionsRecord}
        />
      )}
      {props.winnerPlayer.length === 0 && loading && (
        <p className="loading">Loading...</p>
      )}
      {error && <p>Something went wrong</p>}
      {!loading && props.winnerPlayer.length === 0 && (
        <div className="player-details">
          <div
            className={`player mid  ${
              props.activePlayer === 1 ? "acive-player" : "inactive"
            }`}
          >
            <div className="player1">
              {props.players[0]}
              <br></br> Score: {props.firstPlayerScore}
            </div>
          </div>
          <div
            className={`player  ${
              props.activePlayer === 2 ? "acive-player" : "inactive"
            }`}
          >
            <div className="player2">
              {props.players[1]}
              <br></br> Score:{props.secondPlayerScore}
            </div>
          </div>
        </div>
      )}
      {!loading &&
        props.winnerPlayer.length === 0 &&
        questions &&
        questions[props.currentQuestions] && (
          <div className="question-area">
            <Question
              question={questions[props.currentQuestions]["question"]}
            />
            <Options
              options={questions[props.currentQuestions]["options"]}
              index={props.currentQuestions}
              selectedOptions={selectedOptions}
            />
          </div>
        )}
    </div>
  );
}

export default GameScreen;
