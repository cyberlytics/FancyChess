const { updateBoard, getBoard, createGameboard} = require("../lib/access_db");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

describe('updateBoard', () => {
    beforeAll(async () => {
        await prisma.$connect();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });


    it('should update the board in the database', async () => {

        // Demoeintrag
        const gameID = (Math.random() * (999 - 100) + 100).toString();
        const default_spielfeld = {
            a1: "t", b1: "s", c1: "l", d1: "d", e1: "k", f1: "l", g1: "s", h1: "t",
            a2: "b", b2: "b", c2: "b", d2: "b", e2: "b", f2: "b", g2: "b", h2: "b",
            a3: "-", b3: "-", c3: "-", d3: "-", e3: "-", f3: "-", g3: "-", h3: "-",
            a4: "-", b4: "-", c4: "-", d4: "-", e4: "-", f4: "-", g4: "-", h4: "-",
            a5: "-", b5: "-", c5: "-", d5: "-", e5: "-", f5: "-", g5: "-", h5: "-",
            a6: "-", b6: "-", c6: "-", d6: "-", e6: "-", f6: "-", g6: "-", h6: "-",
            a7: "B", b7: "B", c7: "B", d7: "B", e7: "B", f7: "B", g7: "B", h7: "B",
            a8: "T", b8: "S", c8: "L", d8: "D", e8: "K", f8: "L", g8: "S", h8: "T"
        };

        const updatedBoard = {
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
        //await prisma.games.create({data: {gameID, board}});
        const creating = await createGameboard(gameID,board);

        // Nun wollen wir das Schachbrett uns ziehen
        const results = await getBoard(gameID);

        //Wir wollen nur überprüfen, ob das Board und die ID stimmen
        const ankommendesBoard = results["board"];
        const ankommendeID = results["gameID"];

        // Assert - wurde der Datenbankeintrag erstellt und d ie DB ordungsgemäß abgelegt?
        expect(ankommendeID).toEqual(gameID);
        expect(board).toEqual(ankommendesBoard);

        // Nun wollen wir ein Update durchführen
        const board_update = JSON.stringify(updatedBoard);
        const sending = await updateBoard(ankommendeID, board_update);

        // Retrieve the updated game entry from the database
        const result = await getBoard(ankommendeID);

        //Wir wollen nur überprüfen, ob das Board und die ID stimmen nach dem Update
        const ankommendesBoard_nachUpdate = result["board"];
        const ankommendeID_nachUpdate = result["gameID"]

        // Assert - wurde mein Update erfolgreich durchgeführt?
        expect(ankommendesBoard_nachUpdate).toEqual(board_update);
    });
});
