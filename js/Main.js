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

function getPawnMoves(currRow, currCol) {
    return [
        {row: currRow - 1, col: currCol},
        {row: currRow + 1, col: currCol}
    ];
}

function getRookMoves(currRow, currCol) {
    let possibleMoves = [];
    for (let rowI = 0; rowI < TILE_ROW; ++rowI) {
        if (rowI !== currRow) {
            possibleMoves.push({row: rowI, col: currCol});
        }
    }
    for (let colI = 0; colI < TILE_COL; ++colI) {
        if (colI !== currCol) {
            possibleMoves.push({row: currRow, col: colI});
        }
    }
    return possibleMoves;
}

function getRookAttacks(currRow, currCol) {
    let possibleAttacks = [];

    for (let rowI = 0; rowI < TILE_ROW; ++rowI) {
        if (rowI !== currRow) {
            let currTileIndex = tileIndex(rowI, currCol);
            if (spriteIsEnemy(worldMap[currTileIndex])) {
                possibleAttacks.push({row: rowI, col: currCol});
            }
        }
    }

    for (let colI = 0; colI < TILE_ROW; ++colI) {
        if (colI !== currCol) {
            let currTileIndex = tileIndex(currRow, colI);
            if (spriteIsEnemy(worldMap[currTileIndex])) {
                possibleAttacks.push({row: currRow, col: colI});
            }
        }
    }
    return possibleAttacks;
}

