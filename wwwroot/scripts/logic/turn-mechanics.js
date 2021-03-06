import { isGameFinished } from "../board/board.js"
import { getObjectByElementId } from "../main.js"

export {
    startGame
}

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
    var soldiers = $(".soldier");
    for (let soldier of soldiers) {
        var piece = getObjectByElementId(soldier.id);

        if (piece.moved) {
            piece.moved = false;
            piece.move.from = piece.move.to;
            piece.move.to = null;
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
            case "r": player = "Red"; playerc = "rgb(155, 6, 6)"; break;
            case "y": player = "Yellow"; playerc = "rgb(252, 248, 30)"; break;
            case "B": player = "Blue"; playerc = "rgb(6, 63, 155)";break;
            case "w": player = "White"; playerc = "rgb(252, 252, 237)";break;
            case "b": player = "Black"; playerc = "rgb(61, 61, 54)";break;
            case "g": player = "Green"; playerc = "rgb(47, 147, 47)";break;
        }

        $(".message").find("p").css("margin", "5px")
        .html(`Player <strong>${player}</strong> it is your turn! </br> Click Here To Continue!`);
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

var currentPlayer = [];
var players = [];
var endGame = false;