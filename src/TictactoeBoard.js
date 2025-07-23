import React from 'react';

export default function TictactoeBoard({ gameState, handleAction }) {
    const { board, possibleActions, yourSymbol, theirSymbol } = gameState;

    const getSymbol = (cellValue) => {
        if (cellValue === yourSymbol) return 'X';
        if (cellValue === theirSymbol) return 'O';
        return '';
    };

    const canMove = (position) => {
        if (!possibleActions) return false;
        return possibleActions.some(action =>
            action.position === position && action.playerID === gameState.youPlayerID
        );
    };

    const handleCellClick = (position) => {
        if (!possibleActions) return;
        const moveAction = possibleActions.find(action =>
            action.position === position && action.playerID === gameState.youPlayerID
        );
        if (moveAction) {
            handleAction(moveAction);
        }
    };

    return (
        <div className="tictactoe-board">
            {board.map((cellValue, index) => (
                <div
                    key={index}
                    className={`tictactoe-cell ${canMove(index) ? 'clickable' : ''}`}
                    onClick={() => handleCellClick(index)}
                >
                    {getSymbol(cellValue)}
                </div>
            ))}
        </div>
    );
} 
