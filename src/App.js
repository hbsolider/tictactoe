import React from "react";
import "./App.css";
import Board from "./container/Board";
function App() {
  return (
    <div className="Game">
      <div className="title">Tic Tac Toe</div>
      <div>
        <Board />
      </div>
    </div>
  );
}

export default App;
