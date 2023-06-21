let schwarzerKoenig = [-1, -1];
let weisserKoenig = [-1, -1];

let counter = 0; // zaehlt, wie lange kein Stein geschlagen bzw. kein Bauer bewegt wurde
let stellungen = {}; // speichert alle bisherigen Brettstellungen + wer dort jeweils als Naechstes dran war

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

function boardToCode(board, turn) {
    let code = "";
    code += turn;
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            if(board[i][j] == "-") {
                code += "-";
            } else if(board[i][j][1] == "K" && board[i][j][2] == "S") {
                code += "A";
            } else if(board[i][j][1] == "K" && board[i][j][2] == "W") {
                code += "B";
            } else if(board[i][j][1] == "D" && board[i][j][2] == "S") {
                code += "C";
            } else if(board[i][j][1] == "D" && board[i][j][2] == "W") {
                code += "D";
            } else if(board[i][j][1] == "T" && board[i][j][2] == "S") {
                code += "E";
            } else if(board[i][j][1] == "T" && board[i][j][2] == "W") {
                code += "F";
            } else if(board[i][j][1] == "L" && board[i][j][2] == "S") {
                code += "G";
            } else if(board[i][j][1] == "L" && board[i][j][2] == "W") {
                code += "H";
            } else if(board[i][j][1] == "S" && board[i][j][2] == "S") {
                code += "I";
            } else if(board[i][j][1] == "S" && board[i][j][2] == "W") {
                code += "J";
            } else if(board[i][j][1] == "B" && board[i][j][2] == "S") {
                code += "K";
            } else if(board[i][j][1] == "B" && board[i][j][2] == "W") {
                code += "L";
            }
        }
    }
    return code;
}

module.exports = boardToCode;

function generateChess() {
    let schachbrett = [[[1, "Turm", "W"], [2, "Springer", "W"], [3, "Laeufer", "W"], [4, "Dame", "W"], [5, "Koenig", "W"], [6, "Laeufer", "W"], [7, "Springer", "W"], [8, "Turm", "W"]], [[9, "unusedBauer", "W"], [10, "unusedBauer", "W"], [11, "unusedBauer", "W"], [12, "unusedBauer", "W"], [13, "unusedBauer", "W"], [14, "unusedBauer", "W"], [15, "unusedBauer", "W"], [16, "unusedBauer", "W"]], [], [], [], [], [[17, "unusedBauer", "S"], [18, "unusedBauer", "S"], [19, "unusedBauer", "S"], [20, "unusedBauer", "S"], [21, "unusedBauer", "S"], [22, "unusedBauer", "S"], [23, "unusedBauer", "S"], [24, "unusedBauer", "S"]], [[25, "Turm", "S"], [26, "Springer", "S"], [27, "Laeufer", "S"], [28, "Dame", "S"], [29, "Koenig", "S"], [30, "Laeufer", "S"], [31, "Springer", "S"], [32, "Turm", "S"]]];
    return schachbrett;
}

// Funktion zum Überprüfen der Bedrohung! (englisch "being under check")
function checkCheck(board, X, Y) {
    for(let x = 0; x < 8; x++) {
        for(let y = 0; y < 8; y++) {
            if(checkMove(board, x, y, X, Y)) {
                return true;
            }
        }
    }
    return false;
}

// COMING SOON
// Funktion zum Überprüfen, ob ein bedrohter König die Bedrohung durch einen Halbzug abwehren kann (wenn nein, ist er matt gesetzt und das Spiel ist vorbei!)
function checkCheckmate(board, X, Y) {
    // COMING SOON
    return false;
}

// COMING SOON
// Funktion zum Überprüfen, ob ein Patt (engl. Stalemate) vorliegt
function checkStalemate() {
    // COMING SOON
    return false;
}

// COMING SOON
// Funktion zum Überprüfen, ob ein Remis (engl. Draw) vorliegt
function checkDraw() {
    // COMING SOON
    if(checkStalemate()) {
        return true;
    }
    // weitere Fälle kommen noch
    return false;
}

