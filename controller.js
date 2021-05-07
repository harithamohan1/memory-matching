import Game from "./game.js"
import {client_key} from "./key.js";
import {key} from "./key.js";
let urlSoFar = [];
let flippedCards = [];
let pairsRevealed = [];
let numFlipped = 0;
let cardsFlipped = [];
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

export const renderBoard = function(game) {
    const requestURL = 'https://api.unsplash.com/search/photos?query='+document.getElementById("userTheme").value+ '&client_id=' + client_key.client;
    console.log("is requestURL working?" + requestURL);
    picAssignment();
    async function picAssignment() {
        for(let i=1; i<8;i++){
            let currURL = await fetchImage();
            for(let j=0;j<8;j++){
                if(game.board[j].id===i) {
                    game.board[j].url = currURL;
                }
                if(game.board[j].id===i+1) {
                    game.board[j].url = currURL;
                }
            }
            i++;
        }
    }

    async function fetchImage() {
        let ranNum = Math.floor(Math.random()*10);
        return fetch(requestURL)
        .then((response) => response.json())
        .then((data)=> {
            let allImages = data.results[ranNum];
            let responseURL = allImages.urls.regular;
            if(!urlSoFar.includes(responseURL)){
                urlSoFar.push(responseURL);
                return responseURL;
            } else {
                return fetchImage();
            }
        });
    }
    for(let i = 0; i<game.size; i++){
        let currentCard = (i+1).toString();
        document.getElementById(currentCard).innerHTML = game.board[i].id;
        document.getElementById('game-score').innerHTML = 'Score: ' + game.score.toString();
        // urlSoFar = [];
        // flippedCards = [];
        // pairsRevealed = [];
        // numFlipped = 0;
        // cardsFlipped = [];
        if(!pairsRevealed.includes(game.board[i].pair)){
            $('#'+currentCard).click(function() {
                console.log(flippedCards);
                if(!pairsRevealed.includes(game.board[i].pair)) {
                    if(!game.board[i].flipped){
                        // document.getElementById(currentCard).innerHTML = `<i class = "${game.board[i].icon}"></i>`;
                        document.getElementById(currentCard).innerHTML = `<img src = "${game.board[i].url}"></i>`;
                        game.board[i].flipped = true;
                        flippedCards.push(game.board[i].pair);
                        cardsFlipped.push(currentCard);
                        cardsFlipped.push(i);
                        numFlipped+=1;
                            if(flippedCards[flippedCards.length-1] === flippedCards[flippedCards.length-2]){
                                pairsRevealed.push(game.board[i].pair);
                                game.score+=1;
                                document.getElementById('game-score').innerHTML = 'Score: ' + game.score.toString();
                                if(game.gameOver()) {
                                    document.getElementById('game-over-display').innerHTML = 'Nice! You won!';
                                    let NASA_URL = key.NASA_API_URL;
                                    let fetchNASAPicture = async() => {
                                        try {
                                            let response = await fetch(`${NASA_URL}`)
                                            let result = await response.json()
                                            renderNASA(result)
                                        } catch (error){
                                            console.log(error)
                                        }
                                    }
                                    let renderNASA = result => {
                                        document.getElementById('title').textContent = result.title
                                        document.getElementById('date').textContent = result.date
                                        document.getElementById('picture').src = result.hdurl
                                        document.getElementById('NASA-description').textContent = result.explanation
                                    }
                                    fetchNASAPicture();
                                    document.getElementById("NASA-pic").style.display = "inline-block";
                                }
                                numFlipped=0;
                            } else if(numFlipped==2) {
                                numFlipped=0;
                                showAlert();
                                function showAlert(){
                                    setTimeout(function() {
                                        alert("The cards did not match");
                                        numFlipped=0;
                                        let mostRecentI = cardsFlipped.pop();
                                        let mostRecentCard = cardsFlipped.pop();
                                        document.getElementById(mostRecentCard).innerHTML = game.board[mostRecentI].id;
                                        game.board[mostRecentI].flipped = false;
                                        let lessRecentI = cardsFlipped.pop();
                                        let lessRecentCard = cardsFlipped.pop();
                                        document.getElementById(lessRecentCard).innerHTML = game.board[lessRecentI].id;
                                        game.board[lessRecentI].flipped = false;
                                        flippedCards.pop();
                                        flippedCards.pop();
                                    },200);
                                }

                            }
                    } else {
                        document.getElementById(currentCard).innerHTML = game.board[i].id;
                        game.board[i].flipped=false;
                        flippedCards.pop(game.board[i].pair);
                        numFlipped-=1;
                    }
                }
            });
        }
    }
}

export const renderReset = function(game) {
    // urlSoFar = [];
    // flippedCards = [];
    // pairsRevealed = [];
    // numFlipped = 0;
    // cardsFlipped = [];
    renderBoard(game);
    $('#reset-button').click(function() {
        console.log("game has been reset");
        // urlSoFar = [];
        // flippedCards = [];
        // pairsRevealed = [];
        // numFlipped = 0;
        // cardsFlipped = [];
        game.setupNewGame();
        game.score = 0;
        // let newGame = new Game();
        renderReset(game);
    })
}

$('#start-button').click(function() {
    document.getElementById("start-appear").style.display = "none";
    document.getElementById("game-cards").style.display = "inline-block";
    let game = new Game();
    console.log("game begins!")
    renderReset(game);
})
