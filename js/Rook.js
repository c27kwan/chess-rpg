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