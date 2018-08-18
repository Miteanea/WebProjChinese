var fs = require("fs");
var layoutSourceText = fs.readFileSync("./board-layout.txt").toString('utf-8');
var layoutArray = layoutSourceText.split("\n");

console.log(layoutArray);

var figuresToDraw = layoutArray.map(selectCircles);

console.log(figuresToDraw);

function selectCircles(value, index, array){
    var x = '';
    let i;
    for( i = 0 ; i < value.length; i++)
    {
        console.log(value.length);
        console.log(index);
        console.log(value.charAt(i));
        if (value.charAt(i) == 'e'){
            x += 'o';
        }
    }
    return x;
}

module.exports = figuresToDraw;