
import { getCoord } from "./main.js"
import { setBoardCellValue, getBoardLength, getBoardCellValue, isGameFinished} from "./board/board.js"
import { checkForUniqueness } from "./logic/possible-moves-calc.js"

function Player(playerColor) {
    this.color = playerColor;
    this.pieceCollection = this.getPieces(this.color);
    this.targetCell = this.createTargetCell(this.color);
}
Player.prototype.getPieces = function (color) {
    var collection = [];
    for (var i = 0; i < getBoardLength(); i++) {
        for (var j = 0; j < getBoardLength(); j++) {
            var coord = { i: i, j: j };
            if (getBoardCellValue(coord) == color) {
                var soldier = new Piece(color, i, j);
                collection.push(soldier);
                if (collection.length == 10) { return collection; }
            }
        }
    }
}
Player.prototype.makeMove = function () {

    var piecesToMove = []

    for (let piece of this.pieceCollection) {
        var possmov = piece.getPossibleMoves();
        if (possmov != null) {
            piecesToMove.push(piece);
        }
    }

    var selectedPiece = (piecesToMove[Math.floor(Math.random() * piecesToMove.length)]);
    selectedPiece.element.trigger("mouseover");
    console.log(selectedPiece)

    var paths = selectedPiece.getPaths();
    console.log("Paths:");
    console.log(paths)
    var selectedPath = (paths[Math.floor(Math.random() * paths.length)]);
    console.log("selectedPath: ")
    console.log(selectedPath);

    //
    $(this).addClass("soldierSelected");
    var coord = getCoord(selectedPiece.circle[0].id);
    setBoardCellValue(coord, "e");
    var element = document.getElementById(selectedPiece.element[0].id);
    coord = getCoord(`${selectedPath[0].i}.${selectedPath[0].j}`);
    setBoardCellValue(coord, element.id.charAt(0));
    document.getElementById(`${selectedPath[0].i}.${selectedPath[0].j}`).appendChild(element);
    $("*").removeClass("circleHighlighted");
    $("*").removeClass("soldierSelected")

}
Player.prototype.createTargetCell = function (playerColor) {
    var targetCell;

    switch (playerColor) {
        case "r": targetCell = { i: 16, j: 4, id: `${this.i}.${this.j}` };
        case "y": targetCell = { i: 12, j: 0, id: `${this.i}.${this.j}` };
        case "B": targetCell = { i: 4, j: 4, id: `${this.i}.${this.j}` };
        case "w": targetCell = { i: 0, j: 12, id: `${this.i}.${this.j}` };
        case "g": targetCell = { i: 4, j: 16, id: `${this.i}.${this.j}` };
        case "b": targetCell = { i: 12, j: 12, id: `${this.i}.${this.j}` };
    }
    return targetCell;
}
Player.prototype.toggleCurrentPlayer = function (playerColor) {
    var color = playerColor;
    $(`.soldier[id^='${color}']`).toggleClass("soldierCurrent");
}

function Piece(color, i, j) {
    this.color = color;
    this.i = i;
    this.j = j;
    this.element = $(`#${color}${this.i}\\.${this.j}`);
    this.circle = $(`#${color}${i}\\.${j}`).parent();
}
Piece.prototype.getPossibleMoves = function () {
    this.element.trigger("mouseover");
    var possmov = getPossibleMovesMain();
    this.element.trigger("mouseleave");
    return possmov;
};
Piece.prototype.getPaths = function () {
   
}
function addPaths(movesColl, originCoord) {

    var nearbyCellsCoord = getNearbyCellsCoords(originCoord);

    for (let cell of nearbyCellsCoord) {

        if (cell != null &&
            getBoardCellValue(cell) != "e" &&
            getBoardCellValue(cell) != "x") {
            var targetCoord = getTarget(cell, originCoord);

            if (targetCoord != null &&
                (targetCoord.i != targetCoord.origin.i || targetCoord.j != targetCoord.origin.j)) {
                var unique = checkForUniqueness(movesColl, targetCoord);
                if (unique &&
                    getBoardCellValue(targetCoord) == "e") {
                    path.push(targetCoord);
                }

                if (getBoardCellValue(targetCoord) == "e" && unique) {
                    path = addJumpCellsToMoves(path, targetCoord);
                }
            }
        }
    }
    return movesColl;
}
function getNearbyCellsCoords(coord) {

    var nearbyIds = [];
    var coords = [];

    var c1 = { i: coord.i - 1, j: coord.j + 0, id: `${coord.i - 1}.${coord.j + 0}` };
    var c2 = { i: coord.i - 1, j: coord.j + 1, id: `${coord.i - 1}.${coord.j + 1}` };
    var c3 = { i: coord.i - 0, j: coord.j + 1, id: `${coord.i - 0}.${coord.j + 1}` };
    var c4 = { i: coord.i + 1, j: coord.j + 0, id: `${coord.i + 1}.${coord.j + 0}` };
    var c5 = { i: coord.i + 1, j: coord.j - 1, id: `${coord.i + 1}.${coord.j - 1}` };
    var c6 = { i: coord.i - 0, j: coord.j - 1, id: `${coord.i - 0}.${coord.j - 1}` };

    coords.push(c1, c2, c3, c4, c5, c6);

    for (var i = 0; i < coords.length; i++) {
        if ((coords[i].i <= 16 && coords[i].i >= 0) && (coords[i].j <= 16 && coords[i].j >= 0)) {
            nearbyIds.push(coords[i]);
        }
        else { nearbyIds.push(coords[i] = null) }
    }
    return nearbyIds;
}

export {
    Player, Piece
}