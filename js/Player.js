var player1 = new Player();
var player2 = new Player();
var currentTurnPlayer;


function setPlayersSprites(player1SpriteSet, player2SpriteSet) {
    player1.init(player1SpriteSet, player2SpriteSet);
    player2.init(player2SpriteSet, player1SpriteSet);
}


function ChessPiece() { // TODO: Make this a class and extend from it.
    this.init = function (sprite) {
        this.maxHp = 2;
        this.hp = 2; // hard coded for now
        this.attack = 1;
        this.defense = 0;
        this.sprite = sprite;
    }
}

function Player() {
    this.init = function (playerSpriteSet, enemySpriteSet) {
        this.playerName = playerSpriteSet.name;
        this.playerSprites = playerSpriteSet.sprites;
        this.enemySprites = enemySpriteSet.sprites;
        this.tileIndexToChessPiece = new Map();

        for (let i = 0; i < worldMap.length; ++i) {
            if (this.isSprite(worldMap[i])) {
                let chessPiece = new ChessPiece();
                chessPiece.init(worldMap[i], i);
                this.tileIndexToChessPiece.set(i, chessPiece);
            }
        }
    };

    this.isEnemy = function (sprite) {
        for (let i = 0; i < this.enemySprites.length; ++i) {
            if (this.enemySprites[i] === sprite) {
                return true;
            }
        }
        return false;
    };

    this.isSprite = function (sprite) {
        for (let i = 0; i < this.playerSprites.length; ++i) {
            if (this.playerSprites[i] === sprite) {
                return true;
            }
        }
        return false;
    };

    this.movePiece = function(fromTileIndex, toTileIndex) {
        if (fromTileIndex === toTileIndex) {
            return;
        }
        worldMap[toTileIndex] = worldMap[fromTileIndex];
        worldMap[fromTileIndex] = WORLD_SPRITE.UNOCCUPIED;
        let chessPiece = this.tileIndexToChessPiece.get(fromTileIndex);
        this.tileIndexToChessPiece.delete(fromTileIndex);
        this.tileIndexToChessPiece.set(toTileIndex, chessPiece);
    }
}