class Pawn extends ChessPiece {
    constructor() {
        super(2, 1, 0);
    }

    getMoves(currRow, currCol) {
        let possibleMoves = [];
        if (currRow - 1 >= 0) {
            let forwardIndex = tileIndexFromRowCol(currRow - 1, currCol);
            if (worldMap[forwardIndex] === WORLD_SPRITE.UNOCCUPIED) {
                possibleMoves.push({row: currRow - 1, col: currCol})
            }
        }
        if (currRow + 1 < TILE_ROW) {
            let backwardIndex = tileIndexFromRowCol(currRow + 1, currCol);
            if (worldMap[backwardIndex] === WORLD_SPRITE.UNOCCUPIED) {
                possibleMoves.push({row: currRow + 1, col: currCol})
            }
        }
        return possibleMoves;
    }

    getAttacks(currRow, currCol) {
        let possibleAttacks = [];

        let possibleAttackTiles = [
            {row: currRow + 1, col: currCol + 1},
            {row: currRow + 1, col: currCol - 1},
            {row: currRow - 1, col: currCol + 1},
            {row: currRow - 1, col: currCol - 1}];

        for (let i = 0; i < possibleAttackTiles.length; ++i) {
            if (ChessPiece.validAttack(possibleAttackTiles[i].row, possibleAttackTiles[i].col)) {
                possibleAttacks.push(possibleAttackTiles[i]);
            }
        }

        return possibleAttacks;
    }
}