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
        })
  });