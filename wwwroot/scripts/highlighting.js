import { getPossibleMoves } from "./possible-moves-calc.js"
import { getCoord, setPossibleMovesMain } from "./main.js"

var possibleMovesCollection = []

function highlightPossibleMoves(elementId) {
    var coord = getCoord(elementId);
    possibleMovesCollection = getPossibleMoves(coord);
    if (possibleMovesCollection.length == 0) {
        possibleMovesCollection = null;
    }
    setPossibleMovesMain(possibleMovesCollection);
    if (possibleMovesCollection != null) {
        for (let cell of possibleMovesCollection) {
            $(`#${cell.i}\\.${cell.j}`).addClass("circleHighlighted");
        }
    }
}

function undoHighlightPossibleMoves() {
    setPossibleMovesMain([]);
    $("*").removeClass("circleHighlighted");
}

export {
    highlightPossibleMoves, undoHighlightPossibleMoves
}