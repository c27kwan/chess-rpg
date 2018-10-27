var worldPics = [];
var picsToLoad;


function loadSprite(code, fileName) {
    worldPics[code] = document.createElement("img");
    worldPics[code].src = "images/" + fileName;
    worldPics[code].onload = function () {
        --picsToLoad;
        if (picsToLoad === 0) {
            startGame();
        }
    };
}

function loadImages() {
    const images = [
        {name: WORLD_SPRITE.PLAYER_PAWN, fileName: "green/green_pawn.png"},
        {name: WORLD_SPRITE.PLAYER_ROOK, fileName: "green/green_rook.png"},
        {name: WORLD_SPRITE.PLAYER_KNIGHT, fileName: "green/green_knight.png"},
        {name: WORLD_SPRITE.PLAYER_BISHOP, fileName: "green/green_bishop.png"},
        {name: WORLD_SPRITE.PLAYER_KING, fileName: "green/green_king.png"},
        {name: WORLD_SPRITE.PLAYER_QUEEN, fileName: "green/green_queen.png"},

        {name: WORLD_SPRITE.ENEMY_PAWN, fileName: "purple/purple_pawn.png"},
        {name: WORLD_SPRITE.ENEMY_ROOK, fileName: "purple/purple_rook.png"},
        {name: WORLD_SPRITE.ENEMY_KNIGHT, fileName: "purple/purple_knight.png"},
        {name: WORLD_SPRITE.ENEMY_BISHOP, fileName: "purple/purple_bishop.png"},
        {name: WORLD_SPRITE.ENEMY_KING, fileName: "purple/purple_king.png"},
        {name: WORLD_SPRITE.ENEMY_QUEEN, fileName: "purple/purple_queen.png"}
    ];

    picsToLoad = images.length;

    for (let i = 0; i < images.length; ++i) {
        loadSprite(images[i].name, images[i].fileName);
    }
}