const FPS = 30;

var canvas = document.getElementById("gameCanvas");
var canvasContext = canvas.getContext("2d");

var has_selected_tile = false;
var selected_tile_row = -1;
var selected_tile_col = -1;
var selected_tile_index = -1;

function spriteIsEnemy(sprite) {
    let enemieSprites = [
        WORLD_SPRITE.ENEMY_PAWN,
        WORLD_SPRITE.ENEMY_ROOK,
        WORLD_SPRITE.ENEMY_KNIGHT,
        WORLD_SPRITE.ENEMY_BISHOP,
        WORLD_SPRITE.ENEMY_KING,
        WORLD_SPRITE.ENEMY_QUEEN
    ];

    for (let i = 0; i < enemieSprites.length; ++i) {
        if (enemieSprites[i] === sprite) {
            return true;
        }
    }
    return false;
}

function spriteIsPlayer(sprite) {
    let playerSprites = [
        WORLD_SPRITE.PLAYER_PAWN,
        WORLD_SPRITE.PLAYER_ROOK,
        WORLD_SPRITE.PLAYER_KNIGHT,
        WORLD_SPRITE.PLAYER_BISHOP,
        WORLD_SPRITE.PLAYER_KING,
        WORLD_SPRITE.PLAYER_QUEEN
    ];

    for (let i = 0; i < playerSprites.length; ++i) {
        if (playerSprites[i] === sprite) {
            return true;
        }
    }
    return false;
}

function colourRect(topX, topY, width, height, colour, alpha) {
    canvasContext.globalAlpha = alpha;
    canvasContext.fillStyle = colour;
    canvasContext.fillRect(topX, topY, width, height);
}

function drawChessBoard() { // temporary background for debugging
    colourRect(0, 0, canvas.width, canvas.height, "black");
    for (let rowI = 0; rowI < TILE_ROW; ++rowI) {
        for (let colI = 0; colI < TILE_COL; ++colI) {
            if ((rowI + colI) % 2 === 1) {
                colourRect(colI * TILE_W, rowI * TILE_H, TILE_W, TILE_H, "white", 1);
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
    if (has_selected_tile) {
        colourRect(selected_tile_col * TILE_W, selected_tile_row * TILE_H, TILE_W, TILE_H, "yellow", 0.5);
        if (worldMap[selected_tile_index] === WORLD_SPRITE.PLAYER_PAWN) {
            let moves = getPawnMoves(selected_tile_row, selected_tile_col);
            for (let i = 0; i < moves.length; ++i) {
                let currTileIndex = tileIndex(moves[i].row, moves[i].col);
                if (worldMap[currTileIndex] === WORLD_SPRITE.UNOCCUPIED) {
                    colourRect(moves[i].col * TILE_W, moves[i].row * TILE_H, TILE_W, TILE_H, "blue", 0.5);
                }
            }
        }
    }
    drawMap();
}

function startGame() {
    setInterval(function () {
        drawGame();
    }, 1000 / FPS);
}

window.onload = function () {
    loadImages();

    canvas.addEventListener("mousedown", function(evt) {
        let mousePos = getRelativeMousePos(evt);
        let tileInfo = tileIndexFromPixelCoord(mousePos.x, mousePos.y);
        selected_tile_col = tileInfo.col;
        selected_tile_row = tileInfo.row;
        selected_tile_index = tileInfo.tileIndex;
        if (spriteIsPlayer(worldMap[selected_tile_index])) {
            has_selected_tile = !has_selected_tile;
        } else {
            has_selected_tile = false;
        }
    });
};

function getPawnMoves(currRow, currCol) {
    return [
        {row: currRow - 1, col: currCol},
        {row: currRow + 1, col: currCol}
    ];
}

function getRelativeMousePos(evt) {
    let rect = canvas.getBoundingClientRect();

    let mouseX = evt.clientX - rect.left;
    let mouseY = evt.clientY - rect.top;

    return {
        x: mouseX,
        y: mouseY
    };
}
