// Funktion, um Schachbrett in Dictionary-Form in ein zweidimensionales Array zu konvertieren
export function boardDictToArr(dictboard) {
    // Ergebnisboard und temporaere Variablen
    let arrboard = [];
    let tmparr1 = [];
    let tmparr2 = [];
    let tmparr3 = [];
    let tmparr4 = [];
    let tmparr5 = [];
    let tmparr6 = [];
    let tmparr7 = [];
    let tmparr8 = [];

    // Abrufen jedes einzelnen Elements und Hinzufuegen in entsprechende temporaere Array-Variable
    // am Ende einer Reihe wird das jeweilige temporaere Array in das Ergebnisarray eingefuegt

    let a1 = dictboard['a1'];
    let b1 = dictboard['b1'];
    let c1 = dictboard['c1'];
    let d1 = dictboard['d1'];
    let e1 = dictboard['e1'];
    let f1 = dictboard['f1'];
    let g1 = dictboard['g1'];
    let h1 = dictboard['h1'];
    tmparr1.push(a1);
    tmparr1.push(b1);
    tmparr1.push(c1);
    tmparr1.push(d1);
    tmparr1.push(e1);
    tmparr1.push(f1);
    tmparr1.push(g1);
    tmparr1.push(h1);
    arrboard.push(tmparr1);

    let a2 = dictboard['a2'];
    let b2 = dictboard['b2'];
    let c2 = dictboard['c2'];
    let d2 = dictboard['d2'];
    let e2 = dictboard['e2'];
    let f2 = dictboard['f2'];
    let g2 = dictboard['g2'];
    let h2 = dictboard['h2'];
    tmparr2.push(a2);
    tmparr2.push(b2);
    tmparr2.push(c2);
    tmparr2.push(d2);
    tmparr2.push(e2);
    tmparr2.push(f2);
    tmparr2.push(g2);
    tmparr2.push(h2);
    arrboard.push(tmparr2);

    let a3 = dictboard['a3'];
    let b3 = dictboard['b3'];
    let c3 = dictboard['c3'];
    let d3 = dictboard['d3'];
    let e3 = dictboard['e3'];
    let f3 = dictboard['f3'];
    let g3 = dictboard['g3'];
    let h3 = dictboard['h3'];
    tmparr3.push(a3);
    tmparr3.push(b3);
    tmparr3.push(c3);
    tmparr3.push(d3);
    tmparr3.push(e3);
    tmparr3.push(f3);
    tmparr3.push(g3);
    tmparr3.push(h3);
    arrboard.push(tmparr3);

    let a4 = dictboard['a4'];
    let b4 = dictboard['b4'];
    let c4 = dictboard['c4'];
    let d4 = dictboard['d4'];
    let e4 = dictboard['e4'];
    let f4 = dictboard['f4'];
    let g4 = dictboard['g4'];
    let h4 = dictboard['h4'];
    tmparr4.push(a4);
    tmparr4.push(b4);
    tmparr4.push(c4);
    tmparr4.push(d4);
    tmparr4.push(e4);
    tmparr4.push(f4);
    tmparr4.push(g4);
    tmparr4.push(h4);
    arrboard.push(tmparr4);

    let a5 = dictboard['a5'];
    let b5 = dictboard['b5'];
    let c5 = dictboard['c5'];
    let d5 = dictboard['d5'];
    let e5 = dictboard['e5'];
    let f5 = dictboard['f5'];
    let g5 = dictboard['g5'];
    let h5 = dictboard['h5'];
    tmparr5.push(a5);
    tmparr5.push(b5);
    tmparr5.push(c5);
    tmparr5.push(d5);
    tmparr5.push(e5);
    tmparr5.push(f5);
    tmparr5.push(g5);
    tmparr5.push(h5);
    arrboard.push(tmparr5);

    let a6 = dictboard['a6'];
    let b6 = dictboard['b6'];
    let c6 = dictboard['c6'];
    let d6 = dictboard['d6'];
    let e6 = dictboard['e6'];
    let f6 = dictboard['f6'];
    let g6 = dictboard['g6'];
    let h6 = dictboard['h6'];
    tmparr6.push(a6);
    tmparr6.push(b6);
    tmparr6.push(c6);
    tmparr6.push(d6);
    tmparr6.push(e6);
    tmparr6.push(f6);
    tmparr6.push(g6);
    tmparr6.push(h6);
    arrboard.push(tmparr6);

    let a7 = dictboard['a7'];
    let b7 = dictboard['b7'];
    let c7 = dictboard['c7'];
    let d7 = dictboard['d7'];
    let e7 = dictboard['e7'];
    let f7 = dictboard['f7'];
    let g7 = dictboard['g7'];
    let h7 = dictboard['h7'];
    tmparr7.push(a7);
    tmparr7.push(b7);
    tmparr7.push(c7);
    tmparr7.push(d7);
    tmparr7.push(e7);
    tmparr7.push(f7);
    tmparr7.push(g7);
    tmparr7.push(h7);
    arrboard.push(tmparr7);

    let a8 = dictboard['a8'];
    let b8 = dictboard['b8'];
    let c8 = dictboard['c8'];
    let d8 = dictboard['d8'];
    let e8 = dictboard['e8'];
    let f8 = dictboard['f8'];
    let g8 = dictboard['g8'];
    let h8 = dictboard['h8'];
    tmparr8.push(a8);
    tmparr8.push(b8);
    tmparr8.push(c8);
    tmparr8.push(d8);
    tmparr8.push(e8);
    tmparr8.push(f8);
    tmparr8.push(g8);
    tmparr8.push(h8);
    arrboard.push(tmparr8);

    return arrboard;
}

