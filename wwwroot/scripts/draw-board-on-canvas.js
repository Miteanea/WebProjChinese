var bubbles = ['o', 'oo', 'ooo', 'oooo', 'ooooooooooooo', 'oooooooooooo', 'ooooooooooo',
    'oooooooooo', 'ooooooooo', 'oooooooooo', 'ooooooooooo', 'oooooooooooo', 'ooooooooooooo',
    'oooo', 'ooo', 'oo', 'o',];

var soldiersInitialPositions6Payers =
    [
        ["0.0", "1.0", "1.1", "2.0", "2.1", "2.2", "3.0", "3.1", "3.2", "3.3"],
        ["4.9", "4.10", "4.11", "4.12", "5.9", "5.10", "5.11", "6.9", "6.10", "7.9"],
        ["9.9", "10.9", "10.10", "11.9", "11.10", "11.11", "12.9", "12.10", "12.11", "12.12"],
        ["13.0", "13.1", "13.2", "13.3", "14.0", "14.1", "14.2", "15.0", "15.1", "16.0"],
        ["9.0", "10.0", "10.1", "11.0", "11.1", "11.2", "12.0", "12.1", "12.2", "12.3"],
        ["4.0", "4.1", "4.2", "4.3", "5.0", "5.1", "5.2", "6.0", "6.1", "7.0"]
    ];

var teamColors = ["url(\"Red.png\")", "url(\"Yellow.png\")", "url(\"Blue.png\")", "url(\"White.png\")",
    "url(\"Green.png\")", "url(\"Black.png\")"];


$(document).ready(function () {

    var radius = 12;
    var spacing = 1;
    var middle = $("#table").width() / 2;
    var circleId = '';
    var soldierId = '';

    function drawBoard() {
        var boardElement = document.createElement("div");
        boardElement.className = "board";
        $("#table").append(boardElement);
    }

    function drawCircle(x, y) {

        var circle = document.createElement("div");

        circle.style.width = 2 * radius - 3 + "px";
        circle.style.height = 2 * radius - 3 + "px";
        circle.style.left = x - radius + 3 / 2 + "px";
        circle.style.top = y - radius + 3 / 2 + "px";
        circle.id = circleId;
        circle.className = "circle";
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
                ev.target.appendChild(document.getElementById(data));
            }
        }

        $("#overlay").append(circle);
    }

    function drawAtXY(bubbles) {
        let i;
        var startY = ($("#table").height() - (bubbles.length * (radius * 2 + 2 * spacing))) / 2 + radius + spacing;

        for (i = 0; i < bubbles.length; i++) {
            let j;
            if (bubbles[i].length == 1) {
                startX = middle;
            }
            else if (bubbles[i].length % 2 == 1) {
                var startX = middle - (Math.floor(bubbles[i].length / 2)) * (2 * radius + 2 * spacing);
            }
            else {
                var startX = middle - bubbles[i].length / 2 * (2 * radius + 2 * spacing) + radius + spacing;
            }

            for (j = 0; j < bubbles[i].length; j++) {
                circleId = `${i}.${j}`;
                drawCircle(startX, startY);
                startX += (2 * radius + 2 * spacing);
            }
            startY += (2 * radius + 2 * spacing);
        }
    }

    function createSoldier() {
        var soldier = document.createElement("div");

        soldier.style.width = (2 * radius - 3) * 0.8 + "px";
        soldier.style.height = (2 * radius - 3) * 0.8 + "px";
        soldier.style.left = 2 + "px";
        soldier.style.top = 2 + "px";

        soldier.className = "soldier";
        soldier.id = soldierId;
        soldier.draggable = true;

        soldier.ondragstart = function drag(ev) {
            ev.dataTransfer.setData("text", ev.target.id);
        }

        return soldier;
    }
    function placeSoldiers(initPos) {
        let i, j, k;
        console.log("in placeSoldiers()");
        console.log(initPos.length);

        switch (initPos.length) {
            case 2:
                for (i = 0; i < 4; i += 3)
                    for (j = 0; j < initPos[i].length; j++) {
                        soldierId = "sold" + `${initPos[i][j]}`;
                        var soldier = createSoldier();
                        soldier.style.backgroundImage = `${teamColors[i]}`;
                        var x = document.getElementById(`${initPos[i][j]}`)
                        $(x).append(soldier);
                    }
                break;
            case 3:
                for (i = 0; i < 5; i += 2)
                    for (j = 0; j < initPos[i].length; j++) {
                        soldierId = "sold" + `${initPos[i][j]}`;
                        var soldier = createSoldier();
                        soldier.style.backgroundImage = `${teamColors[i]}`;
                        var x = document.getElementById(`${initPos[i][j]}`)
                        $(x).append(soldier);
                    }
                break;
            case 4:
                break;
            case 6:
                for (i = 0; i < initPos.length; i++) {
                    for (j = 0; j < initPos[i].length; j++) {
                        soldierId = "sold" + `${initPos[i][j]}`;
                        var soldier = createSoldier();
                        soldier.style.backgroundImage = `${teamColors[i]}`;
                        var x = document.getElementById(`${initPos[i][j]}`)
                        $(x).append(soldier);
                    }
                }
                break;
        }
    }

    drawBoard();
    drawAtXY(bubbles);
    placeSoldiers(soldiersInitialPositions6Payers);
});
