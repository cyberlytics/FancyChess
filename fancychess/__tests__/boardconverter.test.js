import '@testing-library/jest-dom';
import {boardDictToArr} from "../lib/chessboard_converter.js";
import {boardArrToDict} from "../lib/chessboard_converter.js";
import {compareArrBoards} from "../lib/compare_boards.js";
import {compareDictBoards} from "../lib/compare_boards.js";

describe('Convert Boards', () => {
    it('Board Dict to Arr', () => {
        let dictboard = {
            a1: "t", b1: "s", c1: "l", d1: "d", e1: "k", f1: "l", g1: "s", h1: "t",
            a2: "b", b2: "b", c2: "b", d2: "b", e2: "b", f2: "b", g2: "b", h2: "b",
            a3: "-", b3: "-", c3: "-", d3: "-", e3: "-", f3: "-", g3: "-", h3: "-",
            a4: "-", b4: "-", c4: "-", d4: "-", e4: "-", f4: "-", g4: "-", h4: "-",
            a5: "-", b5: "-", c5: "-", d5: "-", e5: "-", f5: "-", g5: "-", h5: "-",
            a6: "-", b6: "-", c6: "-", d6: "-", e6: "-", f6: "-", g6: "-", h6: "-",
            a7: "B", b7: "B", c7: "B", d7: "B", e7: "B", f7: "B", g7: "B", h7: "B",
            a8: "T", b8: "S", c8: "L", d8: "D", e8: "K", f8: "L", g8: "S", h8: "T",
        };
        let dict2arr_prompt = boardDictToArr(dictboard);
        let arrboard_expect = [
            ["t","s","l","d","k","l","s","t"],
            ["b","b","b","b","b","b","b","b"],
            ["-","-","-","-","-","-","-","-"],
            ["-","-","-","-","-","-","-","-"],
            ["-","-","-","-","-","-","-","-"],
            ["-","-","-","-","-","-","-","-"],
            ["B","B","B","B","B","B","B","B"],
            ["T","S","L","D","K","L","S","T"]
        ];

        expect(compareArrBoards(dict2arr_prompt, arrboard_expect)).toBe(true);
    });

    it('Board Arr to Dict', () => {
        let arrboard = [
            ["t","s","l","d","k","l","s","t"],
            ["b","b","b","b","b","b","b","b"],
            ["-","-","-","-","-","-","-","-"],
            ["-","-","-","-","-","-","-","-"],
            ["-","-","-","-","-","-","-","-"],
            ["-","-","-","-","-","-","-","-"],
            ["B","B","B","B","B","B","B","B"],
            ["T","S","L","D","K","L","S","T"]
        ];
        let arr2dict_prompt = boardArrToDict(arrboard);
        let dictboard_expect = {
            a1: "t", b1: "s", c1: "l", d1: "d", e1: "k", f1: "l", g1: "s", h1: "t",
            a2: "b", b2: "b", c2: "b", d2: "b", e2: "b", f2: "b", g2: "b", h2: "b",
            a3: "-", b3: "-", c3: "-", d3: "-", e3: "-", f3: "-", g3: "-", h3: "-",
            a4: "-", b4: "-", c4: "-", d4: "-", e4: "-", f4: "-", g4: "-", h4: "-",
            a5: "-", b5: "-", c5: "-", d5: "-", e5: "-", f5: "-", g5: "-", h5: "-",
            a6: "-", b6: "-", c6: "-", d6: "-", e6: "-", f6: "-", g6: "-", h6: "-",
            a7: "B", b7: "B", c7: "B", d7: "B", e7: "B", f7: "B", g7: "B", h7: "B",
            a8: "T", b8: "S", c8: "L", d8: "D", e8: "K", f8: "L", g8: "S", h8: "T",
        };

        expect(compareDictBoards(arr2dict_prompt, dictboard_expect)).toBe(true);
    });
});