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
                //const { ID, von, nach } = req.body
                //Hole das Board aus der Datenbank
                //const board = await getBoard(req.body["ID"])

                //TODO: Temporäres Spielfeld, bis die Datenbankanbindung steht

                const default_spielfeld = {
                    a1: "t", b1: "s", c1: "l", d1: "d", e1: "k", f1: "l", g1: "s", h1: "t",
                    a2: "b", b2: "b", c2: "b", d2: "b", e2: "b", f2: "b", g2: "b", h2: "b",
                    a3: "-", b3: "-", c3: "-", d3: "-", e3: "-", f3: "-", g3: "-", h3: "-",
                    a4: "-", b4: "-", c4: "-", d4: "-", e4: "-", f4: "-", g4: "-", h4: "-",
                    a5: "-", b5: "-", c5: "-", d5: "B", e5: "-", f5: "-", g5: "-", h5: "-",
                    a6: "-", b6: "-", c6: "-", d6: "-", e6: "-", f6: "-", g6: "-", h6: "-",
                    a7: "B", b7: "B", c7: "B", d7: "-", e7: "B", f7: "B", g7: "B", h7: "B",
                    a8: "T", b8: "S", c8: "L", d8: "D", e8: "K", f8: "L", g8: "S", h8: "T"
                };

                return  res.status(200).json(default_spielfeld)
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
