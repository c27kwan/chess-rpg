var player1 = new Player();
var player2 = new Player();
var currentTurnPlayer;


function setPlayersSprites(player1SpriteSet, player2SpriteSet) {
    player1.init(player1SpriteSet, player2SpriteSet);
    player2.init(player2SpriteSet, player1SpriteSet);
}

function Player() {
    this.init = function (playerSpriteSet, enemySpriteSet) {
        this.playerName = playerSpriteSet.name;
        this.playerSprites = playerSpriteSet.sprites;
        this.enemySprites = enemySpriteSet.sprites;
        this.tileIndexToChessPiece = new Map(); // TODO: Consider moving this to WorldMap instead.

        for (let i = 0; i < worldMap.length; ++i) {
            if (this.isSprite(worldMap[i])) {
                let chessPiece;
                switch (worldMap[i]) {
                    case WORLD_SPRITE.PLAYER_PAWN:
                    case WORLD_SPRITE.ENEMY_PAWN:
                        chessPiece = new Pawn();
                        break;
                    case WORLD_SPRITE.PLAYER_ROOK:
                    case WORLD_SPRITE.ENEMY_ROOK:
                        chessPiece = new Rook();
                        break;
                    case WORLD_SPRITE.PLAYER_KNIGHT:
                    case WORLD_SPRITE.ENEMY_KNIGHT:
                        chessPiece = new Knight();
                        break;
                    case WORLD_SPRITE.PLAYER_BISHOP:
                    case WORLD_SPRITE.ENEMY_BISHOP:
                        chessPiece = new Bishop();
                        break;
                    case WORLD_SPRITE.PLAYER_KING:
                    case WORLD_SPRITE.ENEMY_KING:
                        chessPiece = new King();
                        break;
                    case WORLD_SPRITE.PLAYER_QUEEN:
                    case WORLD_SPRITE.ENEMY_QUEEN:
                        chessPiece = new Queen();
                        break;
                }
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