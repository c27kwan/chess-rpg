function colourRect(topX, topY, width, height, colour, alpha) {
    canvasContext.globalAlpha = alpha;
    canvasContext.fillStyle = colour;
    canvasContext.fillRect(topX, topY, width, height);
}

function drawImageAtTile(sprite, x, y, alpha) {
    canvasContext.globalAlpha = alpha;
    canvasContext.drawImage(sprite, x, y);
}

function drawText(msg,  x, y, colour) {
    canvasContext.fillStyle = colour;
    canvasContext.fillText(msg, x, y);
}