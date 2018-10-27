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
}