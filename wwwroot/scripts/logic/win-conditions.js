import { Player, Coord } from "../models.js"
import { addPlayer } from "../main.js"
import { getBoardLength, getBoardCellValue} from "../board/board.js"

var teamColors= ["r", "y", "B", "w", "g", "b"];
      
var winLayouts = [];
var winConditions = [];

function fillArray() {
      for (var i = 0; i < getBoardLength(); i++) {
            winLayouts.push([])
            for (var j = 0; j < getBoardLength(); j++) {
                  winLayouts[i].push("x");
            }
      }
}

function calcTargetCoord(i, j) {

      var iaxis = 8;
      var jaxis = 8;
      var a, b;

      var coord;

      if (i <= iaxis && j >= jaxis) {
            a = iaxis + Math.abs(iaxis - i);
            b = jaxis - Math.abs(jaxis - j);
            coord = new Coord(a, b);
      }
      if (i >= iaxis && j >= jaxis) {
            a = iaxis - Math.abs(iaxis - i);
            b = jaxis - Math.abs(jaxis - j)
            coord = new Coord(a,b);
      }
      if (i >= iaxis && j <= jaxis) {
            a = iaxis - Math.abs(iaxis - i);
            b = jaxis + Math.abs(jaxis - j);
            coord = new Coord (a , b );
      }
      if (i <= iaxis && j <= jaxis) {
            a =  iaxis + Math.abs(iaxis - i);
            b = jaxis + Math.abs(jaxis - j);
            coord = new Coord(a,b);
      }
      return coord;
}

function getWinLayouts(playerColor) {

      for (var i = 0; i < getBoardLength(); i++) {
            for (var j = 0; j < getBoardLength(); j++) {

                  var targetCoord = calcTargetCoord(i, j);
                  var coord = new Coord(i,j);

                  if (playerColor == getBoardCellValue(coord) && targetCoord != null) {
                        winLayouts[targetCoord.i][targetCoord.j] = playerColor;
                  }
            }
      }
}

function getWinConditions() {
      fillArray();

      for (let color of teamColors) {
            getWinLayouts(color);
      }

      for (let color of teamColors) {
            var winCondition = { color: color, cells: [] };

            for (var i = 0; i < getBoardLength(); i++) {
                  for (var j = 0; j < getBoardLength(); j++) {
                        if (winLayouts[i][j] == color) {
                              var cell = { i: i, j: j };
                              winCondition.cells.push(cell);
                        }
                  }
            }
            winConditions.push(winCondition)
      }
      return winConditions;
}

function createPlayers(nrOfPlayers) {

      var colors;

      switch (nrOfPlayers) {
            case 2: colors = ["r", "w"]; break;
            case 3: colors = ["r", "B", "g"]; break;
            case 4: colors = ["b", "y", "g", "B"]; break;
            case 6: colors = ["r", "y", "B", "w", "g", "b"]; break;
      }

      for (let col of colors) {
            var pl = new Player(col);
            addPlayer(pl);
      }
}

export {
      createPlayers, getWinConditions
}


