import React, {useState } from "react";
import Board from "../Board";
import "./style.css";
export default function Game() {
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null),
    currentSquare: null,
    winner: null,
  }]);
  const [xIsNext, setxIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const current = history[stepNumber];

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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return lines[i];
      }
    }
    if (!squares.includes(null)) {
      return 1;
    }
    return null;
  };
  const winner = calculateWinner(current.squares);
  const handleClick = (i) => {
    const histor = history.slice(0, stepNumber + 1);
    const current = histor[histor.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory(
      history.concat({
        squares: squares,
        currentSquare: i,
        x: i % 3,
        y: Math.floor(i / 3),
        player: xIsNext ? "X" : "O",
        winner: calculateWinner(squares),
      })
    );
    setxIsNext(!xIsNext);
    setStepNumber(history.length);
  };
  const jumpTo = (step) => {
    setStepNumber(step);
    setxIsNext(step % 2 === 0);
  };
  const reStart = () => {
    setHistory([{ squares: Array(9).fill(null), currentSquare: null }]);
    setStepNumber(0);
    setxIsNext(true);
  };
  const sortMove = () => {
    setIsAscending(!isAscending);
  };
  const renderLocation = (player) => {
    let histor = [...history];
    let his = isAscending ? histor : histor.splice(0).reverse();
    let color = player === "X" ? "red" : "blue";
    let step = stepNumber;
    if (!isAscending) {
      step = his.length - step - 1;
    }
    return his.map((e, i) => {
      if (e.player === player) {
        return (
          <button
            key={i}
            onClick={() =>
              isAscending ? jumpTo(i) : jumpTo(his.length - i - 1)
            }
            className={step === i ? "current" : ""}
          >
            {isAscending ? i : his.length - i - 1}.{"  "}Move to{" "}
            <span style={{ color }}>
              [{e.x},{e.y}]
            </span>
          </button>
        );
      }
      return null;
    });
  };
  return (
    <div className="game">
      <div className="game-board">
        <Board
          boardLength={3}
          xIsNext={xIsNext}
          squares={current.squares}
          onClick={handleClick}
          winner={winner}
          currentSquare={current.currentSquare}
          restart={reStart}
        />
      </div>
      <div className="game-info">
        {history.length === 1 ? (
          <div className="title-1">Welcome</div>
        ) : (
          <>
            <div className="status">
              History
              <span>
                <button onClick={() => reStart()}>Restart</button>
              </span>
              <span>
                <button onClick={() => sortMove()}>
                  Sort move: {isAscending ? "Ascending" : "Decending"}
                </button>
              </span>
            </div>
            <div className="info">
              {isAscending ? (
                <>
                  <div className="info-x">
                    <div className="status">X</div>
                    <div className="move">{renderLocation("X")}</div>
                  </div>
                  <div className="info-o">
                    <div className="status">O</div>
                    <div className="move">{renderLocation("O")}</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="info-o">
                    <div className="status">O</div>
                    <div className="move">{renderLocation("O")}</div>
                  </div>
                  <div className="info-x">
                    <div className="status">X</div>
                    <div className="move">{renderLocation("X")}</div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
