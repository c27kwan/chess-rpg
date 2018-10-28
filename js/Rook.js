function getRookMoves(currRow, currCol) {
    let possibleMoves = [];

    for (let rowI = currRow - 1; rowI >= 0; --rowI) {
        let currTileIndex = tileIndexFromRowCol(rowI, currCol);
        if (worldMap[currTileIndex] === WORLD_SPRITE.UNOCCUPIED) {
            possibleMoves.push({row: rowI, col: currCol});
            continue;
        } else if (currentTurnPlayer.isSprite(worldMap[currTileIndex])) {
            continue;
        }
        break;
    }

    for (let rowI = currRow + 1; rowI < TILE_ROW; ++rowI) {
        let currTileIndex = tileIndexFromRowCol(rowI, currCol);
        if (worldMap[currTileIndex] === WORLD_SPRITE.UNOCCUPIED) {
            possibleMoves.push({row: rowI, col: currCol});
            continue;
        } else if (currentTurnPlayer.isSprite(worldMap[currTileIndex])) {
            continue;
        }
        break;
    }

    for (let colI = currCol - 1; colI >= 0; --colI) {
        let currTileIndex = tileIndexFromRowCol(currRow, colI); // todo: optimize these calls
        if (worldMap[currTileIndex] === WORLD_SPRITE.UNOCCUPIED) {
            possibleMoves.push({row: currRow, col: colI});
            continue;
        } else if (currentTurnPlayer.isSprite(worldMap[currTileIndex])) {
            continue;
        }
        break;
    }

    for (let colI = currCol + 1; colI < TILE_COL; ++colI) {
        let currTileIndex = tileIndexFromRowCol(currRow, colI);
        if (worldMap[currTileIndex] === WORLD_SPRITE.UNOCCUPIED) {
            possibleMoves.push({row: currRow, col: colI});
            continue;
        } else if (currentTurnPlayer.isSprite(worldMap[currTileIndex])) {
            continue;
        }
        break;
    }

    return possibleMoves;
}

function getRookAttacks(currRow, currCol) {
    let possibleAttacks = [];

    for (let rowI = currRow - 1; rowI >= 0 ; --rowI) {
        let currTileIndex = tileIndexFromRowCol(rowI, currCol);
        if (currentTurnPlayer.isEnemy(worldMap[currTileIndex])) {
            possibleAttacks.push({row: rowI, col: currCol});
            break;
        }
    }
    for (let rowI = currRow + 1; rowI < TILE_ROW ; ++rowI) {
        let currTileIndex = tileIndexFromRowCol(rowI, currCol);
        if (currentTurnPlayer.isEnemy(worldMap[currTileIndex])) {
            possibleAttacks.push({row: rowI, col: currCol});
            break;
        }
    }

    for (let colI = currCol - 1; colI >= 0; --colI) {
        let currTileIndex = tileIndexFromRowCol(currRow, colI);
        if (currentTurnPlayer.isEnemy(worldMap[currTileIndex])) {
            possibleAttacks.push({row: currRow, col: colI});
            break;
        }
    }

    for (let colI = currCol + 1; colI < TILE_COL; ++colI) {
        let currTileIndex = tileIndexFromRowCol(currRow, colI);
        if (currentTurnPlayer.isEnemy(worldMap[currTileIndex])) {
            possibleAttacks.push({row: currRow, col: colI});
            break;
        }
    }
    return possibleAttacks;
}