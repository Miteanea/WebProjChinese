import { getWinConditions } from "../logic/win-conditions.js"
import {Board, Coord} from "../models.js"

export { setBoardCellValue, getBoardLength, getBoardCellValue, isGameFinished, getBoardLayout, getCoord }

function getBoardLayout() {
    return board.boardLayout;
}
function setBoardCellValue(coord, elementId) {
    board.setCellValue(coord, elementId);
}
function getBoardLength() {
    return board.boardLayout.length;
}
function getBoardCellValue(coord) {
    return board.getCellValue(coord);
}
function isGameFinished() {
    return board.gameFinished();
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

var board = new Board();
board.winConditions = getWinConditions();