import { getWinConditions } from "../logic/win-conditions.js"
import {Board} from "../models.js"

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


var board = new Board();
board.winConditions = getWinConditions();


export { setBoardCellValue, getBoardLength, getBoardCellValue, isGameFinished, getBoardLayout }