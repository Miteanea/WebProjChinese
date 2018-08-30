import { getWinConditions } from "../logic/win-conditions.js"
import { goGame } from "../main.js";

var board = {
    boardLayout: [
        // 0    1    2    3    4    5    6    7    8    9    10   11  12    13   14   15  16
    /* 0 */["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "r", "x", "x", "x", "x"],
    /* 1 */["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "r", "r", "x", "x", "x", "x"],
    /* 2 */["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "r", "r", "r", "x", "x", "x", "x"],
    /* 3 */["x", "x", "x", "x", "x", "x", "x", "x", "x", "r", "r", "r", "r", "x", "x", "x", "x"],
    /* 4 */["x", "x", "x", "x", "b", "b", "b", "b", "e", "e", "e", "e", "e", "y", "y", "y", "y"],
    /* 5 */["x", "x", "x", "x", "b", "b", "b", "e", "e", "e", "e", "e", "e", "y", "y", "y", "x"],
    /* 6 */["x", "x", "x", "x", "b", "b", "e", "e", "e", "e", "e", "e", "e", "y", "y", "x", "x"],
    /* 7 */["x", "x", "x", "x", "b", "e", "e", "e", "e", "e", "e", "e", "e", "y", "x", "x", "x"],
    /* 8 */["x", "x", "x", "x", "e", "e", "e", "e", "e", "e", "e", "e", "e", "x", "x", "x", "x"],
    /* 9 */["x", "x", "x", "g", "e", "e", "e", "e", "e", "e", "e", "e", "B", "x", "x", "x", "x"],
    /* 10 */["x", "x", "g", "g", "e", "e", "e", "e", "e", "e", "e", "B", "B", "x", "x", "x", "x"],
    /* 11 */["x", "g", "g", "g", "e", "e", "e", "e", "e", "e", "B", "B", "B", "x", "x", "x", "x"],
    /* 12 */["g", "g", "g", "g", "e", "e", "e", "e", "e", "B", "B", "B", "B", "x", "x", "x", "x"],
    /* 13*/["x", "x", "x", "x", "w", "w", "w", "w", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    /* 14 */["x", "x", "x", "x", "w", "w", "w", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    /* 15*/["x", "x", "x", "x", "w", "w", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    /* 16 */["x", "x", "x", "x", "w", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"]
    ],
    
    

    setCellValue: function (coord, value) {
        this.boardLayout[coord.i][coord.j] = value;
    },
    getCellValue: function (coord) {
        return this.boardLayout[coord.i][coord.j];
    },
    gameFinished: function () {
        var count = 0;
        var endGame = false;
        for (let wc of winConditions) {
            var goal = wc.cells.length;

            for (let cell of wc.cells) {
                if (this.boardLayout[cell.i][cell.j] == wc.color) {
                    count++;
                }
            }
            if (count == goal) {
                alert(`Player ${wc.color} Wins!!! `);
                endGame = true;
                goGame();
            }
            count = 0;
            console.log("keep going...")
        }
        return endGame;
    }
};
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

var winConditions = getWinConditions();

export{ setBoardCellValue, getBoardLength, getBoardCellValue, isGameFinished , getBoardLayout}