function convertColumn(column) {
    if(column == "A" || column == "a") {
        return 0;
    } else if(column == "B" || column == "b") {
        return 1;
    } else if(column == "C" || column == "c") {
        return 2;
    } else if(column == "D" || column == "d") {
        return 3;
    } else if(column == "E" || column == "e") {
        return 4;
    } else if(column == "F" || column == "f") {
        return 5;
    } else if(column == "G" || column == "g") {
        return 6;
    } else if(column == "H" || column == "h") {
        return 7;
    }
}

function generateChess() {
    let schachbrett = [];
    for(let i = 0; i < 8; i++) {
        let unterbrett = [];
        for(let j = 0; j < 8; j++) {
            unterbrett.push("-");
        }
        schachbrett.push(unterbrett);
    }
    return schachbrett;
}