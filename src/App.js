import { useState } from "react";
import "./App.css";
import GameScreen from "./components/Game/GameScreen";
import UserName from "./components/Home/UserName";

function App() {
  const [activePlayer, setActivePlayer] = useState(1);
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState([]);
  const [firstPlayerScore, setFirstPlayerScore] = useState(0);
  const [secondPlayerScore, setSecondPlayerScore] = useState(0);
  const [currentQuestions, setCurrentQuestions] = useState(0);
  const [winnerPlayer, setWinnerPlayer] = useState("");

  const submitPlayerName = () => {
    if (playerName.length > 0) {
      const player = [...players, playerName];
      setPlayers(player);
    }
  };
  console.log("winner player", winnerPlayer, winnerPlayer.length);

  return (
    <div className="App">
      {players.length < 2 && (
        <UserName
          player={activePlayer}
          setActivePlayer={setActivePlayer}
          setPlayerName={setPlayerName}
          onSubmitPlayerName={submitPlayerName}
        />
      )}

      {players.length === 2 && (
        <GameScreen
          players={players}
          activePlayer={activePlayer}
          setActivePlayer={setActivePlayer}
          firstPlayerScore={firstPlayerScore}
          setFirstPlayerScore={setFirstPlayerScore}
          secondPlayerScore={secondPlayerScore}
          setSecondPlayerScore={setSecondPlayerScore}
          currentQuestions={currentQuestions}
          setCurrentQuestions={setCurrentQuestions}
          setWinnerPlayer={setWinnerPlayer}
          winnerPlayer={winnerPlayer}
        />
      )}
    </div>
  );
}

export default App;
