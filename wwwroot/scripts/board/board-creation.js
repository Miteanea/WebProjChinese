import { setBoardCellValue, getBoardLength, getBoardCellValue, getCoord } from "./board.js"
import { highlightPossibleMoves, undoHighlightPossibleMoves } from "./highlighting.js"
import { getObjectByElementId, nrOfPlayers } from "../main.js"
import { Coord } from "../models.js"

export {drawBoard }

function drawBoard(boardLayout)
{
    var boardElement = document.createElement("div");
    $(boardElement).addClass("board");
    $("#table").append(boardElement);

    drawAtXY(boardLayout);
    placeSoldiers();
}

function drawAtXY(boardLayout)
{
    var middle = $("#table").width() / 2;
    var startY = ($("#table").height() - (boardLayout.length * (radius * 2 + 2 * spacing))) / 2 + radius + spacing;
    var cellIds = [];

    for (var i = 0; i < boardLayout.length; i++)
    {
        cellIds = [];
        for (var k = 0; k < boardLayout[i].length; k++)
        {
            if (boardLayout[i][k] != "x")
            {
                var id = `${i}.${k}`;
                cellIds.push(id);
            }
        }

        for (var j = 0; j < cellIds.length; j++) 
        {
            if (cellIds.length == 1)
            {
                startX = middle;
            }
            else if (cellIds.length % 2 == 1)
            {
                var startX = middle - (Math.floor(cellIds.length / 2)) * (2 * radius + 2 * spacing);
            }
            else
            {
                var startX = middle - cellIds.length / 2 * (2 * radius + 2 * spacing) + radius + spacing;
            }

            for (var j = 0; j < cellIds.length; j++)
            {
                circleId = cellIds[j];
                drawCircle(startX, startY, circleId);
                startX += (2 * radius + 2 * spacing);
            }
            startY += (2 * radius + 2 * spacing);
        }
    }
}

function drawCircle(x, y, circleId)
{
    var circle = document.createElement("div");

    $(circle).addClass("circle");
    $(circle).css("left", `${x - radius + 3 / 2}px`);
    $(circle).css("top", `${y - radius + 3 / 2}px`);

    $(circle).attr("draggable", "false");
    $(circle).attr("id", `${circleId}`);

    circle.ondragover = function (ev)
    {
        if (circle.childElementCount == 0)
        {
            ev.preventDefault();
        }
    };

    circle.ondrop = function (ev)
    {
        if (circle.childElementCount == 0 && $(circle).hasClass("circleHighlighted"))
        {
            event.preventDefault();
            var data = ev.dataTransfer.getData("text");
            var element = document.getElementById(data);
            var coord = getCoord(circle.id);

            var piece = getObjectByElementId(data);

            setBoardCellValue(coord, piece.id);
            setBoardCellValue(piece.move.tempOrigin, "e");

            ev.target.appendChild(element);
            piece.move.tempOrigin = coord;

            if (!piece.moved)
            {
                piece.moved = true;
                piece.move.to = coord;
            }
            else
            {
                piece.moved = false;
                piece.move.to = null;
            }

            $("*").removeClass("circleHighlighted");
            promptEndTurn();
        }
    }
    $("#overlay").append(circle);
}

function createSoldier()
{
    var soldier = document.createElement("div");

    $(soldier).addClass("soldier");
    $(soldier).on("mouseover", function ()
    {
        if ($(soldier).hasClass("soldierCurrent"))
        {
            var soldierObject = getObjectByElementId(soldier.id);           

            if (hasAnyPieceMoved() && !soldierObject.moved)
            {
                $(soldier).attr("draggable", "false");
            }
            else if (hasAnyPieceMoved() && soldierObject.moved)
            {
                $(soldier).attr("draggable", "true");
                $(soldier).addClass("soldierSelected");
                let move = getObjectByElementId(soldier.id).move;
                let originCoord = new Coord(move.from.i, move.from.j);
                $(`#${originCoord.i}\\.${originCoord.j}`).addClass("circleHighlighted");
            }
            else if (!hasAnyPieceMoved())
            {
                $(soldier).attr("draggable", "true");
                $(soldier).addClass("soldierSelected");
                highlightPossibleMoves(soldier.parentElement.id);
            }
        }
    });

    $(soldier).on("mouseleave", function ()
    {
        if ($(soldier).hasClass("soldierCurrent"))
        {
            $(soldier).attr("draggable", "false");
            $(soldier).removeClass("soldierSelected");
            undoHighlightPossibleMoves();
        }
    });

    soldier.ondragstart = function drag(ev)
    {
        ev.dataTransfer.setData("text", ev.target.id);
        $(soldier).addClass("soldierSelected");
    }
    return soldier;
}

