import React, { Component } from "react";
import Board from "../Board";
import "./style.css";
export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [
        { squares: Array(9).fill(null), currentSquare: null, winner: null },
      ],
      xIsNext: true,
      boardLength: 3,
      stepNumber: 0,
      isAscending: true,
    };
  }
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
        return lines[i];
      }
    }
    if (!squares.includes(null)) {
      return 1;
    }
    return null;
  };
  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          currentSquare: i,
          x: i % 3,
          y: Math.floor(i / 3),
          player: this.state.xIsNext ? "X" : "O",
          winner: this.calculateWinner(squares),
        },
      ]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  };
  jumpTo = (step) => {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  };
  reStart = () => {
    this.setState({
      history: [{ squares: Array(9).fill(null), currentSquare: null }],
      stepNumber: 0,
      xIsNext: true,
    });
  };
  sortMove = () => {
    this.setState({
      isAscending: !this.state.isAscending,
    });
  };
  renderLocation = (player) => {
    let history = [...this.state.history];
    let his = this.state.isAscending ? history : history.splice(0).reverse();
    let color = player === "X" ? "red" : "blue";
    let step = this.state.stepNumber;
    if(!this.state.isAscending){
      step = his.length - step -1;
    }
    return his.map((e, i) => {
      if (e.player === player) {
        return (
          <button key={i} onClick={() => this.state.isAscending?this.jumpTo(i):this.jumpTo(his.length-i-1)} className={step===i?"current":""}>
            {this.state.isAscending ? i : his.length - i -1}.{"  "}Move to{" "}
            <span style={{ color }}>
              [{e.x},{e.y}]
            </span>
          </button>
        );
      }
      return null;
    });
  };
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);
    return (
      <div className="game">
        <div className="game-board">
          <Board
            boardLength={3}
            xIsNext={this.state.xIsNext}
            squares={current.squares}
            onClick={this.handleClick}
            winner={winner}
            currentSquare={current.currentSquare}
            restart={this.reStart}
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
                  <button onClick={() => this.reStart()}>Restart</button>
                </span>
                <span>
                  <button onClick={() => this.sortMove()}>
                    Sort move:{" "}
                    {this.state.isAscending ? "Ascending" : "Decending"}
                  </button>
                </span>
              </div>
              <div className="info">
                {this.state.isAscending ? (
                  <>
                    <div className="info-x">
                      <div className="status">X</div>
                      <div className="move">{this.renderLocation("X")}</div>
                    </div>
                    <div className="info-o">
                      <div className="status">O</div>
                      <div className="move">{this.renderLocation("O")}</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="info-o">
                      <div className="status">O</div>
                      <div className="move">{this.renderLocation("O")}</div>
                    </div>
                    <div className="info-x">
                      <div className="status">X</div>
                      <div className="move">{this.renderLocation("X")}</div>
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
}
