var nrOfPlayers;
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
function getCoord(elementId) {

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

    var coord = new Coord(parseInt(istr), parseInt(jstr));

    return coord;

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
import { getBoardLayout} from "./board/board.js"
import { Coord } from "./models.js";

function assignHandlers(){
    $( "#2pl" ).on("click", function() {
        $( "#curtain" ).fadeOut( "slow");
        $("h1").hide("slow");        
        nrOfPlayers = 2;
        goGame();
    }); 
    $( "#3pl" ).on("click", function() {
        $( "#curtain" ).fadeOut( "slow");
        $("h1").hide("slow");        
        nrOfPlayers = 3;
        goGame();
    }); 
    $( "#4pl" ).on("click", function() {
        $( "#curtain" ).fadeOut( "slow");
        $("h1").hide("slow");        
        nrOfPlayers = 4;
        goGame();
    }); 
    $( "#6pl" ).on("click", function() {
        $( "#curtain" ).fadeOut( "slow");
        $("h1").hide("slow");        
        nrOfPlayers = 6;
        goGame();
    }); 

}
function goGame() {

    var boardLayout = getBoardLayout();
    
    drawBoard(boardLayout);
    createPlayers(nrOfPlayers);

    $("#restart").on("click", function(){
        location.reload();
    })

    startGame(players);
}

$(window).on("load",function () {
    assignHandlers();
});

export {
    getCoord, setPossibleMovesMain, addPlayer, getPossibleMovesMain, goGame, getObjectByElementId, nrOfPlayers
}

