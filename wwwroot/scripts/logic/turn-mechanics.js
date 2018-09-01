import { setBoardCellValue, getBoardLength, getBoardCellValue, isGameFinished } from "../board/board.js"
import { goGame, getObjectByElementId } from "../main.js"

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
}

function turn() {
    if (currentPlayer != null) {
        currentPlayer.toggleCurrentPlayer(currentPlayer.color);
        
        var dfd = $.Deferred();
        dfd.done(isGameFinished, thisTurn, setMovedToFalse, currentPlayer.toggleCurrentPlayer, changePlayer, turn);

        $("button").on("click", function () { dfd.resolve(currentPlayer.color) });
    }
}

function setMovedToFalse(){
    var pieces = $(".soldier");
    for(let piece of pieces){
        let object = getObjectByElementId(piece.id);

        if(object.moved){
            object.moved = false;
            object.move.from = object.move.to;
            object.move.to.i = null;
            object.move.to.j = null;
        }
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
    if (!endGame) {

        console.log(`It is the turn of player: '${playerColor}'`);
    }
}

export {
    startGame
}