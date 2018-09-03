import { isGameFinished } from "../board/board.js"
import { getObjectByElementId } from "../main.js"

var currentPlayer = [];
var players = [];
var endGame = false;

function startGame(playerCollection) {
    players = playerCollection;
    currentPlayer = players[0];

    turn();
}

function turn() {
    if (currentPlayer != null) {

        $(".message").on("click", function () {
            $(".message").fadeOut("fast");
        });

        thisTurn(currentPlayer.color);
        currentPlayer.toggleCurrentPlayer(currentPlayer.color);

        var dfd = $.Deferred();
        dfd.done(isGameFinished, setMovedToFalse, currentPlayer.toggleCurrentPlayer, thisTurn, changePlayer, turn);

        $("#yes").on("click", function () {
            $(".endTurnMessage").fadeOut("fast");
            dfd.resolve(currentPlayer.color)
        });
        $("#no").on("click", function () {
            $(".endTurnMessage").fadeOut("fast");
        });
    }
}

function setMovedToFalse() {
    var pieces = $(".soldier");
    for (let piece of pieces) {
        let object = getObjectByElementId(piece.id);

        if (object.moved) {
            object.moved = false;
            object.move.from.i = object.move.to.i;
            object.move.from.j = object.move.to.j;
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
        let player = null;
        let playerc = null;

        switch (playerColor) {
            case "r": player = "Red"; playerc = "red"; break;
            case "y": player = "Yellow"; playerc = "yellow"; break;
            case "B": player = "Blue"; playerc = "blue";break;
            case "w": player = "White"; playerc = "white";break;
            case "b": player = "Black"; playerc = "black";break;
            case "g": player = "Green"; playerc = "green";break;
        }

        $(".message").html(`Player <strong>${player}</strong> it is your turn! </br> Click Here To Continue!`);
        $(".message").css("background-color", `${playerc}`);

        if(playerc == "black"){
            $(".message").css("color", "white");
        }
        else{
            $(".message").css("color", "black");
        }

        $(".message").fadeIn("fast");
    }
}

export {
    startGame
}