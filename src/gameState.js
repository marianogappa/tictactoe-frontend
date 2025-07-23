export class GameStateManager {
    constructor() {
        this.gameState = null;
        this.nextGameState = null;
    }

    start() {
        // Initialize a new tictactoe game using WASM
        this.gameState = jsTicTacToeNew({});
        return this.gameState;
    }

    runAction(action, callback) {
        if (this.gameState.currentPlayerID === this.gameState.youPlayerID) {
            if (!action) {
                return this.gameState;
            }
            this.gameState = jsRunAction(action);
            console.log('After player action - isGameEnded:', this.gameState.isGameEnded);
        } else {
            const changed = this.runBotAction();
            if (!changed) {
                return null;
            }
            console.log('After bot action - isGameEnded:', this.gameState.isGameEnded);
        }

        // If the game is not ended and it's the bot's turn, we run the bot action after a delay
        if (!this.gameState.isGameEnded && this.gameState.currentPlayerID === this.gameState.themPlayerID) {
            window.setTimeout(() => {
                if (this.gameState.currentPlayerID === this.gameState.youPlayerID) {
                    return;
                }
                const result = this.runAction({}, callback);
                if (result) {
                    callback(result);
                }
            }, 1000); // 1 second delay for bot moves
        }

        return this.gameState;
    }

    runBotAction() {
        const _before = JSON.stringify(this.gameState);
        this.gameState = jsBotRunAction();
        const _after = JSON.stringify(this.gameState);
        return _before !== _after;
    }
}

