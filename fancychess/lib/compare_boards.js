// Funktion, um zwei Schachbretter in Array-Form (zweidimensionales Array) zu vergleichen
export function compareArrBoards(board1, board2) {
    let flagArr = true;

    // elementweiser Abgleich
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            if(board1[i][j] != board2[i][j]) {
                flagArr = false;
            }
        }
    }

    if(flagArr) {
        return true;
    } else {
        return false;
    }
}

// Funktion, um zwei Schachbretter in Dictionary-Form zu vergleichen
export function compareDictBoards(board1, board2) {
    let flagDict = true;

    // durch jedes Element durchiterieren
    for(let i = 1; i < 9; i++) {
        for(let j = 0; j < 8; j++) {
            // Bezeichner zusammenbauen: von a1 bis h8
            let b = "";

            if(j == 0) {
                b = "a";
            } else if(j == 1) {
                b = "b";
            } else if(j == 2) {
                b = "c";
            } else if(j == 3) {
                b = "d";
            } else if(j == 4) {
                b = "e";
            } else if(j == 5) {
                b = "f";
            } else if(j == 6) {
                b = "g";
            } else if(j == 7) {
                b = "h";
            }

            let bezeichner = "" + b + i.toString; // Zusammenstellung des Bezeichners

            // Vergleich der beiden Boards
            // Wenn auch nur einmal eine Ungleichheit auftritt, sind die Bretter generell nicht gleich.
            if(board1[bezeichner] != board2[bezeichner]) {
                flagDict = false;
            }
        }
    }

    if(flagDict) {
        return true;
    } else {
        return false;
    }
}