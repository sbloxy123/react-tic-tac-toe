import React, { useState, useEffect } from "react";
import Board from "../Board";
import Leaderboard from "../Leaderboard";
import PlayersForm from "../../PlayersForm";

/**
 * A game of tic-tac-toe.
 */
const Game = () => {
  const [gameHistory, setGameHistory] = useState([
    { squares: Array(9).fill(null) },
  ]); // Start of game
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const [players, setPlayers] = useState([
    { player_1: { name: "X", score: 0 } },
    { player_2: { name: "O", score: 0 } },
  ]);

  useEffect(() => {
    console.log("players", players);
  }, [players]);

  const getPlayerNames = (namesObj) => {
    setPlayers(namesObj);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    // get winning player and add to their score:
    const getWinningName = (XorO) => {
      if (XorO === "X") {
        players[0].player_1.score = players[0].player_1.score + 1;
        return players[0].player_1.name;
      } else {
        players[1].player_2.score = players[1].player_2.score + 1;
        return players[1].player_2.name;
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        // return the winner & winning combo:
        return {
          winningPlayer: getWinningName(squares[a]),
          winningLine: [a, b, c],
        };
      }
    }

    return null;
  };

  const handleClick = (i) => {
    const history = gameHistory.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? "X" : "O";

    setGameHistory([...history, { squares }]);
    setStepNumber(history.length);
    setXisNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const current = gameHistory[stepNumber];
  // get winning combo & winner's name:
  const winner = calculateWinner(current.squares);
  let winningLine = [];
  if (winner) {
    winningLine = winner.winningLine;
  }

  const moves = gameHistory.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    // get winner name:
    status = "Winner: " + winner.winningPlayer;
  } else {
    status =
      "Next player: " +
      (xIsNext ? players[0].player_1.name : players[1].player_2.name);
  }

  return (
    <div>
      {/* pass getPlayerNames function trough props to the form */}
      <PlayersForm getPlayerNames={getPlayerNames} />

      <div className="game">
        <div className="game-board">
          {/* pass winning line combination to Board */}
          <Board
            squares={current.squares}
            onClick={(i) => handleClick(i)}
            winningLine={winningLine}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <div className="game-info">
          {/* pass props to leaderboard component */}
          <Leaderboard players={players} />
        </div>
      </div>
    </div>
  );
};

export default Game;
