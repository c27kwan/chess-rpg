var show_tile_selection = false;
var selected_tile_row = -1;
var selected_tile_col = -1;
var selected_tile_index = -1;

function getRelativeMousePos(evt) {
    let rect = canvas.getBoundingClientRect();

    let mouseX = evt.clientX - rect.left;
    let mouseY = evt.clientY - rect.top;

    return {
        x: mouseX,
        y: mouseY
    };
}

function handleTileSelection(evt) {
    let mousePos = getRelativeMousePos(evt);
    let tileInfo = tileIndexFromPixelCoord(mousePos.x, mousePos.y);
    let next_selected_tile_col = tileInfo.col;
    let next_selected_tile_row = tileInfo.row;
    let next_selected_tile_index = tileInfo.tileIndex;
    if (show_tile_selection) {
        console.log("selected tile [" + selected_tile_row + "," + selected_tile_col + "]" );
        console.log("next selected tile [" + next_selected_tile_row + "," + next_selected_tile_col + "]" );
        if (next_selected_tile_index === selected_tile_index) {
            // todo: show menu
        } else if (spriteIsPlayer(worldMap[next_selected_tile_index])) { // not the same chess piece, so just switch selection
            selected_tile_col = next_selected_tile_col;
            selected_tile_row = next_selected_tile_row;
            selected_tile_index = next_selected_tile_index;
        } else if (spriteIsEnemy(worldMap[next_selected_tile_index])) {
            // TODO: Check if valid ATTACK
        } else { // picked something that isn't occupied. ASSUMPTION: There isn't any other obstacle on map
            let next_moves = [];
            switch (worldMap[selected_tile_index]) { // CLASS INVARIANT: CAN ONLY SELECT PLAYERS
                case WORLD_SPRITE.PLAYER_ROOK:
                    next_moves = getRookMoves(selected_tile_row, selected_tile_col);
                    break;
                case WORLD_SPRITE.PLAYER_PAWN:
                    next_moves = getPawnMoves(selected_tile_row, selected_tile_col);
                    break;
            }

            for (let i = 0; i < next_moves.length; ++i) {
                if (next_moves[i].row === next_selected_tile_row && next_moves[i].col === next_selected_tile_col) {
                    // move player
                    worldMap[next_selected_tile_index] = worldMap[selected_tile_index];
                    worldMap[selected_tile_index] = WORLD_SPRITE.UNOCCUPIED;
                    break;
                }
            }
            show_tile_selection = false;
        }
    } else if (spriteIsPlayer(worldMap[next_selected_tile_index])) {
        show_tile_selection = true;
        selected_tile_index = next_selected_tile_index;
        selected_tile_col = next_selected_tile_col;
        selected_tile_row = next_selected_tile_row;
    }
}

function drawHint() {
    if (show_tile_selection) {
        colourRect(selected_tile_col * TILE_W, selected_tile_row * TILE_H, TILE_W, TILE_H, "yellow", 0.5);
        let moves;
        let attacks;
        switch (worldMap[selected_tile_index]) {
            case WORLD_SPRITE.PLAYER_PAWN:
                moves = getPawnMoves(selected_tile_row, selected_tile_col);
                attacks = []; // TODO
                break;
            case WORLD_SPRITE.PLAYER_ROOK:
                moves = getRookMoves(selected_tile_row, selected_tile_col);
                attacks = getRookAttacks(selected_tile_row, selected_tile_col);
                break;
            default:
                moves = []; // placeholders
                attacks = [];
        }
        for (let i = 0; i < moves.length; ++i) {
            let currTileIndex = tileIndex(moves[i].row, moves[i].col);
            if (worldMap[currTileIndex] === WORLD_SPRITE.UNOCCUPIED) {
                colourRect(moves[i].col * TILE_W, moves[i].row * TILE_H, TILE_W, TILE_H, "blue", 0.5);
            }
        }
        for (let j = 0; j < attacks.length; ++j) {
            colourRect(attacks[j].col * TILE_W, attacks[j].row * TILE_H, TILE_W, TILE_H, "red", 0.5);
        }
    }
}