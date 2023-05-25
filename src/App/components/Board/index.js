import React from "react";
import PropTypes from "prop-types";

import Square from "../Square";

/**
 * A board for the game of tic-tac-toe.  A 3x3 square.
 */
const Board = ({ onClick, squares, winningLine }) => {
  const renderSquare = (i) => (
    <Square
      value={squares[i]}
      onClick={() => onClick(i)}
      // if square if one of the numbers in the winning combination, pass the CSS class to the Square component
      winningSquare={winningLine.includes(i) ? "winning-square" : null}
    />
  );

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

Board.propTypes = {
  /**
   *  The 1..9 array of squares to display
   */
  squares: PropTypes.array.isRequired,

  /**
   *  The handler for when a square is clicked
   */
  onClick: PropTypes.func,
};

export default Board;
