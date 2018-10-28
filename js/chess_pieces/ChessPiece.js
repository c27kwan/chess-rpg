class ChessPiece {
    constructor (hp, attack, defense) {
        this.maxHp = hp;
        this.hp = hp; // hard coded for now
        this.attack = attack;
        this.defense = defense;
    }

    static validMove(row, col) {
        if (row < 0 || row >= TILE_ROW || col < 0 || col >= TILE_COL) {
            return false;
        }
        let currTileIndex = tileIndexFromRowCol(row, col);
        return worldMap[currTileIndex] === WORLD_SPRITE.UNOCCUPIED;
    }

    static validAttack(row, col) {
        if (row < 0 || row >= TILE_ROW || col < 0 || col >= TILE_COL) {
            return false;
        }
        let currTileIndex = tileIndexFromRowCol(row, col);
        return currentTurnPlayer.isEnemy(worldMap[currTileIndex]);
    }

    getMoves(currRow, currCol) {
        throw new Error("Implementation missing");
    }

    getAttacks(currRow, currCol) {
        throw new Error("Implementation missing");
    }

    getCounterPosition(currRow, currCol, defenseRow, defenseCol) {
        return {row:currRow, col:currCol};
    }

}
