class Knight extends ChessPiece {
    constructor() {
        super(4, 1, 1);
    }

    getPossibleMoveTiles(currRow, currCol) {
        return [
            {row: currRow + 2, col: currCol + 1},
            {row: currRow + 2, col: currCol - 1},
            {row: currRow + 1, col: currCol - 2},
            {row: currRow + 1, col: currCol + 2},
            {row: currRow - 1, col: currCol - 2},
            {row: currRow - 1, col: currCol + 2},
            {row: currRow - 2, col: currCol + 1},
            {row: currRow - 2, col: currCol - 1}
        ];
    }

    getMoves(currRow, currCol) {
        let possibleMoveTiles = this.getPossibleMoveTiles(currRow, currCol);

        let possibleMoves = [];
        for (let i = 0; i < possibleMoveTiles.length; ++i) {
            if (ChessPiece.validMove(possibleMoveTiles[i].row,possibleMoveTiles[i].col )) {
                possibleMoves.push(possibleMoveTiles[i]);
            }
        }

        return possibleMoves;
    }

    getAttacks(currRow, currCol) {
        let possibleAttackTiles = this.getPossibleMoveTiles(currRow, currCol);

        let possibleAttacks = [];

        for (let i = 0; i < possibleAttackTiles.length; ++i) {
            if (ChessPiece.validAttack(possibleAttackTiles[i].row, possibleAttackTiles[i].col)) {
                possibleAttacks.push(possibleAttackTiles[i]);
            }
        }

        return possibleAttacks;
    }
}