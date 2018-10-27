function getKingMoves(currRow, currCol) {
    function validMove(row, col) {
        if (row < 0 || row >= TILE_ROW || col < 0 || col >= TILE_COL) {
            return false;
        }
        let currTileIndex = tileIndex(row, col);
        return worldMap[currTileIndex] === WORLD_SPRITE.UNOCCUPIED;
    }

    let possibleMoveTiles = [
        {row: currRow, col: currCol + 1},
        {row: currRow, col: currCol - 1},
        {row: currRow + 1, col: currCol},
        {row: currRow + 1, col: currCol + 1},
        {row: currRow + 1, col: currCol - 1},
        {row: currRow - 1, col: currCol},
        {row: currRow - 1, col: currCol + 1},
        {row: currRow - 1, col: currCol - 1},
    ];

    let possibleMoves = [];
    for (let i = 0; i < possibleMoveTiles.length; ++i) {
        if (validMove(possibleMoveTiles[i].row,possibleMoveTiles[i].col )) {
            possibleMoves.push(possibleMoveTiles[i]);
        }
    }

    return possibleMoves;
}

function getKingAttacks(currRow, currCol) {
    function validAttack(row, col) {
        if (row < 0 || row >= TILE_ROW || col < 0 || col >= TILE_COL) {
            return false;
        }
        let currTileIndex = tileIndex(row, col);
        return spriteIsEnemy(worldMap[currTileIndex]);
    }

    let possibleAttackTiles = [
        {row: currRow, col: currCol + 1},
        {row: currRow, col: currCol - 1},
        {row: currRow + 1, col: currCol},
        {row: currRow + 1, col: currCol + 1},
        {row: currRow + 1, col: currCol - 1},
        {row: currRow - 1, col: currCol},
        {row: currRow - 1, col: currCol + 1},
        {row: currRow - 1, col: currCol - 1},
    ];

    let possibleAttacks = [];

    for (let i = 0; i < possibleAttackTiles.length; ++i) {
        if (validAttack(possibleAttackTiles[i].row, possibleAttackTiles[i].col)) {
            possibleAttacks.push(possibleAttackTiles[i]);
        }
    }

    return possibleAttacks;
}