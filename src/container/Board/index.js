import React from "react";
import Square from "../Square";
import "./style.css";
export default function Board({
  winner,
  squares,
  onClick,
  xIsNext,
  restart,
  currentSquare,
  boardLength,
}) {
  const checkWinner = winner;
  const color = xIsNext ? "red" : "blue";
  const opacity = checkWinner ? 0.6 : 1;
  const renderSquare = (i, key, current) => {
    return (
      <Square
        key={key}
        value={squares[i]}
        onClick={() => {
          handleClick(i);
        }}
        current={i === current}
        isWin={winner && winner !== 1 && winner.includes(i)}
      />
    );
  };
  const handleClick = (i) => {
    return onClick(i);
  };

  const winnerColor = () => {
    return xIsNext ? "blue" : "red";
  };
  const resetBoard = () => {
    return restart();
  };
  const renderBoard = (opacity) => {
    let arr = Array(boardLength).fill(null);
    return arr.map((_, i) => {
      return (
        <div className="row" key={i} style={{ opacity }}>
          {arr.map((_, j) =>
            renderSquare(i * boardLength + j, j, currentSquare)
          )}
        </div>
      );
    });
  };
  return (
    <div className="board-main">
      {checkWinner === null ? (
        <div className="status">
          Next Player : <span style={{ color }}>{xIsNext ? "X" : "O"}</span>
        </div>
      ) : checkWinner === 1 ? (
        <div className="status">Draw</div>
      ) : (
        <div className="status">
          Winner :{" "}
          <span style={{ color: winnerColor() }}>{!xIsNext ? "X" : "O"}</span>
        </div>
      )}
      <div className="board">
        {renderBoard(opacity)}
        <div className="control">
          {checkWinner && (
            <button
              onClick={() => {
                resetBoard();
              }}
            >
              restart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
