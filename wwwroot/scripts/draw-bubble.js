function drawBubble(x, y) {
    var ctx = canvas.getContext('2d');
    var centerX = x;
    var centerY = y;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'red';
    ctx.stroke();
}

module.exports = drawBubble;