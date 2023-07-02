class ChessMechanics {
    gameId          = 0
    schwarzerKoenig = [-1, -1];
    weisserKoenig   = [-1, -1];
    counter         = 0; // zaehlt, wie lange kein Stein geschlagen bzw. kein Bauer bewegt wurde
    stellungen      = {}; // speichert alle bisherigen Brettstellungen + wer dort jeweils als Naechstes dran war
    usedBauern      = [["-","-","-","-","-","-","-","-"],["n","n","n","n","n","n","n","n"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["n","n","n","n","n","n","n","n"],["-","-","-","-","-","-","-","-"]];

    static instances = []

    constructor(pGameId) {
        this.gameId = pGameId
    }

    static getInstance(gameId) {
        for (let i = 0; i < ChessMechanics.instances.length; i++) {
            if (ChessMechanics.instances[i].gameId === gameId) {
                return ChessMechanics.instances[i]
            }
        }

        return null
    }

    static addInstance(pGameId) {
        if (ChessMechanics.getInstance(pGameId) !== null) {
            return
        }
        
        ChessMechanics.instances.push(new ChessMechanics(pGameId))
    }

    convertColumn(column) {
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

    boardToCode(board, turn) {
        let code = "";
        code += turn;
        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                // schwarz = Grossbuchstaben
                if(board[i][j] == "-") {
                    code += "-";
                } else if(board[i][j] == "K") {
                    code += "A";
                } else if(board[i][j] == "k") {
                    code += "B";
                } else if(board[i][j] == "D") {
                    code += "C";
                } else if(board[i][j] == "d") {
                    code += "D";
                } else if(board[i][j] == "T") {
                    code += "E";
                } else if(board[i][j] == "t") {
                    code += "F";
                } else if(board[i][j] == "L") {
                    code += "G";
                } else if(board[i][j] == "l") {
                    code += "H";
                } else if(board[i][j] == "S") {
                    code += "I";
                } else if(board[i][j] == "s") {
                    code += "J";
                } else if(board[i][j] == "B") {
                    code += "K";
                } else if(board[i][j] == "b") {
                    code += "L";
                }
            }
        }
        return code;
    }

    codeToBoard(code) {
        let board = [];
        let turn = code[0]; // Wie das uebergeben wird, ist noch nicht sicher
        let temp = [];
        let ctbCount = 0;
    
        for(let i = 1; i < code.length; i++) {
            if(code[i] == "A") {
                temp.push("K");
            } else if(code[i] == "B") {
                temp.push("k");
            } else if(code[i] == "C") {
                temp.push("D");
            } else if(code[i] == "D") {
                temp.push("d");
            } else if(code[i] == "E") {
                temp.push("T");
            } else if(code[i] == "F") {
                temp.push("t");
            } else if(code[i] == "G") {
                temp.push("L");
            } else if(code[i] == "H") {
                temp.push("l");
            } else if(code[i] == "I") {
                temp.push("S");
            } else if(code[i] == "J") {
                temp.push("s");
            } else if(code[i] == "K") {
                temp.push("B");
            } else if(code[i] == "L") {
                temp.push("b");
            } else {
                return "Ungueltiger Code";
            }
            ctbCount++;
    
            if(ctbCount > 7) {
                board.push(temp);
                temp = [];
            }
        }
    
        return board;
    }

    generateChess() {
        let schachbrett         = [["t","s","l","k","d","l","s","t"],["b","b","b","b","b","b","b","b"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["B","B","B","B","B","B","B","B"],["T","S","L","K","D","L","S","T"]];
        this.schwarzerKoenig[0] = 4;
        this.schwarzerKoenig[1] = 7;
        this.weisserKoenig[0]   = 4;
        this.weisserKoenig[1]   = 0;

        return schachbrett;
    }

    // Funktion zum Überprüfen der Bedrohung! (englisch "being under check")
    checkCheck(board, X, Y) {
        for(let x = 0; x < 8; x++) {
            for(let y = 0; y < 8; y++) {
                if(board[Y][X] == "K" && board[Y][X] == "D" && board[Y][X] == "T" && board[Y][X] == "L" && board[Y][X] == "S" && board[Y][X] == "B") {
                    if(board[y][x] == "k" && board[y][x] == "d" && board[y][x] == "t" && board[y][x] == "l" && board[y][x] == "s" && board[y][x] == "b") {
                        if(this.checkMove(board, x, y, X, Y)) {
                            return true;
                        }
                    }
                } else if(board[Y][X] == "k" && board[Y][X] == "d" && board[Y][X] == "t" && board[Y][X] == "l" && board[Y][X] == "s" && board[Y][X] == "b") {
                    if(board[y][x] == "K" && board[y][x] == "D" && board[y][x] == "T" && board[y][x] == "L" && board[y][x] == "S" && board[y][x] == "B") {
                        if(this.checkMove(board, x, y, X, Y)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    checkCheckmate(board, X, Y) {
        let flag = false;
        let zuege = [];
    
        // alle moeglichen Zuege des Koenigs pruefen
        for(let ty = 0; ty < 8; ty++) {
            for(let tx = 0; tx < 8; tx++) {
                if(this.checkMove(board, X, Y, tx, ty)) {
                    let koord = [];
                    koord.push(tx);
                    koord.push(ty);
                    zuege.push(koord);
                }
            }
        }
    
        for(let zug = 0; zug < zuege.length; zug++) {
            if(!this.checkCheck(board, zuege[zug][0], zuege[zug][1])) {
                flag = true;
            }
        }
    
        if(flag) {
            return true;
        } else {
            return false;
        }
    }

    checkStalemate(board) {
        // Sind Koenige bedroht?
        let sKoenigX = schwarzerKoenig[0];
        let sKoenigY = schwarzerKoenig[1];
        let wKoenigX = weisserKoenig[0];
        let wKoenigY = weisserKoenig[1];
        if((this.checkCheck(board, sKoenigX, sKoenigY)) || (this.checkCheck(board, wKoenigX, wKoenigY))) {
            return false;
        }
    
        // Kann ein Spieler keinen gueltigen Zug mehr machen?
      
        let schwarzeFiguren = [];
        let weisseFiguren = [];
    
        let schwarzFlag = false;
        let weissFlag = false;
    
        for(let y = 0; y < 8; y++) {
            for(let x = 0; x < 8; x++) {
                let tempArr = [];
                tempArr.push(x);
                tempArr.push(y);
                if(board[y][x] == "T" || board[y][x] == "S" || board[y][x] == "L" || board[y][x] == "D" || board[y][x] == "K" || board[y][x] == "B") {
                    schwarzeFiguren.push(tempArr);
                } else if(board[y][x] == "t" || board[y][x] == "s" || board[y][x] == "l" || board[y][x] == "d" || board[y][x] == "k" || board[y][x] == "b") {
                    weisseFiguren.push(tempArr);
                }
            }
        }
    
        // wenn auch nur eine gültige Bewegung für einen Spieler vorhanden ist, wird der Flag auf True gesetzt
    
        for(let s = 0; s < schwarzeFiguren.length; s++) {
            let sx = schwarzeFiguren[s][0];
            let sy = schwarzeFiguren[s][1];
            for(let tmpy1 = 0; tmpy1 < 8; tmpy1++) {
                for(let tmpx1 = 0; tmpx1 < 8; tmpx1++) {
                    if(this.checkMove(board, sx, sy, tmpx1, tmpy1)) {
                        schwarzFlag = true;
                    }
                }
            }
        }
    
        for(let w = 0; w < weisseFiguren.length; w++) {
            let wx = weisseFiguren[w][0];
            let wy = weisseFiguren[w][1];
            for(let tmpy2 = 0; tmpy2 < 8; tmpy2++) {
                for(let tmpx2 = 0; tmpx2 < 8; tmpx2++) {
                    if(this.checkMove(board, wx, wy, tmpx2, tmpy2)) {
                        weissFlag = true;
                    }
                }
            }
        }
    
        if(schwarzFlag && weissFlag) {
            return false;
        } else {
            return true;
        }
    }

    checkDraw(board) {
        if(this.checkStalemate(board)) {
            return true;
        }
        return false;
        // Weitere Faelle vermutlich Frontend?
    }

    onTimeout() {
        // COMING SOON
    }

    forfeit(board, player) {
        let koenigX = -1;
        let koenigY = -1;

        if(player == "S") {
            koenigX = this.schwarzerKoenig[0];
            koenigY = this.schwarzerKoenig[1];
        } else if(player == "W") {
            koenigX = this.weisserKoenig[0];
            koenigY = this.weisserKoenig[1];
        } else {
            return board;
        }

        board[koenigY][koenigX] = "-";
        return board;
    }

    complaint(board, turn) {
        if(counter > 49) {
            // Remis
            return true;
        }
        let schachbrett = this.boardToCode(board, turn);
        if(this.stellungen[schachbrett] > 2) {
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
    checkWinner(board) {
        let weisserKoenigVorhanden = false;
        let schwarzerKoenigVorhanden = false;

        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                if(board[i][j] == "K") {
                    schwarzerKoenigVorhanden = true;
                }
                if(board[i][j] == "k") {
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

    checkMove(board, pieceX, pieceY, newX, newY) {
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
        } else if(board[pieceY][pieceX] == "K" || board[pieceY][pieceX] == "k") {
            if((newX == pieceX + 1 && newY == pieceY) || (newX == pieceX - 1 && newY == pieceY) || (newX == pieceX && newY == pieceY + 1) || (newX == pieceX && newY == pieceY - 1) || (newX == pieceX + 1 && newY == pieceY + 1) || (newX == pieceX + 1 && newY == pieceY - 1) || (newX == pieceX - 1 && newY == pieceY + 1) || (newX == pieceX - 1 && newY == pieceY - 1)) {
                // Zielfeld gueltig - liegt im Bewegungsbereich
                if(!this.checkCheck(board, newX, newY)) {
                    // Koenig geht auf kein bedrohtes Feld - dies darf er naemlich nicht!
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else if(board[pieceY][pieceX] == "D" || board[pieceY][pieceX] == "d") {
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
        } else if(board[pieceY][pieceX] == "T" || board[pieceY][pieceX] == "t") {
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
        } else if(board[pieceY][pieceX] == "L" || board[pieceY][pieceX] == "l") {
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
        } else if(board[pieceY][pieceX] == "S" || board[pieceY][pieceX] == "s") {
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
        } else if((board[pieceY][pieceX] == "b" || board[pieceY][pieceX] == "B") && usedBauern[pieceY][pieceX] == "n") {
            if(newY == pieceY + 1 && newX == pieceX && board[newY][newX] == "-") {
                return true;
            } else if(newY == pieceY + 2 && newX == pieceX && board[newY][newX] == "-" && board[pieceY + 1][pieceX] == "-") {
                return true;
            }
            return false;
        } else if((board[pieceY][pieceX] == "b" || board[pieceY][pieceX] == "B") && usedBauern[pieceY][pieceX] == "y") {
            if(newY == pieceY + 1 && newX == pieceX && board[newY][newX] == "-") {
                return true;
            }
            return false;
        } else {
            alert("Programmierfehler in der checkMove-Funktion!");
            return false;
        }
    }

    move(board, pieceX, pieceY, newX, newY) {
        // Vorher CHECK mit Funktion checkMove, ob Zug gültig ist!
        // wenn erfolgreich durchlaufen, dann bewegen
        // Unterer Code sollte funktionieren.

        if(this.checkMove(board, pieceX, pieceY, newX, newY)) {
            if(board[newY][newX] == "-") {
                if(board[pieceY][pieceX] != "b" || board[pieceY][pieceX] != "B") {
                    counter++;
                    this.usedBauern[newY][newX] = "-";
                } else {
                    this.usedBauern[newY][newX] = "y";
                }
            }

            board[newY][newX] = board[pieceY][pieceX];
            if(board[newY][newX] == "b" || board[newY][newX] == "B") {
                if((newY == 0 && board[newY][newX] == "B") || (newY == 7 && board[newY][newX] == "b")) {
                    // Umwandlung? Frontend-Wissen erfordert?
                }
    
                // COMING SOON: Schlagen... Hier wird vermutlich Frontend-Wissen erfordert
            }
    
            board[pieceY][pieceX] = "-";
            this.usedBauern[pieceY][pieceX] = "-";
    
            if(board[newY][newX] == "K") {
                this.schwarzerKoenig[0] = newX;
                this.schwarzerKoenig[1] = newY;
            } else if(board[newY][newX] == "k") {
                this.weisserKoenig[0] = newX;
                this.weisserKoenig[1] = newY;
            }
    
            // Vielleicht wird das hier unten auch später in eine andere Funktion verschoben!!
            // Absprache mit Frontend?
            if(this.checkCheckmate(board, this.schwarzerKoenig[0], this.schwarzerKoenig[1])) {
                // weiss hat gewonnen
            } else if(this.checkCheckmate(board, this.weisserKoenig[0], this.weisserKoenig[1])) {
                // schwarz hat gewonnen
            }

            if(counter > 74) {
                // Unentschieden ohne Zutun des Spielers
            }

            let farbe = board[pieceY][pieceX][2];
            let schachbrett = this.boardToCode(board, farbe);
            if(!this.stellungen[schachbrett] > 0) {
                this.stellungen[schachbrett] = 1;
            } else {
                this.stellungen[schachbrett] = this.stellungen[schachbrett] + 1;
            }
            
            if(this.stellungen[schachbrett] > 4) {
                // Remis ohne Zutun des Spielers
            }

            return board;
        } else {
            return board;
        }
    }
}

export default ChessMechanics