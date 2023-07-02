export function compareArrBoards(board1, board2) {
    let flagArr = true;

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

export function compareDictBoards(board1, board2) {
    let flagDict = true;

    for(let i = 1; i < 9; i++) {
        for(let j = 0; j < 8; j++) {
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

            let bezeichner = "" + b + i.toString;

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