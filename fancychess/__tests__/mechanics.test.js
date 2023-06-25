const boardToCode = require("../mechanics/mechanics")
import '@testing-library/jest-dom';

describe('Mechanics', () => {
    it('Board to Code', () => {
        let board = [["t","s","l","k","d","l","s","t"],
                    ["b","b","b","b","b","b","b","b"],
                    ["-","-","-","-","-","-","-","-"],
                    ["-","-","-","-","-","-","-","-"],
                    ["-","-","-","-","-","-","-","-"],
                    ["-","-","-","-","-","-","-","-"],
                    ["B","B","B","B","B","B","B","B"],
                    ["T","S","L","K","D","L","S","T"]];
        let board_positions = boardToCode(board,"W");
        let board_to_code_expect = "WFJHBDHJFLLLLLLLL--------------------------------KKKKKKKKEIGACGIE";
        expect(board_positions == board_to_code_expect).toBe(true);
    });

    it('Convert column A', () => {
        let columnA_prompt = convertColumn("A");
        let convert_column_a_expect = 0;
        expect(columnA_prompt == convert_column_a_expect).toBe(true);
    });

    it('Convert column B', () => {
        let columnB_prompt = convertColumn("B");
        let convert_column_b_expect = 1;
        expect(columnB_prompt == convert_column_b_expect).toBe(true);
    });

    it('Convert column C', () => {
        let columnC_prompt = convertColumn("C");
        let convert_column_c_expect = 2;
        expect(columnC_prompt == convert_column_c_expect).toBe(true);
    });

    it('Convert column D', () => {
        let columnD_prompt = convertColumn("D");
        let convert_column_d_expect = 3;
        expect(columnD_prompt == convert_column_d_expect).toBe(true);
    });

    it('Convert column E', () => {
        let columnE_prompt = convertColumn("E");
        let convert_column_e_expect = 4;
        expect(columnE_prompt == convert_column_e_expect).toBe(true);
    });

    it('Convert column F', () => {
        let columnF_prompt = convertColumn("F");
        let convert_column_f_expect = 5;
        expect(columnF_prompt == convert_column_f_expect).toBe(true);
    });

    it('Convert column G', () => {
        let columnG_prompt = convertColumn("G");
        let convert_column_g_expect = 6;
        expect(columnG_prompt == convert_column_g_expect).toBe(true);
    });

    it('Convert column H', () => {
        let columnH_prompt = convertColumn("H");
        let convert_column_h_expect = 7;
        expect(columnH_prompt == convert_column_h_expect).toBe(true);
    });

    it('Valid Code to Board', () => {
        let validCode = codeToBoard("WFJHBDHJFLLLLLLLL--------------------------------KKKKKKKKEIGACGIE");
        let expectedBoard = [["t","s","l","k","d","l","s","t"],["b","b","b","b","b","b","b","b"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["B","B","B","B","B","B","B","B"],["T","S","L","K","D","L","S","T"]];
        expect(validCode == expectedBoard).toBe(true);
    });

    it('Invalid Code to Board', () => {
        let invalidCode = codeToBoard("WFJHBDHJFLQLLLLLL--------------------------------KKKKKKKKEIGACGIE");
        let expectedC2BResponse = "Ungueltiger Code";
        expect(invalidCode == expectedC2BResponse).toBe(true);
    });

    it('Generate Chess Board', () => {
        let generateChessCall = generateChess();
        let expectedNewBoard = [["t","s","l","k","d","l","s","t"],["b","b","b","b","b","b","b","b"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["-","-","-","-","-","-","-","-"],["B","B","B","B","B","B","B","B"],["T","S","L","K","D","L","S","T"]];
        expect(generateChessCall == expectedNewBoard).toBe(true);
    });
  });