import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { PrismaClient } from '@prisma/client'

let prisma
import {
    getBoard,
    updateBoard
} from '../../../lib/access_db'
import jQuery from "prisma";

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
                const live_board = await getBoard(parseInt(ID))

                //Ergebnis aus der Datenbank:
                const ankommendesBoard = live_board["board"];
                const ankommendeID = live_board["gameID"]

                //TODO:Logik hier mit einbauen  -> Das ist nur temporär!!!
                let temp = ankommendesBoard[von]
                ankommendesBoard[von] = '-'
                ankommendesBoard[nach] = temp


                console.log("ID: ",ankommendeID)
                console.log("von: ",von)
                console.log("nach: ",nach)

                //Speichere das Board in der Datenbank
                const board = updateBoard(ankommendeID, ankommendesBoard)
                return res.status(200).json(ankommendesBoard);

            }
            case 'GET':{
                //Übergebe die individuelle GameID
                const ID = req.query.ID;

                //Hole das Board aus der Datenbank
                const data_server = await getBoard(parseInt(ID))

                //Hier sind die Daten vom Server
                const ankommendesBoard = data_server["board"];
                const ankommendeID = data_server["gameID"]

                //Schicke nun das Board mit der ID zurück
                return  res.status(200).json({ID: ankommendeID,board:ankommendesBoard})
            }

            case 'PUT': {
                const ID = req.body["ID"];
                const von = req.body["von"];
                const nach = req.body["nach"];

                // Query the existing board
                const data_server = await getBoard(parseInt(ID));
                if (!data_server) {
                    return res.status(404).json({ error: "Board not found" });
                }
                const ankommendesBoard = data_server.board;
                const ankommendeID = data_server.gameID;

                // Implement game logic and update the board
                let temp = ankommendesBoard[von];
                ankommendesBoard[von] = '-';
                ankommendesBoard[nach] = temp;

                // Update the board in the database
                await updateBoard(ankommendeID, ankommendesBoard);

                res.status(200).json({ board: ankommendesBoard });
                break;
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
