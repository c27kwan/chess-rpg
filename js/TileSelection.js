var show_tile_selection = false;
var selectedTile = {row: -1, col: -1, tileIndex: -1};

function getRelativeMousePos(evt) {
    let rect = canvas.getBoundingClientRect();

    let mouseX = evt.clientX - rect.left;
    let mouseY = evt.clientY - rect.top;

    return {
        x: mouseX,
        y: mouseY
    };
}

function getPossibleAttacks() {
    let next_attacks = [];
    switch (worldMap[selectedTile.tileIndex]) { // CLASS INVARIANT: CAN ONLY SELECT PLAYERS
        case WORLD_SPRITE.PLAYER_ROOK:
            next_attacks = getRookAttacks(selectedTile.row, selectedTile.col);
            break;
        case WORLD_SPRITE.PLAYER_PAWN:
            next_attacks = getPawnAttacks(selectedTile.row, selectedTile.col);
            break;
        case WORLD_SPRITE.PLAYER_KING:
            next_attacks = getKingAttacks(selectedTile.row, selectedTile.col);
            break;
    }
    return next_attacks;
}

function getPossibleMoves() {
    let next_moves = [];
    switch (worldMap[selectedTile.tileIndex]) { // CLASS INVARIANT: CAN ONLY SELECT PLAYERS
        case WORLD_SPRITE.PLAYER_ROOK:
            next_moves = getRookMoves(selectedTile.row, selectedTile.col);
            break;
        case WORLD_SPRITE.PLAYER_PAWN:
            next_moves = getPawnMoves(selectedTile.row, selectedTile.col);
            break;
        case WORLD_SPRITE.PLAYER_KING:
            next_moves = getKingMoves(selectedTile.row, selectedTile.col);
            break;
    }
    return next_moves;
}

function handleTileSelection(evt) {
    let mousePos = getRelativeMousePos(evt);
    let nextTile = tileIndexFromPixelCoord(mousePos.x, mousePos.y);
    if (show_tile_selection) {
        console.log("selected tile [" + selectedTile.row + "," + selectedTile.col + "]" );
        console.log("next selected tile [" + nextTile.row + "," + nextTile.col + "]" );
        if (nextTile.tileIndex === selectedTile.tileIndex) {
            // todo: show menu
        } else if (spriteIsPlayer(worldMap[nextTile.tileIndex])) { // not the same chess piece, so just switch selection
            selectedTile = nextTile;
        } else if (spriteIsEnemy(worldMap[nextTile.tileIndex])) {
            let next_attacks = getPossibleAttacks();
            for (let i = 0; i < next_attacks.length; ++i) {
                if (next_attacks[i].row === nextTile.row && next_attacks[i].col === nextTile.col) {
                    // attack
                    // only if enemy dies
                    let removedChessPiece = worldMap[nextTile.tileIndex];
                    worldMap[nextTile.tileIndex] = worldMap[selectedTile.tileIndex];
                    worldMap[selectedTile.tileIndex] = WORLD_SPRITE.UNOCCUPIED;
                    if (removedChessPiece === WORLD_SPRITE.ENEMY_KING) {
                        endGame();
                    }
                    break;
                }
            }
            show_tile_selection = false;
        } else { // picked something that isn't occupied. ASSUMPTION: There isn't any other obstacle on map
            let next_moves = getPossibleMoves();
            for (let i = 0; i < next_moves.length; ++i) {
                if (next_moves[i].row === nextTile.row && next_moves[i].col === nextTile.col) {
                    // move player
                    worldMap[nextTile.tileIndex] = worldMap[selectedTile.tileIndex];
                    worldMap[selectedTile.tileIndex] = WORLD_SPRITE.UNOCCUPIED;
                    break;
                }
            }
            // todo: show menu
            show_tile_selection = false; // remove when this line if show menu
        }
    } else if (spriteIsPlayer(worldMap[nextTile.tileIndex])) {
        show_tile_selection = true;
        selectedTile = nextTile;
    }
}

function drawHint() {
    if (show_tile_selection) {
        colourRect(selectedTile.col * TILE_W, selectedTile.row * TILE_H, TILE_W, TILE_H, "yellow", 0.5);
        let moves = getPossibleMoves();
        let attacks = getPossibleAttacks();
        for (let i = 0; i < moves.length; ++i) {
            colourRect(moves[i].col * TILE_W, moves[i].row * TILE_H, TILE_W, TILE_H, "blue", 0.5);
        }
        for (let j = 0; j < attacks.length; ++j) {
            colourRect(attacks[j].col * TILE_W, attacks[j].row * TILE_H, TILE_W, TILE_H, "red", 0.5);
        }
    }
}