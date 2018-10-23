const FPS = 30;

var canvas = document.getElementById("gameCanvas");
var canvasContext = canvas.getContext("2d");

const TILE_ROW = 12, TILE_COL = 16;
const TILE_W = 50, TILE_H = 50;

var worldPics = [];

const WORLD_SPRITE = {
	GENERIC_BACKGROUND: 0,
	BLOCK: 1,
	KNIGHT: 2
}

var worldMap = 
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 5, 0, 1, 1, 1, 1,
	1, 0, 4, 0, 4, 0, 1, 0, 2, 0, 1, 0, 1, 4, 4, 1,
	1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 5, 1, 5, 1, 1,
	1, 1, 1, 5, 1, 1, 1, 0, 4, 0, 1, 0, 0, 0, 1, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 4, 0, 1, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1,
	1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 4, 0, 1, 1,
	1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1,
	1, 0, 5, 0, 5, 0, 5, 0, 3, 0, 1, 1, 1, 1, 1, 1,
	1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];


function tileIndex(row, col) {
	return row * TILE_COL + col;
}

function colourRect(topX, topY, width, height, colour) {
	canvasContext.fillStyle = colour;
	canvasContext.fillRect(topX, topY, width, height);
}

function drawChessBoard() { // temporary background for debugging
	colourRect(0, 0, canvas.width, canvas.height, "black");
	for (var rowI = 0; rowI < TILE_ROW; ++rowI) {
		for (var colI = 0; colI < TILE_COL; ++colI) {
			if ((rowI + colI) % 2 == 1 ) {
				colourRect(colI * TILE_W, rowI * TILE_H, TILE_W, TILE_H, "white");
			}
		}

	}
}

function drawMap() {
	for (var rowI = 0; rowI < TILE_ROW; ++rowI) {
		for (var colI = 0; colI < TILE_COL; ++colI) {
			switch(worldMap[tileIndex(rowI, colI)]) {
				case WORLD_SPRITE.KNIGHT:
					canvasContext.drawImage(worldPics[WORLD_SPRITE.KNIGHT], colI * TILE_W, rowI * TILE_H);
				break;

			}
		}
	}
}

function drawGame() {
	drawChessBoard();
	drawMap();
}

window.onload = function () {
	worldPics[WORLD_SPRITE.KNIGHT] = document.createElement("img");
	worldPics[WORLD_SPRITE.KNIGHT].src = "images/purple_knight.png";

	setInterval(function() {
		drawGame();
	}, 1000/FPS);
}
