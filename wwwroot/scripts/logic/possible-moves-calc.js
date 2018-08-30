import { setBoardCellValue, getBoardLength, getBoardCellValue, isGameFinished} from "../board/board.js"

function addJumpCellsToMoves(movesColl, originCoord) {

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
                    movesColl.push(targetCoord);
                }

                if (getBoardCellValue(targetCoord) == "e" && unique) {
                    movesColl = addJumpCellsToMoves(movesColl, targetCoord);
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
function getPossibleMoves(coord) {
    var moves = [];

    moves = addEmptyCellsToMoves(moves, coord);
    moves = addJumpCellsToMoves(moves, coord);

    return moves;
}

function addEmptyCellsToMoves(movesColl, coord) {
    var nearbyCellsCoord = getNearbyCellsCoords(coord);

    for (var i = 0; i < nearbyCellsCoord.length; i++) {
        if (nearbyCellsCoord[i] != null &&
            getBoardCellValue(nearbyCellsCoord[i]) == "e" &&
            checkForUniqueness(movesColl, nearbyCellsCoord[i])) {
            movesColl.push(nearbyCellsCoord[i]);
        }
    }
    return movesColl;
}
function checkForUniqueness(collection, target) {
    var unique = true;
    for (let c of collection) {
        if (target.i == c.i && target.j == c.j) {
            unique = false;
        }
    }
    return unique;
}
function getTarget(cell, originCoord) {
    var direction = { i: cell.i - originCoord.i, j: cell.j - originCoord.j };
    var target = { i: cell.i + direction.i, j: cell.j + direction.j, origin: originCoord };
    if (target.i > 16 || target.j > 16 || target.i < 0 || target.j < 0) {
        target = null;
    }
    return target;
}

export{
    getPossibleMoves, checkForUniqueness
}