const { updateBoard, getBoard} = require("../lib/access_db");
const { PrismaClient } = require('@prisma/client');

// Create a new instance of the Prisma client
const prisma = new PrismaClient();

describe('updateBoard', () => {
    beforeAll(async () => {
        await prisma.$connect();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    afterEach(async () => {
        // Clear the database after each test
        await prisma.games.deleteMany();
    });

    it('should update the board in the database', async () => {
        const gameID = "565656";
        const initialBoard = {
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

        // Create a sample game entry in the database with initial board data
        await prisma.games.create({ data: { gameID, board: JSON.stringify(initialBoard) } });

        // Call the updateBoard function with the game ID and updated board data
        await updateBoard(gameID, JSON.stringify(updatedBoard));

        // Retrieve the updated game entry from the database
        const result = await getBoard(gameID);

        // Verify that the board has been updated
        expect(result.board).toEqual(JSON.stringify(updatedBoard));
    });


    it('should throw an error if updating the board fails', async () => {
        const gameID = "565656";
        const board = {
            a1: "t", b1: "s", c1: "l", d1: "d", e1: "k", f1: "l", g1: "s", h1: "t",
            a2: "b", b2: "b", c2: "b", d2: "b", e2: "b", f2: "b", g2: "b", h2: "b",
            a3: "-", b3: "-", c3: "-", d3: "-", e3: "-", f3: "-", g3: "-", h3: "-",
            a4: "-", b4: "-", c4: "-", d4: "-", e4: "-", f4: "-", g4: "-", h4: "-",
            a5: "-", b5: "-", c5: "-", d5: "-", e5: "-", f5: "-", g5: "-", h5: "-",
            a6: "-", b6: "-", c6: "-", d6: "-", e6: "-", f6: "-", g6: "-", h6: "-",
            a7: "B", b7: "B", c7: "B", d7: "B", e7: "B", f7: "B", g7: "B", h7: "B",
            a8: "T", b8: "S", c8: "L", d8: "D", e8: "K", f8: "L", g8: "S", h8: "T"
        };

        // Mock the Prisma client's update method to throw an error
        prisma.games.update = jest.fn().mockRejectedValue(new Error('Update failed'));

        // Call the updateBoard function and expect it to throw an error
        await expect(updateBoard(gameID, JSON.stringify(board))).rejects.toThrowError('Update failed');

        // Verify that the update method was called with the correct parameters
        expect(prisma.games.update).toHaveBeenCalledWith({
            where: { gameID: String(gameID) },
            data: { board: JSON.stringify(board) },
        });
    });
});
