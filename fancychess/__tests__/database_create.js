
const { PrismaClient } = require('@prisma/client');
const {getBoard, createGameboard} = require("../lib/access_db");

//Instanz für das Testen
const prisma = new PrismaClient();

describe('getBoard', () => {
    beforeAll(async () => {
        await prisma.$connect();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('Erwarte: Datenbankeintrag für die entsprechende ID', async () => {
        // Dieser Eintrag liegt schon in der Datenbank
        const gameID = "565656";
        const default_spielfeld = {
            a1: "t", b1: "s", c1: "l", d1: "d", e1: "k", f1: "l", g1: "s", h1: "t",
            a2: "b", b2: "b", c2: "b", d2: "b", e2: "b", f2: "b", g2: "b", h2: "b",
            a3: "-", b3: "-", c3: "-", d3: "-", e3: "-", f3: "-", g3: "-", h3: "-",
            a4: "-", b4: "-", c4: "-", d4: "-", e4: "-", f4: "-", g4: "-", h4: "-",
            a5: "-", b5: "-", c5: "B", d5: "-", e5: "-", f5: "-", g5: "-", h5: "-",
            a6: "-", b6: "-", c6: "-", d6: "-", e6: "-", f6: "-", g6: "-", h6: "-",
            a7: "B", b7: "B", c7: "-", d7: "B", e7: "B", f7: "B", g7: "B", h7: "B",
            a8: "T", b8: "S", c8: "L", d8: "D", e8: "K", f8: "L", g8: "S", h8: "T"
        };

        const board = JSON.stringify(default_spielfeld);
        await prisma.games.create({ data: {gameID,board} });

        // Nun wollen wir das Schachbrett uns ziehen
        const result = await getBoard(gameID);

        //Wir wollen nur überprüfen, ob das Board und die ID stimmen
        const ankommendesBoard = result["board"];
        const ankommendeID = result["gameID"];

        // Assert
        expect(ankommendeID).toEqual(gameID);
        expect(ankommendesBoard).toEqual(board);
    });

    it('Erwarte einen null-Wert wenn es keinen Eintrag gibt', async () => {
        const invalidGameID = 100000;
        const result = await getBoard(invalidGameID);

        // Assert
        expect(result).toBeNull();
    });
});
