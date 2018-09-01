var nrOfPlayers = 6;
var boardLayout = getBoardLayout();
var players = [];
function addPlayer(player) {
    players.push(player);
}

function getObjectByElementId(id) {
    for (let player of players) {
        for (let piece of player.pieceCollection) {
            if (piece.id == id) {
                return piece;
            }
        }
    }
}

var possibleMoves = [];

function setPossibleMovesMain(possibleMovesCollection) {
    possibleMoves = possibleMovesCollection;
}
function getPossibleMovesMain() {
    return possibleMoves;
}

import { drawBoard } from "./board/board-creation.js";
import { createPlayers } from "./logic/win-conditions.js";
import { startGame } from "./logic/turn-mechanics.js"
import { getBoardLayout, isGameFinished } from "./board/board.js"


function getCoord(elementId) {
    var coord = { i: 0, j: 0 };

    var istr = "";
    var jstr = "";

    var str = elementId;

    while (str.length > 0) {
        if (str.charAt(0) != ".") {
            istr += str.charAt(0);
            str = str.slice(1);
        }
        else {
            str = str.slice(1);
            while (str.length > 0) {
                jstr += str.charAt(0);
                str = str.slice(1);
            }
            break;
        }
    }

    coord.i = parseInt(istr);
    coord.j = parseInt(jstr);

    return coord;

}

function reset() {

    drawBoard(boardLayout);
    createPlayers(nrOfPlayers);
    console.log(players);
    $( "#curtain" ).on("click", function() {
        $( "#curtain" ).fadeOut( "slow");
        $("h1").hide("slow");        
    });    
}

function goGame() {
    reset();
    startGame(players);

    if (isGameFinished()) {
        $("#curtain").fadeIn("slow");
        goGame();
    }
}

$(window).on("load",function () {
    
    goGame();
});

export {
    getCoord, setPossibleMovesMain, addPlayer, getPossibleMovesMain, goGame, getObjectByElementId
}

