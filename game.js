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
        // this.board = [
        //     {
        //         "id": 1,
        //         "pair":1,
        //         "flipped": false,
        //         "reveal": false,
        //         // "icon": "fas fa-music",
        //         "url":"",
        //     },
        //     {
        //         "id": 2,
        //         "pair":1,
        //         "flipped": false,
        //         "reveal": false,
        //         // "icon": "fas fa-music",
        //         "url":"",
        //     },
        //     {
        //         "id": 3,
        //         "pair":2,
        //         "flipped": false,
        //         "reveal": false,
        //         // "icon": "fas fa-home",
        //         "url":"",
        //     },
        //     {
        //         "id": 4,
        //         "pair":2,
        //         "flipped": false,
        //         "reveal": false,
        //         // "icon": "fas fa-home",
        //         "url":"",
        //     },
        //     {
        //         "id": 5,
        //         "pair":3,
        //         "flipped": false,
        //         "reveal": false,
        //         // "icon": "fas fa-drum",
        //         "url":"",
        //     },
        //     {
        //         "id": 6,
        //         "pair":3,
        //         "flipped": false,
        //         "reveal": false,
        //         // "icon": "fas fa-drum",
        //         "url":"",
        //     },
        //     {
        //         "id": 7,
        //         "pair":4,
        //         "flipped": false,
        //         "reveal": false,
        //         // "icon": "fas fa-trash",
        //         "url":"",
        //     },
        //     {
        //         "id": 8,
        //         "pair":4,
        //         "flipped": false,
        //         "reveal": false,
        //         // "icon": "fas fa-trash",
        //         "url":"",
        //     },
        // ];
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
        console.log("game over reach");
        if(this.score === this.board.length/2) {
            return true;
        }
        return false;
    }

    loadGameState(gameState){
        this.score = gameState.score;
        // this.won = gameState.won;
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