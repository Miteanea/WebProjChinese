var nrOfPlayers = 6;
var boardLayout = getBoardLayout();
var players = [];
function addPlayer(player) {
    players.push(player);
}


var possibleMoves = [];

function setPossibleMovesMain(possibleMovesCollection) {
    possibleMoves = possibleMovesCollection;
}
function getPossibleMovesMain(){
    return possibleMoves;
}

import { drawBoard } from "./board/board-creation.js";
import { createPlayers, getWinConditions } from "./logic/win-conditions.js";
import { startGame} from "./logic/turn-mechanics.js"
import { getBoardLayout, isGameFinished} from "./board/board.js"


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

function reset(){

    drawBoard(boardLayout);
    createPlayers(nrOfPlayers);
    console.log(players);
    alert("let the game begin...!!!!");
}
function goGame(){
    reset();
    startGame(players);
    
    if(isGameFinished())
    {
       goGame();
    }
}

$(document).ready(function () {
   goGame();
});

export {
    getCoord, setPossibleMovesMain, addPlayer, getPossibleMovesMain
}

