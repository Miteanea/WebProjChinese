import { getPossibleMoves } from "../logic/possible-moves-calc.js"
import { setPossibleMovesMain } from "../main.js"
import { getCoord } from "../board/board.js"

export
{
    highlightPossibleMoves, undoHighlightPossibleMoves
}

function highlightPossibleMoves(elementId)
{
    var coord = getCoord(elementId);
    
    possibleMovesCollection = getPossibleMoves(coord);
    if (possibleMovesCollection.length == 0)
    {
        possibleMovesCollection = null;
    }
    setPossibleMovesMain(possibleMovesCollection);
    if (possibleMovesCollection != null)
    {
        for (let cell of possibleMovesCollection)
        {
            $(`#${cell.i}\\.${cell.j}`).addClass("circleHighlighted");
        }
    }
}

function undoHighlightPossibleMoves()
{
    setPossibleMovesMain([]);
    $("*").removeClass("circleHighlighted");
}

var possibleMovesCollection = []
