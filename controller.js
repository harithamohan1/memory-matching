import Game from "./game.js"

let flippedCards = [];
let pairsRevealed = [];
let icons = [
    "fas fa-music",
    "fas fa-music",
    "fas fa-mp3-player",
    "fas fa-mp3-player",
    "fas fa-drum",
    "fas fa-drum",
    "fas fa-volume",
    "fas fa-volume"
];
let turn = "fa fa-home";
let images = [
    "https://logos-download.com/wp-content/uploads/2018/03/UNC_Tar_Heels_logo_bright_head.svg"
]

export const renderBoard = function(game) {
    for(let i = 0; i<game.size; i++){
        let currentCard = (i+1).toString();
        document.getElementById(currentCard).innerHTML = game.board[i].id;
        document.getElementById('game-score').innerHTML = 'Score: ' + game.score.toString();
        if(!pairsRevealed.includes(game.board[i].pair)){
            $('#'+currentCard).click(function() {
                if(!pairsRevealed.includes(game.board[i].pair)){
                    if(!game.board[i].flipped){
                        // document.getElementById(currentCard).innerHTML = 'whoa';

                        document.getElementById(currentCard).innerHTML = `<i class = "${game.board[i].icon}"></i>`;
                        // document.getElementById(currentCard).innerHTML = `<img src="${images[0]}" />`;
                        // let image = 0;
                        game.board[i].flipped=true;
                        flippedCards.push(game.board[i].pair);
                        if(flippedCards[flippedCards.length-1] === flippedCards[flippedCards.length-2]){
                            pairsRevealed.push(game.board[i].pair);
                            game.score+=1;
                            document.getElementById('game-score').innerHTML = 'Score: ' + game.score.toString();
                            if(game.gameOver()) {
                                document.getElementById('game-over-display').innerHTML = 'Nice! You won!';
                            }
                        }
                    } else {
                        document.getElementById(currentCard).innerHTML = game.board[i].id;
                        game.board[i].flipped=false;
                        flippedCards.pop(game.board[i].pair);
                    }
                }
                console.log(flippedCards);
            });
        }
    }
    
    // if(game.gameOver()) {
    //     document.getElementById('game-over-display').innerHTML = 'Nice! You won!';
    // }
}

export const renderReset = function(game) {
    renderBoard(game);
    $('#reset-button').click(function() {
        game.setupNewGame();
        game.score = 0;
        renderReset(game);
    })
}

let game = new Game();
console.log("game begins!")
renderReset(game);