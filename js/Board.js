const TILE_ROW = 12, TILE_COL = 16;
const TILE_W = 50, TILE_H = 50;

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

function tileIndexFromPixelCoord(pixelX, pixelY) {
    let row = Math.floor(pixelY / TILE_H);
    let col = Math.floor(pixelX / TILE_W);
    return {
        row: row,
        col: col,
        tileIndex:tileIndex(row, col)
    };
}

function drawChessBoard() { // temporary background
    colourRect(0, 0, canvas.width, canvas.height, "black");
    for (let rowI = 0; rowI < TILE_ROW; ++rowI) {
        for (let colI = 0; colI < TILE_COL; ++colI) {
            if (rowI % 2 !== colI % 2) { // change to &1 for performance boost?
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
                let alias = (show_tile_selection && selectedTile.col === colI && selectedTile.row === rowI) || !show_tile_selection ? 1 : 0.5;
                drawImageAtTile(worldPics[tileSprite], colI * TILE_W, rowI * TILE_H, alias);
            }
        }
    }
}

function spriteIsEnemy(sprite) {
    let enemySprites = [
        WORLD_SPRITE.ENEMY_PAWN,
        WORLD_SPRITE.ENEMY_ROOK,
        WORLD_SPRITE.ENEMY_KNIGHT,
        WORLD_SPRITE.ENEMY_BISHOP,
        WORLD_SPRITE.ENEMY_KING,
        WORLD_SPRITE.ENEMY_QUEEN
    ];

    for (let i = 0; i < enemySprites.length; ++i) {
        if (enemySprites[i] === sprite) {
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