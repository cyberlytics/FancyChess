import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

import {
    getBoard,
    createGameboard,
    updateBoard
} from '../../../lib/access_db'

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)

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

        //Wenn etwas zum Server geschickt wird --> POST
    try {

        switch (req.method){
            //Schicke die Daten zum Server
            case 'POST':{
                //schicke eine Flag beim ersten Mal mit.
                //api/game/receive?id=1
                if(req.query.id){
                    //Erstelle das Spielbrett
                    const { ID, von, nach } = req.body
                    const newBoard = await createGameboard(ID, default_spielfeld)
                    res.status(200).json(newBoard)
                    break;
                }else{
                    // Update durchführen, wenn das Spielbrett schon vorhanden ist
                    const { ID, von, nach } = req.body
                    const live_board = await getBoard(ID)
                    const board = await updateBoard(ID, live_board)
                    res.status(200).json(board)
                    break;
                }
            }
            case 'GET':{
                //api/game/receive?id=1
                //Gib die board id mit, dann bekommst du das board
                const board = await getBoard(req.query.id)
                return res.status(200).json(board)

            }
            default:
                break
        }
            // Handle any other HTTP method
            res.status(200).json({error: "Das war kein POST..."})

        } catch (error){
            return res.status(500).json({ ...error, message: error.message })
        }
//    }
}