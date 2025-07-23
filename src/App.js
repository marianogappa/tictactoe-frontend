import { useState, useEffect } from 'react';
import { createRoot } from "react-dom/client";
import React, { StrictMode } from "react";
import { GameStateManager } from './gameState';
import TictactoeBoard from './TictactoeBoard';
import LandingPage from './LandingPage';

function Game({ manager }) {
  const [trigger, setTrigger] = useState(0);

  function handleAction(action) {
    setTrigger(manager.runAction(action, setTrigger))
  }

  function restartGame() {
    window.location.href = window.location.href;
  }

  const gameState = manager.gameState;

  const getGameOverMessage = () => {
    if (gameState.winnerPlayerID === gameState.youPlayerID) {
      return "You Win!";
    } else if (gameState.winnerPlayerID === gameState.themPlayerID) {
      return "Bot Wins!";
    } else {
      return "It's a Draw!";
    }
  };

  useEffect(() => {
    const modalOverlay = document.getElementById('gameOverModalOverlay');
    if (gameState.isGameEnded) {
      modalOverlay.classList.remove('hidden');
      modalOverlay.classList.add('show');
    } else {
      modalOverlay.classList.add('hidden');
      modalOverlay.classList.remove('show');
    }
  }, [gameState.isGameEnded]);

  return (
    <>
      <div className="simple-game-container">
        <div className="board-wrapper">
          <TictactoeBoard gameState={gameState} handleAction={handleAction} />
        </div>
      </div>

      <div id="gameOverModalOverlay" className="hidden">
        <div id="modal">
          <div id="gameOverText">
            <h2>{getGameOverMessage()}</h2>
          </div>
          <button onClick={restartGame}>Restart Game</button>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [manager, setManager] = useState(null);

  const handleStartGame = () => {
    const gameManager = new GameStateManager();
    gameManager.start();
    setManager(gameManager);
    setGameStarted(true);
  };

  if (!gameStarted) {
    return <LandingPage onStart={handleStartGame} />;
  }

  return (
    <div id="game">
      <Game manager={manager} />
    </div>
  );
}
