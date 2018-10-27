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
        return currentTurnPlayer.isEnemy(worldMap[currTileIndex]);
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