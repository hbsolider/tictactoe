import React, { Component } from "react";
import Square from "../Square";
import "./style.css";
export default class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      board: Array(3).fill(0),
    };
  }
  renderSquare = (i) => {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => {
          this.handleClick(i);
        }}
      />
    );
  };
  handleClick = (i) => {
    console.log(this.calculateWinner(this.state.squares));
    const squares = this.state.squares.slice();
    if (squares[i] || this.calculateWinner(this.state.squares)) return;
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares,
      xIsNext: !this.state.xIsNext,
    });
  };
  calculateWinner = (squares) => {
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
        return squares[a];
      }
    }
    if (!squares.includes(null)) {
      return 1;
    }
    return null;
  };
  winnerColor = () => {
    return this.state.xIsNext ? "blue" : "red";
  };
  resetBoard = () => {
    this.setState({
      squares: Array(9).fill(null),
    });
  };
  render() {
    const checkWinner = this.calculateWinner(this.state.squares);
    const color = this.state.xIsNext ? "red" : "blue";
    const opacity = checkWinner ? 0.6 : 1;
    return (
      <div className="board-main">
        {checkWinner === null ? (
          <div className="status">
            Next Player :{" "}
            <span style={{ color }}>{this.state.xIsNext ? "X" : "O"}</span>
          </div>
        ) : checkWinner === 1 ? (
          <div className="status">Draw</div>
        ) : (
          <div className="status">
            Winner :{" "}
            <span style={{ color: this.winnerColor() }}>
              {!this.state.xIsNext ? "X" : "O"}
            </span>
          </div>
        )}
        <div className="board">
          {this.state.board.map((_, i) => (
            <div className="row" key={i} style={{ opacity }}>
              {this.renderSquare(i * 3)}
              {this.renderSquare(i * 3 + 1)}
              {this.renderSquare(i * 3 + 2)}
            </div>
          ))}
          <div className="control">
            {checkWinner ? (
              <button
                onClick={() => {
                  this.resetBoard();
                }}
              >
                restart
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}
