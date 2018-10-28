class Rook extends ChessPiece {
    constructor() {
        super(4, 2, 0);
    }

    getMoves(currRow, currCol) {
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

    getAttacks(currRow, currCol) {
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

    getCounterPosition(currRow, currCol, defenseRow, defenseCol) {
        let newRowPos = currRow;
        let newColPos = currCol;

        if (currRow < defenseRow) {
            newRowPos = defenseRow - 1;
        } else if (currRow > defenseRow){
            newRowPos = defenseRow + 1;
        } else if (currCol < defenseCol) {
            newColPos = defenseCol - 1;
        } else {
            newColPos = defenseCol + 1;
        }

        return {row:newRowPos, col:newColPos};
    }
}