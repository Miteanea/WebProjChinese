var boardLayout = {
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
      /* 16 */["x", "x", "x", "x", "w", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"]],
      modifyCell: function (coord, value) {
            boardLayout[coord.i][coord.j] = value;
      }
};
var nrOfPlayers = 6;
var players = [];
var winConditions = [];
var teamColors = ["r", "y", "B", "w", "g", "b"];


function fillArray() {
      for (i = 0; i < boardLayout.length; i++) {
            winConditions.push([])
            for (j = 0; j < boardLayout[i].length; j++) {
                  winConditions[i].push("x");
            }
      }
}
function calcCoord(i, j) {

      var iaxis = 8;
      var jaxis = 8;
      var x;
      var y;

      var coord = {
            i: 0, j: 0
      }

      if (i < iaxis && j > jaxis) {
            x = iaxis + Math.abs(iaxis - i); y = jaxis - Math.abs(jaxis - j);
      }
      if (i > iaxis && j > jaxis) {
            x = iaxis - Math.abs(iaxis - i); y = jaxis - Math.abs(jaxis - j);
      }
      if (i > iaxis && j < jaxis) {
            x = iaxis - Math.abs(iaxis - i); y = jaxis + Math.abs(jaxis - j);
      }
      if (i < iaxis && j < jaxis) {
            x = iaxis + Math.abs(iaxis - i); y = jaxis + Math.abs(jaxis - j);
      }

      coord.i = x; coord.j = y;
      return coord;
}
function playerWinCond(playerCol) {

      for (i = 0; i < boardLayout.length; i++) {
            for (j = 0; j < boardLayout[i].length; j++) {

                  coord = calcCoord(i, j);

                  if (playerCol == boardLayout[i][j]) {
                        winConditions[coord.x][coord.y] = playerCol;
                  }
            }
      }
}
function createWinConditions() {
      for (let color of teamColors) {
            console.log(color);
            playerWinCond(color);
      }
}
function Player(playerCol) {
      this.color = playerCol;
      this.pieceCollection = getPieces(this.color);
}
Player.prototype.getPieces = function (color, boardLayout) {
      var collection = [];
      for (i = 0; i < boardLayout.length; i++) {
            for (j = 0; j < boardLayout[i].length; j++) {
                  if (boardLayout[i][j] = color) {
                        var soldier = new Piece(color, i, j);
                        collection.push(soldier);
                        if (collection.length == 10) { return collection; }
                  }
            }
      }
}
function Piece(color, i, j) {
      this.color = color;
      this.i = i;
      this.j = j;
      this.element = $(`#${color}${i}\\.${j}`);
      this.circle = $(`#${color}${i}\\.${j}`).parent();
}
Piece.prototype.getPossibleMoves = function () {

}
function createPlayers(nrOfPlayers) {

      switch (nrOfPlayers) {
            case 2: colors = ["r", "w"]; break;
            case 3: colors = ["r", "b", "g"]; break;
            case 4: colors = ["b", "y", "g", "B"]; break;
            case 4: colors = ["r", "y", "B", "w", "g", "b"]; break;
      }

      for (let col in colors) {
            var pl = new Player(col);
            players.push(pl);
      }
}

fillArray();
createWinConditions();
createPlayers(nrOfPlayers);


      //          1.1. evaluate possible moves
      //          1.2. save possible moves
      //    
      //    2. compare moves
      //    3. make move
      //    4. end turn

