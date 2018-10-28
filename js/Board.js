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

const SPRITE_SET = [
    {
        name: "Green",
        sprites: [
            WORLD_SPRITE.PLAYER_PAWN,
            WORLD_SPRITE.PLAYER_ROOK,
            WORLD_SPRITE.PLAYER_KNIGHT,
            WORLD_SPRITE.PLAYER_BISHOP,
            WORLD_SPRITE.PLAYER_KING,
            WORLD_SPRITE.PLAYER_QUEEN
        ]
    },
    {
        name: "Purple",
        sprites: [
            WORLD_SPRITE.ENEMY_PAWN,
            WORLD_SPRITE.ENEMY_ROOK,
            WORLD_SPRITE.ENEMY_KNIGHT,
            WORLD_SPRITE.ENEMY_BISHOP,
            WORLD_SPRITE.ENEMY_KING,
            WORLD_SPRITE.ENEMY_QUEEN
        ]
    }
];
var worldMap;

function tileIndexFromRowCol(row, col) {
    return row * TILE_COL + col;
}

function getRowColFromTileIndex(tileIndex) {
    return {row: Math.floor(tileIndex/TILE_COL), col: tileIndex % TILE_COL};
}

function tileIndexFromPixelCoord(pixelX, pixelY) {
    let row = Math.floor(pixelY / TILE_H);
    let col = Math.floor(pixelX / TILE_W);
    return {
        row: row,
        col: col,
        tileIndex: tileIndexFromRowCol(row, col)
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
            let tileSprite = worldMap[tileIndexFromRowCol(rowI, colI)];
            if (tileSprite !== WORLD_SPRITE.UNOCCUPIED) {
                // highlight only chess pieces with valid moves/attacks ?
                let alias = (show_tile_selection && selectedTile.col === colI && selectedTile.row === rowI) || !show_tile_selection ? 1 : 0.5;
                drawImageAtTile(worldPics[tileSprite], colI * TILE_W, rowI * TILE_H, alias);
            }
        }
    }
}