// COMING SOON
// Funktion fuer das Frontend, falls die Bedenkzeit ueberschritten ist
function onTimeout() {
    // COMING SOON
}

// COMING SOON
// Funktion zum Aufgeben
function forfeit(player) {
    // COMING SOON
}

// COMING SOON
// Funktion, wenn sich ein Spieler beschwert und ein Remis entstehen soll
// Passiert, wenn: 50 Zuege lang kein Stein geschlagen wurde oder kein Bauer bewegt wurde - oder wenn eine Brettstellung drei Mal aufgetreten ist
function complaint(board, turn) {
    if(counter > 49) {
        // Remis
        return true;
    }
    let schachbrett = boardToCode(board, turn);
    if(stellungen[schachbrett] > 2) {
        // Remis
        return true;
    }
    return false;
}

// TEMPORÄRE FUNKTION
// Dies ist nur eine temporäre Funktion, um den Gewinner zu ermitteln!
// Hier wird vorausgesetzt, dass ein König geschlagen wurde!
// Nach jedem Zug sollte diese Funktion einmal aufgerufen werden.
// FUNKTION WIRD NOCH AKTUALISIERT!!!
function checkWinner(board) {
    let weisserKoenigVorhanden = false;
    let schwarzerKoenigVorhanden = false;

    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            if(board[i][j][1] == "Koenig" && board[i][j][2] == "S") {
                schwarzerKoenigVorhanden = true;
            }
            if(board[i][j][1] == "Koenig" && board[i][j][2] == "W") {
                weisserKoenigVorhanden = true;
            }
        }
    }

    if(!weisserKoenigVorhanden && !schwarzerKoenigVorhanden) {
        return "error"; // Beide Koenige nicht mehr vorhanden, Fehler
    } else if(!schwarzerKoenigVorhanden) {
        return "W"; // Weiss hat gewonnen, weil der schwarze Koenig nicht mehr vorhanden ist
    } else if(!weisserKoenigVorhanden) {
        return "S"; // Schwarz hat gewonnen, weil der weisse Koenig nicht mehr vorhanden ist
    } else {
        return "continue"; // Noch kein Gewinner fest
    }
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
        if(newX == pieceX - 1 && newY == pieceY + 2) {
            return true;
        } else if(newX == pieceX - 2 && newY == pieceY + 1) {
            return true;
        } else if(newX == pieceX - 2 && newY == pieceY - 1) {
            return true;
        } else if(newX == pieceX - 1 && newY == pieceY - 2) {
            return true;
        } else if(newX == pieceX + 1 && newY == pieceY + 2) {
            return true;
        } else if(newX == pieceX + 2 && newY == pieceY + 1) {
            return true;
        } else if(newX == pieceX + 1 && newY == pieceY - 2) {
            return true;
        } else if(newX == pieceX + 2 && newY == pieceY - 1) {
            return true;
        } else {
            return false;
        }
    } else if(board[pieceY][pieceX][1] == "unusedBauer") {
        if(newY == pieceY + 1 && newX == pieceX && board[newY][newX] == "-") {
            return true;
        } else if(newY == pieceY + 2 && newX == pieceX && board[newY][newX] == "-" && board[pieceY + 1][pieceX] == "-") {
            return true;
        }
        return false;
    } else if(board[pieceY][pieceX][1] == "usedBauer") {
        if(newY == pieceY + 1 && newX == pieceX && board[newY][newX] == "-") {
            return true;
        }
        return false;
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
        if(board[newY][newX][1] == "unusedBauer" || board[newY][newX][1] == "usedBauer") {
            if((newY == 0 && board[newY][newX][2] == "S") || (newY == 7 && board[newY][newX][2] == "W")) {
                // Umwandlung COMING SOON
            }

            // COMING SOON: Schlagen... Hier wird vermutlich Frontend-Wissen erfordert
        }
        if(board[newY][newX][1] == "unusedBauer") {
            board[newY][newX][1] == "usedBauer";
        }
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