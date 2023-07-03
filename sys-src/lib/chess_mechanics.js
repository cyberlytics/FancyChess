class ChessMechanics {
    gameId          = 0
    schwarzerKoenig = [-1, -1]; // Speicherung der Position des schwarzen Koenigs
    weisserKoenig   = [-1, -1]; // Speicherung der Position des weissen Koenigs
    counter         = 0; // zaehlt, wie lange kein Stein geschlagen bzw. kein Bauer bewegt wurde
    stellungen      = {}; // speichert alle bisherigen Brettstellungen + wer dort jeweils als Naechstes dran war
    
    // speichert, welche Bauern bereits einmal bewegt wurden
    usedBauern      =
            [["-","-","-","-","-","-","-","-"],
            ["n","n","n","n","n","n","n","n"],
            ["-","-","-","-","-","-","-","-"],
            ["-","-","-","-","-","-","-","-"],
            ["-","-","-","-","-","-","-","-"],
            ["-","-","-","-","-","-","-","-"],
            ["n","n","n","n","n","n","n","n"],
            ["-","-","-","-","-","-","-","-"]];


    // WICHTIGE GENERELLE INFORMATION!
    // CODIERUNG DES SCHACHBRETTES:
    // Grossbuchstaben = Schwarz; Kleinbuchstaben = Weiss.
    // K = Koenig
    // D = Dame
    // T = Turm
    // L = Laeufer
    // S = Springer
    // B = Bauer


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

    // Funktion, um eine Spaltenbezeichnung (von A bis H) in eine fuer diesen Code nutzbare Zahl (von 0 bis 7) zu konvertieren
    convertColumn(column) {
        if(column === "A" || column === "a") {
            return 0;
        } else if(column === "B" || column === "b") {
            return 1;
        } else if(column === "C" || column === "c") {
            return 2;
        } else if(column === "D" || column === "d") {
            return 3;
        } else if(column === "E" || column === "e") {
            return 4;
        } else if(column === "F" || column === "f") {
            return 5;
        } else if(column === "G" || column === "g") {
            return 6;
        } else if(column === "H" || column === "h") {
            return 7;
        }
    }

    // Funktion, um ein bestehendes Board (zweidimensionales Array) in einen speziellen Code umzuwandeln
    // Wird verwendet, um im Dictionary stellungen (s. o.) festhalten zu koennen, welche Brett-Stellungen bereits vorkamen
    boardToCode(board, turn) {
        // CODIERUNG:
        // Leeres Feld bleibt ein -
        // Schwarzer Koenig wird zu A
        // Weisser Koenig wird zu B
        // Schwarze Dame wird zu C
        // Weisse Dame wird zu D
        // Schwarzer Turm wird zu E
        // Weisser Turm wird zu F
        // Schwarzer Laeufer wird zu G
        // Weisser Laeufer wird zu H
        // Schwarzer Springer wird zu I
        // Weisser Springer wird zu J
        // Schwarzer Bauer wird zu K
        // Weisser Bauer wird zu L
        
        let code = "";
        code += turn; // es wird am Anfang hinzugefuegt, wer derzeit an der Reihe ist
        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                if(board[i][j] === "-") {
                    code += "-";
                } else if(board[i][j] === "K") {
                    code += "A";
                } else if(board[i][j] === "k") {
                    code += "B";
                } else if(board[i][j] === "D") {
                    code += "C";
                } else if(board[i][j] === "d") {
                    code += "D";
                } else if(board[i][j] === "T") {
                    code += "E";
                } else if(board[i][j] === "t") {
                    code += "F";
                } else if(board[i][j] === "L") {
                    code += "G";
                } else if(board[i][j] === "l") {
                    code += "H";
                } else if(board[i][j] === "S") {
                    code += "I";
                } else if(board[i][j] === "s") {
                    code += "J";
                } else if(board[i][j] === "B") {
                    code += "K";
                } else if(board[i][j] === "b") {
                    code += "L";
                }
            }
        }
        return code;
    }

    // Funktion, um einen generierten Code wieder zu einem Schachbrett (zweidimensionales Array) zu verwandeln
    codeToBoard(code) {
        let board = [];
        let turn = code[0]; // Wer ist an der Reihe?
        let temp = [];
        let ctbCount = 0;
    
        // Jedes Zeichen des Codes abrufen (beginnend mit dem zweiten Zeichen, da das erste Zeichen der TURN ist)
        // Codierung siehe boardToCode-Funktion
        for(let i = 1; i < code.length; i++) {
            if(code[i] === "A") {
                temp.push("K");
            } else if(code[i] === "B") {
                temp.push("k");
            } else if(code[i] === "C") {
                temp.push("D");
            } else if(code[i] === "D") {
                temp.push("d");
            } else if(code[i] === "E") {
                temp.push("T");
            } else if(code[i] === "F") {
                temp.push("t");
            } else if(code[i] === "G") {
                temp.push("L");
            } else if(code[i] === "H") {
                temp.push("l");
            } else if(code[i] === "I") {
                temp.push("S");
            } else if(code[i] === "J") {
                temp.push("s");
            } else if(code[i] === "K") {
                temp.push("B");
            } else if(code[i] === "L") {
                temp.push("b");
            } else if(code[i] === "-") {
                temp.push("-");
            } else {
                // wenn auch nur ein anderes Zeichen vorkommt als von A bis H, dann ist es kein gueltiger Code!
                return "Ungueltiger Code";
            }
            ctbCount++;
    
            // Ermittelt, ob bereits 8 Elemente in einem Array sind, und faengt ggf. ein neues Array (also eine neue Zeile im Schachbrett) an
            if(ctbCount > 7) {
                board.push(temp);
                temp = [];
                ctbCount = 0;
            }
        }
        return board;
    }

    // Funktion, um ein frisches Schachbrett zu generieren
    generateChess() {
        let schachbrett =
            [["t","s","l","d","k","l","s","t"],
            ["b","b","b","b","b","b","b","b"],
            ["-","-","-","-","-","-","-","-"],
            ["-","-","-","-","-","-","-","-"],
            ["-","-","-","-","-","-","-","-"],
            ["-","-","-","-","-","-","-","-"],
            ["B","B","B","B","B","B","B","B"],
            ["T","S","L","D","K","L","S","T"]];

        // Festlegung der Koordinaten der Koenige
        this.schwarzerKoenig[0] = 4;
        this.schwarzerKoenig[1] = 7;
        this.weisserKoenig[0]   = 4;
        this.weisserKoenig[1]   = 0;

        return schachbrett;
    }

    // Funktion zum Ueberpruefen der Bedrohung! (englisch "being under check")
    checkCheck(board, X, Y) {
        for(let x = 0; x < 8; x++) {
            for(let y = 0; y < 8; y++) {
                if(board[Y][X] === "K" || board[Y][X] === "D" || board[Y][X] === "T" || board[Y][X] === "L" || board[Y][X] === "S" || board[Y][X] === "B") {
                    // schwarze Figuren koennen nur von weissen Figuren bedroht werden
                    if(board[y][x] === "k" || board[y][x] === "d" || board[y][x] === "t" || board[y][x] === "l" || board[y][x] === "s" || board[y][x] === "b") {
                        // Kann die weisse Figur auf das Feld der schwarzen Figur?
                        if(this.checkMove(board, x, y, X, Y)) {
                            return true;
                        }
                    }
                } else if(board[Y][X] === "k" || board[Y][X] === "d" || board[Y][X] === "t" || board[Y][X] === "l" || board[Y][X] === "s" || board[Y][X] === "b") {
                    // weisse Figuren koennen nur von schwarzen Figuren bedroht werden
                    if(board[y][x] === "K" || board[y][x] === "D" || board[y][x] === "T" || board[y][x] === "L" || board[y][x] === "S" || board[y][x] === "B") {
                        // Kann die schwarze Figur auf das Feld der weissen Figur?
                        if(this.checkMove(board, x, y, X, Y)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    // Funktion zum Ueberpruefen, ob eine bedrohte Figur der Bedrohung entkommen kann
    checkCheckmate(board, X, Y) {
        let flag = false;
        let zuege = [];
    
        // alle moeglichen Zuege der Figur pruefen
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
    
        // herausschreiben, bei welchen moeglichen Feldern keine Bedrohung mehr vorliegen wuerde
        for(let zug = 0; zug < zuege.length; zug++) {
            if(!this.checkCheck(board, zuege[zug][0], zuege[zug][1])) {
                flag = true;
            }
        }
        return flag;
    }

    // Funktion zum Pruefen, ob ein Spieler keinen gueltigen Zug mehr machen kann, ABER sein Koenig NICHT im Schach steht (Patt)
    checkStalemate(board) {
        // Sind Koenige bedroht?
        let sKoenigX = schwarzerKoenig[0];
        let sKoenigY = schwarzerKoenig[1];
        let wKoenigX = weisserKoenig[0];
        let wKoenigY = weisserKoenig[1];
        if((this.checkCheck(board, sKoenigX, sKoenigY)) || (this.checkCheck(board, wKoenigX, wKoenigY))) {
            // wenn Koenig bedroht ist, dann ist Bedingung fuer Patt sowieso nicht mehr erfuellt
            return false;
        }
    
        // Kann ein Spieler keinen gueltigen Zug mehr machen?
      
        let schwarzeFiguren = [];
        let weisseFiguren = [];
        let schwarzFlag = false;
        let weissFlag = false;
    
        // Aufteilung der Figuren des gesamten Schachbrettes in schwarze und weisse Figuren
        for(let y = 0; y < 8; y++) {
            for(let x = 0; x < 8; x++) {
                let tempArr = [];
                tempArr.push(x);
                tempArr.push(y);
                if(board[y][x] === "T" || board[y][x] === "S" || board[y][x] === "L" || board[y][x] === "D" || board[y][x] === "K" || board[y][x] === "B") {
                    schwarzeFiguren.push(tempArr);
                } else if(board[y][x] === "t" || board[y][x] === "s" || board[y][x] === "l" || board[y][x] === "d" || board[y][x] === "k" || board[y][x] === "b") {
                    weisseFiguren.push(tempArr);
                }
            }
        }
    
        // wenn auch nur eine gueltige Bewegung fuer einen Spieler vorhanden ist, wird der Flag auf True gesetzt
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
            for (let tmpy2 = 0; tmpy2 < 8; tmpy2++) {
                for (let tmpx2 = 0; tmpx2 < 8; tmpx2++) {
                    if (this.checkMove(board, wx, wy, tmpx2, tmpy2)) {
                        weissFlag = true;
                    }
                }
            }
        }

        // wenn ein Spieler keinen gueltigen Zug mehr machen kann (und dessen Koenig nicht bedroht ist), dann liegt ein Patt vor und das Spiel endet remis
        return !(schwarzFlag && weissFlag);
    }

    // liegt ein Remis vor?
    checkDraw(board) {
        return !!this.checkStalemate(board);
    }

    // Funktion zum Aufgeben
    // Der jeweilige Koenig wird durch diese Funktion geschlagen!
    forfeit(board, player) {
        let koenigX = -1;
        let koenigY = -1;

        // wer will aufgeben? welcher Koenig muss daher geschlagen werden?
        if(player === "S") {
            koenigX = this.schwarzerKoenig[0];
            koenigY = this.schwarzerKoenig[1];
        } else if(player === "W") {
            koenigX = this.weisserKoenig[0];
            koenigY = this.weisserKoenig[1];
        } else {
            return board;
        }

        // Koenig schlagen
        board[koenigY][koenigX] = "-";
        return board;
    }

    // Beschwerde
    // Wenn seit 50 Runden keine Figur geschlagen und kein Bauer bewegt wurde ODER dieselbe Schachbrettstellung bereits 3-mal aufgetreten ist, kann ein Spieler ein Remis fordern.
    complaint(board, turn) {
        if(counter > 49) {
            // Remis
            return true;
        }
        let schachbrett = this.boardToCode(board, turn);
        return this.stellungen[schachbrett] > 2;

    }

    // Pruefe, ob ein Gewinner feststeht
    // In dieser Implementierung muss ein Koenig bereits geschlagen worden sein!
    checkWinner(board) {
        let weisserKoenigVorhanden = false;
        let schwarzerKoenigVorhanden = false;

        // sind die Koenige noch vorhanden?
        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                if(board[i][j] === "K") {
                    schwarzerKoenigVorhanden = true;
                }
                if(board[i][j] === "k") {
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

    // Funktion zum Ueberpruefen der Gueltigkeit eines gewuenschten Zuges
    checkMove(board, pieceX, pieceY, newX, newY) {
        // Fallunterscheidung je nach Typ der Figur
        if(pieceX === newX && pieceY === newY) {
            // keine Bewegung, somit ungueltig, da Zugpflicht herrscht!
            return false;
        } else if(pieceX < 0 || pieceX > 7 || pieceY < 0 || pieceY > 7 || newX < 0 || newX > 7 || newY < 0 || newY > 7) {
            // ungueltige Koordinaten (kleiner als 0 oder groesser als 7)
            return false;
        } else if(board[pieceY][pieceX] === "-") {
            // keine Figur auf dem Ursprungsfeld!
            return false;
        } else if(board[pieceY][pieceX] === "K" || board[pieceY][pieceX] === "k") {
            // Koenig
            if((newX === pieceX + 1 && newY === pieceY) || (newX === pieceX - 1 && newY === pieceY) || (newX === pieceX && newY === pieceY + 1) || (newX === pieceX && newY === pieceY - 1) || (newX === pieceX + 1 && newY === pieceY + 1) || (newX === pieceX + 1 && newY === pieceY - 1) || (newX === pieceX - 1 && newY === pieceY + 1) || (newX === pieceX - 1 && newY === pieceY - 1)) {
                // Zielfeld gueltig - liegt im Bewegungsbereich
                return !this.checkCheck(board, newX, newY);
            } else {
                return false;
            }
        } else if(board[pieceY][pieceX] === "D" || board[pieceY][pieceX] === "d") {
            // Dame
            if(pieceX === newX) {
                // Bewegung nach oben oder unten

                // pieceY soll kleiner sein als newY, bei Bedarf aendern
                if(pieceY > newY) {
                    let tmpy = pieceY;
                    pieceY = newY;
                    newY = tmpy;
                }
                // diese for-Schleife beachtet nur die Felder dazwischen, nicht Quell- und Zielfeld selber!
                for(let y = pieceY + 1; y < newY; y++) {
                    if(board[y][pieceX] !== "-") {
                        // wenn irgendwo eine andere Figur ist, ist der Zug nicht zulaessig
                        return false;
                    }
                }
                return true;
            } else if(pieceY === newY) {
                // Bewegung nach links oder rechts

                // pieceX soll kleiner sein als newX, bei Bedarf aendern
                if(pieceX > newX) {
                    let tmpx = pieceX;
                    pieceX = newX;
                    newX = tmpx;
                }
                // diese for-Schleife beachtet nur die Felder dazwischen, nicht Quell- und Zielfeld selber!
                for(let x = pieceX + 1; x < newX; x++) {
                    if(board[pieceY][x] !== "-") {
                        // wenn irgendwo eine andere Figur ist, ist der Zug nicht zulaessig
                        return false;
                    }
                }
                return true;
            } else if(pieceX - newX === pieceY - newY) {
                // Diagonale Bewegung
                // If fuer 1. und 3. Quadranten
                if(pieceX > newX) {
                    // Im 1. und 3. Quadranten ist, wenn pieceX groesser als newX ist, auch pieceY groesser als newY
                    // piece... soll aber kleiner sein als new...
                    let tmpx = pieceX;
                    let tmpy = pieceY;
                    pieceX = newX;
                    newX = tmpx;
                    pieceY = newY;
                    newY = tmpy;
                }
                // diese for-Schleife beachtet nur die Felder dazwischen, nicht Quell- und Zielfeld selber!
                for(let p = pieceX + 1; p < newX; p++) {
                    if(board[p][p] !== "-") {
                        // wenn irgendwo eine andere Figur ist, ist der Zug nicht zulaessig
                        return false;
                    }
                }
                return true;
            } else if(pieceX - newX === pieceY + newY) {
                // Diagonale Bewegung
                // If fuer 2. und 4. Quadranten
                // pieceX soll kleiner sein als newX, bei Bedarf aendern
                if(pieceX > newX) {
                    let tmpx = pieceX;
                    pieceX = newX;
                    newX = tmpx;
                }
                // pieceY soll kleiner sein als newY, bei Bedarf aendern
                if(pieceY > newY) {
                    let tmpy = pieceY;
                    pieceY = newY;
                    newY = tmpy;
                }
                // diese for-Schleife beachtet nur die Felder dazwischen, nicht Quell- und Zielfeld selber!
                for(let p = pieceX + 1; p < newX; p++) {
                    if(board[newY][p] !== "-") {
                        // wenn irgendwo eine andere Figur ist, ist der Zug nicht zulaessig
                        return false;
                    }
                    newY--;
                }
                return true;
            } else {
                return false;
            }
        } else if(board[pieceY][pieceX] === "T" || board[pieceY][pieceX] === "t") {
            // Turm
            if(pieceX === newX) {
                // Bewegung nach oben oder unten
                // pieceY soll kleiner sein als newY, bei Bedarf aendern
                if(pieceY > newY) {
                    let tmpy = pieceY;
                    pieceY = newY;
                    newY = tmpy;
                }
                // diese for-Schleife beachtet nur die Felder dazwischen, nicht Quell- und Zielfeld selber!
                for(let y = pieceY + 1; y < newY; y++) {
                    if(board[y][pieceX] !== "-") {
                        // wenn irgendwo eine andere Figur ist, ist der Zug nicht zulaessig
                        return false;
                    }
                }
                return true;
            } else if(pieceY === newY) {
                // Bewegung nach links oder rechts
                // pieceX soll kleiner sein als newX, bei Bedarf aendern
                if(pieceX > newX) {
                    let tmpx = pieceX;
                    pieceX = newX;
                    newX = tmpx;
                    // jetzt ist pieceX kleiner
                }
                // diese for-Schleife beachtet nur die Felder dazwischen, nicht Quell- und Zielfeld selber!
                for(let x = pieceX + 1; x < newX; x++) {
                    if(board[pieceY][x] !== "-") {
                        // wenn irgendwo eine andere Figur ist, ist der Zug nicht zulaessig
                        return false;
                    }
                }
                return true;
            } else {
                return false;
            }
        } else if(board[pieceY][pieceX] === "L" || board[pieceY][pieceX] === "l") {
            // Laeufer
            if(pieceX - newX === pieceY - newY) {
                // Diagonale Bewegung
                // If fuer 1. und 3. Quadranten
                if(pieceX > newX) {
                    // Im 1. und 3. Quadranten ist, wenn pieceX groesser als newX ist, auch pieceY groesser als newY
                    // piece... soll aber kleiner sein als new...
                    let tmpx = pieceX;
                    let tmpy = pieceY;
                    pieceX = newX;
                    newX = tmpx;
                    pieceY = newY;
                    newY = tmpy;
                }
                // diese for-Schleife beachtet nur die Felder dazwischen, nicht Quell- und Zielfeld selber!
                for(let p = pieceX + 1; p < newX; p++) {
                    if(board[p][p] !== "-") {
                        // wenn irgendwo eine andere Figur ist, ist der Zug nicht zulaessig
                        return false;
                    }
                }
                return true;
            } else if(pieceX - newX === pieceY + newY) {
                // Diagonale Bewegung
                // If fuer 2. und 4. Quadranten
                // pieceX soll kleiner sein als newX, bei Bedarf aendern
                if(pieceX > newX) {
                    let tmpx = pieceX;
                    pieceX = newX;
                    newX = tmpx;

                }
                // pieceY soll kleiner sein als newY, bei Bedarf aendern
                if(pieceY > newY) {
                    let tmpy = pieceY;
                    pieceY = newY;
                    newY = tmpy;
                }
                // diese for-Schleife beachtet nur die Felder dazwischen, nicht Quell- und Zielfeld selber!
                for(let p = pieceX + 1; p < newX; p++) {
                    if(board[newY][p] !== "-") {
                        // wenn irgendwo eine andere Figur ist, ist der Zug nicht zulaessig
                        return false;
                    }
                    newY--;
                }
                return true;
            } else {
                return false;
            }
        } else if(board[pieceY][pieceX] === "S" || board[pieceY][pieceX] === "s") {
            // Springer
            // Einzelne Abfrage aller moeglichen Positionen
            if(newX === pieceX - 1 && newY === pieceY + 2) {
                return true;
            } else if(newX === pieceX - 2 && newY === pieceY + 1) {
                return true;
            } else if(newX === pieceX - 2 && newY === pieceY - 1) {
                return true;
            } else if(newX === pieceX - 1 && newY === pieceY - 2) {
                return true;
            } else if(newX === pieceX + 1 && newY === pieceY + 2) {
                return true;
            } else if(newX === pieceX + 2 && newY === pieceY + 1) {
                return true;
            } else if(newX === pieceX + 1 && newY === pieceY - 2) {
                return true;
            } else return newX === pieceX + 2 && newY === pieceY - 1;
        } else if((board[pieceY][pieceX] === "b" || board[pieceY][pieceX] === "B") && usedBauern[pieceY][pieceX] === "n") {
            // Bauer - NOCH NICHT BENUTZT
            if(newY === pieceY + 1 && newX === pieceX && board[newY][newX] === "-") {
                // Bewegung um 1 Feld nach vorne
                return true;
            } else if(newY === pieceY + 2 && newX === pieceX && board[newY][newX] === "-" && board[pieceY + 1][pieceX] === "-") {
                // Nicht benutzte Bauern koennen auch 2 Felder nach vorne ziehen, solange niemand direkt vor ihm steht
                return true;
            }
            return false;
        } else if((board[pieceY][pieceX] === "b" || board[pieceY][pieceX] === "B") && usedBauern[pieceY][pieceX] === "y") {
            // Bauer - BEREITS BENUTZT
            return newY === pieceY + 1 && newX === pieceX && board[newY][newX] === "-";

        } else {
            alert("Programmierfehler in der checkMove-Funktion!");
            return false;
        }
    }

    // Funktion zum Bewegen von Figuren
    move(board, pieceX, pieceY, newX, newY) {
        // Vorher CHECK mit Funktion checkMove, ob Zug gültig ist!
        // wenn erfolgreich durchlaufen, dann bewegen

        // Ist Zug gueltig?
        if(this.checkMove(board, pieceX, pieceY, newX, newY)) {
            // Wenn keine Figur geschlagen wird und kein Bauer gezogen wird, dann wird der Counter erhoeht
            // Wenn ein Bauer bewegt wird, dann wird der Bauer als bereits benutzt markiert
            if(board[newY][newX] === "-") {
                if(board[pieceY][pieceX] !== "b" || board[pieceY][pieceX] !== "B") {
                    counter++;
                    this.usedBauern[newY][newX] = "-";
                } else {
                    this.usedBauern[newY][newX] = "y";
                }
            }

            // NICHT BENUTZTER CODE
            // Ist ein Bauer in der Starterreihe des Gegners?
            board[newY][newX] = board[pieceY][pieceX];
            if((newY === 0 && board[newY][newX] === "B") || (newY === 7 && board[newY][newX] === "b")) {}
    
            // Vorheriges Feld auf leer setzen
            board[pieceY][pieceX] = "-";
            this.usedBauern[pieceY][pieceX] = "-";
    
            // wenn ein Koenig verschoben wurde, Position aktualisieren
            if(board[newY][newX] === "K") {
                this.schwarzerKoenig[0] = newX;
                this.schwarzerKoenig[1] = newY;
            } else if(board[newY][newX] === "k") {
                this.weisserKoenig[0] = newX;
                this.weisserKoenig[1] = newY;
            }
    
            // NICHT BENUTZTER CODE
            // Ist ein Koenig bedroht und kann die Bedrohung nicht mehr abwehren?
            // Dann steht ein Sieger fest!
            if(this.checkCheckmate(board, this.schwarzerKoenig[0], this.schwarzerKoenig[1])) {
                // weiß hat gewonnen
            } else if(this.checkCheckmate(board, this.weisserKoenig[0], this.weisserKoenig[1])) {
                // schwarz hat gewonnen
            }

            // NICHT BENUTZTER CODE
            // Wurden 75-mal keine Figuren geschlagen und Bauern bewegt?
            // Dann endet das Spiel remis, auch ohne vorherige Beschwerde!
            if(counter > 74) {
                // Unentschieden ohne Zutun des Spielers
            }

            // NICHT BENUTZTER CODE
            // Ist dieselbe Brettstellung bereits 5-mal aufgetreten?
            // Dann endet das Spiel remis, auch ohne vorherige Beschwerde!
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