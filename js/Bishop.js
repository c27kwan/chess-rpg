class Bishop extends ChessPiece {
    constructor() {
        super(3, 1, 0);
    }

    static getDiagonalMoves(currRow, currCol) {
        let possibleMoves = [];
        let rowI = currRow + 1, colI = currCol + 1;
        while (rowI < TILE_ROW && colI < TILE_COL) {
            let currTileIndex = tileIndexFromRowCol(rowI, colI);
            if (worldMap[currTileIndex] === WORLD_SPRITE.UNOCCUPIED) {
                possibleMoves.push({row: rowI, col: colI});
            } else if (!currentTurnPlayer.isSprite(worldMap[currTileIndex])) {
                break;
            }
            ++rowI;
            ++colI;
        }

        let rowJ = currRow + 1, colJ = currCol - 1;
        while (rowJ < TILE_ROW && colJ >= 0) {
            let currTileIndex = tileIndexFromRowCol(rowJ, colJ);
            if (worldMap[currTileIndex] === WORLD_SPRITE.UNOCCUPIED) {
                possibleMoves.push({row: rowJ, col: colJ});
            } else if (!currentTurnPlayer.isSprite(worldMap[currTileIndex])) {
                break;
            }
            ++rowJ;
            --colJ;
        }

        let rowK = currRow - 1, colK = currCol - 1;
        while (rowK >= 0 && colK >= 0) {
            let currTileIndex = tileIndexFromRowCol(rowK, colK);
            if (worldMap[currTileIndex] === WORLD_SPRITE.UNOCCUPIED) {
                possibleMoves.push({row: rowK, col: colK});
            } else if (!currentTurnPlayer.isSprite(worldMap[currTileIndex])) {
                break;
            }
            --rowK;
            --colK;
        }

        let rowL = currRow - 1, colL = currCol + 1;
        while (rowL >= 0 && colL < TILE_COL) {
            let currTileIndex = tileIndexFromRowCol(rowL, colL);
            if (worldMap[currTileIndex] === WORLD_SPRITE.UNOCCUPIED) {
                possibleMoves.push({row: rowL, col: colL});
            } else if (!currentTurnPlayer.isSprite(worldMap[currTileIndex])) {
                break;
            }
            --rowL;
            ++colL;
        }

        return possibleMoves;
    }

    static getDiagonalAttacks(currRow, currCol) {
        let possibleAttacks = [];

        let rowI = currRow + 1, colI = currCol + 1;
        while (rowI < TILE_ROW && colI < TILE_COL) {
            let currTileIndex = tileIndexFromRowCol(rowI, colI);
            if (currentTurnPlayer.isEnemy(worldMap[currTileIndex])) {
                possibleAttacks.push({row: rowI, col: colI});
                break;
            }
            ++rowI;
            ++colI;
        }

        let rowJ = currRow + 1, colJ = currCol - 1;
        while (rowJ < TILE_ROW && colJ >= 0) {
            let currTileIndex = tileIndexFromRowCol(rowJ, colJ);
            if (currentTurnPlayer.isEnemy(worldMap[currTileIndex])) {
                possibleAttacks.push({row: rowJ, col: colJ});
                break;
            }
            ++rowJ;
            --colJ;
        }

        let rowK = currRow - 1, colK = currCol - 1;
        while (rowK >= 0 && colK >= 0) {
            let currTileIndex = tileIndexFromRowCol(rowK, colK);
            if (currentTurnPlayer.isEnemy(worldMap[currTileIndex])) {
                possibleAttacks.push({row: rowK, col: colK});
                break;
            }
            --rowK;
            --colK;
        }

        let rowL = currRow - 1, colL = currCol + 1;
        while (rowL >= 0 && colL < TILE_COL) {
            let currTileIndex = tileIndexFromRowCol(rowL, colL);
            if (currentTurnPlayer.isEnemy(worldMap[currTileIndex])) {
                possibleAttacks.push({row: rowL, col: colL});
                break;
            }
            --rowL;
            ++colL;
        }

        return possibleAttacks;
    }

    getMoves(currRow, currCol) {
        return Bishop.getDiagonalMoves(currRow, currCol);
    }

    getAttacks(currRow, currCol) {
        return Bishop.getDiagonalAttacks(currRow, currCol);
    }

    getCounterPosition(currRow, currCol, defenseRow, defenseCol) {
        let newRowPos = currRow;
        let newColPos = currCol;

        if (currRow < defenseRow && currCol < defenseCol) {
            newRowPos = defenseRow - 1;
            newColPos = defenseCol - 1;
        } else if (currRow > defenseRow && currCol < defenseCol) {
            newRowPos = defenseRow + 1;
            newColPos = defenseCol - 1;
        } else if (currRow > defenseRow && currCol > defenseCol) {
            newRowPos = defenseRow + 1;
            newColPos = defenseCol + 1;
        } else {
            newRowPos = defenseRow - 1;
            newColPos = defenseCol + 1;
        }

        return {row:newRowPos, col:newColPos};
    }
}