import React from "react";
import "./App.css";
import Game from "./container/Game";
function App() {
  return (
    <div className="Game">
      <div className="title">Tic Tac Toe</div>
      <div>
        <Game />
      </div>
    </div>
  );
}

export default App;
