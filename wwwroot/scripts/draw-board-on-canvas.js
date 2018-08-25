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
    changeCellValueTo: function (coord, value) {
        // console.log("changeCellValue " + coord.id + " To" + value  )
        this.boardLayout[coord.i][coord.j] = value;
    },
    getCellValue: function (coord) {
        // console.log("GetCellValue = " + this.boardLayout[coord.i][coord.j])
        return this.boardLayout[coord.i][coord.j];
    }
};

var teamColors = [
    "url(\"/imgs/soldiers/Red.png\")",
    "url(\"/imgs//soldiers/Yellow.png\")",
    "url(\"/imgs//soldiers/Blue.png\")",
    "url(\"/imgs//soldiers/White.png\")",
    "url(\"/imgs//soldiers/Green.png\")",
    "url(\"/imgs//soldiers/Black.png\")"
];

var nrOfPlayers = 6;

$(document).ready(function () {

    var radius = 12;
    var spacing = 1;
    var middle = $("#table").width() / 2;
    var circleId = "";

    function drawBoard() {
        var boardElement = document.createElement("div");
        boardElement.className = "board";
        $("#table").append(boardElement);
    }

    function drawCircle(x, y) {

        var circle = document.createElement("div");

        circle.className = "circle";
        circle.style.left = x - radius + 3 / 2 + "px";
        circle.style.top = y - radius + 3 / 2 + "px";
        circle.id = circleId;
        circle.draggable = false;

        circle.ondragover = function (ev) {
            if (circle.childElementCount == 0) {
                ev.preventDefault();
            }
        };

        circle.ondrop = function (ev) {
            if (circle.childElementCount == 0 && $(this).hasClass("circleHighlighted")) {
                event.preventDefault();
                var data = ev.dataTransfer.getData("text");
                var element = document.getElementById(data);
                var coord = getCoord(ev.target.id);
                board.changeCellValueTo(coord, element.id.charAt(0));
                ev.target.appendChild(element);
                $("*").removeClass("circleHighlighted");
            }

        }
        $("#overlay").append(circle);
    }

    function drawAtXY(boardLayout) {
        let i, j, k;

        var startY = ($("#table").height() - (boardLayout.length * (radius * 2 + 2 * spacing))) / 2 + radius + spacing;

        var cellIds = [];

        for (i = 0; i < boardLayout.length; i++) {

            cellIds = [];

            for (k = 0; k < boardLayout[i].length; k++) {

                if (boardLayout[i][k] != "x") {
                    var id = `${i}.${k}`;
                    cellIds.push(id);
                }
            }

            for (j = 0; j < cellIds.length; j++) {

                if (cellIds.length == 1) {
                    startX = middle;
                }
                else if (cellIds.length % 2 == 1) {
                    var startX = middle - (Math.floor(cellIds.length / 2)) * (2 * radius + 2 * spacing);
                }
                else {
                    var startX = middle - cellIds.length / 2 * (2 * radius + 2 * spacing) + radius + spacing;
                }

                for (j = 0; j < cellIds.length; j++) {
                    circleId = cellIds[j];
                    drawCircle(startX, startY);
                    startX += (2 * radius + 2 * spacing);

                }
                startY += (2 * radius + 2 * spacing);
            }
        }
    }

    function getCoord(elementId) {
        var coord = { i: 0, j: 0 };

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

        coord.i = parseInt(istr);
        coord.j = parseInt(jstr);

        return coord;

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

        for (i = 0; i < coords.length; i++) {
            if ((coords[i].i <= 16 && coords[i].i >= 0) && (coords[i].j <= 16 && coords[i].j >= 0)) {
                nearbyIds.push(coords[i]);
            }
            else { nearbyIds.push(coords[i] = null) }
        }
        return nearbyIds;
    }

    function addEmptyCellsToMoves(movesColl, coord) {
        var nearbyCellsCoord = getNearbyCellsCoords(coord);
        console.log("empty cells nearbyCellsCoords");
        console.log(nearbyCellsCoord);

        for (i = 0; i < nearbyCellsCoord.length; i++) {
            if (nearbyCellsCoord[i] != null &&
                board.getCellValue(nearbyCellsCoord[i]) == "e" &&
                checkForUniqueness(movesColl, nearbyCellsCoord[i])) {
                console.log("empty Cell Added");
                console.log(nearbyCellsCoord[i]);
                movesColl.push(nearbyCellsCoord[i]);
            }
        }
        return movesColl;
    }
    function getTarget(cell, originCoord) {
        var direction = { i: cell.i - originCoord.i, j: cell.j - originCoord.j };
        var target = { i: cell.i + direction.i, j: cell.j + direction.j, origin: originCoord };
        if (target.i > 16 || target.j > 16 || target.i < 0 || target.j < 0) {
            target = null;
        }
        return target;
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

    function addJumpCellsToMoves(movesColl, originCoord) {

        var nearbyCellsCoord = getNearbyCellsCoords(originCoord);
        console.log(`Origin:`);
        console.log(originCoord);
        console.log("Nearby Cells");
        console.log(nearbyCellsCoord);
        var uniqueOrigin = checkForUniqueness(movesColl, originCoord);
        
            for (let cell of nearbyCellsCoord) {
                
                if (cell != null &&
                    board.getCellValue(cell) != "e" &&
                    board.getCellValue(cell) != "x") {
                    var targetCoord = getTarget(cell, originCoord);
                    console.log(`Iterated target`);
                    console.log(targetCoord);

                    if (targetCoord != null &&
                        (targetCoord.i != targetCoord.origin.i || targetCoord.j != targetCoord.origin.j)) {
                        var unique = checkForUniqueness(movesColl, targetCoord);
                        if (unique &&
                            board.getCellValue(targetCoord) == "e") {
                            console.log("added to moves collection");
                            console.log(targetCoord);
                            
                            movesColl.push(targetCoord);
                        }
                        
                        if (board.getCellValue(targetCoord) == "e" && unique) {
                            movesColl = addJumpCellsToMoves(movesColl, targetCoord);
                        }
                    }
                }
            
        }
        return movesColl;
    }

    function getPossibleMoves(coord) {
        var moves = [];

        moves = addEmptyCellsToMoves(moves, coord);

        moves = addJumpCellsToMoves(moves, coord);


        return moves;
    }

    var possibleMoves = [];

    function highlightPossibleMoves(elementId) {
        var coord = getCoord(elementId);
        possibleMoves = getPossibleMoves(coord);

        for (let cell of possibleMoves) {
            $(`#${cell.i}\\.${cell.j}`).addClass("circleHighlighted");
        }
    }

    function undoHighlightPossibleMoves() {
        possibleMoves = [];
        $("*").removeClass("circleHighlighted");

    }

    function createSoldier() {
        var soldier = document.createElement("div");

        soldier.className = "soldier";
        soldier.draggable = true;

        $(soldier).hover(
            function () {
                $(this).attr("class", "soldierSelected");
                highlightPossibleMoves(soldier.parentElement.id);
            },
            function () {
                $(this).attr("class", "soldier");
                undoHighlightPossibleMoves();
            });

        soldier.ondragstart = function drag(ev) {
            ev.dataTransfer.setData("text", ev.target.id);
            var coord = getCoord(soldier.parentElement.id);
            board.changeCellValueTo(coord, "e");
            $(this).attr("class", "soldierSelected");
        }
        return soldier;
    }

    function placeSoldiers() {
        let i, j, k;

        switch (nrOfPlayers) {

            case 6:
                for (i = 0; i < board.boardLayout.length; i++) {
                    for (j = 0; j < board.boardLayout[i].length; j++) {

                        if (board.boardLayout[i][j] != "x" &&
                            board.boardLayout[i][j] != "e") {
                            var soldier = createSoldier();
                            switch (board.boardLayout[i][j]) {
                                case "r":
                                    soldier.style.backgroundImage = `${teamColors[0]}`;
                                    soldier.tagName = "r"; soldier.id = "r" + `${i}.${j}`; break;
                                case "y":
                                    soldier.style.backgroundImage = `${teamColors[1]}`;
                                    soldier.tagName = "y"; soldier.id = "y" + `${i}.${j}`; break;
                                case "B":
                                    soldier.style.backgroundImage = `${teamColors[2]}`;
                                    soldier.tagName = "B"; soldier.id = "B" + `${i}.${j}`; break;
                                case "w":
                                    soldier.style.backgroundImage = `${teamColors[3]}`;
                                    soldier.tagName = "w"; soldier.id = "w" + `${i}.${j}`; break;
                                case "g":
                                    soldier.style.backgroundImage = `${teamColors[4]}`;
                                    soldier.tagName = "g"; soldier.id = "g" + `${i}.${j}`; break;
                                case "b":
                                    soldier.style.backgroundImage = `${teamColors[5]}`;
                                    soldier.tagName = "b"; soldier.id = "b" + `${i}.${j}`; break;
                            }

                            var x = document.getElementById(`${i}.${j}`);
                            $(x).append(soldier);
                        }
                    }
                }; break;
        }
    }

    drawBoard();
    drawAtXY(board.boardLayout);
    placeSoldiers(board.boardLayout);
});
