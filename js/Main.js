const FPS = 30;

var canvas = document.getElementById("gameCanvas");
var canvasContext = canvas.getContext("2d");

const TILE_ROW = 12, TILE_COL = 16;
const TILE_W = 50, TILE_H = 50;

function isEnemy(sprite) {
    let enemies = [
        WORLD_SPRITE.ENEMY_PAWN,
        WORLD_SPRITE.ENEMY_ROOK,
        WORLD_SPRITE.ENEMY_KNIGHT,
        WORLD_SPRITE.ENEMY_BISHOP,
        WORLD_SPRITE.ENEMY_KING,
        WORLD_SPRITE.ENEMY_QUEEN
    ];

    for (let i = 0; i < enemies.length; ++i) {
        if (enemies[i] === sprite) {
            return true;
        }
    }
    return false;
}

const WORLD_SPRITE = {
    UNOCCUPIED: 0,
    PLAYER_PAWN: 1,
    PLAYER_ROOK: 2,
    PLAYER_KNIGHT: 3,
    PLAYER_BISHOP: 4,
    PLAYER_KING: 5,
    PLAYER_QUEEN: 6,

    ENEMY_PAWN: 7,
    ENEMY_ROOK: 8,
    ENEMY_KNIGHT: 9,
    ENEMY_BISHOP: 10,
    ENEMY_KING: 11,
    ENEMY_QUEEN: 12,

    BLOCK: 99 // All other stuff
};

var worldMap = [
    8, 8, 9, 9,10, 0, 0,12,11, 0, 0,10, 9, 9, 8, 8,
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    2, 2, 3, 3, 4, 0, 0, 5, 6, 0, 0, 4, 3, 3, 2, 2];


function tileIndex(row, col) {
    return row * TILE_COL + col;
}

function colourRect(topX, topY, width, height, colour) {
    canvasContext.fillStyle = colour;
    canvasContext.fillRect(topX, topY, width, height);
}

function drawChessBoard() { // temporary background for debugging
    colourRect(0, 0, canvas.width, canvas.height, "black");
    for (let rowI = 0; rowI < TILE_ROW; ++rowI) {
        for (let colI = 0; colI < TILE_COL; ++colI) {
            if ((rowI + colI) % 2 == 1) {
                colourRect(colI * TILE_W, rowI * TILE_H, TILE_W, TILE_H, "white");
            }
        }

    }
}

function drawMap() {
    for (let rowI = 0; rowI < TILE_ROW; ++rowI) {
        for (let colI = 0; colI < TILE_COL; ++colI) {
            let tileSprite = worldMap[tileIndex(rowI, colI)];
            if (tileSprite !== WORLD_SPRITE.UNOCCUPIED) {
                canvasContext.drawImage(worldPics[tileSprite], colI * TILE_W, rowI * TILE_H);
            }
        }
    }
}

function drawGame() {
    drawChessBoard();
    drawMap();
}

function startGame() {
    setInterval(function () {
        drawGame();
    }, 1000 / FPS);
}

window.onload = function () {
    loadImages();
};
