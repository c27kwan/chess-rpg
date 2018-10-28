class Queen extends ChessPiece {
    constructor() {
        super(5, 1, 0);
    }

    getMoves(currRow, currCol) {
        let verticalHorizontalMoves = Rook.getVerticalHorizontalMoves(currRow, currCol);
        let diagonalMoves = Bishop.getDiagonalMoves(currRow, currCol);
        return verticalHorizontalMoves.concat(diagonalMoves);
    }

    getAttacks(currRow, currCol) {
        let verticalHorizontalAttacks = Rook.getVerticalHorizontalAttacks(currRow, currCol);
        let diagonalAttacks = Bishop.getDiagonalAttacks(currRow, currCol);
        return verticalHorizontalAttacks.concat(diagonalAttacks);
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
        } else if (currRow < defenseRow && currCol > defenseCol){
            newRowPos = defenseRow - 1;
            newColPos = defenseCol + 1;
        } else if (currRow < defenseRow && currCol === defenseCol){
            newRowPos = defenseRow - 1;
        } else if (currRow > defenseRow && currCol === defenseCol){
            newRowPos = defenseRow + 1;
        } else if (currRow === defenseRow && currCol < defenseCol){
            newColPos = defenseCol - 1;
        } else {
            newColPos = defenseCol + 1;
        }

        return {row:newRowPos, col:newColPos};
    }
}