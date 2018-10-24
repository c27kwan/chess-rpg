var worldPics = [];
var picsToLoad;


function loadSprite(code, fileName) {
    worldPics[code] = document.createElement("img");
    if (isEnemy(code)) {
        worldPics[code].src = "images/purple/" + fileName;
    } else {
        worldPics[code].src = "images/green/" + fileName;
    }
    worldPics[code].onload = function () {
        --picsToLoad;
        if (picsToLoad === 0) {
            startGame();
        }
    };
}

function loadImages() {
    const images = [
        {name: WORLD_SPRITE.PLAYER_PAWN, fileName: "green_pawn.png"},
        {name: WORLD_SPRITE.PLAYER_ROOK, fileName: "green_rook.png"},
        {name: WORLD_SPRITE.PLAYER_KNIGHT, fileName: "green_knight.png"},
        {name: WORLD_SPRITE.PLAYER_BISHOP, fileName: "green_bishop.png"},
        {name: WORLD_SPRITE.PLAYER_KING, fileName: "green_king.png"},
        {name: WORLD_SPRITE.PLAYER_QUEEN, fileName: "green_queen.png"},

        {name: WORLD_SPRITE.ENEMY_PAWN, fileName: "purple_pawn.png"},
        {name: WORLD_SPRITE.ENEMY_ROOK, fileName: "purple_rook.png"},
        {name: WORLD_SPRITE.ENEMY_KNIGHT, fileName: "purple_knight.png"},
        {name: WORLD_SPRITE.ENEMY_BISHOP, fileName: "purple_bishop.png"},
        {name: WORLD_SPRITE.ENEMY_KING, fileName: "purple_king.png"},
        {name: WORLD_SPRITE.ENEMY_QUEEN, fileName: "purple_queen.png"}
    ];

    picsToLoad = images.length;

    for (let i = 0; i < images.length; ++i) {
        loadSprite(images[i].name, images[i].fileName);
    }
}