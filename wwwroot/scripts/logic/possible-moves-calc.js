import { getBoardCellValue } from "../board/board.js"
import { Coord } from "../models.js";

function addJumpCellsToMoves(movesColl, originCoord)
{
    var adjacentCells = getAdjacentCells(originCoord);

    for (let cell of adjacentCells)
    {
        if (cell != null && cell.boardValue != "e" && cell.boardValue != "x")
        {
            var target = getTarget(cell, originCoord);

            if (target != null &&
                (target.i != target.origin.i || target.j != target.origin.j))
            {
                var unique = checkForUniqueness(movesColl, target);
                if (unique && target.boardValue == "e")
                {
                    movesColl.push(target);
                }

                if (target.boardValue == "e" && unique)
                {
                    movesColl = addJumpCellsToMoves(movesColl, target);
                }
            }
        }
    }
    return movesColl;
}
function getAdjacentCells(coord)
{

    var adjacentCells = [];
    var coords = [];

    var c1 = { i: coord.i - 1, j: coord.j + 0, id: `${coord.i - 1}.${coord.j + 0}` };
    var c2 = { i: coord.i - 1, j: coord.j + 1, id: `${coord.i - 1}.${coord.j + 1}` };
    var c3 = { i: coord.i - 0, j: coord.j + 1, id: `${coord.i - 0}.${coord.j + 1}` };
    var c4 = { i: coord.i + 1, j: coord.j + 0, id: `${coord.i + 1}.${coord.j + 0}` };
    var c5 = { i: coord.i + 1, j: coord.j - 1, id: `${coord.i + 1}.${coord.j - 1}` };
    var c6 = { i: coord.i - 0, j: coord.j - 1, id: `${coord.i - 0}.${coord.j - 1}` };
    coords.push(c1, c2, c3, c4, c5, c6);

    coords.forEach(function (element)
    {
        if (element.i >= 0 && element.j <= 16)
        {
            element.boardValue = getBoardCellValue(new Coord(element.i, element.j));
        }
    });

    for (let cell of coords)
    {
        if ((cell.i <= 16 && cell.i >= 0) && (cell.j <= 16 && cell.j >= 0))
        {
            adjacentCells.push(cell);
        }
        else { adjacentCells.push(cell = null) }
    }
    return adjacentCells;
}
function getPossibleMoves(coord)
{
    var moves = [];

    moves = addEmptyCellsToMoves(moves, coord);
    moves = addJumpCellsToMoves(moves, coord);

    return moves;
}

function addEmptyCellsToMoves(movesColl, coord)
{
    var adjacentCells = getAdjacentCells(coord);

    adjacentCells.forEach(function (cell)
    {
        if (cell != null &&
            cell.boardValue == "e" &&
            !movesColl.includes(cell))
        {
            movesColl.push(cell);
        }
    });
    return movesColl;
}

function checkForUniqueness(collection, target)
{
    var unique = true;
    for (let c of collection)
    {
        if (target.i == c.i && target.j == c.j)
        {
            unique = false;
        }
    }
    return unique;
}
function getTarget(cell, originCoord)
{
    var direction = { i: cell.i - originCoord.i, j: cell.j - originCoord.j };
    var target = { i: cell.i + direction.i, j: cell.j + direction.j, origin: originCoord };
    if (target.i > 16 || target.j > 16 || target.i < 0 || target.j < 0)
    {
        target = null;
    }
    else
    {
        target.boardValue = getBoardCellValue(new Coord(target.i, target.j));
    }

    return target;
}

export
{
    getPossibleMoves, checkForUniqueness
}