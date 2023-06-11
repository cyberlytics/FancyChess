let schwarzerKoenig = [-1, -1];
let weisserKoenig = [-1, -1];

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

// COMING SOON
// Funktion zum Überprüfen der Bedrohung! (englisch "being under check")
function checkCheck(board, X, Y) {
    // COMING SOON
    return false;
}

// COMING SOON
// Funktion zum Überprüfen, ob ein bedrohter König die Bedrohung durch einen Halbzug abwehren kann (wenn nein, ist er matt gesetzt und das Spiel ist vorbei!)
function checkCheckmate(board, X, Y) {
    // COMING SOON
    return false;
}

// Rochade NOCH NICHT IMPLEMENTIERT!!!
function checkMove(board, pieceX, pieceY, newX, newY) {
    // Fallunterscheidung je nach Typ der Figur
    if(pieceX == newX && pieceY == newY) {
        // keine Bewegung, somit ungueltig, da Zugpflicht herrscht!
        return false;
    } else if(pieceX < 0 || pieceX > 7 || pieceY < 0 || pieceY > 7 || newX < 0 || newX > 7 || newY < 0 || newY > 7) {
        // ungueltige Koordinaten
        return false;
    } else if(board[pieceY][pieceX] == "-") {
        // keine Figur auf dem Ursprungsfeld!
        return false;
    } else if(board[pieceY][pieceX][1] == "Koenig") {
        if((newX == pieceX + 1 && newY == pieceY) || (newX == pieceX - 1 && newY == pieceY) || (newX == pieceX && newY == pieceY + 1) || (newX == pieceX && newY == pieceY - 1) || (newX == pieceX + 1 && newY == pieceY + 1) || (newX == pieceX + 1 && newY == pieceY - 1) || (newX == pieceX - 1 && newY == pieceY + 1) || (newX == pieceX - 1 && newY == pieceY - 1)) {
            // Zielfeld gueltig - liegt im Bewegungsbereich
            if(!checkCheck(board, newX, newY)) {
                // Koenig geht auf kein bedrohtes Feld - dies darf er naemlich nicht!
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else if(board[pieceY][pieceX][1] == "Dame") {
        if(pieceX == newX) {
            if(pieceY > newY) {
                let tmpy = pieceY;
                pieceY = newY;
                newY = tmpy;
                // jetzt ist pieceY kleiner
            }
            // diese for-Schleife beachtet nur die Felder dazwischen, nicht Quell- und Zielfeld selber!
            for(let y = pieceY + 1; y < newY; y++) {
                if(board[y][pieceX] != "-") {
                    // wenn irgendwo eine andere Figur ist, ist der Zug nicht zulaessig
                    return false;
                }
            }
            return true;
        } else if(pieceY == newY) {
            if(pieceX > newX) {
                let tmpx = pieceX;
                pieceX = newX;
                newX = tmpx;
                // jetzt ist pieceX kleiner
            }
            // diese for-Schleife beachtet nur die Felder dazwischen, nicht Quell- und Zielfeld selber!
            for(let x = pieceX + 1; x < newX; x++) {
                if(board[pieceY][x] != "-") {
                    // wenn irgendwo eine andere Figur ist, ist der Zug nicht zulaessig
                    return false;
                }
            }
            return true;
        } else if(pieceX - newX == pieceY - newY) {
            // If fuer 1. und 3. Quadranten
            if(pieceX > newX) {
                let tmpx = pieceX;
                let tmpy = pieceY;
                pieceX = newX;
                newX = tmpx;
                pieceY = newY;
                newY = tmpy;
                // jetzt sind pieceX und pieceY kleiner
            }
            // diese for-Schleife beachtet nur die Felder dazwischen, nicht Quell- und Zielfeld selber!
            for(let p = pieceX + 1; p < newX; p++) {
                if(board[p][p] != "-") {
                    // wenn irgendwo eine andere Figur ist, ist der Zug nicht zulaessig
                    return false;
                }
            }
            return true;
        } else if(pieceX - newX == pieceY + newY) {
            // If fuer 2. und 4. Quadranten
            if(pieceX > newX) {
                let tmpx = pieceX;
                pieceX = newX;
                newX = tmpx;
                // jetzt ist pieceX kleiner
            }
            if(pieceY > newY) {
                let tmpy = pieceY;
                pieceY = newY;
                newY = tmpy;
                // jetzt ist pieceY kleiner
            }
            // diese for-Schleife beachtet nur die Felder dazwischen, nicht Quell- und Zielfeld selber!
            for(let p = pieceX + 1; p < newX; p++) {
                if(board[newY][p] != "-") {
                    // wenn irgendwo eine andere Figur ist, ist der Zug nicht zulaessig
                    return false;
                }
                newY--;
            }
            return true;
        } else {
            return false;
        }
    } else if(board[pieceY][pieceX][1] == "Turm") {
        if(pieceX == newX) {
            if(pieceY > newY) {
                let tmpy = pieceY;
                pieceY = newY;
                newY = tmpy;
                // jetzt ist pieceY kleiner
            }
            // diese for-Schleife beachtet nur die Felder dazwischen, nicht Quell- und Zielfeld selber!
            for(let y = pieceY + 1; y < newY; y++) {
                if(board[y][pieceX] != "-") {
                    // wenn irgendwo eine andere Figur ist, ist der Zug nicht zulaessig
                    return false;
                }
            }
            return true;
        } else if(pieceY == newY) {
            if(pieceX > newX) {
                let tmpx = pieceX;
                pieceX = newX;
                newX = tmpx;
                // jetzt ist pieceX kleiner
            }
            // diese for-Schleife beachtet nur die Felder dazwischen, nicht Quell- und Zielfeld selber!
            for(let x = pieceX + 1; x < newX; x++) {
                if(board[pieceY][x] != "-") {
                    // wenn irgendwo eine andere Figur ist, ist der Zug nicht zulaessig
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    } else if(board[pieceY][pieceX][1] == "Laeufer") {
        if(pieceX - newX == pieceY - newY) {
            // If fuer 1. und 3. Quadranten
            if(pieceX > newX) {
                let tmpx = pieceX;
                let tmpy = pieceY;
                pieceX = newX;
                newX = tmpx;
                pieceY = newY;
                newY = tmpy;
                // jetzt sind pieceX und pieceY kleiner
            }
            // diese for-Schleife beachtet nur die Felder dazwischen, nicht Quell- und Zielfeld selber!
            for(let p = pieceX + 1; p < newX; p++) {
                if(board[p][p] != "-") {
                    // wenn irgendwo eine andere Figur ist, ist der Zug nicht zulaessig
                    return false;
                }
            }
            return true;
        } else if(pieceX - newX == pieceY + newY) {
            // If fuer 2. und 4. Quadranten
            if(pieceX > newX) {
                let tmpx = pieceX;
                pieceX = newX;
                newX = tmpx;
                // jetzt ist pieceX kleiner
            }
            if(pieceY > newY) {
                let tmpy = pieceY;
                pieceY = newY;
                newY = tmpy;
                // jetzt ist pieceY kleiner
            }
            // diese for-Schleife beachtet nur die Felder dazwischen, nicht Quell- und Zielfeld selber!
            for(let p = pieceX + 1; p < newX; p++) {
                if(board[newY][p] != "-") {
                    // wenn irgendwo eine andere Figur ist, ist der Zug nicht zulaessig
                    return false;
                }
                newY--;
            }
            return true;
        } else {
            return false;
        }
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
        if(board[newY][newX][1] == "Koenig") {
            if(board[newY][newX][2] == "S") {
                schwarzerKoenig[0] = newX;
                schwarzerKoenig[1] = newY;
            } else if(board[newY][newX][2] == "W") {
                weisserKoenig[0] = newX;
                weisserKoenig[1] = newY;
            }
        }

        // Vielleicht wird das hier unten auch später in eine andere Funktion verschoben!!
        if(checkCheckmate(board, schwarzerKoenig[0], schwarzerKoenig[1])) {
            // weiss hat gewonnen
        } else if(checkCheckmate(board, weisserKoenig[0], weisserKoenig[1])) {
            // schwarz hat gewonnen
        }
        return board;
    } else {
        return board;
    }
}