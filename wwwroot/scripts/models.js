import { getBoardLength, getBoardCellValue } from "./board/board.js"

class Board {
    constructor() {
        this.boardLayout = [
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "r", "x", "x", "x", "x"],
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "r", "r", "x", "x", "x", "x"],
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "r", "r", "r", "x", "x", "x", "x"],
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "r", "r", "r", "r", "x", "x", "x", "x"],
            ["x", "x", "x", "x", "b", "b", "b", "b", "e", "e", "e", "e", "e", "y", "y", "y", "y"],
            ["x", "x", "x", "x", "b", "b", "b", "e", "e", "e", "e", "e", "e", "y", "y", "y", "x"],
            ["x", "x", "x", "x", "b", "b", "e", "e", "e", "e", "e", "e", "e", "y", "y", "x", "x"],
            ["x", "x", "x", "x", "b", "e", "e", "e", "e", "e", "e", "e", "e", "y", "x", "x", "x"],
            ["x", "x", "x", "x", "e", "e", "e", "e", "e", "e", "e", "e", "e", "x", "x", "x", "x"],
            ["x", "x", "x", "g", "e", "e", "e", "e", "e", "e", "e", "e", "B", "x", "x", "x", "x"],
            ["x", "x", "g", "g", "e", "e", "e", "e", "e", "e", "e", "B", "B", "x", "x", "x", "x"],
            ["x", "g", "g", "g", "e", "e", "e", "e", "e", "e", "B", "B", "B", "x", "x", "x", "x"],
            ["g", "g", "g", "g", "e", "e", "e", "e", "e", "B", "B", "B", "B", "x", "x", "x", "x"],
            ["x", "x", "x", "x", "w", "w", "w", "w", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
            ["x", "x", "x", "x", "w", "w", "w", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
            ["x", "x", "x", "x", "w", "w", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
            ["x", "x", "x", "x", "w", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"]];
            this.winConditions;
    }

    setCellValue(coord, value) {
        this.boardLayout[coord.i][coord.j] = value;
    }
    getCellValue(coord) {
        
        return this.boardLayout[coord.i][coord.j];
    }
    gameFinished() {
        var count = 0;
        var endGame = false;
        for (let wc of this.winConditions) {
            var goal = wc.cells.length;

            for (let cell of wc.cells) {
                if (this.boardLayout[cell.i][cell.j] == wc.color) {
                    count++;
                }
            }
            if (count == goal) {
                alert(`Player ${wc.color} Wins!!! `);
                endGame = true;
                $("#restart").trigger("click");
            }
            count = 0;
        }
        return endGame;
    }
}

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
                if (getBoardCellValue(new Coord(i,j)) == color) {
                    var soldier = new Piece(color, i, j);
                    collection.push(soldier);
                    if (collection.length == 10) { 
                        return collection; }
                }
            }
        }
    }
    createTargetCell(color) {
        var targetCell;
        switch (color) {
            case "r": targetCell = { i: 16, j: 4, id: "16.4" }; break;
            case "y": targetCell = { i: 12, j: 0, id: "12.0" }; break;
            case "B": targetCell = { i: 4, j: 4, id: "4.4" }; break;
            case "w": targetCell = { i: 0, j: 12, id: "0.12" }; break;
            case "g": targetCell = { i: 4, j: 16, id: "4.16" }; break;
            case "b": targetCell = { i: 12, j: 12, id: "12.12" }; break;
        }
        return targetCell;
    }
    toggleCurrentPlayer(color) {
        $(`.soldier[id^='${color}']`).toggleClass("soldierCurrent");
    }
}

class Piece {
    constructor(color, i, j) {
        this.color = color;
        this.i = i;  this.j = j;
        this.id = `${color}${this.i}.${this.j}`;
        this.moved = false;
        this.move = { from: new Coord(this.i, this.j), to: new Coord(null, null), tempOrigin: new Coord(this.i, this.j) }
    }
}

class Coord {
    constructor(i, j) {
        this.i = i;
        this.j = j;
    }
}

export {
    Player, Piece, Coord, Board
}
