import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import {
    getBoard,
    updateBoard
} from '../../../lib/access_db';
import {errorToJSON} from "next/dist/server/render";

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    //Wenn etwas zum Server geschickt wird --> POST
    try {

        switch (req.method) {
            //Schicke die Daten zum Server
            case 'POST': {
                try {
                    // Update durchführen, wenn das Spielbrett schon vorhanden ist
                    const ID = req.body["ID"];
                    const von = req.body["von"];
                    const nach = req.body["nach"];

                    //Entnehme das Board aus der Datenbank
                    const live_board = await getBoard(parseInt(ID));

                    //Ergebnis aus der Datenbank:
                    const ankommendesBoard = live_board["board"];
                    const ankommendeID = live_board["gameID"];

                    let temp = ankommendesBoard[von];
                    ankommendesBoard[von] = '-';
                    ankommendesBoard[nach] = temp;


                    console.log("ID: ", ankommendeID);
                    console.log("von: ", von);
                    console.log("nach: ", nach);

                    //Speichere das Board in der Datenbank
                    await updateBoard(ankommendeID, ankommendesBoard);
                    return res.status(200).json(ankommendesBoard);
                } catch (error) {
                    return res.status(500).json({ error: "Error in POST!" });
                }
            }
            case 'GET': {
                try {
                    //Übergebe die individuelle GameID
                    const ID = req.query.ID;

                    //Hole das Board aus der Datenbank
                    const data_server = await getBoard(parseInt(ID));

                    //Hier sind die Daten vom Server
                    const ankommendesBoard = data_server["board"];
                    const ankommendeID = data_server["gameID"];

                    //Schicke nun das Board mit der ID zurück
                    return res.status(200).json({ ID: ankommendeID, board: ankommendesBoard });

                } catch (error) {
                    return res.status(500).json({ error: "Error in GET!" });
                }

            }

            case 'PUT': {
                try {
                    const ID = req.body["ID"];
                    const von = req.body["von"];
                    const nach = req.body["nach"];

                    //Hole das Board aus der Datenbank
                    const results = await getBoard(parseInt(ID));
                    if (!results) {
                        return res.status(404).json({ error: "Board not found :P" });
                    }
                    const ankommendesBoard = JSON.parse(results["board"]);
                    const ankommendeID = results["gameID"];

                    let temp = ankommendesBoard[von];
                    ankommendesBoard[von] = '-';
                    ankommendesBoard[nach] = temp;

                    // Nun wollen wir ein Update durchführen
                    const board_update = JSON.stringify(ankommendesBoard);
                    await updateBoard(ankommendeID, board_update);

                    return res.status(200).json({ board: ankommendesBoard });

                } catch (error) {
                    return res.status(500).json({ error: errorToJSON(error)});
                }
            }

            default:
                return res.status(500).json({ error: "Kein POST oder GET!" });
        }

    } catch (error) {
        return res.status(500).json({ error: "Don't be sad, next time it will probably work." });
    }
}
