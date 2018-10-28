var show_tile_selection;
var selectedTile;

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
        case WORLD_SPRITE.ENEMY_ROOK:
            next_attacks = getRookAttacks(selectedTile.row, selectedTile.col);
            break;
        case WORLD_SPRITE.PLAYER_PAWN:
        case WORLD_SPRITE.ENEMY_PAWN:
            next_attacks = getPawnAttacks(selectedTile.row, selectedTile.col);
            break;
        case WORLD_SPRITE.PLAYER_KING:
        case WORLD_SPRITE.ENEMY_KING:
            next_attacks = getKingAttacks(selectedTile.row, selectedTile.col);
            break;
    }
    return next_attacks;
}

function getPossibleMoves() {
    let next_moves = [];
    switch (worldMap[selectedTile.tileIndex]) { // CLASS INVARIANT: CAN ONLY SELECT PLAYERS
        case WORLD_SPRITE.PLAYER_ROOK:
        case WORLD_SPRITE.ENEMY_ROOK:
            next_moves = getRookMoves(selectedTile.row, selectedTile.col);
            break;
        case WORLD_SPRITE.PLAYER_PAWN:
        case WORLD_SPRITE.ENEMY_PAWN:
            next_moves = getPawnMoves(selectedTile.row, selectedTile.col);
            break;
        case WORLD_SPRITE.PLAYER_KING:
        case WORLD_SPRITE.ENEMY_KING:
            next_moves = getKingMoves(selectedTile.row, selectedTile.col);
            break;
    }
    return next_moves;
}

function handleTileSelection(evt) {
    let mousePos = getRelativeMousePos(evt);
    let nextTile = tileIndexFromPixelCoord(mousePos.x, mousePos.y);
    if (show_tile_selection) {
        if (nextTile.tileIndex === selectedTile.tileIndex) {
            // todo: show menu
        } else if (currentTurnPlayer.isSprite(worldMap[nextTile.tileIndex])) { // not the same chess piece, so just switch selection
            selectedTile = nextTile;
        } else if (currentTurnPlayer.isEnemy(worldMap[nextTile.tileIndex])) {
            let next_attacks = getPossibleAttacks();
            for (let i = 0; i < next_attacks.length; ++i) {
                if (next_attacks[i].row === nextTile.row && next_attacks[i].col === nextTile.col) {
                    // attack
                    let attackingPiece = currentTurnPlayer.tileIndexToChessPiece.get(selectedTile.tileIndex);
                    let defendingPlayer = (currentTurnPlayer === player1) ? player2 : player1;
                    let defendingPiece = defendingPlayer.tileIndexToChessPiece.get(nextTile.tileIndex);
                    let damage = attackingPiece.attack - defendingPiece.defense;
                    defendingPiece.hp -= damage;
                    // TODO: Draw damage (below line doesn't work because it gets drawn over)
                    // drawText(damage, nextTile.col * TILE_W, nextTile.row * TILE_H, "red");

                    if (defendingPiece.hp <= 0 ) { // enemy dies
                        defendingPlayer.tileIndexToChessPiece.delete(nextTile.tileIndex);
                        currentTurnPlayer.movePiece(selectedTile.tileIndex, nextTile.tileIndex);
                        if (defendingPiece.sprite === WORLD_SPRITE.ENEMY_KING || defendingPiece.sprite === WORLD_SPRITE.PLAYER_KING) {
                            endGame();
                        } else {
                            nextTurn();
                        }
                    } else {
                        // Move chess piece to distance -1 of target.  CLASS INVARIANT: you can move a piece to itself.
                        let newRowPos = selectedTile.row;
                        let newColPos = selectedTile.col;
                        switch (worldMap[selectedTile.tileIndex]) {
                            case WORLD_SPRITE.PLAYER_KING:
                            case WORLD_SPRITE.ENEMY_KING:
                            case WORLD_SPRITE.PLAYER_PAWN:
                            case WORLD_SPRITE.ENEMY_PAWN:
                                // stay where you are
                                break;
                            case WORLD_SPRITE.PLAYER_ROOK:
                            case WORLD_SPRITE.ENEMY_ROOK:
                                if (selectedTile.row < nextTile.row) {
                                    newRowPos = nextTile.row - 1;
                                } else if (selectedTile.row > nextTile.row){
                                    newRowPos = nextTile.row + 1;
                                } else if (selectedTile.col < nextTile.col) {
                                    newColPos = nextTile.col - 1;
                                } else {
                                    newColPos = nextTile.col + 1;
                                }
                                break;
                        }
                        currentTurnPlayer.movePiece(selectedTile.tileIndex, tileIndexFromRowCol(newRowPos, newColPos));
                        // TODO: Defending piece counters if it doesn't die and attackingPiece is in range of defending piece.
                        nextTurn();
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
                    currentTurnPlayer.movePiece(selectedTile.tileIndex, nextTile.tileIndex);
                    nextTurn();
                    break;
                }
            }
            // todo: show menu
            show_tile_selection = false; // remove when this line if show menu
        }
    } else if (currentTurnPlayer.isSprite(worldMap[nextTile.tileIndex])) {
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