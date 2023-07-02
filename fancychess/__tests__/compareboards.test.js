import '@testing-library/jest-dom';
import {compareArrBoards} from "../lib/compare_boards.js";
import {compareDictBoards} from "../lib/compare_boards.js";

describe('Compare Boards', () => {
    it('Compare Array Boards', () => {
        let arrboard1 = [
            ["t","s","l","k","d","l","s","t"],
            ["b","b","b","b","b","b","b","b"],
            ["-","-","-","-","-","-","-","-"],
            ["-","-","-","-","-","-","-","-"],
            ["-","-","-","-","-","-","-","-"],
            ["-","-","-","-","-","-","-","-"],
            ["B","B","B","B","B","B","B","B"],
            ["T","S","L","K","D","L","S","T"]
        ];

        let arrboard2 = [
            ["t","s","l","k","d","l","s","t"],
            ["b","b","b","b","b","b","b","b"],
            ["-","-","-","-","-","-","-","-"],
            ["-","-","-","-","-","-","-","-"],
            ["-","-","-","-","-","-","-","-"],
            ["-","-","-","-","-","-","-","-"],
            ["B","B","B","B","B","B","B","B"],
            ["T","S","L","K","D","L","S","T"]
        ];

        expect(compareArrBoards(arrboard1, arrboard2)).toBe(true);
    });

    it('Compare Dict Boards', () => {
        let dictboard1 = {
            a1: "t", b1: "s", c1: "l", d1: "d", e1: "k", f1: "l", g1: "s", h1: "t",
            a2: "b", b2: "b", c2: "b", d2: "b", e2: "b", f2: "b", g2: "b", h2: "b",
            a3: "-", b3: "-", c3: "-", d3: "-", e3: "-", f3: "-", g3: "-", h3: "-",
            a4: "-", b4: "-", c4: "-", d4: "-", e4: "-", f4: "-", g4: "-", h4: "-",
            a5: "-", b5: "-", c5: "-", d5: "-", e5: "-", f5: "-", g5: "-", h5: "-",
            a6: "-", b6: "-", c6: "-", d6: "-", e6: "-", f6: "-", g6: "-", h6: "-",
            a7: "B", b7: "B", c7: "B", d7: "B", e7: "B", f7: "B", g7: "B", h7: "B",
            a8: "T", b8: "S", c8: "L", d8: "D", e8: "K", f8: "L", g8: "S", h8: "T",
        };

        let dictboard2 = {
            a1: "t", b1: "s", c1: "l", d1: "d", e1: "k", f1: "l", g1: "s", h1: "t",
            a2: "b", b2: "b", c2: "b", d2: "b", e2: "b", f2: "b", g2: "b", h2: "b",
            a3: "-", b3: "-", c3: "-", d3: "-", e3: "-", f3: "-", g3: "-", h3: "-",
            a4: "-", b4: "-", c4: "-", d4: "-", e4: "-", f4: "-", g4: "-", h4: "-",
            a5: "-", b5: "-", c5: "-", d5: "-", e5: "-", f5: "-", g5: "-", h5: "-",
            a6: "-", b6: "-", c6: "-", d6: "-", e6: "-", f6: "-", g6: "-", h6: "-",
            a7: "B", b7: "B", c7: "B", d7: "B", e7: "B", f7: "B", g7: "B", h7: "B",
            a8: "T", b8: "S", c8: "L", d8: "D", e8: "K", f8: "L", g8: "S", h8: "T",
        };

        expect(compareDictBoards(dictboard1, dictboard2)).toBe(true);
    });
  });