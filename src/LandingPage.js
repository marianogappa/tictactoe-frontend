import React, { useState } from 'react';

function LandingPage({ onStart }) {
    return (
        <div className="landing-page">
            <div className="landing-content">
                <h1>Tic Tac Toe</h1>
                <p>Ready to play?</p>
                <button className="start-button" onClick={onStart}>
                    Start Game
                </button>
            </div>
        </div>
    );
}

export default LandingPage; 
