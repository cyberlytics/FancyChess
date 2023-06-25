import prisma from './prisma'

// READ
export const getBoard = async gameID => {
    const database = await prisma.fancy_chess.findUnique({
        where: { gameID }
    })
    return database
}

// CREATE
export const createGameboard = async (gameID, board) => {
    const database = await prisma.fancy_chess.create({
        data: {
            gameID,
            board
        }
    })
    return database
}

// UPDATE
export const updateBoard = async (gameID, board) => {
    const database = await prisma.fancy_chess.update({
        where: {
            gameID
        },
        data: {
            ...board
        }
    })
    return database
}
