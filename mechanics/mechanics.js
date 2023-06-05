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

// wie eine Figur aufgebaut sein wird:
// Array
// [ID, Typ, Farbe]

function generateChess() {
    // Funktion wird vermutlich noch umgeschrieben, um direkt ein Schachbrett mit Grundstellung zu generieren
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

function checkMove(board, pieceX, pieceY, newX, newY) {
    // Fallunterscheidung je nach Typ der Figur
    if(pieceX < 0 || pieceX > 7 || pieceY < 0 || pieceY > 7 || newX < 0 || newX > 7 || newY < 0 || newY > 7) {
        // ungültige Koordinaten
        return false;
    } else if(board[pieceY][pieceX] == "-") {
        // keine Figur auf dem Ursprungsfeld!
        return false;
    } else if(board[pieceY][pieceX][1] == "Koenig") {
        // COMING SOON
    } else if(board[pieceY][pieceX][1] == "Dame") {
        // COMING SOON
    } else if(board[pieceY][pieceX][1] == "Turm") {
        // COMING SOON
    } else if(board[pieceY][pieceX][1] == "Laeufer") {
        // COMING SOON
    } else if(board[pieceY][pieceX][1] == "Springer") {
        // COMING SOON
    } else if(board[pieceY][pieceX][1] == "Bauer") {
        // COMING SOON
    } else {
        alert("Programmierfehler in der checkMove-Funktion!");
        return false;
    }
}

function move(board, pieceX, pieceY, newX, newY) {
    // Vorher CHECK mit Funktion checkMove, ob Zug gültig ist!
    // wenn erfolgreich durchlaufen, dann bewegen
    // Unterer Code sollte funktionieren.

    if(checkMove(board, pieceX, pieceY, newX, newY)) {
        board[newY][newX] = board[pieceY][pieceX];
        board[pieceY][pieceX] = "-";
        return board;
    } else {
        return board;
    }
}