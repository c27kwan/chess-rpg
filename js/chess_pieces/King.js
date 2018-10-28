class King extends ChessPiece {
    constructor() {
        super(5, 2, 1);
    }

    getMoves(currRow, currCol) {
        let possibleMoveTiles = [
            {row: currRow, col: currCol + 1},
            {row: currRow, col: currCol - 1},
            {row: currRow + 1, col: currCol},
            {row: currRow + 1, col: currCol + 1},
            {row: currRow + 1, col: currCol - 1},
            {row: currRow - 1, col: currCol},
            {row: currRow - 1, col: currCol + 1},
            {row: currRow - 1, col: currCol - 1}
        ];

        let possibleMoves = [];
        for (let i = 0; i < possibleMoveTiles.length; ++i) {
            if (ChessPiece.validMove(possibleMoveTiles[i].row,possibleMoveTiles[i].col )) {
                possibleMoves.push(possibleMoveTiles[i]);
            }
        }

        return possibleMoves;
    }

    getAttacks(currRow, currCol) {
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
            if (ChessPiece.validAttack(possibleAttackTiles[i].row, possibleAttackTiles[i].col)) {
                possibleAttacks.push(possibleAttackTiles[i]);
            }
        }

        return possibleAttacks;
    }
}