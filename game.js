export default class Game {
    constructor() {
        this.score = 0;
        this.won = false;
        this.over = false;
        let counter = 1;
        this.board = [];
        for(let i=0; i<12; i++){
            let newTile = {
                "id":i+1,
                "pair": counter,
                "flipped": false,
                "reveal": false,
                "url":"",
            }
            if(i%2!=0) {
                counter+=1;
            }
            this.board.push(newTile);
        }
        this.size = this.board.length;
        this.setupNewGame();
    }


    setupNewGame() {
        //shuffle board array
        for(let i = 0; i<this.board.length-1;i++) {
            this.board[i].flipped = false;
            this.board[i].reveal = false;
        }
        for(let i =this.board.length-1; i>0; i--) {
            let j = Math.floor(Math.random()*(i+1));
            let temp = this.board[i];
            this.board[i] = this.board[j];
            this.board[j] = temp;
        }
    }

    gameOver() {
        if(this.score === this.board.length/2) {
            return true;
        }
        return false;
    }

    loadGameState(gameState){
        this.score = gameState.score;
        this.over = gameState.over;
        for(let i = 0; i<this.board.length; i++) {
            this.board[i] = gameState.board[i];
        }
    }

    matchQuestion(currIndex, otherIndex) {
        if(this.board[currIndex].pair === this.board[otherIndex].pair){
            return true;
        }
        return false;
    }
}