const FPS = 30;

var canvas = document.getElementById("gameCanvas");
var canvasContext = canvas.getContext("2d");

function drawGame() {
    drawChessBoard();
    drawHint();
    drawMap();
}

function startGame() {
    setInterval(function () {
        drawGame();
    }, 1000 / FPS);
}

window.onload = function () {
    loadImages();
    canvas.addEventListener("mousedown", handleTileSelection);
};
