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
