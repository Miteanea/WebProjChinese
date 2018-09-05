
import { getCoord } from "./main.js"
import { setBoardCellValue, getBoardLength, getBoardCellValue } from "./board/board.js"

class Player {
    constructor(playerColor) {
        this.color = playerColor;
        this.pieceCollection = this.getPieces(this.color);
        this.targetCell = this.createTargetCell(this.color);
    }

    getPieces(color) {
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
    createTargetCell(playerColor) {
        var targetCell;
        switch (playerColor) {

            case "r": targetCell = { i: 16, j: 4, id: "16.4" }; break;
            case "y": targetCell = { i: 12, j: 0, id: "12.0" }; break;
            case "B": targetCell = { i: 4, j: 4, id: "4.4" }; break;
            case "w": targetCell = { i: 0, j: 12, id: "0.12" }; break;
            case "g": targetCell = { i: 4, j: 16, id: "4.16" }; break;
            case "b": targetCell = { i: 12, j: 12, id: "12.12" }; break;
        }
        return targetCell;
    }
    toggleCurrentPlayer(playerColor) {
        var color = playerColor;
        $(`.soldier[id^='${color}']`).toggleClass("soldierCurrent");
    }
}

class Piece {
    constructor(color, i, j) {
        this.color = color;
        this.i = i;
        this.j = j;
        this.element = $(`#${color}${this.i}\\.${this.j}`);
        this.circle = $(`#${color}${i}\\.${j}`).parent();
        this.id = `${color}${this.i}.${this.j}`;
        this.moved = false;
        this.move = { from: new Coord(this.i, this.j), to: new Coord(null, null) }
    }
}

function Coord(i, j) {
    this.i = i;
    this.j = j;
}

export {
    Player, Piece, Coord
}
