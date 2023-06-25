import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { PrismaClient } from '@prisma/client'

let prisma
import {
    getBoard,
    updateBoard
} from '../../prisma/access_db'

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)

    //if (!session) {
    //  res.status(403).json({ error: "Not signed in" })
    //} else {
    //Wenn etwas zum Server geschickt wird --> POST
    try {

        switch (req.method){
            //Schicke die Daten zum Server
            case 'POST':{
                // Update durchführen, wenn das Spielbrett schon vorhanden ist
                //const { ID, von, nach } = req.body
                const ID = req.body["ID"];
                const von = req.body["von"];
                const nach = req.body["nach"];

                //Entnehme das Board aus der Datenbank
                //const live_board = await getBoard(ID)

                //TODO:Logik hier mit einbauen
                console.log("ID: ",ID)
                console.log("von: ",von)
                console.log("nach: ",nach)


                let neuesBoard;
                //Speichere das Board in der Datenbank
                //const board = await updateBoard(ID, neuesBoard)
                return res.status(200).json({info:req.body});

            }
            case 'GET':{
                //Übergebe die individuelle GameID
                const { ID, von, nach } = req.body
                //Hole das Board aus der Datenbank
                const board = await getBoard(ID)
                return  res.status(200).json(board)
            }
            default:
                return res.status(200).json({error: "Kein POST oder GET!"})
        }

    } catch (error){
        res.status(500).json({ ...error, message: error.message })
    }
    return res
//    }
}
