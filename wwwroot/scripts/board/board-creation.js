var spacing = 1;
var circleId = "";
var radius = 12;
var nrOfPlayers = 6;

var teamColorsLinks = [
    "url(\"/imgs/soldiers/Red.png\")",
    "url(\"/imgs//soldiers/Yellow.png\")",
    "url(\"/imgs//soldiers/Blue.png\")",
    "url(\"/imgs//soldiers/White.png\")",
    "url(\"/imgs//soldiers/Green.png\")",
    "url(\"/imgs//soldiers/Black.png\")"
];

import { setBoardCellValue, getBoardLength, getBoardCellValue } from "./board.js"
import { highlightPossibleMoves, undoHighlightPossibleMoves } from "./highlighting.js"
import { getObjectByElementId } from "../main.js"
import {Coord} from "../models.js"

function drawBoard(boardLayout) {
    var boardElement = document.createElement("div");
    $(boardElement).addClass("board");
    $("#table").append(boardElement);
    
    drawAtXY(boardLayout);
    placeSoldiers();
}

function drawAtXY(boardLayout) {

    var middle = $("#table").width() / 2;
    var startY = ($("#table").height() - (boardLayout.length * (radius * 2 + 2 * spacing))) / 2 + radius + spacing;

    var cellIds = [];

    for (var i = 0; i < boardLayout.length; i++) {

        cellIds = [];

        for (var k = 0; k < boardLayout[i].length; k++) {

            if (boardLayout[i][k] != "x") {
                var id = `${i}.${k}`;
                cellIds.push(id);
            }
        }

        for (var j = 0; j < cellIds.length; j++) {

            if (cellIds.length == 1) {
                startX = middle;
            }
            else if (cellIds.length % 2 == 1) {
                var startX = middle - (Math.floor(cellIds.length / 2)) * (2 * radius + 2 * spacing);
            }
            else {
                var startX = middle - cellIds.length / 2 * (2 * radius + 2 * spacing) + radius + spacing;
            }

            for (var j = 0; j < cellIds.length; j++) {
                circleId = cellIds[j];
                drawCircle(startX, startY, circleId);
                startX += (2 * radius + 2 * spacing);

            }
            startY += (2 * radius + 2 * spacing);
        }
    }
}

function drawCircle(x, y, circleId) {

    var circle = document.createElement("div");

    $(circle).addClass("circle");
    $(circle).css("left", `${x - radius + 3 / 2}px`);
    $(circle).css("top", `${y - radius + 3 / 2}px`);

    $(circle).attr("draggable", "false");
    $(circle).attr("id", `${circleId}`);

    circle.ondragover = function (ev) {
        if (circle.childElementCount == 0) {
            ev.preventDefault();
        }
    };

    circle.ondrop = function (ev) {
        if (circle.childElementCount == 0 && $(circle).hasClass("circleHighlighted")) {
            event.preventDefault();
            var data = ev.dataTransfer.getData("text");
            var element = document.getElementById(data);
            var coord = getCoord(ev.target.id);

            setBoardCellValue(coord, element.id.charAt(0));
            ev.target.appendChild(element);
            var piece = getObjectByElementId(data);

            if(!piece.moved)
            {
                piece.moved = true;
                piece.move.to.i = coord.i;
                piece.move.to.j = coord.j;
            }
            else{
                piece.moved = false;
                piece.move.to.i = null;
                piece.move.to.j = null;
            }
                        
            $("*").removeClass("circleHighlighted");
        }
    }
    $("#overlay").append(circle);
}

function createSoldier() {
    var soldier = document.createElement("div");

    $(soldier).addClass("soldier");

    $(soldier).on("mouseover", function () {
        if ($(soldier).hasClass("soldierCurrent")) {

            var soldiers = $(".soldier");
            var pieceMoved = false;

            for (let soldier of soldiers) {
                if (getObjectByElementId(soldier.id).moved) {
                    pieceMoved = true;
                }
            }

            if (pieceMoved && !getObjectByElementId(soldier.id).moved) {
                $(soldier).attr("draggable", "false");
            }
            else if (pieceMoved && getObjectByElementId(soldier.id).moved) {
                $(soldier).attr("draggable", "true");
                $(soldier).addClass("soldierSelected");
                let move = getObjectByElementId(soldier.id).move;
                let originCoord = new Coord(move.from.i, move.from.j);
                $(`#${originCoord.i}\\.${originCoord.j}`).addClass("circleHighlighted");
            }
            else if (!pieceMoved) {
                $(soldier).attr("draggable", "true");
                $(soldier).addClass("soldierSelected");
                highlightPossibleMoves(soldier.parentElement.id);
            }

        }
    });

    $(soldier).on("mouseleave",
        function () {
            if ($(soldier).hasClass("soldierCurrent")) {
                $(soldier).attr("draggable", "false");
                $(soldier).removeClass("soldierSelected");
                undoHighlightPossibleMoves();
            }
        });

    soldier.ondragstart = function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
        var coord = getCoord(soldier.parentElement.id);
        setBoardCellValue(coord, "e");
        $(soldier).addClass("soldierSelected");
    }
    return soldier;
}

function placeSoldiers() {
    let i, j;

    switch (nrOfPlayers) {

        case 6:
            for (i = 0; i < getBoardLength(); i++) {
                for (j = 0; j < getBoardLength(); j++) {
                    var coord = { i: i, j: j };

                    if (getBoardCellValue(coord) != "x" &&
                        getBoardCellValue(coord) != "e") {
                        var soldier = createSoldier();

                        switch (getBoardCellValue(coord)) {
                            case "r":
                                $(soldier).css("backgroundImage", `${teamColorsLinks[0]}`);
                                soldier.id = "r" + `${i}.${j}`; break;
                            case "y":
                                soldier.style.backgroundImage = `${teamColorsLinks[1]}`;
                                soldier.id = "y" + `${i}.${j}`; break;
                            case "B":
                                soldier.style.backgroundImage = `${teamColorsLinks[2]}`;
                                soldier.id = "B" + `${i}.${j}`; break;
                            case "w":
                                soldier.style.backgroundImage = `${teamColorsLinks[3]}`;
                                soldier.id = "w" + `${i}.${j}`; break;
                            case "g":
                                soldier.style.backgroundImage = `${teamColorsLinks[4]}`;
                                soldier.id = "g" + `${i}.${j}`; break;
                            case "b":
                                soldier.style.backgroundImage = `${teamColorsLinks[5]}`;
                                soldier.id = "b" + `${i}.${j}`; break;
                        }

                        var x = document.getElementById(`${i}.${j}`);
                        $(x).append(soldier);
                    }
                }
            }; break;
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

export {
    drawBoard, drawAtXY, placeSoldiers
};