// Funktion, um Schachbrett in Array-Form (zweidimensionales Array) in eins in Dictionary-Form zu konvertieren
export function boardArrToDict(arrboard) {
    // einzelne Festlegung der Werte des neuen Dictionary-Schachbrettes
    
    let dictboard = {
        a1: arrboard[0][0], b1: arrboard[0][1], c1: arrboard[0][2], d1: arrboard[0][3], e1: arrboard[0][4], f1: arrboard[0][5], g1: arrboard[0][6], h1: arrboard[0][7],
        a2: arrboard[1][0], b2: arrboard[1][1], c2: arrboard[1][2], d2: arrboard[1][3], e2: arrboard[1][4], f2: arrboard[1][5], g2: arrboard[1][6], h2: arrboard[1][7],
        a3: arrboard[2][0], b3: arrboard[2][1], c3: arrboard[2][2], d3: arrboard[2][3], e3: arrboard[2][4], f3: arrboard[2][5], g3: arrboard[2][6], h3: arrboard[2][7],
        a4: arrboard[3][0], b4: arrboard[3][1], c4: arrboard[3][2], d4: arrboard[3][3], e4: arrboard[3][4], f4: arrboard[3][5], g4: arrboard[3][6], h4: arrboard[3][7],
        a5: arrboard[4][0], b5: arrboard[4][1], c5: arrboard[4][2], d5: arrboard[4][3], e5: arrboard[4][4], f5: arrboard[4][5], g5: arrboard[4][6], h5: arrboard[4][7],
        a6: arrboard[5][0], b6: arrboard[5][1], c6: arrboard[5][2], d6: arrboard[5][3], e6: arrboard[5][4], f6: arrboard[5][5], g6: arrboard[5][6], h6: arrboard[5][7],
        a7: arrboard[6][0], b7: arrboard[6][1], c7: arrboard[6][2], d7: arrboard[6][3], e7: arrboard[6][4], f7: arrboard[6][5], g7: arrboard[6][6], h7: arrboard[6][7],
        a8: arrboard[7][0], b8: arrboard[7][1], c8: arrboard[7][2], d8: arrboard[7][3], e8: arrboard[7][4], f8: arrboard[7][5], g8: arrboard[7][6], h8: arrboard[7][7]
    };

    return dictboard;
}