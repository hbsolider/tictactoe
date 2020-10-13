import React, { Component } from "react";
import Square from "../Square";
import "./style.css";
export default class Board extends Component {
  renderSquare = (i,key,current) => {
    const winner = this.props.winner;
    return (
      <Square
      key ={key}
        value={this.props.squares[i]}
        onClick={() => {
          this.handleClick(i);
        }}
        current={i===current}
        isWin={winner&&winner!==1&&winner.includes(i)}
      />
    );
  };
  handleClick = (i) => {
    return this.props.onClick(i)
  };
  
  winnerColor = () => {
    return this.props.xIsNext ? "blue" : "red";
  };
  resetBoard = () => {
    return this.props.restart()
  };
  renderBoard = (opacity) => {
    const currentSquare = this.props.currentSquare;
    let arr = Array(this.props.boardLength).fill(null);
    return arr.map((_, i) => {
      return (
        <div className="row" key={i} style={{ opacity }}>
          {arr.map((_, j) => this.renderSquare(i * 3 + j,j,currentSquare))}
        </div>
      );
    });
  };
  render() {
    const checkWinner = this.props.winner;
    const color = this.props.xIsNext ? "red" : "blue";
    const opacity = checkWinner ? 0.6 : 1;
    const xIsNext = this.props.xIsNext;
    return (
      <div className="board-main">
        {checkWinner === null ? (
          <div className="status">
            Next Player :{" "}
            <span style={{ color }}>{xIsNext ? "X" : "O"}</span>
          </div>
        ) : checkWinner === 1 ? (
          <div className="status">Draw</div>
        ) : (
          <div className="status">
            Winner :{" "}
            <span style={{ color: this.winnerColor() }}>
              {!xIsNext ? "X" : "O"}
            </span>
          </div>
        )}
        <div className="board">
          {this.renderBoard(opacity)}
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
