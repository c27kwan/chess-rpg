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
    let next_attacks = currentTurnPlayer.tileIndexToChessPiece.get(selectedTile.tileIndex).getAttacks(selectedTile.row, selectedTile.col);
    return next_attacks;
}

function getPossibleMoves() {
    let next_moves = currentTurnPlayer.tileIndexToChessPiece.get(selectedTile.tileIndex).getMoves(selectedTile.row, selectedTile.col);
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
                        if (defendingPiece instanceof King) {
                            endGame();
                        } else {
                            nextTurn();
                        }
                    } else {
                        // Move chess piece to distance -1 of target.  You can move a piece to the same place.
                        let newTilePosition = attackingPiece.getCounterPosition(selectedTile.row, selectedTile.col, nextTile.row, nextTile.col);
                        let newRowPos = newTilePosition.row;
                        let newColPos = newTilePosition.col;
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