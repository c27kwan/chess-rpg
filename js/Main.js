const FPS = 30;

var canvas = document.getElementById("gameCanvas");
var canvasContext = canvas.getContext("2d");

// TODO: Refactor this piece of the logic
var show_tile_selection = false;
var selected_tile_row = -1;
var selected_tile_col = -1;
var selected_tile_index = -1;

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

function colourRect(topX, topY, width, height, colour, alpha) {
    canvasContext.globalAlpha = alpha;
    canvasContext.fillStyle = colour;
    canvasContext.fillRect(topX, topY, width, height);
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
                let alias = (show_tile_selection && selected_tile_col === colI && selected_tile_row === rowI) || !show_tile_selection ? 1 : 0.5;
                drawImageAtTile(worldPics[tileSprite], colI * TILE_W, rowI * TILE_H, alias);
            }
        }
    }
}

function drawImageAtTile(sprite, x, y, alpha) {
    canvasContext.globalAlpha = alpha;
    canvasContext.drawImage(sprite, x, y);
}

function drawGame() {
    drawChessBoard();
    if (show_tile_selection) {
        colourRect(selected_tile_col * TILE_W, selected_tile_row * TILE_H, TILE_W, TILE_H, "yellow", 0.5);
        let moves;
        let attacks;
        switch (worldMap[selected_tile_index]) {
            case WORLD_SPRITE.PLAYER_PAWN:
                moves = getPawnMoves(selected_tile_row, selected_tile_col);
                attacks = []; // TODO
                break;
            case WORLD_SPRITE.PLAYER_ROOK:
                moves = getRookMoves(selected_tile_row, selected_tile_col);
                attacks = getRookAttacks(selected_tile_row, selected_tile_col);
                break;
            default:
                moves = []; // placeholder
                attacks = [];
        }
        for (let i = 0; i < moves.length; ++i) {
            let currTileIndex = tileIndex(moves[i].row, moves[i].col);
            if (worldMap[currTileIndex] === WORLD_SPRITE.UNOCCUPIED) {
                colourRect(moves[i].col * TILE_W, moves[i].row * TILE_H, TILE_W, TILE_H, "blue", 0.5);
            }
        }
        for (let j = 0; j < attacks.length; ++j) {
            colourRect(attacks[j].col * TILE_W, attacks[j].row * TILE_H, TILE_W, TILE_H, "red", 0.5);
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

    canvas.addEventListener("mousedown", function (evt) {
        let mousePos = getRelativeMousePos(evt);
        let tileInfo = tileIndexFromPixelCoord(mousePos.x, mousePos.y);
        let next_selected_tile_col = tileInfo.col;
        let next_selected_tile_row = tileInfo.row;
        let next_selected_tile_index = tileInfo.tileIndex;
        if (show_tile_selection) {
            if (next_selected_tile_index === selected_tile_index) {
                // todo: show menu
            } else if (spriteIsPlayer(worldMap[next_selected_tile_index])) { // not the same chess piece, so just switch selection
                selected_tile_col = next_selected_tile_col;
                selected_tile_row = next_selected_tile_row;
                selected_tile_index = next_selected_tile_index;
            } else if (spriteIsEnemy(worldMap[next_selected_tile_index])) {
                // TODO: Check if valid ATTACK
            } else { // picked something that isn't occupied. ASSUMPTION: There isn't any other obstacle on map
                let next_moves = [];
                switch (worldMap[selected_tile_index]) { // CLASS INVARIANT: CAN ONLY SELECT PLAYERS
                    case WORLD_SPRITE.PLAYER_ROOK:
                        next_moves = getRookMoves(selected_tile_row, selected_tile_col);
                        break;
                    case WORLD_SPRITE.PLAYER_PAWN:
                        next_moves = getPawnMoves(selected_tile_row, selected_tile_col);
                        break;
                }

                for (let i = 0; i < next_moves.length; ++i) {
                    if (next_moves[i].row === next_selected_tile_row && next_moves[i].col === next_selected_tile_col) {
                        // move player
                        worldMap[next_selected_tile_index] = worldMap[selected_tile_index];
                        worldMap[selected_tile_index] = WORLD_SPRITE.UNOCCUPIED;
                        break;
                    }
                }
                show_tile_selection = false;
            }
        } else if (spriteIsPlayer(worldMap[next_selected_tile_index])) {
            show_tile_selection = true;
            selected_tile_index = next_selected_tile_index;
            selected_tile_col = next_selected_tile_col;
            selected_tile_row = next_selected_tile_row;
        }
    });
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
    for (let colI = 0; colI < TILE_ROW; ++colI) {
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

function getRelativeMousePos(evt) {
    let rect = canvas.getBoundingClientRect();

    let mouseX = evt.clientX - rect.left;
    let mouseY = evt.clientY - rect.top;

    return {
        x: mouseX,
        y: mouseY
    };
}
