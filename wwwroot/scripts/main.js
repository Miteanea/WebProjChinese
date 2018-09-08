import { drawBoard } from "./board/board-creation.js";
import { createPlayers } from "./logic/win-conditions.js";
import { startGame } from "./logic/turn-mechanics.js"
import { getBoardLayout } from "./board/board.js"

export
{
    setPossibleMovesMain, addPlayer, getPossibleMovesMain, goGame, getObjectByElementId, nrOfPlayers
}

function addPlayer(player)
{
    players.push(player);
}

function getObjectByElementId(id)
{
    for (let player of players)
    {
        for (let piece of player.pieceCollection)
        {
            if (piece.id == id)
            {
                return piece;
            }
        }
    }
}

function setPossibleMovesMain(possibleMovesCollection)
{
    possibleMoves = possibleMovesCollection;
}

function getPossibleMovesMain()
{
    return possibleMoves;
}

function assignHandlers()
{
    $("#2pl").on("click", function ()
    {
        $("#curtain").fadeOut("slow");
        $("h1").hide("slow");
        nrOfPlayers = 2;
        goGame();
    });
    $("#3pl").on("click", function ()
    {
        $("#curtain").fadeOut("slow");
        $("h1").hide("slow");
        nrOfPlayers = 3;
        goGame();
    });
    $("#4pl").on("click", function ()
    {
        $("#curtain").fadeOut("slow");
        $("h1").hide("slow");
        nrOfPlayers = 4;
        goGame();
    });
    $("#6pl").on("click", function ()
    {
        $("#curtain").fadeOut("slow");
        $("h1").hide("slow");
        nrOfPlayers = 6;
        goGame();
    });

}

function goGame()
{
    var boardLayout = getBoardLayout();

    drawBoard(boardLayout);
    createPlayers(nrOfPlayers);

    $("#restart").on("click", function ()
    {
        location.reload();
    })

    startGame(players);
}

var nrOfPlayers;
var players = [];
var possibleMoves = [];

$(window).on("load", function ()
{
    assignHandlers();
});