function placeSoldiers()
{
    var i, j;
    switch (nrOfPlayers)
    {
        case 6:
            for (i = 0; i < getBoardLength(); i++)
            {
                for (j = 0; j < getBoardLength(); j++)
                {
                    var coord = new Coord(i, j);
                    if (getBoardCellValue(coord) != "x" && getBoardCellValue(coord) != "e")
                    {
                        var soldier;
                        switch (getBoardCellValue(coord))
                        {
                            case "r":
                                soldier = createSoldier(); addSoldier(soldier, getBoardCellValue(coord), coord); break;
                            case "y":
                                soldier = createSoldier(); addSoldier(soldier, getBoardCellValue(coord), coord); break;
                            case "B":
                                soldier = createSoldier(); addSoldier(soldier, getBoardCellValue(coord), coord); break;
                            case "w":
                                soldier = createSoldier(); addSoldier(soldier, getBoardCellValue(coord), coord); break;
                            case "g":
                                soldier = createSoldier(); addSoldier(soldier, getBoardCellValue(coord), coord); break;
                            case "b":
                                soldier = createSoldier(); addSoldier(soldier, getBoardCellValue(coord), coord); break;
                        }
                    }
                }
            }; break;

        case 3:
            for (i = 0; i < getBoardLength(); i++)
            {
                for (j = 0; j < getBoardLength(); j++)
                {
                    coord = new Coord(i, j);
                    if (getBoardCellValue(coord) != "x" && getBoardCellValue(coord) != "e")
                    {
                        var soldier;
                        switch (getBoardCellValue(coord))
                        {
                            case "r":
                                soldier = createSoldier(); addSoldier(soldier, getBoardCellValue(coord), coord); break;
                            case "B":
                                soldier = createSoldier(); addSoldier(soldier, getBoardCellValue(coord), coord); break;
                            case "g":
                                soldier = createSoldier(); addSoldier(soldier, getBoardCellValue(coord), coord); break;
                        }
                    }
                }
            }; break;

        case 2:
            for (i = 0; i < getBoardLength(); i++)
            {
                for (j = 0; j < getBoardLength(); j++)
                {
                    var coord = new Coord(i, j);
                    if (getBoardCellValue(coord) != "x" && getBoardCellValue(coord) != "e")
                    {
                        var soldier;
                        switch (getBoardCellValue(coord))
                        {
                            case "r":
                                soldier = createSoldier(); addSoldier(soldier, getBoardCellValue(coord), coord); break;
                            case "w":
                                soldier = createSoldier(); addSoldier(soldier, getBoardCellValue(coord), coord); break;
                        }
                    }
                }
            }; break;

        case 4:
            for (i = 0; i < getBoardLength(); i++)
            {
                for (j = 0; j < getBoardLength(); j++)
                {
                    var coord = new Coord(i, j);
                    if (getBoardCellValue(coord) != "x" && getBoardCellValue(coord) != "e")
                    {
                        var soldier;
                        switch (getBoardCellValue(coord))
                        {
                            case "y":
                                soldier = createSoldier(); addSoldier(soldier, getBoardCellValue(coord), coord); break;
                            case "B":
                                soldier = createSoldier(); addSoldier(soldier, getBoardCellValue(coord), coord); break;
                            case "g":
                                soldier = createSoldier(); addSoldier(soldier, getBoardCellValue(coord), coord); break;
                            case "b":
                                soldier = createSoldier(); addSoldier(soldier, getBoardCellValue(coord), coord); break;
                        }
                    }
                }
            }; break;
    }
}

function addSoldier(soldier, col, coord)
{
    let c;
    switch (col)
    {
        case "r": c = teamColorsLinks[0]; break;
        case "y": c = teamColorsLinks[1]; break;
        case "B": c = teamColorsLinks[2]; break;
        case "w": c = teamColorsLinks[3]; break;
        case "g": c = teamColorsLinks[4]; break;
        case "b": c = teamColorsLinks[5]; break;
    }

    $(soldier).css("backgroundImage", `${c}`);
    soldier.id = col + `${coord.i}.${coord.j}`;
    var cell = document.getElementById(`${coord.i}.${coord.j}`);
    $(cell).append(soldier);
}

function promptEndTurn()
{    
    if (hasAnyPieceMoved())
    {
        $(".endTurnMessage").fadeIn("fast");
    }
}

function hasAnyPieceMoved()
{
    var soldiers = $(".soldier");
    var pieceMoved = false;
    for (let soldier of soldiers)
    {
        var sold = getObjectByElementId(soldier.id);
        if (sold.moved)
        {
            pieceMoved = true;
        }
    }
    return pieceMoved;
}

var spacing = 1;
var circleId = "";
var radius = 12;

var teamColorsLinks = ["url(\"/imgs/soldiers/Red.png\")", "url(\"/imgs//soldiers/Yellow.png\")",
    "url(\"/imgs//soldiers/Blue.png\")", "url(\"/imgs//soldiers/White.png\")",
    "url(\"/imgs//soldiers/Green.png\")", "url(\"/imgs//soldiers/Black.png\")"];



