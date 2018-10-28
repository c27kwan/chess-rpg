const FPS = 30;

var canvas = document.getElementById("gameCanvas");
var canvasContext = canvas.getContext("2d");
var gameEnded;

function drawGame() {
    drawChessBoard();
    drawHint();
    drawMap();
    drawHealthBar();
}


const HEALTH_BAR_GAP_W = 6, HEALTH_BAR_GAP_H = 1, HEALTH_BAR_H = 5;

function drawHealthBar() {
    function drawHPBarWithPercentage(value, key) {
        let tileInfo = getRowColFromTileIndex(key);
        let fullHpBar = TILE_W - HEALTH_BAR_GAP_W * 2;
        let percentHpLeft = Math.ceil(fullHpBar * (value.hp/value.maxHp));

        colourRect(tileInfo.col * TILE_W + HEALTH_BAR_GAP_W, (tileInfo.row  + 1) * TILE_H  - HEALTH_BAR_GAP_H - HEALTH_BAR_H, fullHpBar, HEALTH_BAR_H, "#400002", 1);
        colourRect(tileInfo.col * TILE_W + HEALTH_BAR_GAP_W, (tileInfo.row  + 1) * TILE_H  - HEALTH_BAR_GAP_H - HEALTH_BAR_H, percentHpLeft, HEALTH_BAR_H, "red", 1);
        // TODO:consider removing this so that it is only displayed highlighted
        drawText(value.hp, (tileInfo.col + 1) * TILE_W - HEALTH_BAR_GAP_W * 2, (tileInfo.row  + 1) * TILE_H  - HEALTH_BAR_GAP_H - HEALTH_BAR_H -1, "red");
    }
    player1.tileIndexToChessPiece.forEach(drawHPBarWithPercentage);
    player2.tileIndexToChessPiece.forEach(drawHPBarWithPercentage);
}



function startGame() {
    setInterval(function () {
        drawGame();
    }, 1000 / FPS);
}

function endGame() {
    alert(currentTurnPlayer.playerName + " wins!"); // todo: fully implement this so that it displays the move before the win message
    gameEnded = true;
}

function resetGame() {
    show_tile_selection = false;
    selectedTile = {row: -1, col: -1, tileIndex: -1};
    worldMap = [
        8, 8, 9, 9,10, 0, 0,12,11, 0, 0,10, 9, 9, 8, 8,
        7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        2, 2, 3, 3, 4, 0, 0, 5, 6, 0, 0, 4, 3, 3, 2, 2];
    currentTurnPlayer = player1;
    gameEnded = false;
}

window.onload = function () {
    resetGame();
    setPlayersSprites(SPRITE_SET[0], SPRITE_SET[1]);
    loadImages();
    canvas.addEventListener("mousedown", function (evt) {
        if (gameEnded) {
            resetGame();
        } else {
            handleTileSelection(evt);
        }
    });
};

function nextTurn() {
    currentTurnPlayer = (currentTurnPlayer === player1) ? player2 : player1;
}