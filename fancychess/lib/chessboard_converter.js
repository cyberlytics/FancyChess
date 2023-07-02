export function boardDictToArr(dictboard) {
    let arrboard = [];

    for(let i = 1; i < 9; i++) {
        let temparr = [];

        for(let j = 0; j < 8; j++) {
            let b = "";

            if(j == 0) {
                b = "a";
            } else if(j == 1) {
                b = "b";
            } else if(j == 2) {
                b = "c";
            } else if(j == 3) {
                b = "d";
            } else if(j == 4) {
                b = "e";
            } else if(j == 5) {
                b = "f";
            } else if(j == 6) {
                b = "g";
            } else if(j == 7) {
                b = "h";
            }

            let bezeichner = "" + b + i.toString;

            temparr.push(dictboard[bezeichner]);
        }

        arrboard.push(temparr);
    }

    return arrboard;
}

export function boardArrToDict(arrboard) {
    let dictboard = {};

    for(let i = 1; i < 9; i++) {
        for(let j = 0; j < 8; j++) {
            let b = "";

            if(j == 0) {
                b = "a";
            } else if(j == 1) {
                b = "b";
            } else if(j == 2) {
                b = "c";
            } else if(j == 3) {
                b = "d";
            } else if(j == 4) {
                b = "e";
            } else if(j == 5) {
                b = "f";
            } else if(j == 6) {
                b = "g";
            } else if(j == 7) {
                b = "h";
            }

            let bezeichner = "" + b + i.toString;

            dictboard[bezeichner] = arrboard[i - 1][j];
        }
    }

    return dictboard;
}