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
    let possibleMoves = [];
    if (currRow - 1 >= 0) {
        let forwardIndex = tileIndex(currRow - 1, currCol);
        if (worldMap[forwardIndex] === WORLD_SPRITE.UNOCCUPIED) {
            possibleMoves.push({row: currRow - 1, col: currCol})
        }
    }
    if (currRow + 1 < TILE_ROW) {
        let backwardIndex = tileIndex(currRow + 1, currCol);
        if (worldMap[backwardIndex] === WORLD_SPRITE.UNOCCUPIED) {
            possibleMoves.push({row: currRow + 1, col: currCol})
        }
    }
    return possibleMoves;
}

function getPawnAttacks(currRow, currCol) {
    function validAttack(row, col) {
        if (row < 0 || row >= TILE_ROW || col < 0 || col >= TILE_COL) {
            return false;
        }
        let currTileIndex = tileIndex(row, col);
        return spriteIsEnemy(worldMap[currTileIndex]);
    }

    let possibleAttacks = [];

    let possibleAttackTiles = [
        {row: currRow + 1, col: currCol + 1},
        {row: currRow + 1, col: currCol - 1},
        {row: currRow - 1, col: currCol + 1},
        {row: currRow - 1, col: currCol - 1}];

    for (let i = 0; i < possibleAttackTiles.length; ++i) {
        if (validAttack(possibleAttackTiles[i].row, possibleAttackTiles[i].col)) {
            possibleAttacks.push(possibleAttackTiles[i]);
        }
    }

    return possibleAttacks
}

function getRookMoves(currRow, currCol) {
    let possibleMoves = [];

    for (let rowI = currRow - 1; rowI >= 0; --rowI) {
        let currTileIndex = tileIndex(rowI, currCol);
        if (worldMap[currTileIndex] === WORLD_SPRITE.UNOCCUPIED) {
            possibleMoves.push({row: rowI, col: currCol});
            continue;
        } else if (spriteIsPlayer(worldMap[currTileIndex])) {
            continue;
        }
        break;
    }

    for (let rowI = currRow + 1; rowI < TILE_ROW; ++rowI) {
        let currTileIndex = tileIndex(rowI, currCol);
        if (worldMap[currTileIndex] === WORLD_SPRITE.UNOCCUPIED) {
            possibleMoves.push({row: rowI, col: currCol});
            continue;
        } else if (spriteIsPlayer(worldMap[currTileIndex])) {
            continue;
        }
        break;
    }

    for (let colI = currCol - 1; colI >= 0; --colI) {
        let currTileIndex = tileIndex(currRow, colI); // todo: optimize these calls
        if (worldMap[currTileIndex] === WORLD_SPRITE.UNOCCUPIED) {
            possibleMoves.push({row: currRow, col: colI});
            continue;
        } else if (spriteIsPlayer(worldMap[currTileIndex])) {
            continue;
        }
        break;
    }

    for (let colI = currCol + 1; colI < TILE_COL; ++colI) {
        let currTileIndex = tileIndex(currRow, colI);
        if (worldMap[currTileIndex] === WORLD_SPRITE.UNOCCUPIED) {
            possibleMoves.push({row: currRow, col: colI});
            continue;
        } else if (spriteIsPlayer(worldMap[currTileIndex])) {
            continue;
        }
        break;
    }

    return possibleMoves;
}

function getRookAttacks(currRow, currCol) {
    let possibleAttacks = [];

    for (let rowI = currRow - 1; rowI >= 0 ; --rowI) {
        let currTileIndex = tileIndex(rowI, currCol);
        if (spriteIsEnemy(worldMap[currTileIndex])) {
            possibleAttacks.push({row: rowI, col: currCol});
            break;
        }
    }
    for (let rowI = currRow + 1; rowI < TILE_ROW ; ++rowI) {
        let currTileIndex = tileIndex(rowI, currCol);
        if (spriteIsEnemy(worldMap[currTileIndex])) {
            possibleAttacks.push({row: rowI, col: currCol});
            break;
        }
    }

    for (let colI = currCol - 1; colI >= 0; --colI) {
        let currTileIndex = tileIndex(currRow, colI);
        if (spriteIsEnemy(worldMap[currTileIndex])) {
            possibleAttacks.push({row: currRow, col: colI});
            break;
        }
    }

    for (let colI = currCol + 1; colI < TILE_COL; ++colI) {
        let currTileIndex = tileIndex(currRow, colI);
        if (spriteIsEnemy(worldMap[currTileIndex])) {
            possibleAttacks.push({row: currRow, col: colI});
            break;
        }
    }
    return possibleAttacks;
}

