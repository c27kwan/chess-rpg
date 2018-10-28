const FPS = 30;

var canvas = document.getElementById("gameCanvas");
var canvasContext = canvas.getContext("2d");
var gameEnded;
var showStatNumbers;

function drawGame() {
    drawChessBoard();
    drawHint();
    drawMap();
    drawUnitStats();
}


const HEALTH_BAR_GAP_W = 6, HEALTH_BAR_GAP_H = 1, HEALTH_BAR_H = 5;
const HEALTH_BAR_BORDER_GAP = 2;
const FONT_SIZE_GAP_H = 8, FONT_SIZE_GAP_W = 8;


function drawUnitStats() {
    function drawHPBarWithStat(row, col, hp, maxHp) {
        let fullHpBar = TILE_W - HEALTH_BAR_GAP_W * 2;
        let percentHpLeft = Math.ceil(fullHpBar * (hp/maxHp));

        if (showStatNumbers) {
            colourRect(col * TILE_W + HEALTH_BAR_BORDER_GAP, (row  + 1) * TILE_H  - HEALTH_BAR_GAP_H - HEALTH_BAR_H, fullHpBar, HEALTH_BAR_H, "#400002", 1);
            colourRect(col * TILE_W + HEALTH_BAR_BORDER_GAP, (row  + 1) * TILE_H  - HEALTH_BAR_GAP_H - HEALTH_BAR_H, percentHpLeft, HEALTH_BAR_H, "red", 1);
            drawText(hp, (col + 1) * TILE_W - HEALTH_BAR_GAP_W - HEALTH_BAR_BORDER_GAP, (row  + 1) * TILE_H  - HEALTH_BAR_GAP_H, "red");
        } else {
            colourRect(col * TILE_W + HEALTH_BAR_GAP_W, (row  + 1) * TILE_H  - HEALTH_BAR_GAP_H - HEALTH_BAR_H, fullHpBar, HEALTH_BAR_H, "#400002", 1);
            colourRect(col * TILE_W + HEALTH_BAR_GAP_W, (row  + 1) * TILE_H  - HEALTH_BAR_GAP_H - HEALTH_BAR_H, percentHpLeft, HEALTH_BAR_H, "red", 1);
        }
    }
    function drawAttackAndDefense(row, col, atk, def) {
        drawText("A:" + atk, (col) * TILE_W + HEALTH_BAR_BORDER_GAP , (row )* TILE_H + FONT_SIZE_GAP_H, "blue");
        drawText("D:" + def, (col + 1) * TILE_W - HEALTH_BAR_GAP_W - HEALTH_BAR_BORDER_GAP - FONT_SIZE_GAP_W, (row ) * TILE_H + FONT_SIZE_GAP_H, "blue");
    }

    function drawStats(value, key) {
        let tileInfo = getRowColFromTileIndex(key);
        drawHPBarWithStat(tileInfo.row, tileInfo.col, value.hp, value.maxHp);
        if (showStatNumbers) {
            drawAttackAndDefense(tileInfo.row, tileInfo.col, value.attack, value.defense);
        }
    }

    player1.tileIndexToChessPiece.forEach(drawStats);
    player2.tileIndexToChessPiece.forEach(drawStats);
}

function toggleStatDisplay() {
    showStatNumbers = !showStatNumbers;
}

function startGame() {
    setInterval(function () {
        drawGame();
    }, 1000 / FPS);
}

function endGame() {
    // todo: replace this so that it displays the move before the win message
    alert(currentTurnPlayer.playerName + " wins! Click on board to start a new game.");
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
    player1.setChessPieces();
    player2.setChessPieces();
}

window.onload = function () {
    setPlayersSprites(SPRITE_SET[0], SPRITE_SET[1]);
    resetGame();
    loadImages();

    document.getElementById("toggleStatDisplayButton").addEventListener("click", toggleStatDisplay);

    canvas.addEventListener("mousedown", function (evt) {
        if (gameEnded) {
            resetGame();
        } else {
            handleTileSelection(evt);
        }
    });
};

function nextTurn() {
    currentTurnPlayer = getNextTurnPlayer();
}