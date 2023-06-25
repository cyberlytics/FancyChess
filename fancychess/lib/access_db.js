import prisma from './prisma'

// READ
export const getBoard = async gameID => {
    await prisma.$connect()

    const database = await prisma.games.findUnique({
        where: { gameID }
    })
    return database
}

// CREATE
export const createGameboard = async (gameID, board) => {
    await prisma.$connect()

    const database = await prisma.games.create({
        data: {
            gameID,
            board
        }
    })
    return database
}

// UPDATE
export const updateBoard = async (gameID, board) => {
    await prisma.$connect()

    const database = await prisma.games.update({
        where: {
            gameID
        },
        data: {
            ...board
        }
    })
    return database
}
