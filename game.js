// const cardOptions = [1,2,3,4,1,2,3,4];
export default class Game {
    constructor() {
        this.score = 0;
        this.won = false;
        this.over = false;
        this.board = [
            {
                "id": 1,
                "pair":1,
                "flipped": false,
                "reveal": false,
                "icon": "fas fa-music",
            },
            {
                "id": 2,
                "pair":1,
                "flipped": false,
                "reveal": false,
                "icon": "fas fa-music",
            },
            {
                "id": 3,
                "pair":2,
                "flipped": false,
                "reveal": false,
                "icon": "fas fa-home",
            },
            {
                "id": 4,
                "pair":2,
                "flipped": false,
                "reveal": false,
                "icon": "fas fa-home",
            },
            {
                "id": 5,
                "pair":3,
                "flipped": false,
                "reveal": false,
                "icon": "fas fa-drum",
            },
            {
                "id": 6,
                "pair":3,
                "flipped": false,
                "reveal": false,
                "icon": "fas fa-drum",
            },
            {
                "id": 7,
                "pair":4,
                "flipped": false,
                "reveal": false,
                "icon": "fas fa-trash",
            },
            {
                "id": 8,
                "pair":4,
                "flipped": false,
                "reveal": false,
                "icon": "fas fa-trash",
            },
        ];
        this.size = this.board.length;
        this.setupNewGame();

    }

    setupNewGame() {
        //this.board = new Array(this.size);
        //inject numbers into board array
        // this.board = [1,2,3,4,1,2,3,4];
        
        //shuffle board array
        for(let i =this.board.length-1; i>0; i--) {
            let j = Math.floor(Math.random()*(i+1));
            let temp = this.board[i];
            this.board[i] = this.board[j];
            this.board[j] = temp;
        }
    }

    // flipCard(id) {
    //     document.getElementById('#'+id).innerHTML = 'whoa';
    // }

    gameOver() {
        console.log("game over reach");
        // for(let i =0; i<this.board.length; i++){
        //     if(!this.board[i].flipped) {
        //         return false;
        //     }
        // }
        // return true;
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