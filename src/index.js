import React, {createElement, useState} from "react";
import ReactDOM from "react-dom";
import './index.css';

const Square = (props) => {
  return (
    <button className="square" onClick={props.onClickEvent}>
      {props.value}
    </button>
  );
};

const Board = () => {
  const initialSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(initialSquares);
  const [turn, setTurn] = useState('Player1');

  const handleClickEvent = (i) => {
    const updatedSquares = [...squares];

    const winner = checkWin(squares);
    const squareFilled = updatedSquares[i];

    
    if (winner != null || squareFilled != null) {
      return;
    }

    updatedSquares[i] = turn === 'Player1' ? 'X' : 'O';
    
    setSquares(updatedSquares);

    const nextTurn = turn === 'Player1' ? 'Player2' : 'Player1';
    setTurn(nextTurn);
    
  };

  const renderSquare = (i) => {
    return (
      <Square value={squares[i]} onClickEvent={() => handleClickEvent(i)}/>
    );
  };

  const playerWin = checkWin(squares);
  const displayWinner = playerWin != null ? (playerWin === 'X'? 'Player1 Wins!' : 'Player2 Wins!') : null;
  const gameStatus = playerWin == null ? `Turn: ${turn}` : 'Game Over!';
  
  return (
    <div className="board">
      <div className={gameStatus === 'Game Over!'? "statusOver" : "status"}>{gameStatus}</div>
      <div className="board-row">
        {renderSquare(1)} {renderSquare(2)} {renderSquare(3)}
      </div>
      <div className="board-row">
      {renderSquare(4)} {renderSquare(5)} {renderSquare(6)}
      </div>
      <div className="board-row">
      {renderSquare(7)} {renderSquare(8)} {renderSquare(9)}
      </div>
      <div id="winDisplay">{displayWinner}</div>
    </div>
  );
};

const Game = () => {
  return (
    <div className="game">
      Tic-Tac-Toe
      <Board/>
    </div>
  );
};

ReactDOM.render(
  <Game/>,
  document.getElementById('root')
);

function checkWin(squares) {
  const winConditions = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7]
  ];

  for (let cond of winConditions) {
    const [a, b, c] = cond;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
  
}