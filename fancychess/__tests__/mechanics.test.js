import '@testing-library/jest-dom';
import ChessMechanics from "../lib/chess_mechanics";

import {compareArrBoards} from "../lib/compare_boards.js";

// oben wurden benoetigte Funktionen und Bibliotheken importiert
// unter anderem meine externe Funktion compareArrBoards, um Schachbretter miteinander vergleichen zu koennen, was mit dem == Operator nicht funktioniert.

// neue Klasseninstanz der Mechaniken erstellen
// Game ID 20 ist willkuerlich gesetzt und hat keinerlei Bedeutung
ChessMechanics.addInstance(20);
const mechanics = ChessMechanics.getInstance(20);

// SYNTAX DER TESTS
// Meist ist ein Schachbrett definiert, um eine bestimmte Situation abzubilden
// Prompt stellt die Eingabe dar, den Funktionsaufruf
// Expect stellt dar, welche Rueckgabe erwartet wird

describe('Mechanics', () => {
    // Vordefiniertes Schachbrett in Code konvertieren
    it('Board to Code', () => {
        let board = [["t","s","l","k","d","l","s","t"],
                    ["b","b","b","b","b","b","b","b"],
                    ["-","-","-","-","-","-","-","-"],
                    ["-","-","-","-","-","-","-","-"],
                    ["-","-","-","-","-","-","-","-"],
                    ["-","-","-","-","-","-","-","-"],
                    ["B","B","B","B","B","B","B","B"],
                    ["T","S","L","K","D","L","S","T"]];
        let board_positions = mechanics.boardToCode(board,"W");
        let board_to_code_expect = "WFJHBDHJFLLLLLLLL--------------------------------KKKKKKKKEIGACGIE";
        expect(board_positions == board_to_code_expect).toBe(true);
    });

    // Spalte A in Zahl konvertieren
    it('Convert column A', () => {
        let columnA_prompt = mechanics.convertColumn("A");
        let convert_column_a_expect = 0;
        expect(columnA_prompt == convert_column_a_expect).toBe(true);
    });

    // Spalte B in Zahl konvertieren
    it('Convert column B', () => {
        let columnB_prompt = mechanics.convertColumn("B");
        let convert_column_b_expect = 1;
        expect(columnB_prompt == convert_column_b_expect).toBe(true);
    });

    // Spalte C in Zahl konvertieren
    it('Convert column C', () => {
        let columnC_prompt = mechanics.convertColumn("C");
        let convert_column_c_expect = 2;
        expect(columnC_prompt == convert_column_c_expect).toBe(true);
    });

    // Spalte D in Zahl konvertieren
    it('Convert column D', () => {
        let columnD_prompt = mechanics.convertColumn("D");
        let convert_column_d_expect = 3;
        expect(columnD_prompt == convert_column_d_expect).toBe(true);
    });

    // Spalte E in Zahl konvertieren
    it('Convert column E', () => {
        let columnE_prompt = mechanics.convertColumn("E");
        let convert_column_e_expect = 4;
        expect(columnE_prompt == convert_column_e_expect).toBe(true);
    });

    // Spalte F in Zahl konvertieren
    it('Convert column F', () => {
        let columnF_prompt = mechanics.convertColumn("F");
        let convert_column_f_expect = 5;
        expect(columnF_prompt == convert_column_f_expect).toBe(true);
    });

    // Spalte G in Zahl konvertieren
    it('Convert column G', () => {
        let columnG_prompt = mechanics.convertColumn("G");
        let convert_column_g_expect = 6;
        expect(columnG_prompt == convert_column_g_expect).toBe(true);
    });

    // Spalte H in Zahl konvertieren
    it('Convert column H', () => {
        let columnH_prompt = mechanics.convertColumn("H");
        let convert_column_h_expect = 7;
        expect(columnH_prompt == convert_column_h_expect).toBe(true);
    });

    // Gueltiger Code wird in ein Schachbrett konvertiert
    it('Valid Code to Board', () => {
        let validCode = mechanics.codeToBoard("WFJHBDHJFLLLLLLLL--------------------------------KKKKKKKKEIGACGIE");
        let expectedBoard = [["t","s","l","k","d","l","s","t"],["b","b","b","b","b","b","b","b"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["B","B","B","B","B","B","B","B"],["T","S","L","K","D","L","S","T"]];
        expect(compareArrBoards(validCode, expectedBoard)).toBe(true);
    });

    // Ungueltiger Code soll in Schachbrett konvertiert werden, es muesste ein Fehler herauskommen
    it('Invalid Code to Board', () => {
        let invalidCode = mechanics.codeToBoard("WFJHBDHJFLQLLLLLL--------------------------------KKKKKKKKEIGACGIE");
        let expectedC2BResponse = "Ungueltiger Code";
        expect(invalidCode == expectedC2BResponse).toBe(true);
    });

    // Leeres Schachbrett generieren
    it('Generate Chess Board', () => {
        // HIER NOCH IMPORT ANDERE FKT
        let generateChessCall = mechanics.generateChess();
        let expectedNewBoard = [["t","s","l","d","k","l","s","t"],["b","b","b","b","b","b","b","b"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["B","B","B","B","B","B","B","B"],["T","S","L","D","K","L","S","T"]];
        expect(compareArrBoards(generateChessCall, expectedNewBoard)).toBe(true);
    });

    // Gewinner pruefen, schwarz hat gewonnen
    it('Check Winner with Black as Winner', () => {
        let boardBlackWin = [["t","s","l","-","d","l","s","t"],["b","b","b","b","b","b","b","b"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["B","B","B","B","B","B","B","B"],["T","S","L","K","D","L","S","T"]];
        let checkWinnerBlack = mechanics.checkWinner(boardBlackWin);
        let winnerBlackResult = "S";
        expect(checkWinnerBlack == winnerBlackResult).toBe(true);
    });

    // Gewinner pruefen, weiss hat gewonnen
    it('Check Winner with White as Winner', () => {
        let boardWhiteWin = [["t","s","l","k","d","l","s","t"],["b","b","b","b","b","b","b","b"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["B","B","B","B","B","B","B","B"],["T","S","L","-","D","L","S","T"]];
        let checkWinnerWhite = mechanics.checkWinner(boardWhiteWin);
        let winnerWhiteResult = "W";
        expect(checkWinnerWhite == winnerWhiteResult).toBe(true);
    });

    // Gewinner pruefen, niemand hat bisher gewonnen
    it('Check Winner with No Winner yet', () => {
        let boardNoWin = [["t","s","l","k","d","l","s","t"],["b","b","b","b","b","b","b","b"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["B","B","B","B","B","B","B","B"],["T","S","L","K","D","L","S","T"]];
        let checkWinnerNobody = mechanics.checkWinner(boardNoWin);
        let winnerNobodyResult = "continue";
        expect(checkWinnerNobody == winnerNobodyResult).toBe(true);
    });

    // Gewinner pruefen, beide Koenige sind nicht mehr vorhanden, Fehlersituation
    it('Check Winner Error Case', () => {
        let boardErrorWin = [["t","s","l","-","d","l","s","t"],["b","b","b","b","b","b","b","b"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["B","B","B","B","B","B","B","B"],["T","S","L","-","D","L","S","T"]];
        let checkWinnerError = mechanics.checkWinner(boardErrorWin);
        let winnerErrorResult = "error";
        expect(checkWinnerError == winnerErrorResult).toBe(true);
    });

    // Ungueltige Bewegung, Zugpflicht missachtet
    it('Check Move, Invalid', () => {
        let grundboard = [["t","s","l","d","k","l","s","t"],["b","b","b","b","b","b","b","b"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["B","B","B","B","B","B","B","B"],["T","S","L","D","K","L","S","T"]];
        let checkMoveInvalidPrompt = mechanics.checkMove(grundboard, 0, 0, 0, 0);
        expect(checkMoveInvalidPrompt).toBe(false);
    });

    // Ungueltige Bewegung, Koordinaten nicht im Bereich von 0 bis 7
    it('Check Move, Out Of Range', () => {
        let grundboard = [["t","s","l","d","k","l","s","t"],["b","b","b","b","b","b","b","b"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["B","B","B","B","B","B","B","B"],["T","S","L","D","K","L","S","T"]];
        let checkMoveOORPrompt = mechanics.checkMove(grundboard, 0, 0, -5, 5);
        expect(checkMoveOORPrompt).toBe(false);
    });

    // Erlaubte Koenig-Bewegung
    it('Check Move, Valid King Move', () => {
        let kingboard = [["t","s","l","d","-","l","s","t"],["b","b","b","b","b","b","b","b"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","k","-","-","-"],["-","-","-","-","-","-","-","-"],["B","B","B","B","B","B","B","B"],["T","S","L","D","K","L","S","T"]];
        let checkMoveKingValid = mechanics.checkMove(kingboard, 4, 4, 4, 5);
        expect(checkMoveKingValid).toBe(true);
    });

    // Nicht erlaubte Koenig-Bewegung
    it('Check Move, Invalid King Move', () => {
        let kingboard = [["t","s","l","d","-","l","s","t"],["b","b","b","b","b","b","b","b"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","k","-","-","-"],["-","-","-","-","-","-","-","-"],["B","B","B","B","B","B","B","B"],["T","S","L","D","K","L","S","T"]];
        let checkMoveKingInvalid = mechanics.checkMove(kingboard, 4, 4, 4, 6);
        expect(checkMoveKingInvalid).toBe(false);
    });

    // Erlaubte Damen-Bewegung
    it('Check Move, Valid Queen Move', () => {
        let queenboard = [["t","s","l","-","k","l","s","t"],["b","b","b","b","b","b","b","b"],["-","-","-","-","-","-","-","-"],["-","-","-","-","d","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["B","B","B","B","B","B","B","B"],["T","S","L","D","K","L","S","T"]];
        let checkMoveQueenValid = mechanics.checkMove(queenboard, 4, 3, 4, 4);
        expect(checkMoveQueenValid).toBe(true);
    });

    // Nicht erlaubte Damen-Bewegung
    it('Check Move, Invalid Queen Move', () => {
        let queenboard = [["t","s","l","-","k","l","s","t"],["b","b","b","b","b","b","b","b"],["-","-","-","-","-","-","-","-"],["-","-","-","-","d","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["B","B","B","B","B","B","B","B"],["T","S","L","D","K","L","S","T"]];
        let checkMoveQueenInvalid = mechanics.checkMove(queenboard, 4, 3, 5, 5);
        expect(checkMoveQueenInvalid).toBe(false);
    });

    // Erlaubte Turm-Bewegung
    it('Check Move, Valid Rook Move', () => {
        let rookboard = [["-","s","l","d","k","l","s","t"],["b","b","b","b","b","b","b","b"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","t","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["B","B","B","B","B","B","B","B"],["T","S","L","D","K","L","S","T"]];
        let checkMoveRookValid = mechanics.checkMove(rookboard, 2, 4, 2, 5);
        expect(checkMoveRookValid).toBe(true);
    });

    // Nicht erlaubte Turm-Bewegung
    it('Check Move, Invalid Rook Move', () => {
        let rookboard = [["-","s","l","d","k","l","s","t"],["b","b","b","b","b","b","b","b"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","t","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["B","B","B","B","B","B","B","B"],["T","S","L","D","K","L","S","T"]];
        let checkMoveRookInvalid = mechanics.checkMove(rookboard, 2, 4, 3, 5);
        expect(checkMoveRookInvalid).toBe(false);
    });

    // Erlaubte Laeufer-Bewegung
    it('Check Move, Valid Bishop Move', () => {
        let bishopboard = [["t","s","-","d","k","l","s","t"],["b","b","b","b","b","b","b","b"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","l","-","-","-","-"],["-","-","-","-","-","-","-","-"],["B","B","B","B","B","B","B","B"],["T","S","L","D","K","L","S","T"]];
        let checkMoveBishopValid = mechanics.checkMove(bishopboard, 3, 4, 4, 5);
        expect(checkMoveBishopValid).toBe(true);
    });

    // Nicht erlaubte Laeufer-Bewegung
    it('Check Move, Invalid Bishop Move', () => {
        let bishopboard = [["t","s","-","d","k","l","s","t"],["b","b","b","b","b","b","b","b"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","l","-","-","-","-"],["-","-","-","-","-","-","-","-"],["B","B","B","B","B","B","B","B"],["T","S","L","D","K","L","S","T"]];
        let checkMoveBishopInvalid = mechanics.checkMove(bishopboard, 3, 4, 3, 5);
        expect(checkMoveBishopInvalid).toBe(false);
    });

    // Erlaubte Springer-Bewegung
    it('Check Move, Valid Knight Move', () => {
        let knightboard = [["t","-","l","d","k","l","s","t"],["b","b","b","b","b","b","b","b"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","s","-","-","-"],["-","-","-","-","-","-","-","-"],["B","B","B","B","B","B","B","B"],["T","S","L","D","K","L","S","T"]];
        let checkMoveKnightValid = mechanics.checkMove(knightboard, 4, 4, 6, 5);
        expect(checkMoveKnightValid).toBe(true);
    });

    // Nicht Springer Koenig-Bewegung
    it('Check Move, Invalid Knight Move', () => {
        let knightboard = [["t","-","l","d","k","l","s","t"],["b","b","b","b","b","b","b","b"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","s","-","-","-"],["-","-","-","-","-","-","-","-"],["B","B","B","B","B","B","B","B"],["T","S","L","D","K","L","S","T"]];
        let checkMoveKnightInvalid = mechanics.checkMove(knightboard, 4, 4, 4, 5);
        expect(checkMoveKnightInvalid).toBe(false);
    });

    // Bewegung, bei der eine Figur geschlagen wird
    it('Check Move, Attacking', () => {
        let attackboard = [["t","s","l","d","-","l","s","t"],["b","b","b","b","b","b","b","b"],["-","-","-","-","-","-","-","-"],["-","-","k","D","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["B","B","B","B","B","B","B","B"],["T","S","L","-","K","L","S","T"]];
        let checkMoveAttack = mechanics.checkMove(attackboard, 3, 3, 2, 3);
        expect(checkMoveAttack).toBe(true);
    });

    // Ungueltige Bewegung, weil die Schachfigur eine andere passieren muesste
    it('Check Move, Stepping Over Another Piece', () => {
        let stepoverboard = [["t","s","l","-","k","l","s","t"],["b","b","b","b","b","b","b","b"],["-","-","-","-","T","d","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["B","B","B","B","B","B","B","B"],["-","S","L","D","K","L","S","T"]];
        let checkMoveStepOver = mechanics.checkMove(stepoverboard, 5, 2, 3, 2);
        expect(checkMoveStepOver).toBe(false);
    });
  });