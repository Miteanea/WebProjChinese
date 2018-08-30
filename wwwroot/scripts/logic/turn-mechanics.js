import { setBoardCellValue, getBoardLength, getBoardCellValue, isGameFinished} from "../board/board.js"
import { goGame} from "../main.js"

var currentPlayer = [];
var players = [];
var endGame = false;

function startGame(playerCollection) {
    players = playerCollection;
    currentPlayer = players[0];
    console.log("inside startGame")
    console.log(players);
    console.log(currentPlayer);
    
    turn();    

    if(endGame){
        alert(`Congrats Player '${currentPlayer.color}`);
        goGame();
        }
}

function turn() {
    if(currentPlayer != null){
    currentPlayer.toggleCurrentPlayer(currentPlayer.color);
    alert(`player '${currentPlayer.color}' You have 2 minutes`);
    // currentPlayer.makeMove();

    var dfd = $.Deferred();
    dfd.done(isGameFinished, thisTurn, currentPlayer.toggleCurrentPlayer, changePlayer, turn);

    $("button").on("click", function () { dfd.resolve(currentPlayer.color) });
    }
}

function changePlayer() {
    if (!endGame) {
        var index = players.indexOf(currentPlayer) + 1;
        
        if (index == players.length) {
            index = 0;
        }
        currentPlayer = players[index];
    }
    else {
        currentPlayer = null;
    }
}
function thisTurn(playerColor) {
    console.log(`It is the turn of player: '${playerColor}'`);
}

export {
    startGame
}