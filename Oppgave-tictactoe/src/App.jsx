import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';

import { useState } from 'react';

function Square({ value, onSquareClick, isFilled }) {
  return (
    <button 
      className={`square ${isFilled ? 'filled' : ''}`} 
      onClick={isFilled ? null : onSquareClick} // Prevent interaction if filled
      disabled={isFilled} // Disable the button if filled
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} isFilled={!!squares[0]} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} isFilled={!!squares[1]} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} isFilled={!!squares[2]} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} isFilled={!!squares[3]} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} isFilled={!!squares[4]} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} isFilled={!!squares[5]} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} isFilled={!!squares[6]} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} isFilled={!!squares[7]} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} isFilled={!!squares[8]} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleReset() {
    setHistory([Array(9).fill(null)]); // Reset history to initial state
    setCurrentMove(0); // Reset current move to 0
  }

  return (
    <div className="game">
      <div className="game-container">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <button onClick={handleReset}>Restart Game</button> {/* Reset Button */}
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4 , 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}