import prisma from './prisma'

// READ
export const getBoard = async gameID => {
    try {
        await prisma.$connect();

        const database = await prisma.games.findFirst({
            where: { gameID: String(gameID) }
        });
        //Kein Eintrag gefunden
        if (!database) {return null;}
        return database;
    } catch (error) {
        console.error('Error (getBoard):', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};

// CREATE
export const createGameboard = async (gameID, board) => {
    try {
        await prisma.$connect();

        const database = await prisma.games.create({
            data: {
                gameID: String(gameID),
                board
            }
        });
        return database;
    } catch (error) {
        console.error('Error (createGameboard):', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};

// UPDATE
export const updateBoard = async (gameID, board) => {
    try {
        await prisma.$connect();

        await prisma.games.updateMany({
            where: {
                gameID: String(gameID),
            },
            data: {
                board,
            },
        });
    } catch (error) {
        console.error('Error (updateBoard):', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};


