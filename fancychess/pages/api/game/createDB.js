import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { PrismaClient } from '@prisma/client'

let prisma
import {
    createGameboard
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

    //TODO: Das ist nur tempoär für jeden zugänglich!!! -> !session
    if (session) {
        res.status(403).json({ error: "Not signed in" })
    } else {
        //Wenn etwas zum Server geschickt wird --> POST
        try {

            if (req.method === 'POST') {
                //Erstelle das Spielbrett für die Datenbank!
                const ID = req.body["ID"];
                const von = req.body["von"];
                const nach = req.body["nach"];

                console.log("Es wird ein neuer Datenbankeintrag erstellt. ID: ",ID)

                //TODO:Logik
                //Da dies der erste Eintrag ist, wird das Standardboard bearbeitet - TEMPORÄR
                let temp = default_spielfeld[von]
                default_spielfeld[von] = '-'
                default_spielfeld[nach] = temp

                //In der Datenbank wird das Spielfeld als String gespeichert
                const myJSON = JSON.stringify(default_spielfeld);

                const newBoard = await createGameboard(ID, myJSON)
                //return  res.status(200).json({info: "Erstmaliges POST",nextplayer:"black",gameID: ID, board: default_spielfeld})//.json(newBoard)

                return res.status(200).json({info: "Success!", nextplayer: "black"})
            } else {
                return res.status(200).json({error: "Kein POST!"})
            }

        } catch (error){
            return res.status(500).json({ ...error, message: error.message })
        }

    }
}
