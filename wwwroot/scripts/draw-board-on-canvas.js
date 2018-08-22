var boardLayout = []
boardLayout = [
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "r", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "r", "r", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "r", "r", "r", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "r", "r", "r", "r", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "b", "b", "b", "b", "e", "e", "e", "e", "e", "y", "y", "y", "y"],
    ["x", "x", "x", "x", "b", "b", "b", "e", "e", "e", "e", "e", "e", "y", "y", "y", "x"],
    ["x", "x", "x", "x", "b", "b", "e", "e", "e", "e", "e", "e", "e", "y", "y", "x", "x"],
    ["x", "x", "x", "x", "b", "e", "e", "e", "e", "e", "e", "e", "e", "x", "y", "x", "x"],
    ["x", "x", "x", "x", "e", "e", "e", "e", "e", "e", "e", "e", "e", "x", "x", "x", "x"],
    ["x", "x", "x", "g", "e", "e", "e", "e", "e", "e", "e", "e", "B", "x", "x", "x", "x"],
    ["x", "x", "g", "g", "e", "e", "e", "e", "e", "e", "e", "B", "B", "x", "x", "x", "x"],
    ["x", "g", "g", "g", "e", "e", "e", "e", "e", "e", "B", "B", "B", "x", "x", "x", "x"],
    ["g", "g", "g", "g", "e", "e", "e", "e", "e", "B", "B", "B", "B", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "w", "w", "w", "w", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "w", "w", "w", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "w", "w", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "w", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"]
];

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
            if (circle.childElementCount == 0) {
                event.preventDefault();
                var data = ev.dataTransfer.getData("text");
                var element = document.getElementById(data);

                ev.target.appendChild(element);
            }
        }
        $("#overlay").append(circle);
    }

    function drawAtXY(boardLayout) {
        let i, j, k;

        var startY = ($("#table").height() - (boardLayout.length * (radius * 2 + 2 * spacing))) / 2 + radius + spacing;

        var cellIds = [];

        for (i = 0; i < boardLayout.length; i++) {

            console.log(boardLayout[i].length);
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

                console.log(cellIds.length);

                for (j = 0; j < cellIds.length; j++) {
                    circleId = cellIds[j];
                    drawCircle(startX, startY);
                    startX += (2 * radius + 2 * spacing);

                }
                startY += (2 * radius + 2 * spacing);
            }
        }
    }

    function createSoldier() {
        var soldier = document.createElement("div");

        soldier.className = "soldier";
        soldier.draggable = true;

        $(soldier).hover(
            function () {
                $(this).attr("class", "soldierSelected");
            },
            function () {
                $(this).attr("class", "soldier");
            });

        soldier.ondragstart = function drag(ev) {
            ev.dataTransfer.setData("text", ev.target.id);
            $(this).attr("class", "soldierSelected");
        }
        return soldier;
    }

    function placeSoldiers() {
        let i, j, k;


        switch (nrOfPlayers) {

            case 6:
                for (i = 0; i < boardLayout.length; i++) {
                    for (j = 0; j < boardLayout[i].length; j++) {
                        console.log(boardLayout[i][j]);
                        if (boardLayout[i][j] != "x" && boardLayout[i][j] != "e") {
                            var soldier = createSoldier();
                            soldier.id = "sold" + `${i}.${j}`;
                            switch (boardLayout[i][j]) {
                                case "r":
                                    soldier.style.backgroundImage = `${teamColors[0]}`; break;
                                case "y":
                                    soldier.style.backgroundImage = `${teamColors[1]}`; break;
                                case "B":
                                    soldier.style.backgroundImage = `${teamColors[2]}`; break;
                                case "w":
                                    soldier.style.backgroundImage = `${teamColors[3]}`; break;
                                case "g":
                                    soldier.style.backgroundImage = `${teamColors[4]}`; break;
                                case "b":
                                    soldier.style.backgroundImage = `${teamColors[5]}`; break;
                            }
                            console.log(soldier.id);
                            var x = document.getElementById(`${i}.${j}`);
                            $(x).append(soldier);
                        }
                    }
                };
                break;
        }
    }

    drawBoard();
    drawAtXY(boardLayout);
    placeSoldiers(boardLayout);
});
